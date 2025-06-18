# Manifestos (Manifests)

Uma biblioteca que fornece tipos para Manifestos do Expo.

## Instalação

Para instalar a API Manifests, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-manifests
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import * as Manifests from 'expo-manifests';
```

## Tipos

### `BareManifest`

> **Depreciado:** Renomeado para `EmbeddedManifest`, será removido em algumas versões.

Tipo: `EmbeddedManifest`

### `ClientScopingConfig`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `scopeKey` (opcional) | `string` | Uma string opaca e única para delimitar dados do lado do cliente a este projeto. Este valor não mudará quando um projeto for transferido entre contas ou renomeado. |

### `EASConfig`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `projectId` (opcional) | `string` | O ID para este projeto se estiver usando EAS. UUID. Este valor não mudará quando um projeto for transferido entre contas ou renomeado. |

### `EmbeddedManifest`

Um manifesto incorporado.

Gerado durante a construção no script da etapa de construção `createManifest.js`.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `assets` | `any[]` | Uma lista de ativos incluídos no manifesto. |
| `commitTime` | `number` | O tempo de commit do manifesto. |
| `id` | `string` | O ID único do manifesto. |

### `ExpoClientConfig`

Tipo: `ExpoConfig` estendido por:

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `hostUri` (opcional) | `string` | Presente apenas durante o desenvolvimento usando `@expo/cli`. |

### `ExpoGoConfig`

Tipo: `Record<string, any>` estendido por:

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `debuggerHost` (opcional) | `string` | O host do depurador. |
| `developer` (opcional) | `Record<string, any> & { tool: string }` | Informações do desenvolvedor, incluindo a ferramenta usada. |
| `mainModuleName` (opcional) | `string` | O nome do módulo principal. |
| `packagerOpts` (opcional) | `ExpoGoPackagerOpts` | Opções do empacotador para o Expo Go. |

### `ExpoGoPackagerOpts`

Tipo: `Record<string, any>` estendido por:

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `dev` (opcional) | `boolean` | Indica se está em modo de desenvolvimento. |
| `hostType` (opcional) | `string` | O tipo de host. |
| `lanType` (opcional) | `string` | O tipo de LAN. |
| `minify` (opcional) | `boolean` | Indica se o código deve ser minificado. |
| `strict` (opcional) | `boolean` | Indica se o modo estrito está habilitado. |
| `urlRandomness` (opcional) | `string` | Aleatoriedade do URL. |
| `urlType` (opcional) | `string` | O tipo de URL. |

### `ExpoUpdatesManifest`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `assets` | `ManifestAsset[]` | Uma lista de ativos do manifesto. |
| `createdAt` | `string` | A data de criação do manifesto. |
| `extra` (opcional) | `ManifestExtra` | Dados extras incluídos no manifesto. |
| `id` | `string` | O ID único do manifesto. |
| `launchAsset` | `ManifestAsset` | O ativo de lançamento do manifesto. |
| `metadata` | `object` | Metadados do manifesto. |
| `runtimeVersion` | `string` | A versão de tempo de execução do manifesto. |

### `ManifestAsset`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `url` | `string` | O URL do ativo. |

### `ManifestExtra`

> **Depreciado:** Renomeado para `ExpoUpdatesManifest`, será removido em algumas versões.

Tipo: `ExpoUpdatesManifest`

### `NewManifest`

Tipo: `object`

Um novo tipo de manifesto.

---

**Autor:** Manus AI
**Data de Geração:** 18 de Junho de 2025

