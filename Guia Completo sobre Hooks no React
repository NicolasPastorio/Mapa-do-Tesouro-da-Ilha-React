# Guia Completo sobre Hooks no React

## Introdução aos Hooks

Os Hooks são funções especiais introduzidas no React 16.8 (lançado em fevereiro de 2019) que permitem que você "conecte-se" aos recursos de estado e ciclo de vida do React a partir de componentes funcionais. Antes dos Hooks, esses recursos só estavam disponíveis em componentes de classe.

Os Hooks resolvem uma série de problemas que os desenvolvedores React enfrentavam há anos:

1. **Dificuldade em reutilizar lógica com estado entre componentes**
2. **Componentes complexos se tornavam difíceis de entender**
3. **Classes confundiam tanto pessoas quanto máquinas**

### Por que os Hooks foram criados?

#### Problema 1: Reutilização de Lógica com Estado

Antes dos Hooks, havia padrões como componentes de ordem superior (HOCs) e render props para reutilizar lógica com estado. No entanto, esses padrões exigiam que você reestruturasse seus componentes, tornando o código difícil de seguir e criando o que a equipe do React chamou de "wrapper hell" (inferno de invólucros) - quando você tem muitos componentes aninhados no seu DevTools.

Os Hooks permitem extrair lógica com estado de um componente para funções reutilizáveis sem mudar sua hierarquia de componentes.

#### Problema 2: Componentes Complexos

Componentes de classe frequentemente continham lógica não relacionada nos mesmos métodos de ciclo de vida. Por exemplo, um componente poderia realizar busca de dados em `componentDidMount` e `componentDidUpdate`, além de configurar event listeners no `componentDidMount` e limpá-los no `componentWillUnmount`. Código mutuamente relacionado era dividido, enquanto código não relacionado ficava junto.

Os Hooks permitem dividir um componente em funções menores baseadas em pedaços relacionados (como configurar uma assinatura ou buscar dados), em vez de forçar uma divisão baseada em métodos de ciclo de vida.

#### Problema 3: Classes são Confusas

Classes apresentam uma curva de aprendizado significativa. Você precisa entender como `this` funciona em JavaScript, que é muito diferente de como funciona em outras linguagens. Você precisa lembrar de vincular event handlers. O código é verboso. As classes também não minificam bem e tornam a otimização de hot reloading menos confiável.

Os Hooks permitem usar mais das funcionalidades do React sem classes, trabalhando com funções que são mais fáceis de entender e testar.

### Regras dos Hooks

Para garantir que todos os recursos de estado e efeitos do React funcionem corretamente, você deve seguir duas regras ao usar Hooks:

#### Regra 1: Apenas Chame Hooks no Nível Superior

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

#### Regra 2: Apenas Chame Hooks de Componentes React ou Hooks Customizados

**Não chame Hooks de funções JavaScript regulares.** Em vez disso, você pode:

- ✅ Chamar Hooks de componentes funcionais React
- ✅ Chamar Hooks de Hooks customizados (que veremos mais adiante)

Seguindo esta regra, você garante que toda a lógica de estado de um componente seja claramente visível em seu código-fonte.

### Hooks Básicos vs. Hooks Adicionais

O React fornece vários Hooks integrados que podem ser categorizados em básicos e adicionais:

#### Hooks Básicos

- **useState**: Permite adicionar estado a componentes funcionais
- **useEffect**: Permite realizar efeitos colaterais em componentes funcionais
- **useContext**: Permite consumir um contexto React

#### Hooks Adicionais

- **useReducer**: Alternativa ao useState para lógica de estado complexa
- **useCallback**: Retorna uma função memoizada
- **useMemo**: Retorna um valor memoizado
- **useRef**: Retorna um objeto mutável que persiste durante todo o ciclo de vida do componente
- **useImperativeHandle**: Personaliza o valor da instância que é exposto aos componentes pai quando usando ref
- **useLayoutEffect**: Versão do useEffect que dispara sincronamente após todas as mutações do DOM
- **useDebugValue**: Usado para exibir um rótulo para Hooks customizados nas ferramentas de desenvolvimento React
- **useDeferredValue**: Aceita um valor e retorna uma nova cópia desse valor que pode "ficar para trás" do original
- **useTransition**: Permite marcar algumas atualizações de estado como não urgentes
- **useId**: Gera IDs únicos que são estáveis no servidor e cliente

### Como os Hooks se Comparam aos Métodos de Ciclo de Vida de Classe?

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

### Benefícios dos Hooks

#### 1. Componentes Mais Simples e Concisos

Os Hooks permitem que você escreva componentes mais simples e concisos, eliminando a necessidade de classes e reduzindo a quantidade de código boilerplate.

#### 2. Melhor Reutilização de Lógica

Com Hooks customizados, você pode extrair lógica com estado em funções reutilizáveis, permitindo compartilhar comportamento entre componentes sem adicionar mais componentes à árvore.

#### 3. Separação de Preocupações

Os Hooks permitem organizar a lógica do seu componente com base em quais partes estão relacionadas, em vez de dividir o código artificialmente com base em métodos de ciclo de vida.

#### 4. Funções em vez de Classes

Os Hooks permitem usar recursos do React sem classes, o que significa código mais fácil de entender, testar e depurar.

#### 5. Tipagem Mais Fácil

Em projetos TypeScript, os Hooks geralmente são mais fáceis de tipar corretamente do que componentes de classe.

### Adoção Gradual

Uma característica importante dos Hooks é que eles são completamente opcionais e retrocompatíveis. Você pode começar a usar Hooks em novos componentes sem reescrever o código existente. Não há pressa para migrar para Hooks - a equipe do React recomenda evitar reescritas "grandes" de componentes de classe existentes, a menos que você já planejasse reescrevê-los por outros motivos.

## useState

O Hook `useState` é o mais fundamental dos Hooks do React. Ele permite adicionar estado local a componentes funcionais, dando a eles a capacidade de "lembrar" informações entre renderizações.

### Conceito Básico

Antes dos Hooks, o estado só podia ser usado em componentes de classe. O Hook `useState` traz essa capacidade para componentes funcionais, permitindo que você declare variáveis de estado que o React preservará entre as renderizações do componente.

### Sintaxe Básica

```jsx
import { useState } from 'react';

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

Vamos analisar esta sintaxe:

1. **Importação**: Primeiro, importamos o Hook `useState` do React.
2. **Declaração**: Dentro do componente, chamamos `useState` com o valor inicial do estado (neste caso, `0`).
3. **Retorno**: `useState` retorna um par de valores:
   - O **valor atual do estado** (`contador`)
   - Uma **função para atualizar o estado** (`setContador`)
4. **Desestruturação de Array**: Usamos a sintaxe de desestruturação de array `[contador, setContador]` para capturar esses dois valores.
5. **Uso**: Usamos `contador` para ler o estado e `setContador` para atualizá-lo.

### Valor Inicial do Estado

O único argumento para `useState` é o valor inicial do estado. Este valor é usado apenas durante a primeira renderização.

```jsx
// Estado inicial como valor literal
const [contador, setContador] = useState(0);

