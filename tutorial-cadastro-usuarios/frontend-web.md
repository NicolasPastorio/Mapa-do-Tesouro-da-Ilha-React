# Site React para Consumo da API de Cadastro de Usuários

## Introdução

O desenvolvimento de aplicações web modernas requer uma abordagem estruturada que combine performance, usabilidade e manutenibilidade. React.js emergiu como uma das bibliotecas JavaScript mais populares para construção de interfaces de usuário, oferecendo um paradigma baseado em componentes que facilita o desenvolvimento de aplicações complexas e escaláveis.

React foi criado pelo Facebook em 2013 e rapidamente ganhou adoção massiva na comunidade de desenvolvimento devido à sua arquitetura inovadora baseada em Virtual DOM, que otimiza atualizações de interface e melhora significativamente a performance das aplicações. O conceito de componentes reutilizáveis revolucionou a forma como desenvolvedores estruturam código frontend, promovendo reutilização, testabilidade e manutenção simplificada.

Neste tutorial abrangente, você aprenderá a construir uma aplicação web completa utilizando React.js que consumirá a API REST desenvolvida na seção anterior. A aplicação implementará funcionalidades essenciais como registro de usuários, autenticação, gerenciamento de perfil e navegação protegida, demonstrando padrões e práticas recomendadas para desenvolvimento React profissional.

A integração entre frontend React e backend Node.js representa uma das combinações mais poderosas no ecossistema JavaScript moderno. Esta sinergia permite que desenvolvedores utilizem uma única linguagem em toda a stack de desenvolvimento, reduzindo a curva de aprendizado e aumentando a produtividade da equipe.

Durante este tutorial, você não apenas aprenderá a implementar funcionalidades específicas, mas também compreenderá os princípios fundamentais que regem o desenvolvimento de aplicações React escaláveis, incluindo gerenciamento de estado, comunicação com APIs, roteamento, validação de formulários e otimização de performance.

## Configuração do Ambiente de Desenvolvimento

### Instalação do Node.js e npm

O primeiro passo para desenvolver aplicações React é garantir que o ambiente de desenvolvimento esteja adequadamente configurado. React é uma biblioteca JavaScript que executa no navegador, mas seu processo de desenvolvimento requer Node.js para ferramentas de build, gerenciamento de dependências e servidor de desenvolvimento.

Se você seguiu a seção anterior sobre desenvolvimento da API, Node.js já deve estar instalado em seu sistema. Caso contrário, visite o site oficial nodejs.org e baixe a versão LTS (Long Term Support) mais recente. A versão LTS garante estabilidade e suporte prolongado, características essenciais para projetos profissionais.

Após a instalação, verifique se Node.js e npm estão funcionando corretamente executando `node --version` e `npm --version` no terminal. Ambos comandos devem retornar números de versão, confirmando que a instalação foi bem-sucedida. npm (Node Package Manager) é o gerenciador de pacotes padrão do Node.js e será utilizado para instalar e gerenciar todas as dependências do projeto React.

Para projetos React modernos, também é recomendado instalar yarn como alternativa ao npm. Yarn oferece instalação mais rápida de dependências, melhor resolução de conflitos e arquivo de lock mais confiável. Instale yarn globalmente executando `npm install -g yarn`, embora esta etapa seja opcional pois npm funciona perfeitamente para desenvolvimento React.

### Criação do Projeto React

Create React App é a ferramenta oficial recomendada pelo time do React para inicializar novos projetos. Esta ferramenta configura automaticamente um ambiente de desenvolvimento completo com Webpack, Babel, ESLint e outras ferramentas essenciais, permitindo que desenvolvedores foquem na lógica da aplicação em vez de configurações complexas.

Execute `npx create-react-app frontend-cadastro-usuarios` para criar um novo projeto React. O comando npx executa a versão mais recente do Create React App sem necessidade de instalação global, garantindo que você sempre utilize a versão mais atualizada da ferramenta.

O processo de criação pode levar alguns minutos, pois o Create React App baixa e instala todas as dependências necessárias. Após a conclusão, você terá uma estrutura de projeto completa com arquivos de configuração, dependências e exemplos básicos prontos para desenvolvimento.

Navegue para o diretório do projeto executando `cd frontend-cadastro-usuarios` e inicie o servidor de desenvolvimento com `npm start`. Este comando iniciará um servidor local na porta 3000 e abrirá automaticamente a aplicação no navegador padrão. O servidor de desenvolvimento inclui hot reloading, que atualiza automaticamente a aplicação no navegador sempre que arquivos são modificados.

### Estrutura do Projeto React

A estrutura gerada pelo Create React App segue convenções estabelecidas pela comunidade React e fornece uma base sólida para desenvolvimento. O diretório `public` contém arquivos estáticos como index.html, favicon e manifest.json. O arquivo index.html é o ponto de entrada da aplicação e contém um elemento div com id "root" onde React renderizará toda a aplicação.

O diretório `src` contém todo o código-fonte da aplicação React. O arquivo App.js é o componente principal que serve como ponto de entrada para a árvore de componentes. O arquivo index.js é responsável por renderizar o componente App no elemento root do DOM, estabelecendo a conexão entre React e o HTML.

Para organizar adequadamente nossa aplicação de cadastro de usuários, criaremos uma estrutura de diretórios que facilite manutenção e escalabilidade. Dentro de `src`, crie os diretórios `components` para componentes reutilizáveis, `pages` para componentes de página, `services` para lógica de comunicação com APIs, `hooks` para custom hooks, `contexts` para gerenciamento de estado global, `utils` para funções utilitárias e `styles` para arquivos de estilo.

Esta organização modular promove separação de responsabilidades e facilita localização de código específico conforme a aplicação cresce em complexidade. Componentes reutilizáveis podem ser facilmente compartilhados entre diferentes páginas, enquanto a separação de lógica de API em services facilita testes e manutenção.

### Instalação de Dependências Adicionais

Nossa aplicação React necessitará de bibliotecas adicionais para funcionalidades como roteamento, comunicação HTTP, validação de formulários e estilização. Execute `npm install react-router-dom axios react-hook-form yup @hookform/resolvers` para instalar as dependências principais.

React Router DOM é a biblioteca padrão para roteamento em aplicações React, permitindo navegação entre diferentes páginas sem recarregamento completo da aplicação. Esta funcionalidade é essencial para Single Page Applications (SPAs) que oferecem experiência de usuário fluida e responsiva.

