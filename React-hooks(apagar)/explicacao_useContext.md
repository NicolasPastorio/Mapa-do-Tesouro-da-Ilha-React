# useContext no React

O Hook `useContext` é uma ferramenta poderosa no React que permite compartilhar dados entre componentes sem a necessidade de passar props manualmente através de cada nível da árvore de componentes. Ele resolve o problema conhecido como "prop drilling" (perfuração de props), onde você precisa passar props através de múltiplos componentes intermediários que não precisam desses dados.

## Conceito Básico

A Context API do React consiste em três partes principais:
1. **React.createContext**: Cria um objeto de contexto
2. **Context.Provider**: Componente que fornece o valor do contexto para seus descendentes
3. **useContext**: Hook que permite consumir o valor do contexto

O `useContext` é a forma mais elegante de consumir um contexto em componentes funcionais, substituindo o padrão mais verboso de `Context.Consumer`.

## Sintaxe Básica

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Criar o contexto
const MeuContexto = createContext();

// 2. Criar um provedor de contexto
function MeuProvedorContexto({ children }) {
  const [valor, setValor] = useState('valor inicial');
  
  return (
    <MeuContexto.Provider value={{ valor, setValor }}>
      {children}
    </MeuContexto.Provider>
  );
}

// 3. Consumir o contexto com useContext
function ComponenteFilho() {
  const { valor, setValor } = useContext(MeuContexto);
  
  return (
    <div>
      <p>Valor do contexto: {valor}</p>
      <button onClick={() => setValor('novo valor')}>
        Mudar valor
      </button>
    </div>
  );
}

// 4. Usar o provedor na árvore de componentes
function App() {
  return (
    <MeuProvedorContexto>
      <div>
        <h1>Meu App</h1>
        <ComponenteFilho />
      </div>
    </MeuProvedorContexto>
  );
}
```

## Criando um Contexto

Para criar um contexto, use a função `createContext`:

```jsx
import { createContext } from 'react';

// Você pode fornecer um valor padrão (opcional)
const TemaContexto = createContext('claro');
```

O valor padrão é usado apenas quando um componente não tem um Provider correspondente acima dele na árvore de componentes. Isso é útil para:
- Testes de componentes isolados
- Reutilização de componentes em diferentes partes da aplicação

## Fornecendo um Valor de Contexto

Para fornecer um valor de contexto aos componentes filhos, use o componente `Provider`:

```jsx
function App() {
  const [tema, setTema] = useState('escuro');
  
  return (
    <TemaContexto.Provider value={tema}>
      <Toolbar />
      <button onClick={() => setTema(tema === 'escuro' ? 'claro' : 'escuro')}>
        Alternar Tema
      </button>
    </TemaContexto.Provider>
  );
}
```

Pontos importantes:
- Todos os componentes que são descendentes do Provider podem acessar o valor do contexto
- Quando o valor do Provider muda, todos os componentes que consomem o contexto são re-renderizados
- Você pode aninhar Providers para sobrescrever valores mais profundos na árvore

## Consumindo o Contexto com useContext

Para consumir o valor do contexto em um componente funcional, use o Hook `useContext`:

```jsx
function Botao() {
  const tema = useContext(TemaContexto);
  
  return (
    <button className={`botao-${tema}`}>
      Botão com Tema {tema}
    </button>
  );
}
```

O `useContext` aceita um objeto de contexto (o valor retornado de `React.createContext`) e retorna o valor atual do contexto. O valor atual é determinado pelo prop `value` do `Provider` mais próximo acima do componente na árvore.

## Atualizando o Valor do Contexto

Para permitir que componentes consumidores atualizem o contexto, você pode incluir funções no valor do contexto:

```jsx
const TemaContexto = createContext();

function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro');
  
  // Incluindo tanto o estado quanto a função para atualizá-lo
  const valor = {
    tema,
    alternarTema: () => {
      setTema(temaAtual => temaAtual === 'claro' ? 'escuro' : 'claro');
    }
  };
  
  return (
    <TemaContexto.Provider value={valor}>
      {children}
    </TemaContexto.Provider>
  );
}

function BotaoTema() {
  const { tema, alternarTema } = useContext(TemaContexto);
  
  return (
    <button onClick={alternarTema}>
      Tema Atual: {tema}
    </button>
  );
}
```

## Casos de Uso Comuns

### 1. Tema da Aplicação

```jsx
const TemaContexto = createContext();

function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro');
  
  const alternarTema = () => {
    setTema(temaAtual => temaAtual === 'claro' ? 'escuro' : 'claro');
  };
  
  // Memoize o valor para evitar re-renderizações desnecessárias
  const valor = useMemo(() => {
    return { tema, alternarTema };
  }, [tema]);
  
  return (
    <TemaContexto.Provider value={valor}>
      {children}
    </TemaContexto.Provider>
  );
}

function useTema() {
  const contexto = useContext(TemaContexto);
  if (!contexto) {
    throw new Error('useTema deve ser usado dentro de um TemaProvider');
  }
  return contexto;
}

// Uso em componentes
function Cabecalho() {
  const { tema } = useTema();
  return <header className={`cabecalho-${tema}`}>Meu App</header>;
}

