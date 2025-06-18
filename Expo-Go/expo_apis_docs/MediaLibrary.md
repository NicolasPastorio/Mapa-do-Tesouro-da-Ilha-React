# Biblioteca de Mídia (MediaLibrary)

Uma biblioteca que fornece acesso à biblioteca de mídia do dispositivo.

`expo-media-library` fornece acesso à biblioteca de mídia do usuário, permitindo que eles acessem suas imagens e vídeos existentes de seu aplicativo, bem como salvem novos. Você também pode assinar quaisquer atualizações feitas na biblioteca de mídia do usuário.

> O Android permite acesso total à biblioteca de mídia (que é o propósito deste pacote) apenas para aplicativos que precisam de amplo acesso a fotos. Consulte [Detalhes sobre a política de permissões de fotos e vídeos do Google Play](https://developer.android.com/training/data-storage/shared/media#media-permissions) para obter mais informações.

## Instalação

Para instalar a API MediaLibrary, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-media-library
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.json`

Você pode configurar `expo-media-library` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-media-library",
        {
          "photosPermission": "Permitir que $(PRODUCT_NAME) acesse suas fotos.",
          "savePhotosPermission": "Permitir que $(PRODUCT_NAME) salve fotos.",
          "isAccessMediaLocationEnabled": true
        }
      ]
    ]
  }
}
```

### Propriedades Configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `photosPermission` | `"Permitir que $(PRODUCT_NAME) acesse suas fotos."` | **Apenas para iOS:** Define a mensagem de permissão `NSPhotoLibraryUsageDescription` no `Info.plist`. |
| `savePhotosPermission` | `"Permitir que $(PRODUCT_NAME) salve fotos."` | **Apenas para iOS:** Define a mensagem de permissão `NSPhotoLibraryAddUsageDescription` no `Info.plist`. |
| `preventAutomaticLimitedAccessAlert` | `false` | **Apenas para iOS:** Impede que o alerta de acesso limitado automático seja exibido quando o usuário tem acesso limitado à biblioteca de fotos. Útil para aplicativos que desejam acessar apenas a biblioteca de fotos limitada sem que o iOS force a exibição do alerta. |
| `isAccessMediaLocationEnabled` | `false` | **Apenas para Android:** Define se deve ou não solicitar a permissão `ACCESS_MEDIA_LOCATION` no Android. |

Você está usando esta biblioteca em um aplicativo React Native existente?

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/bare/continuous-native-generation/)) ou estiver usando projetos nativos Android/iOS manualmente, então você precisa adicionar as seguintes permissões e configurações aos seus projetos nativos:

#### Android

*   Para acessar a localização do ativo (tags EXIF de latitude e longitude), adicione a permissão `ACCESS_MEDIA_LOCATION` ao seu `android/app/src/main/AndroidManifest.xml`:

    ```xml
    <uses-permission android:name="android.permission.ACCESS_MEDIA_LOCATION" />
    ```

