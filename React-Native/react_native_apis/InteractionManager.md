# InteractionManager

A API `InteractionManager` no React Native permite que você agende tarefas de longa duração para serem executadas após o término de quaisquer animações ou interações em andamento. Isso é crucial para garantir uma experiência de usuário fluida, pois evita que tarefas intensivas em CPU bloqueiem a UI thread e causem lentidão ou "engasgos" nas animações.

## Como Funciona

O React Native executa as animações e interações na UI thread para garantir a fluidez. Se você tiver tarefas JavaScript pesadas sendo executadas no JavaScript thread enquanto uma animação está acontecendo, essa tarefa pode atrasar a animação, resultando em uma experiência de usuário ruim.

`InteractionManager` resolve isso permitindo que você "agende" tarefas para serem executadas em um momento mais oportuno. Ele espera que todas as animações e interações ativas sejam concluídas antes de executar as tarefas agendadas.

## Métodos

### `runAfterInteractions(callback)`
Agenda uma função `callback` para ser executada após o término de todas as interações e animações em andamento. Retorna uma `Promise` que é resolvida quando o `callback` é executado.

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, InteractionManager, StyleSheet } from 'react-native';

const InteractionManagerExample = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simula uma animação ou interação inicial
    const timer = setTimeout(() => {
      console.log("Animação/Interação inicial concluída.");
      // Agenda a tarefa pesada para depois da interação
      InteractionManager.runAfterInteractions(() => {
        console.log("Iniciando tarefa pesada...");
        // Simula uma tarefa pesada, como buscar dados ou processar algo
        setTimeout(() => {
          setData("Dados carregados após interações!");
          setIsLoading(false);
          console.log("Tarefa pesada concluída.");
        }, 2000); // Simula 2 segundos de processamento
      });
    }, 1000); // Simula 1 segundo de animação/interação

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      ) : (
        <Text style={styles.dataText}>{data}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  dataText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default InteractionManagerExample;
```

### `createInteractionHandle()`
Cria um "handle" de interação. Isso permite que você informe ao `InteractionManager` que uma interação está em andamento e que as tarefas agendadas devem esperar até que essa interação seja concluída. Retorna um número que identifica o handle.

### `clearInteractionHandle(handle)`
Limpa um handle de interação, indicando que a interação associada a ele foi concluída. Quando todos os handles de interação são limpos, as tarefas agendadas por `runAfterInteractions` podem ser executadas.

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, Button, InteractionManager, StyleSheet } from 'react-native';

const CustomInteractionExample = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [status, setStatus] = useState("Aguardando interação...");
  const [interactionHandle, setInteractionHandle] = useState(null);

  const startCustomInteraction = () => {
    setStatus("Interação personalizada iniciada...");
    setIsInteracting(true);
    const handle = InteractionManager.createInteractionHandle();
    setInteractionHandle(handle);

    // Simula uma interação de longa duração
    setTimeout(() => {
      setStatus("Interação personalizada concluída.");
      InteractionManager.clearInteractionHandle(handle);
      setIsInteracting(false);
    }, 3000);
  };

  useEffect(() => {
    // Esta tarefa só será executada após a interação personalizada terminar
    InteractionManager.runAfterInteractions(() => {
      if (!isInteracting) {
        console.log("Tarefa agendada executada após todas as interações.");
        setStatus(prevStatus => prevStatus + "\nTarefa agendada executada!");
      }
    });
  }, [isInteracting]);

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{status}</Text>
      <Button
        title="Iniciar Interação Personalizada"
        onPress={startCustomInteraction}
        disabled={isInteracting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CustomInteractionExample;
```

## Considerações

-   **Fluidez da UI:** O principal benefício de `InteractionManager` é garantir que a interface do usuário permaneça responsiva e fluida, mesmo quando há tarefas JavaScript pesadas a serem executadas.
-   **Quando Usar:** Use `InteractionManager.runAfterInteractions` para:
    -   Carregar dados após a tela inicial ser renderizada e animada.
    -   Realizar cálculos complexos que não são críticos para a renderização inicial.
    -   Sincronizar dados em segundo plano.
-   **Evite Bloqueios:** Evite colocar lógica de negócios ou chamadas de API síncronas diretamente no ciclo de vida de renderização do componente se elas forem demoradas. Em vez disso, agende-as com `InteractionManager`.
-   **`createInteractionHandle` e `clearInteractionHandle`:** Essas funções são mais avançadas e úteis quando você tem interações personalizadas que o `InteractionManager` não detectaria automaticamente (por exemplo, uma animação complexa que você gerencia manualmente ou um processo de carregamento de dados que você quer que seja considerado uma "interação" para fins de agendamento).

