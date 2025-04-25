# useCallback no React

O Hook `useCallback` é uma ferramenta de otimização de performance no React que permite memorizar funções entre renderizações. Ele é especialmente útil quando você passa funções para componentes filhos otimizados que dependem da igualdade de referência para evitar renderizações desnecessárias.

## Conceito Básico

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

## Sintaxe Básica

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

## Quando Usar useCallback

O `useCallback` não é necessário em todos os casos. Você deve considerar usá-lo quando:

### 1. Passando Funções para Componentes Memorizados

Se você está passando uma função como prop para um componente filho que é otimizado com `React.memo`, `useCallback` pode evitar renderizações desnecessárias:

```jsx
function ListaDeItens({ itens, onItemClick }) {
  console.log('ListaDeItens renderizada');
  
  return (
    <ul>
      {itens.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.nome}
        </li>
      ))}
    </ul>
  );
}

// Otimizado com React.memo
const ListaDeItensOtimizada = React.memo(ListaDeItens);

function App() {
  const [itens, setItens] = useState([
    { id: 1, nome: 'Item 1' },
    { id: 2, nome: 'Item 2' }
  ]);
  const [selecionado, setSelecionado] = useState(null);
  
  // Sem useCallback - nova função a cada renderização
  // const handleItemClick = (id) => {
  //   setSelecionado(id);
  // };
  
  // Com useCallback - mesma função entre renderizações
  const handleItemClick = useCallback((id) => {
    setSelecionado(id);
  }, []); // Sem dependências, função nunca muda
  
  return (
    <div>
      <h1>Item selecionado: {selecionado}</h1>
      <ListaDeItensOtimizada 
        itens={itens} 
        onItemClick={handleItemClick} 
      />
    </div>
  );
}
```

### 2. Funções como Dependências de useEffect

Quando você usa uma função como dependência em `useEffect` ou outros Hooks, `useCallback` evita que o efeito seja executado desnecessariamente:

