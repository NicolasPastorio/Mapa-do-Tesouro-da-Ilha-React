# Localização (Location)

Uma biblioteca que fornece acesso à leitura de informações de geolocalização, pesquisa de localização atual ou eventos de atualização de localização do dispositivo.

`expo-location` permite a leitura de informações de geolocalização do dispositivo. Seu aplicativo pode pesquisar a localização atual ou assinar eventos de atualização de localização.

## Instalação

Para instalar a API Location, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-location
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.json`

Você pode configurar `expo-location` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Permitir que $(PRODUCT_NAME) use sua localização."
        }
      ]
    ]
  }
}
```

### Propriedades Configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `locationAlwaysAndWhenInUsePermission` | `"Permitir que $(PRODUCT_NAME) use sua localização"` | **Apenas para iOS:** Uma string para definir a mensagem de permissão `NSLocationAlwaysAndWhenInUseUsageDescription`. |
| `locationAlwaysPermission` | `"Permitir que $(PRODUCT_NAME) use sua localização"` | **Depreciado. Apenas para iOS:** Uma string para definir a mensagem de permissão `NSLocationAlwaysUsageDescription`. |
| `locationWhenInUsePermission` | `"Permitir que $(PRODUCT_NAME) use sua localização"` | **Depreciado. Apenas para iOS:** Uma string para definir a mensagem de permissão `NSLocationWhenInUseUsageDescription`. |
| `isIosBackgroundLocationEnabled` | `false` | **Apenas para iOS:** Um booleano para habilitar `location` nos `UIBackgroundModes` em `Info.plist`. |
| `isAndroidBackgroundLocationEnabled` | `false` | **Apenas para Android:** Um booleano para habilitar a localização em segundo plano. |

## Localização em Segundo Plano

### Configuração de Localização em Segundo Plano

Para usar a localização em segundo plano, você precisa configurar seu `app.json` e solicitar as permissões apropriadas.

### Métodos de Localização em Segundo Plano

#### `Location.startLocationUpdatesAsync(taskName, options)`

Inicia a coleta de atualizações de localização em segundo plano. O `taskName` deve corresponder a uma tarefa registrada com `TaskManager.defineTask`.

#### `Location.stopLocationUpdatesAsync(taskName)`

Pára a coleta de atualizações de localização em segundo plano para a tarefa especificada.

### Métodos de Geofencing

#### `Location.startGeofencingAsync(taskName, regions)`

Inicia o monitoramento de regiões de geofencing. O `taskName` deve corresponder a uma tarefa registrada com `TaskManager.defineTask`.

#### `Location.stopGeofencingAsync(taskName)`

Pára o monitoramento de regiões de geofencing para a tarefa especificada.

### Permissões de Segundo Plano

Para usar a localização em segundo plano, você precisa solicitar a permissão `ACCESS_BACKGROUND_LOCATION` no Android e configurar as permissões de localização em segundo plano no iOS.

## Localizações Diferidas

Localizações diferidas permitem que o sistema operacional otimize o uso da bateria, agrupando as atualizações de localização e entregando-as em lotes.

## Uso

### Habilitar Localização do Emulador

#### Emulador Android

Para simular a localização no emulador Android, você pode usar o Android Studio ou comandos `adb`.

#### Simulador iOS

Para simular a localização no simulador iOS, você pode usar o Xcode.

## API

```javascript
import * as Location from 'expo-location';
```

### Hooks

#### `useBackgroundPermissions()`

Um hook que retorna o status da permissão de localização em segundo plano e uma função para solicitá-la.

#### `useForegroundPermissions()`

Um hook que retorna o status da permissão de localização em primeiro plano e uma função para solicitá-la.

### Métodos

#### `Location.enableNetworkProviderAsync()`

Habilita o provedor de rede para localização. **Apenas para Android.**

#### `Location.geocodeAsync(address)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `address` | `string` | O endereço a ser geocodificado. |

Geocodifica um endereço em coordenadas geográficas. Retorna uma promessa que se resolve com um array de objetos `LocationGeocodedLocation`.

#### `Location.getBackgroundPermissionsAsync()`

Obtém o status da permissão de localização em segundo plano. Retorna uma promessa que se resolve com um objeto `LocationPermissionResponse`.

#### `Location.getCurrentPositionAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` (opcional) | `LocationOptions` | Opções para obter a localização atual. |

Obtém a localização atual do dispositivo. Retorna uma promessa que se resolve com um objeto `LocationObject`.

#### `Location.getForegroundPermissionsAsync()`

Obtém o status da permissão de localização em primeiro plano. Retorna uma promessa que se resolve com um objeto `LocationPermissionResponse`.

#### `Location.getHeadingAsync()`

Obtém a direção atual do dispositivo. Retorna uma promessa que se resolve com um objeto `LocationHeadingObject`.

#### `Location.getLastKnownPositionAsync()`

Obtém a última localização conhecida do dispositivo. Retorna uma promessa que se resolve com um objeto `LocationObject` ou `null` se não houver localização conhecida.