Axios é uma biblioteca HTTP cliente que simplifica comunicação com APIs REST. Embora React inclua fetch API nativo, Axios oferece funcionalidades adicionais como interceptors, transformação automática de dados JSON, tratamento de timeout e cancelamento de requisições, características valiosas para aplicações profissionais.

React Hook Form é uma biblioteca de gerenciamento de formulários que oferece performance superior e API mais simples comparada a alternativas como Formik. Sua abordagem baseada em refs minimiza re-renderizações desnecessárias e melhora significativamente a performance em formulários complexos.

Yup é uma biblioteca de validação de esquemas JavaScript que integra perfeitamente com React Hook Form através do resolver @hookform/resolvers. Esta combinação permite definir validações complexas de forma declarativa e reutilizável.

Para estilização, instale também `npm install styled-components` ou utilize CSS modules que já vêm configurados no Create React App. Styled Components oferece uma abordagem CSS-in-JS que permite escrever estilos diretamente em componentes JavaScript, facilitando tematização dinâmica e isolamento de estilos.

## Configuração de Serviços de API

### Configuração do Cliente HTTP

Crie um arquivo `src/services/api.js` para centralizar toda a configuração de comunicação com a API backend. Este arquivo estabelecerá a configuração base do Axios e implementará interceptors para tratamento automático de tokens de autenticação e erros.

```javascript
import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Criação da instância do Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token de autenticação automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratamento de respostas e erros
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Tratamento de erro de autenticação
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            window.location.href = '/login';
        }
        
        // Tratamento de erro de servidor
        if (error.response?.status >= 500) {
            console.error('Erro interno do servidor:', error.response.data);
        }
        
        return Promise.reject(error);
    }
);

export default api;
```

A configuração de interceptors é fundamental para automatizar tarefas repetitivas como adição de tokens de autenticação e tratamento de erros comuns. O interceptor de requisição adiciona automaticamente o token JWT armazenado no localStorage a todas as requisições, eliminando a necessidade de configuração manual em cada chamada de API.

O interceptor de resposta implementa tratamento centralizado de erros, redirecionando automaticamente usuários para a página de login quando tokens expiram ou são inválidos. Esta abordagem melhora significativamente a experiência do usuário e reduz código duplicado em toda a aplicação.

A configuração de timeout previne que requisições travem indefinidamente em caso de problemas de conectividade, melhorando a responsividade da aplicação. O valor de 10 segundos é adequado para a maioria das operações, mas pode ser ajustado conforme necessário.

### Serviços de Autenticação

Crie um arquivo `src/services/authService.js` para encapsular todas as operações relacionadas à autenticação de usuários.

```javascript
import api from './api';

class AuthService {
    // Registro de novo usuário
    async register(userData) {
        try {
            const response = await api.post('/auth/register', userData);
            
            if (response.data.success) {
                const { token, user } = response.data.data;
                this.setAuthData(token, user);
                return { success: true, data: response.data.data };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Login de usuário
    async login(credentials) {
        try {
            const response = await api.post('/auth/login', credentials);
            
            if (response.data.success) {
                const { token, user } = response.data.data;
                this.setAuthData(token, user);
                return { success: true, data: response.data.data };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Logout
    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Erro no logout:', error);
        } finally {
            this.clearAuthData();
        }
    }

    // Verificação de token
    async verifyToken() {
        try {
            const response = await api.post('/auth/verify-token');
            
            if (response.data.success) {
                return { success: true, data: response.data.data };
            }
            
            this.clearAuthData();
            return { success: false };
        } catch (error) {
            this.clearAuthData();
            return { success: false };
        }
    }

    // Renovação de token
    async refreshToken() {
        try {
            const response = await api.post('/auth/refresh-token');
            
            if (response.data.success) {
                const { token } = response.data.data;
                localStorage.setItem('authToken', token);
                return { success: true, token };
            }
            
            this.clearAuthData();
            return { success: false };
        } catch (error) {
            this.clearAuthData();
            return { success: false };
        }
    }

    // Armazenar dados de autenticação
    setAuthData(token, user) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    // Limpar dados de autenticação
    clearAuthData() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    }

    // Obter token armazenado
    getToken() {
        return localStorage.getItem('authToken');
    }

    // Obter dados do usuário armazenados
    getUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    // Verificar se usuário está autenticado
    isAuthenticated() {
        return !!this.getToken();
    }

    // Tratamento de erros
    handleError(error) {
        if (error.response?.data?.message) {
            return { success: false, message: error.response.data.message };
        }
        
        if (error.response?.data?.errors) {
            return { success: false, errors: error.response.data.errors };
        }
        
        return { 
            success: false, 
            message: 'Erro de conexão. Tente novamente.' 
        };
    }
}

export default new AuthService();
```

O padrão Singleton utilizado na exportação do AuthService garante que apenas uma instância do serviço exista em toda a aplicação, mantendo consistência no gerenciamento de estado de autenticação. Esta abordagem facilita acesso aos métodos de autenticação de qualquer componente sem necessidade de instanciação múltipla.

O armazenamento de dados de autenticação no localStorage permite persistência entre sessões do navegador, melhorando a experiência do usuário que não precisa fazer login a cada visita. No entanto, é importante considerar questões de segurança e implementar expiração adequada de tokens.

O tratamento centralizado de erros no método handleError padroniza respostas de erro em toda a aplicação, facilitando exibição de mensagens consistentes para usuários e simplificando debugging durante desenvolvimento.

### Serviços de Usuário

Crie um arquivo `src/services/userService.js` para gerenciar operações relacionadas ao perfil e dados do usuário.

