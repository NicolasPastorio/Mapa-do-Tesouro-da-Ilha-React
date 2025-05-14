

### Persistência de Estado Global

Em muitos aplicativos móveis, é desejável que o estado da aplicação seja preservado mesmo quando o usuário fecha e reabre o aplicativo. Isso pode incluir preferências do usuário, o conteúdo de um carrinho de compras, o estado de login, ou outros dados que melhoram a experiência do usuário ao evitar que ele tenha que recomeçar do zero a cada sessão. A persistência de estado global envolve salvar o estado do seu store (Redux, Zustand, etc.) em um armazenamento persistente (como AsyncStorage) e recarregá-lo quando o aplicativo é iniciado.

**1. Com Redux (Usando `redux-persist`):**

   `redux-persist` é a biblioteca mais popular para persistir e reidratar um store Redux em React Native (e React web).

   *   **Conceito:** Ela permite que você salve seletivamente partes do seu estado Redux no armazenamento e as recarregue automaticamente na inicialização do aplicativo.
   *   **Características:**
        *   **Adapters de Armazenamento:** Suporta vários mecanismos de armazenamento (AsyncStorage para React Native, localStorage/sessionStorage para web).
        *   **Configuração Flexível:** Permite escolher quais reducers (partes do estado) persistir (`whitelist`) ou quais ignorar (`blacklist`).
        *   **Transformações:** Permite transformar o estado antes de salvá-lo ou após carregá-lo (ex: para comprimir, criptografar, ou lidar com dados imutáveis como Immutable.js).
        *   **Migrações:** Suporte para migrar o estado persistido entre versões do seu aplicativo se a estrutura do estado mudar.
        *   **Integração com `PersistGate`:** Um componente React que pode atrasar a renderização da UI do seu aplicativo até que o estado persistido seja recuperado e reidratado.

   *   **Instalação:** `yarn add redux-persist`

   *   **Configuração Básica:**
      ```javascript
      // store.js (ou onde você configura seu store Redux)
      import { createStore, applyMiddleware, combineReducers } from "redux";
      import thunk from "redux-thunk"; // Ou outro middleware como Saga
      import { persistStore, persistReducer } from "redux-persist";
      import AsyncStorage from "@react-native-async-storage/async-storage";

      // Seus reducers
      import authReducer from "./reducers/authReducer";
      import settingsReducer from "./reducers/settingsReducer";
      import carrinhoReducer from "./reducers/carrinhoReducer";

      const rootReducer = combineReducers({
        auth: authReducer,
        settings: settingsReducer,
        carrinho: carrinhoReducer,
        // ... outros reducers
      });

      const persistConfig = {
        key: "root", // Chave raiz para o estado persistido no AsyncStorage
        storage: AsyncStorage,
        whitelist: ["auth", "settings"], // Apenas os reducers 'auth' e 'settings' serão persistidos
        // blacklist: ["carrinho"] // O reducer 'carrinho' NÃO será persistido
        // version: 1, // Opcional: para migrações
        // stateReconciler: autoMergeLevel2, // Como mesclar o estado inicial e o estado persistido
      };

      const persistedReducer = persistReducer(persistConfig, rootReducer);

      export const store = createStore(
        persistedReducer,
        applyMiddleware(thunk)
      );

      // `persistor` é usado com o PersistGate
      export const persistor = persistStore(store);
      ```

   *   **Uso do `PersistGate` no Ponto de Entrada do App:**
      ```javascript
      // App.js
      import React from "react";
      import { Provider } from "react-redux";
      import { PersistGate } from "redux-persist/integration/react";
      import { store, persistor } from "./store"; // Seu store e persistor configurados
      import AppNavigator from "./AppNavigator"; // Seu componente de navegação principal
      import TelaCarregando from "./screens/TelaCarregando"; // Uma tela de loading

      const App = () => {
        return (
          <Provider store={store}>
            <PersistGate loading={<TelaCarregando />} persistor={persistor}>
              {/* Seu aplicativo principal só será renderizado após a reidratação */}
              <AppNavigator />
            </PersistGate>
          </Provider>
        );
      };

      export default App;
      ```
      O `PersistGate` recebe um prop `loading` que pode ser qualquer componente React (ex: um spinner ou sua tela de splash) para exibir enquanto o estado está sendo carregado do AsyncStorage.

   *   **Transformações (Exemplo com `redux-persist-transform-filter`):**
      Às vezes, você quer persistir apenas um subconjunto de um reducer, ou transformar os dados.
      `yarn add redux-persist-transform-filter`
      ```javascript
      // store.js
      import { createFilter } from "redux-persist-transform-filter";

      const authSubsetFilter = createFilter(
        "auth", // Nome do reducer
        ["token", "usuario.id"] // Caminhos a serem persistidos dentro do reducer 'auth'
      );

      const persistConfig = {
        key: "root",
        storage: AsyncStorage,
        whitelist: ["auth", "settings"],
        transforms: [authSubsetFilter], // Aplicar a transformação
      };
      // ... resto da configuração
      ```

   *   **Migrações:**
      Se a estrutura do seu estado mudar entre as versões do aplicativo, `redux-persist` suporta uma função `migrate` na configuração. Você define a `version` na `persistConfig`. Se a versão armazenada for menor que a versão atual, a função de migração é chamada.

