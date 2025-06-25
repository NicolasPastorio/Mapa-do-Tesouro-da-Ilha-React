# RootTag

`RootTag` no React Native é um identificador numérico que representa a view nativa onde um aplicativo React Native é montado. Em cenários típicos de um único aplicativo React Native, você raramente interage diretamente com `RootTag`. No entanto, ele se torna relevante em arquiteturas mais complexas, como quando você está incorporando múltiplos aplicativos React Native em um único aplicativo nativo existente (multi-root apps).

## Conceito

Quando um aplicativo React Native é inicializado, ele precisa de um "contêiner" nativo para renderizar sua interface de usuário. Este contêiner é uma `UIView` no iOS ou um `ViewGroup` no Android. Cada instância de um aplicativo React Native (ou de uma parte dele) que é montada em uma view nativa recebe um `RootTag` único.

## Uso (Cenários Avançados)

Você geralmente não precisará usar `RootTag` em um aplicativo React Native padrão, pois o `AppRegistry` e o processo de inicialização cuidam disso automaticamente. No entanto, em cenários de integração com aplicativos nativos existentes, onde você pode ter várias instâncias de React Native rodando lado a lado, `RootTag` pode ser usado para:

- **Identificar instâncias:** Distinguir entre diferentes montagens de React Native.
- **Comunicação:** Em alguns casos, APIs nativas ou módulos nativos podem precisar de um `RootTag` para direcionar eventos ou dados para a instância correta do React Native.
- **Gerenciamento de Ciclo de Vida:** Gerenciar o ciclo de vida de componentes React Native específicos que estão incorporados em views nativas.

## Exemplo (Conceitual)

Embora não haja uma API JavaScript direta e comum para obter o `RootTag` de um componente React Native arbitrário (ele é mais um conceito de nível nativo/ponte), você pode encontrá-lo em cenários como a API `AccessibilityInfo.setAccessibilityFocus` que aceita um `reactTag` (que é o `RootTag` da view nativa do componente).

Considere um cenário onde você tem um aplicativo nativo e decide adicionar uma tela React Native. No lado nativo, você inicializaria o React Native e obteria um `RootTag` para essa instância. Se você adicionasse outra tela React Native, ela teria um `RootTag` diferente.

```javascript
// Este é um exemplo conceitual de como um RootTag poderia ser usado em um módulo nativo
// Não é um código React Native JavaScript diretamente executável para obter o RootTag de um componente

// Suponha que você tenha um módulo nativo que precisa do RootTag
// para interagir com uma instância específica do React Native.

// Em Objective-C/Swift (iOS):
// RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
//                                                   moduleName:@"MyReactNativeModule"
//                                            initialProperties:nil];
// NSNumber *rootTag = rootView.reactTag; // Este é o RootTag

// Em Java/Kotlin (Android):
// ReactRootView rootView = new ReactRootView(context);
// rootView.startReactApplication(reactInstanceManager, "MyReactNativeModule", null);
// int rootTag = rootView.getRootViewTag(); // Este é o RootTag

// No JavaScript, você pode passar o rootTag para um módulo nativo se necessário
// import { NativeModules } from 'react-native';
// NativeModules.MyNativeModule.doSomethingWithRootTag(someRootTag);

// Ou, como visto em AccessibilityInfo.setAccessibilityFocus:
import React, { useRef } from 'react';
import { View, Button, Text, AccessibilityInfo, findNodeHandle } from 'react-native';

const FocusExample = () => {
  const textRef = useRef(null);

  const handlePress = () => {
    if (textRef.current) {
      // findNodeHandle retorna o "reactTag" (que é o RootTag da view nativa)
      const reactTag = findNodeHandle(textRef.current);
      if (reactTag) {
        console.log("RootTag do componente de texto:", reactTag);
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  };

  return (
    <View>
      <Button title="Focar no Texto" onPress={handlePress} />
      <Text ref={textRef} accessible={true} accessibilityLabel="Este é o texto focado">
        Este é um texto importante.
      </Text>
    </View>
  );
};

export default FocusExample;
```

## Considerações

- **Abstração:** Para a maioria dos desenvolvedores React Native, o conceito de `RootTag` é uma abstração interna que raramente precisa ser acessada diretamente.
- **Integração Nativa:** Sua relevância aumenta significativamente quando se trabalha com a integração de React Native em aplicativos nativos existentes, onde o controle sobre as views nativas e suas montagens é mais granular.
- **`findNodeHandle`:** A função `findNodeHandle` (importada de `react-native`) é a maneira mais comum de obter o `reactTag` de um componente React Native a partir do JavaScript, que pode então ser passado para APIs nativas ou módulos nativos que esperam esse identificador.

