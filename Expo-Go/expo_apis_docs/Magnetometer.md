# Magnetômetro (Magnetometer)

Uma biblioteca que fornece acesso ao sensor de magnetômetro do dispositivo.

`Magnetometer` do `expo-sensors` fornece acesso ao(s) sensor(es) de magnetômetro do dispositivo para responder e medir as mudanças no campo magnético medido em microtesla (`μT`).

Você pode acessar os valores calibrados com `Magnetometer` e os valores brutos não calibrados com `MagnetometerUncalibrated`.

## Instalação

Para instalar a API Magnetometer, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sensors
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function Compass() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Magnetometer.setUpdateInterval(1000);
  const _fast = () => Magnetometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setData(result);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Magnetômetro:</Text>
      <Text style={styles.text}>x: {x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {z.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'Parar' : 'Iniciar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Lento</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Rápido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
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
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
```

## API

```javascript
import { Magnetometer, MagnetometerUncalibrated } from 'expo-sensors';
```

### Classes

#### `Magnetometer`

Uma classe que fornece acesso ao sensor de magnetômetro calibrado do dispositivo.

#### `MagnetometerUncalibrated`

Uma classe que fornece acesso ao sensor de magnetômetro não calibrado do dispositivo.

### Métodos

#### `Magnetometer.addListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `Listener<MagnetometerMeasurement>` | Um callback que é invocado quando uma atualização do Magnetometer está disponível. Quando invocado, o ouvinte recebe um único argumento que é a medição do magnetômetro. |

Assina as atualizações do sensor de magnetômetro. Retorna uma `EventSubscription` que você pode chamar `remove()` para cancelar a inscrição do ouvinte.

#### `Magnetometer.getListenerCount()`

Retorna a contagem de ouvintes registrados.

#### `Magnetometer.has and isAvailableAsync()`

Verifica as permissões do usuário para acessar o sensor. Retorna um booleano que indica se o sensor tem algum ouvinte registrado.

> Você deve sempre verificar a disponibilidade do sensor antes de tentar usá-lo.

Retorna se o sensor de magnetômetro está disponível e habilitado no dispositivo.

Uma promessa que se resolve para um `boolean` indicando a disponibilidade do sensor de magnetômetro.

#### `Magnetometer.removeAllListeners()`

Remove todos os ouvintes registrados.

#### `Magnetometer.removeSubscription(subscription)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `subscription` | `EventSubscription` | Uma assinatura a ser removida. |

Remove a assinatura fornecida.

#### `Magnetometer.requestPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar o sensor.

#### `Magnetometer.setUpdateInterval(intervalMs)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `intervalMs` | `number` | Intervalo desejado em milissegundos entre as atualizações do sensor. |

Define o intervalo de atualização do sensor.

### Interfaces

#### `Subscription`

Um objeto de assinatura que permite remover convenientemente um ouvinte de evento do emissor.

### Tipos

#### `MagnetometerMeasurement`

Tipo: `object`

Um objeto que representa uma medição do magnetômetro, contendo os valores `x`, `y` e `z` em microtesla (`μT`).

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

