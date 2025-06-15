# Movimento do Dispositivo (DeviceMotion)

Uma biblioteca que fornece acesso aos sensores de movimento e orientação de um dispositivo.

`DeviceMotion` do `expo-sensors` fornece acesso aos sensores de movimento e orientação do dispositivo. Todos os dados são apresentados em termos de três eixos que atravessam um dispositivo. De acordo com a orientação retrato: X vai da esquerda para a direita, Y de baixo para cima e Z perpendicularmente através da tela de trás para frente.

## Instalação

Para instalar a API DeviceMotion, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sensors
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.config`

Você pode configurar `DeviceMotion` do `expo-sensor` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-sensors",
        {
          "motionPermission": "Permitir que $(PRODUCT_NAME) acesse o movimento do seu dispositivo."
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `motionPermission` | `"Permitir que $(PRODUCT_NAME) acesse o movimento do seu dispositivo"` | **Apenas para iOS:** Uma string para definir a mensagem de permissão `NSMotionUsageDescription`. |

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) ou estiver usando o projeto iOS nativo manualmente, então você precisa configurar a chave `NSMotionUsageDescription` em seu projeto nativo para acessar as estatísticas do `DeviceMotion`:

```xml
<key>NSMotionUsageDescription</key>
<string>Permitir que $(PRODUCT_NAME) acesse o movimento do seu dispositivo</string>
```

## API

```javascript
import { DeviceMotion } from 'expo-sensors';
```

### Constantes

#### `DeviceMotion.Gravity`

Tipo: `number`

Valor constante que representa a aceleração gravitacional padrão para a Terra (`9.80665` m/s^2).

### Classes

#### `DeviceMotion`

Tipo: Classe que estende `DeviceSensor`

Uma classe base para sensores que podem ser inscritos. Os eventos emitidos por esta classe são medições especificadas pelo tipo de parâmetro `Measurement`.

### Propriedades do DeviceMotion

#### `DeviceMotion.Gravity`

Tipo: `number` • Padrão: `ExponentDeviceMotion.Gravity`

Valor constante que representa a aceleração gravitacional padrão para a Terra (`9.80665` m/s^2).

### Métodos do DeviceMotion

#### `DeviceMotion.addListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `Listener<DeviceMotionMeasurement>` | Um callback que é invocado quando uma atualização do sensor de movimento do dispositivo está disponível. Quando invocado, o ouvinte recebe um único argumento que é um objeto `DeviceMotionMeasurement`. |

Assina as atualizações do sensor de movimento do dispositivo. Retorna uma `EventSubscription` que você pode chamar `remove()` para cancelar a inscrição do ouvinte.

#### `DeviceMotion.getListenerCount()`

Retorna a contagem de ouvintes registrados.

#### `DeviceMotion.has and isAvailableAsync()`

Verifica as permissões do usuário para acessar o sensor. Retorna um booleano que indica se o sensor tem algum ouvinte registrado.

> Você deve sempre verificar a disponibilidade do sensor antes de tentar usá-lo.

Retorna se o acelerômetro está habilitado no dispositivo.

Na web móvel, você deve primeiro invocar `DeviceMotion.requestPermissionsAsync()` em uma interação do usuário (ou seja, evento de toque) antes de poder usar este módulo. Se o `status` não for igual a `granted`, você deve informar ao usuário final que ele pode ter que abrir as configurações.

Na web, isso inicia um temporizador e espera para ver se um evento é disparado. Isso deve prever se o dispositivo iOS tem a API de orientação do dispositivo desabilitada em Configurações > Safari > Acesso a Movimento e Orientação. Alguns dispositivos também não disparam se o site não estiver hospedado com HTTPS, pois `DeviceMotion` agora é considerado uma API segura. Não há uma API formal para detectar o status de `DeviceMotion`, então esta API às vezes pode ser não confiável na web.

Uma promessa que se resolve para um `boolean` indicando a disponibilidade do sensor de movimento do dispositivo.

#### `DeviceMotion.removeAllListeners()`

Remove todos os ouvintes registrados.

#### `DeviceMotion.removeSubscription(subscription)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `subscription` | `EventSubscription` | Uma assinatura a ser removida. |

Remove a assinatura fornecida.

#### `DeviceMotion.requestPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar o sensor.

#### `DeviceMotion.setUpdateInterval(intervalMs)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `intervalMs` | `number` | Intervalo desejado em milissegundos entre as atualizações do sensor.

> A partir do Android 12 (API nível 31), o sistema tem um limite de 200ms para cada atualização do sensor.
> 
> Se você precisar de um intervalo de atualização menor que 200ms, você deve:
> 
> *   adicionar `android.permission.HIGH_SAMPLING_RATE_SENSORS` ao [campo `permissions` do app.json](https://docs.expo.dev/versions/latest/config/app/#permissions)
> *   ou, se você estiver usando o fluxo de trabalho bare, adicione `<uses-permission android:name="android.permission.HIGH_SAMPLING_RATE_SENSORS"/>` ao AndroidManifest.xml.

Define o intervalo de atualização do sensor.

## Interfaces

#### `Subscription`

Um objeto de assinatura que permite remover convenientemente um ouvinte de evento do emissor.

### Métodos de Assinatura

#### `subscription.remove()`

Remove um ouvinte de evento para o qual a assinatura foi criada. Após chamar esta função, o ouvinte não receberá mais nenhum evento do emissor.

## Tipos

#### `DeviceMotionMeasurement`

Tipo: `object`

Um objeto que representa uma medição do movimento do dispositivo, incluindo aceleração, rotação e orientação.

#### `PermissionExpiration`

Tipo: `string`

Indica quando a permissão expira (`never`).

#### `PermissionResponse`

Tipo: `object`

Um objeto que contém o status da permissão (`granted`, `denied`, `undetermined`).

### Enums

#### `DeviceMotionOrientation`

Enum que representa a orientação do dispositivo (`UNKNOWN`, `PORTRAIT_UP`, `PORTRAIT_DOWN`, `LANDSCAPE_LEFT`, `LANDSCAPE_RIGHT`).

#### `PermissionStatus`

Enum que representa o status da permissão (`granted`, `denied`, `undetermined`).

### Permissões

No iOS, a permissão `NSMotionUsageDescription` é necessária para acessar os dados do `DeviceMotion`.

---

**Autor:** Manus AI
**Data de Geração:** 14 de Junho de 2025