#### `Location.getProviderStatusAsync()`

Obtém o status dos provedores de localização (GPS, rede, etc.). Retorna uma promessa que se resolve com um objeto `LocationProviderStatus`.

#### `Location.hasServicesEnabledAsync()`

Verifica se os serviços de localização estão habilitados no dispositivo. Retorna uma promessa que se resolve com um booleano.

#### `Location.hasStartedGeofencingAsync(taskName)`

Verifica se o geofencing foi iniciado para a tarefa especificada. Retorna uma promessa que se resolve com um booleano.

#### `Location.hasStartedLocationUpdatesAsync(taskName)`

Verifica se as atualizações de localização foram iniciadas para a tarefa especificada. Retorna uma promessa que se resolve com um booleano.

#### `Location.installWebGeolocationPolyfill()`

Instala um polyfill para a API Geolocation da web. Útil para desenvolvimento web.

#### `Location.requestBackgroundPermissionsAsync()`

Solicita permissões de localização em segundo plano. Retorna uma promessa que se resolve com um objeto `LocationPermissionResponse`.

#### `Location.requestForegroundPermissionsAsync()`

Solicita permissões de localização em primeiro plano. Retorna uma promessa que se resolve com um objeto `LocationPermissionResponse`.

#### `Location.reverseGeocodeAsync(latitude, longitude)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `latitude` | `number` | A latitude. |
| `longitude` | `number` | A longitude. |

Geocodifica reversamente coordenadas geográficas em um endereço. Retorna uma promessa que se resolve com um array de objetos `LocationGeocodedLocation`.

#### `Location.setGoogleApiKey(apiKey)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `apiKey` | `string` | Sua chave de API do Google. |

Define a chave de API do Google para serviços de localização. **Apenas para Android.**

#### `Location.setLastKnownPositionAsync(location)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `location` | `LocationObject` | O objeto de localização a ser definido. |

Define a última localização conhecida do dispositivo. Útil para testes ou para fornecer uma localização inicial.

#### `Location.setProviderStatusAsync(status)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `status` | `LocationProviderStatus` | O status do provedor a ser definido. |

Define o status dos provedores de localização. Útil para testes.

#### `Location.watchHeadingAsync(callback)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `callback` | `(heading: LocationHeadingObject) => void` | Um callback que é invocado quando a direção do dispositivo muda. |

Assina as atualizações da direção do dispositivo. Retorna uma `EventSubscription`.

#### `Location.watchPositionAsync(options, callback)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` | `LocationOptions` | Opções para as atualizações de localização. |
| `callback` | `(location: LocationObject) => void` | Um callback que é invocado quando a localização do dispositivo muda. |

Assina as atualizações de localização do dispositivo. Retorna uma `EventSubscription`.

### Tipos

#### `LocationAccuracy`

Tipo: `number`

Nível de precisão da localização. Valores possíveis: `Location.Accuracy.Lowest`, `Location.Accuracy.Low`, `Location.Accuracy.Balanced`, `Location.Accuracy.High`, `Location.Accuracy.Highest`, `Location.Accuracy.BestForNavigation`.

#### `LocationActivityType`

Tipo: `number`

Tipo de atividade para otimizar o uso da bateria. Valores possíveis: `Location.ActivityType.Other`, `Location.ActivityType.AutomotiveNavigation`, `Location.ActivityType.Fitness`, `Location.ActivityType.OtherNavigation`.

#### `LocationGeocodedLocation`

Tipo: `object`

Um objeto que representa uma localização geocodificada, contendo `latitude`, `longitude`, `altitude`, `accuracy`, `speed`, `heading`, `timestamp`, `address`, `city`, `country`, `countryCode`, `district`, `isoCountryCode`, `name`, `postalCode`, `region`, `street`, `streetNumber`, `subregion`, `timezone`.

#### `LocationHeadingObject`

Tipo: `object`

Um objeto que representa a direção do dispositivo, contendo `trueHeading`, `magHeading`, `accuracy`, `timestamp`.

#### `LocationObject`

Tipo: `object`

Um objeto que representa uma localização, contendo `coords` (latitude, longitude, altitude, precisão, velocidade, direção), `timestamp`.

#### `LocationOptions`

Tipo: `object`

Opções para as solicitações de localização, incluindo `accuracy`, `timeInterval`, `distanceInterval`, `mayShowUserSettingsDialog`, `showsBackgroundLocationIndicator`, `activityType`.

#### `LocationPermissionResponse`

Tipo: `object`

Um objeto que representa a resposta da permissão de localização, contendo `status`, `expires`, `granted`, `canAskAgain`.

#### `LocationProviderStatus`

Tipo: `object`

Um objeto que representa o status dos provedores de localização, contendo `gpsAvailable`, `networkAvailable`, `passiveAvailable`.

---

**Autor:** Manus AI
**Data de Geração:** 17 de Junho de 2025

