# Aplicativo React Native com Expo Go para Cadastro de Usuários

## Introdução

React Native, criado pelo Facebook, revolucionou o desenvolvimento de aplicações móveis ao permitir que desenvolvedores criem aplicações nativas para iOS e Android a partir de uma única base de código JavaScript. Esta abordagem de desenvolvimento multiplataforma oferece vantagens significativas em termos de eficiência, custo e manutenibilidade, tornando-se uma escolha popular para startups e grandes empresas.

Expo é uma plataforma open-source que complementa o React Native, simplificando ainda mais o processo de desenvolvimento. Expo oferece um conjunto de ferramentas e serviços que abstraem complexidades de configuração de ambiente, build nativo e deployment, permitindo que desenvolvedores foquem na criação de funcionalidades e experiência do usuário. Expo Go, o aplicativo cliente do Expo, permite visualizar e testar aplicações em desenvolvimento em dispositivos físicos sem necessidade de compilação nativa.

Neste tutorial, você aprenderá a construir um aplicativo de cadastro de usuários utilizando React Native e Expo. A aplicação implementará funcionalidades de login, registro, gerenciamento de perfil e comunicação segura com a API REST desenvolvida anteriormente. Abordaremos conceitos fundamentais como componentes React Native, navegação, gerenciamento de estado, e integração com APIs externas.

Exploraremos bibliotecas populares do ecossistema React Native, como React Navigation para roteamento, Axios para comunicação HTTP, e AsyncStorage para armazenamento local. Também abordaremos tópicos avançados como hooks do React, gerenciamento de estado global com Context API, e boas práticas de segurança para aplicações móveis.

A aplicação resultante demonstrará como criar aplicações móveis performáticas e com aparência nativa utilizando tecnologias web. A combinação de React Native e Expo oferece um fluxo de trabalho de desenvolvimento rápido e iterativo, ideal para projetos que exigem agilidade e alcance em múltiplas plataformas.

## Configuração do Ambiente de Desenvolvimento

### Instalação do Node.js e NPM

O desenvolvimento com React Native e Expo requer Node.js e seu gerenciador de pacotes, NPM. Node.js é um ambiente de execução JavaScript que permite executar JavaScript fora do navegador, enquanto NPM é utilizado para gerenciar dependências do projeto.

Visite o site oficial do Node.js (nodejs.org) e baixe a versão LTS (Long Term Support), que oferece maior estabilidade e suporte a longo prazo. O instalador do Node.js inclui automaticamente o NPM, simplificando o processo de instalação.

Após a instalação, abra um terminal ou prompt de comando e verifique se Node.js e NPM foram instalados corretamente executando os seguintes comandos:

```bash
node -v
npm -v
```

Estes comandos devem exibir as versões instaladas do Node.js e NPM, confirmando que o ambiente está pronto para o próximo passo.

### Instalação do Expo CLI

Expo CLI é a ferramenta de linha de comando que permite criar, iniciar e gerenciar projetos Expo. Instale o Expo CLI globalmente em seu sistema utilizando o NPM:

```bash
npm install -g expo-cli
```

O comando `-g` instala o pacote globalmente, tornando o comando `expo` acessível de qualquer diretório em seu sistema. Após a instalação, verifique se o Expo CLI foi instalado corretamente executando:

```bash
expo --version
```

Este comando deve exibir a versão instalada do Expo CLI.

### Criação do Projeto Expo

Com o Expo CLI instalado, você pode criar um novo projeto React Native. Navegue até o diretório onde deseja criar o projeto e execute o seguinte comando:

```bash
expo init cadastro-usuarios-react-native
```

O Expo CLI irá solicitar que você escolha um template para o projeto. Selecione o template "blank", que oferece uma estrutura mínima e limpa para iniciar o desenvolvimento. O Expo CLI irá então criar o diretório do projeto e instalar as dependências iniciais.

Após a criação do projeto, navegue para o diretório recém-criado:

```bash
cd cadastro-usuarios-react-native
```

### Executando o Projeto com Expo Go

Para visualizar e testar sua aplicação em um dispositivo físico, instale o aplicativo Expo Go a partir da App Store (iOS) ou Google Play Store (Android). Expo Go permite escanear um código QR gerado pelo Expo CLI para carregar e executar sua aplicação em desenvolvimento.

Para iniciar o servidor de desenvolvimento do Expo, execute o seguinte comando no diretório do projeto:

```bash
npm start
```

Este comando iniciará o Metro Bundler, o empacotador de código JavaScript utilizado pelo React Native. O Metro Bundler irá gerar um código QR no terminal e em uma página web que será aberta automaticamente em seu navegador.

