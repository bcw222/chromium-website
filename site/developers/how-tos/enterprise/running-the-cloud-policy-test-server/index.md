---
breadcrumbs:
- - /developers
  - For Developers
- - /developers/how-tos
  - How-Tos
- - /developers/how-tos/enterprise
  - Enterprise
page_name: running-the-cloud-policy-test-server
title: Running the cloud policy test server
---

Chromium can pull down enterprise policy configuration from a cloud service. We
have a simplistic python implementation of the management service, so we are
able to test features without relying on a full cloud policy server
implementation. This page explains how to run it:

## Running the test server

1.  You need a Linux Chromium checkout that's in good shape for building
            the browser. See [Get the Code](/developers/how-tos/get-the-code)
2.  Make sure you have the fake_dmserver built:

    ```none
    autoninja -C out/Default components/policy/test_support:fake_dmserver
    ```

3.  Start the test server. You can start `./out/Default/fake_dmserver` directly from the
            `src/` directory of your Chrome source tree:

    ```none
    ./out/Default/fake_dmserver --policy-blob-path="policy.json"
    ```

    Note: replace out/Debug with out/Release if appropriate, depending on your
    build configuration.

    Notes on parameters:
    *   `--policy-blob-path` specifies a file from which the server will
                read the policy blob data (see below). Up to you where to place it.
    *   `--client-state-path` specifies a file in which to persist current
                server state. This is useful if you want the server to remember
                registered clients and such across server restarts.
    *   `--log-path` specifies a file in which to log server data.
                Otherwise the server will log by default to the std error.
    *   `--startup-pipe` specifies a pipe that was passed to the process in which
                the server will communicate the host and the port where the server is running.
                It will be in the format `{"host": "127.0.0.1", "port": 34051}`.
                It is mainly used by Tast, but you can wait till the server start and
                log the server URL, then you can start using that URL to send requests.
    *   `--min-log-level` specifies the minimum logging level {0, 1, 2, 3}
                corresponding to {INFO, WARNING, ERROR, FATAL}.
    *   `--log-to-console` specifies whether to output the logs to the console.
4.  Check whether the server answers requests. Point your browser to
            <http://localhost:8889/test/ping> The server should respond with a page saying
            "Pong."
5.  Ready to roll!

## Setting up the policy blob file

The policy blob file is a JSON file containing server-global parameters.
Here's an example:

```none
{
  "policies" : [
    {
      "policy_type" : "google/chromeos/user",
      "value" : "base64 encoded proto message",
    },
    {
      "policy_type" : "google/chromeos/device",
      "value" : "base64 encoded proto message",
    },
    {
      "policy_type" : "google/chromeos/publicaccount",
      "entity_id" : "accountid@managedchrome.com",
      "value" : "base64 encoded proto message",
    }
  ],
  "external_policies" : [
    {
      "policy_type" : "google/chrome/extension",
      "entity_id" : "extension_id",
      "value" : "base64 encoded raw json value",
    }
  ],
  "managed_users" : [
    "secret123456"
  ],
  "policy_user" : "tast-user@managedchrome.com",
  "current_key_index": 0,
  "robot_api_auth_code": "code",
  "directory_api_id": "id",
  "request_errors": {
    "register": 500,
  }
  "device_affiliation_ids" : [
    "device_id"
  ],
  "user_affiliation_ids" : [
    "user_id"
  ],
  "allow_set_device_attributes" : false,
  "initial_enrollment_state": {
    "TEST_serial": {
      "initial_enrollment_mode": 2,
      "management_domain": "test-domain.com"
    }
  },
  "use_universal_signing_keys": true
}
```

Notes on parameters:

*   `managed_users` specifies the list of clients the server is allowing
            to register. Each entry is an oauth token, or the "\*" wildcard
            which matches any client.
    (Note that going by OAuth token actually isn't very useful, we should either
    remove this parameter or give the server the ability to figure out the
    actual user)
*   `policy_user` is the user ID to put in policy responses to identify
            the target of the policy settings. This needs to match the user on
            the Chrome side or Chrome will reject the policy.
*   `policies` is a list that contains all the policies to be set. Each policy has 3 fields:
      * `"policy_type"` is the type or scope of the policy (user, device or publicaccount).
      * `"entity_id"` is the account id used for public account policies.
      * `"value"` is the seralized proto message of the policies value encoded in base64.
*   `external_policies` is a list that contains all the external policies to be set. Each policy has 3 fields:
      * `"policy_type"` is the type of the external policy `"google/chrome/extension"`.
      * `"entity_id"` is the extension id.
      * `"value"` is the base64 encoded raw json value.
