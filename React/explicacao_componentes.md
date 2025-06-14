# Componentes no React

Os componentes são o coração do React. Eles são os blocos de construção fundamentais para qualquer aplicação React, permitindo que você divida a interface do usuário em peças independentes e reutilizáveis.

## O que são Componentes?

Um componente React é uma função ou classe JavaScript que:
- Aceita entradas (chamadas "props")
- Retorna elementos React que descrevem o que deve aparecer na tela

Essencialmente, um componente é uma parte isolada da sua interface que encapsula sua própria estrutura, lógica e estilo.

## Por que Componentes são Importantes?

A abordagem baseada em componentes oferece várias vantagens:

1. **Reutilização de código**: Componentes podem ser usados em diferentes partes da aplicação, reduzindo duplicação.
2. **Manutenção simplificada**: Cada componente tem uma responsabilidade específica, facilitando a manutenção.
3. **Testabilidade**: Componentes isolados são mais fáceis de testar.
4. **Separação de preocupações**: Cada componente pode focar em uma única funcionalidade.
5. **Desenvolvimento em equipe**: Diferentes desenvolvedores podem trabalhar em diferentes componentes simultaneamente.

## Tipos de Componentes

No React, existem dois tipos principais de componentes:

### 1. Componentes Funcionais

Também conhecidos como "componentes sem estado" ou "stateless components", são funções JavaScript que recebem props como argumento e retornam elementos React.

```jsx
function Saudacao(props) {
  return <h1>Olá, {props.nome}!</h1>;
}

// Uso:
<Saudacao nome="Maria" />
```

Com a introdução dos Hooks no React 16.8, os componentes funcionais podem agora usar estado e outros recursos do React:

```jsx
import { useState } from 'react';

function Contador() {
  // Declarando uma variável de estado chamada "contador"
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

### 2. Componentes de Classe

São classes ES6 que estendem `React.Component` e implementam um método `render()` que retorna elementos React.

```jsx
import React, { Component } from 'react';

class Saudacao extends Component {
  render() {
    return <h1>Olá, {this.props.nome}!</h1>;
  }
}

// Uso:
<Saudacao nome="Maria" />
```

Componentes de classe têm recursos adicionais como métodos de ciclo de vida e estado:

```jsx
import React, { Component } from 'react';