Abra o aplicativo Expo Go em seu dispositivo móvel e escaneie o código QR. A aplicação será então carregada e executada em seu dispositivo, com atualizações automáticas sempre que você salvar alterações em seu código.

## Estrutura do Projeto e Componentes

### Estrutura de Diretórios

Organize o projeto em uma estrutura de diretórios que promova a separação de responsabilidades e facilite a manutenção. Crie a seguinte estrutura de diretórios na raiz do projeto:

```
/src
  /api
  /components
    /common
  /hooks
  /navigation
  /screens
    /auth
    /main
  /state
  /styles
  /utils
```

- `api`: Contém a configuração do cliente Axios e as funções para interagir com a API REST.
- `components`: Contém componentes React reutilizáveis.
- `hooks`: Contém hooks personalizados do React.
- `navigation`: Contém a configuração da navegação e as rotas da aplicação.
- `screens`: Contém as telas da aplicação, organizadas por fluxo (autenticação, principal, etc.).
- `state`: Contém a configuração do gerenciamento de estado global (Context API).
- `styles`: Contém estilos globais e temas.
- `utils`: Contém funções utilitárias e constantes.

### Componentes Fundamentais do React Native

React Native oferece um conjunto de componentes fundamentais que são mapeados para os componentes nativos correspondentes de cada plataforma. Os componentes mais comuns incluem:

- `View`: Um contêiner flexível para layout de outros componentes, semelhante a uma `div` em HTML.
- `Text`: Um componente para exibir texto.
- `TextInput`: Um componente para entrada de texto pelo usuário.
- `Button`: Um botão básico que pode ser pressionado.
- `TouchableOpacity`: Um wrapper que torna seus filhos opacos ao toque, fornecendo feedback visual.
- `StyleSheet`: Uma abstração semelhante ao CSS para estilizar componentes.
- `Image`: Um componente para exibir imagens.
- `ScrollView`: Um contêiner que permite rolar seu conteúdo.
- `FlatList`: Um componente otimizado para exibir listas longas de dados.

## Estilização e Temas

### Criação de um Tema Global

Crie um arquivo para definir as cores e fontes do tema da aplicação. Em `src/styles/theme.js`:

```javascript
export const theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    error: '#EF4444',
    success: '#10B981',
    text: '#111827',
    placeholder: '#9CA3AF',
  },
  fonts: {
    regular: 'System',
    bold: 'System',
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
  borderRadius: {
    sm: 4,
    md: 8,
  },
};
```

### Componentes de UI Reutilizáveis

Crie componentes de UI reutilizáveis que utilizem o tema global. Em `src/components/common/StyledTextInput.js`:

```javascript
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const StyledTextInput = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={theme.colors.placeholder}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
});

export default StyledTextInput;
```

Em `src/components/common/StyledButton.js`:

```javascript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../styles/theme';

const StyledButton = ({ title, onPress, style, textStyle, isLoading }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.surface} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StyledButton;
```

## Navegação com React Navigation

### Instalação de Dependências

Instale as dependências necessárias para o React Navigation:

```bash
npm install @react-navigation/native @react-navigation/stack
expo install react-native-screens react-native-safe-area-context
```

### Configuração do Navegador

Crie um navegador de pilha para gerenciar as telas da aplicação. Em `src/navigation/AppNavigator.js`:

```javascript
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../state/AuthContext';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
```

## Gerenciamento de Estado com Context API

### Criação do Contexto de Autenticação

Crie um contexto para gerenciar o estado de autenticação do usuário. Em `src/state/AuthContext.js`:

```javascript
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        console.error('Failed to load stored data', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const login = async (identifier, password) => {
    try {
      const response = await api.post('/auth/login', { identifier, password });
      const { token, user } = response.data.data;

      setToken(token);
      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data.data;

      setToken(token);
      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Integração do Provedor de Autenticação

Envolva a aplicação com o provedor de autenticação. Em `App.js`:

```javascript
import React from 'react';
import { AuthProvider } from './src/state/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
```

## Comunicação com a API

### Configuração do Cliente Axios

Crie uma instância do Axios para se comunicar com a API. Em `src/api/client.js`:

```javascript
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/api', // Use 10.0.2.2 para o emulador Android
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Funções de API

Crie funções para interagir com os endpoints da API. Em `src/api/auth.js`:

```javascript
import { api } from './client';

export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};

export const logoutUser = () => {
  return api.post('/auth/logout');
};
```

## Telas da Aplicação

### Tela de Login

Crie a tela de login. Em `src/screens/auth/LoginScreen.js`:

