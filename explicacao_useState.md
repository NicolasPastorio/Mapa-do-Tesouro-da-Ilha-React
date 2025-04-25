# useState no React

O Hook `useState` é o mais fundamental dos Hooks do React. Ele permite adicionar estado local a componentes funcionais, dando a eles a capacidade de "lembrar" informações entre renderizações.

## Conceito Básico

Antes dos Hooks, o estado só podia ser usado em componentes de classe. O Hook `useState` traz essa capacidade para componentes funcionais, permitindo que você declare variáveis de estado que o React preservará entre as renderizações do componente.

## Sintaxe Básica

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

## Valor Inicial do Estado

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

## Atualizando o Estado

A função de atualização de estado (como `setContador`) tem duas formas de uso:

### 1. Passando o Novo Valor Diretamente

```jsx
setContador(5); // Define contador como 5
```

### 2. Passando uma Função que Calcula o Novo Valor

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

## Trabalhando com Objetos e Arrays no Estado

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

## Múltiplas Variáveis de Estado

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

## Estado Único vs. Múltiplos Estados

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

## Lazy Initialization

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

## Exemplos Práticos

### Exemplo 1: Formulário Simples

```jsx
function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação simples
    if (nome && email) {
      console.log('Formulário enviado:', { nome, email });
      setEnviado(true);
    }
  };
  
  if (enviado) {
    return <p>Obrigado por enviar o formulário, {nome}!</p>;
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Exemplo 2: Lista de Tarefas

```jsx
function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;
    
    const novaTarefaObj = {
      id: Date.now(),
      texto: novaTarefa,
      concluida: false
    };
    
    setTarefas([...tarefas, novaTarefaObj]);
    setNovaTarefa('');
  };
  
  const alternarTarefa = (id) => {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id 
        ? { ...tarefa, concluida: !tarefa.concluida } 
        : tarefa
    ));
  };
  
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };
  
  return (
    <div>
      <h2>Lista de Tarefas</h2>
      
      <div>
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
      
      <ul>
        {tarefas.length === 0 ? (
          <li>Nenhuma tarefa adicionada</li>
        ) : (
          tarefas.map(tarefa => (
            <li key={tarefa.id}>
              <span
                style={{
                  textDecoration: tarefa.concluida ? 'line-through' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => alternarTarefa(tarefa.id)}
              >
                {tarefa.texto}
              </span>
              <button onClick={() => removerTarefa(tarefa.id)}>
                Remover
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
```

### Exemplo 3: Contador com Histórico

```jsx
function ContadorComHistorico() {
  const [contador, setContador] = useState(0);
  const [historico, setHistorico] = useState([]);
  
  const incrementar = () => {
    const novoValor = contador + 1;
    setContador(novoValor);
    setHistorico([...historico, novoValor]);
  };
  
  const decrementar = () => {
    const novoValor = contador - 1;
    setContador(novoValor);
    setHistorico([...historico, novoValor]);
  };
  
  const resetar = () => {
    setContador(0);
    setHistorico([]);
  };
  
  return (
    <div>
      <h2>Contador: {contador}</h2>
      
      <div>
        <button onClick={decrementar}>-</button>
        <button onClick={incrementar}>+</button>
        <button onClick={resetar}>Resetar</button>
      </div>
      
      <div>
        <h3>Histórico:</h3>
        {historico.length === 0 ? (
          <p>Nenhuma alteração feita</p>
        ) : (
          <ul>
            {historico.map((valor, index) => (
              <li key={index}>{valor}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

## Boas Práticas

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

## Limitações e Considerações

1. **Atualizações em Lote**: O React pode agrupar múltiplas atualizações de estado para melhorar o desempenho. Isso significa que o estado pode não ser atualizado imediatamente após chamar a função de atualização.

2. **Fechamentos (Closures)**: Tenha cuidado com fechamentos desatualizados em funções assíncronas:
   ```jsx
   // Problema potencial com fechamentos
   useEffect(() => {
     const timer = setTimeout(() => {
       // Este 'contador' pode estar desatualizado se o componente re-renderizar
       console.log(contador);
     }, 1000);
     
     return () => clearTimeout(timer);
   }, []); // Note a dependência vazia
   ```

3. **Comparação de Igualdade**: O React usa comparação de igualdade (`Object.is`) para determinar se o estado mudou. Para objetos e arrays, isso significa que uma nova referência é necessária para acionar uma re-renderização.

4. **Atualizações Síncronas vs. Assíncronas**: No React 18+, as atualizações de estado são sempre assíncronas por padrão. Se você precisa de um comportamento síncrono, pode usar `flushSync` do pacote `react-dom`.

## Conclusão

O Hook `useState` é uma ferramenta poderosa que permite adicionar estado local a componentes funcionais no React. Ele simplifica o gerenciamento de estado em comparação com componentes de classe, tornando o código mais legível e fácil de manter.

Ao dominar `useState`, você pode criar componentes interativos e dinâmicos que respondem às ações do usuário e mantêm seu próprio estado interno. Este Hook é a base para muitos outros padrões e técnicas no React moderno, e é essencial para qualquer desenvolvedor React.
