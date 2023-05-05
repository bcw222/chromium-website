3. To obtain credentials to authenticate the certification request at the CA,use any other APIs, for example, OAuth.[Token](https://developer.chrome.com/extensions/enterprise_platformKeys#type-Token[Token](https://developer.chrome.com/extensions/enterprise_platformKeys#type-Token).         if (tokens[i].id == "user") {
           callback(tokens[i]);
           return;
         }
       }
       callback(null);
     });
    }
    ```

    ```none
    var algorithm = {
     name: "RSASSA-PKCS1-v1_5",

      // RsaHashedKeyGenParams:
      modulusLength: 2048,

     // Equivalent to 65537
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]), 
     hash: {
       name: "SHA-1"
     }
    };

    userToken.subtleCrypto.generateKey(algorithm, false /* not extractable */, ["sign"])
        .then(function(keyPair) { ... continue with generated keyPair ... },
           console.error.bind(console));
    ```

5. Extract the public key from the key handle using the
[subtleCrypto.exportKey](http://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface)
method of the
[Token](https://developer.chrome.com/extensions/enterprise_platformKeys#type-Token):

    ```none
    userToken.subtleCrypto.exportKey("spki", keyPair.publicKey)
      .then(function(publicKey) { ... continue with publicKey ... },
           console.error.bind(console));
    ```

6. Create the content for the certification request in the extension. This
request must contain at least the public key. The CA may expect additional
attributes that must be added. If the request is PKCS#10 based, for example, the
open source library [forge](https://github.com/digitalbazaar/forge) may be used.

    ```none
    var request = CreateCertificationRequest();
    request.setPublicKey(publicKey);
    request.setSubject('CommonName', 'some name');
    ```

7. Sign the content of the certification request (using the
[subtleCrypto.sign](http://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface)
method of the
[Token](https://developer.chrome.com/extensions/enterprise_platformKeys#type-Token))
and create the final request from the content and the signature. Any subsequent
attempt to use the same key for signing will fail for security reasons: This API
guarantees that only Chrome OS itself can use the private key and the
certificate for authentication.

    ```none
    function signData(data, callback) {
     userToken.subtleCrypto.sign({name : "RSASSA-PKCS1-v1_5"}, keyPair.privateKey, data)
       .then(callback, console.error.bind(console));
    }

    request.setSignFunction(signData);
    request.sign();
    ```

8. Send the certification request to the CA and receive the client certificate
(e.g. using XMLHttpRequest)

    ```none
    var xhr = new XMLHttpRequest();
    function onReadyStateChange() {
     if (xhr.readyState !== 4)
       return;
     if (xhr.status !== 200) {
        ... handle error ...
       return;
     }
     ... continue with xhr.response which contains the certificate ....
    }
    xhr.onreadystatechange = onReadyStateChange;
    xhr.open('POST', caUrl);
    xhr.setRequestHeader('Content-Type', ...);
    xhr.send(request);
    ```

9. Install the client certificate using
[enterprise.platformKeys.importCertificate](https://developer.chrome.com/extensions/enterprise_platformKeys#method-importCertificate)

    ```none
    chrome.enterprise.platformKeys.importCertificate(userToken.id, certificate);
    ```

10. Different methods to use the client certificate for authentication are
available

    For network authentication:
    * The user can manually select the client certificate in the network
    configuration dialog.
    * The selection can also be automated if the network is configured by policy.
    For network types that support client certificates, like EAP-TLS, the
    administrator can configure a Certificate Pattern that defines which client
    certificates are valid for authenticating to this network. Chrome OS will
    automatically select the most recent matching client certificate and use it
    for authentication on every connection attempt.

    For web pages requiring client certificate authentication:
    * When accessing a web page that requires the client to present a certificate,
    Chrome OS will show the user a list of available client certificates. After
    selecting one, Chrome OS will use it to authenticate.
    * The selection can also be automated for specific URLs using the policy
    [Automatically select client certificates for these
    sites](https://support.google.com/chrome/a/answer/2657289?#AutoSelectCertificateForUrls):
    For URLs that are listed in this policy, the most recent matching client
    certificate will automatically be used for authentication without prompting
    the user.

Note that the
[enterprise.platformKeys](https://developer.chrome.com/extensions/enterprise_platformKeys)
API guarantees, that client certificates imported using the API can only be used
by Chrome OS itself for authentication. The extension is not able to drive any
authentication with such a certificate and in particular the API guarantees that
the certificate can’t be extracted to authenticate any other user or device.

### Re-enrollment

To determine whether any valid client certificate is already installed and to
check the expiration of the installed certificates, an extension can use the
[platformKeys.getCertificates](https://developer.chrome.com/extensions/enterprise_platformKeys#method-getCertificates)
function and if necessary trigger the process to obtain a new client
certificate.

```none
chrome.enterprise.platformKeys.getCertificates(userToken.id, function(certificates) {
 for (var i = 0; i < certificates.length; i++) {
   var certificate = certificates[i];
   ... check whether certificate is valid and matches the required attributes ...
 }
});
```

An installed certificate can be removed from the user’s certificate store using
the function
[enterprise.platformKeys.removeCertificate](https://developer.chrome.com/extensions/enterprise_platformKeys#method-removeCertificate).
As client certificates can be selected automatically (see last step in the
enrollment process above), unnecessary certificates should be removed to prevent
conflicts.
