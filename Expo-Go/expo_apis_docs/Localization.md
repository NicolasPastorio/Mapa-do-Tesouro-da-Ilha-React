# Localização (Localization)

Uma biblioteca que fornece uma interface para informações de localização nativas do usuário.

`expo-localization` permite que você localize seu aplicativo, personalizando a experiência para regiões, idiomas ou culturas específicas. Ele também fornece acesso aos dados de localidade no dispositivo nativo. Usar uma biblioteca de localização como [`lingui-js`](https://lingui.dev/), [`react-i18next`](https://react.i18next.com/), [`react-intl`](https://formatjs.io/docs/react-intl/) ou [`i18n-js`](https://github.com/fnando/i18n-js) com `expo-localization` permitirá que você crie uma experiência muito acessível para os usuários.

## Instalação

Para instalar a API Localization, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-localization
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.json`

Você pode configurar `expo-localization` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": ["expo-localization"]
  }
}
```

## Uso

Encontre mais informações sobre como usar `expo-localization` e adicionar suporte para idiomas da direita para a esquerda no [Guia de Localização](https://docs.expo.dev/guides/localization/).

## API

```javascript
import { getLocales, getCalendars } from 'expo-localization';
```

### Comportamento

Você pode usar os métodos síncronos `getLocales()` e `getCalendars()` para obter as configurações de localidade do dispositivo do usuário. No iOS, os resultados permanecerão os mesmos enquanto o aplicativo estiver em execução.

No Android, o usuário pode alterar as preferências de localidade nas Configurações sem reiniciar os aplicativos. Para manter a localização atual, você pode executar novamente os métodos `getLocales()` e `getCalendars()` toda vez que o aplicativo retornar ao primeiro plano. Use `AppState` para detectar isso.

## Constantes

### `Localization.locale`

> **Depreciado:** Use `Localization.getLocales()` em vez disso.

Um [código de idioma IETF BCP 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt), consistindo em um código de idioma de dois caracteres e códigos opcionais de script, região e variante.

Tipo: `string`

Exemplo: `en`, `en-US`, `zh-Hans`, `zh-Hans-CN`, `en-emodeng`.

## Hooks

### `useCalendars()`

Um hook que fornece uma lista dos calendários preferidos do usuário, retornados como um array de objetos do tipo `Calendar`. Garantido para conter pelo menos 1 elemento. Por enquanto, sempre retorna um único elemento, mas é provável que retorne uma lista de preferências do usuário em algumas plataformas no futuro. Se as configurações do sistema operacional mudarem, o hook será renderizado novamente com uma nova lista de calendários.

Exemplo:

```json
[
  {
    "calendar": "gregory",
    "timeZone": "Europe/Warsaw",
    "uses24hourClock": true,
    "firstWeekday": 1
  }
]
```

### `useLocales()`

Um hook que fornece uma lista das localidades do usuário, retornadas como um array de objetos do tipo `Locale`. Garantido para conter pelo menos 1 elemento. Elas são retornadas na ordem que o usuário define em suas configurações de dispositivo. Na web, os sistemas de moeda e medição não são fornecidos, sendo retornados como nulos. Se necessário, você pode inferi-los da região atual usando uma tabela de consulta. Se as configurações do sistema operacional mudarem, o hook será renderizado novamente com uma nova lista de localidades.

Exemplo:

```json
[
  {
    "languageTag": "pl-PL",
    "languageCode": "pl",
    "textDirection": "ltr",
    "digitGroupingSeparator": " ",
    "decimalSeparator": ",",
    "measurementSystem": "metric",
    "currencyCode": "PLN",
    "currencySymbol": "zł",
    "regionCode": "PL",
    "temperatureUnit": "celsius"
  }
]
```

## Métodos

### `Localization.getCalendars()`

Lista dos calendários preferidos do usuário, retornados como um array de objetos do tipo `Calendar`. Garantido para conter pelo menos 1 elemento. Por enquanto, sempre retorna um único elemento, mas é provável que retorne uma lista de preferências do usuário em algumas plataformas no futuro.

Exemplo:

```json
[
  {
    "calendar": "gregory",
    "timeZone": "Europe/Warsaw",
    "uses24hourClock": true,
    "firstWeekday": 1
  }
]
```

### `Localization.getLocales()`

Lista das localidades do usuário, retornadas como um array de objetos do tipo `Locale`. Garantido para conter pelo menos 1 elemento. Elas são retornadas na ordem que o usuário define em suas configurações de dispositivo. Na web, os sistemas de moeda e medição não são fornecidos, sendo retornados como nulos. Se necessário, você pode inferi-los da região atual usando uma tabela de consulta.

Exemplo:

```json
[
  {
    "languageTag": "pl-PL",
    "languageCode": "pl",
    "textDirection": "ltr",
    "digitGroupingSeparator": " ",
    "decimalSeparator": ",",
    "measurementSystem": "metric",
    "currencyCode": "PLN",
    "currencySymbol": "zł",
    "regionCode": "PL",
    "temperatureUnit": "celsius"
  }
]
```

## Tipos

### `Calendar`

Tipo: `object`

Um objeto que representa um calendário, contendo as seguintes propriedades:

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `calendar` | `CalendarIdentifier` ou `null` | O identificador do calendário, um dos [tipos de calendário Unicode](https://unicode.org/reports/tr35/tr35-49/tr35-dates.html#Calendar_Types). No Android, é limitado a um dos [tipos de calendário disponíveis](https://developer.android.com/reference/java/util/Calendar). No iOS, usa [identificadores de calendário](https://developer.apple.com/documentation/foundation/nscalendar/calendaridentifier), mas os mapeia para os tipos Unicode correspondentes, e nunca conterá `dangi` ou `islamic-rgsa` devido a não ser implementado no iOS. |
| `firstWeekday` | `Weekday` ou `null` | O primeiro dia da semana. Para a maioria dos calendários, domingo é o número 1, com sábado sendo o número 7. Pode ser nulo em alguns navegadores que não suportam a propriedade `weekInfo` na API `Intl`. Exemplo: `1`, `7`. |
| `timeZone` | `string` ou `null` | Fuso horário para o calendário. Pode ser `null` na Web. Exemplo: `America/Los_Angeles`, `Europe/Warsaw`, `GMT+1`. |
| `uses24hourClock` | `boolean` | Indica se o calendário usa um relógio de 24 horas. |

### `Locale`

Tipo: `object`

Um objeto que representa uma localidade, contendo as seguintes propriedades:

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `languageTag` | `string` | O código de idioma IETF BCP 47 completo para a localidade. |
| `languageCode` | `string` | O código de idioma de dois caracteres para a localidade. |
| `textDirection` | `string` | A direção do texto para a localidade (`ltr` para esquerda para direita, `rtl` para direita para esquerda). |
| `digitGroupingSeparator` | `string` | O separador de agrupamento de dígitos para a localidade. |
| `decimalSeparator` | `string` | O separador decimal para a localidade. |
| `measurementSystem` | `string` ou `null` | O sistema de medição para a localidade (`metric`, `imperial`). Pode ser nulo na Web. |
| `currencyCode` | `string` ou `null` | O código da moeda para a localidade (por exemplo, `USD`, `BRL`). Pode ser nulo na Web. |
| `currencySymbol` | `string` ou `null` | O símbolo da moeda para a localidade (por exemplo, `$`, `R$`). Pode ser nulo na Web. |
| `regionCode` | `string` ou `null` | O código da região de dois caracteres para a localidade (por exemplo, `US`, `BR`). Pode ser nulo na Web. |
| `temperatureUnit` | `string` ou `null` | A unidade de temperatura para a localidade (`celsius`, `fahrenheit`). Pode ser nulo na Web. |

### `Localization`

Tipo: `object`

Um objeto que contém informações de localização do dispositivo.

## Enums

### `CalendarIdentifier`

Enum que representa os identificadores de calendário Unicode.

### `Weekday`

Enum que representa os dias da semana (1 para domingo, 7 para sábado).

---

**Autor:** Manus AI
**Data de Geração:** 17 de Junho de 2025