```javascript
import api from './api';

class UserService {
    // Obter perfil do usuário autenticado
    async getProfile() {
        try {
            const response = await api.get('/users/profile');
            
            if (response.data.success) {
                return { success: true, data: response.data.data.user };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Atualizar perfil do usuário
    async updateProfile(userData) {
        try {
            const response = await api.put('/users/profile', userData);
            
            if (response.data.success) {
                // Atualizar dados no localStorage
                const updatedUser = response.data.data.user;
                localStorage.setItem('userData', JSON.stringify(updatedUser));
                
                return { success: true, data: updatedUser };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Listar usuários (apenas para admins)
    async getUsers(page = 1, limit = 10, filters = {}) {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...filters
            });

            const response = await api.get(`/users?${params}`);
            
            if (response.data.success) {
                return { 
                    success: true, 
                    data: response.data.data.users,
                    pagination: response.data.data.pagination
                };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Obter usuário específico (apenas para admins)
    async getUser(userId) {
        try {
            const response = await api.get(`/users/${userId}`);
            
            if (response.data.success) {
                return { success: true, data: response.data.data.user };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Atualizar usuário específico (apenas para admins)
    async updateUser(userId, userData) {
        try {
            const response = await api.put(`/users/${userId}`, userData);
            
            if (response.data.success) {
                return { success: true, data: response.data.data.user };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Desativar usuário (apenas para admins)
    async deactivateUser(userId) {
        try {
            const response = await api.patch(`/users/${userId}/deactivate`);
            
            if (response.data.success) {
                return { success: true, data: response.data.data.user };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Reativar usuário (apenas para admins)
    async activateUser(userId) {
        try {
            const response = await api.patch(`/users/${userId}/activate`);
            
            if (response.data.success) {
                return { success: true, data: response.data.data.user };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Deletar usuário (apenas para admins)
    async deleteUser(userId) {
        try {
            const response = await api.delete(`/users/${userId}`);
            
            if (response.data.success) {
                return { success: true };
            }
            
            return { success: false, message: response.data.message };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Tratamento de erros
    handleError(error) {
        if (error.response?.data?.message) {
            return { success: false, message: error.response.data.message };
        }
        
        if (error.response?.data?.errors) {
            return { success: false, errors: error.response.data.errors };
        }
        
        return { 
            success: false, 
            message: 'Erro de conexão. Tente novamente.' 
        };
    }
}

export default new UserService();
```

A separação de responsabilidades entre AuthService e UserService facilita manutenção e permite reutilização de lógica específica em diferentes partes da aplicação. Esta organização também simplifica testes unitários, pois cada serviço pode ser testado independentemente.

A sincronização automática de dados do usuário no localStorage após atualizações garante que informações exibidas na interface permaneçam consistentes com o estado do servidor. Esta abordagem evita inconsistências que poderiam confundir usuários ou causar comportamentos inesperados.

A implementação de parâmetros de consulta para listagem de usuários demonstra como construir APIs flexíveis que suportam paginação e filtros, funcionalidades essenciais para aplicações que gerenciam grandes volumes de dados.

## Gerenciamento de Estado Global

### Context API para Autenticação

Crie um arquivo `src/contexts/AuthContext.js` para implementar gerenciamento de estado global de autenticação utilizando React Context API.

```javascript
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';

// Estados possíveis da autenticação
const AuthStates = {
    LOADING: 'loading',
    AUTHENTICATED: 'authenticated',
    UNAUTHENTICATED: 'unauthenticated',
    ERROR: 'error'
};

// Ações do reducer
const AuthActions = {
    SET_LOADING: 'SET_LOADING',
    SET_AUTHENTICATED: 'SET_AUTHENTICATED',
    SET_UNAUTHENTICATED: 'SET_UNAUTHENTICATED',
    SET_ERROR: 'SET_ERROR',
    UPDATE_USER: 'UPDATE_USER'
};

// Estado inicial
const initialState = {
    status: AuthStates.LOADING,
    user: null,
    token: null,
    error: null
};

// Reducer para gerenciar estado de autenticação
const authReducer = (state, action) => {
    switch (action.type) {
        case AuthActions.SET_LOADING:
            return {
                ...state,
                status: AuthStates.LOADING,
                error: null
            };

        case AuthActions.SET_AUTHENTICATED:
            return {
                ...state,
                status: AuthStates.AUTHENTICATED,
                user: action.payload.user,
                token: action.payload.token,
                error: null
            };

        case AuthActions.SET_UNAUTHENTICATED:
            return {
                ...state,
                status: AuthStates.UNAUTHENTICATED,
                user: null,
                token: null,
                error: null
            };

        case AuthActions.SET_ERROR:
            return {
                ...state,
                status: AuthStates.ERROR,
                error: action.payload.error
            };

        case AuthActions.UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload.user }
            };

        default:
            return state;
    }
};

// Criação do contexto
const AuthContext = createContext();

// Provider do contexto de autenticação
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Verificar autenticação ao inicializar
    useEffect(() => {
        const initializeAuth = async () => {
            const token = authService.getToken();
            const userData = authService.getUserData();

            if (token && userData) {
                // Verificar se token ainda é válido
                const result = await authService.verifyToken();
                
                if (result.success) {
                    dispatch({
                        type: AuthActions.SET_AUTHENTICATED,
                        payload: { user: userData, token }
                    });
                } else {
                    dispatch({ type: AuthActions.SET_UNAUTHENTICATED });
                }
            } else {
                dispatch({ type: AuthActions.SET_UNAUTHENTICATED });
            }
        };

        initializeAuth();
    }, []);

    // Função de login
    const login = async (credentials) => {
        dispatch({ type: AuthActions.SET_LOADING });

        try {
            const result = await authService.login(credentials);

            if (result.success) {
                dispatch({
                    type: AuthActions.SET_AUTHENTICATED,
                    payload: {
                        user: result.data.user,
                        token: result.data.token
                    }
                });
                return { success: true };
            } else {
                dispatch({
                    type: AuthActions.SET_ERROR,
                    payload: { error: result.message }
                });
                return { success: false, message: result.message };
            }
        } catch (error) {
            const errorMessage = 'Erro inesperado durante o login';
            dispatch({
                type: AuthActions.SET_ERROR,
                payload: { error: errorMessage }
            });
            return { success: false, message: errorMessage };
        }
    };

    // Função de registro
    const register = async (userData) => {
        dispatch({ type: AuthActions.SET_LOADING });

        try {
            const result = await authService.register(userData);

            if (result.success) {
                dispatch({
                    type: AuthActions.SET_AUTHENTICATED,
                    payload: {
                        user: result.data.user,
                        token: result.data.token
                    }
                });
                return { success: true };
            } else {
                dispatch({
                    type: AuthActions.SET_ERROR,
                    payload: { error: result.message }
                });
                return { 
                    success: false, 
                    message: result.message,
                    errors: result.errors 
                };
            }
        } catch (error) {
            const errorMessage = 'Erro inesperado durante o registro';
            dispatch({
                type: AuthActions.SET_ERROR,
                payload: { error: errorMessage }
            });
            return { success: false, message: errorMessage };
        }
    };

    // Função de logout
    const logout = async () => {
        dispatch({ type: AuthActions.SET_LOADING });
        
        try {
            await authService.logout();
        } catch (error) {
            console.error('Erro durante logout:', error);
        } finally {
            dispatch({ type: AuthActions.SET_UNAUTHENTICATED });
        }
    };

    // Função para atualizar dados do usuário
    const updateUser = (userData) => {
        dispatch({
            type: AuthActions.UPDATE_USER,
            payload: { user: userData }
        });
    };

    // Função para verificar se usuário está autenticado
    const isAuthenticated = () => {
        return state.status === AuthStates.AUTHENTICATED;
    };

    // Função para verificar se está carregando
    const isLoading = () => {
        return state.status === AuthStates.LOADING;
    };

    // Valor do contexto
    const contextValue = {
        // Estado
        ...state,
        
        // Funções
        login,
        register,
        logout,
        updateUser,
        isAuthenticated,
        isLoading,
        
        // Estados para facilitar verificações
        AuthStates
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    
    return context;
};

export default AuthContext;
```

