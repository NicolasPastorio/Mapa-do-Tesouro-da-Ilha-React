# Captura de Tela (ScreenCapture)

Uma biblioteca que permite proteger telas em seu aplicativo de serem capturadas ou gravadas.

`expo-screen-capture` permite proteger telas em seu aplicativo de serem capturadas ou gravadas, bem como ser notificado se uma captura de tela for feita enquanto seu aplicativo estiver em primeiro plano. As duas razões mais comuns pelas quais você pode querer evitar a captura de tela são:

*   Se uma tela estiver exibindo informações confidenciais (senha, dados de cartão de crédito, etc.)
*   Você está exibindo conteúdo pago que não deseja que seja gravado e compartilhado

Isso é especialmente importante no Android, pois a API [`android.media.projection`](https://developer.android.com/reference/android/media/projection/MediaProjection) permite que aplicativos de terceiros realizem captura ou compartilhamento de tela (mesmo que o aplicativo esteja em segundo plano).

No Android, o callback de captura de tela funciona sem permissões adicionais apenas para Android 14+. Você não precisa solicitar ou verificar permissões para bloquear a captura de tela ou usar o callback no Android 14+.

Se você deseja usar o callback de captura de tela no Android 13 ou inferior, você precisa adicionar a permissão `READ_MEDIA_IMAGES` ao seu arquivo AndroidManifest.xml. Você pode usar a chave `android.permissions` em sua configuração de aplicativo. Consulte [permissões do Android](https://docs.expo.dev/guides/permissions/#android-permissions) para obter mais informações.

> A permissão `READ_MEDIA_IMAGES` pode ser adicionada apenas para aplicativos que precisam de amplo acesso a fotos. Consulte [Detalhes sobre a política de permissões de fotos e vídeos do Google Play](https://support.google.com/googleplay/android-developer/answer/12963624).

> Para testar a funcionalidade de captura de tela: No Android, o teste deve ser feito em um dispositivo físico, pois os emuladores não simulam corretamente o comportamento de captura de tela. No iOS Simulator, você pode acionar capturas de tela usando Dispositivo > Acionar Captura de Tela na barra de menu.

## Instalação

Para instalar a API ScreenCapture, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-screen-capture
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

### Exemplo: hook

```javascript
import { usePreventScreenCapture } from 'expo-screen-capture';
import { Text, View } from 'react-native';

export default function ScreenCaptureExample() {
  usePreventScreenCapture();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Enquanto este componente estiver montado, esta tela não pode ser gravada!</Text>
    </View>
  );
}
```

### Exemplo: Bloqueando a captura de tela imperativamente

```javascript
import * as ScreenCapture from 'expo-screen-capture';
import { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function ScreenCaptureExample() {
  const activate = async () => {
    await ScreenCapture.preventScreenCaptureAsync();
  };

  const deactivate = async () => {
    await ScreenCapture.allowScreenCaptureAsync();
  };

  return (
    <View style={styles.container}>
      <Button title="Ativar" onPress={activate} />
      <Button title="Desativar" onPress={deactivate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### Exemplo: Callback para captura de tela

```javascript
import * as ScreenCapture from 'expo-screen-capture';
import { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function useScreenCaptureCallback() {
  
  const hasPermissions = async () => {
    const { status } = await ScreenCapture.requestPermissionsAsync();
    return status === 'granted';
  };

  useEffect(() => {
    let subscription;

    const addListenerAsync = async () => {
      if (await hasPermissions()) {
        subscription = ScreenCapture.addScreenshotListener(() => {
          alert('Obrigado por capturar a tela do meu lindo aplicativo 😊');
        });
      } else {
        console.error('Permissões necessárias para assinar eventos de captura de tela estão faltando!');
      }
    };
    addListenerAsync();

    return () => {
      subscription?.remove();
    };
  }, []);
}
```

## API

```javascript
import * as ScreenCapture from 'expo-screen-capture';
```

### Hooks

#### `usePermissions(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` (opcional) | `PermissionHookOptions<object>` | Opções para o hook de permissões. |

Verifica ou solicita as permissões necessárias para detectar quando uma captura de tela é feita. Isso usa `requestPermissionsAsync` e `getPermissionsAsync` para interagir com o sistema de permissões.

#### `usePreventScreenCapture()`

Um hook que impede a captura de tela enquanto o componente estiver montado. Ele chama `preventScreenCaptureAsync()` quando o componente é montado e `allowScreenCaptureAsync()` quando é desmontado.

### Métodos

#### `ScreenCapture.allowScreenCaptureAsync()`

Permite a captura de tela. Retorna uma promessa que se resolve quando a operação é concluída.

#### `ScreenCapture.getPermissionsAsync()`

Verifica as permissões do usuário para acessar a captura de tela. Retorna uma promessa que se resolve com um objeto `PermissionResponse`.

#### `ScreenCapture.isAvailableAsync()`

Retorna se a API de captura de tela está disponível no dispositivo. Retorna uma promessa que se resolve com um `boolean`.

#### `ScreenCapture.preventScreenCaptureAsync()`

Impede a captura de tela. Retorna uma promessa que se resolve quando a operação é concluída.

#### `ScreenCapture.requestPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar a captura de tela. Retorna uma promessa que se resolve com um objeto `PermissionResponse`.

### Assinaturas de Eventos

#### `ScreenCapture.addScreenshotListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `() => void` | Um callback que é invocado quando uma captura de tela é feita. |

Adiciona um ouvinte para eventos de captura de tela. Retorna uma `EventSubscription`.

#### `ScreenCapture.removeScreenshotListener(subscription)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `subscription` | `EventSubscription` | Uma assinatura a ser removida. |

Remove a assinatura fornecida para eventos de captura de tela.

### Interfaces

#### `Subscription`

Um objeto de assinatura que permite remover convenientemente um ouvinte de evento do emissor. Possui o método `remove()`.

### Tipos

#### `PermissionHookOptions`

Tipo: `object`

Opções para o hook de permissões.

#### `PermissionResponse`

Tipo: `object`

Um objeto que contém o status da permissão (`granted`, `denied`, `undetermined`).

### Enums

#### `PermissionStatus`

Enum que representa o status da permissão (`granted`, `denied`, `undetermined`).

---

**Autor:** Manus AI
**Data de Geração:** 19 de Junho de 2025

