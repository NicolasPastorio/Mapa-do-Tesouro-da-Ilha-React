# Atualizações (Updates)

Uma biblioteca que permite que seu aplicativo gerencie atualizações remotas para o código do seu aplicativo. Ela se comunica com o serviço de atualização remota configurado para obter informações sobre as atualizações disponíveis.

`expo-updates` é uma biblioteca que permite que seu aplicativo gerencie atualizações remotas para o código do seu aplicativo. Ela se comunica com o serviço de atualização remota configurado para obter informações sobre as atualizações disponíveis.

## Instalação

A biblioteca `expo-updates` pode ser configurada automaticamente usando o [EAS Update](https://docs.expo.dev/eas-update/introduction/), que é um serviço hospedado que gerencia e serve atualizações para seu aplicativo. Para começar com o EAS Update, siga as instruções no guia [Começar](https://docs.expo.dev/eas-update/getting-started/).

Alternativamente, também é possível configurar a biblioteca `expo-updates` manualmente em casos onde um serviço de atualização remota diferente é necessário ou a configuração é especificada apenas em arquivos nativos.

### Instalação manual, configuração e serviços de atualização remota personalizados

Para informações detalhadas sobre como configurar manualmente `expo-updates` ou usar serviços de atualização remota personalizados, consulte a [documentação oficial](https://docs.expo.dev/versions/latest/sdk/updates/#manual-installation-configuration-and-custom-remote-update-services).

## Configuração no app config

Existem opções de configuração em tempo de construção que controlam o comportamento da biblioteca. Para a maioria dos aplicativos, esses valores de configuração são definidos no [app config](https://docs.expo.dev/versions/latest/config/app/) sob a propriedade `updates`.

### Propriedades do app config

| Propriedade | Padrão | Necessário? | iOS plist/dict key | Android manifest/xml key | Descrição |
|---|---|---|---|---|---|
| `updates.enabled` | `true` | Não | `EXUpdatesEnabled` | `expo.modules.updates.EXUpdatesEnabled` | Se as atualizações OTA (Over-the-Air) estão habilitadas. |
| `updates.checkAutomatically` | `ON_LAUNCH` | Não | `EXUpdatesCheckOnLaunch` | `expo.modules.updates.EXUpdatesCheckOnLaunch` | Quando o aplicativo deve verificar automaticamente por atualizações. Valores possíveis: `ON_LAUNCH`, `ON_CHANGE`. |
| `updates.fallbackToCacheTimeout` | `0` | Não | `EXUpdatesLaunchWaitMs` | `expo.modules.updates.EXUpdatesLaunchWaitMs` | O tempo máximo em milissegundos para esperar por uma atualização antes de usar a versão em cache. |
| `updates.url` | `null` | Sim (para EAS Update) | `EXUpdatesURL` | `expo.modules.updates.EXUpdatesUrl` | A URL do serviço de atualização remota. |
| `updates.codeSigningCertificate` | `null` | Não | `EXUpdatesCodeSigningCertificate` | `expo.modules.updates.EXUpdatesCodeSigningCertificate` | O certificado usado para assinar as atualizações. |
| `updates.codeSigningId` | `null` | Não | `EXUpdatesCodeSigningId` | `expo.modules.updates.EXUpdatesCodeSigningId` | O ID da chave de assinatura de código. |
| `updates.requestHeaders` | `{}` | Não | `EXUpdatesRequestHeaders` | `expo.modules.updates.EXUpdatesRequestHeaders` | Cabeçalhos HTTP personalizados a serem incluídos nas solicitações de atualização. |

## API

```javascript
import * as Updates from 'expo-updates';
```

## Hooks

### `Updates.useUpdates()`

Um hook que fornece informações detalhadas sobre a atualização atualmente em execução e quaisquer novas atualizações que estejam disponíveis ou tenham sido baixadas.

```javascript
import { useUpdates } from 'expo-updates';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

function UpdatesComponent() {
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } = useUpdates();

  useEffect(() => {
    if (isUpdateAvailable) {
      console.log("Uma nova atualização está disponível!");
      // Você pode solicitar o download da atualização aqui
      // Updates.fetchUpdateAsync();
    }
    if (isUpdatePending) {
      console.log("Uma atualização foi baixada e está pendente de reinício.");
      // Você pode solicitar o reinício do aplicativo aqui
      // Updates.reloadAsync();
    }
  }, [isUpdateAvailable, isUpdatePending]);

  return (
    <View>
      <Text>Versão atual: {currentlyRunning.manifest?.runtimeVersion}</Text>
      {isUpdateAvailable && <Text>Atualização disponível!</Text>}
      {isUpdatePending && <Text>Atualização pendente de reinício.</Text>}
    </View>
  );
}

export default UpdatesComponent;
```

## Métodos

### `Updates.checkForUpdateAsync()`

Verifica se há uma atualização disponível no serviço de atualização remota. Retorna um objeto com `isAvailable` (booleano) e `manifest` (o manifesto da atualização, se disponível).

```javascript
import * as Updates from 'expo-updates';

async function checkForUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      console.log("Atualização disponível:", update.manifest);
      // Iniciar o download da atualização
      // await Updates.fetchUpdateAsync();
    } else {
      console.log("Nenhuma atualização disponível.");
    }
  } catch (e) {
    console.error("Erro ao verificar atualizações:", e);
  }
}

// checkForUpdate();
```

### `Updates.fetchUpdateAsync()`

Baixa a atualização disponível. Deve ser chamado após `checkForUpdateAsync()` indicar que uma atualização está disponível.

```javascript
import * as Updates from 'expo-updates';

async function fetchUpdate() {
  try {
    const update = await Updates.fetchUpdateAsync();
    if (update.isNew) {
      console.log("Atualização baixada com sucesso!");
      // Recarregar o aplicativo para aplicar a atualização
      // await Updates.reloadAsync();
    } else {
      console.log("Nenhuma nova atualização para baixar.");
    }
  } catch (e) {
    console.error("Erro ao baixar atualização:", e);
  }
}

// fetchUpdate();
```

### `Updates.reloadAsync()`

Recarrega o aplicativo para aplicar a atualização baixada. Isso fará com que o aplicativo seja reiniciado.

```javascript
import * as Updates from 'expo-updates';

async function reloadApp() {
  try {
    await Updates.reloadAsync();
    console.log("Aplicativo recarregado para aplicar a atualização.");
  } catch (e) {
    console.error("Erro ao recarregar o aplicativo:", e);
  }
}

// reloadApp();
```

### `Updates.isEmbeddedLaunch`

Um booleano que indica se o aplicativo foi iniciado a partir do pacote embutido (true) ou de uma atualização OTA (false).

```javascript
import * as Updates from 'expo-updates';

console.log("Lançamento embutido:", Updates.isEmbeddedLaunch);
```

### `Updates.isEmergencyLaunch`

Um booleano que indica se o aplicativo foi iniciado em modo de emergência (true) ou não (false). Isso pode acontecer se uma atualização falhar.

```javascript
import * => Updates from 'expo-updates';

console.log("Lançamento de emergência:", Updates.isEmergencyLaunch);
```

### `Updates.manifest`

O manifesto da atualização atualmente em execução. Contém informações sobre a versão, ativos, etc.

```javascript
import * as Updates from 'expo-updates';

console.log("Manifesto da atualização atual:", Updates.manifest);
```

### `Updates.runtimeVersion`

A versão de tempo de execução do aplicativo. Isso é usado para determinar a compatibilidade com as atualizações.

```javascript
import * as Updates from 'expo-updates';

console.log("Versão de tempo de execução:", Updates.runtimeVersion);
```

---

**Autor:** Manus AI
**Data de Geração:** 21 de Junho de 2025

