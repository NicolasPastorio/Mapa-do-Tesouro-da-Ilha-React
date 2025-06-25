# Fala (Speech)

Uma biblioteca que fornece acesso à funcionalidade de texto para fala.

`expo-speech` fornece uma API que permite utilizar a funcionalidade de Texto para Fala em seu aplicativo.

## Instalação

Para instalar a API Speech, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-speech
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const speak = () => {
    const thingToSay = 'Olá, mundo!';
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.container}>
      <Button title="Pressione para ouvir algumas palavras" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
```

## API

```javascript
import * as Speech from 'expo-speech';
```

## Constantes

### `Speech.maxSpeechInputLength`

Tipo: `number`

Comprimento máximo de texto aceitável pelo método `Speech.speak()`. É dependente da plataforma. No iOS, isso retorna `Number.MAX_VALUE`.

## Métodos

### `Speech.getAvailableVoicesAsync()`

Retorna uma lista de todas as vozes disponíveis. Retorna uma promessa que se resolve com um array de objetos `Voice`.

### `Speech.isSpeakingAsync()`

Determina se a utilidade de Texto para Fala está falando atualmente. Retornará `true` se o locutor estiver pausado. Retorna uma promessa que se resolve com um booleano, `true` se estiver falando, `false` caso contrário.

### `Speech.pause()`

Pausa a fala atual. Este método não está disponível no Android.

### `Speech.resume()`

Retoma a fala previamente pausada ou não faz nada se não houver nenhuma. Este método não está disponível no Android.

### `Speech.speak(text, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `text` | `string` | O texto a ser falado. Não pode ser maior que `Speech.maxSpeechInputLength`. |
| `options` (opcional) | `SpeechOptions` | Um objeto `SpeechOptions`. Padrão: `{}`. |

Fala o texto em voz alta com as opções fornecidas. Chamar isso quando outro texto está sendo falado adiciona uma fala à fila.

### `Speech.stop()`

Interrompe a fala atual e exclui tudo na fila.

## Tipos

### `SpeechEventCallback(this, ev)`

Uma função de callback para eventos de fala.

### `SpeechOptions`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `_voiceIndex` (opcional) | `number` | Índice da voz a ser usada. |
| `language` (opcional) | `string` | O código de um idioma que deve ser usado para ler o `text`, consulte [IETF BCP 47](https://www.rfc-editor.org/info/bcp47) para ver códigos válidos. |
| `onBoundary` (opcional) | `NativeBoundaryEventCallback` ou `SpeechEventCallback` ou `null` | Um callback que é invocado quando a fala atinge uma palavra. |
| `onDone` (opcional) | `() => void` ou `SpeechEventCallback` | Um callback que é invocado quando a fala termina. |
| `onError` (opcional) | `(error: Error) => void` ou `SpeechEventCallback` | **Apenas para:** Android, iOS. Um callback que é invocado quando ocorre um erro durante a fala. |
| `onMark` (opcional) | `SpeechEventCallback` ou `null` | Um callback que é invocado quando a fala atinge uma marca. |
| `onPause` (opcional) | `SpeechEventCallback` ou `null` | Um callback que é invocado quando a fala é pausada. |
| `onResume` (opcional) | `SpeechEventCallback` ou `null` | Um callback que é invocado quando a fala é retomada. |
| `onStart` (opcional) | `() => void` ou `SpeechEventCallback` | Um callback que é invocado quando a fala começa. |
| `onStopped` (opcional) | `() => void` ou `SpeechEventCallback` | Um callback que é invocado quando a fala é interrompida chamando `Speech.stop()`. |
| `pitch` (opcional) | `number` | Tom da voz para falar o `text`. `1.0` é o tom normal. |
| `rate` (opcional) | `number` | Taxa da voz para falar o `text`. `1.0` é a taxa normal. |
| `volume` (opcional) | `number` | Volume da voz para falar o `text`. `1.0` é o volume máximo. |
| `voice` (opcional) | `string` | O identificador da voz a ser usada. |

Um objeto que contém opções para a funcionalidade de texto para fala.

### `Voice`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `identifier` | `string` | O identificador da voz. |
| `name` | `string` | O nome da voz. |
| `language` | `string` | O idioma da voz. |
| `quality` | `VoiceQuality` | A qualidade da voz (por exemplo, `DEFAULT`, `HIGH`, `LOW`). |
| `isDefault` | `boolean` | Se esta é a voz padrão para o idioma. |

Um objeto que representa uma voz disponível para síntese de fala.

### `WebVoice`

Tipo: `object`

Um objeto que representa uma voz disponível para síntese de fala na web.

## Enums

### `VoiceQuality`

Enum que representa a qualidade da voz. Valores possíveis: `DEFAULT`, `HIGH`, `LOW`.

---

**Autor:** Manus AI
**Data de Geração:** 20 de Junho de 2025

