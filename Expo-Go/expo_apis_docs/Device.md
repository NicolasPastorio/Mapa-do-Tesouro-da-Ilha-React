# Dispositivo (Device)

Uma biblioteca universal que fornece acesso a informações do sistema sobre o dispositivo físico.

`expo-device` fornece acesso a informações do sistema sobre o dispositivo físico, como seu fabricante e modelo.

## Instalação

Para instalar a API Device, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-device
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

### Uso Básico do Dispositivo

```javascript
import { Text, View, StyleSheet } from 'react-native';
import * as Device from 'expo-device';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        Fabricante do Dispositivo: {Device.manufacturer}
      </Text>
      <Text>
        Nome do Modelo do Dispositivo: {Device.modelName}
      </Text>
      <Text>
        Versão do SO: {Device.osVersion}
      </Text>
      <Text>
        É um Dispositivo Físico: {Device.isDevice ? 'Sim' : 'Não'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## API

```javascript
import * as Device from 'expo-device';
```

### Constantes

O objeto `Device` expõe várias constantes que fornecem informações sobre o dispositivo:

*   **`Device.brand`**: A marca do dispositivo (por exemplo, `Apple`, `Samsung`).
*   **`Device.designName`**: O nome de design do dispositivo (por exemplo, `iPhone 13 Pro`).
*   **`Device.deviceName`**: O nome do dispositivo (por exemplo, `Meu iPhone`).
*   **`Device.deviceType`**: O tipo de dispositivo (por exemplo, `PHONE`, `TABLET`, `DESKTOP`).
*   **`Device.deviceYearClass`**: A classe de ano do dispositivo, útil para determinar o desempenho aproximado do dispositivo.
*   **`Device.isDevice`**: Um booleano que indica se o aplicativo está sendo executado em um dispositivo físico (true) ou em um simulador/emulador (false).
*   **`Device.manufacturer`**: O fabricante do dispositivo (por exemplo, `Apple`).
*   **`Device.modelId`**: O identificador do modelo do dispositivo (por exemplo, `iPhone14,2`).
*   **`Device.modelName`**: O nome do modelo do dispositivo (por exemplo, `iPhone 13 Pro`).
*   **`Device.osBuildFingerprint`**: A impressão digital da build do sistema operacional.
*   **`Device.osBuildId`**: O ID da build do sistema operacional.
*   **`Device.osInternalBuildId`**: O ID interno da build do sistema operacional.
*   **`Device.osName`**: O nome do sistema operacional (por exemplo, `iOS`, `Android`).
*   **`Device.osVersion`**: A versão do sistema operacional (por exemplo, `15.5`).
*   **`Device.platformApiLevel`**: O nível da API da plataforma (apenas Android).
*   **`Device.productName`**: O nome do produto do dispositivo.
*   **`Device.supportedCpuArchitectures`**: Um array de strings que representa as arquiteturas de CPU suportadas pelo dispositivo.
*   **`Device.totalMemory`**: A memória total do dispositivo em bytes. Na web, este valor é sempre `null`.

### Métodos

#### `Device.getDeviceTypeAsync()`

Retorna uma promessa que se resolve com o tipo de dispositivo (por exemplo, `PHONE`, `TABLET`, `DESKTOP`).

#### `Device.getMaxMemoryAsync()`

Retorna uma promessa que se resolve com a quantidade máxima de memória que um aplicativo pode usar em bytes. Na web, este valor é sempre `null`.

#### `Device.getPlatformFeaturesAsync()`

Retorna uma promessa que se resolve com um array de strings que representa os recursos da plataforma suportados pelo dispositivo.

#### `Device.getUptimeAsync()`

Retorna uma promessa que se resolve com o tempo de atividade do dispositivo em milissegundos.

#### `Device.hasPlatformFeatureAsync(feature)`

Verifica se o dispositivo possui um recurso de plataforma específico. Retorna uma promessa que se resolve com um booleano.

#### `Device.isRootedExperimentalAsync()`

Verifica se o dispositivo foi rooteado (Android) ou jailbroken (iOS). Retorna uma promessa que se resolve com um booleano. **Este método é experimental e não é completamente confiável.**

#### `Device.isSideLoadingEnabledAsync()`

Verifica se o sideloading está habilitado no dispositivo (apenas Android). Retorna uma promessa que se resolve com um booleano.

### Enums

#### `DeviceType`

Enum que representa os tipos de dispositivo (`UNKNOWN`, `PHONE`, `TABLET`, `DESKTOP`, `TV`).

---

**Autor:** Manus AI
**Data de Geração:** 14 de Junho de 2025

