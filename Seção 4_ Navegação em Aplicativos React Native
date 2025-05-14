## Seção 4: Navegação em Aplicativos React Native

A maioria dos aplicativos móveis não se resume a uma única tela. Os usuários precisam se mover entre diferentes seções, visualizar detalhes, voltar à tela anterior e interagir com fluxos de trabalho que podem abranger múltiplas visualizações. Gerenciar essa transição entre telas é o papel da navegação. Nesta seção, exploraremos como implementar a navegação em seus aplicativos React Native, focando na biblioteca mais popular e recomendada para essa finalidade: o React Navigation.

Abordaremos os conceitos fundamentais da navegação em aplicativos móveis, como instalar e configurar o React Navigation, e mergulharemos nos três tipos de navegadores mais comuns: Stack Navigator (para um fluxo de empilhamento de telas), Tab Navigator (para navegação por abas) e Drawer Navigator (para menus laterais). Também veremos como passar parâmetros entre telas e como combinar diferentes tipos de navegadores para criar experiências de usuário ricas e intuitivas.

### Introdução à Navegação em Aplicativos Móveis

A navegação é um aspecto central da experiência do usuário em qualquer aplicativo. Em aplicativos móveis, os padrões de navegação comuns incluem:

*   **Navegação Hierárquica (Stack):** O usuário navega de uma tela de lista para uma tela de detalhes e pode voltar usando um botão "Voltar". As telas são empilhadas umas sobre as outras, e voltar remove a tela do topo da pilha.
*   **Navegação por Abas (Tabs):** Várias seções principais do aplicativo são acessíveis através de abas fixas, geralmente na parte inferior ou superior da tela. Cada aba geralmente representa um fluxo de navegação independente (que pode ser uma pilha).
*   **Navegação por Gaveta (Drawer):** Um menu lateral, muitas vezes oculto e acessível por um ícone de "hambúrguer" ou deslizando da borda da tela, que oferece acesso a várias seções ou funcionalidades do aplicativo.
*   **Navegação Modal:** Telas que aparecem sobre o conteúdo atual para tarefas específicas, como preencher um formulário, exibir um alerta importante ou apresentar opções. O usuário geralmente precisa dispensar o modal para retornar ao fluxo anterior.
*   **Fluxos Condicionais:** O usuário pode ser direcionado para diferentes telas com base em certas condições, como status de login (telas de autenticação vs. telas principais do app).

Uma boa solução de navegação deve ser fácil de implementar, flexível para lidar com diferentes padrões, performática e fornecer uma experiência de usuário consistente com as convenções de cada plataforma (iOS e Android).

### React Navigation: A Solução Padrão da Comunidade

Embora o React Native em si não venha com uma solução de navegação embutida no seu núcleo, a comunidade desenvolveu várias bibliotecas para essa finalidade. De longe, a mais utilizada, madura e recomendada é o **React Navigation**.

O React Navigation é uma biblioteca de navegação totalmente escrita em JavaScript, o que significa que é fácil de integrar e usar em projetos Expo e projetos React Native CLI (Bare Workflow). Ela oferece:

*   **Componentes para diferentes padrões de navegação:** Stack, Tabs, Drawer, e mais.
*   **Altamente customizável:** Permite ajustar a aparência e o comportamento dos navegadores.
*   **Integração com gestos nativos:** Suporta gestos comuns de navegação (como deslizar para voltar no iOS).
*   **Passagem de parâmetros entre telas.**
*   **Gerenciamento de estado de navegação.**
*   **Suporte a deep linking.**
*   **Boa documentação e uma grande comunidade.**

**Instalação e Configuração do React Navigation (v6, a versão atual no momento da escrita):**

A instalação do React Navigation envolve alguns pacotes. O pacote principal é `@react-navigation/native`, e então você instala os pacotes para os tipos de navegadores que pretende usar (ex: `@react-navigation/stack` para Stack Navigator).

**1. Instalar o pacote principal e dependências:**

Se você estiver usando um projeto **React Native CLI (Bare Workflow)**, precisará instalar algumas dependências nativas. Se estiver usando **Expo (Managed Workflow)**, muitas dessas dependências já vêm pré-instaladas ou são mais fáceis de configurar.

Primeiro, instale o pacote principal:

