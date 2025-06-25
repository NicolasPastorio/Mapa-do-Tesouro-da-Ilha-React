# Sensores (Sensors)

Uma biblioteca que fornece acesso ao acelerômetro, barômetro, movimento, giroscópio, luz, magnetômetro e pedômetro de um dispositivo.

`expo-sensors` fornece várias APIs para acessar os sensores do dispositivo para medir movimento, orientação, pressão, campos magnéticos, luz ambiente e contagem de passos.

## Instalação

Para instalar a API Sensors, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sensors
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no app config

Você pode configurar `expo-sensors` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário de aplicativo para entrar em vigor.

### Exemplo de app.json com config plugin

```json
{
  "expo": {
    "plugins": [
      [
        "expo-sensors",
        {
          "motionPermission": "Permitir que $(PRODUCT_NAME) acesse o movimento do seu dispositivo"
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `motionPermission` | `"Allow $(PRODUCT_NAME) to access your device motion"` | **Apenas para:** iOS. Uma string para definir a mensagem de permissão `NSMotionUsageDescription` ou `false` para desabilitar as permissões de movimento. |

## API

```javascript
import * as Sensors from 'expo-sensors';

import {
  Accelerometer,
  Barometer,
  DeviceMotion,
  Gyroscope,
  LightSensor,
  Magnetometer,
  MagnetometerUncalibrated,
  Pedometer,
} from 'expo-sensors';
```

## Permissões

### Android

A partir do Android 12 (API nível 31), o sistema tem um limite de 200Hz para cada atualização de sensor.

Se você precisar de um intervalo de atualização inferior a 200Hz, você deve adicionar as seguintes permissões ao seu arquivo app.json dentro do array [`expo.android.permissions`](https://docs.expo.dev/versions/latest/config/app/#android):

| Permissão Android | Descrição |
| --- | --- |
| `HIGH_SAMPLING_RATE_SENSORS` | Permite que um aplicativo acesse dados do sensor com uma taxa de amostragem superior a 200 Hz. |

Se você estiver usando esta biblioteca em um aplicativo React Native existente e não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) ou estiver usando o projeto Android nativo manualmente, adicione a permissão `HIGH_SAMPLING_RATE_SENSORS` ao arquivo android/app/src/main/AndroidManifest.xml do seu projeto:

```xml
<uses-permission android:name="android.permission.HIGH_SAMPLING_RATE_SENSORS" />
```

### iOS

As seguintes chaves de descrição de uso são usadas por esta biblioteca:

| Chave Info.plist | Descrição |
| --- | --- |
| `NSMotionUsageDescription` | Uma mensagem que informa ao usuário por que o aplicativo está solicitando acesso aos dados de movimento do dispositivo. |

## Sensores disponíveis

Para mais informações, consulte a documentação do sensor de seu interesse:

*   [Acelerômetro](https://docs.expo.dev/versions/latest/sdk/accelerometer/): Mede a aceleração do dispositivo em todas as plataformas.
*   [Barômetro](https://docs.expo.dev/versions/latest/sdk/barometer/): Mede a pressão nas plataformas Android e iOS.
*   [Movimento do Dispositivo](https://docs.expo.dev/versions/latest/sdk/devicemotion/): Mede o movimento do dispositivo em todas as plataformas.
*   [Giroscópio](https://docs.expo.dev/versions/latest/sdk/gyroscope/): Mede a rotação do dispositivo em todas as plataformas.
*   [Magnetômetro](https://docs.expo.dev/versions/latest/sdk/magnetometer/): Mede campos magnéticos nas plataformas Android e iOS.
*   [Sensor de Luz](https://docs.expo.dev/versions/latest/sdk/light-sensor/): Mede a luz ambiente na plataforma Android.
*   [Pedômetro](https://docs.expo.dev/versions/latest/sdk/pedometer/): Mede a contagem de passos nas plataformas Android e iOS.

---

**Autor:** Manus AI
**Data de Geração:** 19 de Junho de 2025

