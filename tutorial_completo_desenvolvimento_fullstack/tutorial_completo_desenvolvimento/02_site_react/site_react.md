# Tutorial Completo: Site React para Consumo da API de Usuários

**Autor:** Manus AI  
**Data:** Dezembro 2024  
**Versão:** 1.0

## Sumário

1. [Introdução](#introdução)
2. [Configuração do Ambiente React](#configuração-do-ambiente-react)
3. [Estrutura do Projeto React](#estrutura-do-projeto-react)
4. [Configuração de Roteamento](#configuração-de-roteamento)
5. [Gerenciamento de Estado](#gerenciamento-de-estado)
6. [Serviços de API](#serviços-de-api)
7. [Sistema de Autenticação](#sistema-de-autenticação)
8. [Componentes de Interface](#componentes-de-interface)
9. [Páginas da Aplicação](#páginas-da-aplicação)
10. [Estilização e Design Responsivo](#estilização-e-design-responsivo)
11. [Validação de Formulários](#validação-de-formulários)
12. [Tratamento de Erros](#tratamento-de-erros)
13. [Otimização e Performance](#otimização-e-performance)
14. [Testes do Frontend](#testes-do-frontend)
15. [Build e Deploy](#build-e-deploy)
16. [Referências](#referências)

---

## Introdução

Este tutorial apresenta o desenvolvimento completo de uma aplicação web React que consome a API REST de usuários desenvolvida anteriormente. A aplicação implementará um sistema completo de autenticação, cadastro de usuários, gerenciamento de perfil e dashboard administrativo, seguindo as melhores práticas de desenvolvimento frontend moderno.

### Objetivos do Tutorial

Ao final deste tutorial, você será capaz de:

- Configurar um ambiente de desenvolvimento React completo
- Implementar um sistema de roteamento com React Router
- Gerenciar estado da aplicação com Context API e hooks
- Consumir APIs REST de forma eficiente
- Implementar autenticação JWT no frontend
- Criar interfaces responsivas e acessíveis
- Validar formulários de forma robusta
- Implementar tratamento de erros adequado
- Otimizar performance da aplicação
- Realizar testes automatizados do frontend
- Preparar a aplicação para produção

### Tecnologias Utilizadas

- **React 18**: Biblioteca JavaScript para construção de interfaces
- **React Router DOM**: Roteamento para aplicações React
- **Axios**: Cliente HTTP para consumo de APIs
- **React Hook Form**: Gerenciamento de formulários performático
- **Yup**: Validação de esquemas JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Lucide React**: Biblioteca de ícones
- **React Query**: Gerenciamento de estado do servidor
- **React Hot Toast**: Notificações elegantes
- **Framer Motion**: Animações fluidas
- **React Testing Library**: Testes de componentes React
- **Jest**: Framework de testes JavaScript

### Funcionalidades da Aplicação

A aplicação React incluirá as seguintes funcionalidades:

1. **Autenticação Completa**
   - Página de login com validação
   - Página de registro de usuários
   - Recuperação de senha
   - Logout seguro
   - Renovação automática de tokens

2. **Gerenciamento de Perfil**
   - Visualização de dados do usuário
   - Edição de informações pessoais
   - Alteração de senha
   - Upload de foto de perfil

3. **Dashboard Administrativo**
   - Listagem de usuários com paginação
   - Busca e filtros avançados
   - Gerenciamento de status de usuários
   - Estatísticas e métricas

4. **Interface Responsiva**
   - Design adaptável para desktop e mobile
   - Navegação intuitiva
   - Feedback visual adequado
   - Acessibilidade implementada

## Configuração do Ambiente React

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js (versão 16 ou superior)
- npm ou yarn
- Git
- Editor de código (VS Code recomendado)

### Criação do Projeto

Vamos criar o projeto React usando Create React App com template TypeScript:

```bash
# Criar projeto React
npx create-react-app site-usuarios-react --template typescript
cd site-usuarios-react

# Instalar dependências principais
npm install react-router-dom axios react-hook-form @hookform/resolvers yup

# Instalar dependências de UI e estilização
npm install tailwindcss @tailwindcss/forms @tailwindcss/typography
npm install lucide-react framer-motion react-hot-toast

# Instalar dependências de estado e dados
npm install @tanstack/react-query @tanstack/react-query-devtools

# Instalar dependências de desenvolvimento
npm install --save-dev @types/node @types/react @types/react-dom
npm install --save-dev @testing-library/jest-dom @testing-library/user-event
npm install --save-dev autoprefixer postcss

# Configurar Tailwind CSS
npx tailwindcss init -p
```

### Configuração do Tailwind CSS

Edite o arquivo `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Configuração do CSS Global

Substitua o conteúdo do arquivo `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200;
  }
  
  .btn-primary {
    @apply btn bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }
  
  .btn-secondary {
    @apply btn bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500;
  }
  
  .btn-outline {
    @apply btn border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500;
  }
  
  .btn-danger {
    @apply btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
  }
  
  .input {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm;
  }
  
  .input-error {
    @apply input border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500;
  }
  
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }
  
  .card {
    @apply bg-white shadow rounded-lg p-6;
  }
  
  .error-text {
    @apply text-sm text-red-600 mt-1;
  }
  
  .loading-spinner {
    @apply animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

/* Animações customizadas */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.slide-up {
  animation: slideUp 0.3s ease-out;
}

.bounce-in {
  animation: bounceIn 0.6s ease-out;
}

/* Estilos para loading states */
.skeleton {
  @apply animate-pulse bg-gray-200 rounded;
}

.skeleton-text {
  @apply skeleton h-4 w-full mb-2;
}

.skeleton-avatar {
  @apply skeleton h-10 w-10 rounded-full;
}

/* Estilos para notificações */
.toast-success {
  @apply bg-green-500 text-white;
}

.toast-error {
  @apply bg-red-500 text-white;
}

.toast-warning {
  @apply bg-yellow-500 text-white;
}

.toast-info {
  @apply bg-blue-500 text-white;
}
```

## Estrutura do Projeto React

### Organização de Diretórios

Vamos organizar o projeto seguindo uma estrutura escalável e maintível:

```
src/
├── components/           # Componentes reutilizáveis
│   ├── common/          # Componentes comuns (Button, Input, etc.)
│   ├── forms/           # Componentes de formulário
│   ├── layout/          # Componentes de layout (Header, Sidebar, etc.)
│   └── ui/              # Componentes de interface específicos
├── pages/               # Páginas da aplicação
│   ├── auth/           # Páginas de autenticação
│   ├── dashboard/      # Páginas do dashboard
│   └── profile/        # Páginas de perfil
├── hooks/              # Custom hooks
├── services/           # Serviços de API
├── contexts/           # Contexts do React
├── utils/              # Funções utilitárias
├── types/              # Definições de tipos TypeScript
├── constants/          # Constantes da aplicação
├── assets/             # Imagens, ícones, etc.
└── __tests__/          # Testes
```

### Configuração de Tipos TypeScript

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
  endereco?: {
    rua?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };
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

export interface PaginatedResponse<T> {
  sucesso: boolean;
  dados: {
    [key: string]: T[];
    paginacao: {
      paginaAtual: number;
      totalPaginas: number;
      totalItens: number;
      itensPorPagina: number;
    };
  };
}

// Tipos de contexto de autenticação
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshToken: () => Promise<void>;
}

// Tipos de formulários
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: any;
}

// Tipos de notificação
export interface NotificationContextType {
  showNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

// Tipos de loading
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Tipos de filtros e busca
export interface UserFilters {
  busca?: string;
  perfil?: string;
  ativo?: boolean;
  pagina?: number;
  limite?: number;
}

// Tipos de configuração
export interface AppConfig {
  apiBaseUrl: string;
  tokenKey: string;
  refreshTokenKey: string;
  defaultPageSize: number;
}
```

### Configuração de Constantes

Crie o arquivo `src/constants/index.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
  THEME: 'app_theme',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  USERS: '/users',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

export const USER_ROLES = {
  USER: 'usuario',
  ADMIN: 'admin',
  MODERATOR: 'moderador',
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo é obrigatório',
  EMAIL_INVALID: 'Email deve ser válido',
  PASSWORD_MIN: 'Senha deve ter pelo menos 6 caracteres',
  PASSWORD_MISMATCH: 'Senhas não coincidem',
  PHONE_INVALID: 'Telefone deve estar em formato válido',
  DATE_INVALID: 'Data deve ser válida',
  CPF_INVALID: 'CPF deve ser válido',
  CEP_INVALID: 'CEP deve estar no formato 00000-000',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100,
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
```


## Configuração de Roteamento

### Configuração do React Router

Crie o arquivo `src/routes/AppRoutes.tsx`:

```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProfilePage from '../pages/profile/ProfilePage';
import UsersPage from '../pages/dashboard/UsersPage';
import NotFoundPage from '../pages/NotFoundPage';

// Guards
import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminRoute from '../components/common/AdminRoute';

import { ROUTES } from '../constants';

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const AppRoutes: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              {/* Rotas públicas */}
              <Route path={ROUTES.HOME} element={<HomePage />} />
              
              {/* Rotas de autenticação */}
              <Route element={<AuthLayout />}>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
              </Route>

              {/* Rotas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                  <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                  
                  {/* Rotas administrativas */}
                  <Route element={<AdminRoute />}>
                    <Route path={ROUTES.USERS} element={<UsersPage />} />
                  </Route>
                </Route>
              </Route>

              {/* Redirecionamentos */}
              <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
              
              {/* Página 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </Router>
      
      {/* DevTools do React Query (apenas em desenvolvimento) */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default AppRoutes;
```

### Componentes de Proteção de Rotas

Crie o arquivo `src/components/common/ProtectedRoute.tsx`:

```typescript
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';
import { ROUTES } from '../../constants';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Salvar a localização atual para redirecionamento após login
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
```

Crie o arquivo `src/components/common/AdminRoute.tsx`:

```typescript
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../constants';

const AdminRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user || (user.perfil !== USER_ROLES.ADMIN && user.perfil !== USER_ROLES.MODERATOR)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
```

## Gerenciamento de Estado

### Context de Autenticação

Crie o arquivo `src/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthContextType, LoginCredentials, RegisterData } from '../types';
import { authService } from '../services/authService';
import { STORAGE_KEYS } from '../constants';

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
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER);

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
              logout();
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

  // Configurar interceptador para renovação automática de token
  useEffect(() => {
    if (state.token) {
      authService.setupTokenRefresh(refreshToken);
    }
  }, [state.token]);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await authService.login(credentials);
      const { usuario, token, refreshToken } = response.dados;

      // Armazenar dados no localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(usuario));

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

      // Armazenar dados no localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(usuario));

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: usuario, token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = (): void => {
    // Remover dados do localStorage
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    // Fazer logout no servidor
    authService.logout().catch(console.error);

    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>): void => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const newToken = await authService.refreshToken();
      localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
      dispatch({ type: 'REFRESH_TOKEN_SUCCESS', payload: newToken });
    } catch (error) {
      logout();
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

### Context de Notificações

Crie o arquivo `src/contexts/NotificationContext.tsx`:

```typescript
import React, { createContext, useContext, ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NotificationContextType } from '../types';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const showNotification = (
    message: string, 
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) => {
    const options = {
      duration: 4000,
      position: 'top-right' as const,
      style: {
        background: '#fff',
        color: '#374151',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    };

    switch (type) {
      case 'success':
        toast.success(message, {
          ...options,
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
        });
        break;
      
      case 'error':
        toast.error(message, {
          ...options,
          duration: 6000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
        });
        break;
      
      case 'warning':
        toast(message, {
          ...options,
          icon: '⚠️',
        });
        break;
      
      case 'info':
      default:
        toast(message, {
          ...options,
          icon: 'ℹ️',
        });
        break;
    }
  };

  const contextValue: NotificationContextType = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <Toaster />
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification deve ser usado dentro de um NotificationProvider');
  }
  return context;
};
```

## Serviços de API

### Configuração do Cliente HTTP

Crie o arquivo `src/services/api.ts`:

```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, STORAGE_KEYS } from '../constants';

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
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
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
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Falha na renovação, redirecionar para login
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER);
            window.location.href = '/login';
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
import { apiClient } from './api';
import { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  ApiResponse 
} from '../types';
import { STORAGE_KEYS } from '../constants';

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
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      await apiClient.post('/auth/logout', { refreshToken });
    } catch (error) {
      // Ignorar erros de logout no servidor
      console.warn('Erro ao fazer logout no servidor:', error);
    }
  }

  public async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      
      if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
      }

      const response = await apiClient.post<AuthResponse>('/auth/renovar-token', {
        refreshToken,
      });

      const { token, refreshToken: newRefreshToken } = response.data.dados;
      
      // Atualizar refresh token se fornecido
      if (newRefreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
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

### Serviço de Usuários

Crie o arquivo `src/services/userService.ts`:

```typescript
import { apiClient } from './api';
import { 
  User, 
  ApiResponse, 
  PaginatedResponse, 
  UserFilters 
} from '../types';

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

  public async getUsers(filters: UserFilters = {}): Promise<PaginatedResponse<User>> {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, String(value));
        }
      });

      const response = await apiClient.get<PaginatedResponse<User>>(
        `/users?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async getUserById(id: string): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
      return response.data.dados!;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async updateUserStatus(id: string, isActive: boolean): Promise<User> {
    try {
      const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/status`, {
        isActive,
      });
      return response.data.dados!;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async deactivateAccount(): Promise<void> {
    try {
      await apiClient.delete('/users/conta');
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

### Hook Personalizado de Autenticação

Crie o arquivo `src/hooks/useAuth.ts`:

```typescript
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
```

### Hook para Queries de Usuário

Crie o arquivo `src/hooks/useUserQueries.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { useNotification } from '../contexts/NotificationContext';
import { User, UserFilters } from '../types';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: userService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  return useMutation({
    mutationFn: (userData: Partial<User>) => userService.updateProfile(userData),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user', 'profile'], updatedUser);
      showNotification('Perfil atualizado com sucesso!', 'success');
    },
    onError: (error: Error) => {
      showNotification(error.message, 'error');
    },
  });
};

export const useUsers = (filters: UserFilters) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => userService.getUsers(filters),
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      userService.updateUserStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showNotification('Status do usuário atualizado!', 'success');
    },
    onError: (error: Error) => {
      showNotification(error.message, 'error');
    },
  });
};

export const useDeactivateAccount = () => {
  const { showNotification } = useNotification();

  return useMutation({
    mutationFn: userService.deactivateAccount,
    onSuccess: () => {
      showNotification('Conta desativada com sucesso!', 'success');
    },
    onError: (error: Error) => {
      showNotification(error.message, 'error');
    },
  });
};
```


## Componentes de Interface

### Componentes Básicos

Crie o arquivo `src/components/common/LoadingSpinner.tsx`:

```typescript
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
  };

  return (
    <Loader2 
      className={`animate-spin ${sizeClasses[size]} ${className}`}
    />
  );
};

export default LoadingSpinner;
```

Crie o arquivo `src/components/common/Button.tsx`:

```typescript
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner size="small" className="mr-2" />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      
      {children}
      
      {rightIcon && !isLoading && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
```

Crie o arquivo `src/components/common/Input.tsx`:

```typescript
import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  className = '',
  ...props
}, ref) => {
  const inputClasses = error 
    ? 'input-error' 
    : 'input';

  return (
    <div className="w-full">
      {label && (
        <label className="label" htmlFor={props.id}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        className={`${inputClasses} ${className}`}
        {...props}
      />
      
      {error && (
        <p className="error-text">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
```

### Componentes de Layout

Crie o arquivo `src/components/layout/MainLayout.tsx`:

```typescript
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
```

Crie o arquivo `src/components/layout/Header.tsx`:

```typescript
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Usuários App
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Perfil
              </Link>
              {user?.perfil === 'admin' && (
                <Link
                  to="/users"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Usuários
                </Link>
              )}
            </nav>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-2"
              >
                <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <span className="text-sm font-medium">{user?.nome}</span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2 rounded-md"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Perfil
              </Link>
              {user?.perfil === 'admin' && (
                <Link
                  to="/users"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Usuários
                </Link>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="mt-4 mx-3"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
```

## Páginas da Aplicação

### Página de Login

Crie o arquivo `src/pages/auth/LoginPage.tsx`:

```typescript
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../contexts/NotificationContext';
import { LoginCredentials } from '../../types';
import { VALIDATION_MESSAGES, ROUTES } from '../../constants';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const loginSchema = yup.object({
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL_INVALID),
  senha: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .min(6, VALIDATION_MESSAGES.PASSWORD_MIN),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login, isLoading } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);
      showNotification('Login realizado com sucesso!', 'success');
      navigate(from, { replace: true });
    } catch (error: any) {
      showNotification(error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login em sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link
              to={ROUTES.REGISTER}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              crie uma nova conta
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              autoComplete="email"
            />

            <div className="relative">
              <Input
                {...register('senha')}
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                placeholder="Sua senha"
                error={errors.senha?.message}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
```

### Página de Registro

Crie o arquivo `src/pages/auth/RegisterPage.tsx`:

```typescript
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../contexts/NotificationContext';
import { RegisterData } from '../../types';
import { VALIDATION_MESSAGES, ROUTES } from '../../constants';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const registerSchema = yup.object({
  nome: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
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
    .optional()
    .matches(
      /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
      VALIDATION_MESSAGES.PHONE_INVALID
    ),
});

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { register: registerUser, isLoading } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      showNotification('Conta criada com sucesso!', 'success');
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      showNotification(error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              faça login em sua conta existente
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...register('nome')}
              type="text"
              label="Nome completo"
              placeholder="Seu nome completo"
              error={errors.nome?.message}
              autoComplete="name"
            />

            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              autoComplete="email"
            />

            <Input
              {...register('telefone')}
              type="tel"
              label="Telefone (opcional)"
              placeholder="(11) 99999-9999"
              error={errors.telefone?.message}
              autoComplete="tel"
            />

            <div className="relative">
              <Input
                {...register('senha')}
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                placeholder="Sua senha"
                error={errors.senha?.message}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                {...register('confirmarSenha')}
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                error={errors.confirmarSenha?.message}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Criar conta
          </Button>

          <div className="text-xs text-gray-500 text-center">
            Ao criar uma conta, você concorda com nossos{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Política de Privacidade
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
```

### Página de Dashboard

Crie o arquivo `src/pages/dashboard/DashboardPage.tsx`:

```typescript
import React from 'react';
import { Users, UserCheck, UserX, Activity } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUsers } from '../../hooks/useUserQueries';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { data: usersData } = useUsers({ limite: 1 });

  const stats = [
    {
      title: 'Total de Usuários',
      value: usersData?.dados?.paginacao?.totalItens || 0,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      color: 'bg-blue-100',
    },
    {
      title: 'Usuários Ativos',
      value: '---', // Implementar filtro para usuários ativos
      icon: <UserCheck className="h-6 w-6 text-green-600" />,
      color: 'bg-green-100',
    },
    {
      title: 'Usuários Inativos',
      value: '---', // Implementar filtro para usuários inativos
      icon: <UserX className="h-6 w-6 text-red-600" />,
      color: 'bg-red-100',
    },
    {
      title: 'Atividade Hoje',
      value: '---', // Implementar contagem de atividade
      icon: <Activity className="h-6 w-6 text-purple-600" />,
      color: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bem-vindo, {user?.nome}!
        </h1>
        <p className="text-gray-600">
          Aqui está um resumo da sua conta e atividades recentes.
        </p>
      </div>

      {/* Stats Grid */}
      {user?.perfil === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Atividade Recente
          </h2>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-500 py-8">
            <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma atividade recente para mostrar.</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Ações Rápidas
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Ver Perfil</p>
            </button>
            
            {user?.perfil === 'admin' && (
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <UserCheck className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Gerenciar Usuários</p>
              </button>
            )}
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Activity className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Ver Relatórios</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
```

## Estilização e Design Responsivo

### Implementação de Temas

Crie o arquivo `src/contexts/ThemeContext.tsx`:

```typescript
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { STORAGE_KEYS } from '../constants';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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

### Componente de Alternância de Tema

Crie o arquivo `src/components/common/ThemeToggle.tsx`:

```typescript
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      aria-label="Alternar tema"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
```

## Validação de Formulários

### Hook Personalizado para Validação

Crie o arquivo `src/hooks/useFormValidation.ts`:

```typescript
import { useState, useCallback } from 'react';
import * as yup from 'yup';

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const useFormValidation = <T extends Record<string, any>>(
  schema: yup.ObjectSchema<T>
) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(async (data: T): Promise<ValidationResult> => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      return { isValid: true, errors: {} };
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        
        setErrors(validationErrors);
        return { isValid: false, errors: validationErrors };
      }
      
      return { isValid: false, errors: { general: 'Erro de validação' } };
    }
  }, [schema]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  return {
    errors,
    validate,
    clearErrors,
    setFieldError,
  };
};
```

## Tratamento de Erros

### Boundary de Erro Global

Crie o arquivo `src/components/common/ErrorBoundary.tsx`:

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    
    // Aqui você pode enviar o erro para um serviço de monitoramento
    // como Sentry, LogRocket, etc.
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Ops! Algo deu errado
            </h1>
            
            <p className="text-gray-600 mb-8">
              Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-left">
                <p className="text-sm font-medium text-red-800 mb-2">
                  Detalhes do erro (apenas em desenvolvimento):
                </p>
                <pre className="text-xs text-red-700 overflow-auto">
                  {this.state.error.message}
                </pre>
              </div>
            )}
            
            <Button
              onClick={this.handleReload}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              Recarregar página
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Otimização e Performance

### Hook para Debounce

Crie o arquivo `src/hooks/useDebounce.ts`:

```typescript
import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

### Componente de Lazy Loading

Crie o arquivo `src/components/common/LazyImage.tsx`:

```typescript
import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+'
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-50'
      } ${className}`}
      onLoad={() => setIsLoaded(true)}
    />
  );
};

export default LazyImage;
```

## Testes do Frontend

### Configuração de Testes

Crie o arquivo `src/setupTests.ts`:

```typescript
import '@testing-library/jest-dom';

// Mock do IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

### Teste de Componente

Crie o arquivo `src/__tests__/components/Button.test.tsx`:

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/common/Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant classes', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-600');
  });
});
```

## Build e Deploy

### Configuração de Build

Adicione scripts ao `package.json`:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build:analyze": "npm run build && npx serve -s build",
    "test:coverage": "npm test -- --coverage --watchAll=false",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix"
  }
}
```

### Configuração de Variáveis de Ambiente

Crie o arquivo `.env.example`:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3000/api

# App Configuration
REACT_APP_NAME=Usuários App
REACT_APP_VERSION=1.0.0

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG=false
```

### Arquivo Principal da Aplicação

Finalmente, atualize o arquivo `src/App.tsx`:

```typescript
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
```

## Referências

[1] React Documentation - https://react.dev/
[2] React Router Documentation - https://reactrouter.com/
[3] React Hook Form - https://react-hook-form.com/
[4] Yup Validation - https://github.com/jquense/yup
[5] Tailwind CSS - https://tailwindcss.com/
[6] React Query Documentation - https://tanstack.com/query/
[7] Axios Documentation - https://axios-http.com/
[8] React Testing Library - https://testing-library.com/docs/react-testing-library/intro/
[9] Framer Motion - https://www.framer.com/motion/
[10] Lucide React Icons - https://lucide.dev/

---

**Conclusão**

Este tutorial apresentou um guia completo para o desenvolvimento de uma aplicação React moderna que consome a API REST de usuários. A implementação inclui todas as funcionalidades essenciais para um sistema de autenticação e gerenciamento de usuários robusto, seguindo as melhores práticas de desenvolvimento frontend.

A aplicação desenvolvida oferece uma interface responsiva e intuitiva, com gerenciamento de estado eficiente, validação robusta de formulários e tratamento adequado de erros. A arquitetura modular facilita a manutenção e evolução do código, enquanto as otimizações de performance garantem uma experiência de usuário fluida.