*   [Armazenamento com escopo](https://developer.android.com/training/data-storage/scoped-storage) está disponível a partir do Android 10. Para fazer com que `expo-media-library` funcione com armazenamento com escopo, você precisa adicionar...

## Uso

```javascript
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const savePhoto = async () => {
    if (photo) {
      try {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        await MediaLibrary.createAlbumAsync('MyPhotos', asset, false);
        alert('Foto salva na galeria!');
        setPhoto(null);
      } catch (error) {
        console.error('Erro ao salvar foto:', error);
        alert('Erro ao salvar foto.');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  if (hasPermission === null) {
    return <Text>Aguardando permissão da biblioteca de mídia...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à biblioteca de mídia.</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title="Escolher foto da galeria" onPress={pickImage} />
      {photo && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: photo.uri }} style={styles.image} />
          <Button title="Salvar foto na galeria" onPress={savePhoto} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});
```

## API

```javascript
import * as MediaLibrary from 'expo-media-library';
```

### Componente

#### `<MediaLibrary.Asset />`

Um componente React Native para exibir um ativo de mídia. (Geralmente não é usado diretamente, mas sim através de `Image` ou `Video` com o URI do ativo).

### Constantes

#### `MediaLibrary.MediaType`

Enum que representa os tipos de mídia (`photo`, `video`, `audio`).

#### `MediaLibrary.SortBy`

Enum que representa as opções de classificação para ativos de mídia (`creationTime`, `modificationTime`, `mediaType`).

### Hooks

#### `usePermissions()`

Um hook que retorna o status da permissão da biblioteca de mídia e uma função para solicitá-la.

### Métodos

#### `MediaLibrary.addAssetsToAlbumAsync(assets, album, copyAssets)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `assets` | `Asset[]` | Um array de ativos a serem adicionados. |
| `album` | `Album` ou `string` | O álbum ao qual os ativos serão adicionados. Pode ser um objeto `Album` ou o ID do álbum. |
| `copyAssets` (opcional) | `boolean` | Se `true`, os ativos serão copiados para o álbum. Se `false`, eles serão movidos. Padrão: `true`. |

Adiciona ativos a um álbum existente. Retorna uma promessa que se resolve com um booleano indicando o sucesso.

#### `MediaLibrary.albumNeedsMigrationAsync(albumId)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `albumId` | `string` | O ID do álbum a ser verificado. |

Verifica se um álbum precisa ser migrado. **Apenas para Android.** Retorna uma promessa que se resolve com um booleano.

#### `MediaLibrary.createAlbumAsync(albumName, asset, copyAssets)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `albumName` | `string` | O nome do novo álbum. |
| `asset` | `Asset` ou `string` | O ativo a ser adicionado ao novo álbum. Pode ser um objeto `Asset` ou o URI do ativo. |
| `copyAssets` (opcional) | `boolean` | Se `true`, o ativo será copiado para o álbum. Se `false`, ele será movido. Padrão: `true`. |

Cria um novo álbum e adiciona um ativo a ele. Retorna uma promessa que se resolve com um objeto `Album`.

#### `MediaLibrary.createAssetAsync(uri)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `uri` | `string` | O URI do arquivo a ser criado como um ativo. |

Cria um novo ativo de mídia a partir de um URI de arquivo. Retorna uma promessa que se resolve com um objeto `Asset`.

#### `MediaLibrary.deleteAlbumsAsync(albumIds, shouldDeleteAssets)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `albumIds` | `string[]` | Um array de IDs de álbuns a serem excluídos. |
| `shouldDeleteAssets` (opcional) | `boolean` | Se `true`, os ativos dentro dos álbuns também serão excluídos. Padrão: `false`. |

Exclui álbuns. Retorna uma promessa que se resolve com um booleano indicando o sucesso.

#### `MediaLibrary.deleteAssetsAsync(assetIds)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `assetIds` | `string[]` | Um array de IDs de ativos a serem excluídos. |

Exclui ativos de mídia. Retorna uma promessa que se resolve com um booleano indicando o sucesso.

#### `MediaLibrary.getAlbumAsync(albumName)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `albumName` | `string` | O nome do álbum a ser recuperado. |

Recupera um álbum pelo nome. Retorna uma promessa que se resolve com um objeto `Album` ou `null` se o álbum não for encontrado.

#### `MediaLibrary.getAssetInfoAsync(assetId)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `assetId` | `string` | O ID do ativo a ser recuperado. |

Recupera informações detalhadas sobre um ativo de mídia. Retorna uma promessa que se resolve com um objeto `Asset`.

#### `MediaLibrary.getAssetsAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` (opcional) | `GetAssetsOptions` | Opções para a consulta de ativos. |

Recupera ativos de mídia da biblioteca. Retorna uma promessa que se resolve com um objeto `PagedInfo` contendo os ativos.

#### `MediaLibrary.getMomentsAsync()`

Recupera momentos da biblioteca de mídia. **Apenas para iOS.** Retorna uma promessa que se resolve com um array de objetos `Moment`.

#### `MediaLibrary.getPermissionsAsync()`

Obtém o status da permissão da biblioteca de mídia. Retorna uma promessa que se resolve com um objeto `PermissionResponse`.

#### `MediaLibrary.isAvailableAsync()`

Verifica se a API MediaLibrary está disponível no dispositivo. Retorna uma promessa que se resolve com um booleano.

#### `MediaLibrary.migrateAlbumIfNeededAsync(albumId)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `albumId` | `string` | O ID do álbum a ser migrado. |

Migra um álbum se necessário. **Apenas para Android.** Retorna uma promessa que se resolve com um booleano.

#### `MediaLibrary.presentPermissionsPickerAsync()`

Abre o seletor de permissões do sistema para a biblioteca de fotos. **Apenas para iOS 14+.**

#### `MediaLibrary.removeAssetsFromAlbumAsync(assets, album)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `assets` | `Asset[]` | Um array de ativos a serem removidos. |
| `album` | `Album` ou `string` | O álbum do qual os ativos serão removidos. Pode ser um objeto `Album` ou o ID do álbum. |

Remove ativos de um álbum. Retorna uma promessa que se resolve com um booleano indicando o sucesso.

#### `MediaLibrary.removeSubscription(subscription)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `subscription` | `EventSubscription` | Uma assinatura a ser removida. |

Remove a assinatura fornecida para atualizações da biblioteca de mídia.

#### `MediaLibrary.requestPermissionsAsync(writeOnly)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `writeOnly` (opcional) | `boolean` | Se `true`, solicita apenas permissões de gravação. Padrão: `false`. |

Solicita permissões para acessar a biblioteca de mídia. Retorna uma promessa que se resolve com um objeto `PermissionResponse`.

#### `MediaLibrary.subscribe(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `() => void` | Um callback que é invocado quando a biblioteca de mídia é alterada. |

Assina as atualizações da biblioteca de mídia. Retorna uma `EventSubscription`.

#### `MediaLibrary.getAlbumsAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` (opcional) | `GetAlbumsOptions` | Opções para a consulta de álbuns. |

Recupera álbuns da biblioteca de mídia. Retorna uma promessa que se resolve com um array de objetos `Album`.

### Tipos

#### `Album`

Tipo: `object`

Um objeto que representa um álbum de mídia, contendo `id`, `title`, `assetCount`, `type`.

#### `Asset`

Tipo: `object`

Um objeto que representa um ativo de mídia (foto ou vídeo), contendo `id`, `uri`, `mediaType`, `width`, `height`, `creationTime`, `modificationTime`, `duration`, `albumId`, `filename`, `exif`, `location`.

#### `GetAlbumsOptions`

Tipo: `object`

Opções para a função `getAlbumsAsync`, incluindo `sortBy`.

#### `GetAssetsOptions`

Tipo: `object`

Opções para a função `getAssetsAsync`, incluindo `first`, `after`, `album`, `sortBy`, `mediaType`, `createdAfter`, `createdBefore`.

#### `Moment`

Tipo: `object`

Um objeto que representa um momento (coleção de fotos e vídeos de um determinado tempo e local). **Apenas para iOS.**

#### `PagedInfo`

Tipo: `object`

Um objeto que representa informações paginadas, contendo `assets`, `endCursor`, `hasNextPage`, `totalCount`.

#### `PermissionResponse`

Tipo: `object`

Um objeto que contém o status da permissão (`granted`, `denied`, `undetermined`).

---

**Autor:** Manus AI
**Data de Geração:** 18 de Junho de 2025