// Estado inicial como objeto
const [usuario, setUsuario] = useState({ nome: '', email: '' });

// Estado inicial como array
const [itens, setItens] = useState([]);

// Estado inicial calculado por uma função
const [dimensoes, setDimensoes] = useState(() => {
  // Esta função é executada apenas na primeira renderização
  return {
    largura: window.innerWidth,
    altura: window.innerHeight
  };
});
```

Quando o valor inicial é computacionalmente caro (como um cálculo complexo), você pode passar uma função que será executada apenas na primeira renderização:

```jsx
// ❌ Este cálculo será executado em cada renderização
const [resultado, setResultado] = useState(calculoComplexo());

// ✅ Este cálculo será executado apenas na primeira renderização
const [resultado, setResultado] = useState(() => calculoComplexo());
```

### Atualizando o Estado

A função de atualização de estado (como `setContador`) tem duas formas de uso:

#### 1. Passando o Novo Valor Diretamente

```jsx
setContador(5); // Define contador como 5
```

#### 2. Passando uma Função que Calcula o Novo Valor

```jsx
setContador(valorAnterior => valorAnterior + 1);
```

A segunda forma é especialmente útil quando o novo estado depende do estado anterior. Devido à natureza assíncrona das atualizações de estado no React, usar a forma de função garante que você está trabalhando com o valor mais recente.

```jsx
// ❌ Pode não funcionar como esperado em alguns casos
function incrementarVarias() {
  setContador(contador + 1); // Usa o valor de 'contador' do fechamento (closure)
  setContador(contador + 1); // Ainda usa o mesmo valor de 'contador'
  setContador(contador + 1); // Ainda usa o mesmo valor de 'contador'
}

// ✅ Sempre funciona corretamente
function incrementarVarias() {
  setContador(c => c + 1); // Usa o valor mais recente
  setContador(c => c + 1); // Usa o valor mais recente
  setContador(c => c + 1); // Usa o valor mais recente
}
```

### Trabalhando com Objetos e Arrays no Estado

Ao contrário do `this.setState()` em componentes de classe, a função de atualização fornecida pelo `useState` não mescla automaticamente objetos. Você precisa fazer isso manualmente:

```jsx
const [usuario, setUsuario] = useState({ nome: '', email: '' });

// ❌ Isso substituirá todo o objeto, perdendo a propriedade 'email'
function atualizarNome(novoNome) {
  setUsuario({ nome: novoNome });
}

// ✅ Isso preserva as outras propriedades do objeto
function atualizarNome(novoNome) {
  setUsuario(usuarioAnterior => ({
    ...usuarioAnterior,
    nome: novoNome
  }));
}
```

Para arrays, você também precisa criar um novo array em vez de modificar o existente:

```jsx
const [itens, setItens] = useState([]);

// Adicionar um item
function adicionarItem(novoItem) {
  setItens([...itens, novoItem]);
}

// Remover um item
function removerItem(id) {
  setItens(itens.filter(item => item.id !== id));
}

// Atualizar um item
function atualizarItem(id, novosDados) {
  setItens(itens.map(item => 
    item.id === id ? { ...item, ...novosDados } : item
  ));
}
```

### Múltiplas Variáveis de Estado

Você pode usar `useState` múltiplas vezes em um único componente:

```jsx
function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState(0);
  
  return (
    <form>
      <input 
        type="text" 
        value={nome} 
        onChange={e => setNome(e.target.value)} 
        placeholder="Nome" 
      />
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="number" 
        value={idade} 
        onChange={e => setIdade(Number(e.target.value))} 
        placeholder="Idade" 
      />
    </form>
  );
}
```

Isso permite que você mantenha o estado relacionado separado e evite atualizações desnecessárias.

### Estado Único vs. Múltiplos Estados

Você pode optar por usar um único objeto de estado ou múltiplas variáveis de estado, dependendo do caso:

```jsx
// Abordagem 1: Múltiplas variáveis de estado
function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState(0);
  
  // ...
}

// Abordagem 2: Objeto de estado único
function Formulario() {
  const [formulario, setFormulario] = useState({
    nome: '',
    email: '',
    idade: 0
  });
  
  const atualizarCampo = (campo, valor) => {
    setFormulario({
      ...formulario,
      [campo]: valor
    });
  };
  
  // ...
}
```

**Considerações:**
- Use múltiplas variáveis de estado quando os valores são independentes ou raramente mudam juntos.
- Use um objeto de estado único quando os valores estão relacionados ou frequentemente mudam juntos.

### Lazy Initialization

Como mencionado anteriormente, você pode passar uma função para `useState` para calcular o estado inicial apenas uma vez:

```jsx
const [estado, setEstado] = useState(() => {
  // Este código só é executado na primeira renderização
  const valorInicial = calcularValorInicial();
  return valorInicial;
});
```

Isso é útil para:
- Cálculos caros
- Leitura do localStorage
- Processamento de props iniciais complexas

### Boas Práticas

1. **Mantenha o estado mínimo necessário**: Não armazene no estado valores que podem ser calculados a partir de props ou de outro estado.

2. **Divida o estado complexo**: Se você tem um estado complexo, considere dividi-lo em múltiplas variáveis de estado baseadas em quais valores tendem a mudar juntos.

3. **Use a forma de função para atualizações baseadas no estado anterior**:
   ```jsx
   setContador(c => c + 1); // Bom
   setContador(contador + 1); // Potencialmente problemático
   ```

4. **Evite atualizações de estado desnecessárias**: Verifique se o valor realmente mudou antes de atualizar o estado.
   ```jsx
   // Evite atualizações desnecessárias
   if (novoValor !== valorAtual) {
     setValor(novoValor);
   }
   ```

5. **Mantenha a imutabilidade**: Sempre crie novos objetos/arrays em vez de modificar os existentes.
   ```jsx
   // Bom
   setUsuarios([...usuarios, novoUsuario]);
   
   // Ruim
   const novoArray = usuarios;
   novoArray.push(novoUsuario);
   setUsuarios(novoArray);
   ```

6. **Use inicialização preguiçosa para cálculos caros**:
   ```jsx
   const [estado, setEstado] = useState(() => calcularEstadoInicial());
   ```

7. **Coloque a lógica de atualização de estado em funções nomeadas** para melhorar a legibilidade:
   ```jsx
   const adicionarItem = (item) => {
     setItens(itensAnteriores => [...itensAnteriores, item]);
   };
   ```

## useEffect

O Hook `useEffect` é um dos Hooks fundamentais do React que permite executar efeitos colaterais em componentes funcionais. Efeitos colaterais são operações que afetam algo fora do escopo do componente, como:

- Requisições de dados (data fetching)
- Assinaturas (subscriptions)
- Manipulação manual do DOM
- Logging
- Temporizadores
- Integração com APIs externas

### Conceito Básico

O `useEffect` serve como substituto para os métodos de ciclo de vida em componentes de classe (`componentDidMount`, `componentDidUpdate` e `componentWillUnmount`), mas com uma abordagem unificada e mais declarativa.

A ideia principal é que alguns códigos não devem ser executados durante a renderização, pois podem causar efeitos colaterais. O `useEffect` permite executar esse código após a renderização, quando o DOM já foi atualizado.

### Sintaxe Básica

```jsx
import { useEffect } from 'react';

