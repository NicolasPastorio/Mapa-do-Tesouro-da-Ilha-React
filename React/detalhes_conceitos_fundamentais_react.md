# Detalhamento dos Conceitos Fundamentais do React

## O que é React.js

React.js é uma biblioteca JavaScript de código aberto mantida pelo Facebook (Meta) e uma comunidade de desenvolvedores individuais e empresas. Foi criada para construir interfaces de usuário (UI) interativas e reativas, especialmente para aplicações de página única (SPA).

O React permite que os desenvolvedores criem grandes aplicações web que podem alterar dados sem recarregar a página. Seu principal objetivo é ser rápido, escalável e simples. Ele funciona apenas na camada de view das aplicações, correspondendo ao "V" no padrão MVC (Model-View-Controller).

## Principais Características do React

### Baseado em Componentes

O React é baseado no conceito de componentes reutilizáveis. Cada componente encapsula sua própria marcação, lógica e estilo, permitindo uma melhor organização e manutenção do código.

### Virtual DOM

O React utiliza uma representação leve do DOM real chamada Virtual DOM. Quando o estado de um componente muda, o React cria uma nova árvore Virtual DOM, compara com a anterior e aplica apenas as mudanças necessárias ao DOM real, otimizando a performance.

### Fluxo de Dados Unidirecional

O React implementa um fluxo de dados unidirecional, o que significa que os dados fluem em uma única direção: de componentes pais para componentes filhos. Isso torna o código mais previsível e facilita a depuração.

### JSX

JSX é uma extensão de sintaxe para JavaScript que parece com HTML. Permite escrever elementos React de forma mais intuitiva e expressiva.

```jsx
const element = <h1>Olá, mundo!</h1>;
```

### Declarativo

O React utiliza uma abordagem declarativa, onde você descreve como sua UI deve ser em cada estado, e o React se encarrega de atualizar e renderizar os componentes quando os dados mudam.

## Conceitos Fundamentais

### Componentes

Os componentes são os blocos de construção das aplicações React. Um componente pode ser tão simples quanto um botão ou tão complexo quanto uma página inteira. Existem dois tipos principais:

#### Componentes Funcionais

```jsx
function Saudacao(props) {
  return <h1>Olá, {props.nome}!</h1>;
}
```

#### Componentes de Classe

```jsx
class Saudacao extends React.Component {
  render() {
    return <h1>Olá, {this.props.nome}!</h1>;
  }
}
```

### Props

Props (abreviação de "properties") são a forma de passar dados de um componente pai para um componente filho. São somente leitura e não devem ser modificadas pelo componente que as recebe.

```jsx
function Saudacao(props) {
  return <h1>Olá, {props.nome}!</h1>;
}

// Uso:
<Saudacao nome="Maria" />
```

### Estado (State)

O estado é um objeto que contém dados específicos do componente que podem mudar ao longo do tempo. Diferente das props, o estado é gerenciado internamente pelo componente.

```jsx
function Contador() {
  const [contador, setContador] = useState(0);
  
  return (
    <div>
      <p>Você clicou {contador} vezes</p>
      <button onClick={() => setContador(contador + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
```

### Ciclo de Vida dos Componentes

Os componentes React passam por diferentes fases durante sua existência:

1. **Montagem**: O componente é criado e inserido no DOM
2. **Atualização**: O componente é re-renderizado quando props ou estado mudam
3. **Desmontagem**: O componente é removido do DOM

Em componentes funcionais, esses ciclos são gerenciados através do Hook `useEffect`.

### Hooks

Hooks são funções especiais que permitem usar estado e outras características do React em componentes funcionais. Foram introduzidos na versão 16.8 do React.

#### Hooks Básicos

- **useState**: Permite adicionar estado a componentes funcionais
- **useEffect**: Permite executar efeitos colaterais em componentes funcionais
- **useContext**: Permite consumir um contexto React

#### Hooks Adicionais

- **useReducer**: Alternativa ao useState para lógica de estado complexa
- **useCallback**: Memoriza uma função entre renderizações
- **useMemo**: Memoriza um valor calculado entre renderizações
- **useRef**: Permite criar uma referência mutável que persiste entre renderizações

### Renderização Condicional

O React permite renderizar diferentes elementos ou componentes baseados em condições:

```jsx
function SaudacaoCondicional(props) {
  return (
    <div>
      {props.estaLogado ? (
        <h1>Bem-vindo de volta!</h1>
      ) : (
        <h1>Por favor, faça login.</h1>
      )}
    </div>
  );
}
```

