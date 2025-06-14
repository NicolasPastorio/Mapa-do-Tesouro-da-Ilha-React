# AuthSession

A universal library that provides an API to handle browser-based authentication.

`AuthSession` enables web browser-based authentication (for example, browser-based OAuth flows) in your app by utilizing [WebBrowser](https://docs.expo.dev/versions/latest/sdk/webbrowser/) and [Crypto](https://docs.expo.dev/versions/latest/sdk/crypto/). For implementation details, refer to this reference, and for usage, see the [Authentication](https://docs.expo.dev/guides/authentication/) guide.

> Note: `AuthSession` enables general-purpose OAuth and OpenID Connect browser-based auth workflows. Where available, we recommend using a library supplied by your identity provider, as it will handle implementation details specific to that provider. For example, use [`@react-native-google-signin/google-signin`](https://github.com/react-native-google-signin/google-signin) for Google authentication and [`react-native-fbsdk-next`](https://github.com/facebook/react-native-fbsdk-next) for Facebook. For more information, see [Authentication](https://docs.expo.dev/guides/authentication/) overview.

## Installation

> `expo-crypto` is a peer dependency and must be installed alongside `expo-auth-session`.

`-` `npx expo install expo-auth-session expo-crypto`

If you are installing this in an [existing React Native app](https://reactnative.dev/docs/integration-with-existing-apps), make sure to [install `expo`](https://docs.expo.dev/workflow/installing-expo-modules/) in your project.

## Configuration

Are you using this library in an existing React Native app?

To use this library, you need to set up deep linking in your app by setting up a `scheme`. Use the [`uri-scheme` CLI](https://github.com/expo/expo/tree/main/packages/uri-scheme) utility to easily add, remove, list, and open your URIs.

For example, to make your native app handle `mycoolredirect://`, run:

`-` `npx uri-scheme add mycoolredirect`

You should now be able to see a list of all your project's schemes by running:

You can test it to ensure it works like this:

Terminal

`# Rebuild the native apps, be sure to use an emulator`

`-` `yarn android`

`-` `yarn ios`

`# Open a URI scheme`

`-` `npx uri-scheme open mycoolredirect://some/redirect`

### Usage in standalone apps

    {
      "expo": {
        "scheme": "mycoolredirect"
      }
    }

To be able to deep link back into your app, you will need to set a `scheme` in your project's app config, and then build your standalone app (it can't be updated with an update). If you do not include a scheme, the authentication flow will complete, but it will be unable to pass the information back into your application and the user will have to manually exit the authentication modal (resulting in a canceled event).

## Guides

> The guides have moved: [Authentication Guide](https://docs.expo.dev/guides/authentication/).

## How web browser based authentication flows work

The typical flow for browser-based authentication in mobile apps is as follows:

*   Initiation: the user presses a sign in button
*   Open web browser: the app opens up a web browser to the authentication provider sign in page. The url that is opened for the sign in page usually includes information to identify the app, and a URL to redirect to on success. _Note: the web browser should share cookies with your system web browser so that users do not need to sign in again if they are already authenticated on the system browser -- Expo's [WebBrowser](https://docs.expo.dev/versions/latest/sdk/webbrowser/) API takes care of this._
*   Authentication provider redirects: upon successful authentication, the authentication provider should redirect back to the application by redirecting to URL provided by the app in the query parameters on the sign in page ([read more about how linking works in mobile apps](https://docs.expo.dev/guides/linking/)), _provided that the URL is in the allowlist of allowed redirect URLs_. Allowlisting redirect URLs is important to prevent malicious actors from pretending to be your application. The redirect includes data in the URL (such as user id and token), either in the location hash, query parameters, or both.
*   App handles redirect: the redirect is handled by the app and data is parsed from the redirect URL.

## Security considerations

*   Never put any secret keys inside your application code, there is no secure way to do this! Instead, you should store your secret key(s) on a server and expose an endpoint that makes API calls for your client and passes the data back.

## API

    import * as AuthSession from 'expo-auth-session';

## Hooks

### `useAuthRequest(config, discovery)`

| Parameter | Type | Description |
| --- | --- | --- |
| config | `AuthRequestConfig` | 
A valid `AuthRequestConfig` that specifies what provider to use.



 |
| discovery | `null | DiscoveryDocument` | 

A loaded `DiscoveryDocument` with endpoints used for authenticating. Only `authorizationEndpoint` is required for requesting an authorization code.



 |

Load an authorization request for a code. When the prompt method completes then the response will be fulfilled.

> In order to close the popup window on web, you need to invoke `WebBrowser.maybeCompleteAuthSession()`. See the [GitHub example](https://github.com/expo/examples/tree/main/with-auth-session) for more info.

If an Implicit grant flow was used, you can pass the `response.params` to `TokenResponse.fromQueryParams()` to get a `TokenResponse` instance which you can use to easily refresh the token.

Returns:

`[AuthRequest | null, AuthSessionResult | null, (options: AuthRequestPromptOptions) => [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<>]`

Example

    const [request, response, promptAsync] = useAuthRequest({ ... }, { ... });

### `useAuthRequestResult(request, discovery, customOptions)`

| Parameter | Type |
| --- | --- |
| request | `null | AuthRequest` |
| discovery | `null | DiscoveryDocument` |
| customOptions(optional) | `AuthRequestPromptOptions` |

Returns:

`[AuthSessionResult | null, ]`

### `useAutoDiscovery(issuerOrDiscovery)`

| Parameter | Type | Description |
| --- | --- | --- |
| issuerOrDiscovery | `IssuerOrDiscovery` | 
URL using the `https` scheme with no query or fragment component that the OP asserts as its Issuer Identifier.



 |

Given an OpenID Connect issuer URL, this will fetch and return the `DiscoveryDocument` (a collection of URLs) from the resource provider.

Returns:

`DiscoveryDocument | null`

Returns `null` until the `DiscoveryDocument` has been fetched from the provided issuer URL.

Example

    const discovery = useAutoDiscovery('https://example.com/auth');

### `useLoadedAuthRequest(config, discovery, AuthRequestInstance)`

| Parameter | Type |
| --- | --- |
| config | `AuthRequestConfig` |
| discovery | `null | DiscoveryDocument` |
| AuthRequestInstance | `AuthRequest` |

Returns:

`AuthRequest | null`

## Classes

### `AccessTokenRequest`

Type: Class extends `TokenRequest`

Represents a request to get an Access Token from an Authorization Server.

### `AuthError`

Type: Class extends `Error`

Represents an error that occurred during an authorization flow.

### `AuthRequest`

Type: Class extends `Request`

Represents an authorization request.

### `RefreshTokenRequest`

Type: Class extends `TokenRequest`

Represents a request to refresh an Access Token.

### `Request`

Type: Class

Base class for all requests.

### `ResponseError`

Type: Class extends `Error`

Represents an error that occurred during a token exchange.

### `RevokeTokenRequest`

Type: Class extends `Request`

Represents a request to revoke a token.

### `TokenError`

Type: Class extends `Error`

Represents an error that occurred during a token request.

### `TokenRequest`

Type: Class extends `Request`

Base class for all token requests.

### `TokenResponse`

Type: Class

Represents a response from a token endpoint.

## Methods

### `dismiss()`

`AuthSession.dismiss()`

Dismisses the currently presented AuthSession.

### `exchangeCodeAsync(config, discovery)`

`AuthSession.exchangeCodeAsync(config, discovery)`

| Parameter | Type | Description |
| --- | --- | --- |
| config | `AccessTokenRequestConfig` | 
A valid `AccessTokenRequestConfig` that specifies what provider to use.



 |
| discovery | `DiscoveryDocument` | 
A loaded `DiscoveryDocument` with endpoints used for authenticating.



 |

  

Exchanges an authorization code for an access token.

Returns:

`Promise<TokenResponse>`

Example

    const tokenResponse = await AuthSession.exchangeCodeAsync({ ... }, { ... });

### `fetchDiscoveryAsync(issuer)`

`AuthSession.fetchDiscoveryAsync(issuer)`

| Parameter | Type | Description |
| --- | --- | --- |
| issuer | `string` | 
URL using the `https` scheme with no query or fragment component that the OP asserts as its Issuer Identifier.



 |

  

Given an OpenID Connect issuer URL, this will fetch and return the `DiscoveryDocument` (a collection of URLs) from the resource provider.

Returns:

`Promise<DiscoveryDocument>`

Example

    const discovery = await AuthSession.fetchDiscoveryAsync('https://example.com/auth');

### `fetchUserInfoAsync(config, token)`

`AuthSession.fetchUserInfoAsync(config, token)`

| Parameter | Type | Description |
| --- | --- | --- |
| config | `UserInfoRequestConfig` | 
A valid `UserInfoRequestConfig` that specifies what provider to use.



 |
| token | `TokenResponse` | 
A valid `TokenResponse` that contains an access token.



 |

  

Fetches user information from the userinfo endpoint.

Returns:

`Promise<UserInfo>`

Example

    const userInfo = await AuthSession.fetchUserInfoAsync({ ... }, tokenResponse);

### `getCurrentTimeInSeconds()`

`AuthSession.getCurrentTimeInSeconds()`

Returns the current time in seconds.

Returns:

`number`

Example

    const currentTime = AuthSession.getCurrentTimeInSeconds();

### `getDefaultReturnUrl()`

`AuthSession.getDefaultReturnUrl()`

Returns the default return URL for the current platform. This is the URL that will be used if no `redirectUri` is specified in the `AuthRequestConfig`.

Returns:

`string`

Example

    const defaultReturnUrl = AuthSession.getDefaultReturnUrl();

### `getRedirectUrl(scheme, path)`

`AuthSession.getRedirectUrl(scheme, path)`

| Parameter | Type | Description |
| --- | --- | --- |
| scheme | `string` | 
The scheme of the redirect URL.



 |
| path(optional) | `string` | 
The path of the redirect URL.



 |

  

Returns a redirect URL for the current platform. This is the URL that your authentication provider should redirect to after the user has authenticated.

Returns:

`string`

Example

    const redirectUrl = AuthSession.getRedirectUrl('mycoolredirect');

### `make  AutoDiscoveryRequest(config)`

`AuthSession.makeAutoDiscoveryRequest(config)`

| Parameter | Type | Description |
| --- | --- | --- |
| config | `AutoDiscoveryRequestConfig` | 
A valid `AutoDiscoveryRequestConfig` that specifies what provider to use.



 |

  

Creates an `AutoDiscoveryRequest` instance.

Returns:

`AutoDiscoveryRequest`

Example

    const request = AuthSession.makeAutoDiscoveryRequest({ ... });

### `makeAuthRequest(config)`

`AuthSession.makeAuthRequest(config)`

| Parameter | Type | Description |
| --- | --- | --- |
| config | `AuthRequestConfig` | 
A valid `AuthRequestConfig` that specifies what provider to use.



 |

  

Creates an `AuthRequest` instance.

Returns:

`AuthRequest`

Example

    const request = AuthSession.makeAuthRequest({ ... });

### `makeTokenRequest(config)`

`AuthSession.makeTokenRequest(config)`

| Parameter | Type | Description |
| --- | --- | --- |
| config | `TokenRequestConfig` | 
A valid `TokenRequestConfig` that specifies what provider to use.



 |

  

Creates a `TokenRequest` instance.

Returns:

`TokenRequest`

Example

    const request = AuthSession.makeTokenRequest({ ... });

### `parseQueryParams(input)`

`AuthSession.parseQueryParams(input)`

| Parameter | Type | Description |
| --- | --- | --- |
| input | `string` | 
The input string to parse.



 |

  

Parses query parameters from a string.

Returns:

`Record<string, string>`

Example

    const params = AuthSession.parseQueryParams('?code=123&state=abc');

### `promptAsync(request, options)`

`AuthSession.promptAsync(request, options)`

| Parameter | Type | Description |
| --- | --- | --- |
| request | `AuthRequest` | 
A valid `AuthRequest` instance.



 |
| options(optional) | `AuthRequestPromptOptions` | 
Options for the prompt.



 |

  

Presents the authorization request to the user.

Returns:

`Promise<AuthSessionResult>`

Example

    const result = await AuthSession.promptAsync(request);

### `refreshAsync(config, token)`

`AuthSession.refreshAsync(config, token)`

| Parameter | Type | Description |
| --- | --- | --- |
| config | `RefreshTokenRequestConfig` | 
A valid `RefreshTokenRequestConfig` that specifies what provider to use.



 |
| token | `TokenResponse` | 
A valid `TokenResponse` that contains a refresh token.



 |

  

Refreshes an access token.

Returns:

`Promise<TokenResponse>`

Example

    const newToken = await AuthSession.refreshAsync({ ... }, tokenResponse);

### `revokeAsync(config, token)`

`AuthSession.revokeAsync(config, token)`

| Parameter | Type | Description |
| --- | --- | --- |
| config | `RevokeTokenRequestConfig` | 
A valid `RevokeTokenRequestConfig` that specifies what provider to use.



 |
| token | `TokenResponse` | 
A valid `TokenResponse` that contains a token to revoke.



 |

  

Revokes a token.

Returns:

`Promise<void>`

Example

    await AuthSession.revokeAsync({ ... }, tokenResponse);

### `startAsync(url, options)`

`AuthSession.startAsync(url, options)`

| Parameter | Type | Description |
| --- | --- | --- |
| url | `string` | 
The URL to open.



 |
| options(optional) | `AuthSessionOptions` | 
Options for the session.



 |

  

Starts a new AuthSession.

Returns:

`Promise<AuthSessionResult>`

Example

    const result = await AuthSession.startAsync('https://example.com/auth');

### `unauthorizeAsync(config, token)`

`AuthSession.unauthorizeAsync(config, token)`

| Parameter | Type | Description |
| --- | --- | --- |
| config | `UnauthorizeRequestConfig` | 
A valid `UnauthorizeRequestConfig` that specifies what provider to use.



 |
| token | `TokenResponse` | 
A valid `TokenResponse` that contains a token to unauthorize.



 |

  

Unauthorizes a token.

Returns:

`Promise<void>`

Example

    await AuthSession.unauthorizeAsync({ ... }, tokenResponse);

## Types

### `AuthRequestConfig`

Type: `object`

Configuration for an authorization request.

### `AuthSessionOptions`

Type: `object`

Options for an AuthSession.

### `AuthSessionResult`

Type: `object`

The result of an AuthSession.

### `DiscoveryDocument`

Type: `object`

A collection of URLs used for authenticating.

### `IssuerOrDiscovery`

Type: `string | DiscoveryDocument`

An issuer URL or a DiscoveryDocument.

### `TokenResponseConfig`

Type: `object`

Configuration for a token response.

### `UserInfo`

Type: `object`

User information.

### `UserInfoRequestConfig`

Type: `object`

Configuration for a user info request.

## Error codes

### `AuthSession.ErrorCode`

`'ERR_AUTH_SESSION_START_FAILED'` | `'ERR_AUTH_SESSION_DISMISS_FAILED'` | `'ERR_AUTH_SESSION_EXCHANGE_CODE_FAILED'` | `'ERR_AUTH_SESSION_FETCH_DISCOVERY_FAILED'` | `'ERR_AUTH_SESSION_FETCH_USER_INFO_FAILED'` | `'ERR_AUTH_SESSION_REFRESH_FAILED'` | `'ERR_AUTH_SESSION_REVOKE_FAILED'` | `'ERR_AUTH_SESSION_UNAUTHORIZE_FAILED'`

