# Mapas (Maps)

Uma biblioteca que fornece acesso ao Google Maps no Android e Apple Maps no iOS.

> Esta biblioteca está atualmente em alfa e frequentemente sofrerá alterações significativas. Não está disponível no aplicativo Expo Go – use [compilações de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/) para experimentá-la.

## Instalação

Para instalar a API Maps, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-maps
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração

O Expo Maps fornece acesso às APIs de mapa nativas da plataforma no Android e iOS.

*   **Apple Maps** (disponível apenas no iOS). Nenhuma configuração adicional é necessária para usá-lo após a instalação deste pacote.
*   **Google Maps** (disponível apenas no Android). Embora o Google forneça um SDK do Google Maps para iOS, o Expo Maps o suporta exclusivamente no Android. Se você quiser usar o Google Maps no iOS, você pode procurar usar uma [biblioteca alternativa](https://github.com/react-native-maps/react-native-maps) ou [escrever a sua própria](https://docs.expo.dev/modules/build-a-native-module/).

### Configuração da API do Google Cloud

Antes de usar o Google Maps no Android, você precisa registrar um projeto do Google Cloud API, habilitar o Maps SDK para Android e adicionar a configuração associada ao seu projeto Expo.

[Configurar o Google Maps no Android](https://docs.expo.dev/versions/latest/sdk/maps/#set-up-google-maps-on-android)

> Se você já registrou um projeto para outro serviço do Google no Android, como o Google Sign In, você pode habilitar o Maps SDK para Android em seu projeto e pular para a etapa 4.

## Permissões

Para exibir a localização do usuário no mapa, você precisa declarar e solicitar a permissão de localização antecipadamente. Você pode configurar isso usando o [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-maps",
        {
          "requestLocationPermission": true,
          "locationPermission": "Permitir que $(PRODUCT_NAME) use sua localização"
        }
      ]
    ]
  }
}
```

### Propriedades Configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `requestLocationPermission` | `false` | Um booleano para adicionar permissões ao `AndroidManifest.xml` e `Info.plist`. |
| `locationPermission` | `"Permitir que $(PRODUCT_NAME) use sua localização"` | **Apenas para iOS:** Uma string para definir a mensagem de permissão `NSLocationWhenInUseUsageDescription`. |

## Uso

```javascript
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Platform, Text, StyleSheet, View } from 'react-native';

