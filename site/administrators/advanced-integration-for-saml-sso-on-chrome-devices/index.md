---
breadcrumbs:
- - /administrator<https://ssl.gstatic.com/accounts/chrome/users-1.0.js>We recommend that SAML IdPs reference this file at the above location in theirmust be able to authenticate a returning user without contacting any servers.authenticated.Chrome uses a built-in one-way hash function to derive keys from passwords foruser’s password to Chrome via the API described in this document. Chromealternative is for the IdP to apply a one-way hash function and pass the derivedapply the same one-way hash function to determine whether the password entereChrome and must also pass Chrome any additional metadata required to repeat thbe added in the future.    add(details, callback)    complete(details, callback)All methods are asynchronous. Each method will invoke the callback passed to itthe API. The add method is then used to pass credentials to Chrome and theverified. IdP login flows typically span multiple HTML login pages. The APcorrelation is established using the token argument: The SAML IdP passes a toknot interpreted in any way and is discarded at the end of the sign-in processdocumentation](https://developers.google.com/google-apps/sso/saml_reference_implementation)    fl> Chrome passes an array of string constants indicating the supported key
> derivation mechanisms via this argument (see the key types section for> this array. Additional constants indicating further key derivation mechanisms
> will be added in the future.

> ## add(details, callback)

> This method should be invoked when the user has finished entering his/her
> credentials. The details should be a JavaScript object that contains the
> following fields:

> token
> user
> passwordBytes
> keyType

> The token is used to correlate the add call with a subsequent complete call.
> It is not interpreted by the API in any way and may be freely chosen by the
> IdP (see the API methods section for details). The user field should be set to
> the user’s e-mail address. If the IdP does not know the user’s e-mail address,
> an empty string should be passed.

> The next two fields are used to pass a key to Chrome. keyType indicates the
> key derivation mechanism that the IdP used to derive the key from the user’s
> password. It must be one of the string constants that the API returned in the
> keyTypes array during initialization (see the previous section for details).
> passwordBytes contains the key and any metadata required to repeat the hashing
> process that was used to derive the key.

> When the keyType is ’KEY_TYPE_PASSWORD_PLAIN’, passwordBytes contains the
> password itself. For other key types that will be added in the future,
> passwordBytes will contain the metadata, such as a salt, and the key,
> separated by a delimiter.

> The callback will be invoked when Chrome has received the credentials. Since
> the user has not been authenticated yet, Chrome keeps the credentials in
> memory only and does not store them permanently until the corresponding
> complete method is called.

> The add method will typically be called when the HTML login form is about to
> submitted. It is important to not actually submit the form until after the
> callback has been invoked. If the IdP calls the add method and submits the
> form without waiting for the callback, the HTML page containing the login form
> and any scripts it is running it will be torn down immediately, preventing the
> credentials from reaching Chrome. The recommended way to handle form
> submission is to set the callback to form.submit.bind(form), where form is the
> DOM node representing the login form. This way, the form will be submitted
> automatically when Chrome has received the credentials and invokes the
> callback.

> If the credentials entered are incorrect, the IdP will typically end the
> authentication flow with a SAMLResponse indicating failure. However, an IdP
> may also redirect back to the IdP’s login form, allowing the user to try
> entering his/her credentials again. If the IdP implements this flow, the add
> method should be called whenever new credentials are entered. It is
> permissible to reuse the same token in this case. When the add method is
> called with new credentials, any credentials previously passed with the same
> token are superseded and replaced.

> ## complete(details, callback)

> The complete method should be invoked when the user’s credentials have been
> verified by the SAML IdP and the user is authenticated. The details should be
> a JavaScript object that contains one field, token. The token must match the
> one that was passed to the add call for this authentication attempt, allowing
> the two calls to be correlated. The complete call indicates that the
> credentials which the IdP had passed to the corresponding add call are valid.
> Chrome will use these credentials to provide the session lock/unlock, offline
> sign-in, and data encryption features for this user. The callback will be
> invoked when Chrome has processed the credentials and has stored them
> permanently.

> After verifying the user’s credentials, an IdP needs to redirect to a Google
> URL, passing the RelayState and SAMLResponse. This is typically done by
> serving an HTML page that contains a hidden form which is submitted to the
> Google URL automatically upon page load. It is important to not actually
> submit the form until after the callback has been invoked. The recommended way
> to handle this is to call the complete method upon page load, setting the
> callback to form.submit.bind(form), where form is the DOM node representing
> the hidden form. This way, the form will be submitted automatically when
> Chrome has processed the credential and invokes the callback.

> If the credentials provided are incorrect, the IdP must not call the complete
> method. When the SAML authentication flow completes with a SAMLResponse
> indicating authentication failure, Chrome will inform the user of the
> authentication failure and will allow him/her to try again, starting a new
> authentication flow.

#### Limitations

The API can be used to securely pass a key derived from the user’s password to
Chrome. If the user authenticates using other means (e.g., smart card,
biometrics, single-use codes) and does not have a password, the API cannot be
used as no key can be derived. Support for other authentication types is a
separate problem outside the scope of the API at this time.

The API is available in Chrome 36 and higher. Earlier Chrome versions behave
like other user agents that do not support the API: It is safe to call the
initialize method. Since the API is not supported, the callback passed to
initialize will never be invoked.