function MeuComponente() {
  useEffect(() => {
    // Código do efeito colateral
    console.log('Componente renderizado');
    
    // Função de limpeza opcional
    return () => {
      console.log('Limpando efeito');
    };
  }, [/* array de dependências */]);
  
  return <div>Meu Componente</div>;
}
```

O Hook `useEffect` aceita dois argumentos:
1. Uma **função** que contém o código do efeito
2. Um **array de dependências** (opcional) que controla quando o efeito será executado

### Quando o Efeito é Executado?

O comportamento do `useEffect` depende do array de dependências:

#### Sem Array de Dependências

```jsx
useEffect(() => {
  console.log('Este efeito é executado após cada renderização');
});
```

Quando você não fornece um array de dependências, o efeito é executado após cada renderização do componente.

#### Array de Dependências Vazio

```jsx
useEffect(() => {
  console.log('Este efeito é executado apenas após a primeira renderização');
}, []);
```

Com um array de dependências vazio, o efeito é executado apenas uma vez, após a primeira renderização do componente (similar ao `componentDidMount`).

#### Array de Dependências com Valores

```jsx
useEffect(() => {
  console.log(`O contador mudou para: ${contador}`);
}, [contador]);
```

O efeito será executado após a primeira renderização e depois sempre que qualquer valor no array de dependências mudar.

### Função de Limpeza (Cleanup)

O `useEffect` pode retornar uma função que será executada antes que o componente seja removido do DOM ou antes que o efeito seja executado novamente. Esta função é conhecida como "função de limpeza" ou "cleanup function".

```jsx
useEffect(() => {
  // Configurar algo
  console.log('Efeito aplicado');
  
  // Função de limpeza
  return () => {
    console.log('Efeito limpo');
  };
}, [dependencia]);
```

A função de limpeza é útil para:
- Cancelar assinaturas
- Limpar temporizadores
- Remover event listeners
- Liberar recursos

### Casos de Uso Comuns

#### 1. Executar Código Apenas Uma Vez (Na Montagem)

```jsx
useEffect(() => {
  console.log('Componente montado');
  // Código que deve ser executado apenas uma vez
  
  return () => {
    console.log('Componente será desmontado');
    // Limpeza quando o componente for desmontado
  };
}, []); // Array de dependências vazio
```

Este padrão é útil para:
- Inicialização única
- Busca de dados inicial
- Configuração de event listeners globais

#### 2. Reagir a Mudanças em Props ou Estado

```jsx
useEffect(() => {
  console.log(`O ID mudou para: ${id}`);
  // Buscar dados com base no novo ID
  fetchDados(id);
}, [id]); // Executa quando 'id' muda
```

Este padrão é útil para:
- Buscar dados quando props mudam
- Sincronizar com sistemas externos
- Executar cálculos caros quando dependências específicas mudam

#### 3. Limpeza ao Desmontar

```jsx
useEffect(() => {
  const subscription = dataSource.subscribe();
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

Este padrão é útil para:
- Cancelar assinaturas
- Limpar temporizadores
- Remover event listeners

#### 4. Atualizar o Título da Página

```jsx
useEffect(() => {
  document.title = `${contador} novos itens`;
}, [contador]);
```

#### 5. Busca de Dados (Data Fetching)

```jsx
function PerfilUsuario({ userId }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const resposta = await fetch(`https://api.exemplo.com/usuarios/${userId}`);
        
        if (!resposta.ok) {
          throw new Error('Falha ao buscar dados do usuário');
        }
        
        const dados = await resposta.json();
        setUsuario(dados);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    };
    
    buscarUsuario();
  }, [userId]); // Re-executa quando userId mudar
  
  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!usuario) return <p>Nenhum usuário encontrado</p>;
  
  return (
    <div>
      <h1>{usuario.nome}</h1>
      <p>Email: {usuario.email}</p>
      <p>Telefone: {usuario.telefone}</p>
    </div>
  );
}
```

### Ordem de Execução

É importante entender a ordem em que os efeitos são executados:

1. React renderiza o componente com os valores iniciais
2. React atualiza o DOM
3. O navegador pinta a tela
4. React executa os efeitos do `useEffect`

Se um efeito atualiza o estado, isso aciona uma nova renderização, e o ciclo se repete.

### Múltiplos useEffect

Você pode usar múltiplos `useEffect` em um único componente para separar preocupações:

```jsx
function PerfilUsuario({ userId }) {
  // Estado para dados do usuário
  const [usuario, setUsuario] = useState(null);
  
  // Estado para preferências do usuário
  const [preferencias, setPreferencias] = useState(null);
  
  // Efeito para buscar dados do usuário
  useEffect(() => {
    fetchUsuario(userId).then(setUsuario);
  }, [userId]);
  
  // Efeito separado para buscar preferências
  useEffect(() => {
    if (usuario) {
      fetchPreferencias(usuario.preferenciaId).then(setPreferencias);
    }
  }, [usuario]);
  
  // Efeito para atualizar o título da página
  useEffect(() => {
    if (usuario) {
      document.title = `Perfil de ${usuario.nome}`;
    } else {
      document.title = 'Carregando perfil...';
    }
    
    return () => {
      document.title = 'Meu App';
    };
  }, [usuario]);
  
  // Resto do componente...
}
```

Esta abordagem torna o código mais organizado e mais fácil de entender, pois cada efeito tem uma responsabilidade clara.

### Problemas Comuns e Soluções

#### 1. Loop Infinito

Um erro comum é atualizar o estado dentro de um `useEffect` sem especificar dependências corretamente:

```jsx
// ❌ Loop infinito!
useEffect(() => {
  setContador(contador + 1);
}); // Sem array de dependências
```

Neste exemplo, o efeito atualiza o estado, o que aciona uma nova renderização, que executa o efeito novamente, e assim por diante.

**Solução**: Adicione as dependências corretas ou use um array vazio se o efeito deve ser executado apenas uma vez:

```jsx
// ✅ Executa apenas uma vez
useEffect(() => {
  setContador(c => c + 1);
}, []); // Array vazio
```

#### 2. Dependências Ausentes

O ESLint com o plugin `eslint-plugin-react-hooks` alertará sobre dependências ausentes:

```jsx
// ⚠️ Alerta do ESLint: 'contador' está ausente no array de dependências
useEffect(() => {
  console.log(contador);
}, []); // Deveria incluir 'contador'
```

**Solução**: Adicione todas as variáveis usadas no efeito ao array de dependências:

```jsx
// ✅ Correto
useEffect(() => {
  console.log(contador);
}, [contador]);
```

#### 3. Dependências Mutáveis

Objetos e arrays criados durante a renderização são recriados a cada renderização, o que pode causar execuções desnecessárias do efeito:

```jsx
// ❌ O objeto options é recriado a cada renderização
const options = { id: userId, page: currentPage };