```jsx
function BuscaDados({ query, pagina }) {
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  
  // Sem useCallback - fetchDados seria recriada a cada renderização
  // e o useEffect seria executado mesmo quando query e pagina não mudassem
  
  // Com useCallback - fetchDados só muda quando query ou pagina mudam
  const fetchDados = useCallback(async () => {
    setCarregando(true);
    try {
      const resposta = await fetch(`/api/busca?q=${query}&page=${pagina}`);
      const dados = await resposta.json();
      setResultados(dados);
    } catch (erro) {
      console.error('Erro ao buscar dados:', erro);
    } finally {
      setCarregando(false);
    }
  }, [query, pagina]);
  
  // useEffect depende de fetchDados
  useEffect(() => {
    fetchDados();
  }, [fetchDados]); // fetchDados só muda quando query ou pagina mudam
  
  return (
    <div>
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {resultados.map(item => (
            <li key={item.id}>{item.nome}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### 3. Funções que Criam ou Usam Referências

Quando sua função cria ou usa referências (como refs, IDs de timeout, etc.), `useCallback` pode ajudar a manter a consistência:

```jsx
function AutoSave({ dados, salvar }) {
  // Memoriza a função para evitar criar múltiplos timers
  const salvarComDelay = useCallback(() => {
    const timeoutId = setTimeout(() => {
      console.log('Salvando dados:', dados);
      salvar(dados);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [dados, salvar]);
  
  useEffect(() => {
    const limpar = salvarComDelay();
    return limpar;
  }, [salvarComDelay]);
  
  return <p>Salvamento automático ativado</p>;
}
```

## useCallback vs. Funções Inline

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

## Dependências do useCallback

O array de dependências do `useCallback` funciona de maneira similar ao do `useEffect`:

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- A função será recriada sempre que qualquer valor no array de dependências mudar
- Se o array estiver vazio `[]`, a função será criada apenas uma vez e reutilizada em todas as renderizações
- Se você omitir o array, uma nova função será criada em cada renderização (tornando o `useCallback` inútil)

### Capturando Valores com Closures

É importante entender como as closures (fechamentos) funcionam com `useCallback`:

```jsx
function Contador() {
  const [contador, setContador] = useState(0);
  
  // ❌ Problema: Esta função captura o valor inicial de 'contador'
  const alertContador = useCallback(() => {
    alert(`Contador: ${contador}`);
  }, []); // Sem dependências, a função nunca é recriada
  
  // ✅ Solução 1: Incluir 'contador' nas dependências
  const alertContadorAtualizado = useCallback(() => {
    alert(`Contador: ${contador}`);
  }, [contador]); // Função recriada quando 'contador' muda
  
  // ✅ Solução 2: Usar um updater function para acessar o estado mais recente
  const incrementar = useCallback(() => {
    setContador(c => c + 1); // Sempre usa o valor mais recente
  }, []); // Não precisa de dependências
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={alertContador}>Alerta (Desatualizado)</button>
      <button onClick={alertContadorAtualizado}>Alerta (Atualizado)</button>
    </div>
  );
}
```

## Padrões Comuns

### 1. Funções de Manipulação de Eventos

```jsx
function Formulario({ onSubmit }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  
  const handleNomeChange = useCallback((e) => {
    setNome(e.target.value);
  }, []);
  
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit({ nome, email });
  }, [nome, email, onSubmit]);
  
  return (
    <form onSubmit={handleSubmit}>
      <CampoOtimizado
        label="Nome"
        value={nome}
        onChange={handleNomeChange}
      />
      <CampoOtimizado
        label="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

const CampoOtimizado = React.memo(function Campo({ label, value, onChange }) {
  console.log(`Campo ${label} renderizado`);
  return (
    <div>
      <label>{label}:</label>
      <input value={value} onChange={onChange} />
    </div>
  );
});
```

### 2. Funções de Callback para APIs

```jsx
function GerenciadorDeDados() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  
  const buscarDados = useCallback(async () => {
    setCarregando(true);
    try {
      const resposta = await fetch('/api/dados');
      const novosDados = await resposta.json();
      setDados(novosDados);
    } catch (erro) {
      console.error('Erro ao buscar dados:', erro);
    } finally {
      setCarregando(false);
    }
  }, []);
  
  const adicionarItem = useCallback(async (novoItem) => {
    try {
      const resposta = await fetch('/api/dados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoItem)
      });
      
      if (!resposta.ok) throw new Error('Falha ao adicionar item');
      
      const itemAdicionado = await resposta.json();
      setDados(dadosAnteriores => [...dadosAnteriores, itemAdicionado]);
      
      return true;
    } catch (erro) {
      console.error('Erro ao adicionar item:', erro);
      return false;
    }
  }, []);
  
  const removerItem = useCallback(async (id) => {
    try {
      const resposta = await fetch(`/api/dados/${id}`, {
        method: 'DELETE'
      });
      
      if (!resposta.ok) throw new Error('Falha ao remover item');
      
      setDados(dadosAnteriores => 
        dadosAnteriores.filter(item => item.id !== id)
      );
      
      return true;
    } catch (erro) {
      console.error('Erro ao remover item:', erro);
      return false;
    }
  }, []);
  
  // Buscar dados na montagem
  useEffect(() => {
    buscarDados();
  }, [buscarDados]);
  
  return (
    <div>
      <h1>Gerenciador de Dados</h1>
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <>
          <ListaItensOtimizada 
            itens={dados} 
            onRemover={removerItem} 
          />
          <FormularioItemOtimizado onAdicionar={adicionarItem} />
        </>
      )}
    </div>
  );
}

const ListaItensOtimizada = React.memo(function ListaItens({ itens, onRemover }) {
  return (
    <ul>
      {itens.map(item => (
        <li key={item.id}>
          {item.nome}
          <button onClick={() => onRemover(item.id)}>Remover</button>
        </li>
      ))}
    </ul>
  );
});

