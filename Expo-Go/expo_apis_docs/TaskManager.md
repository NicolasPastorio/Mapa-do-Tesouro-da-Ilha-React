# Gerenciador de Tarefas (TaskManager)

Uma biblioteca que fornece suporte para tarefas que podem ser executadas em segundo plano.

`expo-task-manager` fornece uma API que permite gerenciar tarefas de longa duração, em particular aquelas tarefas que podem ser executadas enquanto seu aplicativo está em segundo plano. Alguns recursos desta biblioteca são usados por outras bibliotecas sob o capô. Aqui está uma lista de bibliotecas do Expo SDK que usam `TaskManager`:

*   [Localização](https://docs.expo.dev/versions/latest/sdk/location/)
*   [Tarefa em Segundo Plano](https://docs.expo.dev/versions/latest/sdk/background-task/)
*   [Busca em Segundo Plano](https://docs.expo.dev/versions/latest/sdk/background-fetch/)
*   [Notificações](https://docs.expo.dev/versions/latest/sdk/notifications/)

## Instalação

Para instalar a API TaskManager, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-task-manager
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

> Você pode testar o `TaskManager` no aplicativo Expo Go. No entanto, verifique a documentação de cada [biblioteca](https://docs.expo.dev/versions/latest/sdk/task-manager/#libraries-using-expo-taskmanager) que usa `TaskManager` para confirmar se ela suporta testes no Expo Go.

## API

```javascript
import * as TaskManager from 'expo-task-manager';
```

## Métodos

### `TaskManager.defineTask(taskName, task)`

Define uma tarefa em segundo plano. A tarefa será executada quando o sistema operacional acionar o `taskName`.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `taskName` | `string` | O nome da tarefa a ser definida. |
| `task` | `function` | A função a ser executada quando a tarefa for acionada. |

```javascript
import * as TaskManager from 'expo-task-manager';

const TASK_NAME = 'MY_BACKGROUND_TASK';

TaskManager.defineTask(TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("Erro na tarefa em segundo plano:", error);
    return;
  }
  if (data) {
    console.log("Dados da tarefa em segundo plano:", data);
    // Faça algo com os dados
  }
});

// Para registrar a tarefa (geralmente em um useEffect ou componentDidMount):
// TaskManager.isTaskRegisteredAsync(TASK_NAME).then(async (isRegistered) => {
//   if (!isRegistered) {
//     await TaskManager.registerTaskAsync(TASK_NAME, { /* options */ });
//   }
// });
```

### `TaskManager.getRegisteredTasksAsync()`

Retorna uma lista de todas as tarefas registradas.

```javascript
import * as TaskManager from 'expo-task-manager';

async function getRegisteredTasks() {
  const tasks = await TaskManager.getRegisteredTasksAsync();
  console.log("Tarefas registradas:", tasks);
}

getRegisteredTasks();
```

### `TaskManager.getTaskOptionsAsync(taskName)`

Retorna as opções de uma tarefa registrada.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `taskName` | `string` | O nome da tarefa. |

```javascript
import * as TaskManager from 'expo-task-manager';

async function getTaskOptions(taskName) {
  const options = await TaskManager.getTaskOptionsAsync(taskName);
  console.log(`Opções para ${taskName}:`, options);
}

// getTaskOptions("MY_BACKGROUND_TASK");
```

### `TaskManager.isTaskDefined(taskName)`

Verifica se uma tarefa com o `taskName` fornecido foi definida.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `taskName` | `string` | O nome da tarefa. |

```javascript
import * as TaskManager from 'expo-task-manager';

const isDefined = TaskManager.isTaskDefined("MY_BACKGROUND_TASK");
console.log("Tarefa definida:", isDefined);
```

### `TaskManager.isTaskRegisteredAsync(taskName)`

Verifica se uma tarefa com o `taskName` fornecido está registrada.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `taskName` | `string` | O nome da tarefa. |

```javascript
import * as TaskManager from 'expo-task-manager';

async function checkTaskRegistered(taskName) {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(taskName);
  console.log(`Tarefa ${taskName} registrada:`, isRegistered);
}

// checkTaskRegistered("MY_BACKGROUND_TASK");
```

### `TaskManager.unregisterAllTasksAsync()`

Cancela o registro de todas as tarefas em segundo plano.

```javascript
import * as TaskManager from 'expo-task-manager';

async function unregisterAllTasks() {
  await TaskManager.unregisterAllTasksAsync();
  console.log("Todas as tarefas em segundo plano foram canceladas.");
}

// unregisterAllTasks();
```

### `TaskManager.unregisterTaskAsync(taskName)`

Cancela o registro de uma tarefa em segundo plano.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `taskName` | `string` | O nome da tarefa a ser cancelada. |

```javascript
import * as TaskManager from 'expo-task-manager';

async function unregisterTask(taskName) {
  await TaskManager.unregisterTaskAsync(taskName);
  console.log(`Tarefa ${taskName} cancelada.`);
}

// unregisterTask("MY_BACKGROUND_TASK");
```

## Interfaces

### `TaskManager.TaskManagerError`

### `TaskManager.TaskManagerTask`

### `TaskManager.TaskManagerTaskBody`

### `TaskManager.TaskManagerTaskBodyExecute`

---

**Autor:** Manus AI
**Data de Geração:** 21 de Junho de 2025

