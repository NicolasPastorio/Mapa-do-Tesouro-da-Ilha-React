# Vinculação (Linking)

Uma API que fornece métodos para criar e abrir links diretos universalmente.

`expo-linking` fornece utilitários para seu aplicativo interagir com outros aplicativos instalados usando links diretos. Ele também fornece métodos auxiliares para construir e analisar links diretos em seu aplicativo. Esta biblioteca é uma extensão da API `Linking` do React Native.

Para uma explicação mais abrangente de como usar `expo-linking`, consulte o [Guia de Vinculação em outros aplicativos](https://docs.expo.dev/linking/linking-into-other-apps/).

## Instalação

Para instalar a API Linking, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-linking
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import * as Linking from 'expo-linking';
```

### Hooks

#### `useLinkingURL()`

Retorna a URL de vinculação seguida por quaisquer alterações subsequentes na URL. Sempre retorna a URL mais recente que o aplicativo foi aberto.

#### `useURL()`

Retorna a URL de vinculação que o aplicativo foi aberto. Este hook é mais simples que `useLinkingURL()` e é útil para casos de uso mais básicos.

### Métodos

#### `Linking.canOpenURL(url)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `url` | `string` | A URL a ser verificada. |

Determina se o aplicativo pode abrir uma determinada URL. Retorna uma promessa que se resolve com um booleano.

#### `Linking.collectManifestSchemes()`

Coleta os esquemas de URL definidos no manifesto do aplicativo. Retorna um array de strings.

#### `Linking.createURL(path, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `path` | `string` | Componentes de caminho adicionais para anexar à URL base. |
| `options` (opcional) | `CreateURLOptions` | Opções para construir a URL. |

Método auxiliar para construir um link direto para seu aplicativo, dado um caminho opcional e um conjunto de parâmetros de consulta. Cria um esquema de URI com duas barras por padrão.

O esquema deve ser definido na [configuração do aplicativo](https://docs.expo.dev/workflow/configuration/#scheme) em `expo.scheme` ou `expo.{android,ios}.scheme`. Esquemas específicos da plataforma definidos em `expo.{android,ios}.scheme` têm precedência sobre esquemas universais definidos em `expo.scheme`.

Exemplos:

*   Compilações de desenvolvimento e produção: `<scheme>://path` - usa a propriedade `scheme` opcional se fornecida, e caso contrário usa o primeiro esquema definido pela configuração do seu aplicativo.
*   Web (desenvolvimento): `https://localhost:19006/path`
*   Web (produção): `https://myapp.com/path`
*   Expo Go (desenvolvimento): `exp://128.0.0.1:8081/--/path`

O comportamento deste método no Expo Go para atualizações publicadas é indefinido e não deve ser confiável. A URL criada neste caso não é estável nem previsível durante a vida útil do aplicativo. Se uma URL estável for necessária, por exemplo, em callbacks de autorização, uma compilação (ou compilação de desenvolvimento) do seu aplicativo deve ser usada e o esquema fornecido.

Retorna uma string de URL que aponta para seu aplicativo com as informações de link direto fornecidas.

#### `Linking.getInitialURL()`

Retorna uma promessa que se resolve com a URL que iniciou o aplicativo, se houver. Útil para lidar com links diretos quando o aplicativo é iniciado.

#### `Linking.getLinkingURL()`

Retorna a URL de vinculação atual. Útil para obter a URL de vinculação em tempo real.

#### `Linking.hasConstantsManifest()`

Verifica se o manifesto de constantes está disponível. Retorna um booleano.

#### `Linking.hasCustomScheme(scheme)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `scheme` | `string` | O esquema a ser verificado. |

Verifica se o aplicativo tem um esquema personalizado registrado. Retorna um booleano.

#### `Linking.openSettings()`

Abre as configurações do aplicativo. Retorna uma promessa que se resolve quando as configurações são abertas.

#### `Linking.openURL(url)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `url` | `string` | A URL a ser aberta. |

Abre uma URL externa. Retorna uma promessa que se resolve quando a URL é aberta.

#### `Linking.parse(url)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `url` | `string` | A URL a ser analisada. |

Analisa uma URL em um objeto `ParsedURL` que contém o esquema, host, caminho e parâmetros de consulta.

#### `Linking.parseInitialURLAsync()`

Analisa a URL inicial que iniciou o aplicativo. Retorna uma promessa que se resolve com um objeto `ParsedURL`.

#### `Linking.resolveScheme(scheme)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `scheme` | `string` | O esquema a ser resolvido. |

Resolve um esquema de URL para o formato completo. Retorna uma string.

#### `Linking.sendIntent(action, extras)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `action` | `string` | A ação da intenção a ser enviada. |
| `extras` (opcional) | `SendIntentExtras` | Extras adicionais para a intenção. |

Envia uma intenção Android. **Apenas para Android.**

### Assinaturas de Eventos

#### `Linking.addEventListener(type, listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `type` | `EventType` | O tipo de evento a ser ouvido (`url`). |
| `listener` | `URLListener` | Um callback que é invocado quando um evento de URL é disparado. |

Adiciona um ouvinte para eventos de URL. Retorna uma `EventSubscription`.

### Tipos

#### `CreateURLOptions`

Tipo: `object`

Opções para o método `createURL`, incluindo `queryParams` e `scheme`.

#### `EventType`

Tipo: `string`

O tipo de evento de vinculação (`url`).

#### `NativeURLListener`

Tipo: `function`

Um callback para o ouvinte de URL nativo.

#### `ParsedURL`

Tipo: `object`

Um objeto que representa uma URL analisada, contendo `scheme`, `hostname`, `path` e `queryParams`.

#### `QueryParams`

Tipo: `object`

Um objeto que representa os parâmetros de consulta de uma URL.

#### `SendIntentExtras`

Tipo: `object`

Extras adicionais para o método `sendIntent`.

#### `URLListener`

Tipo: `function`

Um callback para o ouvinte de URL.

---

**Autor:** Manus AI
**Data de Geração:** 17 de Junho de 2025