**2. Com Zustand (Usando o Middleware `persist`):**

   Zustand tem um middleware `persist` integrado que torna a persistência de estado muito simples.

   *   **Configuração:**
      ```javascript
      // store/meuStoreZustand.js
      import { create } from "zustand";
      import { persist, createJSONStorage } from "zustand/middleware";
      import AsyncStorage from "@react-native-async-storage/async-storage";

      export const useMeuStorePersistido = create(
        persist(
          (set, get) => ({
            // Seu estado e ações aqui
            preferencias: { tema: "claro", notificacoesAtivas: true },
            carrinhoItens: [],
            setTema: (novoTema) => 
              set((state) => ({ preferencias: { ...state.preferencias, tema: novoTema }})),
            adicionarAoCarrinho: (item) => 
              set((state) => ({ carrinhoItens: [...state.carrinhoItens, item] })),
          }),
          {
            name: "meu-app-storage-zustand", // Nome da chave no AsyncStorage
            storage: createJSONStorage(() => AsyncStorage), // Obrigatório para React Native
            // partialize: (state) => ({ preferencias: state.preferencias }), // Opcional: persistir apenas parte do estado
            // version: 1, // Opcional: para migrações (onRehydrateStorage, migrate)
            // onRehydrateStorage: (state) => {
            //   console.log("Zustand: Hidratação iniciada");
            //   return (state, error) => {
            //     if (error) {
            //       console.log("Zustand: Erro ao reidratar", error);
            //     } else {
            //       console.log("Zustand: Reidratação completa");
            //     }
            //   };
            // },
          }
        )
      );
      ```
   *   **Uso:** O uso em componentes é o mesmo de um store Zustand normal. A persistência e reidratação são tratadas automaticamente pelo middleware.
   *   **Vantagens:** Extremamente fácil de configurar e usar.

**3. Com Jotai (Usando `atomWithStorage` ou Utilitários da Comunidade):**

   Jotai oferece um utilitário `atomWithStorage` para persistir o estado de átomos individuais.

   *   **Configuração:**
      ```javascript
      // store/atomosPersistidos.js
      import { atomWithStorage, createJSONStorage } from "jotai/utils";
      import AsyncStorage from "@react-native-async-storage/async-storage";

      // Define um storage customizado usando AsyncStorage
      const jotaiAsyncStorage = createJSONStorage(() => AsyncStorage);

      export const temaAtom = atomWithStorage(
        "preferenciaTema", // Chave no AsyncStorage
        "claro", // Valor inicial
        jotaiAsyncStorage // Especifica o storage
      );

      export const nomeUsuarioAtom = atomWithStorage(
        "nomeUsuarioLogado",
        null, // Pode ser nulo inicialmente
        jotaiAsyncStorage
      );
      ```
   *   **Uso:** Use os átomos persistidos em seus componentes com `useAtom` como faria com átomos normais.
      ```javascript
      // MeuComponenteComTemaJotai.js
      import React from "react";
      import { useAtom } from "jotai";
      import { temaAtom } from "../store/atomosPersistidos";
      import { View, Text, Switch } from "react-native";

      const MeuComponenteComTemaJotai = () => {
        const [tema, setTema] = useAtom(temaAtom);
        const toggleTema = () => setTema(t => t === "claro" ? "escuro" : "claro");

        return (
          <View style={{ backgroundColor: tema === "claro" ? "white" : "grey" }}>
            <Text>Tema Atual: {tema}</Text>
            <Switch value={tema === "escuro"} onValueChange={toggleTema} />
          </View>
        );
      };
      ```
   *   **Vantagens:** Persistência granular no nível do átomo, simples de usar para átomos individuais.
   *   **Desvantagens:** Se você tem muitos átomos para persistir, pode precisar configurar cada um. Para persistir um estado mais complexo ou interligado, pode ser necessário combinar com outras estratégias.

