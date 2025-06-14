# useReducer no React

O Hook `useReducer` é uma alternativa ao `useState` para gerenciar estados complexos em componentes React. Ele é inspirado no padrão de gerenciamento de estado do Redux e é especialmente útil quando o próximo estado depende do estado anterior ou quando você tem lógica de atualização de estado complexa.

## Conceito Básico

O `useReducer` é baseado no padrão "reducer" da programação funcional, onde você usa uma função pura para transformar um estado em outro com base em uma ação. Este padrão é particularmente útil para gerenciar estados que contêm múltiplos sub-valores ou quando o próximo estado depende do anterior.

Um reducer é uma função pura que recebe dois argumentos: o estado atual e uma ação, e retorna o novo estado:

```javascript
(state, action) => newState
```

## Sintaxe Básica

```jsx
import { useReducer } from 'react';

// Função reducer
function reducer(state, action) {
  switch (action.type) {
    case 'incrementar':
      return { contador: state.contador + 1 };
    case 'decrementar':
      return { contador: state.contador - 1 };
    case 'definir':
      return { contador: action.payload };
    case 'resetar':
      return { contador: 0 };
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}

function Contador() {
  // Inicializa o estado com { contador: 0 }
  const [state, dispatch] = useReducer(reducer, { contador: 0 });
  
  return (
    <div>
      <p>Contador: {state.contador}</p>
      <button onClick={() => dispatch({ type: 'incrementar' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrementar' })}>-</button>
      <button onClick={() => dispatch({ type: 'definir', payload: 10 })}>Definir como 10</button>
      <button onClick={() => dispatch({ type: 'resetar' })}>Resetar</button>
    </div>
  );
}
```

Vamos analisar esta sintaxe:

1. **Importação**: Importamos o Hook `useReducer` do React.
2. **Função Reducer**: Definimos uma função `reducer` que especifica como o estado deve mudar em resposta a diferentes ações.
3. **Inicialização**: Chamamos `useReducer` com a função reducer e o estado inicial.
4. **Retorno**: `useReducer` retorna um array com dois elementos:
   - O **estado atual** (`state`)
   - Uma **função dispatch** (`dispatch`) para enviar ações ao reducer
5. **Uso**: Usamos `state` para ler o estado e `dispatch` para enviar ações que atualizam o estado.

## Parâmetros do useReducer

O Hook `useReducer` aceita três parâmetros:

```jsx
const [state, dispatch] = useReducer(reducer, initialState, init);
```

1. **reducer**: A função reducer que especifica como o estado é atualizado.
2. **initialState**: O valor inicial do estado.
3. **init** (opcional): Uma função para calcular o estado inicial lazily (preguiçosamente).

### Inicialização Preguiçosa (Lazy Initialization)

Você pode usar o terceiro parâmetro do `useReducer` para calcular o estado inicial de forma preguiçosa:

```jsx
function init(initialCount) {
  return { contador: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'incrementar':
      return { contador: state.contador + 1 };
    case 'decrementar':
      return { contador: state.contador - 1 };
    case 'resetar':
      return init(action.payload);
    default:
      return state;
  }
}

function Contador({ initialCount = 0 }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  
  return (
    <div>
      <p>Contador: {state.contador}</p>
      <button onClick={() => dispatch({ type: 'incrementar' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrementar' })}>-</button>
      <button onClick={() => dispatch({ type: 'resetar', payload: initialCount })}>
        Resetar
      </button>
    </div>
  );
}
```

Esta abordagem é útil quando:
- O cálculo do estado inicial é custoso
- O estado inicial depende de props
- Você quer reutilizar a lógica de inicialização em outros lugares

## useReducer vs. useState

### Quando Usar useState

- Para estados simples (números, strings, booleanos)
- Quando a lógica de atualização é simples
- Quando os valores de estado são independentes

```jsx
function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState(0);
  
  // Lógica de atualização simples
  const handleNomeChange = (e) => setNome(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleIdadeChange = (e) => setIdade(Number(e.target.value));
  
  // ...
}
```

### Quando Usar useReducer

- Para estados complexos (objetos, arrays aninhados)
- Quando o próximo estado depende do anterior
- Quando a lógica de atualização é complexa
- Quando você tem muitas atualizações de estado relacionadas
- Quando você quer centralizar a lógica de atualização