```bash
# Usando npm
npm install @react-navigation/native

# Usando Yarn
yarn add @react-navigation/native
```

Em seguida, instale as dependências que o React Navigation requer. Para projetos **Expo (Managed Workflow)**, a instalação é mais simples:

```bash
expo install react-native-screens react-native-safe-area-context
```

Para projetos **React Native CLI (Bare Workflow)**:

```bash
npm install react-native-screens react-native-safe-area-context
# ou
yarn add react-native-screens react-native-safe-area-context
```

Após instalar `react-native-screens` e `react-native-safe-area-context` em um projeto Bare Workflow, você precisa garantir que elas sejam vinculadas corretamente. Para iOS, execute `npx pod-install ios` (ou `cd ios && pod install && cd ..`). Para Android, geralmente são vinculadas automaticamente.

**Importante para Bare Workflow (React Native CLI):** Para que `react-native-screens` funcione corretamente no Android, você precisa fazer uma pequena modificação no seu arquivo `MainActivity.java` (ou `MainActivity.kt` se estiver usando Kotlin). Adicione o seguinte código no corpo da classe `MainActivity`:

```java
// MainActivity.java (localizado em android/app/src/main/java/<seu_pacote>/MainActivity.java)
package com.seunomeprojeto;

import android.os.Bundle; // Adicione esta linha
import com.facebook.react.ReactActivity;
// ... outras importações

public class MainActivity extends ReactActivity {
  // ... (método getMainComponentName)

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null); // MODIFIQUE ESTA LINHA para null ou savedInstanceState
                          // A documentação do React Navigation sugere null para evitar crashes em alguns casos
                          // ou manter savedInstanceState se você precisar dele para outros fins.
                          // Para a maioria dos casos com React Navigation, `null` é seguro.
  }
}
```
Consulte sempre a documentação oficial do React Navigation para as instruções de instalação mais recentes e detalhadas, pois elas podem mudar entre versões.

**2. Envolver seu aplicativo em `NavigationContainer`:**

Todo o seu aplicativo que usa navegação precisa ser envolvido pelo componente `NavigationContainer`. Geralmente, você faz isso no seu arquivo raiz, como `App.js`.

```javascript
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// ... importe seus navegadores e telas aqui ...

const App = () => {
  return (
    <NavigationContainer>
      {/* Seus navegadores (Stack, Tabs, etc.) virão aqui */}
    </NavigationContainer>
  );
};

export default App;
```

Agora estamos prontos para adicionar os navegadores.

### Stack Navigator (`@react-navigation/stack`)

O Stack Navigator gerencia a navegação como uma pilha de telas. Quando você navega para uma nova tela, ela é colocada no topo da pilha. Quando você volta, a tela do topo é removida. É o padrão de navegação mais comum para fluxos hierárquicos.

**1. Instalar o Stack Navigator:**

```bash
# Usando npm
npm install @react-navigation/stack

# Usando Yarn
yarn add @react-navigation/stack
```

Se estiver em um projeto Bare Workflow, você também precisará instalar `react-native-gesture-handler` (se ainda não o tiver) e `react-native-masked-view` (este último pode ser uma dependência do stack ou de outros componentes visuais do header):

```bash
# Para Bare Workflow
npm install react-native-gesture-handler @react-native-masked-view/masked-view
# ou
yarn add react-native-gesture-handler @react-native-masked-view/masked-view
```

Para `react-native-gesture-handler` em Bare Workflow, adicione `import 'react-native-gesture-handler';` no topo do seu arquivo de entrada (como `index.js` ou `App.js`). Certifique-se de que seja a primeira linha.

**2. Criar um Stack Navigator:**