class Contador extends Component {
  constructor(props) {
    super(props);
    this.state = { contador: 0 }; // Inicializando o estado
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

> **Nota**: Embora os componentes de classe ainda sejam suportados, os componentes funcionais com Hooks são agora a abordagem recomendada pela equipe do React.

## Anatomia de um Componente

Vamos analisar os elementos que compõem um componente React:

### Props (Propriedades)

Props são os dados passados de um componente pai para um componente filho. São somente leitura e ajudam a tornar os componentes reutilizáveis.

```jsx
function Botao(props) {
  return (
    <button 
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.texto}
    </button>
  );
}

// Uso:
<Botao 
  texto="Enviar" 
  className="botao-primario" 
  onClick={handleSubmit} 
  disabled={false} 
/>
```

### Estado (State)

O estado contém dados específicos do componente que podem mudar ao longo do tempo. Diferente das props, o estado é gerenciado internamente pelo componente.

```jsx
function ToggleSwitch() {
  const [ligado, setLigado] = useState(false);
  
  return (
    <div className="switch">
      <button onClick={() => setLigado(!ligado)}>
        {ligado ? 'Desligar' : 'Ligar'}
      </button>
      <p>O interruptor está {ligado ? 'ligado' : 'desligado'}</p>
    </div>
  );
}
```

### Métodos/Funções

São funções que definem a lógica do componente, como manipuladores de eventos e transformações de dados.

```jsx
function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  
  // Método para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dados enviados:', { nome, email });
    // Lógica para enviar dados para o servidor
  };
  
  // Método para validar email
  const isEmailValido = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  return (
    <form onSubmit={handleSubmit}>
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
        {email && !isEmailValido(email) && (
          <p className="erro">Por favor, insira um email válido.</p>
        )}
      </div>
      <button type="submit" disabled={!nome || !isEmailValido(email)}>
        Enviar
      </button>
    </form>
  );
}
```

### Renderização (JSX)

A parte do componente que define o que será exibido na tela, geralmente escrita em JSX.

```jsx
function Card({ titulo, descricao, imagem }) {
  return (
    <div className="card">
      {imagem && <img src={imagem} alt={titulo} className="card-imagem" />}
      <div className="card-conteudo">
        <h2 className="card-titulo">{titulo}</h2>
        <p className="card-descricao">{descricao}</p>
      </div>
    </div>
  );
}
```

## Composição de Componentes

Uma das características mais poderosas do React é a capacidade de compor componentes maiores a partir de componentes menores.

### Exemplo de Composição

```jsx
// Componente para o cabeçalho da página
function Cabecalho({ titulo }) {
  return (
    <header>
      <h1>{titulo}</h1>
      <Nav />
    </header>
  );
}

// Componente de navegação
function Nav() {
  return (
    <nav>
      <ul>
        <li><a href="/">Início</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>
  );
}

// Componente para o conteúdo principal
function Conteudo({ children }) {
  return (
    <main>
      {children}
    </main>
  );
}

// Componente para o rodapé
function Rodape() {
  return (
    <footer>
      <p>&copy; 2025 Minha Aplicação</p>
    </footer>
  );
}

// Componente de página que compõe os componentes acima
function PaginaInicial() {
  return (
    <div className="pagina">
      <Cabecalho titulo="Bem-vindo à Minha Aplicação" />
      <Conteudo>
        <h2>Página Inicial</h2>
        <p>Esta é a página inicial da minha aplicação React.</p>
        <button>Saiba mais</button>
      </Conteudo>
      <Rodape />
    </div>
  );
}
```

## Ciclo de Vida dos Componentes

Os componentes React passam por diferentes fases durante sua existência:

### 1. Montagem (Mounting)

Quando um componente é criado e inserido no DOM:

- **Componentes de Classe**: `constructor()`, `static getDerivedStateFromProps()`, `render()`, `componentDidMount()`
- **Componentes Funcionais**: `useEffect(() => { ... }, [])` (array de dependências vazio)

### 2. Atualização (Updating)

Quando um componente é re-renderizado devido a mudanças em props ou estado:

- **Componentes de Classe**: `static getDerivedStateFromProps()`, `shouldComponentUpdate()`, `render()`, `getSnapshotBeforeUpdate()`, `componentDidUpdate()`
- **Componentes Funcionais**: `useEffect(() => { ... }, [dependencias])` (com dependências específicas)

### 3. Desmontagem (Unmounting)

Quando um componente é removido do DOM:

- **Componentes de Classe**: `componentWillUnmount()`
- **Componentes Funcionais**: Função de limpeza retornada pelo `useEffect`: `useEffect(() => { return () => { ... } }, [])`

### Exemplo com Hooks

```jsx
import { useState, useEffect } from 'react';

function ExemploCicloDeVida() {
  const [contador, setContador] = useState(0);
  const [nome, setNome] = useState('');
  
  // Similar a componentDidMount
  useEffect(() => {
    console.log('Componente montado');
    
    // Similar a componentWillUnmount
    return () => {
      console.log('Componente será desmontado');
    };
  }, []);
  
  // Similar a componentDidUpdate para contador
  useEffect(() => {
    if (contador > 0) {
      console.log('Contador atualizado:', contador);
    }
  }, [contador]);
  
  // Similar a componentDidUpdate para nome
  useEffect(() => {
    if (nome) {
      console.log('Nome atualizado:', nome);
    }
  }, [nome]);
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
      
      <div>
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          placeholder="Digite seu nome" 
        />
        {nome && <p>Olá, {nome}!</p>}
      </div>
    </div>
  );
}
```

## Padrões de Componentes

Existem vários padrões comuns para criar componentes React eficientes e reutilizáveis:

### 1. Componentes de Apresentação vs. Componentes de Contêiner

- **Componentes de Apresentação**: Focam em como as coisas parecem (UI), recebem dados via props e geralmente não têm estado próprio.
- **Componentes de Contêiner**: Focam em como as coisas funcionam, gerenciam estado e lógica, e passam dados para componentes de apresentação.

### 2. Componentes de Ordem Superior (HOC)

Um padrão avançado onde uma função recebe um componente e retorna um novo componente com funcionalidades adicionais.

```jsx
// HOC que adiciona funcionalidade de tema
function comTema(ComponenteOriginal) {
  return function ComponenteComTema(props) {
    const tema = useContext(TemaContexto);
    return <ComponenteOriginal {...props} tema={tema} />;
  };
}

// Uso:
const BotaoComTema = comTema(Botao);
```

### 3. Render Props

Um padrão onde um componente recebe uma função como prop que retorna elementos React.

```jsx
function Mouse({ render }) {
  const [posicao, setPosicao] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosicao({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return render(posicao);
}

// Uso:
<Mouse render={({ x, y }) => (
  <p>A posição atual do mouse é ({x}, {y})</p>
)} />
```

### 4. Componentes Compostos

Um padrão onde vários componentes trabalham juntos para criar uma API mais expressiva.

```jsx
function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  
  return (
    <button 
      className={`tab ${activeIndex === index ? 'active' : ''}`}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ index, children }) {
  const { activeIndex } = useContext(TabsContext);
  
  if (activeIndex !== index) return null;
  return <div className="tab-panel">{children}</div>;
}

// Uso:
<Tabs>
  <TabList>
    <Tab index={0}>Aba 1</Tab>
    <Tab index={1}>Aba 2</Tab>
    <Tab index={2}>Aba 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel index={0}>Conteúdo da Aba 1</TabPanel>
    <TabPanel index={1}>Conteúdo da Aba 2</TabPanel>
    <TabPanel index={2}>Conteúdo da Aba 3</TabPanel>
  </TabPanels>
</Tabs>
```

## Boas Práticas para Componentes

Para criar componentes React eficientes e de fácil manutenção:

1. **Mantenha componentes pequenos e focados**: Cada componente deve ter uma única responsabilidade.

2. **Use nomes descritivos**: Nomes de componentes devem indicar claramente sua função.

3. **Extraia lógica complexa**: Use hooks customizados para compartilhar lógica entre componentes.

4. **Evite estado desnecessário**: Use props quando possível, e mantenha o estado no nível mais alto necessário.

5. **Documente seus componentes**: Adicione comentários ou use ferramentas como PropTypes ou TypeScript para documentar as props esperadas.

6. **Teste seus componentes**: Escreva testes unitários para garantir que seus componentes funcionem como esperado.

7. **Otimize renderizações**: Use React.memo, useCallback e useMemo para evitar renderizações desnecessárias.

8. **Siga convenções de nomenclatura**:
   - Componentes começam com letra maiúscula: `Button`, `UserProfile`
   - Props usam camelCase: `onClick`, `userName`
   - Eventos começam com "on" seguido por um verbo: `onClick`, `onSubmit`

Os componentes são o fundamento do desenvolvimento em React, e dominar sua criação e composição é essencial para construir aplicações React eficientes e escaláveis.