```jsx
function Formulario() {
  const [state, dispatch] = useReducer(reducer, {
    nome: '',
    email: '',
    idade: 0,
    erros: {},
    enviando: false,
    enviado: false
  });
  
  // Lógica de atualização centralizada no reducer
  const handleChange = (e) => {
    dispatch({
      type: 'campo',
      field: e.target.name,
      value: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'enviar' });
    // Lógica de envio...
  };
  
  // ...
}

function reducer(state, action) {
  switch (action.type) {
    case 'campo':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'enviar':
      return {
        ...state,
        enviando: true,
        erros: validarFormulario(state)
      };
    case 'sucesso':
      return {
        ...state,
        enviando: false,
        enviado: true
      };
    case 'erro':
      return {
        ...state,
        enviando: false,
        erros: action.erros
      };
    case 'resetar':
      return {
        nome: '',
        email: '',
        idade: 0,
        erros: {},
        enviando: false,
        enviado: false
      };
    default:
      return state;
  }
}
```

## Estrutura de Ações

As ações enviadas para um reducer geralmente seguem uma convenção:

```javascript
{
  type: 'NOME_DA_ACAO',  // Identificador da ação (obrigatório)
  payload: any           // Dados adicionais (opcional)
}
```

- **type**: Uma string que identifica o tipo de ação (geralmente em maiúsculas)
- **payload**: Quaisquer dados adicionais necessários para a ação

Esta convenção não é obrigatória, mas é amplamente adotada e torna o código mais previsível.

## Padrões Comuns

### 1. Gerenciamento de Formulários

```jsx
const initialState = {
  nome: '',
  email: '',
  senha: '',
  confirmacaoSenha: '',
  tocado: {
    nome: false,
    email: false,
    senha: false,
    confirmacaoSenha: false
  },
  erros: {}
};

function reducer(state, action) {
  switch (action.type) {
    case 'campo':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'tocar':
      return {
        ...state,
        tocado: {
          ...state.tocado,
          [action.field]: true
        }
      };
    case 'validar':
      return {
        ...state,
        erros: validarFormulario(state)
      };
    case 'resetar':
      return initialState;
    default:
      return state;
  }
}

function validarFormulario(state) {
  const erros = {};
  
  if (!state.nome) erros.nome = 'Nome é obrigatório';
  if (!state.email) erros.email = 'Email é obrigatório';
  else if (!/\S+@\S+\.\S+/.test(state.email)) erros.email = 'Email inválido';
  if (!state.senha) erros.senha = 'Senha é obrigatória';
  else if (state.senha.length < 6) erros.senha = 'Senha deve ter pelo menos 6 caracteres';
  if (state.senha !== state.confirmacaoSenha) erros.confirmacaoSenha = 'Senhas não coincidem';
  
  return erros;
}

function Formulario() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const handleChange = (e) => {
    dispatch({
      type: 'campo',
      field: e.target.name,
      value: e.target.value
    });
  };
  
  const handleBlur = (e) => {
    dispatch({
      type: 'tocar',
      field: e.target.name
    });
    
    dispatch({ type: 'validar' });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Marcar todos os campos como tocados
    Object.keys(state.tocado).forEach(field => {
      dispatch({ type: 'tocar', field });
    });
    
    dispatch({ type: 'validar' });
    
    const erros = validarFormulario(state);
    if (Object.keys(erros).length === 0) {
      // Enviar formulário
      console.log('Formulário válido:', state);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={state.nome}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {state.tocado.nome && state.erros.nome && (
          <span className="erro">{state.erros.nome}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {state.tocado.email && state.erros.email && (
          <span className="erro">{state.erros.email}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={state.senha}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {state.tocado.senha && state.erros.senha && (
          <span className="erro">{state.erros.senha}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="confirmacaoSenha">Confirmar Senha:</label>
        <input
          type="password"
          id="confirmacaoSenha"
          name="confirmacaoSenha"
          value={state.confirmacaoSenha}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {state.tocado.confirmacaoSenha && state.erros.confirmacaoSenha && (
          <span className="erro">{state.erros.confirmacaoSenha}</span>
        )}
      </div>
      
      <button type="submit">Cadastrar</button>
      <button type="button" onClick={() => dispatch({ type: 'resetar' })}>
        Limpar
      </button>
    </form>
  );
}
```

### 2. Lista de Tarefas (Todo List)