```javascript
// App.js (ou um arquivo de navegação separado)
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Definição das Telas
const HomeScreen = ({ navigation }) => { // A prop 'navigation' é injetada automaticamente
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Inicial (Home)</Text>
      <Button 
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Detalhes', { // Navega para a tela 'Detalhes'
          itemId: 86,
          outroParametro: 'Qualquer Coisa Aqui',
        })} 
      />
      <Button 
        title="Ir para Perfil"
        onPress={() => navigation.navigate('Perfil')} 
      />
    </View>
  );
};

const DetailsScreen = ({ route, navigation }) => { // 'route' contém os parâmetros passados
  const { itemId, outroParametro } = route.params; // Extraindo parâmetros
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Detalhes</Text>
      <Text style={styles.text}>ID do Item: {JSON.stringify(itemId)}</Text>
      <Text style={styles.text}>Outro Parâmetro: {JSON.stringify(outroParametro)}</Text>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Voltar (Pop)" onPress={() => navigation.goBack()} />
      <Button 
        title="Ir para Detalhes... de novo (Push)"
        onPress={() => navigation.push('Detalhes', { // 'push' adiciona uma nova instância à pilha
          itemId: Math.floor(Math.random() * 100),
        })} 
      />
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Perfil</Text>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

// Criar a instância do Stack Navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home" // Define a tela inicial da pilha
      screenOptions={{ // Opções padrão para todas as telas no navigator
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Visão Geral' }} // Título específico para esta tela no header
      />
      <Stack.Screen 
        name="Detalhes" 
        component={DetailsScreen} 
        options={({ route }) => ({ // Opções dinâmicas baseadas na rota
          title: `Detalhes do Item ${route.params.itemId}`,
        })}
        initialParams={{ itemId: 42 }} // Parâmetros iniciais se nenhum for passado
      />
      <Stack.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          title: 'Meu Perfil',
          headerRight: () => ( // Adiciona um componente à direita do header
            <Button onPress={() => alert('Isso é um botão!')} title="Info" color="#fff" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  text: { fontSize: 18, marginVertical: 10 },
});

export default App;
```

**Explicação:**

*   **`createStackNavigator()`:** Cria um objeto que contém dois componentes: `Stack.Navigator` e `Stack.Screen`.
*   **`Stack.Navigator`:** É o componente que envolve suas definições de tela. Ele gerencia a pilha de navegação.
    *   `initialRouteName`: Define qual tela da pilha será carregada primeiro.
    *   `screenOptions`: Permite definir opções padrão para o cabeçalho (header) e outras configurações para todas as telas dentro deste navegador.
*   **`Stack.Screen`:** Define cada tela na pilha.
    *   `name`: Um nome único para a tela, usado para navegar até ela (ex: `navigation.navigate('NomeDaTela')`).
    *   `component`: O componente React que renderiza o conteúdo da tela.
    *   `options`: Permite customizar a aparência e o comportamento da tela específica, como o título do cabeçalho (`title`), adicionar botões ao cabeçalho (`headerRight`, `headerLeft`), ou até mesmo fornecer um cabeçalho customizado (`header`). As opções podem ser um objeto ou uma função que retorna um objeto (útil para opções dinâmicas baseadas em `route.params`).
*   **Prop `navigation`:** Cada tela dentro de um navegador recebe automaticamente uma prop `navigation`. Este objeto contém várias funções para interagir com a navegação:
    *   `navigation.navigate('NomeDaTela', { params })`: Navega para a tela especificada. Se a tela já estiver na pilha, ele pode voltar para ela. Se não, adiciona à pilha. Pode passar parâmetros.
    *   `navigation.push('NomeDaTela', { params })`: Sempre adiciona uma nova instância da tela à pilha, mesmo que uma tela com o mesmo nome já exista. Útil para cenários onde você quer múltiplas instâncias da mesma tela de detalhes, por exemplo.
    *   `navigation.goBack()`: Volta para a tela anterior na pilha.
    *   `navigation.popToTop()`: Volta para a primeira tela na pilha, removendo todas as outras.
    *   `navigation.setParams({ novosParams })`: Atualiza os parâmetros da rota atual.
    *   `navigation.setOptions({ novasOpcoes })`: Atualiza as opções da tela atual (ex: título do header) dinamicamente.
*   **Prop `route`:** Cada tela também recebe uma prop `route`. Este objeto contém informações sobre a rota atual, incluindo:
    *   `route.params`: Um objeto com os parâmetros que foram passados para esta tela durante a navegação.
    *   `route.name`: O nome da rota atual.
    *   `route.key`: Uma chave única para esta instância da rota.

**Passagem de Parâmetros:**

Como visto no exemplo, você passa parâmetros ao chamar `navigation.navigate` ou `navigation.push`:
`navigation.navigate('Detalhes', { itemId: 86, outroParametro: 'valor' });`