A implementação do Context API com useReducer oferece uma solução robusta para gerenciamento de estado global sem necessidade de bibliotecas externas como Redux. Esta abordagem é especialmente adequada para estados de autenticação que precisam ser acessados por múltiplos componentes em diferentes níveis da árvore de componentes.

O padrão reducer centraliza toda a lógica de atualização de estado em uma função pura, facilitando testes e debugging. As ações bem definidas tornam o fluxo de dados previsível e facilitam rastreamento de mudanças de estado durante desenvolvimento.

A verificação automática de autenticação na inicialização garante que usuários com tokens válidos permaneçam logados entre sessões, melhorando significativamente a experiência de uso. O tratamento de tokens expirados evita estados inconsistentes que poderiam confundir usuários.

### Custom Hooks para Estado Local

Crie um arquivo `src/hooks/useForm.js` para implementar um hook personalizado que simplifica gerenciamento de formulários.

```javascript
import { useState, useCallback } from 'react';

const useForm = (initialValues = {}, validationSchema = null) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Função para atualizar valor de um campo
    const setValue = useCallback((name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpar erro do campo quando valor é alterado
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    }, [errors]);

    // Função para marcar campo como tocado
    const setTouched = useCallback((name) => {
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    }, []);

    // Função para lidar com mudanças em inputs
    const handleChange = useCallback((event) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        
        setValue(name, fieldValue);
    }, [setValue]);

    // Função para lidar com blur em inputs
    const handleBlur = useCallback((event) => {
        const { name } = event.target;
        setTouched(name);

        // Validar campo individual se schema foi fornecido
        if (validationSchema) {
            validateField(name, values[name]);
        }
    }, [values, validationSchema]);

    // Função para validar campo individual
    const validateField = useCallback(async (name, value) => {
        if (!validationSchema) return true;

        try {
            await validationSchema.validateAt(name, { [name]: value });
            
            // Remover erro se validação passou
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
            
            return true;
        } catch (error) {
            // Adicionar erro se validação falhou
            setErrors(prev => ({
                ...prev,
                [name]: error.message
            }));
            
            return false;
        }
    }, [validationSchema]);

    // Função para validar todos os campos
    const validate = useCallback(async () => {
        if (!validationSchema) return true;

        try {
            await validationSchema.validate(values, { abortEarly: false });
            setErrors({});
            return true;
        } catch (error) {
            const validationErrors = {};
            
            if (error.inner) {
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
            }
            
            setErrors(validationErrors);
            return false;
        }
    }, [values, validationSchema]);

    // Função para submeter formulário
    const handleSubmit = useCallback((onSubmit) => {
        return async (event) => {
            event.preventDefault();
            setIsSubmitting(true);

            try {
                const isValid = await validate();
                
                if (isValid) {
                    await onSubmit(values);
                }
            } catch (error) {
                console.error('Erro durante submissão:', error);
            } finally {
                setIsSubmitting(false);
            }
        };
    }, [values, validate]);

    // Função para resetar formulário
    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    // Função para definir valores do formulário
    const setFormValues = useCallback((newValues) => {
        setValues(newValues);
    }, []);

    // Função para definir erros do formulário
    const setFormErrors = useCallback((newErrors) => {
        setErrors(newErrors);
    }, []);

    // Verificar se formulário é válido
    const isValid = Object.keys(errors).length === 0;

    // Verificar se formulário foi modificado
    const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

    return {
        // Valores e estado
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        isDirty,

        // Funções de manipulação
        setValue,
        setTouched,
        handleChange,
        handleBlur,
        handleSubmit,
        validate,
        validateField,
        reset,
        setFormValues,
        setFormErrors
    };
};

export default useForm;
```

O hook personalizado useForm encapsula toda a lógica complexa de gerenciamento de formulários, oferecendo uma API simples e reutilizável para componentes. Esta abordagem reduz significativamente código duplicado e garante comportamento consistente em todos os formulários da aplicação.

A integração com bibliotecas de validação como Yup permite definir esquemas de validação declarativos que podem ser reutilizados entre diferentes formulários. A validação em tempo real melhora a experiência do usuário fornecendo feedback imediato sobre erros de entrada.

O controle de estado de submissão previne submissões múltiplas acidentais e permite exibir indicadores de carregamento apropriados. As funções de reset e setFormValues facilitam manipulação programática de formulários quando necessário.

## Desenvolvimento de Componentes

### Componentes de Layout

Crie um arquivo `src/components/Layout/Header.js` para implementar o cabeçalho da aplicação com navegação e controles de usuário.

```javascript
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-brand">
                    <Link to="/" className="brand-link">
                        <h1>Cadastro Usuários</h1>
                    </Link>
                </div>

                <nav className="header-nav">
                    {isAuthenticated() ? (
                        <div className="nav-authenticated">
                            <div className="user-info">
                                <span className="user-greeting">
                                    Olá, {user?.firstName}
                                </span>
                            </div>
                            
                            <div className="nav-links">
                                <Link to="/dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                                <Link to="/profile" className="nav-link">
                                    Perfil
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="nav-link logout-btn"
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="nav-unauthenticated">
                            <Link to="/login" className="nav-link">
                                Entrar
                            </Link>
                            <Link to="/register" className="nav-link nav-link-primary">
                                Cadastrar
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
```

Crie um arquivo `src/components/Layout/Footer.js` para implementar o rodapé da aplicação.

```javascript
import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Cadastro de Usuários</h3>
                        <p>Sistema completo de gerenciamento de usuários</p>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Links Úteis</h4>
                        <ul>
                            <li><a href="/privacy">Política de Privacidade</a></li>
                            <li><a href="/terms">Termos de Uso</a></li>
                            <li><a href="/support">Suporte</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Contato</h4>
                        <p>Email: contato@exemplo.com</p>
                        <p>Telefone: (11) 1234-5678</p>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Cadastro de Usuários. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
```

