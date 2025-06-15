# Acelerômetro

Uma biblioteca que fornece acesso ao(s) sensor(es) de acelerômetro do dispositivo e ouvintes associados para responder a mudanças na aceleração em três dimensões, significando qualquer movimento ou vibração.

## Instalação

Para instalar o Acelerômetro, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sensors
```

Se você estiver instalando isso em um aplicativo React Native existente, certifique-se de ter o `expo` instalado em seu projeto.

## Uso Básico

O uso básico do Acelerômetro envolve a importação do módulo `Accelerometer` de `expo-sensors` e a configuração de um ouvinte para receber atualizações. Abaixo está um exemplo de como você pode usar o Acelerômetro em seu aplicativo Expo:

```javascript
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
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
      <Text style={styles.text}>Acelerômetro:</Text>
      <Text style={styles.text}>x: {x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {z.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={_toggleSubscription} style={styles.button}>
          <Text>{subscription ? 'Parar' : 'Iniciar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
});
```

## API

O módulo `Accelerometer` fornece os seguintes métodos e propriedades:

*   **`addListener(listener)`**: Adiciona um ouvinte para receber atualizações do acelerômetro. O `listener` é uma função que recebe um objeto `AccelerometerMeasurement` como argumento.
*   **`removeListener(listener)`**: Remove um ouvinte previamente adicionado.
*   **`removeAllListeners()`**: Remove todos os ouvintes registrados.
*   **`setUpdateInterval(intervalMs)`**: Define o intervalo de atualização em milissegundos para o acelerômetro. O valor padrão é 100ms.
*   **`isAvailableAsync()`**: Retorna uma promessa que resolve para um booleano indicando se o acelerômetro está disponível no dispositivo.

### `AccelerometerMeasurement`

Este objeto é passado para o ouvinte e contém as seguintes propriedades:

*   **`x`**: A aceleração do dispositivo ao longo do eixo X.
*   **`y`**: A aceleração do dispositivo ao longo do eixo Y.
*   **`z`**: A aceleração do dispositivo ao longo do eixo Z.

## Considerações

*   Sempre verifique a disponibilidade do sensor antes de tentar usá-lo com `Accelerometer.isAvailableAsync()`.
*   No web móvel, você deve primeiro invocar `Accelerometer.requestPermissionsAsync()` em uma interação do usuário (ou seja, evento de toque) antes de poder usar este módulo. Se o `status` não for igual a `granted`, você deve informar ao usuário final que ele pode ter que abrir as configurações.
*   No web, isso inicia um temporizador e espera para ver se um evento é disparado. Isso deve prever se o dispositivo iOS tem a API de orientação do dispositivo desativada em Configurações > Safari > Acesso a Movimento e Orientação. Alguns dispositivos também não serão disparados se o site não estiver hospedado com HTTPS, pois `DeviceMotion` agora é considerada uma API segura. Não há uma API formal para detectar o status de `DeviceMotion`, então esta API pode ser às vezes não confiável no web.

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025

