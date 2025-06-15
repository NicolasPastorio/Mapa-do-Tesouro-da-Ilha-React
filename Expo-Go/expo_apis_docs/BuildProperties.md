# Propriedades de Construção (BuildProperties)

Um plugin de configuração que permite personalizar as propriedades de construção nativas durante o prebuild.

`expo-build-properties` é um [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) que configura as propriedades de construção nativas dos seus diretórios `android/gradle.properties` e `ios/Podfile.properties.json` durante o [Prebuild](https://docs.expo.dev/workflow/customizing-android/#prebuild).

> Este plugin de configuração configura como o [comando Prebuild](https://docs.expo.dev/workflow/customizing-android/#prebuild) gera os diretórios nativos do Android e iOS e, portanto, não pode ser usado com projetos que não executam `npx expo prebuild` (projetos bare).

## Instalação

Para instalar a API BuildProperties, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-build-properties
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 35,
            "targetSdkVersion": 35,
            "buildToolsVersion": "35.0.0"
          },
          "ios": {
            "deploymentTarget": "15.1"
          }
        }
      ]
    ]
  }
}
```

### Todas as propriedades configuráveis

A interface [`PluginConfigType`](https://docs.expo.dev/versions/latest/sdk/build-properties/#pluginconfigtype) representa as propriedades de configuração atualmente disponíveis.

## API

### Métodos

#### `BuildProperties.withBuildProperties(config, props)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `config` | [`ExpoConfig`](https://docs.expo.dev/versions/latest/config/app/) | Configuração do Expo para o aplicativo. |
| `props` | `PluginConfigType` | Configuração para o plugin de propriedades de construção. |

Plugin de configuração que permite personalizar as propriedades de construção nativas do Android e iOS para aplicativos gerenciados.

## Interfaces

### `AndroidMavenRepository`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `authentication` (opcional) | `string` | O esquema de autenticação a ser usado ao acessar o repositório Maven. Valores: `basic`, `digest`, `header`. |
| `credentials` (opcional) | `AndroidMavenRepositoryCredentials` | As credenciais a serem usadas ao acessar o repositório Maven. Pode ser do tipo `PasswordCredentials`, `HttpHeaderCredentials` ou `AWSCredentials`. Consulte a seção de esquemas de autenticação da [documentação do Gradle](https://docs.gradle.org/current/userguide/declaring_repositories.html#sec:authentication-schemes) para mais informações. |
| `url` | `string` | A URL do repositório Maven. |

### `AndroidMavenRepositoryAWSCredentials`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `accessKey` | `string` | Chave de acesso AWS. |
| `secretKey` | `string` | Chave secreta AWS. |
| `sessionToken` (opcional) | `string` | Token de sessão AWS. |

### `AndroidMavenRepositoryHttpHeaderCredentials`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `name` | `string` | Nome do cabeçalho HTTP. |
| `value` | `string` | Valor do cabeçalho HTTP. |

### `AndroidMavenRepositoryPasswordCredentials`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `password` | `string` | Senha. |
| `username` | `string` | Nome de usuário. |

### `ExtraIosPodDependency`

Interface que representa uma dependência extra do CocoaPods. Consulte a [referência de sintaxe do Podfile](https://guides.cocoapods.org/syntax/podfile.html) para mais informações.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `branch` (opcional) | `string` | O branch git a ser buscado. Consulte a propriedade `git` para mais informações. |
| `commit` (opcional) | `string` | O commit git a ser buscado. Consulte a propriedade `git` para mais informações. |
| `configurations` (opcional) | `string[]` | Configurações de construção para as quais o pod deve ser instalado. Exemplo: `["Debug", "Release"]`. |
| `git` (opcional) | `string` | Usa a versão de ponta de um Pod. Exemplo: `{ "name": "AFNetworking", "git": "https://github.com/gowalla/AFNetworking.git", "tag": "0.7.0" }`. Isso age como para adicionar esta declaração de dependência de pod: `pod 'AFNetworking', :git => 'https://github.com/gowalla/AFNetworking.git', :tag => '0.7.0'`. |
| `modular_headers` (opcional) | `boolean` | Se este pod deve usar cabeçalhos modulares. |
| `name` | `string` | Nome do pod. |
| `path` (opcional) | `string` | Caminho personalizado do sistema de arquivos local para adicionar a dependência. Exemplo: `~/Documents/AFNetworking`. |
| `podspec` (opcional) | `string` | Caminho personalizado do podspec. |

### `PluginConfigType`

Tipo: `object`

Interface que representa a configuração do plugin de propriedades de construção.

### `PluginConfigTypeAndroid`

Tipo: `object`

Configuração específica do Android para o plugin de propriedades de construção.

### `PluginConfigTypeAndroidPackagingOptions`

Tipo: `object`

Opções de empacotamento do Android para o plugin de propriedades de construção.

### `PluginConfigTypeAndroidQueries`

Tipo: `object`

Consultas do Android para o plugin de propriedades de construção.

### `PluginConfigTypeAndroidQueriesData`

Tipo: `object`

Dados de consultas do Android para o plugin de propriedades de construção.

### `PluginConfigTypeAndroidQueriesIntent`

Tipo: `object`

Intenções de consultas do Android para o plugin de propriedades de construção.

### `PluginConfigTypeIos`

Tipo: `object`

Configuração específica do iOS para o plugin de propriedades de construção.

## Tipos

### `AndroidMavenRepositoryCredentials`

Tipo: `object`

Credenciais para um repositório Maven Android.

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025