### Listas e Chaves

Para renderizar listas de elementos, o React utiliza a função `map()` do JavaScript. Cada item da lista deve ter uma propriedade `key` única para ajudar o React a identificar quais itens foram alterados, adicionados ou removidos.

```jsx
function ListaDeNumeros(props) {
  const numeros = props.numeros;
  const listaItems = numeros.map((numero) =>
    <li key={numero.toString()}>
      {numero}
    </li>
  );
  return (
    <ul>{listaItems}</ul>
  );
}
```

### Formulários

O React permite criar formulários interativos usando o conceito de "componentes controlados", onde o estado do React é a "única fonte da verdade".

```jsx
function Formulario() {
  const [nome, setNome] = useState('');
  
  const handleSubmit = (event) => {
    alert('Um nome foi enviado: ' + nome);
    event.preventDefault();
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <input type="submit" value="Enviar" />
    </form>
  );
}
```

### Elevação de Estado (Lifting State Up)

Quando vários componentes precisam refletir os mesmos dados em mudança, é recomendado elevar o estado compartilhado para o ancestral comum mais próximo.

```jsx
function CalculadoraTemperatura() {
  const [temperatura, setTemperatura] = useState('');
  const [escala, setEscala] = useState('c');
  
  const handleCelsiusChange = (temperatura) => {
    setTemperatura(temperatura);
    setEscala('c');
  };
  
  const handleFahrenheitChange = (temperatura) => {
    setTemperatura(temperatura);
    setEscala('f');
  };
  
  const celsius = escala === 'f' ? converterParaCelsius(temperatura) : temperatura;
  const fahrenheit = escala === 'c' ? converterParaFahrenheit(temperatura) : temperatura;
  
  return (
    <div>
      <EntradaTemperatura escala="c" temperatura={celsius} onTemperaturaChange={handleCelsiusChange} />
      <EntradaTemperatura escala="f" temperatura={fahrenheit} onTemperaturaChange={handleFahrenheitChange} />
    </div>
  );
}
```

### Composição vs Herança

O React recomenda o uso de composição em vez de herança para reutilizar código entre componentes. Um componente pode aceitar elementos arbitrários como filhos e renderizá-los usando a prop especial `children`.

```jsx
function Borda(props) {
  return (
    <div className={'Borda Borda-' + props.cor}>
      {props.children}
    </div>
  );
}

function App() {
  return (
    <Borda cor="azul">
      <h1>Bem-vindo</h1>
      <p>Este conteúdo está dentro da borda.</p>
    </Borda>
  );
}
```

### Context API

O Context fornece uma maneira de compartilhar dados entre componentes sem passar explicitamente props através de cada nível da árvore de componentes.

```jsx
// Criar um contexto
const TemaContexto = React.createContext('claro');

// Provedor de contexto
function App() {
  return (
    <TemaContexto.Provider value="escuro">
      <Toolbar />
    </TemaContexto.Provider>
  );
}

// Consumidor de contexto
function Botao() {
  const tema = useContext(TemaContexto);
  return <button className={tema}>Eu sou estilizado pelo tema do contexto!</button>;
}
```

### Fragmentos

Os Fragmentos permitem agrupar uma lista de filhos sem adicionar nós extras ao DOM.

```jsx
function Tabela() {
  return (
    <table>
      <tr>
        <Colunas />
      </tr>
    </table>
  );
}

function Colunas() {
  return (
    <>
      <td>Coluna 1</td>
      <td>Coluna 2</td>
    </>
  );
}
```

### Refs

Refs fornecem uma maneira de acessar nós DOM ou elementos React criados no método render.

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  
  const onButtonClick = () => {
    // `current` aponta para o elemento de input montado
    inputEl.current.focus();
  };
  
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focar no input</button>
    </>
  );
}
```

### Portais

Os Portais fornecem uma maneira de renderizar filhos em um nó DOM que existe fora da hierarquia DOM do componente pai.

```jsx
function Modal() {
  return ReactDOM.createPortal(
    <div className="modal">
      <p>Conteúdo do modal</p>
    </div>,
    document.getElementById('modal-root')
  );
}
```

### Error Boundaries

Error Boundaries são componentes React que capturam erros JavaScript em qualquer lugar na árvore de componentes filhos, registram esses erros e exibem uma UI alternativa.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo deu errado.</h1>;
    }

    return this.props.children; 
  }
}
```
