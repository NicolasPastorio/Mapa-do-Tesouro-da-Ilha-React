# Celular (Cellular)

Uma API que fornece informações sobre o provedor de serviços de celular do usuário.

`expo-cellular` fornece informações sobre o provedor de serviços de celular do usuário, como seu identificador exclusivo, tipo de conexão celular e se permite chamadas VoIP em sua rede.

## Instalação

Para instalar a API Cellular, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-cellular
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração

Não há configuração específica necessária para esta API no `app.json` ou `app.config.js`.

## Uso

```javascript
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Cellular from 'expo-cellular';

export default function App() {
  const [carrierName, setCarrierName] = useState<string | null>(null);
  const [isoCountryCode, setIsoCountryCode] = useState<string | null>(null);
  const [mobileCountryCode, setMobileCountryCode] = useState<string | null>(null);
  const [mobileNetworkCode, setMobileNetworkCode] = useState<string | null>(null);
  const [allowsVoip, setAllowsVoip] = useState<boolean | null>(null);
  const [cellularGeneration, setCellularGeneration] = useState<Cellular.CellularGeneration | null>(null);

  useEffect(() => {
    (async () => {
      setCarrierName(await Cellular.getCarrierNameAsync());
      setIsoCountryCode(await Cellular.getIsoCountryCodeAsync());
      setMobileCountryCode(await Cellular.getMobileCountryCodeAsync());
      setMobileNetworkCode(await Cellular.getMobileNetworkCodeAsync());
      setAllowsVoip(await Cellular.allowsVoipAsync());
      setCellularGeneration(await Cellular.getCellularGenerationAsync());
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Nome da Operadora: {carrierName}</Text>
      <Text style={styles.paragraph}>Código do País ISO: {isoCountryCode}</Text>
      <Text style={styles.paragraph}>Código do País Móvel: {mobileCountryCode}</Text>
      <Text style={styles.paragraph}>Código da Rede Móvel: {mobileNetworkCode}</Text>
      <Text style={styles.paragraph}>Permite VoIP: {allowsVoip ? 'Sim' : 'Não'}</Text>
      <Text style={styles.paragraph}>Geração Celular: {cellularGeneration}</Text>
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
```

## API

```javascript
import * as Cellular from 'expo-cellular';
```

### Constantes

*   **`Cellular.allowsVoip`**: Indica se a operadora permite fazer chamadas VoIP em sua rede. **(Obsoleto: Use `allowsVoipAsync()` em vez disso.)**
*   **`Cellular.carrier`**: O nome do provedor de serviços de celular do usuário. **(Obsoleto: Use `getCarrierNameAsync()` em vez disso.)**
*   **`Cellular.isoCountryCode`**: O código do país ISO da operadora. **(Obsoleto: Use `getIsoCountryCodeAsync()` em vez disso.)**
*   **`Cellular.mobileCountryCode`**: O código do país móvel da operadora. **(Obsoleto: Use `getMobileCountryCodeAsync()` em vez disso.)**
*   **`Cellular.mobileNetworkCode`**: O código da rede móvel da operadora. **(Obsoleto: Use `getMobileNetworkCodeAsync()` em vez disso.)**

### Hooks

#### `usePermissions(options)`

Verifica ou solicita permissões para acessar informações da rede celular. Retorna um array com o status da permissão e uma função para solicitar a permissão.

### Métodos

#### `Cellular.allowsVoipAsync()`

Retorna uma promessa que se resolve com um booleano indicando se a operadora permite fazer chamadas VoIP em sua rede.

#### `Cellular.getCarrierNameAsync()`

Retorna uma promessa que se resolve com o nome do provedor de serviços de celular do usuário.

#### `Cellular.getCellularGenerationAsync()`

Retorna uma promessa que se resolve com a geração da rede celular (por exemplo, `2G`, `3G`, `4G`, `5G`).

#### `Cellular.getIsoCountryCodeAsync()`

Retorna uma promessa que se resolve com o código do país ISO da operadora.

#### `Cellular.getMobileCountryCodeAsync()`

Retorna uma promessa que se resolve com o código do país móvel da operadora.

#### `Cellular.getMobileNetworkCodeAsync()`

Retorna uma promessa que se resolve com o código da rede móvel da operadora.

#### `Cellular.getPermissionsAsync()`

Verifica as permissões do usuário para acessar informações da rede celular.

#### `Cellular.requestPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar informações da rede celular.

### Enums

#### `CellularGeneration`

Enum que representa as gerações de rede celular (`UNKNOWN`, `2G`, `3G`, `4G`, `5G`).

### Códigos de Erro

Não há códigos de erro específicos documentados para esta API.

### Permissões

No Android, a permissão `android.permission.READ_PHONE_STATE` pode ser necessária para algumas funcionalidades. No iOS, não são necessárias permissões especiais para a maioria das funcionalidades, mas algumas informações podem ser limitadas pelo sistema.

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025