Crie um arquivo `src/components/Layout/Layout.js` para combinar header e footer em um layout principal.

```javascript
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
```

Os componentes de layout estabelecem a estrutura visual consistente da aplicação, garantindo que elementos como navegação e rodapé apareçam em todas as páginas. A separação em componentes individuais facilita manutenção e permite reutilização em diferentes contextos.

A navegação condicional baseada no estado de autenticação oferece experiência personalizada para usuários logados e visitantes. Esta abordagem melhora usabilidade ao exibir apenas opções relevantes para cada tipo de usuário.

O componente Layout principal implementa o padrão de composição React, permitindo que páginas individuais sejam renderizadas dentro da estrutura comum. Esta arquitetura facilita manutenção e garante consistência visual em toda a aplicação.

### Componentes de Formulário

Crie um arquivo `src/components/Form/Input.js` para implementar um componente de input reutilizável.

```javascript
import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    required = false,
    disabled = false,
    className = '',
    ...props
}, ref) => {
    const inputId = `input-${name}`;
    const hasError = touched && error;

    return (
        <div className={`input-group ${className}`}>
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                    {required && <span className="required-asterisk">*</span>}
                </label>
            )}
            
            <input
                ref={ref}
                id={inputId}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={`input-field ${hasError ? 'input-error' : ''}`}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${inputId}-error` : undefined}
                {...props}
            />
            
            {hasError && (
                <span 
                    id={`${inputId}-error`}
                    className="input-error-message"
                    role="alert"
                >
                    {error}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
```

Crie um arquivo `src/components/Form/Button.js` para implementar um componente de botão reutilizável.

```javascript
import React from 'react';
import './Button.css';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    onClick,
    className = '',
    ...props
}) => {
    const buttonClasses = [
        'button',
        `button-${variant}`,
        `button-${size}`,
        loading && 'button-loading',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <span className="button-spinner" />}
            <span className={loading ? 'button-text-hidden' : 'button-text'}>
                {children}
            </span>
        </button>
    );
};

export default Button;
```

Crie um arquivo `src/components/Form/FormField.js` para combinar input com validação.

```javascript
import React from 'react';
import Input from './Input';

const FormField = ({
    name,
    label,
    type = 'text',
    placeholder,
    required = false,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    ...props
}) => {
    return (
        <Input
            name={name}
            label={label}
            type={type}
            placeholder={placeholder}
            required={required}
            value={values[name] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[name]}
            touched={touched[name]}
            {...props}
        />
    );
};

export default FormField;
```

Os componentes de formulário reutilizáveis garantem consistência visual e comportamental em toda a aplicação. A implementação de forwardRef no componente Input permite que bibliotecas de formulário acessem diretamente o elemento DOM quando necessário.

A inclusão de atributos de acessibilidade como aria-invalid e role="alert" garante que a aplicação seja utilizável por pessoas com deficiências visuais que dependem de leitores de tela. Esta atenção à acessibilidade é fundamental para aplicações profissionais.

O sistema de variantes e tamanhos nos componentes Button oferece flexibilidade visual mantendo consistência de design. O estado de loading integrado melhora feedback visual durante operações assíncronas.

### Componentes de Autenticação

Crie um arquivo `src/components/Auth/LoginForm.js` para implementar o formulário de login.

```javascript
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import FormField from '../Form/FormField';
import Button from '../Form/Button';
import './AuthForms.css';

// Schema de validação
const loginSchema = yup.object().shape({
    identifier: yup
        .string()
        .required('Email ou username é obrigatório'),
    password: yup
        .string()
        .required('Senha é obrigatória')
});

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState('');

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm({
        identifier: '',
        password: ''
    }, loginSchema);

    const onSubmit = async (formData) => {
        setSubmitError('');

        try {
            const result = await login(formData);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setSubmitError(result.message || 'Erro durante o login');
            }
        } catch (error) {
            setSubmitError('Erro inesperado. Tente novamente.');
        }
    };

    return (
        <div className="auth-form-container">
            <div className="auth-form">
                <div className="auth-header">
                    <h2>Entrar na sua conta</h2>
                    <p>Digite suas credenciais para acessar o sistema</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {submitError && (
                        <div className="error-message" role="alert">
                            {submitError}
                        </div>
                    )}

                    <FormField
                        name="identifier"
                        label="Email ou Username"
                        type="text"
                        placeholder="Digite seu email ou username"
                        required
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />

                    <FormField
                        name="password"
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        required
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        loading={isSubmitting}
                        className="auth-submit-btn"
                    >
                        Entrar
                    </Button>
                </form>

                <div className="auth-footer">
                    <p>
                        Não tem uma conta?{' '}
                        <Link to="/register" className="auth-link">
                            Cadastre-se aqui
                        </Link>
                    </p>
                    <Link to="/forgot-password" className="auth-link">
                        Esqueceu sua senha?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
```

Crie um arquivo `src/components/Auth/RegisterForm.js` para implementar o formulário de registro.

```javascript
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import FormField from '../Form/FormField';
import Button from '../Form/Button';
import './AuthForms.css';

// Schema de validação
const registerSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .required('Nome é obrigatório'),
    lastName: yup
        .string()
        .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
        .max(100, 'Sobrenome deve ter no máximo 100 caracteres')
        .required('Sobrenome é obrigatório'),
    username: yup
        .string()
        .min(3, 'Username deve ter pelo menos 3 caracteres')
        .max(50, 'Username deve ter no máximo 50 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username deve conter apenas letras, números e underscore')
        .required('Username é obrigatório'),
    email: yup
        .string()
        .email('Email deve ter um formato válido')
        .max(255, 'Email deve ter no máximo 255 caracteres')
        .required('Email é obrigatório'),
    password: yup
        .string()
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .max(128, 'Senha deve ter no máximo 128 caracteres')
        .matches(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'
        )
        .required('Senha é obrigatória'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Senhas devem ser iguais')
        .required('Confirmação de senha é obrigatória')
});