useEffect(() => {
  fetchData(options);
}, [options]); // 'options' muda em cada renderização
```

**Solução**: Use as propriedades primitivas como dependências ou use `useMemo` para memoizar o objeto:

```jsx
// ✅ Dependências primitivas
useEffect(() => {
  fetchData({ id: userId, page: currentPage });
}, [userId, currentPage]);

// OU

// ✅ Objeto memoizado
const options = useMemo(() => {
  return { id: userId, page: currentPage };
}, [userId, currentPage]);

useEffect(() => {
  fetchData(options);
}, [options]);
```

### useEffect vs. useLayoutEffect

O React fornece outro Hook similar ao `useEffect` chamado `useLayoutEffect`. A principal diferença está no momento em que eles são executados:

- **useEffect**: Executado assincronamente após a renderização e depois que o navegador pintou a tela
- **useLayoutEffect**: Executado sincronamente após a renderização, mas antes que o navegador pinte a tela

```jsx
// Executado após a pintura do navegador
useEffect(() => {
  console.log('useEffect executado');
}, []);

// Executado antes da pintura do navegador
useLayoutEffect(() => {
  console.log('useLayoutEffect executado');
}, []);
```

Use `useLayoutEffect` quando seu efeito precisa medir elementos do DOM ou fazer alterações visuais que devem ser aplicadas antes que o usuário veja a tela atualizada. Para a maioria dos casos, `useEffect` é a escolha correta.

### Boas Práticas

1. **Mantenha os efeitos pequenos e focados**: Cada efeito deve ter uma única responsabilidade.

2. **Separe efeitos não relacionados**: Use múltiplos `useEffect` para separar lógicas não relacionadas.

3. **Inclua todas as dependências necessárias**: Não omita dependências do array de dependências.

4. **Use a função de limpeza**: Sempre limpe recursos como temporizadores, assinaturas e event listeners.

5. **Evite efeitos desnecessários**: Considere se o código realmente precisa ser um efeito ou se pode ser executado durante a renderização.

6. **Extraia lógica complexa para Hooks customizados**: Se a lógica do efeito é complexa ou reutilizável, considere criar um Hook customizado.

7. **Evite atualizações de estado desnecessárias**: Verifique se o valor realmente mudou antes de atualizar o estado dentro de um efeito.

8. **Use ESLint com o plugin react-hooks**: Este plugin ajuda a identificar problemas comuns com Hooks.

## useContext

O Hook `useContext` é uma ferramenta poderosa no React que permite compartilhar dados entre componentes sem a necessidade de passar props manualmente através de cada nível da árvore de componentes. Ele resolve o problema conhecido como "prop drilling" (perfuração de props), onde você precisa passar props através de múltiplos componentes intermediários que não precisam desses dados.

### Conceito Básico

A Context API do React consiste em três partes principais:
1. **React.createContext**: Cria um objeto de contexto
2. **Context.Provider**: Componente que fornece o valor do contexto para seus descendentes
3. **useContext**: Hook que permite consumir o valor do contexto

O `useContext` é a forma mais elegante de consumir um contexto em componentes funcionais, substituindo o padrão mais verboso de `Context.Consumer`.

### Sintaxe Básica

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

### Criando um Contexto

Para criar um contexto, use a função `createContext`:

```jsx
import { createContext } from 'react';

// Você pode fornecer um valor padrão (opcional)
const TemaContexto = createContext('claro');
```

O valor padrão é usado apenas quando um componente não tem um Provider correspondente acima dele na árvore de componentes. Isso é útil para:
- Testes de componentes isolados
- Reutilização de componentes em diferentes partes da aplicação

### Fornecendo um Valor de Contexto

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

### Consumindo o Contexto com useContext

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

### Atualizando o Valor do Contexto

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

### Casos de Uso Comuns

#### 1. Tema da Aplicação

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
```

