# Miniaturas de Vídeo (VideoThumbnails)

Uma biblioteca que permite gerar uma imagem para servir como miniatura de um arquivo de vídeo.

`expo-video-thumbnails` permite gerar uma imagem para servir como miniatura de um arquivo de vídeo. Isso pode ser usado, por exemplo, para criar uma galeria de vídeos.

## Instalação

Para instalar a biblioteca `expo-video-thumbnails`, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-video-thumbnails
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import { useState } from 'react';
import { StyleSheet, Button, View, Image, Text } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function App() {
  const [image, setImage] = useState(null);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        {
          time: 15000,
          quality: 0.5,
        }
      );
      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={generateThumbnail} title="Gerar Miniatura" />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    margin: 15,
  },
});
```

## API

```javascript
import * as VideoThumbnails from 'expo-video-thumbnails';
```

### `VideoThumbnails.getThumbnailAsync(source, options)`

Gera uma miniatura de um vídeo.

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `source` | `string` | A URI do arquivo de vídeo. |
| `options` (opcional) | `VideoThumbnailsOptions` | Opções para a geração da miniatura. |

#### `VideoThumbnailsOptions`

| Propriedade | Tipo | Padrão | Descrição |
|---|---|---|---|
| `time` | `number` | `0` | O tempo em milissegundos do vídeo para gerar a miniatura. |
| `quality` | `number` | `1` | A qualidade da imagem da miniatura (0 a 1). |

#### Retorna

Um objeto `VideoThumbnailsResult` com a URI da miniatura gerada.

```javascript
import * as VideoThumbnails from 'expo-video-thumbnails';

async function generateVideoThumbnail(videoUri) {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(
      videoUri,
      {
        time: 5000, // Gerar miniatura aos 5 segundos
        quality: 0.8,
      }
    );
    console.log("Miniatura gerada:", uri);
    return uri;
  } catch (e) {
    console.error("Erro ao gerar miniatura:", e);
    return null;
  }
}

// Exemplo de uso:
// generateVideoThumbnail("https://example.com/myvideo.mp4");
```

## Tipos

### `VideoThumbnailsOptions`

### `VideoThumbnailsResult`

---

**Autor:** Manus AI
**Data de Geração:** 22 de Junho de 2025