const RegisterForm = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState('');

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFormErrors
    } = useForm({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }, registerSchema);

    const onSubmit = async (formData) => {
        setSubmitError('');

        // Remover confirmPassword antes de enviar
        const { confirmPassword, ...submitData } = formData;

        try {
            const result = await register(submitData);

            if (result.success) {
                navigate('/dashboard');
            } else {
                if (result.errors) {
                    // Mapear erros de validação do servidor
                    const serverErrors = {};
                    result.errors.forEach(error => {
                        serverErrors[error.field] = error.message;
                    });
                    setFormErrors(serverErrors);
                } else {
                    setSubmitError(result.message || 'Erro durante o cadastro');
                }
            }
        } catch (error) {
            setSubmitError('Erro inesperado. Tente novamente.');
        }
    };

    return (
        <div className="auth-form-container">
            <div className="auth-form">
                <div className="auth-header">
                    <h2>Criar nova conta</h2>
                    <p>Preencha os dados abaixo para se cadastrar</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {submitError && (
                        <div className="error-message" role="alert">
                            {submitError}
                        </div>
                    )}

                    <div className="form-row">
                        <FormField
                            name="firstName"
                            label="Nome"
                            type="text"
                            placeholder="Digite seu nome"
                            required
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />

                        <FormField
                            name="lastName"
                            label="Sobrenome"
                            type="text"
                            placeholder="Digite seu sobrenome"
                            required
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                    </div>

                    <FormField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Digite um username único"
                        required
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />

                    <FormField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Digite seu email"
                        required
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />

                    <FormField
                        name="password"
                        label="Senha"
                        type="password"
                        placeholder="Digite uma senha segura"
                        required
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />

                    <FormField
                        name="confirmPassword"
                        label="Confirmar Senha"
                        type="password"
                        placeholder="Digite a senha novamente"
                        required
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        loading={isSubmitting}
                        className="auth-submit-btn"
                    >
                        Cadastrar
                    </Button>
                </form>

                <div className="auth-footer">
                    <p>
                        Já tem uma conta?{' '}
                        <Link to="/login" className="auth-link">
                            Entre aqui
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
```

Os formulários de autenticação implementam validação robusta tanto no frontend quanto integração com validações do backend. A duplicação de validações garante feedback imediato para usuários enquanto mantém segurança no servidor.

O tratamento diferenciado de erros de validação e erros de submissão oferece experiência de usuário superior, exibindo mensagens específicas para cada tipo de problema. A integração com o hook useForm simplifica gerenciamento de estado complexo.

A implementação de confirmação de senha no frontend evita submissões desnecessárias ao servidor quando senhas não coincidem, melhorando performance e experiência do usuário.

## Implementação de Roteamento

### Configuração do React Router

Crie um arquivo `src/components/Router/ProtectedRoute.js` para implementar rotas protegidas que requerem autenticação.

```javascript
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Mostrar loading enquanto verifica autenticação
    if (isLoading()) {
        return (
            <div className="loading-container">
                <div className="loading-spinner" />
                <p>Carregando...</p>
            </div>
        );
    }

    // Verificar se usuário está autenticado quando rota requer autenticação
    if (requireAuth && !isAuthenticated()) {
        // Salvar localização atual para redirecionamento após login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Redirecionar usuários autenticados para dashboard se tentarem acessar login/register
    if (!requireAuth && isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
```

Crie um arquivo `src/components/Router/AppRouter.js` para configurar todas as rotas da aplicação.

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import ProtectedRoute from './ProtectedRoute';

// Páginas
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import DashboardPage from '../../pages/DashboardPage';
import ProfilePage from '../../pages/ProfilePage';
import NotFoundPage from '../../pages/NotFoundPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Rota pública - Home */}
                    <Route path="/" element={<HomePage />} />

                    {/* Rotas de autenticação - apenas para usuários não autenticados */}
                    <Route 
                        path="/login" 
                        element={
                            <ProtectedRoute requireAuth={false}>
                                <LoginPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/register" 
                        element={
                            <ProtectedRoute requireAuth={false}>
                                <RegisterPage />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Rotas protegidas - apenas para usuários autenticados */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/profile" 
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Redirecionamento padrão */}
                    <Route path="/home" element={<Navigate to="/" replace />} />

                    {/* Página 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRouter;
```

A implementação de rotas protegidas garante que apenas usuários autenticados acessem áreas restritas da aplicação. O salvamento da localização atual permite redirecionamento inteligente após login, melhorando a experiência do usuário.

O tratamento de estados de carregamento evita flashes de conteúdo inadequado durante verificação de autenticação. Esta atenção aos detalhes de UX é fundamental para aplicações profissionais.

A estrutura de roteamento modular facilita adição de novas páginas e modificação de regras de acesso conforme a aplicação evolui.

## Desenvolvimento de Páginas

### Página Inicial

Crie um arquivo `src/pages/HomePage.js` para implementar a página inicial da aplicação.

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Form/Button';
import './HomePage.css';

const HomePage = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Sistema de Cadastro de Usuários
                    </h1>
                    <p className="hero-description">
                        Uma solução completa para gerenciamento de usuários com 
                        autenticação segura e interface moderna.
                    </p>
                    
                    {isAuthenticated() ? (
                        <div className="hero-authenticated">
                            <p className="welcome-message">
                                Bem-vindo de volta, {user?.firstName}!
                            </p>
                            <Link to="/dashboard">
                                <Button variant="primary" size="large">
                                    Ir para Dashboard
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="hero-actions">
                            <Link to="/register">
                                <Button variant="primary" size="large">
                                    Começar Agora
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="secondary" size="large">
                                    Já tenho conta
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="features-section">
                <div className="features-container">
                    <h2 className="features-title">Principais Funcionalidades</h2>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔐</div>
                            <h3>Autenticação Segura</h3>
                            <p>
                                Sistema de login com JWT e criptografia de senhas 
                                para máxima segurança dos dados.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">👤</div>
                            <h3>Gerenciamento de Perfil</h3>
                            <p>
                                Interface intuitiva para atualização de dados 
                                pessoais e configurações da conta.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Design Responsivo</h3>
                            <p>
                                Interface adaptável que funciona perfeitamente 
                                em desktop, tablet e dispositivos móveis.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Performance Otimizada</h3>
                            <p>
                                Aplicação rápida e eficiente construída com 
                                as melhores práticas de desenvolvimento.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-content">
                    <h2>Pronto para começar?</h2>
                    <p>
                        Crie sua conta gratuitamente e experimente todas as 
                        funcionalidades do nosso sistema.
                    </p>
                    
                    {!isAuthenticated() && (
                        <Link to="/register">
                            <Button variant="primary" size="large">
                                Criar Conta Grátis
                            </Button>
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
```

### Página de Dashboard

Crie um arquivo `src/pages/DashboardPage.js` para implementar o painel principal do usuário.

```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import userService from '../services/userService';
import Button from '../components/Form/Button';
import './DashboardPage.css';

const DashboardPage = () => {
    const { user, updateUser } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        newUsersToday: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        setError('');

        try {
            // Carregar dados atualizados do perfil
            const profileResult = await userService.getProfile();
            
            if (profileResult.success) {
                updateUser(profileResult.data);
            }

            // Simular carregamento de estatísticas
            // Em uma aplicação real, estes dados viriam da API
            setTimeout(() => {
                setStats({
                    totalUsers: 1250,
                    activeUsers: 1180,
                    newUsersToday: 23
                });
                setLoading(false);
            }, 1000);

        } catch (error) {
            setError('Erro ao carregar dados do dashboard');
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner" />
                <p>Carregando dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Bem-vindo de volta, {user?.firstName}!</p>
            </div>

            {error && (
                <div className="error-message" role="alert">
                    {error}
                    <Button 
                        variant="secondary" 
                        size="small" 
                        onClick={loadDashboardData}
                    >
                        Tentar Novamente
                    </Button>
                </div>
            )}

            <div className="dashboard-content">
                <section className="user-info-section">
                    <div className="user-card">
                        <div className="user-avatar">
                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </div>
                        <div className="user-details">
                            <h2>{user?.firstName} {user?.lastName}</h2>
                            <p className="user-email">{user?.email}</p>
                            <p className="user-username">@{user?.username}</p>
                            <p className="user-since">
                                Membro desde {formatDate(user?.createdAt)}
                            </p>
                        </div>
                        <div className="user-actions">
                            <Button variant="primary" size="medium">
                                Editar Perfil
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="stats-section">
                    <h2>Estatísticas do Sistema</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">👥</div>
                            <div className="stat-content">
                                <h3>Total de Usuários</h3>
                                <p className="stat-number">{stats.totalUsers.toLocaleString()}</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">✅</div>
                            <div className="stat-content">
                                <h3>Usuários Ativos</h3>
                                <p className="stat-number">{stats.activeUsers.toLocaleString()}</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">🆕</div>
                            <div className="stat-content">
                                <h3>Novos Hoje</h3>
                                <p className="stat-number">{stats.newUsersToday}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="quick-actions-section">
                    <h2>Ações Rápidas</h2>
                    <div className="quick-actions-grid">
                        <Button variant="primary" size="large">
                            Atualizar Perfil
                        </Button>
                        <Button variant="secondary" size="large">
                            Alterar Senha
                        </Button>
                        <Button variant="secondary" size="large">
                            Configurações
                        </Button>
                        <Button variant="secondary" size="large">
                            Suporte
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DashboardPage;
```

As páginas implementadas demonstram diferentes padrões de design e funcionalidade comuns em aplicações React. A página inicial utiliza conteúdo condicional baseado no estado de autenticação, oferecendo experiência personalizada para diferentes tipos de usuários.

O dashboard implementa carregamento assíncrono de dados com estados de loading e erro apropriados. Esta abordagem garante que usuários recebam feedback visual adequado durante operações que podem demorar.

A estrutura modular das páginas facilita manutenção e permite reutilização de componentes em diferentes contextos. O uso consistente de componentes reutilizáveis garante experiência visual coesa em toda a aplicação.

## Estilização e Design Responsivo

### Configuração de Estilos Globais

Crie um arquivo `src/styles/globals.css` para definir estilos globais e variáveis CSS.

```css
/* Reset e configurações básicas */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Variáveis CSS */
:root {
    /* Cores primárias */
    --primary-color: #3b82f6;
    --primary-hover: #2563eb;
    --primary-light: #dbeafe;
    
    /* Cores secundárias */
    --secondary-color: #6b7280;
    --secondary-hover: #4b5563;
    --secondary-light: #f3f4f6;
    
    /* Cores de estado */
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    --info-color: #06b6d4;
    
    /* Cores neutras */
    --white: #ffffff;
    --black: #000000;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    
    /* Tipografia */
    --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    --font-family-mono: 'Fira Code', 'Monaco', 'Consolas', monospace;
    
    /* Tamanhos de fonte */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    
    /* Espaçamentos */
    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-3: 0.75rem;
    --spacing-4: 1rem;
    --spacing-5: 1.25rem;
    --spacing-6: 1.5rem;
    --spacing-8: 2rem;
    --spacing-10: 2.5rem;
    --spacing-12: 3rem;
    --spacing-16: 4rem;
    --spacing-20: 5rem;
    
    /* Bordas */
    --border-radius-sm: 0.25rem;
    --border-radius: 0.375rem;
    --border-radius-md: 0.5rem;
    --border-radius-lg: 0.75rem;
    --border-radius-xl: 1rem;
    
    /* Sombras */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    
    /* Transições */
    --transition-fast: 150ms ease-in-out;
    --transition-normal: 250ms ease-in-out;
    --transition-slow: 350ms ease-in-out;
    
    /* Breakpoints */
    --breakpoint-sm: 640px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
}

/* Configurações do body */
body {
    font-family: var(--font-family-sans);
    font-size: var(--text-base);
    line-height: 1.6;
    color: var(--gray-900);
    background-color: var(--gray-50);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Configurações de tipografia */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: var(--spacing-4);
}

h1 { font-size: var(--text-4xl); }
h2 { font-size: var(--text-3xl); }
h3 { font-size: var(--text-2xl); }
h4 { font-size: var(--text-xl); }
h5 { font-size: var(--text-lg); }
h6 { font-size: var(--text-base); }

p {
    margin-bottom: var(--spacing-4);
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color var(--transition-fast);
}

a:hover {
    color: var(--primary-hover);
}

/* Classes utilitárias */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-4);
}

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }

.text-primary { color: var(--primary-color); }
.text-secondary { color: var(--secondary-color); }
.text-success { color: var(--success-color); }
.text-warning { color: var(--warning-color); }
.text-error { color: var(--error-color); }

.bg-primary { background-color: var(--primary-color); }
.bg-secondary { background-color: var(--secondary-color); }
.bg-white { background-color: var(--white); }

.rounded { border-radius: var(--border-radius); }
.rounded-lg { border-radius: var(--border-radius-lg); }

.shadow { box-shadow: var(--shadow); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }

/* Estados de loading */
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-20);
    text-align: center;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--gray-200);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: var(--spacing-4);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Mensagens de erro */
.error-message {
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: var(--spacing-4);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Responsividade */
@media (max-width: 768px) {
    .container {
        padding: 0 var(--spacing-3);
    }
    
    h1 { font-size: var(--text-3xl); }
    h2 { font-size: var(--text-2xl); }
    h3 { font-size: var(--text-xl); }
}
```

### Estilos dos Componentes

Crie arquivos CSS específicos para cada componente. Por exemplo, `src/components/Form/Input.css`:

```css
.input-group {
    margin-bottom: var(--spacing-4);
}

.input-label {
    display: block;
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--gray-700);
    margin-bottom: var(--spacing-2);
}

.required-asterisk {
    color: var(--error-color);
    margin-left: var(--spacing-1);
}

.input-field {
    width: 100%;
    padding: var(--spacing-3) var(--spacing-4);
    border: 1px solid var(--gray-300);
    border-radius: var(--border-radius);
    font-size: var(--text-base);
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    background-color: var(--white);
}

.input-field:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field:disabled {
    background-color: var(--gray-100);
    color: var(--gray-500);
    cursor: not-allowed;
}

.input-field.input-error {
    border-color: var(--error-color);
}

.input-field.input-error:focus {
    border-color: var(--error-color);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-error-message {
    display: block;
    font-size: var(--text-sm);
    color: var(--error-color);
    margin-top: var(--spacing-1);
}

/* Responsividade */
@media (max-width: 768px) {
    .input-field {
        padding: var(--spacing-3);
        font-size: var(--text-sm);
    }
}
```

A implementação de um sistema de design consistente utilizando variáveis CSS facilita manutenção e permite mudanças globais de tema com modificações mínimas. Esta abordagem é fundamental para aplicações profissionais que precisam manter consistência visual.

O uso de classes utilitárias reduz duplicação de código CSS e acelera desenvolvimento de novos componentes. A organização modular de estilos facilita localização e modificação de estilos específicos.

A implementação de design responsivo através de media queries garante que a aplicação funcione adequadamente em diferentes tamanhos de tela, desde smartphones até desktops de alta resolução.

## Testes da Aplicação React

### Configuração de Testes

Crie um arquivo `src/setupTests.js` para configurar o ambiente de testes.

```javascript
import '@testing-library/jest-dom';

// Mock do localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock do fetch
global.fetch = jest.fn();

// Configurações globais para testes
beforeEach(() => {
    localStorage.clear();
    fetch.mockClear();
});
```

### Testes de Componentes

Crie um arquivo `src/components/Form/__tests__/Input.test.js` para testar o componente Input.

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input Component', () => {
    const defaultProps = {
        name: 'test-input',
        label: 'Test Label',
        value: '',
        onChange: jest.fn(),
        onBlur: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve renderizar corretamente', () => {
        render(<Input {...defaultProps} />);
        
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('deve exibir asterisco para campos obrigatórios', () => {
        render(<Input {...defaultProps} required />);
        
        expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('deve exibir mensagem de erro quando fornecida', () => {
        const errorMessage = 'Campo obrigatório';
        render(
            <Input 
                {...defaultProps} 
                error={errorMessage} 
                touched={true} 
            />
        );
        
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveClass('input-error');
    });

    it('deve chamar onChange quando valor é alterado', () => {
        const handleChange = jest.fn();
        render(<Input {...defaultProps} onChange={handleChange} />);
        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'novo valor' } });
        
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onBlur quando campo perde foco', () => {
        const handleBlur = jest.fn();
        render(<Input {...defaultProps} onBlur={handleBlur} />);
        
        const input = screen.getByRole('textbox');
        fireEvent.blur(input);
        
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('deve estar desabilitado quando prop disabled é true', () => {
        render(<Input {...defaultProps} disabled />);
        
        expect(screen.getByRole('textbox')).toBeDisabled();
    });
});
```

### Testes de Integração

Crie um arquivo `src/components/Auth/__tests__/LoginForm.test.js` para testar o formulário de login.

```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';
import LoginForm from '../LoginForm';
import authService from '../../../services/authService';

// Mock do authService
jest.mock('../../../services/authService');

const MockedLoginForm = () => (
    <BrowserRouter>
        <AuthProvider>
            <LoginForm />
        </AuthProvider>
    </BrowserRouter>
);

describe('LoginForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve renderizar formulário de login', () => {
        render(<MockedLoginForm />);
        
        expect(screen.getByText('Entrar na sua conta')).toBeInTheDocument();
        expect(screen.getByLabelText(/email ou username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    it('deve exibir erros de validação para campos vazios', async () => {
        render(<MockedLoginForm />);
        
        const submitButton = screen.getByRole('button', { name: /entrar/i });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText(/email ou username é obrigatório/i)).toBeInTheDocument();
            expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument();
        });
    });

    it('deve submeter formulário com dados válidos', async () => {
        const mockLogin = jest.fn().mockResolvedValue({ success: true });
        authService.login = mockLogin;
        
        render(<MockedLoginForm />);
        
        const identifierInput = screen.getByLabelText(/email ou username/i);
        const passwordInput = screen.getByLabelText(/senha/i);
        const submitButton = screen.getByRole('button', { name: /entrar/i });
        
        fireEvent.change(identifierInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                identifier: 'test@example.com',
                password: 'password123'
            });
        });
    });

    it('deve exibir erro quando login falha', async () => {
        const mockLogin = jest.fn().mockResolvedValue({ 
            success: false, 
            message: 'Credenciais inválidas' 
        });
        authService.login = mockLogin;
        
        render(<MockedLoginForm />);
        
        const identifierInput = screen.getByLabelText(/email ou username/i);
        const passwordInput = screen.getByLabelText(/senha/i);
        const submitButton = screen.getByRole('button', { name: /entrar/i });
        
        fireEvent.change(identifierInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
        });
    });
});
```

Os testes implementados cobrem diferentes aspectos da aplicação, desde componentes individuais até fluxos completos de usuário. A utilização de React Testing Library promove testes que verificam comportamento da aplicação do ponto de vista do usuário.

O mock de serviços externos permite testar componentes de forma isolada, garantindo que testes sejam rápidos e confiáveis. Esta abordagem facilita identificação de problemas específicos quando testes falham.

A cobertura de testes inclui casos de sucesso, erro e validação, proporcionando confiança na qualidade e confiabilidade da aplicação React desenvolvida.

Esta implementação completa do frontend React demonstra como construir uma aplicação web moderna que consome APIs REST de forma eficiente e segura. A arquitetura modular, gerenciamento de estado robusto e interface responsiva criam uma base sólida para sistemas de cadastro de usuários profissionais.

