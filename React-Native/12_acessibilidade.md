## Seção 6: Acessibilidade (a11y) em React Native

Acessibilidade (frequentemente abreviada como a11y, onde "11" representa o número de letras entre "a" e "y" em "accessibility") em desenvolvimento de software refere-se à prática de criar produtos que possam ser usados pelo maior número possível de pessoas, independentemente de suas habilidades ou deficiências. Em React Native, isso significa construir aplicativos que sejam utilizáveis por pessoas com deficiências visuais (baixa visão, cegueira), auditivas, motoras, cognitivas, entre outras.

Incorporar acessibilidade não é apenas uma boa prática ou uma exigência legal em muitas jurisdições, mas também uma forma de alcançar um público mais amplo e criar uma experiência de usuário mais inclusiva e equitativa. React Native fornece um conjunto de APIs e ferramentas para ajudar os desenvolvedores a construir aplicativos acessíveis.

### Princípios Fundamentais da Acessibilidade (WCAG)

As Diretrizes de Acessibilidade para Conteúdo Web (WCAG - Web Content Accessibility Guidelines) são o padrão internacional para acessibilidade na web e em aplicativos móveis. Os quatro princípios fundamentais do WCAG (conhecidos pelo acrônimo POUR) são um bom guia:

1.  **Perceptível:** As informações e os componentes da interface do usuário devem ser apresentáveis aos usuários de formas que eles possam perceber. Isso significa fornecer alternativas para conteúdo não textual (como texto alternativo para imagens), garantir contraste de cores suficiente, e permitir que o conteúdo seja apresentado de diferentes maneiras (ex: layout simplificado) sem perder informação ou estrutura.
2.  **Operável:** Os componentes da interface do usuário e a navegação devem ser operáveis. Isso inclui tornar toda a funcionalidade disponível a partir de um teclado (ou equivalente), dar aos usuários tempo suficiente para ler e usar o conteúdo, não projetar conteúdo de uma forma que seja conhecida por causar convulsões (como flashes rápidos), e fornecer maneiras de ajudar os usuários a navegar, encontrar conteúdo e determinar onde estão.
3.  **Compreensível:** As informações e a operação da interface do usuário devem ser compreensíveis. Isso significa tornar o texto legível e compreensível, fazer as páginas aparecerem e operarem de maneiras previsíveis, e ajudar os usuários a evitar e corrigir erros.
4.  **Robusto:** O conteúdo deve ser robusto o suficiente para que possa ser interpretado de forma confiável por uma ampla variedade de agentes de usuário, incluindo tecnologias assistivas. Isso significa maximizar a compatibilidade com as tecnologias assistivas atuais e futuras.

### Props de Acessibilidade em React Native

React Native expõe várias props que mapeiam para as APIs de acessibilidade nativas do Android e iOS. Estas são as principais:

1.  **`accessible` (booleano):**
    *   Quando `true`, indica que o elemento é um elemento de acessibilidade. Por padrão, a maioria dos componentes interativos básicos como `Button`, `TextInput`, `Switch`, e `TouchableOpacity` com um filho `Text` são acessíveis. Componentes como `View` e `Text` não são acessíveis por padrão, a menos que tenham um manipulador de eventos (como `onPress`) ou props de acessibilidade específicas definidas.
    *   Elementos acessíveis agrupam seus filhos em uma única unidade selecionável para tecnologias assistivas (como leitores de tela).
    *   **Uso:** `accessible={true}`
    *   **Quando usar:** Use em elementos que representam um único item interativo ou informativo para um leitor de tela. Por exemplo, um `TouchableOpacity` contendo um ícone e um texto que juntos formam um botão deve ter `accessible={true}` no `TouchableOpacity`.

