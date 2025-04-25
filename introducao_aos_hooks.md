# Introdução aos Hooks no React

## O que são Hooks?

Hooks são funções especiais introduzidas no React 16.8 (lançado em fevereiro de 2019) que permitem que você "conecte-se" aos recursos de estado e ciclo de vida do React a partir de componentes funcionais. Antes dos Hooks, esses recursos só estavam disponíveis em componentes de classe.

Os Hooks resolvem uma série de problemas que os desenvolvedores React enfrentavam há anos:

1. **Dificuldade em reutilizar lógica com estado entre componentes**
2. **Componentes complexos se tornavam difíceis de entender**
3. **Classes confundiam tanto pessoas quanto máquinas**

## Por que os Hooks foram criados?

### Problema 1: Reutilização de Lógica com Estado

Antes dos Hooks, havia padrões como componentes de ordem superior (HOCs) e render props para reutilizar lógica com estado. No entanto, esses padrões exigiam que você reestruturasse seus componentes, tornando o código difícil de seguir e criando o que a equipe do React chamou de "wrapper hell" (inferno de invólucros) - quando você tem muitos componentes aninhados no seu DevTools.

Os Hooks permitem extrair lógica com estado de um componente para funções reutilizáveis sem mudar sua hierarquia de componentes.

### Problema 2: Componentes Complexos

Componentes de classe frequentemente continham lógica não relacionada nos mesmos métodos de ciclo de vida. Por exemplo, um componente poderia realizar busca de dados em `componentDidMount` e `componentDidUpdate`, além de configurar event listeners no `componentDidMount` e limpá-los no `componentWillUnmount`. Código mutuamente relacionado era dividido, enquanto código não relacionado ficava junto.

Os Hooks permitem dividir um componente em funções menores baseadas em pedaços relacionados (como configurar uma assinatura ou buscar dados), em vez de forçar uma divisão baseada em métodos de ciclo de vida.

### Problema 3: Classes são Confusas

Classes apresentam uma curva de aprendizado significativa. Você precisa entender como `this` funciona em JavaScript, que é muito diferente de como funciona em outras linguagens. Você precisa lembrar de vincular event handlers. O código é verboso. As classes também não minificam bem e tornam a otimização de hot reloading menos confiável.

Os Hooks permitem usar mais das funcionalidades do React sem classes, trabalhando com funções que são mais fáceis de entender e testar.

## Regras dos Hooks

Para garantir que todos os recursos de estado e efeitos do React funcionem corretamente, você deve seguir duas regras ao usar Hooks:

### Regra 1: Apenas Chame Hooks no Nível Superior

**Não chame Hooks dentro de loops, condições ou funções aninhadas.** Em vez disso, sempre use Hooks no nível superior do seu componente React, antes de qualquer retorno antecipado.

Seguindo esta regra, você garante que os Hooks sejam chamados na mesma ordem cada vez que um componente renderiza. Isso é o que permite ao React preservar corretamente o estado dos Hooks entre múltiplas chamadas de `useState` e `useEffect`.

```jsx
// ❌ Errado: Hook dentro de condição
function Form() {
  const [name, setName] = useState('');
  
  if (name !== '') {
    useEffect(() => {
      // Este código pode quebrar
      localStorage.setItem('formName', name);
    });
  }
  
  // ...
}

// ✅ Correto: Condição dentro do Hook
function Form() {
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (name !== '') {
      localStorage.setItem('formName', name);
    }
  }, [name]);
  
  // ...
}
```

### Regra 2: Apenas Chame Hooks de Componentes React ou Hooks Customizados

**Não chame Hooks de funções JavaScript regulares.** Em vez disso, você pode:

- ✅ Chamar Hooks de componentes funcionais React
- ✅ Chamar Hooks de Hooks customizados (que veremos mais adiante)

Seguindo esta regra, você garante que toda a lógica de estado de um componente seja claramente visível em seu código-fonte.

## Hooks Básicos vs. Hooks Adicionais

O React fornece vários Hooks integrados que podem ser categorizados em básicos e adicionais:

### Hooks Básicos

- **useState**: Permite adicionar estado a componentes funcionais
- **useEffect**: Permite realizar efeitos colaterais em componentes funcionais
- **useContext**: Permite consumir um contexto React