function AlternadorTema() {
  const { tema, alternarTema } = useTema();
  return (
    <button onClick={alternarTema}>
      Mudar para tema {tema === 'claro' ? 'escuro' : 'claro'}
    </button>
  );
}

function App() {
  return (
    <TemaProvider>
      <div className="app">
        <Cabecalho />
        <main>
          <h1>Conteúdo</h1>
          <AlternadorTema />
        </main>
      </div>
    </TemaProvider>
  );
}
```

### 2. Autenticação de Usuário

```jsx
const AuthContexto = createContext();

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  
  useEffect(() => {
    // Verificar se o usuário está autenticado (ex: token no localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      // Buscar informações do usuário com o token
      fetchUsuario(token)
        .then(dadosUsuario => {
          setUsuario(dadosUsuario);
        })
        .catch(erro => {
          console.error('Erro ao buscar usuário:', erro);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setCarregando(false);
        });
    } else {
      setCarregando(false);
    }
  }, []);
  
  const login = async (email, senha) => {
    try {
      const resposta = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      
      if (!resposta.ok) {
        throw new Error('Falha no login');
      }
      
      const { token, usuario } = await resposta.json();
      localStorage.setItem('token', token);
      setUsuario(usuario);
      return true;
    } catch (erro) {
      console.error('Erro no login:', erro);
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };
  
  const valor = useMemo(() => {
    return { usuario, carregando, login, logout };
  }, [usuario, carregando]);
  
  return (
    <AuthContexto.Provider value={valor}>
      {children}
    </AuthContexto.Provider>
  );
}

function useAuth() {
  const contexto = useContext(AuthContexto);
  if (!contexto) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return contexto;
}

// Uso em componentes
function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await login(email, senha);
    if (sucesso) {
      // Redirecionar ou mostrar mensagem de sucesso
    } else {
      // Mostrar erro
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
    </form>
  );
}