#### 2. Autenticação de Usuário

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
```

### Otimizações de Performance

#### 1. Memoização do Valor do Contexto

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

#### 2. Dividir Contextos

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

### Boas Práticas

1. **Mantenha o contexto focado**: Cada contexto deve ter uma única responsabilidade.

2. **Memoize o valor do contexto**: Use `useMemo` para evitar re-renderizações desnecessárias.

3. **Divida contextos grandes**: Use múltiplos contextos menores em vez de um único contexto grande.

4. **Crie Hooks customizados**: Encapsule a lógica de acesso ao contexto em Hooks customizados.

5. **Verifique se o contexto existe**: Lance um erro se o contexto for usado fora de um Provider.

6. **Considere a performance**: Esteja ciente do impacto de performance de mudanças no contexto.

7. **Use valores padrão significativos**: Forneça valores padrão úteis para `createContext()`.

8. **Documente seu contexto**: Documente claramente o que seu contexto fornece e como deve ser usado.

## useReducer

O Hook `useReducer` é uma alternativa ao `useState` para gerenciar estados complexos em componentes React. Ele é inspirado no padrão de gerenciamento de estado do Redux e é especialmente útil quando o próximo estado depende do estado anterior ou quando você tem lógica de atualização de estado complexa.

### Conceito Básico

O `useReducer` é baseado no padrão "reducer" da programação funcional, onde você usa uma função pura para transformar um estado em outro com base em uma ação. Este padrão é particularmente útil para gerenciar estados que contêm múltiplos sub-valores ou quando o próximo estado depende do anterior.

Um reducer é uma função pura que recebe dois argumentos: o estado atual e uma ação, e retorna o novo estado:

```javascript
(state, action) => newState
```

### Sintaxe Básica

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

### Parâmetros do useReducer

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

### useReducer vs. useState

#### Quando Usar useState

- Para estados simples (números, strings, booleanos)
- Quando a lógica de atualização é simples
- Quando os valores de estado são independentes

#### Quando Usar useReducer

- Para estados complexos (objetos, arrays aninhados)
- Quando o próximo estado depende do anterior
- Quando a lógica de atualização é complexa
- Quando você tem muitas atualizações de estado relacionadas
- Quando você quer centralizar a lógica de atualização

### Estrutura de Ações

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

### Boas Práticas

1. **Mantenha os reducers puros**: Reducers devem ser funções puras que não causam efeitos colaterais.

2. **Use constantes para tipos de ação**: Defina constantes para os tipos de ação para evitar erros de digitação.
   ```javascript
   const ACTIONS = {
     INCREMENT: 'INCREMENT',
     DECREMENT: 'DECREMENT',
     RESET: 'RESET'
   };
   ```

3. **Normalize o estado complexo**: Para estados com relações complexas, normalize os dados (similar a um banco de dados).

4. **Use action creators**: Funções que criam ações para encapsular a lógica de criação de ações.
   ```javascript
   function incrementar(valor = 1) {
     return { type: ACTIONS.INCREMENT, payload: valor };
   }
   
   // Uso
   dispatch(incrementar(5));
   ```

5. **Divida reducers grandes**: Use a técnica de "reducer composition" para dividir reducers grandes em menores.

6. **Use imutabilidade**: Sempre crie novos objetos/arrays em vez de modificar os existentes.
   ```javascript
   // Bom (imutável)
   return { ...state, contador: state.contador + 1 };
   
   // Ruim (mutável)
   state.contador += 1;
   return state;
   ```

7. **Combine com outros Hooks**: Use `useReducer` com outros Hooks como `useContext`, `useMemo` e `useCallback` para criar soluções poderosas.

## useCallback

O Hook `useCallback` é uma ferramenta de otimização de performance no React que permite memorizar funções entre renderizações. Ele é especialmente útil quando você passa funções para componentes filhos otimizados que dependem da igualdade de referência para evitar renderizações desnecessárias.

### Conceito Básico

No React, quando um componente é renderizado, todas as funções definidas dentro dele são recriadas. Isso significa que, a cada renderização, novas instâncias dessas funções são criadas na memória, mesmo que seu código seja idêntico.

```jsx
function MeuComponente() {
  // Esta função é recriada a cada renderização
  const handleClick = () => {
    console.log('Botão clicado!');
  };
  
  return <button onClick={handleClick}>Clique aqui</button>;
}
```

Normalmente, isso não é um problema. No entanto, pode se tornar um problema de performance quando:

1. Você passa essas funções como props para componentes filhos otimizados com `React.memo`
2. Essas funções são usadas como dependências em outros Hooks como `useEffect`

O `useCallback` resolve esse problema memorizando a função entre renderizações, desde que suas dependências não mudem.

### Sintaxe Básica

```jsx
import { useCallback } from 'react';

function MeuComponente() {
  const [contador, setContador] = useState(0);
  
  // A função é memorizada e só muda quando 'contador' muda
  const incrementar = useCallback(() => {
    setContador(c => c + 1);
  }, [contador]); // Array de dependências
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <BotaoOtimizado onClick={incrementar} />
    </div>
  );
}