E acessa esses parâmetros na tela de destino usando `route.params`:
`const { itemId, outroParametro } = route.params;`

É uma boa prática definir `initialParams` em `Stack.Screen` se sua tela espera parâmetros e pode ser acessada sem eles (ex: por deep linking ou como tela inicial).

### Tab Navigator (`@react-navigation/bottom-tabs` ou `@react-navigation/material-top-tabs`)

Tab Navigators são usados para exibir várias telas principais que o usuário pode alternar facilmente. Existem dois tipos principais:

*   **Bottom Tab Navigator (`@react-navigation/bottom-tabs`):** Exibe abas na parte inferior da tela, comum em aplicativos iOS e Android.
*   **Material Top Tab Navigator (`@react-navigation/material-top-tabs`):** Exibe abas na parte superior da tela, seguindo as diretrizes do Material Design. Pode ser usado para alternar entre seções dentro de uma tela.

Vamos focar no Bottom Tab Navigator.

**1. Instalar o Bottom Tab Navigator:**

```bash
# Usando npm
npm install @react-navigation/bottom-tabs

# Usando Yarn
yarn add @react-navigation/bottom-tabs
```

**2. Criar um Bottom Tab Navigator:**

```javascript
// App.js (ou um arquivo de navegação separado)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Suponha que temos HomeScreen e SettingsScreen definidos como antes
// import { createStackNavigator } from '@react-navigation/stack'; // Para aninhar stacks

// Telas para as abas
const FeedScreen = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Feed</Text></View>
);

const MessagesScreen = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Mensagens</Text></View>
);

const NotificationsScreen = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Notificações</Text></View>
);

// Criar a instância do Tab Navigator
const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Você usaria uma biblioteca de ícones aqui (ex: react-native-vector-icons)
          if (route.name === 'Feed') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          } else if (route.name === 'Mensagens') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
          } else if (route.name === 'Notificações') {
            iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
          }
          // Componente de Ícone (exemplo simulado com Text)
          return <Text style={{ color: color, fontSize: size }}>{iconName ? iconName.substring(0,3).toUpperCase() : 'ICON'}</Text>;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f0f0f0' },
        headerShown: true, // Para mostrar o header padrão do Stack (se aninhado) ou do Tab
      })}
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{ tabBarBadge: 3 }} // Mostra um badge na aba
      />
      <Tab.Screen name="Mensagens" component={MessagesScreen} />
      <Tab.Screen name="Notificações" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppTabNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});

export default App;
```

**Explicação:**

*   **`createBottomTabNavigator()`:** Cria o navegador de abas.
*   **`Tab.Navigator`:** Envolve as telas das abas.
*   **`Tab.Screen`:** Define cada aba.
*   **`screenOptions`:** Pode ser uma função que recebe `{ route, navigation }` e retorna um objeto de opções. É comumente usado para configurar `tabBarIcon`.
    *   `tabBarIcon`: Uma função que recebe `{ focused, color, size }` e retorna um componente React para ser usado como ícone da aba. `focused` indica se a aba está ativa.
    *   `tabBarActiveTintColor`, `tabBarInactiveTintColor`: Cores para o ícone e o rótulo da aba ativa e inativa.
    *   `tabBarStyle`: Estilos para a barra de abas em si.
    *   `headerShown`: Controla se o cabeçalho padrão deve ser exibido para as telas da aba. Se cada aba for um Stack Navigator, você pode querer `headerShown: false` aqui e deixar o Stack Navigator da aba gerenciar seu próprio header.
*   **`options` em `Tab.Screen`:** Pode ser usado para configurações específicas da aba, como `tabBarLabel` (texto da aba), `tabBarBadge` (para mostrar um contador/notificação na aba).

### Drawer Navigator (`@react-navigation/drawer`)

O Drawer Navigator exibe um menu lateral (gaveta) que pode ser aberto deslizando da borda da tela ou tocando em um ícone.

**1. Instalar o Drawer Navigator:**

```bash
# Usando npm
npm install @react-navigation/drawer

# Usando Yarn
yarn add @react-navigation/drawer
```

O Drawer Navigator também depende de `react-native-gesture-handler` e `react-native-reanimated`. Se você estiver em um projeto Bare Workflow e ainda não os tiver, instale-os:

