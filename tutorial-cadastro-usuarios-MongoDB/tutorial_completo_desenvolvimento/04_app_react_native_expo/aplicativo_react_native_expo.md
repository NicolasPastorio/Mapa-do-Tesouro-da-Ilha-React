# Tutorial Completo: Aplicativo React Native com Expo Go para Consumo da API de Usuários

**Autor:** Manus AI  
**Data:** Dezembro 2024  
**Versão:** 1.0

## Sumário

1. [Introdução](#introdução)
2. [Configuração do Ambiente Expo](#configuração-do-ambiente-expo)
3. [Estrutura do Projeto React Native](#estrutura-do-projeto-react-native)
4. [Configuração de Navegação](#configuração-de-navegação)
5. [Gerenciamento de Estado](#gerenciamento-de-estado)
6. [Serviços de API](#serviços-de-api)
7. [Sistema de Autenticação](#sistema-de-autenticação)
8. [Componentes de Interface](#componentes-de-interface)
9. [Telas da Aplicação](#telas-da-aplicação)
10. [Estilização e Design](#estilização-e-design)
11. [Funcionalidades Nativas](#funcionalidades-nativas)
12. [Armazenamento Local](#armazenamento-local)
13. [Notificações Push](#notificações-push)
14. [Câmera e Galeria](#câmera-e-galeria)
15. [Testes do Aplicativo](#testes-do-aplicativo)
16. [Build e Deploy](#build-e-deploy)
17. [Referências](#referências)

---

## Introdução

Este tutorial apresenta o desenvolvimento completo de um aplicativo React Native utilizando Expo Go, que consumirá a API REST de usuários desenvolvida anteriormente. O Expo é uma plataforma que simplifica significativamente o desenvolvimento de aplicativos React Native, fornecendo ferramentas, bibliotecas e serviços que aceleram o processo de criação e deploy de aplicações móveis.

### Objetivos do Tutorial

Ao final deste tutorial, você será capaz de:

- Configurar um ambiente de desenvolvimento Expo completo
- Criar aplicativos React Native com Expo CLI
- Implementar navegação entre telas de forma eficiente
- Gerenciar estado da aplicação com Context API e hooks
- Consumir APIs REST de forma otimizada
- Implementar autenticação JWT no React Native
- Utilizar componentes nativos do Expo
- Trabalhar com armazenamento local seguro
- Implementar funcionalidades de câmera e galeria
- Configurar notificações push
- Realizar testes automatizados
- Preparar o aplicativo para publicação

### Vantagens do Expo

O Expo oferece diversas vantagens para o desenvolvimento React Native:

1. **Configuração Simplificada**: Não é necessário configurar Android Studio ou Xcode para desenvolvimento
2. **Bibliotecas Nativas**: Acesso fácil a funcionalidades nativas através de APIs bem documentadas
3. **Hot Reload**: Atualizações instantâneas durante o desenvolvimento
4. **Teste em Dispositivos Reais**: Teste imediato em dispositivos físicos através do Expo Go
5. **Build e Deploy**: Processo simplificado de build e publicação nas lojas
6. **Over-the-Air Updates**: Atualizações do aplicativo sem passar pelas lojas

### Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile multiplataforma
- **Expo SDK**: Conjunto de ferramentas e APIs para React Native
- **React Navigation**: Biblioteca de navegação para React Native
- **Expo Router**: Sistema de roteamento baseado em arquivos
- **Axios**: Cliente HTTP para consumo de APIs
- **React Hook Form**: Gerenciamento de formulários
- **Yup**: Validação de esquemas
- **Expo SecureStore**: Armazenamento seguro de dados
- **Expo Camera**: API de câmera nativa
- **Expo Notifications**: Sistema de notificações push
- **Expo Location**: Serviços de geolocalização
- **React Query**: Gerenciamento de estado do servidor
- **Reanimated**: Animações performáticas
- **Jest**: Framework de testes

### Funcionalidades do Aplicativo

O aplicativo React Native incluirá as seguintes funcionalidades:

1. **Autenticação Completa**
   - Tela de splash animada
   - Login com email e senha
   - Registro de novos usuários
   - Recuperação de senha
   - Autenticação biométrica (quando disponível)
   - Logout seguro

2. **Gerenciamento de Perfil**
   - Visualização de dados do usuário
   - Edição de informações pessoais
   - Upload de foto de perfil
   - Alteração de senha
   - Configurações de privacidade

3. **Interface Nativa**
   - Design seguindo guidelines de cada plataforma
   - Animações fluidas e responsivas
   - Feedback tátil adequado
   - Suporte a modo escuro
   - Acessibilidade implementada

4. **Funcionalidades Avançadas**
   - Sincronização offline
   - Notificações push personalizadas
   - Compartilhamento de conteúdo
   - Geolocalização
   - Integração com câmera e galeria

## Configuração do Ambiente Expo

### Pré-requisitos

Antes de iniciar o desenvolvimento, você precisa configurar o ambiente:

#### Node.js e npm

O Expo requer Node.js versão 16 ou superior:

**Verificação da versão:**
```bash
node --version
npm --version
```

**Instalação (se necessário):**
- Windows/macOS: Baixe de https://nodejs.org/
- Linux: Use o gerenciador de pacotes da sua distribuição

#### Expo CLI

Instale o Expo CLI globalmente:

```bash
# Instalar Expo CLI
npm install -g @expo/cli

# Verificar instalação
expo --version
```

#### Expo Go App

Instale o aplicativo Expo Go no seu dispositivo móvel:

- **Android**: https://play.google.com/store/apps/details?id=host.exp.exponent
- **iOS**: https://apps.apple.com/app/expo-go/id982107779

#### Conta Expo (Opcional)

Crie uma conta gratuita em https://expo.dev para:
- Sincronizar projetos entre dispositivos
- Usar serviços de build e deploy
- Acessar analytics e crash reports

```bash
# Fazer login na conta Expo
expo login
```

### Criação do Projeto

Agora vamos criar o projeto React Native com Expo:

```bash
# Criar novo projeto
expo init UsuariosAppRN

# Escolher template (selecione "blank (TypeScript)")
# Navegar para o diretório
cd UsuariosAppRN

# Instalar dependências adicionais
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @react-hook-form/resolvers react-hook-form yup
npm install axios @tanstack/react-query
npm install expo-secure-store expo-camera expo-image-picker
npm install expo-notifications expo-device expo-constants
npm install expo-location expo-haptics expo-local-authentication
npm install react-native-reanimated react-native-gesture-handler
npm install expo-splash-screen expo-status-bar
```

### Configuração Inicial

#### app.json

Configure o arquivo `app.json` com as informações do projeto:

```json
{
  "expo": {
    "name": "Usuários App",
    "slug": "usuarios-app-rn",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.exemplo.usuariosapp",
      "infoPlist": {
        "NSCameraUsageDescription": "Este app precisa acessar a câmera para capturar fotos de perfil.",
        "NSPhotoLibraryUsageDescription": "Este app precisa acessar a galeria para selecionar fotos de perfil.",
        "NSLocationWhenInUseUsageDescription": "Este app precisa acessar sua localização para funcionalidades baseadas em localização.",
        "NSFaceIDUsageDescription": "Este app usa Face ID para autenticação biométrica."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.exemplo.usuariosapp",
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "USE_FINGERPRINT",
        "USE_BIOMETRIC"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-camera",
      "expo-image-picker",
      "expo-notifications",
      "expo-location",
      "expo-local-authentication",
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "buildToolsVersion": "34.0.0"
          },
          "ios": {
            "deploymentTarget": "13.0"
          }
        }
      ]
    ],
    "extra": {
      "apiUrl": "http://192.168.1.100:3000/api",
      "eas": {
        "projectId": "seu-project-id-aqui"
      }
    }
  }
}
```

#### Configuração do TypeScript

Crie o arquivo `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/screens/*": ["src/screens/*"],
      "@/services/*": ["src/services/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/constants/*": ["src/constants/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/contexts/*": ["src/contexts/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

## Estrutura do Projeto React Native

### Organização de Diretórios

Vamos organizar o projeto de forma escalável e maintível:

```
src/
├── components/          # Componentes reutilizáveis
│   ├── common/         # Componentes comuns (Button, Input, etc.)
│   ├── forms/          # Componentes de formulário
│   └── ui/             # Componentes de interface específicos
├── screens/            # Telas da aplicação
│   ├── auth/          # Telas de autenticação
│   ├── main/          # Telas principais
│   └── profile/       # Telas de perfil
├── navigation/         # Configuração de navegação
├── services/          # Serviços de API
├── contexts/          # Contexts do React
├── hooks/             # Custom hooks
├── utils/             # Funções utilitárias
├── types/             # Definições de tipos TypeScript
├── constants/         # Constantes da aplicação
├── styles/            # Estilos globais
└── assets/            # Imagens, ícones, etc.
```

### Tipos TypeScript

Crie o arquivo `src/types/index.ts`:

```typescript
// Tipos de usuário
export interface User {
  _id: string;
  nome: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
  endereco?: {
    rua?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };
  perfil: 'usuario' | 'admin' | 'moderador';
  isActive: boolean;
  emailVerificado: boolean;
  ultimoLogin?: string;
  createdAt: string;
  updatedAt: string;
  fotoPerfil?: string;
  idade?: number;
  enderecoCompleto?: string;
}

// Tipos de autenticação
export interface AuthResponse {
  sucesso: boolean;
  mensagem: string;
  dados: {
    usuario: User;
    token: string;
    refreshToken: string;
    expiresIn: string;
  };
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  telefone?: string;
  dataNascimento?: string;
}

// Tipos de resposta da API
export interface ApiResponse<T = any> {
  sucesso: boolean;
  mensagem: string;
  dados?: T;
  erros?: Array<{
    campo: string;
    valor: any;
    mensagem: string;
  }>;
}

// Tipos de navegação
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Tipos de contexto
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshToken: () => Promise<void>;
}

// Tipos de notificação
export interface NotificationContextType {
  showNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

// Tipos de tema
export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ColorScheme;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}
```

### Constantes

Crie o arquivo `src/constants/index.ts`:

```typescript
import Constants from 'expo-constants';

export const API_CONFIG = {
  BASE_URL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
  THEME: 'app_theme',
  BIOMETRIC_ENABLED: 'biometric_enabled',
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo é obrigatório',
  EMAIL_INVALID: 'Email deve ser válido',
  PASSWORD_MIN: 'Senha deve ter pelo menos 6 caracteres',
  PASSWORD_MISMATCH: 'Senhas não coincidem',
  PHONE_INVALID: 'Telefone deve estar em formato válido',
  DATE_INVALID: 'Data deve ser válida',
  NAME_MIN: 'Nome deve ter pelo menos 2 caracteres',
  NAME_MAX: 'Nome deve ter no máximo 50 caracteres',
};

export const COLORS = {
  light: {
    primary: '#2563EB',
    secondary: '#64748B',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
  dark: {
    primary: '#3B82F6',
    secondary: '#94A3B8',
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
    info: '#60A5FA',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const SCREEN_NAMES = {
  SPLASH: 'Splash',
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  DASHBOARD: 'Dashboard',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
} as const;
```

## Configuração de Navegação

### Navegação Principal

Crie o arquivo `src/navigation/AppNavigator.tsx`:

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

// Screens
import SplashScreen from '@/screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Types
import { RootStackParamList } from '@/types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { isDark } = useTheme();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
```

### Navegação de Autenticação

Crie o arquivo `src/navigation/AuthNavigator.tsx`:

```typescript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@/hooks/useTheme';

// Screens
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import ForgotPasswordScreen from '@/screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '@/screens/auth/ResetPasswordScreen';

// Types
import { AuthStackParamList } from '@/types';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerBackTitleVisible: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Criar Conta',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: 'Recuperar Senha',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          title: 'Nova Senha',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
```

### Navegação Principal com Tabs

Crie o arquivo `src/navigation/MainNavigator.tsx`:

```typescript
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

// Screens
import DashboardScreen from '@/screens/main/DashboardScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import SettingsScreen from '@/screens/main/SettingsScreen';

// Types
import { MainTabParamList } from '@/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.surface,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Início',
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Configurações',
          tabBarLabel: 'Config.',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
```

## Gerenciamento de Estado

### Context de Autenticação

Crie o arquivo `src/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, AuthContextType, LoginCredentials, RegisterData } from '@/types';
import { authService } from '@/services/authService';
import { STORAGE_KEYS } from '@/constants';

// Estado inicial
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

// Actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'REFRESH_TOKEN_SUCCESS'; payload: string };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'REFRESH_TOKEN_SUCCESS':
      return {
        ...state,
        token: action.payload,
      };
    
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar token armazenado na inicialização
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
        const userData = await SecureStore.getItemAsync(STORAGE_KEYS.USER);

        if (token && userData) {
          const user = JSON.parse(userData);
          
          // Verificar se o token ainda é válido
          try {
            await authService.verifyToken();
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
          } catch (error) {
            // Token inválido, tentar renovar
            try {
              const newToken = await authService.refreshToken();
              dispatch({ type: 'REFRESH_TOKEN_SUCCESS', payload: newToken });
              dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token: newToken } });
            } catch (refreshError) {
              // Não foi possível renovar, fazer logout
              await logout();
            }
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await authService.login(credentials);
      const { usuario, token, refreshToken } = response.dados;

      // Armazenar dados no SecureStore
      await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, token);
      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(usuario));

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: usuario, token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await authService.register(data);
      const { usuario, token, refreshToken } = response.dados;

      // Armazenar dados no SecureStore
      await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, token);
      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(usuario));

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: usuario, token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Fazer logout no servidor
      await authService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error);
    } finally {
      // Remover dados do SecureStore
      await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER);

      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateUser = (userData: Partial<User>): void => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const newToken = await authService.refreshToken();
      await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, newToken);
      dispatch({ type: 'REFRESH_TOKEN_SUCCESS', payload: newToken });
    } catch (error) {
      await logout();
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    register,
    logout,
    updateUser,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
```

### Context de Tema

Crie o arquivo `src/contexts/ThemeContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ThemeContextType, ColorScheme } from '@/types';
import { COLORS, STORAGE_KEYS } from '@/constants';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const savedTheme = await SecureStore.getItemAsync(STORAGE_KEYS.THEME);
        
        if (savedTheme) {
          setIsDark(savedTheme === 'dark');
        } else {
          // Usar tema do sistema se não houver preferência salva
          const systemTheme = Appearance.getColorScheme();
          setIsDark(systemTheme === 'dark');
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error);
        // Fallback para tema claro
        setIsDark(false);
      }
    };

    initializeTheme();

    // Listener para mudanças no tema do sistema
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Só aplicar se não houver preferência manual salva
      SecureStore.getItemAsync(STORAGE_KEYS.THEME).then((savedTheme) => {
        if (!savedTheme) {
          setIsDark(colorScheme === 'dark');
        }
      });
    });

    return () => subscription?.remove();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    try {
      await SecureStore.setItemAsync(
        STORAGE_KEYS.THEME, 
        newTheme ? 'dark' : 'light'
      );
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  const colors: ColorScheme = isDark ? COLORS.dark : COLORS.light;

  const contextValue: ThemeContextType = {
    isDark,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
```

## Serviços de API

### Cliente HTTP

Crie o arquivo `src/services/api.ts`:

```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_CONFIG, STORAGE_KEYS } from '@/constants';

class ApiClient {
  private client: AxiosInstance;
  private refreshTokenCallback?: () => Promise<void>;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Interceptador de requisição
    this.client.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptador de resposta
    this.client.interceptors.response.use(
      (response) => {
        // Verificar se precisa renovar token
        if (response.headers['x-token-refresh-needed'] === 'true') {
          this.refreshTokenCallback?.();
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Se o token expirou e não é uma tentativa de renovação
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          originalRequest.url !== '/auth/renovar-token'
        ) {
          originalRequest._retry = true;

          try {
            if (this.refreshTokenCallback) {
              await this.refreshTokenCallback();
              // Tentar novamente com o novo token
              const newToken = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
              if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return this.client(originalRequest);
              }
            }
          } catch (refreshError) {
            // Falha na renovação, limpar dados e redirecionar para login
            await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN);
            await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
            await SecureStore.deleteItemAsync(STORAGE_KEYS.USER);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public setRefreshTokenCallback(callback: () => Promise<void>): void {
    this.refreshTokenCallback = callback;
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get(url, config);
  }

  public async post<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, config);
  }

  public async put<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put(url, data, config);
  }

  public async patch<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch(url, data, config);
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete(url, config);
  }
}

export const apiClient = new ApiClient();
```

### Serviço de Autenticação

Crie o arquivo `src/services/authService.ts`:

```typescript
import * as SecureStore from 'expo-secure-store';
import { apiClient } from './api';
import { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  ApiResponse 
} from '@/types';
import { STORAGE_KEYS } from '@/constants';

class AuthService {
  private refreshTokenCallback?: () => Promise<void>;

  public setupTokenRefresh(callback: () => Promise<void>): void {
    this.refreshTokenCallback = callback;
    apiClient.setRefreshTokenCallback(callback);
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/registrar', data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async logout(): Promise<void> {
    try {
      const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      // Ignorar erros de logout no servidor
      console.warn('Erro ao fazer logout no servidor:', error);
    }
  }

  public async refreshToken(): Promise<string> {
    try {
      const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
      
      if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
      }

      const response = await apiClient.post<AuthResponse>('/auth/renovar-token', {
        refreshToken,
      });

      const { token, refreshToken: newRefreshToken } = response.data.dados;
      
      // Atualizar refresh token se fornecido
      if (newRefreshToken) {
        await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
      }

      return token;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async verifyToken(): Promise<void> {
    try {
      await apiClient.get('/users/perfil');
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/solicitar-reset-senha', {
        email,
      });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async resetPassword(token: string, novaSenha: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/reset-senha', {
        token,
        novaSenha,
      });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async changePassword(senhaAtual: string, novaSenha: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/alterar-senha', {
        senhaAtual,
        novaSenha,
      });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response?.data?.mensagem) {
      return new Error(error.response.data.mensagem);
    }
    
    if (error.response?.data?.erros) {
      const errorMessages = error.response.data.erros
        .map((err: any) => err.mensagem)
        .join(', ');
      return new Error(errorMessages);
    }

    if (error.message) {
      return new Error(error.message);
    }

    return new Error('Erro desconhecido');
  }
}

export const authService = new AuthService();
```


### Serviço de Usuário

Crie o arquivo `src/services/userService.ts`:

```typescript
import { apiClient } from './api';
import { User, ApiResponse } from '@/types';

class UserService {
  public async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/users/perfil');
      return response.data.dados!;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>('/users/perfil', userData);
      return response.data.dados!;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async uploadProfilePhoto(photoUri: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('foto', {
        uri: photoUri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      } as any);

      const response = await apiClient.post<ApiResponse<{ url: string }>>(
        '/users/upload-foto',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.dados!.url;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async deactivateAccount(): Promise<void> {
    try {
      await apiClient.delete('/users/perfil');
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response?.data?.mensagem) {
      return new Error(error.response.data.mensagem);
    }
    
    if (error.response?.data?.erros) {
      const errorMessages = error.response.data.erros
        .map((err: any) => err.mensagem)
        .join(', ');
      return new Error(errorMessages);
    }

    if (error.message) {
      return new Error(error.message);
    }

    return new Error('Erro desconhecido');
  }
}

export const userService = new UserService();
```

## Sistema de Autenticação

### Hook de Autenticação

Crie o arquivo `src/hooks/useAuth.ts`:

```typescript
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/types';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
```

### Hook de Autenticação Biométrica

Crie o arquivo `src/hooks/useBiometric.ts`:

```typescript
import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '@/constants';

interface BiometricState {
  isAvailable: boolean;
  isEnabled: boolean;
  supportedTypes: LocalAuthentication.AuthenticationType[];
}

export const useBiometric = () => {
  const [biometricState, setBiometricState] = useState<BiometricState>({
    isAvailable: false,
    isEnabled: false,
    supportedTypes: [],
  });

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const isEnabled = await getBiometricEnabled();

      setBiometricState({
        isAvailable: hasHardware && isEnrolled,
        isEnabled,
        supportedTypes,
      });
    } catch (error) {
      console.error('Erro ao verificar biometria:', error);
    }
  };

  const authenticate = async (): Promise<boolean> => {
    try {
      if (!biometricState.isAvailable) {
        throw new Error('Autenticação biométrica não disponível');
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se para continuar',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar senha',
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error('Erro na autenticação biométrica:', error);
      return false;
    }
  };

  const enableBiometric = async (): Promise<void> => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.BIOMETRIC_ENABLED, 'true');
      setBiometricState(prev => ({ ...prev, isEnabled: true }));
    } catch (error) {
      console.error('Erro ao habilitar biometria:', error);
      throw error;
    }
  };

  const disableBiometric = async (): Promise<void> => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.BIOMETRIC_ENABLED, 'false');
      setBiometricState(prev => ({ ...prev, isEnabled: false }));
    } catch (error) {
      console.error('Erro ao desabilitar biometria:', error);
      throw error;
    }
  };

  const getBiometricEnabled = async (): Promise<boolean> => {
    try {
      const enabled = await SecureStore.getItemAsync(STORAGE_KEYS.BIOMETRIC_ENABLED);
      return enabled === 'true';
    } catch (error) {
      return false;
    }
  };

  const getBiometricTypeText = (): string => {
    if (biometricState.supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return 'Face ID';
    }
    if (biometricState.supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return 'Touch ID';
    }
    if (biometricState.supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      return 'Íris';
    }
    return 'Biometria';
  };

  return {
    ...biometricState,
    authenticate,
    enableBiometric,
    disableBiometric,
    getBiometricTypeText,
    checkBiometricAvailability,
  };
};
```

## Componentes de Interface

### Componente de Botão

Crie o arquivo `src/components/common/Button.tsx`:

```typescript
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BORDER_RADIUS.md,
      opacity: disabled || loading ? 0.6 : 1,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingHorizontal = SPACING.sm;
        baseStyle.paddingVertical = SPACING.xs;
        baseStyle.minHeight = 36;
        break;
      case 'large':
        baseStyle.paddingHorizontal = SPACING.xl;
        baseStyle.paddingVertical = SPACING.md;
        baseStyle.minHeight = 52;
        break;
      default:
        baseStyle.paddingHorizontal = SPACING.lg;
        baseStyle.paddingVertical = SPACING.sm;
        baseStyle.minHeight = 44;
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.primary;
        break;
      case 'danger':
        baseStyle.backgroundColor = colors.error;
        break;
      default:
        baseStyle.backgroundColor = colors.primary;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.fontSize = FONT_SIZES.sm;
        break;
      case 'large':
        baseStyle.fontSize = FONT_SIZES.lg;
        break;
      default:
        baseStyle.fontSize = FONT_SIZES.md;
    }

    // Variant styles
    switch (variant) {
      case 'outline':
        baseStyle.color = colors.primary;
        break;
      default:
        baseStyle.color = '#FFFFFF';
    }

    return baseStyle;
  };

  const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
  const iconColor = variant === 'outline' ? colors.primary : '#FFFFFF';

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={iconColor}
              style={{ marginRight: SPACING.xs }}
            />
          )}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={iconColor}
              style={{ marginLeft: SPACING.xs }}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
```

### Componente de Input

Crie o arquivo `src/components/common/Input.tsx`:

```typescript
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  isPassword = false,
  containerStyle,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getContainerStyle = (): ViewStyle => ({
    marginBottom: SPACING.md,
  });

  const getInputContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: colors.surface,
    paddingHorizontal: SPACING.sm,
    minHeight: 48,
  });

  const getInputStyle = (): ViewStyle => ({
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: colors.text,
    paddingVertical: SPACING.sm,
  });

  const getLabelStyle = (): ViewStyle => ({
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: colors.text,
    marginBottom: SPACING.xs,
  });

  const getHelperTextStyle = (): ViewStyle => ({
    fontSize: FONT_SIZES.xs,
    color: error ? colors.error : colors.textSecondary,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  });

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={colors.textSecondary}
            style={{ marginRight: SPACING.xs }}
          />
        )}
        
        <TextInput
          style={[getInputStyle(), style]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !isPassword && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons
              name={rightIcon}
              size={20}
              color={colors.textSecondary}
              style={{ marginLeft: SPACING.xs }}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {(error || helperText) && (
        <Text style={getHelperTextStyle()}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

export default Input;
```

### Componente de Loading

Crie o arquivo `src/components/common/Loading.tsx`:

```typescript
import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { SPACING, FONT_SIZES } from '@/constants';

interface LoadingProps {
  visible: boolean;
  message?: string;
  overlay?: boolean;
  size?: 'small' | 'large';
  style?: ViewStyle;
}

const Loading: React.FC<LoadingProps> = ({
  visible,
  message = 'Carregando...',
  overlay = true,
  size = 'large',
  style,
}) => {
  const { colors } = useTheme();

  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: overlay ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
  });

  const getContentStyle = (): ViewStyle => ({
    backgroundColor: colors.surface,
    padding: SPACING.xl,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  });

  const getTextStyle = (): ViewStyle => ({
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: colors.text,
    textAlign: 'center',
  });

  if (!visible) return null;

  const content = (
    <View style={getContentStyle()}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={getTextStyle()}>{message}</Text>}
    </View>
  );

  if (overlay) {
    return (
      <Modal transparent visible={visible} animationType="fade">
        <View style={[getContainerStyle(), style]}>
          {content}
        </View>
      </Modal>
    );
  }

  return (
    <View style={[getContainerStyle(), style]}>
      {content}
    </View>
  );
};

export default Loading;
```

### Componente de Notificação

Crie o arquivo `src/components/common/Notification.tsx`:

```typescript
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

interface NotificationProps {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onHide: () => void;
}

const { width } = Dimensions.get('window');

const Notification: React.FC<NotificationProps> = ({
  visible,
  message,
  type,
  duration = 4000,
  onHide,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Mostrar notificação
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide após duration
      const timer = setTimeout(() => {
        hideNotification();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideNotification = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getNotificationColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'info':
        return colors.info;
      default:
        return colors.primary;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      case 'warning':
        return 'warning';
      case 'info':
        return 'information-circle';
      default:
        return 'information-circle';
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: insets.top + SPACING.sm,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.notification,
          {
            backgroundColor: colors.surface,
            borderLeftColor: getNotificationColor(),
            shadowColor: colors.text,
          },
        ]}
      >
        <Ionicons
          name={getIcon()}
          size={24}
          color={getNotificationColor()}
          style={styles.icon}
        />
        
        <Text
          style={[
            styles.message,
            { color: colors.text }
          ]}
          numberOfLines={3}
        >
          {message}
        </Text>
        
        <TouchableOpacity
          onPress={hideNotification}
          style={styles.closeButton}
        >
          <Ionicons
            name="close"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: SPACING.md,
    right: SPACING.md,
    zIndex: 9999,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  message: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    lineHeight: 20,
  },
  closeButton: {
    marginLeft: SPACING.sm,
    padding: SPACING.xs,
  },
});

export default Notification;
```

## Telas da Aplicação

### Tela de Splash

Crie o arquivo `src/screens/SplashScreen.tsx`:

```typescript
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';
import { FONT_SIZES, SPACING } from '@/constants';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={[styles.logo, { backgroundColor: colors.surface }]}>
          <Text style={[styles.logoText, { color: colors.primary }]}>
            U
          </Text>
        </View>
        
        <Text style={styles.appName}>Usuários App</Text>
        <Text style={styles.tagline}>Gerencie seus dados com segurança</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: FONT_SIZES.md,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
});

export default SplashScreen;
```

### Tela de Login

Crie o arquivo `src/screens/auth/LoginScreen.tsx`:

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';
import { useBiometric } from '@/hooks/useBiometric';
import { useTheme } from '@/hooks/useTheme';
import { AuthStackParamList, LoginCredentials } from '@/types';
import { SPACING, FONT_SIZES, VALIDATION_MESSAGES } from '@/constants';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Loading from '@/components/common/Loading';
import Notification from '@/components/common/Notification';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL_INVALID),
  senha: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .min(6, VALIDATION_MESSAGES.PASSWORD_MIN),
});

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { login } = useAuth();
  const { isAvailable: biometricAvailable, isEnabled: biometricEnabled, authenticate } = useBiometric();
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    visible: false,
    message: '',
    type: 'info',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({ visible: true, message, type });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));
  };

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setIsLoading(true);
      await login(data);
      showNotification('Login realizado com sucesso!', 'success');
    } catch (error: any) {
      showNotification(error.message || 'Erro ao fazer login', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const success = await authenticate();
      if (success) {
        // Aqui você implementaria a lógica para fazer login com biometria
        // Por exemplo, usar credenciais salvas de forma segura
        showNotification('Login biométrico realizado com sucesso!', 'success');
      }
    } catch (error: any) {
      showNotification('Erro na autenticação biométrica', 'error');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + SPACING.xl }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Bem-vindo de volta!
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Faça login para continuar
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="Digite seu email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                leftIcon="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.senha?.message}
                leftIcon="lock-closed"
                isPassword
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>

          <Button
            title="Entrar"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.loginButton}
          />

          {biometricAvailable && biometricEnabled && (
            <Button
              title="Entrar com Biometria"
              onPress={handleBiometricLogin}
              variant="outline"
              icon="finger-print"
              style={styles.biometricButton}
            />
          )}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Não tem uma conta?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Loading visible={isLoading} message="Fazendo login..." />
      
      <Notification
        visible={notification.visible}
        message={notification.message}
        type={notification.type}
        onHide={hideNotification}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.xl,
  },
  forgotPasswordText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: SPACING.md,
  },
  biometricButton: {
    marginBottom: SPACING.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  footerText: {
    fontSize: FONT_SIZES.md,
  },
  footerLink: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default LoginScreen;
```

### Tela de Registro

Crie o arquivo `src/screens/auth/RegisterScreen.tsx`:

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { AuthStackParamList, RegisterData } from '@/types';
import { SPACING, FONT_SIZES, VALIDATION_MESSAGES } from '@/constants';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Loading from '@/components/common/Loading';
import Notification from '@/components/common/Notification';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const schema = yup.object().shape({
  nome: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .min(2, VALIDATION_MESSAGES.NAME_MIN)
    .max(50, VALIDATION_MESSAGES.NAME_MAX),
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL_INVALID),
  senha: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .min(6, VALIDATION_MESSAGES.PASSWORD_MIN),
  confirmarSenha: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .oneOf([yup.ref('senha')], VALIDATION_MESSAGES.PASSWORD_MISMATCH),
  telefone: yup
    .string()
    .matches(
      /^(\+55\s?)?((\d{2})\s?)?(\d{4,5})-?(\d{4})$/,
      VALIDATION_MESSAGES.PHONE_INVALID
    )
    .optional(),
});

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { register } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    visible: false,
    message: '',
    type: 'info',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      telefone: '',
    },
  });

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({ visible: true, message, type });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));
  };

  const onSubmit = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      await register(data);
      showNotification('Conta criada com sucesso!', 'success');
    } catch (error: any) {
      showNotification(error.message || 'Erro ao criar conta', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Criar Conta
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Preencha os dados para criar sua conta
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Nome Completo"
                placeholder="Digite seu nome completo"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.nome?.message}
                leftIcon="person"
                autoCapitalize="words"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="Digite seu email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                leftIcon="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Telefone (Opcional)"
                placeholder="(11) 99999-9999"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.telefone?.message}
                leftIcon="call"
                keyboardType="phone-pad"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.senha?.message}
                leftIcon="lock-closed"
                isPassword
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmarSenha"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirmar Senha"
                placeholder="Confirme sua senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmarSenha?.message}
                leftIcon="lock-closed"
                isPassword
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Button
            title="Criar Conta"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.registerButton}
          />
        </View>
      </ScrollView>

      <Loading visible={isLoading} message="Criando conta..." />
      
      <Notification
        visible={notification.visible}
        message={notification.message}
        type={notification.type}
        onHide={hideNotification}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  registerButton: {
    marginTop: SPACING.lg,
  },
});

export default RegisterScreen;
```

## Estilização e Design

### Sistema de Cores Dinâmico

Crie o arquivo `src/utils/colorUtils.ts`:

```typescript
import { ColorScheme } from '@/types';

export const generateColorVariants = (baseColor: string): Record<string, string> => {
  // Função para converter hex para HSL
  const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number, l: number;

    l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  // Função para converter HSL para hex
  const hslToHex = (h: number, s: number, l: number): string => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number): string => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const [h, s, l] = hexToHsl(baseColor);

  return {
    50: hslToHex(h, s, Math.min(95, l + 40)),
    100: hslToHex(h, s, Math.min(90, l + 30)),
    200: hslToHex(h, s, Math.min(80, l + 20)),
    300: hslToHex(h, s, Math.min(70, l + 10)),
    400: hslToHex(h, s, l),
    500: baseColor,
    600: hslToHex(h, s, Math.max(10, l - 10)),
    700: hslToHex(h, s, Math.max(5, l - 20)),
    800: hslToHex(h, s, Math.max(3, l - 30)),
    900: hslToHex(h, s, Math.max(1, l - 40)),
  };
};

export const getContrastColor = (backgroundColor: string): string => {
  // Remover # se presente
  const hex = backgroundColor.replace('#', '');
  
  // Converter para RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calcular luminância
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Retornar cor contrastante
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export const adjustColorOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
```

## Funcionalidades Nativas

### Hook de Câmera

Crie o arquivo `src/hooks/useCamera.ts`:

```typescript
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

interface CameraOptions {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
}

export const useCamera = () => {
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      if (cameraPermission.status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'É necessário permitir o acesso à câmera para capturar fotos.',
          [{ text: 'OK' }]
        );
        return false;
      }

      if (mediaLibraryPermission.status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'É necessário permitir o acesso à galeria para selecionar fotos.',
          [{ text: 'OK' }]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
      return false;
    }
  };

  const takePhoto = async (options: CameraOptions = {}): Promise<string | null> => {
    try {
      setIsLoading(true);

      const hasPermission = await requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: options.allowsEditing ?? true,
        aspect: options.aspect ?? [1, 1],
        quality: options.quality ?? 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error('Erro ao capturar foto:', error);
      Alert.alert('Erro', 'Não foi possível capturar a foto.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const pickFromGallery = async (options: CameraOptions = {}): Promise<string | null> => {
    try {
      setIsLoading(true);

      const hasPermission = await requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: options.allowsEditing ?? true,
        aspect: options.aspect ?? [1, 1],
        quality: options.quality ?? 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error('Erro ao selecionar foto:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a foto.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const showImagePicker = (): Promise<string | null> => {
    return new Promise((resolve) => {
      Alert.alert(
        'Selecionar Foto',
        'Escolha uma opção:',
        [
          {
            text: 'Câmera',
            onPress: async () => {
              const uri = await takePhoto();
              resolve(uri);
            },
          },
          {
            text: 'Galeria',
            onPress: async () => {
              const uri = await pickFromGallery();
              resolve(uri);
            },
          },
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => resolve(null),
          },
        ]
      );
    });
  };

  return {
    isLoading,
    takePhoto,
    pickFromGallery,
    showImagePicker,
    requestPermissions,
  };
};
```

## Armazenamento Local

### Hook de Armazenamento Seguro

Crie o arquivo `src/hooks/useSecureStorage.ts`:

```typescript
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const useSecureStorage = <T>(key: string, defaultValue?: T) => {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadValue();
  }, [key]);

  const loadValue = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const storedValue = await SecureStore.getItemAsync(key);
      
      if (storedValue !== null) {
        try {
          const parsedValue = JSON.parse(storedValue);
          setValue(parsedValue);
        } catch (parseError) {
          // Se não conseguir fazer parse, assumir que é string
          setValue(storedValue as T);
        }
      } else {
        setValue(defaultValue);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
      setValue(defaultValue);
    } finally {
      setIsLoading(false);
    }
  };

  const storeValue = async (newValue: T) => {
    try {
      setError(null);
      
      const valueToStore = typeof newValue === 'string' 
        ? newValue 
        : JSON.stringify(newValue);
      
      await SecureStore.setItemAsync(key, valueToStore);
      setValue(newValue);
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar dados');
      throw err;
    }
  };

  const removeValue = async () => {
    try {
      setError(null);
      await SecureStore.deleteItemAsync(key);
      setValue(defaultValue);
    } catch (err: any) {
      setError(err.message || 'Erro ao remover dados');
      throw err;
    }
  };

  return {
    value,
    isLoading,
    error,
    setValue: storeValue,
    removeValue,
    reloadValue: loadValue,
  };
};
```

## Notificações Push

### Configuração de Notificações

Crie o arquivo `src/services/notificationService.ts`:

```typescript
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configurar comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  private expoPushToken: string | null = null;

  public async initialize(): Promise<string | null> {
    try {
      if (!Device.isDevice) {
        console.warn('Notificações push só funcionam em dispositivos físicos');
        return null;
      }

      // Solicitar permissões
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('Permissão para notificações não concedida');
        return null;
      }

      // Obter token do Expo
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      this.expoPushToken = token.data;

      // Configurar canal de notificação para Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      return this.expoPushToken;
    } catch (error) {
      console.error('Erro ao inicializar notificações:', error);
      return null;
    }
  }

  public getExpoPushToken(): string | null {
    return this.expoPushToken;
  }

  public async scheduleLocalNotification(
    title: string,
    body: string,
    trigger?: Notifications.NotificationTriggerInput
  ): Promise<string> {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
        },
        trigger: trigger || null,
      });

      return notificationId;
    } catch (error) {
      console.error('Erro ao agendar notificação local:', error);
      throw error;
    }
  }

  public async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Erro ao cancelar notificação:', error);
      throw error;
    }
  }

  public async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Erro ao cancelar todas as notificações:', error);
      throw error;
    }
  }

  public async getBadgeCount(): Promise<number> {
    try {
      return await Notifications.getBadgeCountAsync();
    } catch (error) {
      console.error('Erro ao obter badge count:', error);
      return 0;
    }
  }

  public async setBadgeCount(count: number): Promise<void> {
    try {
      await Notifications.setBadgeCountAsync(count);
    } catch (error) {
      console.error('Erro ao definir badge count:', error);
    }
  }

  public addNotificationReceivedListener(
    listener: (notification: Notifications.Notification) => void
  ): Notifications.Subscription {
    return Notifications.addNotificationReceivedListener(listener);
  }

  public addNotificationResponseReceivedListener(
    listener: (response: Notifications.NotificationResponse) => void
  ): Notifications.Subscription {
    return Notifications.addNotificationResponseReceivedListener(listener);
  }
}

export const notificationService = new NotificationService();
```

## Testes do Aplicativo

### Configuração de Testes

Crie o arquivo `jest.config.js`:

```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
    '!src/**/*.stories.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo|@expo|@unimodules)',
  ],
};
```

### Arquivo de Setup de Testes

Crie o arquivo `src/test/setup.ts`:

```typescript
import 'react-native-gesture-handler/jestSetup';

// Mock do Expo SecureStore
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock do Expo Notifications
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  getExpoPushTokenAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  getBadgeCountAsync: jest.fn(),
  setBadgeCountAsync: jest.fn(),
  addNotificationReceivedListener: jest.fn(),
  addNotificationResponseReceivedListener: jest.fn(),
}));

// Mock do Expo Camera
jest.mock('expo-image-picker', () => ({
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: {
    Images: 'Images',
  },
}));

// Mock do React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}));

// Silenciar warnings específicos do teste
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
```

### Teste de Componente

Crie o arquivo `src/components/common/__tests__/Button.test.tsx`:

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';
import { ThemeProvider } from '@/contexts/ThemeContext';

const MockedThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Button Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders correctly with title', () => {
    const { getByText } = render(
      <MockedThemeProvider>
        <Button title="Test Button" onPress={mockOnPress} />
      </MockedThemeProvider>
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <MockedThemeProvider>
        <Button title="Test Button" onPress={mockOnPress} />
      </MockedThemeProvider>
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const { getByText } = render(
      <MockedThemeProvider>
        <Button title="Test Button" onPress={mockOnPress} disabled />
      </MockedThemeProvider>
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const { getByTestId } = render(
      <MockedThemeProvider>
        <Button title="Test Button" onPress={mockOnPress} loading />
      </MockedThemeProvider>
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { rerender, getByText } = render(
      <MockedThemeProvider>
        <Button title="Primary" onPress={mockOnPress} variant="primary" />
      </MockedThemeProvider>
    );

    expect(getByText('Primary')).toBeTruthy();

    rerender(
      <MockedThemeProvider>
        <Button title="Secondary" onPress={mockOnPress} variant="secondary" />
      </MockedThemeProvider>
    );

    expect(getByText('Secondary')).toBeTruthy();
  });
});
```

## Build e Deploy

### Configuração do EAS Build

Crie o arquivo `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.9.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Scripts de Build

Atualize o arquivo `package.json` com scripts úteis:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "build:development": "eas build --profile development",
    "build:preview": "eas build --profile preview",
    "build:production": "eas build --profile production",
    "submit:ios": "eas submit --platform ios",
    "submit:android": "eas submit --platform android"
  }
}
```

### Configuração de Deploy

Para fazer deploy do aplicativo:

1. **Configurar EAS CLI:**
```bash
npm install -g eas-cli
eas login
```

2. **Configurar projeto:**
```bash
eas build:configure
```

3. **Build para desenvolvimento:**
```bash
eas build --profile development --platform all
```

4. **Build para produção:**
```bash
eas build --profile production --platform all
```

5. **Submeter para as lojas:**
```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

## Referências

[1] Expo Documentation - https://docs.expo.dev/
[2] React Native Documentation - https://reactnative.dev/docs/getting-started
[3] React Navigation - https://reactnavigation.org/
[4] React Hook Form - https://react-hook-form.com/
[5] Yup Validation - https://github.com/jquense/yup
[6] Expo SecureStore - https://docs.expo.dev/versions/latest/sdk/securestore/
[7] Expo Notifications - https://docs.expo.dev/versions/latest/sdk/notifications/
[8] Expo Camera - https://docs.expo.dev/versions/latest/sdk/camera/
[9] Expo Image Picker - https://docs.expo.dev/versions/latest/sdk/imagepicker/
[10] Jest Testing Framework - https://jestjs.io/docs/getting-started
[11] React Native Testing Library - https://callstack.github.io/react-native-testing-library/
[12] EAS Build - https://docs.expo.dev/build/introduction/
[13] EAS Submit - https://docs.expo.dev/submit/introduction/
[14] Expo Go - https://expo.dev/client
[15] TypeScript Documentation - https://www.typescriptlang.org/docs/

---

**Conclusão**

Este tutorial apresentou um guia completo para o desenvolvimento de um aplicativo React Native moderno utilizando Expo Go. A implementação abrange desde a configuração inicial do ambiente até funcionalidades avançadas como autenticação biométrica, notificações push e integração com câmera.

O aplicativo desenvolvido oferece uma experiência de usuário nativa e fluida, com arquitetura bem estruturada que facilita a manutenção e evolução do código. O uso do Expo simplifica significativamente o processo de desenvolvimento, permitindo acesso fácil a APIs nativas e um fluxo de build e deploy otimizado.

As tecnologias e padrões utilizados garantem que o aplicativo seja escalável, performático e compatível com as mais recentes versões do React Native e Expo SDK, enquanto as medidas de segurança implementadas protegem adequadamente os dados dos usuários em ambas as plataformas móveis.