2.  **`accessibilityLabel` (string):**
    *   Fornece uma etiqueta de texto curta e descritiva para o elemento. Esta é a string que os leitores de tela anunciarão quando o elemento estiver em foco.
    *   Se não for fornecida, o leitor de tela pode tentar inferir a etiqueta a partir do conteúdo textual do elemento, o que nem sempre é ideal (especialmente para ícones ou botões gráficos).
    *   **Uso:** `accessibilityLabel="Adicionar item ao carrinho"`
    *   **Quando usar:** Essencial para botões com apenas ícones, imagens que transmitem informação, ou quando o texto visível não é suficientemente descritivo por si só.

3.  **`accessibilityHint` (string):**
    *   Fornece uma breve descrição da ação que ocorrerá quando o usuário interagir com o elemento. É anunciado após o `accessibilityLabel`.
    *   **Uso:** `accessibilityHint="Toque duas vezes para ativar"` (para um botão) ou `accessibilityHint="Deslize para cima ou para baixo com um dedo para ajustar o valor"` (para um slider).
    *   **Quando usar:** Útil para elementos interativos onde a ação não é óbvia apenas pela etiqueta.

4.  **`accessibilityRole` (string):**
    *   Comunica o propósito de um componente para o usuário de tecnologia assistiva. Mapeia para papéis nativos (traits no iOS, class names no Android).
    *   Valores comuns incluem: `"none"`, `"button"`, `"link"`, `"search"`, `"image"`, `"keyboardkey"`, `"text"`, `"adjustable"` (para sliders, pickers), `"header"` (para títulos de seção), `"summary"`, `"alert"`, `"checkbox"`, `"combobox"`, `"menu"`, `"menubar"`, `"menuitem"`, `"progressbar"`, `"radio"`, `"radiogroup"`, `"scrollbar"`, `"spinbutton"`, `"switch"`, `"tab"`, `"tablist"`, `"timer"`, `"toolbar"`.
    *   **Uso:** `accessibilityRole="button"`
    *   **Quando usar:** Use para dar semântica aos seus componentes customizados ou para clarificar o papel de elementos padrão. Por exemplo, um `TouchableOpacity` estilizado para parecer um botão deve ter `accessibilityRole="button"`.

5.  **`accessibilityState` (objeto):**
    *   Descreve o estado atual de um componente para o usuário de tecnologia assistiva.
    *   O objeto pode conter as seguintes chaves (booleanas):
        *   `disabled`: Indica se o elemento está desabilitado.
        *   `selected`: Indica se o elemento está selecionado (ex: uma aba em um conjunto de abas).
        *   `checked`: Indica o estado de um elemento que pode ser marcado (ex: checkbox, radio button). Pode ser `true`, `false`, ou `"mixed"` (para checkboxes tri-state).
        *   `busy`: Indica se o elemento está ocupado carregando conteúdo.
        *   `expanded`: Indica se um elemento expansível (como um acordeão) está atualmente expandido ou recolhido.
    *   **Uso:** `accessibilityState={{ selected: true, disabled: false }}`
    *   **Quando usar:** Para componentes interativos cujo estado muda (ex: botões habilitados/desabilitados, abas selecionadas, checkboxes marcados/desmarcados).

6.  **`accessibilityValue` (objeto):**
    *   Descreve o valor atual de um componente que pode ser ajustado (como um slider ou um campo de texto com valor numérico).
    *   O objeto pode conter:
        *   `min` (number): O valor mínimo.
        *   `max` (number): O valor máximo.
        *   `now` (number): O valor atual.
        *   `text` (string): Uma representação textual do valor atual (útil se `now` não for suficientemente descritivo).
    *   **Uso:** `accessibilityValue={{ min: 0, max: 100, now: 50, text: "50 por cento" }}` (para um slider)
    *   **Quando usar:** Para componentes como sliders, steppers, ou qualquer controle que represente um valor dentro de um intervalo.

