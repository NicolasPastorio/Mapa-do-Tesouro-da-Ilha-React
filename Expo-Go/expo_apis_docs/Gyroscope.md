# Giroscópio (Gyroscope)

Uma biblioteca que fornece acesso ao sensor de giroscópio do dispositivo para responder a mudanças na rotação em um espaço tridimensional.

`Gyroscope` do `expo-sensors` fornece acesso ao sensor de giroscópio do dispositivo para responder a mudanças na rotação em um espaço tridimensional.

## Instalação

Para instalar a API Gyroscope, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sensors
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

### Uso Básico do Giroscópio

```javascript
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
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
      <Text style={styles.text}>Giroscópio:</Text>
      <Text style={styles.text}>x: {x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {z.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={_toggle} style={styles.button}>
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
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
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
import { Gyroscope } from 'expo-sensors';
```

### Classes

#### `Gyroscope`

Uma classe que fornece acesso ao sensor de giroscópio do dispositivo.

### Métodos

#### `Gyroscope.addListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `Listener<GyroscopeMeasurement>` | Um callback que é invocado quando uma atualização do giroscópio está disponível. Quando invocado, o ouvinte recebe um único argumento que é um objeto `GyroscopeMeasurement`. |

Assina as atualizações do sensor de giroscópio. Retorna uma `EventSubscription` que você pode chamar `remove()` para cancelar a inscrição do ouvinte.

#### `Gyroscope.getListenerCount()`

Retorna a contagem de ouvintes registrados.

#### `Gyroscope.has and isAvailableAsync()`

Verifica as permissões do usuário para acessar o sensor. Retorna um booleano que indica se o sensor tem algum ouvinte registrado.

> Você deve sempre verificar a disponibilidade do sensor antes de tentar usá-lo.

Retorna se o giroscópio está habilitado no dispositivo.

Na web móvel, você deve primeiro invocar `Gyroscope.requestPermissionsAsync()` em uma interação do usuário (ou seja, evento de toque) antes de poder usar este módulo. Se o `status` não for igual a `granted`, você deve informar ao usuário final que ele pode ter que abrir as configurações.

Na web, isso inicia um temporizador e espera para ver se um evento é disparado. Isso deve prever se o dispositivo iOS tem a API de orientação do dispositivo desabilitada em Configurações > Safari > Acesso a Movimento e Orientação. Alguns dispositivos também não disparam se o site não estiver hospedado com HTTPS, pois `DeviceMotion` agora é considerado uma API segura. Não há uma API formal para detectar o status de `DeviceMotion`, então esta API às vezes pode ser não confiável na web.

Uma promessa que se resolve para um `boolean` indicando a disponibilidade do sensor de giroscópio.

#### `Gyroscope.removeAllListeners()`

Remove todos os ouvintes registrados.

#### `Gyroscope.removeSubscription(subscription)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `subscription` | `EventSubscription` | Uma assinatura a ser removida. |

Remove a assinatura fornecida.

#### `Gyroscope.requestPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar o sensor.

#### `Gyroscope.setUpdateInterval(intervalMs)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `intervalMs` | `number` | Intervalo desejado em milissegundos entre as atualizações do sensor. |

Define o intervalo de atualização do sensor.

### Interfaces

#### `Subscription`

Um objeto de assinatura que permite remover convenientemente um ouvinte de evento do emissor.

### Tipos

#### `GyroscopeMeasurement`

Tipo: `object`

Um objeto que representa uma medição do giroscópio, contendo as taxas de rotação em torno dos eixos X, Y e Z.

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
**Data de Geração:** 15 de Junho de 2025

