# Systrace

A API `Systrace` no React Native é uma ferramenta de depuração que permite rastrear o desempenho do seu aplicativo em nível de sistema. Ela integra-se com ferramentas de rastreamento de desempenho nativas (como o `Perfetto` no Android e o `Instruments` no iOS), permitindo que você visualize o fluxo de execução do seu código JavaScript e nativo em uma linha do tempo unificada. Isso é inestimável para identificar gargalos de desempenho, frames perdidos e outros problemas de lentidão.

## Principais Funções

### `beginEvent(name)` e `endEvent()`
Usados para marcar o início e o fim de um evento de rastreamento. `beginEvent` inicia um novo evento com o `name` fornecido. `endEvent` finaliza o evento mais recentemente iniciado. É crucial que cada `beginEvent` tenha um `endEvent` correspondente para evitar problemas no rastreamento.

```javascript
import { Systrace } from 'react-native';

const performHeavyOperation = () => {
  Systrace.beginEvent("Heavy JavaScript Operation");
  // Simula uma operação pesada
  let sum = 0;
  for (let i = 0; i < 100000000; i++) {
    sum += i;
  }
  console.log("Soma calculada:", sum);
  Systrace.endEvent();
};

// Chame a função para ver o rastreamento
// performHeavyOperation();
```

### `beginAsyncEvent(name)` e `endAsyncEvent(name)`
Usados para rastrear eventos assíncronos que podem não ter um início e fim imediatos ou que podem se estender por várias chamadas de função. `beginAsyncEvent` inicia um evento assíncrono com o `name` fornecido. `endAsyncEvent` finaliza um evento assíncrono com o mesmo `name`. Você pode ter múltiplos eventos assíncronos com o mesmo nome rodando simultaneamente.

```javascript
import { Systrace } from 'react-native';

const fetchData = async () => {
  Systrace.beginAsyncEvent("Fetching Data from API");
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const json = await response.json();
    console.log("Dados recebidos:", json);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  } finally {
    Systrace.endAsyncEvent("Fetching Data from API");
  }
};

// Chame a função para ver o rastreamento assíncrono
// fetchData();
```

### `counterEvent(name, value)`
Usado para rastrear valores numéricos que mudam ao longo do tempo, como contadores de memória, contagem de objetos, etc. `name` é o nome do contador e `value` é o valor atual.

```javascript
import { Systrace } from 'react-native';

let counter = 0;
const updateCounter = () => {
  counter++;
  Systrace.counterEvent("My Custom Counter", counter);
  console.log("Contador:", counter);
};

// Chame a função periodicamente para rastrear o contador
// setInterval(updateCounter, 1000);
```

### `installReactHook()`
Instala um hook para rastrear o ciclo de vida dos componentes React. Isso permite que você veja quando os componentes são montados, atualizados e desmontados nas ferramentas de rastreamento.

```javascript
// Geralmente chamado uma vez no início do aplicativo, por exemplo, em App.js ou index.js
import { Systrace } from 'react-native';

if (__DEV__) { // Apenas em modo de desenvolvimento
  Systrace.installReactHook();
}
```

## Como Usar o Systrace

1.  **Habilitar o Systrace:** No seu código JavaScript, importe `Systrace` e use as funções `beginEvent`, `endEvent`, etc., para instrumentar as partes do seu código que você deseja rastrear.
2.  **Ferramentas Nativas:**
    *   **Android:** Use o `Perfetto` (ferramenta de rastreamento do Android Studio) ou o `Android Device Monitor` (legado) para capturar os rastreamentos. Você pode iniciar uma gravação de rastreamento e, em seguida, interagir com seu aplicativo. O `Systrace` do React Native enviará os dados para essas ferramentas.
    *   **iOS:** Use o `Instruments` (disponível no Xcode) com o modelo "Time Profiler" ou "System Trace".
3.  **Analisar os Dados:** As ferramentas de rastreamento exibirão uma linha do tempo visual dos eventos, permitindo que você identifique onde o tempo está sendo gasto e quais operações estão causando lentidão.

## Considerações

-   **Apenas para Desenvolvimento:** O `Systrace` é uma ferramenta de depuração e não deve ser usado em builds de produção, pois pode introduzir overhead de desempenho e expor detalhes internos do seu aplicativo.
-   **Granularidade:** Seja seletivo ao usar `Systrace`. Rastrear cada pequena operação pode gerar muitos dados e dificultar a análise. Concentre-se em áreas conhecidas por serem intensivas em CPU ou que exibem problemas de desempenho.
-   **Contexto:** Os eventos do `Systrace` fornecem contexto sobre o que está acontecendo no seu aplicativo. Combine-os com outras métricas de desempenho para obter uma visão completa.
-   **`__DEV__`:** É uma boa prática envolver as chamadas `Systrace` em um bloco `if (__DEV__)` para garantir que elas sejam removidas em builds de produção.

