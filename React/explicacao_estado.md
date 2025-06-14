# Estado (State) no React

O estado (state) é um dos conceitos mais importantes no React. Ele permite que os componentes armazenem e gerenciem dados que podem mudar ao longo do tempo, afetando o que é renderizado na tela.

## O que é Estado?

O estado é um objeto JavaScript que contém dados específicos do componente que podem mudar durante o ciclo de vida do componente. Diferente das props, que são passadas de fora e são imutáveis do ponto de vista do componente que as recebe, o estado é gerenciado internamente pelo próprio componente.

O estado é:
- **Mutável**: Pode ser atualizado pelo componente
- **Privado**: Pertence especificamente ao componente que o define
- **Encapsulado**: Componentes pai não têm acesso direto ao estado dos componentes filhos
- **Assíncrono**: Atualizações de estado podem não ser aplicadas imediatamente

## Estado em Componentes Funcionais: useState

Com a introdução dos Hooks no React 16.8, os componentes funcionais podem usar estado através do Hook `useState`.

### Sintaxe Básica

```jsx
import { useState } from 'react';

function Contador() {
  // Declara uma variável de estado chamada "contador" com valor inicial 0
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

Neste exemplo:
- `useState(0)` cria uma variável de estado com valor inicial `0`
- `useState` retorna um array com dois elementos:
  1. O valor atual do estado (`contador`)
  2. Uma função para atualizar o estado (`setContador`)
- Usamos desestruturação de array `[contador, setContador]` para acessar esses elementos
- Quando o botão é clicado, chamamos `setContador` com o novo valor

### Múltiplas Variáveis de Estado

Você pode usar `useState` múltiplas vezes em um componente para gerenciar diferentes valores de estado:

```jsx
function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState(0);
  
  return (
    <form>
      <div>
        <label>Nome:</label>
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <label>Idade:</label>
        <input 
          type="number" 
          value={idade} 
          onChange={(e) => setIdade(parseInt(e.target.value) || 0)} 
        />
      </div>
    </form>
  );
}
```

### Estado com Objetos

Você pode usar objetos como estado, mas lembre-se que, ao contrário dos componentes de classe, o Hook `useState` não mescla automaticamente objetos atualizados:

```jsx
function Perfil() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    idade: 0
  });
  
  const atualizarNome = (e) => {
    // Precisamos copiar todas as propriedades existentes
    setUsuario({
      ...usuario,
      nome: e.target.value
    });
  };
  
  const atualizarEmail = (e) => {
    setUsuario({
      ...usuario,
      email: e.target.value
    });
  };
  
  const atualizarIdade = (e) => {
    setUsuario({
      ...usuario,
      idade: parseInt(e.target.value) || 0
    });
  };
  
  return (
    <form>
      <div>
        <label>Nome:</label>
        <input 
          type="text" 
          value={usuario.nome} 
          onChange={atualizarNome} 
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={usuario.email} 
          onChange={atualizarEmail} 
        />
      </div>
      <div>
        <label>Idade:</label>
        <input 
          type="number" 
          value={usuario.idade} 
          onChange={atualizarIdade} 
        />
      </div>
    </form>
  );
}
```

### Estado com Arrays

Trabalhar com arrays no estado segue o mesmo princípio de imutabilidade:

```jsx
function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;
    
    setTarefas([...tarefas, { 
      id: Date.now(), 
      texto: novaTarefa, 
      concluida: false 
    }]);
    setNovaTarefa('');
  };
  
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };
  
  const alternarTarefa = (id) => {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id 
        ? { ...tarefa, concluida: !tarefa.concluida } 
        : tarefa
    ));
  };
  
  return (
    <div>
      <div>
        <input 
          type="text" 
          value={novaTarefa} 
          onChange={(e) => setNovaTarefa(e.target.value)} 
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            <span 
              style={{ 
                textDecoration: tarefa.concluida ? 'line-through' : 'none' 
              }}
              onClick={() => alternarTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </span>
            <button onClick={() => removerTarefa(tarefa.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Estado em Componentes de Classe

Embora os componentes funcionais com Hooks sejam agora a abordagem recomendada, é importante entender como o estado funciona em componentes de classe, pois você ainda pode encontrá-los em código existente.

### Sintaxe Básica

```jsx
import React, { Component } from 'react';

class Contador extends Component {
  constructor(props) {
    super(props);
    // Inicializa o estado no construtor
    this.state = {
      contador: 0
    };
  }
  
  render() {
    return (
      <div>
        <p>Você clicou {this.state.contador} vezes</p>
        <button onClick={() => this.setState({ contador: this.state.contador + 1 })}>
          Clique aqui
        </button>
      </div>
    );
  }
}
```

### Atualizando o Estado

Em componentes de classe, o estado é atualizado usando o método `setState()`:

```jsx
// Forma básica
this.setState({ contador: this.state.contador + 1 });

// Usando uma função quando o novo estado depende do estado anterior
this.setState((estadoAnterior) => {
  return { contador: estadoAnterior.contador + 1 };
});

// Com callback após a atualização
this.setState({ contador: this.state.contador + 1 }, () => {
  console.log('Estado atualizado:', this.state.contador);
});
```

### Mesclagem Automática

Diferente do Hook `useState`, o método `setState` em componentes de classe mescla automaticamente o objeto de atualização com o estado atual:

```jsx
// Estado inicial
this.state = {
  usuario: {
    nome: 'Maria',
    email: 'maria@exemplo.com'
  },
  contador: 0
};

// Isso atualiza apenas o contador, mantendo o objeto usuario intacto
this.setState({ contador: this.state.contador + 1 });

// Para atualizar propriedades aninhadas
this.setState({
  usuario: {
    ...this.state.usuario,
    email: 'novo@exemplo.com'
  }
});
```

## Princípios Importantes do Estado

### 1. Não Modifique o Estado Diretamente

Sempre use `setState` (em componentes de classe) ou a função atualizadora retornada por `useState` (em componentes funcionais) para modificar o estado:

```jsx
// ERRADO
this.state.contador = this.state.contador + 1;
// ou em componentes funcionais
contador = contador + 1;

// CORRETO
this.setState({ contador: this.state.contador + 1 });
// ou em componentes funcionais
setContador(contador + 1);
```

### 2. Atualizações de Estado Podem Ser Assíncronas

O React pode agrupar várias chamadas de `setState` para melhorar o desempenho. Isso significa que o estado pode não ser atualizado imediatamente após chamar `setState`:

```jsx
// Pode não funcionar como esperado
this.setState({ contador: this.state.contador + 1 });
console.log(this.state.contador); // Pode ainda mostrar o valor antigo

// Use a forma de função quando o novo estado depende do anterior
this.setState((estadoAnterior) => {
  return { contador: estadoAnterior.contador + 1 };
});

// Ou use o callback de setState para código que depende do novo estado
this.setState({ contador: this.state.contador + 1 }, () => {
  console.log('Novo contador:', this.state.contador);
});
```

Em componentes funcionais com Hooks:

```jsx
// Pode não funcionar como esperado em alguns casos
setContador(contador + 1);
setContador(contador + 1); // Ambas as chamadas podem usar o mesmo valor de contador

// Use a forma de função para atualizações baseadas no estado anterior
setContador(contadorAnterior => contadorAnterior + 1);
setContador(contadorAnterior => contadorAnterior + 1); // Agora funciona corretamente
```

### 3. Atualizações de Estado Acionam Re-renderizações

Quando o estado é atualizado, o React re-renderiza o componente e seus filhos. Este é o mecanismo principal pelo qual o React atualiza a UI em resposta a eventos.

### 4. Estado vs. Variáveis Locais

Variáveis declaradas dentro do corpo da função de um componente são recriadas a cada renderização. O estado, por outro lado, é preservado entre renderizações:

```jsx
function Exemplo() {
  // Esta variável é recriada a cada renderização
  let contador = 0;
  
  // Este estado é preservado entre renderizações
  const [estadoContador, setEstadoContador] = useState(0);
  
  return (
    <div>
      <p>Variável local: {contador}</p>
      <p>Estado: {estadoContador}</p>
      <button onClick={() => {
        contador += 1; // Não causará re-renderização e será redefinido na próxima renderização
        console.log('Variável local:', contador);
      }}>
        Incrementar Variável Local
      </button>
      <button onClick={() => {
        setEstadoContador(estadoContador + 1); // Causa re-renderização e preserva o valor
      }}>
        Incrementar Estado
      </button>
    </div>
  );
}
```

## Padrões Avançados de Gerenciamento de Estado

### 1. Elevação de Estado (Lifting State Up)

Quando vários componentes precisam compartilhar o mesmo estado, você pode "elevar" o estado para o ancestral comum mais próximo:

```jsx
function TemperatureCalculator() {
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
      <EntradaTemperatura 
        escala="c" 
        temperatura={celsius} 
        onTemperaturaChange={handleCelsiusChange} 
      />
      <EntradaTemperatura 
        escala="f" 
        temperatura={fahrenheit} 
        onTemperaturaChange={handleFahrenheitChange} 
      />
    </div>
  );
}

function EntradaTemperatura({ escala, temperatura, onTemperaturaChange }) {
  const escalas = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };
  
  return (
    <fieldset>
      <legend>Temperatura em {escalas[escala]}:</legend>
      <input 
        value={temperatura}
        onChange={(e) => onTemperaturaChange(e.target.value)}
      />
    </fieldset>
  );
}
```

### 2. Gerenciamento de Estado Complexo com useReducer

Para lógica de estado mais complexa, o Hook `useReducer` pode ser mais apropriado que `useState`:

```jsx
import { useReducer } from 'react';

// Definindo o reducer
function tarefasReducer(estado, acao) {
  switch (acao.type) {
    case 'ADICIONAR':
      return [...estado, {
        id: Date.now(),
        texto: acao.payload,
        concluida: false
      }];
    case 'REMOVER':
      return estado.filter(tarefa => tarefa.id !== acao.payload);
    case 'ALTERNAR':
      return estado.map(tarefa =>
        tarefa.id === acao.payload
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      );
    default:
      return estado;
  }
}

function ListaDeTarefas() {
  const [tarefas, dispatch] = useReducer(tarefasReducer, []);
  const [texto, setTexto] = useState('');
  
  const adicionarTarefa = () => {
    if (texto.trim() === '') return;
    dispatch({ type: 'ADICIONAR', payload: texto });
    setTexto('');
  };
  
  return (
    <div>
      <div>
        <input 
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            <span 
              style={{ 
                textDecoration: tarefa.concluida ? 'line-through' : 'none' 
              }}
              onClick={() => dispatch({ type: 'ALTERNAR', payload: tarefa.id })}
            >
              {tarefa.texto}
            </span>
            <button onClick={() => dispatch({ type: 'REMOVER', payload: tarefa.id })}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. Estado Global com Context API

Para compartilhar estado entre componentes distantes na árvore de componentes, você pode usar a Context API:

```jsx
import { createContext, useContext, useState } from 'react';

// Criar o contexto
const TemaContexto = createContext();

// Provedor de contexto
function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro');
  
  const alternarTema = () => {
    setTema(temaAtual => temaAtual === 'claro' ? 'escuro' : 'claro');
  };
  
  return (
    <TemaContexto.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContexto.Provider>
  );
}

// Hook personalizado para usar o contexto
function useTema() {
  return useContext(TemaContexto);
}

// Componente que usa o tema
function Botao() {
  const { tema } = useTema();
  
  return (
    <button className={`botao-${tema}`}>
      Botão com Tema
    </button>
  );
}

// Componente que altera o tema
function AlternadorDeTema() {
  const { tema, alternarTema } = useTema();
  
  return (
    <button onClick={alternarTema}>
      Alternar para tema {tema === 'claro' ? 'escuro' : 'claro'}
    </button>
  );
}

// Aplicação
function App() {
  return (
    <TemaProvider>
      <div>
        <h1>Aplicação com Tema</h1>
        <AlternadorDeTema />
        <Botao />
      </div>
    </TemaProvider>
  );
}
```

## Boas Práticas para Gerenciamento de Estado

1. **Mantenha o estado o mais local possível**: Coloque o estado no componente que realmente precisa dele. Eleve o estado apenas quando necessário.

2. **Use estado imutável**: Nunca modifique o estado diretamente. Sempre crie novas cópias ao atualizar objetos e arrays.

3. **Minimize o estado**: Nem tudo precisa estar no estado. Calcule valores derivados durante a renderização em vez de armazená-los no estado.

4. **Use a forma funcional para atualizações baseadas no estado anterior**:
   ```jsx
   setContador(contadorAnterior => contadorAnterior + 1);
   ```

5. **Divida estados complexos**: Em vez de um grande objeto de estado, considere dividir em múltiplas variáveis de estado independentes.

6. **Use ferramentas apropriadas para o caso de uso**:
   - `useState` para estado simples
   - `useReducer` para lógica de estado complexa
   - Context API para estado global compartilhado
   - Bibliotecas como Redux, Zustand ou Jotai para aplicações maiores

7. **Evite atualizações de estado desnecessárias**: Cada atualização de estado causa uma re-renderização, então seja criterioso.

8. **Considere a performance**: Para componentes que renderizam listas grandes ou fazem cálculos pesados, use técnicas como memoização (`useMemo`, `useCallback`, `React.memo`).

O estado é um conceito f
(Content truncated due to size limit. Use line ranges to read in chunks)