7.  **`accessibilityActions` (array de objetos) e `onAccessibilityAction` (função):**
    *   Permite que tecnologias assistivas invoquem ações em um componente além da ação padrão (geralmente "ativar").
    *   Cada objeto em `accessibilityActions` deve ter `name` (string, nome da ação) e `label` (string, opcional, etiqueta para a ação).
    *   `onAccessibilityAction` é uma função callback que é chamada quando uma dessas ações customizadas é invocada. O evento passado para o callback inclui `nativeEvent.actionName`.
    *   Ações padrão que podem ser relevantes:
        *   `"increment"` e `"decrement"`: Para componentes ajustáveis.
        *   `"magicTap"` (iOS): Ação primária, geralmente tocar duas vezes.
        *   `"escape"` (iOS): Para fechar modais ou popovers.
    *   **Uso:**
      ```javascript
      <View
        accessible={true}
        accessibilityRole="adjustable"
        accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
        onAccessibilityAction={(event) => {
          switch (event.nativeEvent.actionName) {
            case "increment":
              // Lógica para incrementar valor
              break;
            case "decrement":
              // Lógica para decrementar valor
              break;
          }
        }}
        accessibilityValue={{ min: 0, max: 10, now: valorAtual }}
      />
      ```
    *   **Quando usar:** Para componentes com múltiplas ações ou comportamentos ajustáveis (como sliders, steppers, itens de lista com ações contextuais).

8.  **`accessibilityLabelledBy` (string ou array de strings - Android API 21+):**
    *   Permite que um elemento seja rotulado por outro elemento na tela, usando o `nativeID` do elemento de rotulagem.
    *   **Uso:** `nativeID="meuLabelDeInput"` no `<Text>`, e `accessibilityLabelledBy="meuLabelDeInput"` no `<TextInput>`.

9.  **`accessibilityLiveRegion` (string - Android):**
    *   Usado para informar tecnologias assistivas sobre mudanças dinâmicas no conteúdo (ex: alertas, notificações que aparecem na tela).
    *   Valores: `"none"`, `"polite"` (anuncia quando o usuário está ocioso), `"assertive"` (interrompe o usuário para anunciar imediatamente).
    *   **Uso:** `<Text accessibilityLiveRegion="polite">{mensagemDeStatus}</Text>`

10. **`importantForAccessibility` (string - Android):**
    *   Controla se uma view dispara eventos de acessibilidade e se é reportada para serviços de acessibilidade.
    *   Valores: `"auto"` (padrão), `"yes"`, `"no"`, `"no-hide-descendants"` (a view e seus filhos são invisíveis para acessibilidade).
    *   **Uso:** Útil para esconder elementos decorativos ou conteúdo redundante de leitores de tela.

### Testando a Acessibilidade

Testar a acessibilidade é crucial. Não confie apenas na configuração das props; teste com tecnologias assistivas reais.

1.  **Leitores de Tela:**
    *   **iOS (VoiceOver):** Vá em Ajustes > Acessibilidade > VoiceOver. Aprenda os gestos básicos.
    *   **Android (TalkBack):** Vá em Configurações > Acessibilidade > TalkBack (o caminho pode variar um pouco dependendo do fabricante). Aprenda os gestos básicos.
    *   **O que testar:**
        *   Todos os elementos interativos são focáveis e têm etiquetas claras (`accessibilityLabel`)?
        *   As dicas (`accessibilityHint`) são úteis?
        *   Os papéis (`accessibilityRole`) e estados (`accessibilityState`) são anunciados corretamente?
        *   A ordem de foco é lógica e segue a ordem visual?
        *   Conteúdo dinâmico é anunciado (`accessibilityLiveRegion`)?
        *   Não há "armadilhas de foco" onde o usuário não consegue sair de um controle?

2.  **Navegação por Teclado (se aplicável, especialmente para Android com teclado físico ou em emuladores):**
    *   Todos os elementos interativos são alcançáveis e operáveis usando apenas o teclado?

3.  **Ajustes de Tamanho de Fonte:**
    *   Seu aplicativo se adapta bem quando o usuário aumenta o tamanho da fonte nas configurações do sistema? O texto permanece legível e os layouts não quebram severamente?

4.  **Contraste de Cores:**
    *   Use ferramentas para verificar se o contraste entre o texto e o fundo atende aos mínimos do WCAG (geralmente 4.5:1 para texto normal e 3:1 para texto grande).
    *   Ferramentas online: WebAIM Contrast Checker, Adobe Color Contrast Analyzer.
    *   No macOS, o Digital Colour Meter pode ajudar a pegar cores da tela.

