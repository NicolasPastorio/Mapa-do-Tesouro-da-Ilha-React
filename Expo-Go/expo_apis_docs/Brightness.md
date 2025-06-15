# Brilho (Brightness)

Uma biblioteca que fornece uma API para obter e definir o brilho da tela.

Uma API para obter e definir o brilho da tela.

No Android, existe uma configuração de brilho global em todo o sistema, e cada aplicativo tem sua própria configuração de brilho que pode opcionalmente substituir a configuração global. É possível definir qualquer um desses valores com esta API. No iOS, a configuração de brilho do sistema não pode ser alterada programaticamente; em vez disso, quaisquer alterações no brilho da tela persistirão até que o dispositivo seja bloqueado ou desligado.

## Instalação

Para instalar a API Brightness, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-brightness
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) ou estiver usando um projeto Android nativo manualmente, você precisará adicionar a permissão `android.permission.WRITE_SETTINGS` ao arquivo `AndroidManifest.xml`:

`android/app/src/main/AndroidManifest.xml`

```xml
<uses-permission android:name="android.permission.WRITE_SETTINGS" />
```

## Uso

Abaixo está um exemplo que demonstra como usar `expo-brightness`.

```javascript
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Brightness from 'expo-brightness';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(1);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Exemplo do Módulo de Brilho</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

## API

```javascript
import * as Brightness from 'expo-brightness';
```

### Hooks

#### `usePermissions(options)`

| Parâmetro | Tipo |
| --- | --- |
| `options` (opcional) | `PermissionHookOptions<object>` |

Verifica ou solicita permissões para modificar o brilho do sistema. Isso usa `requestPermissionAsync` e `getPermissionsAsync` para interagir com as permissões.

Retorna:

`[null | PermissionResponse, RequestPermissionMethod<PermissionResponse>, GetPermissionMethod<PermissionResponse>]`

Exemplo:

```javascript
const [permissionResponse, requestPermission] = Brightness.usePermissions();
```

### Métodos

#### `Brightness.getBrightnessAsync()`

Obtém o nível de brilho atual da tela principal do dispositivo.

Uma `Promise` que se resolve com um número entre `0` e `1`, inclusive, representando o brilho atual da tela.

#### `Brightness.getPermissionsAsync()`

Verifica as permissões do usuário para acessar o brilho do sistema.

Uma promessa que se resolve com um objeto do tipo `PermissionResponse`.

#### `Brightness.getSystemBrightnessAsync()`

Obtém o brilho global da tela do sistema.

Uma `Promise` que se resolve com um número entre `0` e `1`, inclusive, representando o brilho atual da tela do sistema.

#### `Brightness.getSystemBrightnessModeAsync()`

Obtém o modo de brilho do sistema (por exemplo, se o sistema operacional ajustará automaticamente o brilho da tela dependendo da luz ambiente).

Uma `Promise` que se resolve com um `BrightnessMode`. Requer permissões `SYSTEM_BRIGHTNESS`.

#### `Brightness.isAvailableAsync()`

Retorna se a API Brightness está habilitada no dispositivo atual. Isso não verifica as permissões do aplicativo.

Um `boolean` assíncrono, indicando se a API Brightness está disponível no dispositivo atual. Atualmente, isso resolve `true` apenas no iOS e Android.

#### `Brightness.isUsingSystemBrightnessAsync()`

Retorna um booleano especificando se a atividade atual está usando o valor de brilho de todo o sistema.

Uma `Promise` que se resolve com `true` quando a atividade atual está usando o valor de brilho de todo o sistema, e `false` caso contrário.

#### `Brightness.requestPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar o brilho do sistema.

Uma promessa que se resolve com um objeto do tipo `PermissionResponse`.

#### `Brightness.restoreSystemBrightnessAsync()`

Redefine a configuração de brilho da atividade atual para usar o valor de brilho de todo o sistema, em vez de substituí-lo.

Uma `Promise` que se resolve quando a configuração foi alterada com sucesso.

#### `Brightness.setBrightnessAsync(brightnessValue)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `brightnessValue` | `number` | Um número entre `0` e `1`, inclusive, representando o brilho desejado da tela. |

Define o brilho atual da tela. No iOS, essa configuração persistirá até que o dispositivo seja bloqueado, após o que o brilho da tela retornará à configuração padrão do usuário. No Android, essa configuração se aplica apenas à atividade atual; ela substituirá o valor de brilho do sistema sempre que seu aplicativo estiver em primeiro plano.

Uma `Promise` que se resolve quando o brilho foi definido com sucesso.

#### `Brightness.setSystemBrightnessAsync(brightnessValue)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `brightnessValue` | `number` | Um número entre `0` e `1`, inclusive, representando o brilho desejado da tela. |

Define o brilho global da tela do sistema e altera o modo de brilho para `MANUAL`. Requer permissões `SYSTEM_BRIGHTNESS`.

Uma `Promise` que se resolve quando o brilho foi definido com sucesso.

#### `Brightness.setSystemBrightnessModeAsync(brightnessMode)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `brightnessMode` | `BrightnessMode` | O modo de brilho do sistema a ser definido. |

Define o modo de brilho do sistema. Requer permissões `SYSTEM_BRIGHTNESS`.

Uma `Promise` que se resolve quando o modo de brilho foi definido com sucesso.

### Eventos

#### `Brightness.addBrightnessListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `(event: BrightnessEvent) => void` | Uma função de callback que é invocada quando o brilho da tela muda. |

Adiciona um ouvinte para receber atualizações de brilho.

Retorna:

`EventSubscription`

### Tipos

#### `BrightnessEvent`

Tipo: `object`

Um objeto que contém o nível de brilho atual.

#### `PermissionExpiration`

Tipo: `object`

Um objeto que contém informações sobre a expiração da permissão.

#### `PermissionHookOptions`

Tipo: `object`

Opções para o hook de permissão.

#### `PermissionResponse`

Tipo: `object`

Um objeto que contém o status da permissão.

### Enums

#### `BrightnessMode`

`Brightness.BrightnessMode.AUTOMATIC` | `Brightness.BrightnessMode.MANUAL`

#### `PermissionStatus`

`Brightness.PermissionStatus.GRANTED` | `Brightness.PermissionStatus.DENIED` | `Brightness.PermissionStatus.UNDETERMINED`

### Códigos de Erro

#### `ERR_BRIGHTNESS`

`'ERR_BRIGHTNESS_SET_BRIGHTNESS_FAILED'` | `'ERR_BRIGHTNESS_GET_BRIGHTNESS_FAILED'` | `'ERR_BRIGHTNESS_SET_SYSTEM_BRIGHTNESS_FAILED'` | `'ERR_BRIGHTNESS_GET_SYSTEM_BRIGHTNESS_FAILED'` | `'ERR_BRIGHTNESS_SET_SYSTEM_BRIGHTNESS_MODE_FAILED'` | `'ERR_BRIGHTNESS_GET_SYSTEM_BRIGHTNESS_MODE_FAILED'` | `'ERR_BRIGHTNESS_RESTORE_SYSTEM_BRIGHTNESS_FAILED'`

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025

