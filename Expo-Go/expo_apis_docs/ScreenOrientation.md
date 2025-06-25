# Orientação da Tela (ScreenOrientation)

Uma biblioteca universal para gerenciar a orientação da tela de um dispositivo.

A Orientação da Tela é definida como a orientação na qual os gráficos são pintados no dispositivo. Por exemplo, a figura abaixo mostra um dispositivo em orientação física vertical e horizontal, mas com uma orientação de tela retrato. Para a orientação física do dispositivo, consulte a seção de orientação de [Movimento do Dispositivo](https://docs.expo.dev/versions/latest/sdk/devicemotion/).

Nas plataformas Android e iOS, as alterações na orientação da tela substituirão quaisquer configurações do sistema ou preferências do usuário. No Android, é possível alterar a orientação da tela levando em consideração a orientação preferida do usuário. No iOS, as configurações do usuário e do sistema não são acessíveis pelo aplicativo e quaisquer alterações na orientação da tela substituirão as configurações existentes.

## Instalação

Para instalar a API ScreenOrientation, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-screen-orientation
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

### Aviso

A Apple adicionou suporte para o modo _split view_ aos iPads no iOS 9. Isso mudou a forma como a orientação da tela é tratada pelo sistema. Em resumo, para iOS, seu iPad está sempre no modo paisagem, a menos que você abra dois aplicativos lado a lado. Para poder bloquear a orientação da tela usando este módulo, você precisará desabilitar o suporte para este recurso. Para obter mais informações sobre o modo _split view_, consulte a [documentação oficial da Apple](https://developer.apple.com/documentation/uikit/uisplitviewcontroller).

## Configuração no app config

Você pode configurar `expo-screen-orientation` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário de aplicativo para entrar em vigor.

### Exemplo de app.json com config plugin

```json
{
  "expo": {
    "ios": {
      "requireFullScreen": true
    },
    "plugins": [
      [
        "expo-screen-orientation",
        {
          "initialOrientation": "DEFAULT"
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `initialOrientation` | `undefined` | **Apenas para:** iOS. Define a orientação inicial da tela do iOS. Valores possíveis: `DEFAULT`, `ALL`, `PORTRAIT`, `PORTRAIT_UP`, `PORTRAIT_DOWN`, `LANDSCAPE`, `LANDSCAPE_LEFT`, `LANDSCAPE_RIGHT`. |

## API

```javascript
import * as ScreenOrientation from 'expo-screen-orientation';
```

## Métodos

### `ScreenOrientation.getOrientationAsync()`

Obtém a orientação atual da tela. Retorna uma promessa que se resolve com um valor `Orientation` que reflete a orientação atual da tela.

### `ScreenOrientation.getOrientationLockAsync()`

Obtém o tipo de bloqueio de orientação da tela atual. Retorna uma promessa que se resolve com um valor `OrientationLock`.

### `ScreenOrientation.getPlatformOrientationLockAsync()`

Obtém o tipo de bloqueio de orientação da tela específico da plataforma. Retorna uma promessa que se resolve com um valor `PlatformOrientationInfo`.

### `ScreenOrientation.lockAsync(orientationLock)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `orientationLock` | `OrientationLock` | O bloqueio de orientação a ser aplicado. Consulte o enum `OrientationLock` para valores possíveis. |

Bloqueia a orientação da tela para um `OrientationLock` específico. Retorna uma promessa com valor `void`, que se resolve quando a orientação é definida.

Exemplo:

```javascript
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
}
```

### `ScreenOrientation.lockPlatformAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` | `PlatformOrientationInfo` | O bloqueio específico da plataforma a ser aplicado. Consulte o tipo de objeto `PlatformOrientationInfo` para os diferentes formatos de plataforma. |

Retorna uma promessa com valor `void`, resolvendo quando a orientação é definida e rejeitando se uma opção ou valor inválido for passado.

### `ScreenOrientation.supportsOrientationLockAsync(orientationLock)`

| Parâmetro | Tipo |
| --- | --- |
| `orientationLock` | `OrientationLock` |

Retorna se a política `OrientationLock` é suportada no dispositivo. Retorna uma promessa que se resolve com um valor `boolean` que reflete se o `orientationLock` é suportado ou não.

### `ScreenOrientation.unlockAsync()`

Define a orientação da tela de volta para a política `OrientationLock.DEFAULT`. Retorna uma promessa com valor `void`, que se resolve quando a orientação é definida.

## Assinaturas de Eventos

### `ScreenOrientation.addOrientationChangeListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `OrientationChangeListener` | Cada atualização de orientação passará um objeto com o novo `OrientationChangeEvent` para o ouvinte. |

Invoca a função `listener` quando a orientação da tela muda de `portrait` para `landscape` ou de `landscape` para `portrait`. Por exemplo, não será invocada quando a orientação da tela mudar de `portrait up` para `portrait down`, mas será chamada quando houver uma mudança de `portrait up` para `landscape left`.

Retorna: `EventSubscription`

### `ScreenOrientation.removeOrientationChangeListener(subscription)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `subscription` | `EventSubscription` | Um objeto de assinatura que gerencia as atualizações passadas para uma função ouvinte em uma mudança de orientação. |

Cancela a inscrição do ouvinte para o qual a assinatura foi criada. Após chamar esta função, o ouvinte não receberá mais nenhum evento do emissor.

### `ScreenOrientation.removeOrientationChangeListeners()`

Remove todos os ouvintes de mudança de orientação. Retorna uma promessa com valor `void`.

## Interfaces

#### `Subscription`

Um objeto de assinatura que permite remover convenientemente um ouvinte de evento do emissor. Possui o método `remove()`.

## Tipos

#### `OrientationChangeEvent`

Tipo: `object`

Um objeto que representa um evento de mudança de orientação, contendo `orientationInfo`.

#### `OrientationChangeListener`

Tipo: `function`

Uma função de callback para eventos de mudança de orientação.

#### `PlatformOrientationInfo`

Tipo: `object`

Informações de orientação específicas da plataforma, contendo `screenOrientationLock` e `nativeOrientationLock`.

#### `ScreenOrientationInfo`

Tipo: `object`

Informações de orientação da tela, contendo `orientation` e `orientationLock`.

### Enums

#### `Orientation`

Enum que representa as orientações da tela. Valores possíveis: `UNKNOWN`, `PORTRAIT_UP`, `PORTRAIT_DOWN`, `LANDSCAPE_LEFT`, `LANDSCAPE_RIGHT`.

#### `OrientationLock`

Enum que representa os tipos de bloqueio de orientação. Valores possíveis: `UNKNOWN`, `DEFAULT`, `PORTRAIT`, `PORTRAIT_UP`, `PORTRAIT_DOWN`, `LANDSCAPE`, `LANDSCAPE_LEFT`, `LANDSCAPE_RIGHT`, `ALL`, `ALL_BUT_UPSIDE_DOWN`.

#### `SizeClassIOS`

Enum que representa as classes de tamanho do iOS. Valores possíveis: `REGULAR`, `COMPACT`, `UNKNOWN`.

#### `WebOrientation`

Enum que representa as orientações da web. Valores possíveis: `PORTRAIT_PRIMARY`, `PORTRAIT_SECONDARY`, `LANDSCAPE_PRIMARY`, `LANDSCAPE_SECONDARY`.

#### `WebOrientationLock`

Enum que representa os tipos de bloqueio de orientação da web. Valores possíveis: `PORTRAIT_PRIMARY`, `PORTRAIT_SECONDARY`, `LANDSCAPE_PRIMARY`, `LANDSCAPE_SECONDARY`, `PORTRAIT`, `LANDSCAPE`, `ANY`.

---

**Autor:** Manus AI
**Data de Geração:** 19 de Junho de 2025