function PerfilUsuario() {
  const { usuario, logout } = useAuth();
  
  if (!usuario) {
    return <p>Você precisa fazer login</p>;
  }
  
  return (
    <div>
      <h2>Perfil de {usuario.nome}</h2>
      <p>Email: {usuario.email}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

function RotaProtegida({ children }) {
  const { usuario, carregando } = useAuth();
  
  if (carregando) {
    return <p>Carregando...</p>;
  }
  
  if (!usuario) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

### 3. Gerenciamento de Estado Global

```jsx
const EstadoContexto = createContext();

// Um reducer simples para gerenciar o estado
function reducer(estado, acao) {
  switch (acao.type) {
    case 'INCREMENTAR':
      return { ...estado, contador: estado.contador + 1 };
    case 'DECREMENTAR':
      return { ...estado, contador: estado.contador - 1 };
    case 'DEFINIR_USUARIO':
      return { ...estado, usuario: acao.payload };
    default:
      return estado;
  }
}

function EstadoProvider({ children }) {
  const [estado, dispatch] = useReducer(reducer, {
    contador: 0,
    usuario: null
  });
  
  const valor = useMemo(() => {
    return { estado, dispatch };
  }, [estado]);
  
  return (
    <EstadoContexto.Provider value={valor}>
      {children}
    </EstadoContexto.Provider>
  );
}

function useEstadoGlobal() {
  const contexto = useContext(EstadoContexto);
  if (!contexto) {
    throw new Error('useEstadoGlobal deve ser usado dentro de um EstadoProvider');
  }
  return contexto;
}

// Uso em componentes
function Contador() {
  const { estado, dispatch } = useEstadoGlobal();
  
  return (
    <div>
      <p>Contador: {estado.contador}</p>
      <button onClick={() => dispatch({ type: 'INCREMENTAR' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENTAR' })}>-</button>
    </div>
  );
}

function PerfilUsuario() {
  const { estado, dispatch } = useEstadoGlobal();
  
  const definirUsuario = (novoUsuario) => {
    dispatch({ type: 'DEFINIR_USUARIO', payload: novoUsuario });
  };
  
  return (
    <div>
      {estado.usuario ? (
        <p>Olá, {estado.usuario.nome}</p>
      ) : (
        <button onClick={() => definirUsuario({ nome: 'João' })}>
          Definir Usuário
        </button>
      )}
    </div>
  );
}
```

### 4. Preferências de Idioma (Internacionalização)

```jsx
const IdiomaContexto = createContext();

const traducoes = {
  'pt-BR': {
    saudacao: 'Olá',
    despedida: 'Até logo',
    botaoIdioma: 'Mudar para Inglês'
  },
  'en-US': {
    saudacao: 'Hello',
    despedida: 'Goodbye',
    botaoIdioma: 'Switch to Portuguese'
  }
};

function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState('pt-BR');
  
  const alternarIdioma = () => {
    setIdioma(idiomaAtual => idiomaAtual === 'pt-BR' ? 'en-US' : 'pt-BR');
  };
  
  const traduzir = (chave) => {
    return traducoes[idioma][chave] || chave;
  };
  
  const valor = useMemo(() => {
    return { idioma, alternarIdioma, traduzir };
  }, [idioma]);
  
  return (
    <IdiomaContexto.Provider value={valor}>
      {children}
    </IdiomaContexto.Provider>
  );
}

function useIdioma() {
  const contexto = useContext(IdiomaContexto);
  if (!contexto) {
    throw new Error('useIdioma deve ser usado dentro de um IdiomaProvider');
  }
  return contexto;
}

// Uso em componentes
function Saudacao() {
  const { traduzir } = useIdioma();
  return <h1>{traduzir('saudacao')}, Mundo!</h1>;
}

function BotaoIdioma() {
  const { alternarIdioma, traduzir } = useIdioma();
  return (
    <button onClick={alternarIdioma}>
      {traduzir('botaoIdioma')}
    </button>
  );
}
```

## Otimizações de Performance

### 1. Memoização do Valor do Contexto

Quando o valor do contexto é um objeto ou array, ele é recriado a cada renderização do Provider, o que pode causar re-renderizações desnecessárias em todos os componentes consumidores. Use `useMemo` para evitar isso:

```jsx
function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro');
  
  // Sem useMemo - o objeto é recriado a cada renderização
  // const valor = { tema, setTema };
  
  // Com useMemo - o objeto só é recriado quando tema muda
  const valor = useMemo(() => {
    return { tema, setTema };
  }, [tema]);
  
  return (
    <TemaContexto.Provider value={valor}>
      {children}
    </TemaContexto.Provider>
  );
}
```

### 2. Dividir Contextos

Em vez de ter um único contexto grande, divida em contextos menores e mais específicos:

```jsx
// ❌ Um único contexto grande
const AppContexto = createContext();

function AppProvider({ children }) {
  const [tema, setTema] = useState('claro');
  const [usuario, setUsuario] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);
  
  // Todos os componentes que usam qualquer parte deste contexto
  // serão re-renderizados quando qualquer valor mudar
  return (
    <AppContexto.Provider value={{ 
      tema, setTema, 
      usuario, setUsuario, 
      notificacoes, setNotificacoes 
    }}>
      {children}
    </AppContexto.Provider>
  );
}

// ✅ Contextos separados
const TemaContexto = createContext();
const UsuarioContexto = createContext();
const NotificacoesContexto = createContext();

function AppProvider({ children }) {
  return (
    <TemaProvider>
      <UsuarioProvider>
        <NotificacoesProvider>
          {children}
        </NotificacoesProvider>
      </UsuarioProvider>
    </TemaProvider>
  );
}
```

### 3. Contexto para Estado vs. Atualizações

Você pode dividir seu contexto em dois: um para leitura de estado e outro para atualizações:

```jsx
const EstadoContexto = createContext();
const DispatchContexto = createContext();

function AppProvider({ children }) {
  const [estado, dispatch] = useReducer(reducer, estadoInicial);
  
  return (
    <EstadoContexto.Provider value={estado}>
      <DispatchContexto.Provider value={dispatch}>
        {children}
      </DispatchContexto.Provider>
    </EstadoContexto.Provider>
  );
}

// Componentes que só precisam ler o estado
function ComponenteLeitura() {
  const estado = useContext(EstadoContexto);
  // Este componente só re-renderiza quando o estado muda
  return <div>{estado.valor}</div>;
}

// Componentes que só precisam atualizar o estado
function ComponenteAtualizacao() {
  const dispatch = useContext(DispatchContexto);
  // Este componente nunca re-renderiza devido a mudanças no estado
  return <button onClick={() => dispatch({ type: 'INCREMENTAR' })}>+</button>;
}
```

## Padrões Comuns

### 1. Hook Customizado para Contexto

Crie um Hook customizado para encapsular o uso do contexto e fornecer verificação de erros:

```jsx
function useAuth() {
  const contexto = useContext(AuthContexto);
  if (contexto === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return contexto;
}

// Uso
function MeuComponente() {
  const { usuario, login, logout } = useAuth();
  // ...
}
```

### 2. Composição de Providers

Quando você tem múltiplos contextos, você pode criar um componente que combina todos os providers:

```jsx
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <TemaProvider>
        <IdiomaProvider>
          <NotificacoesProvider>
            {children}
          </NotificacoesProvider>
        </IdiomaProvider>
      </TemaProvider>
    </AuthProvider>
  );
}

// Uso
function App() {
  return (
    <AppProviders>
      <MeuApp />
    </AppProviders>
  );
}
```

### 3. Contexto com Valor Inicial Dinâmico

Você pode criar um contexto que aceita um valor inicial como prop:

```jsx
function TemaProvider({ valorInicial = 'claro', children }) {
  const [tema, setTema] = useState(valorInicial);
  
  // ...
  
  return (
    <TemaContexto.Provider value={{ tema, setTema }}>
      {children}
    </TemaContexto.Provider>
  );
}

// Uso
function App() {
  return (
    <TemaProvider valorInicial="escuro">
      <MeuApp />
    </TemaProvider>
  );
}
```

## Limitações e Considerações

### 1. Re-renderizações

Quando o valor do co
(Content truncated due to size limit. Use line ranges to read in chunks)