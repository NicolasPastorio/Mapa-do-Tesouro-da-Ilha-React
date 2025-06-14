

### Gerenciamento de Estado de Navegação Complexo

À medida que os aplicativos crescem, o estado da navegação pode se tornar complexo. React Navigation armazena seu estado internamente, mas há cenários onde você pode precisar acessar, modificar ou persistir esse estado de forma mais granular.

**1. Acessando o Estado de Navegação:**

   *   **`navigation.getState()`:** Dentro de um componente de tela, você pode chamar `navigation.getState()` para obter o objeto de estado de navegação atual do navegador pai mais próximo. Este objeto contém informações sobre as rotas, seus parâmetros e o histórico de navegação.
   *   **`useNavigationState(selector)`:** Um hook que permite selecionar partes do estado de navegação. Ele re-renderizará seu componente apenas se a parte selecionada do estado mudar.
      ```javascript
      import { useNavigationState } from "@react-navigation/native";

      const IndiceDaRotaAtual = () => {
        const index = useNavigationState(state => state.index);
        const totalRotas = useNavigationState(state => state.routes.length);
        return <Text>Tela {index + 1} de {totalRotas}</Text>;
      };
      ```
   *   **Ref no `NavigationContainer`:** Você pode anexar uma `ref` ao `NavigationContainer` para obter acesso ao objeto de navegação raiz e seu estado de qualquer lugar (útil para serviços ou código fora dos componentes React).
      ```javascript
      // App.js
      import { navigationRef, isReadyRef } from './RootNavigation'; // Seu arquivo de helper

      // <NavigationContainer ref={navigationRef} onReady={() => { isReadyRef.current = true; }}>
      // ...
      // </NavigationContainer>

      // RootNavigation.js (exemplo de helper)
      import { createNavigationContainerRef } from '@react-navigation/native';
      export const navigationRef = createNavigationContainerRef();
      export const isReadyRef = React.createRef(); // Para saber quando a navegação está pronta

      export function navigate(name, params) {
        if (isReadyRef.current && navigationRef.current) {
          navigationRef.current.navigate(name, params);
        }
      }
      // ... outras ações de navegação
      ```

**2. Persistindo e Restaurando o Estado de Navegação:**

   React Navigation pode persistir o estado de navegação (ex: no `AsyncStorage`) e restaurá-lo quando o aplicativo é reaberto. Isso é útil para que o usuário retorne à tela onde estava, mesmo após fechar o aplicativo.

   *   No `NavigationContainer`:
      ```javascript
      import AsyncStorage from "@react-native-async-storage/async-storage";

      const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

      const App = () => {
        const [isReady, setIsReady] = React.useState(false);
        const [initialState, setInitialState] = React.useState();

        React.useEffect(() => {
          const restoreState = async () => {
            try {
              const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
              const state = savedStateString ? JSON.parse(savedStateString) : undefined;
              if (state !== undefined) {
                setInitialState(state);
              }
            } finally {
              setIsReady(true);
            }
          };

          if (!isReady) {
            restoreState();
          }
        }, [isReady]);

        if (!isReady) {
          return null; // Ou uma tela de carregamento
        }

        return (
          <NavigationContainer
            initialState={initialState}
            onStateChange={(state) =>
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
            }
          >
            {/* ... seus navegadores ... */}
          </NavigationContainer>
        );
      };
      ```
   *   **Considerações:**
        *   Persistir o estado pode ter implicações de segurança se os parâmetros de rota contiverem dados sensíveis.
        *   O estado pode se tornar inválido se você alterar significativamente sua estrutura de navegação entre as versões do aplicativo. Você pode precisar de lógica para lidar com a migração de estado ou limpar o estado persistido em caso de erro.

**3. Integrando com Gerenciadores de Estado (Redux, etc.):**

   Embora React Navigation gerencie seu próprio estado, você pode querer integrar o estado de navegação com um store Redux ou similar para:
    *   Disparar ações de navegação de qualquer lugar (ex: de thunks/sagas Redux).
    *   Ter um único local para todo o estado do aplicativo, incluindo navegação.
    *   Time-travel debugging que inclui alterações de navegação.

   React Navigation não recomenda mais a integração profunda onde o estado de navegação vive *dentro* do Redux store, pois isso pode levar a problemas de performance e complexidade. A abordagem preferida é manter o estado de navegação dentro do React Navigation e usar uma `ref` no `NavigationContainer` (como mostrado acima) para despachar ações de navegação de fora dos componentes, ou usar listeners para sincronizar partes do estado de navegação com o Redux store, se necessário.

   Se você realmente precisar de uma integração mais profunda, bibliotecas como `redux-first-history` (embora mais focada em web com React Router) ou abordagens customizadas podem ser exploradas, mas com cautela.

