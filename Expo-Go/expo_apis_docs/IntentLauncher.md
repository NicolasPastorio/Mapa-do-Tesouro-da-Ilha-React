# Lançador de Intenções (IntentLauncher)

Uma biblioteca que fornece uma maneira de iniciar intenções Android. Por exemplo, você pode usar esta API para abrir uma tela de configurações específica.

`expo-intent-launcher` fornece uma maneira de iniciar intenções Android. Por exemplo, você pode usar esta API para abrir uma tela de configurações específica.

## Instalação

Para instalar a API IntentLauncher, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-intent-launcher
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import { Button, View, StyleSheet, Text } from 'react-native';

export default function App() {
  const openLocationSettings = async () => {
    await startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
  };

  const openAppSettings = async () => {
    await startActivityAsync(ActivityAction.APPLICATION_DETAILS_SETTINGS, {
      data: `package:${'com.your.package.name'}`, // Substitua pelo nome do pacote do seu aplicativo
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Exemplos de IntentLauncher:</Text>
      <Button title="Abrir Configurações de Localização" onPress={openLocationSettings} />
      <Button title="Abrir Configurações do Aplicativo" onPress={openAppSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
```

## API

```javascript
import * as IntentLauncher from 'expo-intent-launcher';
```

### Métodos

#### `IntentLauncher.getApplicationIconAsync(packageName)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `packageName` | `string` | O nome do pacote do aplicativo. |

Retorna uma promessa que se resolve com o URI do ícone do aplicativo para o nome do pacote fornecido.

#### `IntentLauncher.openApplication(packageName)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `packageName` | `string` | O nome do pacote do aplicativo a ser aberto. |

Abre um aplicativo pelo nome do pacote. Retorna uma promessa que se resolve quando o aplicativo é aberto.

#### `IntentLauncher.startActivityAsync(action, params)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `action` | `string` | A ação da intenção a ser iniciada (por exemplo, `ActivityAction.LOCATION_SOURCE_SETTINGS`). |
| `params` (opcional) | `IntentLauncherParams` | Parâmetros adicionais para a intenção. |

Inicia uma atividade Android com a ação e os parâmetros fornecidos. Retorna uma promessa que se resolve com um objeto `IntentLauncherResult`.

### Interfaces

#### `IntentLauncherParams`

Tipo: `object`

Um objeto que contém parâmetros para a intenção, como `data`, `type`, `extra` e `flags`.

#### `IntentLauncherResult`

Tipo: `object`

Um objeto que representa o resultado de uma atividade iniciada, contendo `resultCode` e `data` (opcional).

### Enums

#### `ActivityAction`

Enum que contém constantes de ação de atividade Android, como `ACCESSIBILITY_SETTINGS`, `AIRPLANE_MODE_SETTINGS`, `APPLICATION_DETAILS_SETTINGS`, etc.

#### `ResultCode`

Enum que representa os códigos de resultado de uma atividade Android (`CANCELED`, `OK`).

---

**Autor:** Manus AI
**Data de Geração:** 15 de Junho de 2025

