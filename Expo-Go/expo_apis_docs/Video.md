# Vídeo (expo-video)

Uma biblioteca que fornece uma API para implementar a reprodução de vídeo em aplicativos.

`expo-video` é um componente de vídeo multiplataforma e de alto desempenho para React Native e Expo com suporte Web.

## Instalação

Para instalar a biblioteca `expo-video`, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-video
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no app config

Você pode configurar `expo-video` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário de aplicativo para entrar em vigor. Se o seu aplicativo **não** usar o EAS Build, você precisará configurar o pacote manualmente.

### Exemplo de app.json com config plugin

```json
{
  "expo": {
    "plugins": [
      [
        "expo-video",
        {
          "android": {
            "usesCleartextTraffic": true
          }
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Propriedade | Padrão | Descrição |
|---|---|---|
| `android.usesCleartextTraffic` | `false` | Se o aplicativo pode usar tráfego de texto simples (HTTP) para vídeo. |

## API

```javascript
import { Video } from "expo-video";
```

## Componente `Video`

O componente `Video` é um componente React Native que exibe um vídeo. Ele aceita as seguintes props:

| Propriedade | Tipo | Descrição |
|---|---|---|
| `source` | `string` ou `object` | A fonte do vídeo. Pode ser uma URI local ou remota. |
| `useNativeControls` | `boolean` | Se os controles nativos do player de vídeo devem ser exibidos. |
| `shouldPlay` | `boolean` | Se o vídeo deve começar a ser reproduzido automaticamente. |
| `isLooping` | `boolean` | Se o vídeo deve ser reproduzido em loop. |
| `volume` | `number` | O volume do vídeo (0.0 a 1.0). |
| `rate` | `number` | A taxa de reprodução do vídeo. |
| `isMuted` | `boolean` | Se o vídeo deve ser silenciado. |
| `resizeMode` | `string` | Como o vídeo deve ser redimensionado para caber em seu contêiner. Valores possíveis: `contain`, `cover`, `stretch`. |
| `onPlaybackStatusUpdate` | `function` | Um callback que é chamado quando o status de reprodução do vídeo é atualizado. |

```javascript
import { Video } from "expo-video";
import { View, StyleSheet, Button } from "react-native";
import { useState, useRef } from "react";

function VideoPlayer() {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pausar" : "Reproduzir"}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default VideoPlayer;
```

## Métodos do componente `Video`

O componente `Video` expõe vários métodos que podem ser acessados através de uma `ref`.

### `video.current.playAsync()`

Inicia a reprodução do vídeo.

### `video.current.pauseAsync()`

Pausa a reprodução do vídeo.

### `video.current.stopAsync()`

Pausa a reprodução do vídeo e redefine a posição de reprodução para o início.

### `video.current.replayAsync()`

Reinicia a reprodução do vídeo do início.

### `video.current.setPositionAsync(millis)`

Define a posição de reprodução do vídeo em milissegundos.

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `millis` | `number` | A posição em milissegundos para a qual o vídeo deve ser movido. |

### `video.current.setVolumeAsync(value)`

Define o volume do vídeo.

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `value` | `number` | O volume (0.0 a 1.0). |

### `video.current.setRateAsync(value, shouldCorrectPitch)`

Define a taxa de reprodução do vídeo.

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `value` | `number` | A taxa de reprodução. |
| `shouldCorrectPitch` | `boolean` | Se o tom deve ser corrigido ao alterar a taxa. |

## API `expo-video`

Além do componente `Video`, a biblioteca `expo-video` também fornece algumas funções utilitárias.

### `clearVideoCacheAsync()`

Limpa o cache de vídeo.

```javascript
import { clearVideoCacheAsync } from "expo-video";

async function clearCache() {
  await clearVideoCacheAsync();
  console.log("Cache de vídeo limpo.");
}

// clearCache();
```

### `createVideoPlayer()`

Cria uma instância de um player de vídeo. (Geralmente não é necessário usar diretamente, o componente `Video` já faz isso).

### `getCurrentVideoCacheSizeAsync()`

Retorna o tamanho atual do cache de vídeo em bytes.

```javascript
import { getCurrentVideoCacheSizeAsync } from "expo-video";

async function getVideoCacheSize() {
  const size = await getCurrentVideoCacheSizeAsync();
  console.log("Tamanho do cache de vídeo:", size, "bytes");
}

// getVideoCacheSize();
```

### `isPictureInPictureSupported()`

Verifica se o modo Picture-in-Picture é suportado no dispositivo.

```javascript
import { isPictureInPictureSupported } from "expo-video";

const isSupported = isPictureInPictureSupported();
console.log("Picture-in-Picture suportado:", isSupported);
```

### `setVideoCacheSizeAsync(size)`

Define o tamanho máximo do cache de vídeo em bytes.

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `size` | `number` | O tamanho máximo do cache em bytes. |

```javascript
import { setVideoCacheSizeAsync } from "expo-video";

async function setCacheSize(size) {
  await setVideoCacheSizeAsync(size);
  console.log("Tamanho do cache de vídeo definido para:", size, "bytes");
}

// setCacheSize(1024 * 1024 * 100); // 100 MB
```

---

**Autor:** Manus AI
**Data de Geração:** 22 de Junho de 2025

