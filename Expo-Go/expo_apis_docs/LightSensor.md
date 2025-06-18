# Sensor de Luz (LightSensor)

Uma biblioteca que fornece acesso ao sensor de luz do dispositivo.

`LightSensor` do `expo-sensors` fornece acesso ao sensor de luz do dispositivo para responder a mudanças de iluminância.

## Instalação

Para instalar a API LightSensor, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sensors
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { LightSensor } from 'expo-sensors';

export default function App() {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [subscription, setSubscription] = useState(null);

  const toggle = () => {
    if (subscription) {
      unsubscribe();
    } else {
      subscribe();
    }
  };

  const subscribe = () => {
    setSubscription(
      LightSensor.addListener(sensorData => {
        setData(sensorData);
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.sensor}>
      <Text>Sensor de Luz:</Text>
      <Text>
        Iluminância: {Platform.OS === 'android' ? `${illuminance} lx` : `Disponível apenas no Android`}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggle} style={styles.button}>
          <Text>Alternar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sensor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
});
```

## API

```javascript
import { LightSensor } from 'expo-sensors';
```

### Classes

#### `LightSensor`

Uma classe que fornece acesso ao sensor de luz do dispositivo.

### Métodos

#### `LightSensor.addListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `Listener<LightSensorMeasurement>` | Um callback que é invocado quando uma atualização do LightSensor está disponível. Quando invocado, o ouvinte recebe um único argumento que é o valor da iluminância. |

Assina as atualizações do sensor de luz. Retorna uma `EventSubscription` que você pode chamar `remove()` para cancelar a inscrição do ouvinte.

#### `LightSensor.getListenerCount()`

Retorna a contagem de ouvintes registrados.

#### `LightSensor.has and isAvailableAsync()`

Verifica as permissões do usuário para acessar o sensor. Retorna um booleano que indica se o sensor tem algum ouvinte registrado.

> Você deve sempre verificar a disponibilidade do sensor antes de tentar usá-lo.

Retorna se o sensor de luz está disponível e habilitado no dispositivo. Requer pelo menos Android 2.3 (API Nível 9).

Uma promessa que se resolve para um `boolean` indicando a disponibilidade do sensor de luz.

#### `LightSensor.removeAllListeners()`

Remove todos os ouvintes registrados.

#### `LightSensor.removeSubscription(subscription)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `subscription` | `EventSubscription` | Uma assinatura a ser removida. |

Remove a assinatura fornecida.

#### `LightSensor.requestPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar o sensor.

#### `LightSensor.setUpdateInterval(intervalMs)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `intervalMs` | `number` | Intervalo desejado em milissegundos entre as atualizações do sensor. |

Define o intervalo de atualização do sensor.

### Interfaces

#### `Subscription`

Um objeto de assinatura que permite remover convenientemente um ouvinte de evento do emissor.

### Tipos

#### `LightSensorMeasurement`

Tipo: `object`

Um objeto que representa uma medição do sensor de luz, contendo o valor da iluminância.

#### `PermissionExpiration`

Tipo: `string`

Indica quando a permissão expira (`never`).

#### `PermissionResponse`

Tipo: `object`

Um objeto que contém o status da permissão (`granted`, `denied`, `undetermined`).

### Enums

#### `PermissionStatus`

Enum que representa o status da permissão (`granted`, `denied`, `undetermined`).

---

**Autor:** Manus AI
**Data de Geração:** 17 de Junho de 2025

