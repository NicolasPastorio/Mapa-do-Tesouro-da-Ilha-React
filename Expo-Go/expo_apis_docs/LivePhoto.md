# Live Photo (LivePhoto)

Uma biblioteca que permite exibir Live Photos no iOS.

## Instalação

Para instalar a API LivePhoto, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-live-photo
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

Aqui está um exemplo simples de uso de `expo-live-photo` combinado com `expo-image-picker`.

```javascript
import * as ImagePicker from 'expo-image-picker';
import { LivePhotoAsset, LivePhotoView, LivePhotoViewType } from 'expo-live-photo';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default function LivePhotoScreen() {
  const viewRef = useRef<LivePhotoViewType>(null);
  const [livePhoto, setLivePhoto] = useState<LivePhotoAsset | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaTypeOptions.LivePhotos],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setLivePhoto({
        uri: result.assets[0].uri,
        // Se o Live Photo tiver um URI de vídeo separado, adicione-o aqui
        // videoUri: result.assets[0].videoUri,
      });
    }
  };

  return (
    <View style={styles.container}>
      {livePhoto ? (
        <LivePhotoView
          ref={viewRef}
          style={styles.livePhoto}
          asset={livePhoto}
          onLoadStart={() => console.log("Live Photo carregando...")}
          onLoad={() => console.log("Live Photo carregada!")}
          onPlaybackStart={() => console.log("Reprodução iniciada!")}
          onPlaybackStop={() => console.log("Reprodução parada!")}
          onPhotoLoad={() => console.log("Foto do Live Photo carregada!")}
          onError={(error) => console.error("Erro ao carregar Live Photo:", error)}
        />
      ) : (
        <Text>Nenhuma Live Photo selecionada.</Text>
      )}
      <Button title="Selecionar Live Photo" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  livePhoto: {
    width: 300,
    height: 300,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
});
```

## API

```javascript
import { LivePhotoView } from 'expo-live-photo';
```

### Componente

#### `<LivePhotoView />`

Um componente React Native que exibe Live Photos. Ele aceita as seguintes propriedades:

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `asset` | `LivePhotoAsset` | O ativo Live Photo a ser exibido. |
| `contentFit` (opcional) | `string` | Determina como o conteúdo da Live Photo deve ser redimensionado para caber na visualização. Valores aceitáveis: `contain`, `cover`, `fill`, `none`, `scale-down`. Padrão: `contain`. |
| `shouldPlayContent` (opcional) | `boolean` | Determina se a Live Photo deve reproduzir o conteúdo (vídeo e áudio). Padrão: `true`. |
| `shouldPlayAudio` (opcional) | `boolean` | Determina se a Live Photo também deve reproduzir áudio. Padrão: `true`. |
| `onLoad` (opcional) | `() => void` | Chamado quando a Live Photo é carregada e está pronta para ser reproduzida. |
| `onError` (opcional) | `(error: LivePhotoLoadError) => void` | Chamado quando ocorre um erro ao carregar. |
| `onLoadStart` (opcional) | `() => void` | Chamado quando a Live Photo começa a carregar. |
| `onPlaybackStart` (opcional) | `() => void` | Chamado quando a reprodução começa. |
| `onPlaybackStop` (opcional) | `() => void` | Chamado quando a reprodução para. |
| `onPhotoLoad` (opcional) | `() => void` | Chamado quando a foto de visualização da Live Photo é carregada. |
| `useDefaultGestureRecognizer` (opcional) | `boolean` | Determina se o reconhecedor de gestos padrão do iOS deve ser usado. Quando `true`, a reprodução começará se o usuário pressionar e segurar o `LivePhotoView`. Padrão: `true`. |

### Métodos do Componente

#### `LivePhotoView.isAvailable()`

Verifica se o recurso Live Photo está disponível no dispositivo. Retorna um booleano.

### Tipos

#### `ContentFit`

Tipo: `string`

Define como o conteúdo da Live Photo deve ser redimensionado. Valores possíveis: `contain`, `cover`, `fill`, `none`, `scale-down`.

#### `LivePhotoAsset`

Tipo: `object`

Um objeto que representa um ativo Live Photo, contendo `uri` (URI da foto) e `videoUri` (URI do vídeo, opcional).

#### `LivePhotoLoadError`

Tipo: `object`

Um objeto que representa um erro de carregamento da Live Photo, contendo `message` e `code`.

#### `LivePhotoViewType`

Tipo: `object`

O tipo de referência para o componente `LivePhotoView`.

#### `PlaybackStyle`

Tipo: `string`

Define o estilo de reprodução da Live Photo. Valores possíveis: `full`, `still`.

---

**Autor:** Manus AI
**Data de Geração:** 17 de Junho de 2025

