# Compartilhamento (Sharing)

Uma biblioteca que permite implementar o compartilhamento de arquivos.

`expo-sharing` permite que você compartilhe arquivos diretamente com outros aplicativos compatíveis.

#### Limitações de compartilhamento na web

*   `expo-sharing` para web é construído sobre a [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API), que ainda tem [suporte de navegador muito limitado](https://caniuse.com/web-share). Certifique-se de verificar se a API pode ser usada antes de chamá-la usando `Sharing.isAvailableAsync()`.
*   HTTPS necessário na web: A Web Share API está disponível na web apenas quando a página é servida via HTTPS. Execute seu aplicativo com `npx expo start --tunnel` para habilitá-lo.
*   Sem compartilhamento de arquivo local na web: O compartilhamento de arquivos locais por URI funciona no Android e iOS, mas não na web. Você não pode compartilhar arquivos locais na web por URI — você precisará fazer upload deles em algum lugar e compartilhar esse URI.

#### Compartilhando para seu aplicativo a partir de outros aplicativos

Atualmente, `expo-sharing` suporta apenas o compartilhamento _do seu aplicativo para outros aplicativos_ e você não pode registrar seu aplicativo para ter conteúdo compartilhado com ele através da caixa de diálogo de compartilhamento nativa em plataformas nativas. Você pode ler mais [na solicitação de recurso relacionada](https://github.com/expo/expo/issues/10039). Você pode configurar essa funcionalidade manualmente no Xcode e Android Studio e criar um [Expo Config Plugin](https://docs.expo.dev/guides/config-plugins/) para continuar usando o [Expo Prebuild](https://docs.expo.dev/workflow/prebuild/).

## Instalação

Para instalar a API Sharing, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sharing
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import * as Sharing from 'expo-sharing';
```

## Métodos

### `Sharing.isAvailableAsync()`

Determina se a API de compartilhamento pode ser usada neste aplicativo.

Retorna uma promessa que se resolve com `true` se a API de compartilhamento puder ser usada e `false` caso contrário.

### `Sharing.shareAsync(url, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `url` | `string` | URL do arquivo local a ser compartilhado. |
| `options` (opcional) | `SharingOptions` | Um mapa de opções de compartilhamento. Padrão: `{}`. |

Abre a folha de ação para compartilhar o arquivo com diferentes aplicativos que podem lidar com esse tipo de arquivo.

## Tipos

#### `SharingOptions`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `anchor` (opcional) | `{ height: number, width: number, x: number, y: number }` | **Apenas para:** iOS. Define o ponto de ancoragem para iPad. |
| `dialogTitle` (opcional) | `string` | **Apenas para:** Android, Web. Define o título da caixa de diálogo de compartilhamento. |
| `mimeType` (opcional) | `string` | **Apenas para:** Android. Define o `mimeType` para `Intent`. |
| `UTI` (opcional) | `string` | **Apenas para:** iOS. [Identificador de Tipo Uniforme](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/understanding_utis/understanding_utis.html) - o tipo do arquivo de destino. |

---

**Autor:** Manus AI
**Data de Geração:** 19 de Junho de 2025