*   `current_key_index` is the index of the signing key to use when
            generating policy blob signatures.
*   `robot_api_auth_code` specifies the authentication code the server
            should return when a Chrome OS client asks for one during enterprise
            enrollment. Since the server doesn't have the ability to create
            robot accounts, it can't satisfy these request. Leave this parameter
            empty unless you are testing robot auth setup and have a way to
            create robot accounts and obtain auth codes separately.
*   `use_universal_signing_keys` specifies a flag to use a universal signing keys to sign any domain.
            For example a unicorn @gmail account which is not managed account.
*   `request_errors` specifies a map that sets the error responses for each request type.

### User policies

The payload protocol buffer message is CloudPolicySettings. This is generated
from
[policy_definitions](https://source.chromium.org/chromiumos/chromiumos/codesearch/+/main:src/chromium/src/components/policy/resources/templates/).
All the user policies can be set as a proto message encoded to base64.
The policy type must be "google/chromeos/user".

```none
{
  "policy_type" : "google/chromeos/user",
  "value" : "base64 encoded proto message",
}
```

### Device policies

The payload protocol buffer is ChromeDeviceSettingsProto.
All the device policies can be set as a proto message encoded to base64.
The policy type must be "google/chromeos/device".

```none
{
  "policy_type" : "google/chromeos/device",
  "value" : "base64 encoded proto message",
}
```

### Public Account policies

The payload protocol buffer is CloudPolicySettings.
All the public account policies can be set as a proto message encoded to base64.
The policy type must be "google/chromeos/publicaccount".
The entity id is set to the id of each account, however the account id must be a managed account.

```none
{
  "policy_type" : "google/chromeos/publicaccount",
  "entity_id" : "accountid@managedchrome.com",
  "value" : "base64 encoded proto message",
}
```

## Configuring Chromium OS to talk to the test server

In order to do something useful with the test server, you can configure Chromium
built for Chromium OS to talk to the test server for device- and user-level
policy. Here is what you need to do:

1.  Get a root shell on the VM or Chromebook that you want to talk to
            the test server.
2.  Make sure you have a writable root file system. Try `mount -o
            remount,rw /` if you don't, if that fails, you're likely on an
            actual device with enabled root file system protection, in that case
            check out `/usr/share/vboot/bin/make_dev_ssd.sh
            --remove_rootfs_verification`
3.  Edit `/etc/chrome_dev.conf`. Add the following flags:

    ```none
    --device-management-url=http://<your-ip>:<yourport>
    --enterprise-enrollment-skip-robot-auth
    ```

    This points the device at your test server and instructs it to skip robot
    auth setup, which avoids an error during enrollment due to the test server
    not being able to create robot accounts.
4.  On a shell, say

    ```none
    restart ui
    ```

5.  You're now set up to fetch policy from the test server!

## Configuring Chromium to talk to the test server

Pass the following command line flag to chrome:

```none
--device-management-url=http://<your-ip>:<yourport>
```

## User policy

To test some user policy setting, configure the policy file as desired and then
just log in. The browser should automatically pull policy. You can verify that
the policy is correctly pulled down from the server by inspecting
[chrome://policy](javascript:void(0);). To test policy changes, you can also
just update the policy in the file, and use the "Reload policies" button on
[chrome://policy](javascript:void(0);) to refresh policy at runtime.

## Device policy

For devices to receive device policy, they need to be enrolled for enterprise
management at device setup time. There are some requirements for that to
succeed:

*   The device's TPM needs to be clear. In particular, running
            `cryptohome --action=tpm_status` should indicate that the TPM is not
            yet owned. If you have an owned TPM, do the following:

    ```none
    crossystem clear_tpm_owner_request=1
    echo "fast keepimg" > /mnt/stateful_partition/factory_install_reset
    reboot
    ```

    The system will reboot, do a powerwash and reboot again. The device should
    have a clear TPM and be in enrollable state afterwards.
*   The device may not have a consumer owner already, i.e. you shouldn't
            have logged in previously. Ownership is mainly indicated through
            files in `/var/lib/whitelist`, which you can clear like this

    ```none
    stop ui
    rm -rf /var/lib/whitelist/*
    start ui
    ```

    This works well in a VM, note that you probably need a TPM reset an actual
    hardware (see above).

To perform the actual enrollment, hit `Ctrl+Alt+E` on the sign in screen.
Provide credentials (note that in case of the test server, you must match the
"policy_user" field in your JSON config file) and speak a short prayer. If you
get lucky, the device will enroll. Log in and check
[chrome://policy](javascript:void(0);) for whether it says device policy is
present.