```bash
# Para Bare Workflow
npm install react-native-gesture-handler react-native-reanimated
# ou
yarn add react-native-gesture-handler react-native-reanimated
```

Para `react-native-reanimated` (v2 ou superior) em Bare Workflow, você precisa adicionar o plugin do Babel. Modifique seu `babel.config.js`:

```javascript
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ... outros plugins
    'react-native-reanimated/plugin', // IMPORTANTE: Este deve ser o último plugin na lista.
  ],
};
```
Limpe o cache do Metro Bundler (`npm start -- --reset-cache` ou `yarn start --reset-cache`) após adicionar o plugin.

**2. Criar um Drawer Navigator:**

```javascript
// App.js (ou um arquivo de navegação separado)
import 'react-native-gesture-handler'; // Deve ser o primeiro import
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Telas para o Drawer
const HomeScreenDrawer = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Tela Inicial (Drawer)</Text>
    <Button onPress={() => navigation.openDrawer()} title="Abrir Gaveta" />
  </View>
);

const NotificationsScreenDrawer = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Notificações (Drawer)</Text></View>
);

const ProfileScreenDrawer = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Perfil (Drawer)</Text></View>
);

// Criar a instância do Drawer Navigator
const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
  return (
    <Drawer.Navigator 
      initialRouteName="HomeDrawer"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
        },
        drawerActiveTintColor: 'tomato',
        drawerInactiveTintColor: 'gray',
        // headerShown: false, // Se você quiser um header customizado ou nenhum header
      }}
      // drawerContent={(props) => <CustomDrawerContent {...props} />} // Para um conteúdo de gaveta totalmente customizado
    >
      <Drawer.Screen 
        name="HomeDrawer" 
        component={HomeScreenDrawer} 
        options={{ title: 'Início' }}
      />
      <Drawer.Screen 
        name="NotificationsDrawer" 
        component={NotificationsScreenDrawer} 
        options={{ title: 'Notificações' }}
      />
      <Drawer.Screen 
        name="ProfileDrawer" 
        component={ProfileScreenDrawer} 
        options={{ title: 'Meu Perfil' }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppDrawerNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});

export default App;
```

**Explicação:**

*   **`createDrawerNavigator()`:** Cria o navegador de gaveta.
*   **`Drawer.Navigator` e `Drawer.Screen`:** Funcionam de forma similar aos outros navegadores.
*   **`navigation.openDrawer()` e `navigation.closeDrawer()`:** Funções para controlar a gaveta programaticamente.
*   **`screenOptions`:** Permite customizar a aparência da gaveta (`drawerStyle`, `drawerActiveTintColor`, etc.) e dos headers das telas.
*   **`drawerContent`:** Uma prop poderosa que permite fornecer um componente React customizado para renderizar todo o conteúdo da gaveta, oferecendo total flexibilidade sobre sua aparência e funcionalidade.

### Combinando Navegadores

A verdadeira força do React Navigation vem da capacidade de aninhar navegadores. Por exemplo, você pode ter um Tab Navigator onde cada aba é um Stack Navigator independente, ou um Drawer Navigator onde um dos itens do menu leva a um Tab Navigator.

**Exemplo: Tab Navigator com Stacks dentro de cada Aba**

```javascript
// ... (imports e definições de tela como FeedScreen, MessagesScreen)
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack para a aba de Feed
const FeedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true /* ou false se quiser controlar no Tab */ }}>
      <Stack.Screen name="FeedPrincipal" component={FeedScreen} options={{ title: 'Meu Feed' }} />
      <Stack.Screen name="DetalhesDoPost" component={DetailsScreen} /> {/* Supondo que DetailsScreen exista */} 
    </Stack.Navigator>
  );
};

// Stack para a aba de Mensagens
const MessagesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaDeMensagens" component={MessagesScreen} options={{ title: 'Minhas Mensagens' }} />
      <Stack.Screen name="Conversa" component={ConversationScreen} /> {/* Supondo que ConversationScreen exista */} 
    </Stack.Navigator>
  );
};

// Tab Navigator principal
const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false /* Deixa os Stacks controlarem seus headers */ }}>
      <Tab.Screen name="FeedTab" component={FeedStack} options={{ title: 'Feed' /*, tabBarIcon: ... */ }} />
      <Tab.Screen name="MessagesTab" component={MessagesStack} options={{ title: 'Mensagens' /*, tabBarIcon: ... */ }} />
    </Tab.Navigator>
  );
};

// App.js
const App = () => {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
};

// ... (definições de tela como FeedScreen, MessagesScreen, DetailsScreen, ConversationScreen e estilos)
```