const FormularioItemOtimizado = React.memo(function FormularioItem({ onAdicionar }) {
  const [nome, setNome] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim()) {
      onAdicionar({ nome });
      setNome('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Novo item"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
});
```

### 3. Funções de Debounce/Throttle

```jsx
function CampoBusca() {
  const [termo, setTermo] = useState('');
  const [resultados, setResultados] = useState([]);
  
  // Função de busca debounced
  const buscarResultados = useCallback(
    debounce(async (termoBusca) => {
      if (!termoBusca.trim()) {
        setResultados([]);
        return;
      }
      
      try {
        const resposta = await fetch(`/api/busca?q=${termoBusca}`);
        const dados = await resposta.json();
        setResultados(dados);
      } catch (erro) {
        console.error('Erro na busca:', erro);
      }
    }, 500), // 500ms de delay
    []
  );
  
  const handleChange = useCallback((e) => {
    const novoTermo = e.target.value;
    setTermo(novoTermo);
    buscarResultados(novoTermo);
  }, [buscarResultados]);
  
  return (
    <div>
      <input
        type="text"
        value={termo}
        onChange={handleChange}
        placeholder="Buscar..."
      />
      <ul>
        {resultados.map(item => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}

// Função de debounce
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

## Otimizações de Performance

### 1. Combinando useCallback com useMemo

Você pode combinar `useCallback` com `useMemo` para otimizar tanto funções quanto valores computados:

```jsx
function Dashboard({ usuario, produtos }) {
  // Memoriza um valor computado
  const produtosFiltrados = useMemo(() => {
    return produtos.filter(p => p.usuarioId === usuario.id);
  }, [produtos, usuario.id]);
  
  // Memoriza uma função
  const ordenarPorPreco = useCallback(() => {
    return [...produtosFiltrados].sort((a, b) => a.preco - b.preco);
  }, [produtosFiltrados]);
  
  return (
    <div>
      <h1>Dashboard de {usuario.nome}</h1>
      <ProdutosListaOtimizada 
        produtos={produtosFiltrados} 
        onOrdenar={ordenarPorPreco} 
      />
    </div>
  );
}
```

### 2. Evitando Dependências Desnecessárias

Você pode reduzir o número de vezes que uma função é recriada usando técnicas para evitar dependências:

```jsx
function Exemplo({ id }) {
  const [dados, setDados] = useState(null);
  
  // ❌ Problema: fetchDados depende de 'id' e será recriada quando 'id' mudar
  const fetchDados = useCallback(() => {
    fetch(`/api/dados/${id}`)
      .then(res => res.json())
      .then(setDados);
  }, [id]);
  
  // ✅ Solução: Mova a dependência para dentro da função
  const fetchDadosOtimizado = useCallback(() => {
    // 'id' é capturado do escopo no momento da chamada
    const currentId = id;
    fetch(`/api/dados/${currentId}`)
      .then(res => res.json())
      .then(setDados);
  }, []); // Sem dependências
  
  // Melhor ainda: Use useEffect para buscar dados quando 'id' mudar
  useEffect(() => {
    fetch(`/api/dados/${id}`)
      .then(res => res.json())
      .then(setDados);
  }, [id]);
  
  // ...
}
```

### 3. Funções Estáveis com useRef

Para casos onde você precisa de uma função que nunca muda mas precisa acessar props ou estado atualizados:

```jsx
function Componente({ onEvent }) {
  const [estado, setEstado] = useState(0);
  
  // Armazena a prop mais recente em um ref
  const onEventRef = useRef(onEvent);
  
  // Atualiza o ref quando a prop muda
  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);
  
  // Função estável que usa o valor mais recente da prop
  const handleEvent = useCallback(() => {
    // Sempre usa a versão mais recente de onEvent
    onEventRef.current(estado);
  }, [estado]); // Só depende de 'estado', não de 'onEvent'
  
  return <button onClick={ha
(Content truncated due to size limit. Use line ranges to read in chunks)