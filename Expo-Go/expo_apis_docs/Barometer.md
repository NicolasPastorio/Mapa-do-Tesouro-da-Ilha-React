# Barômetro

Uma biblioteca que fornece acesso ao sensor de barômetro do dispositivo.

`Barometer` de `expo-sensors` fornece acesso ao sensor de barômetro do dispositivo para responder a mudanças na pressão do ar, que é medida em hectopascais (`hPa`).

## Instalação

Para instalar o Barômetro, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sensors
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

O uso básico do Barômetro envolve a importação do módulo `Barometer` de `expo-sensors` e a configuração de um ouvinte para receber atualizações. Abaixo está um exemplo de como você pode usar o Barômetro em seu aplicativo Expo:

```javascript
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Barometer } from 'expo-sensors';

export default function App() {
  const [{ pressure, relativeAltitude }, setData] = useState({ pressure: 0, relativeAltitude: 0 });
  const [subscription, setSubscription] = useState(null);

  const toggleListener = () => {
    subscription ? unsubscribe() : subscribe();
  };

  const subscribe = () => {
    setSubscription(Barometer.addListener(setData));
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  return (
    <View style={styles.wrapper}>
      <Text>Barômetro: Ouvinte {subscription ? 'ATIVO' : 'INATIVO'}</Text>
      <Text>Pressão: {pressure} hPa</Text>
      <Text>
        Altitude Relativa: {' '}
        {Platform.OS === 'ios' ? `${relativeAltitude} m` : `Disponível apenas no iOS`}
      </Text>
      <TouchableOpacity onPress={toggleListener} style={styles.button}>
        <Text>Alternar ouvinte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 15,
  },
  wrapper: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
```

## API

```javascript
import { Barometer } from 'expo-sensors';
```

### Métodos

*   **`addListener(listener)`**: Adiciona um ouvinte para receber atualizações do barômetro. O `listener` é uma função que recebe um objeto `BarometerMeasurement` como argumento.
*   **`removeListener(listener)`**: Remove um ouvinte previamente adicionado.
*   **`removeAllListeners()`**: Remove todos os ouvintes registrados.
*   **`setUpdateInterval(intervalMs)`**: Define o intervalo de atualização em milissegundos para o barômetro. O valor padrão é 100ms.
*   **`isAvailableAsync()`**: Retorna uma promessa que resolve para um booleano indicando se o barômetro está disponível no dispositivo.

### `BarometerMeasurement`

Este objeto é passado para o ouvinte e contém as seguintes propriedades:

*   **`pressure`**: A pressão do ar em hectopascais (`hPa`).
*   **`relativeAltitude`**: A altitude relativa em metros (disponível apenas no iOS).

## Considerações

*   Sempre verifique a disponibilidade do sensor antes de tentar usá-lo com `Barometer.isAvailableAsync()`.
*   A partir do Android 12 (API nível 31), o sistema tem um limite de 200ms para cada atualização do sensor. Se você precisar de um intervalo de atualização menor que 200ms, você deve adicionar `android.permission.HIGH_SAMPLING_RATE_SENSORS` ao `app.json`.

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025