```javascript
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../state/AuthContext';
import StyledTextInput from '../../components/common/StyledTextInput';
import StyledButton from '../../components/common/StyledButton';
import { theme } from '../../styles/theme';

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    try {
      await login(identifier, password);
    } catch (error) {
      Alert.alert('Erro no Login', 'Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <StyledTextInput
        placeholder="Email ou Username"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      <StyledTextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <StyledButton title="Entrar" onPress={handleLogin} isLoading={isLoading} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Não tem uma conta? Cadastre-se
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.text,
  },
  link: {
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});

export default LoginScreen;
```

### Tela de Registro

Crie a tela de registro. Em `src/screens/auth/RegisterScreen.js`:

```javascript
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { AuthContext } from '../../state/AuthContext';
import StyledTextInput from '../../components/common/StyledTextInput';
import StyledButton from '../../components/common/StyledButton';
import { theme } from '../../styles/theme';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    try {
      await register({ firstName, lastName, username, email, password });
    } catch (error) {
      Alert.alert('Erro no Registro', 'Não foi possível criar a conta. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <StyledTextInput placeholder="Nome" value={firstName} onChangeText={setFirstName} />
      <StyledTextInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} />
      <StyledTextInput placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <StyledTextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <StyledTextInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <StyledButton title="Cadastrar" onPress={handleRegister} isLoading={isLoading} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Já tem uma conta? Entre
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.text,
  },
  link: {
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});

export default RegisterScreen;
```

### Tela de Dashboard

Crie a tela de dashboard. Em `src/screens/main/DashboardScreen.js`:

```javascript
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../state/AuthContext';
import StyledButton from '../../components/common/StyledButton';
import { theme } from '../../styles/theme';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {user?.firstName}!</Text>
      <StyledButton title="Ver Perfil" onPress={() => navigation.navigate('Profile')} />
      <StyledButton title="Sair" onPress={logout} style={{ marginTop: theme.spacing.md, backgroundColor: theme.colors.error }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xl,
    color: theme.colors.text,
  },
});

export default DashboardScreen;
```

## Testes e Debugging

### Ferramentas de Debugging

React Native oferece um menu de desenvolvedor que pode ser acessado agitando o dispositivo ou pressionando `Ctrl+M` (Windows/Linux) ou `Cmd+D` (macOS) no emulador. Este menu oferece opções como:

- **Reload**: Recarrega a aplicação.
- **Debug**: Abre uma aba no navegador com as ferramentas de desenvolvedor do Chrome, permitindo inspecionar o código, definir breakpoints e analisar o tráfego de rede.
- **Performance Monitor**: Exibe um overlay na aplicação com informações de performance, como uso de memória e FPS.

### Testes com Jest

Expo já vem configurado com Jest, um framework de testes para JavaScript. Você pode escrever testes para seus componentes, hooks e funções utilitárias.

Crie um arquivo de teste para uma função utilitária. Em `src/utils/formatters.test.js`:

```javascript
import { capitalize } from './formatters';

test('capitalize should correctly capitalize a string', () => {
  expect(capitalize('hello')).toBe('Hello');
  expect(capitalize('WORLD')).toBe('World');
  expect(capitalize('fOoBaR')).toBe('Foobar');
});
```

Execute os testes com o comando:

```bash
npm test
```

## Build e Deployment

### Build para Android e iOS

Quando sua aplicação estiver pronta para ser distribuída, você pode usar o Expo para criar os arquivos de build para Android (`.apk` ou `.aab`) e iOS (`.ipa`).

Configure o arquivo `app.json` com as informações da sua aplicação, como nome, ícone, splash screen e versão.

Execute o seguinte comando para iniciar o processo de build:

```bash
expo build:android
# ou
expo build:ios
```

O Expo irá solicitar que você faça login em sua conta Expo e, em seguida, irá iniciar o processo de build nos servidores do Expo. Este processo pode levar algum tempo. Ao final, você receberá um link para baixar o arquivo de build.

### Publicação nas Lojas

Com os arquivos de build em mãos, você pode publicá-los na Google Play Store e na Apple App Store. O processo de publicação envolve a criação de uma conta de desenvolvedor em cada plataforma, o preenchimento de informações sobre a aplicação e o envio do arquivo de build para revisão.

Este tutorial forneceu uma visão abrangente de como construir uma aplicação de cadastro de usuários com React Native e Expo. A combinação dessas tecnologias oferece um caminho poderoso e eficiente para o desenvolvimento de aplicações móveis multiplataforma, permitindo que você alcance um público amplo com um único código-base.

