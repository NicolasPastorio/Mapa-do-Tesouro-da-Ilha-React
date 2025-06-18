# Rede (Network)

Uma biblioteca que fornece acesso a informações sobre a rede do dispositivo, como seu endereço IP, endereço MAC e status do modo avião.

`expo-network` fornece informações úteis sobre a rede do dispositivo, como seu endereço IP, endereço MAC e status do modo avião.

## Instalação

Para instalar a API Network, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-network
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração

No Android, este módulo requer permissões para acessar o estado da rede e do Wi-Fi. As permissões `ACCESS_NETWORK_STATE` e `ACCESS_WIFI_STATE` são adicionadas automaticamente.

## API

```javascript
import * as Network from 'expo-network';
```

### Hooks

#### `useNetworkState()`

Um hook React que atualiza o estado com as informações da rede do dispositivo.

Retorna: `NetworkState` ou `null` (durante a inicialização assíncrona).

Exemplo:

```javascript
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Network from 'expo-network';

export default function App() {
  const networkState = Network.useNetworkState();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tipo de Conexão: {networkState?.type}</Text>
      <Text style={styles.text}>Conectado: {networkState?.isConnected ? 'Sim' : 'Não'}</Text>
      <Text style={styles.text}>Alcançável: {networkState?.isInternetReachable ? 'Sim' : 'Não'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
```

### Métodos

#### `Network.getIpAddressAsync()`

Obtém o endereço IP do dispositivo. Retorna uma promessa que se resolve com uma string contendo o endereço IP.

Exemplo:

```javascript
import * as Network from 'expo-network';

async function getIpAddress() {
  const ipAddress = await Network.getIpAddressAsync();
  console.log('Endereço IP:', ipAddress);
}
```

#### `Network.getNetworkStateAsync()`

Obtém o estado atual da rede do dispositivo. Retorna uma promessa que se resolve com um objeto `NetworkState`.

Exemplo:

```javascript
import * as Network from 'expo-network';

async function getNetworkState() {
  const networkState = await Network.getNetworkStateAsync();
  console.log('Estado da Rede:', networkState);
}
```

#### `Network.isAirplaneModeEnabledAsync()`

Verifica se o modo avião está ativado. Retorna uma promessa que se resolve com um booleano.

Exemplo:

```javascript
import * as Network from 'expo-network';

async function checkAirplaneMode() {
  const isEnabled = await Network.isAirplaneModeEnabledAsync();
  console.log('Modo Avião Ativado:', isEnabled);
}
```

### Assinaturas de Eventos

#### `Network.addNetworkStateListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `(event: NetworkStateEvent) => void` | Um callback que é invocado quando o estado da rede muda. |

Adiciona um ouvinte para alterações no estado da rede. Retorna uma `EventSubscription`.

### Tipos

#### `NetworkState`

Tipo: `object`

Um objeto que representa o estado da rede, contendo `type`, `isConnected`, `isInternetReachable`.

#### `NetworkStateEvent`

Tipo: `object`

Um objeto de evento que representa uma alteração no estado da rede, contendo `type`, `isConnected`, `isInternetReachable`.

### Enums

#### `NetworkStateType`

Enum que representa os diferentes tipos de conexão de rede suportados pelo Expo:

*   `NetworkStateType.BLUETOOTH`: Conexão de rede ativa via Bluetooth.
*   `NetworkStateType.CELLULAR`: Conexão de rede ativa via dados móveis.
*   `NetworkStateType.ETHERNET`: Conexão de rede ativa via Ethernet.
*   `NetworkStateType.NONE`: Nenhuma conexão de rede ativa detectada.
*   `NetworkStateType.OTHER`: Conexão de rede ativa via outros tipos de conexão.
*   `NetworkStateType.UNKNOWN`: O tipo de conexão não pôde ser determinado.
*   `NetworkStateType.VPN`: Conexão de rede ativa via VPN.
*   `NetworkStateType.WIFI`: Conexão de rede ativa via Wi-Fi.
*   `NetworkStateType.WIMAX`: Conexão de rede ativa via WiMAX.

---

**Autor:** Manus AI
**Data de Geração:** 18 de Junho de 2025

