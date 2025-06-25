# Alert

A API `Alert` no React Native fornece uma maneira simples de exibir caixas de diálogo de alerta nativas para o usuário. É comumente usada para exibir mensagens importantes, solicitar confirmação ou informar sobre erros, sem interromper o fluxo do aplicativo de forma intrusiva como um modal em tela cheia.

## Métodos

### `alert(title, message?, buttons?, options?)`
Exibe uma caixa de diálogo de alerta com um título, uma mensagem opcional e um conjunto de botões. A aparência e o comportamento exatos do alerta podem variar ligeiramente entre iOS e Android, mas a funcionalidade principal é a mesma.

-   `title`: (String) O título do alerta.
-   `message`: (String, opcional) A mensagem principal do alerta.
-   `buttons`: (Array de objetos, opcional) Um array de objetos de botão. Cada objeto de botão pode ter as seguintes propriedades:
    -   `text`: (String) O texto exibido no botão.
    -   `onPress`: (Função, opcional) Uma função de callback que é chamada quando o botão é pressionado.
    -   `style`: (String, opcional) O estilo do botão. Pode ser `default`, `cancel` ou `destructive`. O estilo `cancel` coloca o botão de cancelamento em uma posição especial (geralmente à esquerda ou na parte inferior, dependendo da plataforma) e o estilo `destructive` geralmente exibe o texto do botão em vermelho.
-   `options`: (Objeto, opcional) Um objeto de opções adicionais. As propriedades comuns incluem:
    -   `cancelable`: (Booleano, Android apenas) Se `true`, o alerta pode ser descartado tocando fora dele ou pressionando o botão de voltar. Padrão é `true`.
    -   `onDismiss`: (Função, Android apenas) Um callback que é chamado quando o alerta é descartado sem que nenhum botão seja pressionado.

## Exemplos de Uso

### Alerta Simples

```javascript
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const SimpleAlertExample = () => {
  const showAlert = () => {
    Alert.alert(
      "Título do Alerta",
      "Esta é uma mensagem simples de alerta."
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Mostrar Alerta Simples" onPress={showAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SimpleAlertExample;
```

### Alerta com Botões de Ação

```javascript
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const ActionAlertExample = () => {
  const showActionAlert = () => {
    Alert.alert(
      "Confirmar Ação",
      "Você tem certeza que deseja continuar?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Ação cancelada"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => console.log("Ação confirmada"),
        },
      ],
      { cancelable: false } // No Android, impede que o alerta seja descartado tocando fora
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Mostrar Alerta com Ações" onPress={showActionAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionAlertExample;
```

### Alerta com Botão Destrutivo

```javascript
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const DestructiveAlertExample = () => {
  const showDestructiveAlert = () => {
    Alert.alert(
      "Excluir Item",
      "Esta ação não pode ser desfeita. Deseja realmente excluir?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Exclusão cancelada"),
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => console.log("Item excluído!"),
          style: "destructive", // Botão com estilo destrutivo (geralmente vermelho)
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Mostrar Alerta Destrutivo" onPress={showDestructiveAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DestructiveAlertExample;
```

## Considerações

-   **Nativo:** Os alertas exibidos pela API `Alert` são componentes nativos do sistema operacional, o que garante que eles se integrem perfeitamente com a UI do dispositivo e ofereçam uma experiência consistente ao usuário.
-   **Bloqueio:** O `Alert` é um componente que bloqueia a interação do usuário com o restante do aplicativo até que uma ação seja tomada (um botão seja pressionado ou o alerta seja descartado).
-   **Uso Moderado:** Use alertas com moderação. O uso excessivo pode ser irritante para o usuário e prejudicar a experiência. Para feedback não crítico ou mensagens informativas que não exigem uma ação imediata, considere usar toasts, snackbars ou outros componentes de notificação.
-   **Ordem dos Botões:** A ordem dos botões no array `buttons` pode influenciar a ordem de exibição na tela, mas o React Native e o sistema operacional podem ter suas próprias convenções. Por exemplo, o botão com `style: 'cancel'` geralmente é posicionado de forma proeminente para cancelamento.
-   **`cancelable` e `onDismiss` (Android):** Essas opções são específicas do Android e permitem controlar o comportamento de descarte do alerta. No iOS, os alertas geralmente não são descartáveis sem uma ação do usuário, a menos que um botão de cancelamento seja fornecido.

