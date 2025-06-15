# AuthSession

Uma biblioteca universal que fornece uma API para lidar com autenticação baseada em navegador.

`AuthSession` permite a autenticação baseada em navegador (por exemplo, fluxos OAuth baseados em navegador) em seu aplicativo utilizando [WebBrowser](https://docs.expo.dev/versions/latest/sdk/webbrowser/) e [Crypto](https://docs.expo.dev/versions/latest/sdk/crypto/). Para detalhes de implementação, consulte esta referência e, para uso, consulte o guia de [Autenticação](https://docs.expo.dev/guides/authentication/).

> Nota: `AuthSession` permite fluxos de trabalho de autenticação baseados em navegador OAuth e OpenID Connect de propósito geral. Onde disponível, recomendamos usar uma biblioteca fornecida pelo seu provedor de identidade, pois ela lidará com detalhes de implementação específicos desse provedor. Por exemplo, use [`@react-native-google-signin/google-signin`](https://github.com/react-native-google-signin/google-signin) para autenticação do Google e [`react-native-fbsdk-next`](https://github.com/facebook/react-native-fbsdk-next) para Facebook. Para mais informações, consulte a visão geral de [Autenticação](https://docs.expo.dev/guides/authentication/).

## Instalação

> `expo-crypto` é uma dependência par e deve ser instalada junto com `expo-auth-session`.

Para instalar o AuthSession, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-auth-session expo-crypto
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração

Você está usando esta biblioteca em um aplicativo React Native existente?

Para usar esta biblioteca, você precisa configurar o deep linking em seu aplicativo configurando um `scheme`. Use o utilitário [`uri-scheme` CLI](https://github.com/expo/expo/tree/main/packages/uri-scheme) para adicionar, remover, listar e abrir seus URIs facilmente.

Por exemplo, para fazer seu aplicativo nativo lidar com `mycoolredirect://`, execute:

```bash
npx uri-scheme add mycoolredirect
```

Agora você deve ser capaz de ver uma lista de todos os esquemas do seu projeto executando:

Você pode testá-lo para garantir que funciona assim:

Terminal

`# Reconstrua os aplicativos nativos, certifique-se de usar um emulador`

```bash
yarn android
yarn ios
```

`# Abra um esquema de URI`

```bash
npx uri-scheme open mycoolredirect://some/redirect
```

### Uso em aplicativos autônomos

```json
{
  "expo": {
    "scheme": "mycoolredirect"
  }
}
```

Para poder fazer deep link de volta ao seu aplicativo, você precisará definir um `scheme` na configuração do seu aplicativo e, em seguida, construir seu aplicativo autônomo (ele não pode ser atualizado com uma atualização). Se você não incluir um esquema, o fluxo de autenticação será concluído, mas não será possível passar as informações de volta para o seu aplicativo e o usuário terá que sair manualmente do modal de autenticação (resultando em um evento cancelado).

## Guias

> Os guias foram movidos: [Guia de Autenticação](https://docs.expo.dev/guides/authentication/).

## Como funcionam os fluxos de autenticação baseados em navegador

O fluxo típico para autenticação baseada em navegador em aplicativos móveis é o seguinte:

*   **Iniciação**: o usuário pressiona um botão de login.
*   **Abrir navegador web**: o aplicativo abre um navegador web para a página de login do provedor de autenticação. A URL que é aberta para a página de login geralmente inclui informações para identificar o aplicativo e uma URL para redirecionar em caso de sucesso. _Nota: o navegador web deve compartilhar cookies com o navegador web do seu sistema para que os usuários não precisem fazer login novamente se já estiverem autenticados no navegador do sistema -- a API [WebBrowser](https://docs.expo.dev/versions/latest/sdk/webbrowser/) do Expo cuida disso._
*   **Redirecionamentos do provedor de autenticação**: após a autenticação bem-sucedida, o provedor de autenticação deve redirecionar de volta para o aplicativo, redirecionando para a URL fornecida pelo aplicativo nos parâmetros de consulta na página de login ([leia mais sobre como o link funciona em aplicativos móveis](https://docs.expo.dev/guides/linking/)), _desde que a URL esteja na lista de permissões de URLs de redirecionamento permitidas_. A lista de permissões de URLs de redirecionamento é importante para evitar que atores mal-intencionados se passem pelo seu aplicativo. O redirecionamento inclui dados na URL (como ID do usuário e token), seja no hash de localização, parâmetros de consulta ou ambos.
*   **O aplicativo lida com o redirecionamento**: o redirecionamento é tratado pelo aplicativo e os dados são analisados a partir da URL de redirecionamento.

## Considerações de Segurança

*   Nunca coloque chaves secretas dentro do código do seu aplicativo, não há uma maneira segura de fazer isso! Em vez disso, você deve armazenar suas chaves secretas em um servidor e expor um endpoint que faça chamadas de API para seu cliente e passe os dados de volta.

## API

```javascript
import * as AuthSession from 'expo-auth-session';
```

## Hooks

### `useAuthRequest(config, discovery)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | `AuthRequestConfig` | Uma `AuthRequestConfig` válida que especifica qual provedor usar. |
| `discovery` | `null | DiscoveryDocument` | Um `DiscoveryDocument` carregado com endpoints usados para autenticação. Apenas `authorizationEndpoint` é necessário para solicitar um código de autorização. |

Carrega uma solicitação de autorização para um código. Quando o método `prompt` é concluído, a resposta será atendida.

> Para fechar a janela pop-up na web, você precisa invocar `WebBrowser.maybeCompleteAuthSession()`. Consulte o [exemplo do GitHub](https://github.com/expo/examples/tree/main/with-auth-session) para mais informações.

Se um fluxo de concessão implícita foi usado, você pode passar os `response.params` para `TokenResponse.fromQueryParams()` para obter uma instância `TokenResponse` que você pode usar para atualizar facilmente o token.

Retorna:

`[AuthRequest | null, AuthSessionResult | null, (options: AuthRequestPromptOptions) => Promise<void>]`

Exemplo:

```javascript
const [request, response, promptAsync] = useAuthRequest({ /* ... */ }, { /* ... */ });
```

### `useAuthRequestResult(request, discovery, customOptions)`

| Parâmetro | Tipo |
| --- | --- |
| `request` | `null | AuthRequest` |
| `discovery` | `null | DiscoveryDocument` |
| `customOptions` (opcional) | `AuthRequestPromptOptions` |

Retorna:

`[AuthSessionResult | null, ]`

### `useAutoDiscovery(issuerOrDiscovery)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `issuerOrDiscovery` | `IssuerOrDiscovery` | URL usando o esquema `https` sem componente de consulta ou fragmento que o OP afirma ser seu Identificador de Emissor. |

Dado uma URL de emissor OpenID Connect, isso buscará e retornará o `DiscoveryDocument` (uma coleção de URLs) do provedor de recursos.

Retorna:

`DiscoveryDocument | null`

Retorna `null` até que o `DiscoveryDocument` tenha sido buscado da URL do emissor fornecida.

Exemplo:

```javascript
const discovery = useAutoDiscovery("https://example.com/auth");
```

### `useLoadedAuthRequest(config, discovery, AuthRequestInstance)`

| Parâmetro | Tipo |
| --- | --- |
| `config` | `AuthRequestConfig` |
| `discovery` | `null | DiscoveryDocument` |
| `AuthRequestInstance` | `AuthRequest` |

Retorna:

`AuthRequest | null`

## Classes

### `AccessTokenRequest`

Tipo: Classe estende `TokenRequest`

Representa uma solicitação para obter um Token de Acesso de um Servidor de Autorização.

### `AuthError`

Tipo: Classe estende `Error`

Representa um erro que ocorreu durante um fluxo de autorização.

### `AuthRequest`

Tipo: Classe estende `Request`

Representa uma solicitação de autorização.

### `RefreshTokenRequest`

Tipo: Classe estende `TokenRequest`

Representa uma solicitação para atualizar um Token de Acesso.

### `Request`

Tipo: Classe

Classe base para todas as solicitações.

### `ResponseError`

Tipo: Classe estende `Error`

Representa um erro que ocorreu durante uma troca de token.

### `RevokeTokenRequest`

Tipo: Classe estende `Request`

Representa uma solicitação para revogar um token.

### `TokenError`

Tipo: Classe estende `Error`

Representa um erro que ocorreu durante uma solicitação de token.

### `TokenRequest`

Tipo: Classe estende `Request`

Classe base para todas as solicitações de token.

### `TokenResponse`

Tipo: Classe

Representa uma resposta de um endpoint de token.

## Métodos

### `dismiss()`

`AuthSession.dismiss()`

Descarta a AuthSession atualmente apresentada.

### `exchangeCodeAsync(config, discovery)`

`AuthSession.exchangeCodeAsync(config, discovery)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | `AccessTokenRequestConfig` | Uma `AccessTokenRequestConfig` válida que especifica qual provedor usar. |
| `discovery` | `DiscoveryDocument` | Um `DiscoveryDocument` carregado com endpoints usados para autenticação. |

Troca um código de autorização por um token de acesso.

Retorna:

`Promise<TokenResponse>`

Exemplo:

```javascript
const tokenResponse = await AuthSession.exchangeCodeAsync({ /* ... */ }, { /* ... */ });
```

### `fetchDiscoveryAsync(issuer)`

`AuthSession.fetchDiscoveryAsync(issuer)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `issuer` | `string` | URL usando o esquema `https` sem componente de consulta ou fragmento que o OP afirma ser seu Identificador de Emissor. |

Dado uma URL de emissor OpenID Connect, isso buscará e retornará o `DiscoveryDocument` (uma coleção de URLs) do provedor de recursos.

Retorna:

`Promise<DiscoveryDocument>`

Exemplo:

```javascript
const discovery = await AuthSession.fetchDiscoveryAsync("https://example.com/auth");
```

### `fetchUserInfoAsync(config, token)`

`AuthSession.fetchUserInfoAsync(config, token)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | `UserInfoRequestConfig` | Uma `UserInfoRequestConfig` válida que especifica qual provedor usar. |
| `token` | `TokenResponse` | Uma `TokenResponse` válida que contém um token de acesso. |

Busca informações do usuário do endpoint de informações do usuário.

Retorna:

`Promise<UserInfo>`

Exemplo:

```javascript
const userInfo = await AuthSession.fetchUserInfoAsync({ /* ... */ }, tokenResponse);
```

### `getCurrentTimeInSeconds()`

`AuthSession.getCurrentTimeInSeconds()`

Retorna o tempo atual em segundos.

Retorna:

`number`

Exemplo:

```javascript
const currentTime = AuthSession.getCurrentTimeInSeconds();
```

### `getDefaultReturnUrl()`

`AuthSession.getDefaultReturnUrl()`

Retorna a URL de retorno padrão para a plataforma atual. Esta é a URL que será usada se nenhum `redirectUri` for especificado na `AuthRequestConfig`.

Retorna:

`string`

Exemplo:

```javascript
const defaultReturnUrl = AuthSession.getDefaultReturnUrl();
```

### `getRedirectUrl(scheme, path)`

`AuthSession.getRedirectUrl(scheme, path)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `scheme` | `string` | O esquema da URL de redirecionamento. |
| `path` (opcional) | `string` | O caminho da URL de redirecionamento. |

Retorna uma URL de redirecionamento para a plataforma atual. Esta é a URL para a qual seu provedor de autenticação deve redirecionar após o usuário ter se autenticado.

Retorna:

`string`

Exemplo:

```javascript
const redirectUrl = AuthSession.getRedirectUrl("mycoolredirect");
```

### `makeAutoDiscoveryRequest(config)`

`AuthSession.makeAutoDiscoveryRequest(config)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | `AutoDiscoveryRequestConfig` | Uma `AutoDiscoveryRequestConfig` válida que especifica qual provedor usar. |

Cria uma instância `AutoDiscoveryRequest`.

Retorna:

`AutoDiscoveryRequest`

Exemplo:

```javascript
const request = AuthSession.makeAutoDiscoveryRequest({ /* ... */ });
```

### `makeAuthRequest(config)`

`AuthSession.makeAuthRequest(config)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | `AuthRequestConfig` | Uma `AuthRequestConfig` válida que especifica qual provedor usar. |

Cria uma instância `AuthRequest`.

Retorna:

`AuthRequest`

Exemplo:

```javascript
const request = AuthSession.makeAuthRequest({ /* ... */ });
```

### `makeTokenRequest(config)`

`AuthSession.makeTokenRequest(config)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | `TokenRequestConfig` | Uma `TokenRequestConfig` válida que especifica qual provedor usar. |

Cria uma instância `TokenRequest`.

Retorna:

`TokenRequest`

Exemplo:

```javascript
const request = AuthSession.makeTokenRequest({ /* ... */ });
```

### `parseQueryParams(input)`

`AuthSession.parseQueryParams(input)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `input` | `string` | A string de entrada para analisar. |

Analisa parâmetros de consulta de uma string.

Retorna:

`Record<string, string>`

Exemplo:

```javascript
const params = AuthSession.parseQueryParams("?code=123&state=abc");
```

### `promptAsync(request, options)`

`AuthSession.promptAsync(request, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `request` | `AuthRequest` | Uma instância `AuthRequest` válida. |
| `options` (opcional) | `AuthRequestPromptOptions` | Opções para o prompt. |

Apresenta a solicitação de autorização ao usuário.

Retorna:

`Promise<AuthSessionResult>`

Exemplo:

```javascript
const result = await AuthSession.promptAsync(request);
```

### `refreshAsync(config, token)`

`AuthSession.refreshAsync(config, token)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | `RefreshTokenRequestConfig` | Uma `RefreshTokenRequestConfig` válida que especifica qual provedor usar. |
| `token` | `TokenResponse` | Uma `TokenResponse` válida que contém um token de atualização. |

Atualiza um token de acesso.

Retorna:

`Promise<TokenResponse>`

Exemplo:

```javascript
const newToken = await AuthSession.refreshAsync({ /* ... */ }, tokenResponse);
```

### `revokeAsync(config, token)`

`AuthSession.revokeAsync(config, token)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | `RevokeTokenRequestConfig` | Uma `RevokeTokenRequestConfig` válida que especifica qual provedor usar. |
| `token` | `TokenResponse` | Uma `TokenResponse` válida que contém um token para revogar. |

Revoga um token.

Retorna:

`Promise<void>`

Exemplo:

```javascript
await AuthSession.revokeAsync({ /* ... */ }, tokenResponse);
```

### `startAsync(url, options)`

`AuthSession.startAsync(url, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `url` | `string` | A URL a ser aberta. |
| `options` (opcional) | `AuthSessionOptions` | Opções para a sessão. |

Inicia uma nova AuthSession.

Retorna:

`Promise<AuthSessionResult>`

Exemplo:

```javascript
const result = await AuthSession.startAsync("https://example.com/auth");
```

### `unauthorizeAsync(config, token)`

`AuthSession.unauthorizeAsync(config, token)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | `UnauthorizeRequestConfig` | Uma `UnauthorizeRequestConfig` válida que especifica qual provedor usar. |
| `token` | `TokenResponse` | Uma `TokenResponse` válida que contém um token para desautorizar. |

Desautoriza um token.

Retorna:

`Promise<void>`

Exemplo:

```javascript
await AuthSession.unauthorizeAsync({ /* ... */ }, tokenResponse);
```

## Tipos

### `AuthRequestConfig`

Tipo: `object`

Configuração para uma solicitação de autorização.

### `AuthSessionOptions`

Tipo: `object`

Opções para uma AuthSession.

### `AuthSessionResult`

Tipo: `object`

O resultado de uma AuthSession.

### `DiscoveryDocument`

Tipo: `object`

Uma coleção de URLs usadas para autenticação.

### `IssuerOrDiscovery`

Tipo: `string | DiscoveryDocument`

Um URL de emissor ou um DiscoveryDocument.

### `TokenResponseConfig`

Tipo: `object`

Configuração para uma resposta de token.

### `UserInfo`

Tipo: `object`

Informações do usuário.

### `UserInfoRequestConfig`

Tipo: `object`

Configuração para uma solicitação de informações do usuário.

## Códigos de Erro

### `AuthSession.ErrorCode`

`'E_AUTH_SESSION_START_FAILED'` | `'E_AUTH_SESSION_DISMISS_FAILED'` | `'E_AUTH_SESSION_EXCHANGE_CODE_FAILED'` | `'E_AUTH_SESSION_FETCH_DISCOVERY_FAILED'` | `'E_AUTH_SESSION_FETCH_USER_INFO_FAILED'` | `'E_AUTH_SESSION_REFRESH_FAILED'` | `'E_AUTH_SESSION_REVOKE_FAILED'` | `'E_AUTH_SESSION_UNAUTHORIZE_FAILED'`

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025

