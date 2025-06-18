# Notificações (Notifications)

Uma biblioteca que fornece uma API para buscar tokens de notificação push e para apresentar, agendar, receber e responder a notificações.

**Android (apenas dispositivo), iOS (apenas dispositivo)**

`expo-notifications` fornece uma API para buscar tokens de notificação push e para apresentar, agendar, receber e responder a notificações.

> A funcionalidade de notificações push (notificações remotas) fornecida por `expo-notifications` não está disponível no Expo Go no Android a partir do SDK 53. Uma [compilação de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/) é necessária para usar notificações push. Notificações locais (notificações no aplicativo) permanecem disponíveis no Expo Go.

## Recursos

*   Agendar uma notificação única para uma data específica ou algum tempo a partir de agora.
*   Agendar uma notificação repetindo em algum intervalo de tempo (ou uma correspondência de data de calendário no iOS).
*   Obter e definir o número do ícone do distintivo do aplicativo.
*   Obter um token de notificação push de dispositivo nativo, para que você possa enviar notificações push com FCM (para Android) e APNs (para iOS).
*   Obter um token de notificação push do Expo, para que você possa enviar notificações push com o [Expo Push Service](https://docs.expo.dev/push-notifications/sending-notifications/).
*   Ouvir notificações recebidas em primeiro plano e em segundo plano.
*   Ouvir interações com notificações.
*   Lidar com notificações quando o aplicativo está em primeiro plano.
*   Descartar imperativamente notificações da Central de Notificações/bandeja.
*   Criar, atualizar e excluir [canais de notificação do Android](https://docs.expo.dev/versions/latest/sdk/notifications/#handling-notification-channels).
*   Definir ícone e cor personalizados para notificações no Android.

## Instalação

Para instalar a API Notifications, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-notifications
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

Em seguida, prossiga para a [configuração](https://docs.expo.dev/versions/latest/sdk/notifications/#configuration) para configurar o [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) e obter as [credenciais](https://docs.expo.dev/versions/latest/sdk/notifications/#credentials) para notificações push.

## Uso

Confira o exemplo de Snack abaixo para ver as Notificações em ação, certifique-se de usar um dispositivo físico para testá-lo. As notificações push não funcionam em emuladores/simuladores.

```javascript
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Falha ao obter token push para notificação!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    console.log(token);
  } else {
    alert('Deve usar um dispositivo físico para notificações push');
  }

  return token;
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Minha primeira notificação!',
    body: 'Este é um exemplo de notificação push!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Seu token push do Expo: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Título: {notification && notification.request.content.title} </Text>
        <Text>Corpo: {notification && notification.request.content.body}</Text>
        <Text>Dados: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Pressione para agendar uma notificação"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}
```

## API

```javascript
import * as Notifications from 'expo-notifications';
```

### Buscar tokens para notificações push

#### `Notifications.addPushTokenListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `(token: ExpoPushToken) => void` | Um callback que é invocado quando um novo token push é recebido. |

Adiciona um ouvinte para novos tokens push. Retorna uma `EventSubscription`.

#### `Notifications.getDevicePushTokenAsync()`

Obtém o token push nativo do dispositivo. Retorna uma promessa que se resolve com um objeto `DevicePushToken`.

#### `Notifications.getExpoPushTokenAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` (opcional) | `GetExpoPushTokenOptions` | Opções para a solicitação do token push do Expo. |

Obtém o token push do Expo. Retorna uma promessa que se resolve com um objeto `ExpoPushToken`.

#### `Notifications.removePushTokenSubscription(subscription)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `subscription` | `EventSubscription` | Uma assinatura a ser removida. |

Remove a assinatura fornecida para tokens push.

### Ouvir eventos de notificação

#### `Notifications.addNotificationReceivedListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `(notification: Notification) => void` | Um callback que é invocado quando uma notificação é recebida. |

Adiciona um ouvinte para notificações recebidas. Retorna uma `EventSubscription`.

#### `Notifications.addNotificationResponseReceivedListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `(response: NotificationResponse) => void` | Um callback que é invocado quando o usuário interage com uma notificação. |

Adiciona um ouvinte para respostas de notificação. Retorna uma `EventSubscription`.

#### `Notifications.removeNotificationSubscription(subscription)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `subscription` | `EventSubscription` | Uma assinatura a ser removida. |

Remove a assinatura fornecida para eventos de notificação.

### Agendar notificações

#### `Notifications.scheduleNotificationAsync(request)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |\n| `request` | `NotificationRequest` | A solicitação de notificação a ser agendada. |

Agenda uma notificação. Retorna uma promessa que se resolve com o ID da notificação agendada.

### Gerenciar notificações

#### `Notifications.cancelAllScheduledNotificationsAsync()`

Cancela todas as notificações agendadas. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Notifications.cancelScheduledNotificationAsync(notificationId)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `notificationId` | `string` | O ID da notificação agendada a ser cancelada. |

Cancela uma notificação agendada. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Notifications.dismissAllNotificationsAsync()`

Descarta todas as notificações exibidas. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Notifications.dismissNotificationAsync(notificationId)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `notificationId` | `string` | O ID da notificação a ser descartada. |

Descarta uma notificação exibida. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Notifications.getAllScheduledNotificationsAsync()`

Obtém todas as notificações agendadas. Retorna uma promessa que se resolve com um array de objetos `NotificationRequest`.

#### `Notifications.getPresentedNotificationsAsync()`

Obtém todas as notificações exibidas. Retorna uma promessa que se resolve com um array de objetos `Notification`.

#### `Notifications.presentNotificationAsync(request)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `request` | `NotificationRequest` | A solicitação de notificação a ser apresentada. |

Apresenta uma notificação imediatamente. Retorna uma promessa que se resolve com o ID da notificação apresentada.

### Gerenciar distintivos

#### `Notifications.getBadgeNumberAsync()`

Obtém o número do distintivo do aplicativo. Retorna uma promessa que se resolve com um número.

#### `Notifications.setBadgeNumberAsync(badgeNumber)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `badgeNumber` | `number` | O número do distintivo a ser definido. |

Define o número do distintivo do aplicativo. Retorna uma promessa que se resolve quando a operação é concluída.

### Gerenciar canais de notificação (Android)

#### `Notifications.deleteNotificationChannelAsync(channelId)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `channelId` | `string` | O ID do canal de notificação a ser excluído. |

Exclui um canal de notificação. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Notifications.getNotificationChannelAsync(channelId)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `channelId` | `string` | O ID do canal de notificação a ser recuperado. |

Obtém um canal de notificação. Retorna uma promessa que se resolve com um objeto `NotificationChannel` ou `null` se o canal não for encontrado.

#### `Notifications.getNotificationChannelsAsync()`

Obtém todos os canais de notificação. Retorna uma promessa que se resolve com um array de objetos `NotificationChannel`.

#### `Notifications.setNotificationChannelAsync(channelId, channel)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `channelId` | `string` | O ID do canal de notificação a ser definido. |
| `channel` | `NotificationChannelInput` | O objeto do canal de notificação. |

Define um canal de notificação. Retorna uma promessa que se resolve com um objeto `NotificationChannel`.

### Tipos

#### `DevicePushToken`

Tipo: `object`

Um objeto que representa um token push nativo do dispositivo, contendo `type` e `data`.

#### `ExpoPushToken`

Tipo: `object`

Um objeto que representa um token push do Expo, contendo `type` e `data`.

#### `Notification`

Tipo: `object`

Um objeto que representa uma notificação recebida, contendo `request` e `date`.

#### `NotificationAction`

Tipo: `object`

Um objeto que representa uma ação de notificação, contendo `identifier` e `buttonTitle`.

#### `NotificationCategory`

Tipo: `object`

Um objeto que representa uma categoria de notificação, contendo `identifier`, `actions` e `options`.

#### `NotificationChannel`

Tipo: `object`

Um objeto que representa um canal de notificação (Android), contendo `id`, `name`, `importance`, `vibrationPattern`, `lightColor`, `sound`, `bypassDnd`, `showBadge`, `lockscreenVisibility`, `groupId`.

#### `NotificationChannelInput`

Tipo: `object`

Um objeto de entrada para definir um canal de notificação (Android).

#### `NotificationContent`

Tipo: `object`

Um objeto que representa o conteúdo de uma notificação, contendo `title`, `body`, `data`, `sound`, `badge`, `subtitle`, `categoryIdentifier`, `launchImageName`, `attachments`, `summaryArgument`, `summaryArgumentCount`, `targetContentIdentifier`, `interruptionLevel`, `relevanceScore`, `threadIdentifier`.

#### `NotificationRequest`

Tipo: `object`

Um objeto que representa uma solicitação de notificação, contendo `identifier`, `content` e `trigger`.

#### `NotificationResponse`

Tipo: `object`

Um objeto que representa uma resposta de notificação, contendo `notification` e `actionIdentifier`.

#### `NotificationTrigger`

Tipo: `object`

Um objeto que representa um gatilho de notificação, contendo `type` e `repeats`.

#### `GetExpoPushTokenOptions`

Tipo: `object`

Opções para a função `getExpoPushTokenAsync`, incluindo `projectId`.

---

**Autor:** Manus AI
**Data de Geração:** 18 de Junho de 2025

