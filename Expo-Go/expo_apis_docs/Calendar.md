# Calendário (Calendar)

Uma biblioteca que fornece uma API para interagir com os calendários do sistema do dispositivo, eventos, lembretes e registros associados.

`expo-calendar` fornece uma API para interagir com os calendários do sistema do dispositivo, eventos, lembretes e registros associados.

Além disso, ele fornece métodos para iniciar a [interface do usuário do calendário fornecida pelo sistema](https://docs.expo.dev/versions/latest/sdk/calendar/#launching-system-provided-calendar-dialogs) para permitir que o usuário visualize ou edite eventos. No Android, esses métodos iniciam o aplicativo de calendário do sistema usando uma Intent. No iOS, eles apresentam [`EKEventViewController`](https://developer.apple.com/documentation/eventkitui/ekeventviewcontroller) ou [`EKEventEditViewController`](https://developer.apple.com/documentation/eventkitui/ekeventeditviewcontroller) como um modal.

## Instalação

Para instalar a API Calendar, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-calendar
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.config`

Você pode configurar `expo-calendar` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-calendar",
        {
          "calendarPermission": "O aplicativo precisa acessar seu calendário."
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) (você está usando projetos Android e iOS nativos manualmente), então você precisa configurar as seguintes permissões em seus projetos nativos:

*   Para Android, adicione as permissões `android.permission.READ_CALENDAR` e `android.permission.WRITE_CALENDAR` ao arquivo `android/app/src/main/AndroidManifest.xml` do seu projeto:

    ```xml
    <uses-permission android:name="android.permission.READ_CALENDAR" />
    <uses-permission android:name="android.permission.WRITE_CALENDAR" />
    ```

*   Para iOS, adicione `NSCalendarsUsageDescription` e `NSRemindersUsageDescription` ao seu `ios/[app]/Info.plist`:

    ```xml
    <key>NSCalendarsUsageDescription</key>
    <string>Permitir que $(PRODUCT_NAME) acesse seu calendário</string>
    <key>NSRemindersUsageDescription</key>
    <string>Permitir que $(PRODUCT_NAME) acesse seus lembretes</string>
    ```

## Uso

Abaixo está um exemplo que demonstra como usar `expo-calendar`.

```javascript
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Aqui estão todos os seus calendários:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Exemplo do Módulo de Calendário</Text>
      <Button title="Criar um novo calendário" onPress={createCalendar} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Seu novo ID de calendário é: ${newCalendarID}`);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
```

## API

```javascript
import * as Calendar from 'expo-calendar';
```

## Lançando diálogos de calendário fornecidos pelo sistema

### `createEventInCalendarAsync(eventData, presentationOptions)`

Inicia a interface do usuário do calendário fornecida pelo sistema operacional para criar um novo evento.

Uma promessa que se resolve com informações sobre o resultado do diálogo.

### `editEventInCalendarAsync(params, presentationOptions)`

Inicia a interface do usuário do calendário fornecida pelo sistema operacional para editar ou excluir um evento. No Android, isso é o mesmo que `openEventInCalendarAsync`.

Uma promessa que se resolve com informações sobre o resultado do diálogo.

> Obsoleto: Use [`openEventInCalendarAsync`](https://docs.expo.dev/versions/latest/sdk/calendar/#openeventincalendarasync) em vez disso.

### `openEventInCalendar(id)`

Envia uma intenção para abrir o evento especificado no aplicativo de calendário do sistema operacional.

### `openEventInCalendarAsync(params, presentationOptions)`

Inicia a interface do usuário do calendário fornecida pelo sistema operacional para visualizar um evento.

Uma promessa que se resolve com informações sobre o resultado do diálogo.

## Hooks

### `useCalendarPermissions(options)`

Verifica ou solicita permissões para acessar o calendário. Isso usa `getCalendarPermissionsAsync` e `requestCalendarPermissionsAsync` para interagir com as permissões.

Retorna:

`[null | PermissionResponse, RequestPermissionMethod<PermissionResponse>, GetPermissionMethod<PermissionResponse>]`

Exemplo:

```javascript
const [status, requestPermission] = Calendar.useCalendarPermissions();
```

### `useRemindersPermissions(options)`

Verifica ou solicita permissões para acessar lembretes. Isso usa `getRemindersPermissionsAsync` e `requestRemindersPermissionsAsync` para interagir com as permissões.

Retorna:

`[null | PermissionResponse, RequestPermissionMethod<PermissionResponse>, GetPermissionMethod<PermissionResponse>]`

Exemplo:

```javascript
const [status, requestPermission] = Calendar.useRemindersPermissions();
```

## Métodos

### `Calendar.createAttendeeAsync(eventId, details)`

Cria um novo registro de participante e o adiciona ao evento especificado. Observe que, se `eventId` especificar um evento recorrente, isso adicionará o participante a cada instância do evento.

Uma string que representa o ID do registro de participante recém-criado.

### `Calendar.createCalendarAsync(details)`

Cria um novo calendário no dispositivo, permitindo que eventos sejam adicionados posteriormente e exibidos no aplicativo de calendário do sistema operacional.

Uma string que representa o ID do calendário recém-criado.

### `Calendar.createEventAsync(calendarId, eventData)`

Cria um novo evento no calendário especificado.

Uma promessa que se resolve com uma string que representa o ID do evento recém-criado.

### `Calendar.createReminderAsync(calendarId, reminder)`

Cria um novo lembrete no calendário especificado.

Uma promessa que se resolve com uma string que representa o ID do lembrete recém-criado.

### `Calendar.deleteAttendeeAsync(id)`

Exclui um registro de participante existente do dispositivo. Use com cautela.

### `Calendar.deleteCalendarAsync(id)`

Exclui um calendário existente e todos os eventos/lembretes/participantes associados do dispositivo. Use com cautela.

### `Calendar.deleteEventAsync(id, recurringEventOptions)`

Exclui um evento existente do dispositivo. Use com cautela.

### `Calendar.deleteReminderAsync(id)`

Exclui um lembrete existente do dispositivo. Use com cautela.

### `Calendar.getAttendeesForEventAsync(id, recurringEventOptions)`

Obtém todos os participantes para um determinado evento (ou instância de um evento recorrente).

Uma promessa que se resolve com um array de [`Attendee`](https://docs.expo.dev/versions/latest/sdk/calendar/#attendee) associados ao evento especificado.

### `Calendar.getCalendarPermissionsAsync()`

Verifica as permissões do usuário para acessar os calendários do usuário.

Uma promessa que se resolve com um objeto do tipo [`PermissionResponse`](https://docs.expo.dev/versions/latest/sdk/calendar/#permissionresponse).

### `Calendar.getCalendarsAsync(entityType)`

Obtém todos os calendários do dispositivo. Você pode filtrar os calendários por `entityType`.

Uma promessa que se resolve com um array de [`Calendar`](https://docs.expo.dev/versions/latest/sdk/calendar/#calendar) objetos.

### `Calendar.getDefaultCalendarAsync()`

Obtém o calendário padrão do dispositivo.

Uma promessa que se resolve com um [`Calendar`](https://docs.expo.dev/versions/latest/sdk/calendar/#calendar) objeto.

### `Calendar.getEventAsync(id, recurringEventOptions)`

Obtém um evento específico do dispositivo.

Uma promessa que se resolve com um [`Event`](https://docs.expo.dev/versions/latest/sdk/calendar/#event) objeto.

### `Calendar.getEventsAsync(calendarIds, startDate, endDate)`

Obtém eventos de calendários específicos dentro de um determinado intervalo de datas.

Uma promessa que se resolve com um array de [`Event`](https://docs.expo.dev/versions/latest/sdk/calendar/#event) objetos.

### `Calendar.getReminderAsync(id)`

Obtém um lembrete específico do dispositivo.

Uma promessa que se resolve com um [`Reminder`](https://docs.expo.dev/versions/latest/sdk/calendar/#reminder) objeto.

### `Calendar.getRemindersAsync(calendarIds, startDate, endDate)`

Obtém lembretes de calendários específicos dentro de um determinado intervalo de datas.

Uma promessa que se resolve com um array de [`Reminder`](https://docs.expo.dev/versions/latest/sdk/calendar/#reminder) objetos.

### `Calendar.getRemindersPermissionsAsync()`

Verifica as permissões do usuário para acessar os lembretes do usuário.

Uma promessa que se resolve com um objeto do tipo [`PermissionResponse`](https://docs.expo.dev/versions/latest/sdk/calendar/#permissionresponse).

### `Calendar.requestCalendarPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar os calendários do usuário.

Uma promessa que se resolve com um objeto do tipo [`PermissionResponse`](https://docs.expo.dev/versions/latest/sdk/calendar/#permissionresponse).

### `Calendar.requestRemindersPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar os lembretes do usuário.

Uma promessa que se resolve com um objeto do tipo [`PermissionResponse`](https://docs.expo.dev/versions/latest/sdk/calendar/#permissionresponse).

### `Calendar.updateAttendeeAsync(id, details)`

Atualiza um registro de participante existente.

Uma string que representa o ID do registro de participante atualizado.

### `Calendar.updateCalendarAsync(id, details)`

Atualiza um calendário existente.

Uma string que representa o ID do calendário atualizado.

### `Calendar.updateEventAsync(id, eventData, recurringEventOptions)`

Atualiza um evento existente.

Uma string que representa o ID do evento atualizado.

### `Calendar.updateReminderAsync(id, reminder)`

Atualiza um lembrete existente.

Uma string que representa o ID do lembrete atualizado.

## Tipos e Interfaces

### `Attendee`

Tipo: `object`

Representa um participante de um evento.

### `Calendar`

Tipo: `object`

Representa um calendário.

### `Event`

Tipo: `object`

Representa um evento do calendário.

### `Reminder`

Tipo: `object`

Representa um lembrete.

### `EntityTypes`

Enum que representa os tipos de entidades do calendário (`Event`, `Reminder`).

### `CalendarAccessLevel`

Enum que representa os níveis de acesso do calendário (`READ`, `WRITE`, `OWNER`).

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025