**4. Lidando com Múltiplos Navegadores Aninhados e Parâmetros:**

   *   **Passando Parâmetros para Telas Aninhadas:** Ao navegar para um navegador aninhado, você pode passar parâmetros para uma tela específica dentro desse navegador:
      `navigation.navigate("NavegadorPai", { screen: "TelaFilhaEspecifica", params: { id: 123 } });`
   *   **Acessando Parâmetros de Navegadores Pais:** Uma tela pode acessar os parâmetros passados para seus navegadores pais usando `route.params` ou `navigation.getParent().getState()`.
   *   **Redefinindo o Histórico de Navegação (`reset`):**
      A ação `reset` permite substituir completamente o estado de navegação por um novo. Útil após o login (para limpar o stack de autenticação e ir para o app principal) ou em outros cenários onde você precisa de um histórico limpo.
      ```javascript
      import { CommonActions } from "@react-navigation/native";

      navigation.dispatch(
        CommonActions.reset({
          index: 0, // Qual rota no array `routes` deve ser a ativa
          routes: [
            { name: "TelaInicialApp" },
            // { name: "PerfilUsuario", params: { userId: "abc" } }, // Pode adicionar mais rotas ao novo stack
          ],
        })
      );
      ```

### Otimização de Performance em Navegadores Aninhados

Navegadores aninhados são poderosos, mas podem introduzir sobrecarga de performance se não forem usados com cuidado, especialmente se muitas telas forem renderizadas desnecessariamente.

**1. Renderização Preguiçosa de Telas (Lazy Loading):**

   *   **Tab e Drawer Navigators:** Por padrão, navegadores de aba (`createBottomTabNavigator`, `createMaterialTopTabNavigator`) e gaveta (`createDrawerNavigator`) geralmente montam todas as suas telas filhas na primeira vez para que estejam prontas quando o usuário navegar para elas. Isso pode ser custoso se as telas forem pesadas.
        *   **`lazy` prop (para Tabs):** O `createBottomTabNavigator` e `createMaterialTopTabNavigator` têm um prop `lazy` (padrão `true` nas versões mais recentes, mas verifique a documentação). Quando `true`, as telas de abas só são montadas quando são focadas pela primeira vez.
        *   **`unmountOnBlur` prop (para Tabs e Drawers):** Se `true`, as telas são desmontadas quando o usuário navega para fora delas. Isso economiza memória, mas significa que o estado da tela será perdido e ela será remontada na próxima vez que for visitada. Use com cautela.
            ```javascript
            <Tab.Screen 
              name="ConfiguracoesTab"
              component={TelaConfiguracoes}
              options={{ unmountOnBlur: true }}
            />
            ```

   *   **Stack Navigators:** Telas em um stack navigator são geralmente montadas apenas quando você navega para elas.

**2. Evitar Renderizações Desnecessárias em Telas Inativas:**

   *   Mesmo que uma tela de uma aba inativa esteja montada, você quer evitar que ela re-renderize em resposta a mudanças de estado globais que não a afetam.
   *   Use `React.memo` em seus componentes de tela e otimize as dependências de `props` e `context`.
   *   O hook `useIsFocused` retorna `true` se a tela estiver atualmente focada. Você pode usá-lo para, por exemplo, adiar a execução de efeitos colaterais caros ou a inscrição em listeners até que a tela esteja visível.
      ```javascript
      import { useIsFocused } from "@react-navigation/native";

      function MinhaTela() {
        const isFocused = useIsFocused();

        useEffect(() => {
          if (isFocused) {
            // Faça algo caro apenas quando a tela estiver focada
            const subscription = subscribeToUpdates();
            return () => subscription.unsubscribe();
          }
        }, [isFocused]);
        // ...
      }
      ```

**3. Otimizando Componentes de Cabeçalho e Aba Customizados:**

   Se você fornecer componentes customizados para `header` ou `tabBar`, certifique-se de que eles sejam otimizados (ex: com `React.memo`) para evitar re-renderizações desnecessárias, pois eles podem ser renderizados com frequência.

**4. Limitar a Profundidade do Aninhamento:**

   Embora não haja um limite rígido, aninhar muitos navegadores profundamente pode tornar o estado de navegação mais complexo de gerenciar e depurar, e potencialmente impactar a performance inicial de análise do estado.

**5. Usar `@react-navigation/native-stack` em vez de `@react-navigation/stack` quando possível:**

   Como mencionado anteriormente, `native-stack` usa componentes de navegação nativos, o que geralmente leva a uma melhor performance de renderização e transição em comparação com o `stack` baseado em JS, especialmente em cenários com muitos elementos na tela ou animações complexas.

**6. Profiling:**

   Use o React DevTools Profiler para identificar quais telas ou componentes de navegação estão causando gargalos de renderização durante as transições ou interações.

Gerenciar o estado de navegação de forma eficaz e otimizar a performance de navegadores aninhados são habilidades importantes para construir aplicativos React Native complexos que permanecem rápidos e responsivos. A chave é entender como o React Navigation gerencia seu estado e como suas escolhas de estrutura e configuração podem impactar a experiência do usuário.