### Hooks Adicionais

- **useReducer**: Alternativa ao useState para lógica de estado complexa
- **useCallback**: Retorna uma função memoizada
- **useMemo**: Retorna um valor memoizado
- **useRef**: Retorna um objeto mutável que persiste durante todo o ciclo de vida do componente
- **useImperativeHandle**: Personaliza o valor da instância que é exposto aos componentes pai quando usando ref
- **useLayoutEffect**: Versão do useEffect que dispara sincronicamente após todas as mutações do DOM
- **useDebugValue**: Usado para exibir um rótulo para Hooks customizados nas ferramentas de desenvolvimento React
- **useDeferredValue**: Aceita um valor e retorna uma nova cópia desse valor que pode "ficar para trás" do original
- **useTransition**: Permite marcar algumas atualizações de estado como não urgentes
- **useId**: Gera IDs únicos que são estáveis no servidor e cliente

## Como os Hooks se Comparam aos Métodos de Ciclo de Vida de Classe?

Se você está acostumado com componentes de classe, pode ser útil entender como os Hooks se relacionam com os métodos de ciclo de vida que você conhece:

- **constructor**: Funcionalidade coberta por `useState`. Você pode inicializar o estado diretamente com `useState`.
- **componentDidMount**: Funcionalidade coberta por `useEffect` com um array de dependências vazio `[]`.
- **componentDidUpdate**: Funcionalidade coberta por `useEffect` com dependências específicas.
- **componentWillUnmount**: Funcionalidade coberta pela função de limpeza retornada por `useEffect`.
- **shouldComponentUpdate**: Funcionalidade parcialmente coberta por `React.memo` e otimizações com `useMemo` e `useCallback`.
- **getSnapshotBeforeUpdate, componentDidCatch, getDerivedStateFromError**: Ainda não têm equivalentes em Hooks.

```jsx
// Componente de classe
class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `Você clicou ${this.state.count} vezes`;
  }

  componentDidUpdate() {
    document.title = `Você clicou ${this.state.count} vezes`;
  }

  render() {
    return (
      <div>
        <p>Você clicou {this.state.count} vezes</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Clique aqui
        </button>
      </div>
    );
  }
}

// Equivalente com Hooks
function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Você clicou ${count} vezes`;
  }, [count]); // Só re-executa se count mudar

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
```

## Benefícios dos Hooks

### 1. Componentes Mais Simples e Concisos

Os Hooks permitem que você escreva componentes mais simples e concisos, eliminando a necessidade de classes e reduzindo a quantidade de código boilerplate.

### 2. Melhor Reutilização de Lógica

Com Hooks customizados, você pode extrair lógica com estado em funções reutilizáveis, permitindo compartilhar comportamento entre componentes sem adicionar mais componentes à árvore.

### 3. Separação de Preocupações

Os Hooks permitem organizar a lógica do seu componente com base em quais partes estão relacionadas, em vez de dividir o código artificialmente com base em métodos de ciclo de vida.

### 4. Funções em vez de Classes

Os Hooks permitem usar recursos do React sem classes, o que significa código mais fácil de entender, testar e depurar.

### 5. Tipagem Mais Fácil

Em projetos TypeScript, os Hooks geralmente são mais fáceis de tipar corretamente do que componentes de classe.

## Adoção Gradual

Uma característica importante dos Hooks é que eles são completamente opcionais e retrocompatíveis. Você pode começar a usar Hooks em novos componentes sem reescrever o código existente. Não há pressa para migrar para Hooks - a equipe do React recomenda evitar reescritas "grandes" de componentes de classe existentes, a menos que você já planejasse reescrevê-los por outros motivos.

## Conclusão

Os Hooks representam uma mudança fundamental na forma como escrevemos componentes React, permitindo uma melhor organização de código, reutilização de lógica e componentes mais simples. Eles resolvem problemas reais que os desenvolvedores enfrentavam com componentes de classe e oferecem uma API mais intuitiva para trabalhar com estado e efeitos colaterais.

Nos próximos tópicos, exploraremos cada Hook em detalhes, começando com os mais fundamentais: `useState` e `useEffect`.