**4. Com Recoil (Usando `effects_UNSTABLE` ou Bibliotecas da Comunidade):**

   Recoil tem um sistema de "efeitos" (ainda marcado como instável no nome da API, mas funcional) que pode ser usado para sincronizar átomos com armazenamento externo, incluindo persistência.

   *   **Configuração com `atomFamily` e Efeitos:**
      ```javascript
      // store/recoilPersistido.js
      import { atom, DefaultValue } from "recoil";
      import AsyncStorage from "@react-native-async-storage/async-storage";

      const asyncStorageEffect = (key) => ({ setSelf, onSet }) => {
        // Carregar do AsyncStorage na inicialização
        AsyncStorage.getItem(key).then(savedValue => {
          if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
          }
        });

        // Salvar no AsyncStorage em cada mudança
        onSet((newValue, _, isReset) => {
          if (isReset || newValue instanceof DefaultValue) { // DefaultValue é usado para resetar
            AsyncStorage.removeItem(key);
          } else {
            AsyncStorage.setItem(key, JSON.stringify(newValue));
          }
        });
      };

      export const temaRecoilAtom = atom({
        key: "temaRecoil",
        default: "claro",
        effects_UNSTABLE: [
          asyncStorageEffect("recoil_tema_persistido"),
        ],
      });
      ```
   *   **Vantagens:** Flexível, permite lógica de sincronização customizada.
   *   **Desvantagens:** A API `effects_UNSTABLE` é mais verbosa para configurar para cada átomo persistido. Bibliotecas da comunidade como `recoil-persist` podem simplificar isso, oferecendo uma API similar à `redux-persist` ou ao middleware do Zustand.

**Considerações Gerais para Persistência de Estado:**

*   **O que Persistir:** Seja seletivo sobre o que você persiste. Evite persistir dados transitórios, grandes volumes de dados que podem ser recarregados da rede, ou informações sensíveis não criptografadas.
*   **Performance:** A leitura e escrita no AsyncStorage são operações assíncronas e podem ter um pequeno impacto na performance de inicialização se o estado for muito grande. O `PersistGate` (Redux) ou o carregamento assíncrono do estado ajudam a mitigar o impacto na UI.
*   **Segurança:** AsyncStorage não é um local seguro para dados altamente sensíveis (como tokens de API de longa duração ou chaves privadas) sem criptografia adicional. Para dados sensíveis, considere usar bibliotecas como `react-native-keychain` ou `expo-secure-store`.
*   **Tamanho do Estado:** Estados muito grandes podem tornar a serialização/desserialização e o armazenamento/leitura lentos. Mantenha o estado persistido o mais enxuto possível.
*   **Migração de Versão:** Se a estrutura do seu estado persistido mudar entre as versões do aplicativo, implemente uma estratégia de migração para evitar que o aplicativo quebre ao carregar um estado antigo e incompatível.
*   **Resetar Estado Persistido:** Forneça uma maneira (talvez em configurações de desenvolvedor ou ao lidar com erros de reidratação) de limpar o estado persistido se ele se tornar corrupto.

Persistir o estado global melhora significativamente a experiência do usuário em muitos aplicativos React Native, tornando-os mais resilientes e convenientes. Escolha a ferramenta e a estratégia que melhor se alinham com sua biblioteca de gerenciamento de estado e os requisitos do seu projeto.