Neste exemplo:
*   `FeedStack` é um Stack Navigator para as telas relacionadas ao feed.
*   `MessagesStack` é outro Stack Navigator para as telas de mensagens.
*   `MainTabNavigator` usa `FeedStack` e `MessagesStack` como componentes para suas abas.
*   Ao definir `headerShown: false` no `Tab.Navigator`, permitimos que cada `Stack.Navigator` aninhado gerencie seu próprio cabeçalho.

**Navegando para uma tela em um navegador aninhado:**

Se você está em uma tela do `FeedStack` e quer navegar para uma tela no `MessagesStack`, você pode fazer:
`navigation.navigate('MessagesTab', { screen: 'Conversa', params: { userId: 123 } });`

O primeiro argumento é o nome da rota no navegador pai (o `Tab.Screen` chamado `MessagesTab`), e o objeto `{ screen: '...' }` especifica a tela de destino dentro do navegador aninhado (`MessagesStack`).

### Exemplos Práticos de Fluxos de Navegação

1.  **Fluxo de Autenticação:**
    Muitos aplicativos têm um fluxo de login/cadastro separado do fluxo principal do aplicativo.

    ```javascript
    // ... (imports)
    const AuthStack = createStackNavigator();
    const AppStack = createStackNavigator(); // Ou seu Tab/Drawer principal
    
    const AuthNavigator = () => (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Cadastro" component={RegisterScreen} />
      </AuthStack.Navigator>
    );

    const App = () => {
      const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Gerenciar estado de login

      // Lógica para verificar login (ex: AsyncStorage, Context API, Redux)
      // useEffect(() => { /* verificar status de login */ }, []);

      return (
        <NavigationContainer>
          {isUserLoggedIn ? <AppStack /> /* Ou MainTabNavigator, etc. */ : <AuthNavigator />}
        </NavigationContainer>
      );
    };
    ```
    Aqui, condicionalmente renderizamos o `AuthNavigator` ou o navegador principal do aplicativo com base no estado de login do usuário.

2.  **Modal sobre um Tab Navigator:**
    Você pode definir um Stack Navigator como raiz, onde uma das telas é o seu Tab Navigator principal, e outra tela é um Modal.

    ```javascript
    // ... (imports)
    const RootStack = createStackNavigator();
    // MainTabNavigator definido como antes

    const ModalScreen = ({ navigation }) => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Este é um Modal!</Text>
        <Button onPress={() => navigation.goBack()} title="Fechar Modal" />
      </View>
    );

    const App = () => {
      return (
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen 
              name="MainApp" 
              component={MainTabNavigator} 
              options={{ headerShown: false }} 
            />
            <RootStack.Screen 
              name="MeuModal" 
              component={ModalScreen} 
              options={{ presentation: 'modal' }} // Estilo de apresentação modal
            />
          </RootStack.Navigator>
        </NavigationContainer>
      );
    };
    // Para abrir o modal de qualquer lugar dentro de MainTabNavigator:
    // navigation.navigate('MeuModal');
    ```
    A opção `presentation: 'modal'` (ou `mode: 'modal'` em versões mais antigas do stack) estiliza a transição da tela como um modal.

A navegação é uma parte fundamental e muitas vezes complexa do desenvolvimento de aplicativos. O React Navigation oferece um conjunto robusto de ferramentas para lidar com a maioria dos cenários. A chave é entender os diferentes tipos de navegadores, como eles funcionam individualmente e como podem ser combinados. A documentação oficial do React Navigation é um recurso indispensável e deve ser consultada frequentemente para explorar todas as opções de customização e funcionalidades avançadas.

Com a capacidade de criar componentes, estilizá-los, organizá-los em layouts e agora navegar entre eles, você tem os pilares para construir a estrutura de qualquer aplicativo React Native. Na próxima seção, veremos como buscar e exibir dados de APIs externas e como persistir dados localmente.