// Um componente filho otimizado que só renderiza quando suas props mudam
const BotaoOtimizado = React.memo(function BotaoOtimizado({ onClick }) {
  console.log('BotaoOtimizado renderizado');
  return <button onClick={onClick}>Incrementar</button>;
});
```

O Hook `useCallback` aceita dois argumentos:
1. Uma **função** que você deseja memorizar
2. Um **array de dependências** que, quando alterado, recriará a função

### Quando Usar useCallback

O `useCallback` não é necessário em todos os casos. Você deve considerar usá-lo quando:

#### 1. Passando Funções para Componentes Memorizados

Se você está passando uma função como prop para um componente filho que é otimizado com `React.memo`, `useCallback` pode evitar renderizações desnecessárias.

#### 2. Funções como Dependências de useEffect

Quando você usa uma função como dependência em `useEffect` ou outros Hooks, `useCallback` evita que o efeito seja executado desnecessariamente.

#### 3. Funções que Criam ou Usam Referências

Quando sua função cria ou usa referências (como refs, IDs de timeout, etc.), `useCallback` pode ajudar a manter a consistência.

### useCallback vs. Funções Inline

Vamos comparar o uso de `useCallback` com funções inline:

```jsx
function Exemplo({ onChange }) {
  const [valor, setValor] = useState('');
  
  // Abordagem 1: Função inline (recriada a cada renderização)
  return (
    <input
      value={valor}
      onChange={(e) => {
        const novoValor = e.target.value;
        setValor(novoValor);
        onChange(novoValor);
      }}
    />
  );
  
  // Abordagem 2: useCallback (memorizada entre renderizações)
  const handleChange = useCallback((e) => {
    const novoValor = e.target.value;
    setValor(novoValor);
    onChange(novoValor);
  }, [onChange]);
  
  return <input value={valor} onChange={handleChange} />;
}
```

**Quando usar funções inline é adequado**:
- Para manipuladores de eventos simples
- Quando o componente filho não é memorizado
- Quando a função é usada apenas uma vez
- Quando a clareza do código é mais importante que a otimização

**Quando usar useCallback é adequado**:
- Quando a função é passada para componentes memorizados
- Quando a função é usada como dependência em outros Hooks
- Quando a função cria ou gerencia recursos como timers ou event listeners
- Em componentes que renderizam frequentemente com dados que raramente mudam

### Dependências do useCallback

O array de dependências do `useCallback` funciona de maneira similar ao do `useEffect`:

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- A função será recriada sempre que qualquer valor no array de dependências mudar
- Se o array estiver vazio `[]`, a função será criada apenas uma vez e reutilizada em todas as renderizações
- Se você omitir o array, uma nova função será criada em cada renderização (tornando o `useCallback` inútil)

### Boas Práticas

1. **Não use useCallback prematuramente**: Comece sem ele e adicione apenas quando necessário para otimização.

2. **Inclua todas as dependências**: Sempre inclua no array de dependências todas as variáveis do escopo do componente que são usadas dentro da função.

3. **Use o ESLint plugin para Hooks**: O plugin `eslint-plugin-react-hooks` ajudará a identificar dependências ausentes.

4. **Combine com React.memo**: `useCallback` é mais eficaz quando usado com componentes filhos memorizados com `React.memo`.

5. **Considere alternativas mais simples**: Para alguns casos, abordagens mais simples como mover a definição da função para fora do componente ou usar `useReducer` podem ser mais apropriadas.

6. **Evite dependências desnecessárias**: Quando possível, estruture seu código para minimizar dependências, usando técnicas como updater functions para `useState`.

7. **Prefira funções inline para casos simples**: Para manipuladores de eventos simples que não são passados para componentes memorizados, funções inline são mais legíveis e têm menos overhead.

## useMemo

O Hook `useMemo` é uma ferramenta de otimização de performance no React que permite memorizar valores computados entre renderizações. Ele é especialmente útil para cálculos caros ou para preservar a identidade de referência de objetos e arrays.

### Conceito Básico

No React, quando um componente é renderizado, todo o seu código é executado novamente. Isso significa que cálculos complexos são refeitos e novos objetos/arrays são criados a cada renderização, mesmo que os dados de entrada não tenham mudado.

```jsx
function MeuComponente({ items, termo }) {
  // Este cálculo é executado em cada renderização
  const itensFiltrados = items.filter(item => 
    item.nome.toLowerCase().includes(termo.toLowerCase())
  );
  
  return (
    <div>
      <p>Encontrados {itensFiltrados.length} itens</p>
      <ul>
        {itensFiltrados.map(item => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}
```

Isso geralmente não é um problema para cálculos simples. No entanto, pode se tornar um problema de performance quando:

1. O cálculo é computacionalmente caro (como filtragem, ordenação ou transformação de grandes conjuntos de dados)
2. O resultado é passado como prop para componentes filhos otimizados
3. O resultado é usado como dependência em outros Hooks

O `useMemo` resolve esse problema memorizando o resultado do cálculo entre renderizações, desde que as dependências não mudem.

### Sintaxe Básica

```jsx
import { useMemo } from 'react';

function MeuComponente({ items, termo }) {
  // O cálculo só é executado quando 'items' ou 'termo' mudam
  const itensFiltrados = useMemo(() => {
    console.log('Calculando itens filtrados...');
    return items.filter(item => 
      item.nome.toLowerCase().includes(termo.toLowerCase())
    );
  }, [items, termo]); // Array de dependências
  
  return (
    <div>
      <p>Encontrados {itensFiltrados.length} itens</p>
      <ul>
        {itensFiltrados.map(item => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}
```

O Hook `useMemo` aceita dois argumentos:
1. Uma **função** que retorna o valor que você deseja memorizar
2. Um **array de dependências** que, quando alterado, recalculará o valor

### Quando Usar useMemo

O `useMemo` não é necessário em todos os casos. Você deve considerar usá-lo quando:

#### 1. Otimizando Cálculos Caros

Se você tem um cálculo que é computacionalmente intensivo, `useMemo` pode evitar que ele seja executado desnecessariamente.

#### 2. Preservando a Identidade de Referência

Quando você cria objetos ou arrays dentro de um componente, eles são recriados com novas referências a cada renderização. Isso pode causar re-renderizações desnecessárias em componentes filhos otimizados.

#### 3. Valores como Dependências de useEffect

Quando você usa objetos ou arrays como dependências em `useEffect` ou outros Hooks, `useMemo` evita que o efeito seja executado desnecessariamente.

### useMemo vs. Variáveis Regulares

Vamos comparar o uso de `useMemo` com variáveis regulares:

```jsx
function Exemplo({ data }) {
  // Abordagem 1: Variável regular (recalculada a cada renderização)
  const processedData = processData(data);
  
  // Abordagem 2: useMemo (memorizada entre renderizações)
  const processedDataMemo = useMemo(() => {
    return processData(data);
  }, [data]);
  
  return <ChildComponent data={processedDataMemo} />;
}
```

**Quando usar variáveis regulares é adequado**:
- Para cálculos simples e rápidos
- Quando o resultado não é passado para componentes memorizados
- Quando o resultado não é usado como dependência em outros Hooks
- Quando a clareza do código é mais importante que a otimização

**Quando usar useMemo é adequado**:
- Para cálculos computacionalmente caros
- Quando o resultado é passado para componentes memorizados
- Quando o resultado é usado como dependência em outros Hooks
- Quando você precisa preservar a identidade de referência de objetos/arrays

### Dependências do useMemo

O array de dependências do `useMemo` funciona de maneira similar ao do `useEffect` e `useCallback`:

```jsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

- O cálculo será refeito sempre que qualquer valor no array de dependências mudar
- Se o array estiver vazio `[]`, o cálculo será feito apenas uma vez e reutilizado em todas as renderizações
- Se você omitir o array, o cálculo será refeito em cada renderização (tornando o `useMemo` inútil)

### useMemo vs. useCallback

É importante entender a diferença entre `useMemo` e `useCallback`:

- **useMemo** memoriza o **resultado** de uma função
- **useCallback** memoriza a **função** em si

```jsx
// Memoriza o resultado da função
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoriza a função em si
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// Equivalência
const memoizedCallback = useCallback(fn, deps);
const memoizedCallback = useMemo(() => fn, deps);
```

Use `useMemo` quando precisar memorizar um valor calculado, e `useCallback` quando precisar memorizar uma função.

### Boas Práticas

1. **Não use useMemo prematuramente**: Comece sem ele e adicione apenas quando necessário para otimização.

2. **Inclua todas as dependências**: Sempre inclua no array de dependências todas as variáveis do escopo do componente que são usadas dentro da função de cálculo.

3. **Use o ESLint plugin para Hooks**: O plugin `eslint-plugin-react-hooks` ajudará a identificar dependências ausentes.

4. **Combine com React.memo**: `useMemo` é mais eficaz quando usado com componentes filhos memorizados com `React.memo`.

5. **Priorize cálculos caros**: Use `useMemo` principalmente para cálculos computacionalmente intensivos ou para preservar a identidade de referência.

6. **Evite dependências desnecessárias**: Quando possível, estruture seu código para minimizar dependências.

7. **Considere alternativas**: Para alguns casos, abordagens mais simples como mover o cálculo para fora do componente ou usar `useReducer` podem ser mais apropriadas.

## useRef

O Hook `useRef` é uma ferramenta poderosa no React que permite criar uma referência mutável que persiste durante todo o ciclo de vida do componente. Diferente do estado, atualizar uma ref não causa uma nova renderização do componente.

### Conceito Básico

O `useRef` retorna um objeto mutável com uma propriedade `.current` que pode armazenar qualquer valor. Este objeto permanece o mesmo entre renderizações, e modificar sua propriedade `.current` não causa uma re-renderização do componente.

Existem dois casos de uso principais para `useRef`:

1. **Acessar elementos DOM diretamente**: Criar uma referência para um elemento DOM para manipulá-lo imperativamente
2. **Armazenar valores mutáveis**: Manter valores que podem mudar mas não devem causar re-renderizações

### Sintaxe Básica

```jsx
import { useRef } from 'react';

function MeuComponente() {
  // Cria uma ref com valor inicial null
  const meuRef = useRef(null);
  
  // Você pode acessar ou modificar o valor atual usando meuRef.current
  
  return <div ref={meuRef}>Este elemento é referenciado</div>;
}
```

O Hook `useRef` aceita um argumento opcional que é o valor inicial da propriedade `.current`.

### Acessando Elementos DOM

Um dos usos mais comuns do `useRef` é acessar elementos DOM diretamente:

```jsx
function CampoFoco() {
  // Cria uma ref para armazenar a referência ao input
  const inputRef = useRef(null);
  
  // Função para focar o input
  const focarInput = () => {
    // Acessa o elemento DOM real através da propriedade .current
    inputRef.current.focus();
  };
  
  return (
    <div>
      {/* Atribui a ref ao elemento input */}
      <input ref={inputRef} type="text" />
      <button onClick={focarInput}>Focar no input</button>
    </div>
  );
}
```

### Armazenando Valores Mutáveis

Além de referenciar elementos DOM, `useRef` é útil para armazenar qualquer valor que precisa persistir entre renderizações sem causar uma nova renderização:

```jsx
function Cronometro() {
  const [tempo, setTempo] = useState(0);
  // Armazena o ID do intervalo em uma ref
  const intervalIdRef = useRef(null);
  
  const iniciar = () => {
    if (intervalIdRef.current !== null) return; // Evita múltiplos intervalos
    
    intervalIdRef.current = setInterval(() => {
      setTempo(t => t + 1);
    }, 1000);
  };
  
  const parar = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  };
  
  // Limpa o intervalo quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      <p>Tempo: {tempo} segundos</p>
      <button onClick={iniciar}>Iniciar</button>
      <button onClick={parar}>Parar</button>
    </div>
  );
}
```

### useRef vs. useState

É importante entender quando usar `useRef` e quando usar `useState`:

```jsx
function ExemploComparacaoHooks() {
  // useState: Para valores que afetam a renderização
  const [contador, setContador] = useState(0);
  
  // useRef: Para valores que não afetam a renderização
  const contadorRef = useRef(0);
  
  const incrementarState = () => {
    setContador(contador + 1); // Causa re-renderização
  };
  
  const incrementarRef = () => {
    contadorRef.current += 1; // Não causa re-renderização
    console.log('Ref atual:', contadorRef.current);
  };
  
  console.log('Componente renderizado');
  
  return (
    <div>
      <p>Estado (causa re-renderização): {contador}</p>
      <p>Ref (não causa re-renderização): {contadorRef.current}</p>
      
      <button onClick={incrementarState}>Incrementar Estado</button>
      <button onClick={incrementarRef}>Incrementar Ref</button>
    </div>
  );
}
```

**Use useState quando**:
- O valor é usado para renderização
- Você quer que mudanças no valor causem re-renderizações
- Você quer que o React "lembre" do valor entre renderizações

**Use useRef quando**:
- O valor não é usado para renderização (ou é usado apenas para leitura)
- Você não quer que mudanças no valor causem re-renderizações
- Você precisa acessar elementos DOM diretamente
- Você precisa armazenar valores como IDs de temporizadores, valores anteriores, etc.

### Boas Práticas

1. **Use refs para valores que não afetam a renderização**: Se um valor não precisa ser mostrado na UI ou não deve causar re-renderizações quando alterado, use `useRef`.

2. **Modifique refs apenas em event handlers ou effects**: Evite modificar refs durante a renderização.

3. **Verifique se a ref está definida antes de acessá-la**: Sempre verifique se `ref.current` existe antes de tentar acessar suas propriedades ou métodos.

4. **Limpe recursos em useEffect**: Se você criar temporizadores, observadores ou outros recursos usando refs, lembre-se de limpá-los no retorno do `useEffect`.

5. **Use forwardRef para componentes personalizados**: Se você criar componentes personalizados que precisam aceitar refs, use `forwardRef`.

6. **Combine useRef com useImperativeHandle para APIs imperativas**: Use `useImperativeHandle` para personalizar o valor exposto quando um componente é acessado via ref.

7. **Prefira abordagens declarativas quando possível**: Embora refs permitam manipulação imperativa do DOM, prefira abordagens declarativas quando possível.

## Hooks Customizados

Os Hooks customizados são uma das características mais poderosas do sistema de Hooks do React. Eles permitem extrair lógica com estado de componentes em funções reutilizáveis, facilitando o compartilhamento de comportamento entre diferentes componentes sem duplicação de código.

### Conceito Básico

Um Hook customizado é simplesmente uma função JavaScript cujo nome começa com "use" e que pode chamar outros Hooks. Esta convenção de nomenclatura é importante, pois permite que o linter do React verifique se as regras dos Hooks estão sendo seguidas.

Ao criar um Hook customizado, você está essencialmente extraindo lógica de componente em uma função reutilizável, permitindo:

1. **Reutilização de lógica com estado**: Compartilhar comportamento entre componentes sem componentes de ordem superior (HOCs) ou render props
2. **Composição**: Combinar múltiplos Hooks em um único Hook customizado
3. **Abstração**: Esconder detalhes de implementação complexos atrás de uma API simples
4. **Testabilidade**: Testar lógica de forma isolada, independente dos componentes que a utilizam

### Sintaxe Básica

```jsx
import { useState, useEffect } from 'react';

// Hook customizado para gerenciar o estado de um contador
function useContador(valorInicial = 0, passo = 1) {
  // Usa Hooks internos do React
  const [contador, setContador] = useState(valorInicial);
  
  // Funções para manipular o estado
  const incrementar = () => setContador(c => c + passo);
  const decrementar = () => setContador(c => c - passo);
  const resetar = () => setContador(valorInicial);
  
  // Retorna o estado e as funções
  return {
    contador,
    incrementar,
    decrementar,
    resetar
  };
}

// Uso em um componente
function ContadorComponente() {
  const { contador, incrementar, decrementar, resetar } = useContador(10, 2);
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={incrementar}>+</button>
      <button onClick={decrementar}>-</button>
      <button onClick={resetar}>Resetar</button>
    </div>
  );
}
```

### Exemplos de Hooks Customizados Úteis

#### 1. useLocalStorage

Este Hook permite persistir estado no localStorage do navegador:

```jsx
function useLocalStorage(chave, valorInicial) {
  // Função de inicialização para obter o valor do localStorage
  const [valorArmazenado, setValorArmazenado] = useState(() => {
    try {
      // Tenta obter o valor do localStorage
      const item = window.localStorage.getItem(chave);
      // Retorna o item parseado se existir, ou o valor inicial
      return item ? JSON.parse(item) : valorInicial;
    } catch (erro) {
      console.error(`Erro ao obter item '${chave}' do localStorage:`, erro);
      return valorInicial;
    }
  });
  
  // Função para atualizar o valor no estado e no localStorage
  const setValor = (valor) => {
    try {
      // Suporta função como valor (similar ao setState)
      const valorParaArmazenar = valor instanceof Function ? valor(valorArmazenado) : valor;
      
      // Atualiza o estado
      setValorArmazenado(valorParaArmazenar);
      
      // Atualiza o localStorage
      window.localStorage.setItem(chave, JSON.stringify(valorParaArmazenar));
    } catch (erro) {
      console.error(`Erro ao armazenar item '${chave}' no localStorage:`, erro);
    }
  };
  
  return [valorArmazenado, setValor];
}
```

#### 2. useFetch

Este Hook simplifica requisições HTTP e gerenciamento de estados de carregamento e erro:

```jsx
function useFetch(url, opcoes = {}) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [controller, setController] = useState(null);
  
  useEffect(() => {
    // Aborta a requisição anterior se uma nova for iniciada
    if (controller) {
      controller.abort();
    }
    
    // Cria um novo controller para esta requisição
    const abortController = new AbortController();
    setController(abortController);
    
    const fetchDados = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const resposta = await fetch(url, {
          ...opcoes,
          signal: abortController.signal
        });
        
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        
        const dadosJson = await resposta.json();
        setDados(dadosJson);
      } catch (erro) {
        // Ignora erros de abort
        if (erro.name !== 'AbortError') {
          setErro(erro.message);
        }
      } finally {
        setCarregando(false);
      }
    };
    
    fetchDados();
    
    // Função de limpeza para abortar a requisição quando o componente desmontar
    return () => {
      abortController.abort();
    };
  }, [url, JSON.stringify(opcoes)]);
  
  // Função para recarregar os dados
  const recarregar = () => {
    if (controller) {
      controller.abort();
    }
    
    const abortController = new AbortController();
    setController(abortController);
    
    setCarregando(true);
    setErro(null);
    
    fetch(url, {
      ...opcoes,
      signal: abortController.signal
    })
      .then(resposta => {
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        return resposta.json();
      })
      .then(dadosJson => {
        setDados(dadosJson);
      })
      .catch(erro => {
        if (erro.name !== 'AbortError') {
          setErro(erro.message);
        }
      })
      .finally(() => {
        setCarregando(false);
      });
  };
  
  return { dados, carregando, erro, recarregar };
}
```

#### 3. useForm

Este Hook simplifica o gerenciamento de formulários:

```jsx
function useForm(valoresIniciais = {}) {
  const [valores, setValores] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  const [tocado, setTocado] = useState({});
  const [enviando, setEnviando] = useState(false);
  
  // Resetar o formulário
  const resetar = () => {
    setValores(valoresIniciais);
    setErros({});
    setTocado({});
    setEnviando(false);
  };
  
  // Manipular mudanças nos campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setValores(v => ({
      ...v,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Manipular eventos de blur (quando o campo perde o foco)
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTocado(t => ({
      ...t,
      [name]: true
    }));
  };
  
  // Validar o formulário
  const validar = (validacoes = {}) => {
    const novosErros = {};
    
    // Executa cada função de validação
    Object.entries(validacoes).forEach(([campo, validacao]) => {
      if (typeof validacao === 'function') {
        const mensagemErro = validacao(valores[campo], valores);
        if (mensagemErro) {
          novosErros[campo] = mensagemErro;
        }
      }
    });
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };
  
  // Manipular envio do formulário
  const handleSubmit = (onSubmit, validacoes = {}) => {
    return async (e) => {
      e.preventDefault();
      
      // Marca todos os campos como tocados
      const todosTocados = Object.keys(valores).reduce((acc, campo) => {
        acc[campo] = true;
        return acc;
      }, {});
      
      setTocado(todosTocados);
      
      // Valida o formulário
      const formularioValido = validar(validacoes);
      
      if (formularioValido) {
        setEnviando(true);
        
        try {
          await onSubmit(valores);
        } catch (erro) {
          console.error('Erro ao enviar formulário:', erro);
        } finally {
          setEnviando(false);
        }
      }
    };
  };
  
  return {
    valores,
    erros,
    tocado,
    enviando,
    handleChange,
    handleBlur,
    handleSubmit,
    resetar,
    setValores
  };
}
```

### Princípios para Criar Hooks Customizados

#### 1. Composição de Hooks

Hooks customizados podem usar outros Hooks, incluindo outros Hooks customizados.

#### 2. Separação de Preocupações

Divida Hooks complexos em Hooks menores e mais focados.

#### 3. Nomeação Consistente

Siga convenções de nomeação claras:

- Comece com "use" (obrigatório para que o linter do React reconheça como Hook)
- Use nomes descritivos que indicam o propósito do Hook
- Seja consistente com o estilo de retorno (objeto vs. array)

#### 4. Tratamento de Erros

Implemente tratamento de erros adequado em seus Hooks.

#### 5. Documentação Clara

Documente seus Hooks customizados para facilitar o uso.

### Boas Práticas

1. **Siga as Regras dos Hooks**: Hooks customizados devem seguir as mesmas regras dos Hooks do React (chamar apenas no nível superior, apenas de componentes funcionais ou outros Hooks).

2. **Mantenha-os Focados**: Cada Hook customizado deve ter uma responsabilidade clara e bem definida.

3. **Prefira Composição**: Em vez de criar Hooks grandes e complexos, crie Hooks menores e componha-os.

4. **Nomeie Claramente**: Use nomes descritivos que indicam o propósito do Hook.

5. **Documente o Uso**: Adicione comentários ou documentação explicando como usar o Hook, seus parâmetros e retornos.

6. **Trate Erros Adequadamente**: Implemente tratamento de erros robusto em seus Hooks.

7. **Teste seus Hooks**: Escreva testes para garantir que seus Hooks funcionem como esperado.

8. **Considere a Performance**: Use memoização (useMemo, useCallback) quando apropriado para evitar cálculos ou renderizações desnecessárias.

9. **Limpe Recursos**: Sempre retorne uma função de limpeza de useEffect quando o Hook cria recursos que precisam ser liberados.

10. **Evite Efeitos Colaterais Inesperados**: Seja explícito sobre quais efeitos colaterais seu Hook causa.

## Conclusão

Os Hooks representam uma mudança fundamental na forma como escrevemos componentes React, permitindo uma melhor organização de código, reutilização de lógica e componentes mais simples. Eles resolvem problemas reais que os desenvolvedores enfrentavam com componentes de classe e oferecem uma API mais intuitiva para trabalhar com estado e efeitos colaterais.

Ao dominar os Hooks básicos como `useState`, `useEffect` e `useContext`, e os Hooks adicionais como `useReducer`, `useCallback`, `useMemo` e `useRef`, você pode criar componentes React mais eficientes, legíveis e fáceis de manter. Além disso, a capacidade de criar seus próprios Hooks customizados permite extrair e reutilizar lógica entre componentes, levando a um código mais modular e menos repetitivo.

Lembre-se de seguir as regras dos Hooks e as boas práticas mencionadas neste guia para garantir que seus componentes funcionem corretamente e sejam otimizados para performance. Com a prática, você se tornará mais confortável com o paradigma dos Hooks e descobrirá padrões e técnicas que melhoram significativamente sua experiência de desenvolvimento com React.
