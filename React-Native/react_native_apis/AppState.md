# AppState

A API `AppState` no React Native informa sobre o estado atual do aplicativo, ou seja, se ele está em primeiro plano, em segundo plano ou inativo. Isso é crucial para gerenciar o comportamento do aplicativo com base em seu ciclo de vida, como pausar reproduções de mídia quando o aplicativo vai para o segundo plano ou atualizar dados quando ele retorna ao primeiro plano.

## Estados do Aplicativo

Os possíveis estados do aplicativo são:

- `active`: O aplicativo está em primeiro plano e interagindo com o usuário.
- `background`: O aplicativo está em segundo plano. Em iOS, isso significa que o aplicativo está em execução, mas não visível. Em Android, isso significa que o aplicativo pode estar em segundo plano ou a tela do dispositivo está bloqueada.
- `inactive`: (Apenas iOS) O aplicativo está em um estado de transição entre `active` e `background`, ou vice-versa. Isso pode acontecer, por exemplo, quando uma chamada telefônica chega ou o centro de controle é aberto.

## Métodos e Propriedades

### `currentState`
Uma propriedade estática que retorna o estado atual do aplicativo. É útil para obter o estado inicial do aplicativo.

```javascript
import { AppState } from 'react-native';

console.log('Estado inicial do aplicativo:', AppState.currentState);
```

### `addEventListener(type, handler)`
Adiciona um ouvinte para mudanças no estado do aplicativo. O `type` deve ser `change` e o `handler` é uma função que será chamada com o novo estado do aplicativo (`active`, `background` ou `inactive`).

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, AppState, StyleSheet } from 'react-native';

const AppStateMonitor = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App voltou para o primeiro plano!');
      }
      setAppState(nextAppState);
      console.log('AppState mudou para:', nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estado Atual do Aplicativo: {appState}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AppStateMonitor;
```

## Considerações

- **Gerenciamento de Recursos:** Use `AppState` para otimizar o uso de recursos. Por exemplo, você pode pausar animações, parar de ouvir eventos de GPS ou desconectar de serviços de rede quando o aplicativo está em segundo plano para economizar bateria e dados.
- **Sincronização de Dados:** Quando o aplicativo retorna ao estado `active`, pode ser um bom momento para sincronizar dados com um servidor ou atualizar a interface do usuário.
- **Notificações:** Em alguns casos, você pode querer exibir notificações locais quando o aplicativo entra em segundo plano para lembrar o usuário de algo importante.
- **Testes:** Teste o comportamento do seu aplicativo em diferentes estados (primeiro plano, segundo plano, bloqueio de tela) para garantir que ele se comporte conforme o esperado e que não haja vazamentos de memória ou consumo excessivo de bateria.