```jsx
const initialState = {
  tarefas: [],
  novaTarefa: '',
  filtro: 'todas' // 'todas', 'ativas', 'concluidas'
};

function reducer(state, action) {
  switch (action.type) {
    case 'definir_nova_tarefa':
      return {
        ...state,
        novaTarefa: action.payload
      };
    case 'adicionar_tarefa':
      if (!state.novaTarefa.trim()) return state;
      return {
        ...state,
        tarefas: [
          ...state.tarefas,
          {
            id: Date.now(),
            texto: state.novaTarefa,
            concluida: false
          }
        ],
        novaTarefa: ''
      };
    case 'alternar_tarefa':
      return {
        ...state,
        tarefas: state.tarefas.map(tarefa =>
          tarefa.id === action.payload
            ? { ...tarefa, concluida: !tarefa.concluida }
            : tarefa
        )
      };
    case 'remover_tarefa':
      return {
        ...state,
        tarefas: state.tarefas.filter(tarefa => tarefa.id !== action.payload)
      };
    case 'definir_filtro':
      return {
        ...state,
        filtro: action.payload
      };
    case 'limpar_concluidas':
      return {
        ...state,
        tarefas: state.tarefas.filter(tarefa => !tarefa.concluida)
      };
    default:
      return state;
  }
}

function ListaDeTarefas() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const tarefasFiltradas = useMemo(() => {
    switch (state.filtro) {
      case 'ativas':
        return state.tarefas.filter(tarefa => !tarefa.concluida);
      case 'concluidas':
        return state.tarefas.filter(tarefa => tarefa.concluida);
      default:
        return state.tarefas;
    }
  }, [state.tarefas, state.filtro]);
  
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      
      <div>
        <input
          type="text"
          value={state.novaTarefa}
          onChange={(e) => dispatch({
            type: 'definir_nova_tarefa',
            payload: e.target.value
          })}
          placeholder="Nova tarefa..."
        />
        <button onClick={() => dispatch({ type: 'adicionar_tarefa' })}>
          Adicionar
        </button>
      </div>
      
      <div>
        <button
          onClick={() => dispatch({ type: 'definir_filtro', payload: 'todas' })}
          className={state.filtro === 'todas' ? 'ativo' : ''}
        >
          Todas
        </button>
        <button
          onClick={() => dispatch({ type: 'definir_filtro', payload: 'ativas' })}
          className={state.filtro === 'ativas' ? 'ativo' : ''}
        >
          Ativas
        </button>
        <button
          onClick={() => dispatch({ type: 'definir_filtro', payload: 'concluidas' })}
          className={state.filtro === 'concluidas' ? 'ativo' : ''}
        >
          Concluídas
        </button>
      </div>
      
      <ul>
        {tarefasFiltradas.length === 0 ? (
          <li>Nenhuma tarefa encontrada</li>
        ) : (
          tarefasFiltradas.map(tarefa => (
            <li key={tarefa.id}>
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => dispatch({
                  type: 'alternar_tarefa',
                  payload: tarefa.id
                })}
              />
              <span
                style={{
                  textDecoration: tarefa.concluida ? 'line-through' : 'none'
                }}
              >
                {tarefa.texto}
              </span>
              <button
                onClick={() => dispatch({
                  type: 'remover_tarefa',
                  payload: tarefa.id
                })}
              >
                Remover
              </button>
            </li>
          ))
        )}
      </ul>
      
      {state.tarefas.some(tarefa => tarefa.concluida) && (
        <button onClick={() => dispatch({ type: 'limpar_concluidas' })}>
          Limpar Concluídas
        </button>
      )}
    </div>
  );
}
```

### 3. Gerenciamento de Estado de Aplicação

```jsx
// Definir tipos de ação como constantes para evitar erros de digitação
const ACTIONS = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER'
};

const initialState = {
  usuario: null,
  carregando: false,
  erro: null,
  autenticado: false
};

function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        carregando: true,
        erro: null
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        carregando: false,
        autenticado: true,
        usuario: action.payload,
        erro: null
      };
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        carregando: false,
        autenticado: false,
        erro: action.payload
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        usuario: null,
        autenticado: false
      };
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        usuario: {
          ...state.usuario,
          ...action.payload
        }
      };
    default:
      return state;
  }
}

// Contexto para compartilhar o estado de autenticação
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Ações
  const login = async (email, senha) => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST 
(Content truncated due to size limit. Use line ranges to read in chunks)