export default function App() {
  if (Platform.OS === 'ios') {
    return <AppleMaps.View style={styles.map} />;
  } else if (Platform.OS === 'android') {
    return <GoogleMaps.View style={styles.map} />;
  } else {
    return (
      <View style={styles.container}>
        <Text>Mapas estão disponíveis apenas no Android e iOS</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
});
```

## API

```javascript
import { AppleMaps, GoogleMaps } from 'expo-maps';
```

## Componentes

### `<AppleMaps.View />`

Um componente React Native que exibe um mapa usando o Apple Maps no iOS.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `annotations` (opcional) | `AppleMapsAnnotation[]` | Um array de anotações para exibir no mapa. |
| `markers` (opcional) | `AppleMapsMarker[]` | Um array de marcadores para exibir no mapa. |
| `onCameraMove` (opcional) | `(event: { bearing: number, coordinates: Coordinates, tilt: number, zoom: number }) => void` | Lambda invocado quando o mapa é movido pelo usuário. |
| `onMapPress` (opcional) | `(event: { coordinates: Coordinates }) => void` | Lambda invocado quando o usuário clica no mapa. Não será invocado se o usuário clicar em um POI ou marcador. |
| `onMarkerPress` (opcional) | `(event: AppleMapsMarker) => void` | Lambda invocado quando o marcador é clicado. |
| `onPolylinePress` (opcional) | `(event: AppleMapsPolyline) => void` | Lambda invocado quando a polilinha é clicada. |
| `polylines` (opcional) | `AppleMapsPolyline[]` | Um array de polilinhas para exibir no mapa. |
| `properties` (opcional) | `AppleMapsProperties` | As propriedades para o mapa. |
| `uiSettings` (opcional) | `AppleMapsUISettings` | As `MapUiSettings` a serem usadas para configurações específicas da UI no mapa. |

### `<GoogleMaps.View />`

Um componente React Native que exibe um mapa usando o Google Maps no Android.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `colorScheme` (opcional) | `string` | Define o esquema de cores para o mapa (`light`, `dark`). |
| `markers` (opcional) | `GoogleMapsMarker[]` | Um array de marcadores para exibir no mapa. |
| `onCameraMove` (opcional) | `(event: { bearing: number, coordinates: Coordinates, tilt: number, zoom: number }) => void` | Lambda invocado quando o mapa é movido pelo usuário. |
| `onMapPress` (opcional) | `(event: { coordinates: Coordinates }) => void` | Lambda invocado quando o usuário clica no mapa. Não será invocado se o usuário clicar em um POI ou marcador. |
| `onMarkerPress` (opcional) | `(event: GoogleMapsMarker) => void` | Lambda invocado quando o marcador é clicado. |
| `onPolylinePress` (opcional) | `(event: GoogleMapsPolyline) => void` | Lambda invocado quando a polilinha é clicada. |
| `polylines` (opcional) | `GoogleMapsPolyline[]` | Um array de polilinhas para exibir no mapa. |
| `properties` (opcional) | `GoogleMapsProperties` | As propriedades para o mapa. |
| `uiSettings` (opcional) | `GoogleMapsUISettings` | As `MapUiSettings` a serem usadas para configurações específicas da UI no mapa. |
| `userLocation` (opcional) | `GoogleMapsUserLocation` | As configurações de localização do usuário. |

### `<GoogleStreetView />`

Um componente React Native que exibe o Google Street View no Android.

## Hooks

### `useLocationPermissions()`

Um hook que retorna o status da permissão de localização e uma função para solicitá-la.

## Métodos

### `Maps.getPermissionsAsync()`

Obtém o status da permissão de localização para mapas. Retorna uma promessa que se resolve com um objeto `PermissionResponse`.

### `Maps.requestPermissionsAsync()`

Solicita permissões de localização para mapas. Retorna uma promessa que se resolve com um objeto `PermissionResponse`.

## Tipos

### `AppleMapsAnnotation`

Tipo: `object`

Um objeto que representa uma anotação do Apple Maps.

### `AppleMapsMarker`

Tipo: `object`

Um objeto que representa um marcador do Apple Maps.

### `AppleMapsPolyline`

Tipo: `object`

Um objeto que representa uma polilinha do Apple Maps.

### `AppleMapsProperties`

Tipo: `object`

Um objeto que define as propriedades do Apple Maps.

### `AppleMapsUISettings`

Tipo: `object`

Um objeto que define as configurações da UI do Apple Maps.

### `AppleMapsViewType`

Tipo: `object`

O tipo de referência para o componente `AppleMaps.View`.

### `CameraPosition`

Tipo: `object`

Um objeto que representa a posição da câmera do mapa.

### `Coordinates`

Tipo: `object`

Um objeto que representa coordenadas geográficas (latitude e longitude).

### `GoogleMapsMarker`

Tipo: `object`

Um objeto que representa um marcador do Google Maps.

### `GoogleMapsPolyline`

Tipo: `object`

Um objeto que representa uma polilinha do Google Maps.

### `GoogleMapsProperties`

Tipo: `object`

Um objeto que define as propriedades do Google Maps.

### `GoogleMapsUISettings`

Tipo: `object`

Um objeto que define as configurações da UI do Google Maps.

### `GoogleMapsUserLocation`

Tipo: `object`

Um objeto que define as configurações de localização do usuário do Google Maps.

---

**Autor:** Manus AI
**Data de Geração:** 18 de Junho de 2025

