# Pedômetro (Pedometer)

Uma biblioteca que fornece acesso ao sensor de pedômetro do dispositivo.

`Pedometer` do `expo-sensors` usa o `hardware.Sensor` do sistema no Android e o Core Motion no iOS para obter a contagem de passos do usuário, e também permite que você assine as atualizações do pedômetro.

## Instalação

Para instalar a API Pedometer, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sensors
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Passos dados nas últimas 24 horas: {pastStepCount}</Text>
      <Text>Ande! E veja isso subir: {currentStepCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

## API

```javascript
import { Pedometer } from 'expo-sensors';
```

### Métodos

#### `Pedometer.getPermissionsAsync()`

Verifica as permissões do usuário para acessar o pedômetro. Retorna uma promessa que se resolve com um objeto `PermissionResponse`.

#### `Pedometer.getStepCountAsync(start, end)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `start` | `Date` | Uma data indicando o início do intervalo sobre o qual medir os passos. |
| `end` | `Date` | Uma data indicando o fim do intervalo sobre o qual medir os passos. |

Obtém a contagem de passos entre duas datas. Retorna uma promessa que se resolve com um `PedometerResult`.

Como a [documentação da Apple afirma](https://developer.apple.com/documentation/coremotion/cmpedometer/1613936-querypedometerdatafromdate): 
> Apenas os dados dos últimos sete dias são armazenados e disponíveis para você recuperar. Especificar uma data de início que seja mais de sete dias no passado retorna apenas os dados disponíveis.

#### `Pedometer.isAvailableAsync()`

Retorna se o pedômetro está habilitado no dispositivo. Retorna uma promessa que se resolve com um `boolean`, indicando se o pedômetro está disponível neste dispositivo.

#### `Pedometer.requestPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar o pedômetro. Retorna uma promessa que se resolve com um objeto `PermissionResponse`.

#### `Pedometer.watchStepCount(callback)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `callback` | `PedometerUpdateCallback` | Um callback que é invocado quando novos dados de contagem de passos estão disponíveis. O callback é fornecido com um único argumento que é `PedometerResult`. |

Assina as atualizações do pedômetro. Retorna uma `EventSubscription` que permite chamar `remove()` quando você deseja cancelar a inscrição do ouvinte.

> As atualizações do pedômetro não serão entregues enquanto o aplicativo estiver em segundo plano. Como alternativa, no Android, use outra solução baseada na [`Health Connect API`](https://developer.android.com/guide/health-and-fitness/health-connect). No iOS, o método `getStepCountAsync` pode ser usado para obter a contagem de passos entre duas datas.

### Interfaces

#### `Subscription`

Um objeto de assinatura que permite remover convenientemente um ouvinte de evento do emissor. Possui o método `remove()`.

### Tipos

#### `PedometerResult`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `steps` | `number` | Número de passos dados entre as datas fornecidas. |

#### `PedometerUpdateCallback(result)`

Função de callback que fornece o resultado do evento como um argumento.

| Parâmetro | Tipo |
| --- | --- |
| `result` | `PedometerResult` |

#### `PermissionExpiration`

Tipo literal: `union`

Tempo de expiração da permissão. Atualmente, todas as permissões são concedidas permanentemente. Valores aceitáveis são: `never` ou `number`.

#### `PermissionResponse`

Tipo: `object`

Um objeto que contém o status da permissão (`granted`, `denied`, `undetermined`).

### Enums

#### `PermissionStatus`

Enum que representa o status da permissão (`granted`, `denied`, `undetermined`).

---

**Autor:** Manus AI
**Data de Geração:** 19 de Junho de 2025