5.  **Modo de Alto Contraste / Inversão de Cores:**
    *   Verifique como seu aplicativo se parece e funciona com esses modos ativados nas configurações de acessibilidade do dispositivo.

6.  **Ferramentas de Linting e Análise Estática:**
    *   `eslint-plugin-jsx-a11y` (originalmente para web, mas alguns princípios e regras podem ser adaptados ou inspirar verificações manuais para React Native).
    *   Algumas ferramentas de teste E2E como Detox ou Appium podem ter integrações ou permitir scripts para verificar certas propriedades de acessibilidade.

7.  **Accessibility Inspector (macOS para iOS Simulator, Ferramentas de Desenvolvedor Android):**
    *   **iOS Simulator (macOS):** Abra o Accessibility Inspector (Xcode > Open Developer Tool > Accessibility Inspector). Ele permite inspecionar as propriedades de acessibilidade dos elementos na tela do simulador, simular VoiceOver, e verificar problemas de contraste.
    *   **Android Studio:** Layout Inspector e outras ferramentas de depuração podem fornecer algumas informações sobre acessibilidade.

### Suporte a Leitores de Tela e Navegação por Teclado

*   **Ordem de Foco Lógica:** Geralmente, a ordem de foco segue a ordem dos elementos no código. Se você precisar ajustar a ordem de foco (raro, e deve ser feito com cuidado), pode ser necessário reestruturar seu código ou, em casos extremos e com muita cautela, usar técnicas nativas (o que é complexo).
*   **Agrupamento de Conteúdo:** Use `accessible={true}` em um `View` pai para agrupar elementos relacionados em uma única parada de foco para leitores de tela. Por exemplo, um item de lista complexo pode ser agrupado.
*   **Gerenciamento de Foco:** Para modais ou pop-ups, é importante que o foco do leitor de tela seja movido para o novo conteúdo e, ao fechar, retorne para onde estava. Bibliotecas de modais geralmente lidam com isso. Para implementações customizadas, pode ser necessário usar `AccessibilityInfo.setAccessibilityFocus` (requer `findNodeHandle`).
    ```javascript
    import { findNodeHandle, AccessibilityInfo } from "react-native";
    // ...
    const meuInputRef = useRef(null);
    // Para focar:
    if (meuInputRef.current) {
      const reactTag = findNodeHandle(meuInputRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
    ```
*   **Anunciar Mudanças Dinâmicas:** Use `AccessibilityInfo.announceForAccessibility("Sua mensagem aqui")` para fazer o leitor de tela anunciar algo que não está diretamente focado, como uma notificação ou resultado de uma ação.

### Melhores Práticas Adicionais

*   **Design Inclusivo Desde o Início:** Pense em acessibilidade durante a fase de design, não como uma reflexão tardia.
*   **Simplicidade:** Interfaces claras e simples são geralmente mais acessíveis.
*   **Consistência:** Mantenha a navegação e os elementos interativos consistentes em todo o aplicativo.
*   **Áreas de Toque Adequadas:** Garanta que os botões e outros controles tenham áreas de toque grandes o suficiente (pelo menos 44x44 pixels é uma boa diretriz).
*   **Não Confie Apenas na Cor:** Não use a cor como única forma de transmitir informação (ex: para indicar um erro). Use também texto, ícones ou outros indicadores visuais.
*   **Permitir que os Usuários Controlem Conteúdo em Movimento:** Se você tiver animações ou vídeos, forneça controles para pausar ou parar.
*   **Feedback Claro:** Forneça feedback claro para todas as interações do usuário.
*   **Documentação e Treinamento:** Eduque sua equipe sobre as melhores práticas de acessibilidade.

Construir aplicativos React Native acessíveis requer atenção aos detalhes e testes contínuos, mas resulta em produtos melhores e mais inclusivos para todos os usuários.

