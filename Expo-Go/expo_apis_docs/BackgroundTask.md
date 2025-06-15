# Tarefa em Segundo Plano (BackgroundTask)

Uma biblioteca que fornece uma API para executar tarefas em segundo plano.

`expo-background-task` fornece uma API para executar tarefas em segundo plano adiáveis de uma forma que otimiza o consumo de bateria e energia no dispositivo do usuário final. Este módulo usa a API [`WorkManager`](https://developer.android.com/topic/libraries/architecture/workmanager) no Android e a API [`BGTaskScheduler`](https://developer.apple.com/documentation/backgroundtasks/bgtaskscheduler) no iOS para agendar tarefas. Ele também usa a API Nativa [`expo-task-manager`](https://docs.expo.dev/versions/latest/sdk/task-manager/) para executar tarefas JavaScript.

## Tarefas em Segundo Plano

Uma tarefa em segundo plano é uma unidade de trabalho adiável que é executada em segundo plano, fora do ciclo de vida do seu aplicativo. Isso é útil para tarefas que precisam ser executadas quando o aplicativo está inativo, como sincronizar dados com um servidor, buscar novo conteúdo ou até mesmo verificar se há alguma [`expo-updates`](https://docs.expo.dev/versions/latest/sdk/updates/).

### Quando as tarefas em segundo plano são executadas?

A API de Tarefas em Segundo Plano do Expo aproveita cada plataforma para executar tarefas no momento mais ideal para o usuário e o dispositivo quando o aplicativo está em segundo plano.

Isso significa que a tarefa pode não ser executada imediatamente após ser agendada, mas será executada em algum momento no futuro se o sistema assim o decidir. Você pode especificar um intervalo mínimo em minutos para a tarefa ser executada. A tarefa será executada algum tempo depois que o intervalo tiver passado, desde que as condições especificadas sejam atendidas.

Uma tarefa em segundo plano só será executada se a bateria tiver carga suficiente (ou o dispositivo estiver conectado à energia) e a rede estiver disponível. Sem essas condições, a tarefa não será executada. O comportamento exato variará dependendo do sistema operacional.

### Quando elas serão interrompidas?

As tarefas em segundo plano são gerenciadas por APIs de plataforma e restrições do sistema. Saber quando as tarefas param ajuda a planejar seu uso de forma eficaz.

*   As tarefas em segundo plano são interrompidas se o usuário encerrar o aplicativo. As tarefas são retomadas quando o aplicativo é reiniciado.
*   Se o sistema parar o aplicativo ou o dispositivo reiniciar, as tarefas em segundo plano serão retomadas e o aplicativo será reiniciado.

No Android, remover um aplicativo da lista de aplicativos recentes não o interrompe completamente, enquanto no iOS, deslizar para fora no alternador de aplicativos o encerra completamente.

> No Android, o comportamento varia de acordo com o fornecedor do dispositivo. Por exemplo, algumas implementações tratam a remoção de um aplicativo da lista de aplicativos recentes como se o estivessem encerrando. Leia mais sobre essas diferenças aqui: [https://dontkillmyapp.com](https://dontkillmyapp.com/).

## Diferenças de Plataforma

### Android

No Android, a API [`WorkManager`](https://developer.android.com/topic/libraries/architecture/workmanager) permite especificar um intervalo mínimo para uma tarefa ser executada (mínimo de 15 minutos). A tarefa será executada algum tempo depois que o intervalo tiver passado, desde que as condições especificadas sejam atendidas.

### iOS

No iOS, a API [`BGTaskScheduler`](https://developer.apple.com/documentation/backgroundtasks/bgtaskscheduler) decide o melhor momento para iniciar sua tarefa em segundo plano. O sistema considerará o nível da bateria, a disponibilidade da rede e os padrões de uso do usuário para determinar quando executar a tarefa. Você ainda pode especificar um intervalo mínimo para a tarefa ser executada, mas o sistema pode optar por executar a tarefa em um momento posterior.

## Limitações Conhecidas

### iOS

A API [`Background Tasks`](https://developer.apple.com/documentation/backgroundtasks/) não está disponível em simuladores iOS. Ela só está disponível ao executar em um dispositivo físico.

## Instalação

Para instalar a API BackgroundTask, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-background-task
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração

### iOS

Para poder executar tarefas em segundo plano no iOS, você precisa adicionar o valor `processing` ao array `UIBackgroundModes` no arquivo `Info.plist` do seu aplicativo. Isso é necessário para que a busca em segundo plano funcione corretamente.

Se você estiver usando [CNG](https://docs.expo.dev/workflow/continuous-native-generation/), a configuração `UIBackgroundModes` necessária será aplicada automaticamente pelo prebuild.

#### Configurar `UIBackgroundModes` manualmente no iOS

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)), você precisará adicionar o seguinte ao seu arquivo `Info.plist`:

`ios/project-name/Supporting/Info.plist`

```xml
<key>UIBackgroundModes</key>
  <array>
    <string>processing</string>
  </array>
</key>
```

## Uso

Abaixo está um exemplo que demonstra como usar `expo-background-task`.

```javascript
import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const BACKGROUND_TASK_IDENTIFIER = 'background-task';

TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
  try {
    const now = Date.now();
    console.log(`Got background task call at date: ${new Date(now).toISOString()}`);
  } catch (error) {
    console.error('Failed to execute the background task:', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
  return BackgroundTask.BackgroundTaskResult.Success;
});

async function registerBackgroundTaskAsync() {
  return BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}

async function unregisterBackgroundTaskAsync() {
  return BackgroundTask.unregisterTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}

export default function BackgroundTaskScreen() {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [status, setStatus] = useState<BackgroundTask.BackgroundTaskStatus | null>(null);

  useEffect(() => {
    updateAsync();
  }, []);

  const updateAsync = async () => {
    const status = await BackgroundTask.getStatusAsync();
    setStatus(status);
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_IDENTIFIER);
    setIsRegistered(isRegistered);
  };

  const toggle = async () => {
    if (!isRegistered) {
      await registerBackgroundTaskAsync();
    } else {
      await unregisterBackgroundTaskAsync();
    }
    updateAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Status da Tarefa em Segundo Plano: {status}</Text>
      <Button
        title={isRegistered ? 'Desregistrar Tarefa' : 'Registrar Tarefa'}
        onPress={toggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});
```

## API

```javascript
import * as BackgroundTask from 'expo-background-task';
```

### Métodos

*   **`getStatusAsync()`**: Retorna uma `Promise` que se resolve com o status atual da tarefa em segundo plano.
*   **`registerTaskAsync(taskName, options)`**: Registra uma nova tarefa em segundo plano com o nome e opções fornecidos.
*   **`triggerTaskWorkerForTestingAsync(taskName)`**: Aciona o worker da tarefa para fins de teste. Disponível apenas em ambientes de desenvolvimento.
*   **`unregisterTaskAsync(taskName)`**: Desregistra uma tarefa em segundo plano com o nome fornecido.

### Tipos

*   **`BackgroundTaskOptions`**: Opções para configurar uma tarefa em segundo plano, como `minimumInterval`.

### Enums

*   **`BackgroundTaskResult`**: Enum que representa o resultado de uma execução de tarefa em segundo plano (`Success`, `Failed`, `NoData`).
*   **`BackgroundTaskStatus`**: Enum que representa o status de uma tarefa em segundo plano (`Available`, `Restricted`, `Denied`).

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025

