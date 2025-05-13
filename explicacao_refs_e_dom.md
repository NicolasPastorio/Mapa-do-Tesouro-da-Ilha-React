# Refs e DOM no React

As Refs (referências) no React fornecem uma maneira de acessar nós DOM ou elementos React criados no método render. Elas oferecem uma "saída de emergência" do fluxo de dados unidirecional típico do React, permitindo manipulação direta de elementos quando necessário.

## O Fluxo de Dados no React e Por Que Precisamos de Refs

No paradigma normal do React, os componentes pais interagem com seus filhos apenas através de props. Para modificar um componente filho, você o re-renderiza com novas props. Este fluxo de dados unidirecional torna as aplicações mais previsíveis e mais fáceis de entender.

No entanto, há situações em que você precisa modificar imperativamente um filho fora desse fluxo de dados. O filho pode ser:
- Um elemento DOM nativo (como um input, video, etc.)
- Uma instância de um componente de classe React

Para esses casos, o React fornece as refs como uma "saída de emergência".

## Quando Usar Refs

As refs devem ser usadas com moderação. Aqui estão os casos de uso apropriados:

1. **Gerenciamento de foco, seleção de texto ou reprodução de mídia**
   - Focar automaticamente em um campo após um evento
   - Selecionar texto em um input
   - Controlar reprodução de áudio/vídeo

2. **Acionamento de animações imperativas**
   - Iniciar/pausar animações que não são facilmente controladas declarativamente

3. **Integração com bibliotecas DOM de terceiros**
   - Quando você precisa interagir com uma biblioteca que espera acesso direto ao DOM

4. **Medições de elementos DOM**
   - Obter dimensões ou posição de elementos

## Criando e Acessando Refs

### Criando Refs em Componentes de Classe

Em componentes de classe, você pode criar refs usando `React.createRef()`:

```jsx
class MeuComponente extends React.Component {
  constructor(props) {
    super(props);
    // Cria uma ref para armazenar o elemento input
    this.inputRef = React.createRef();
  }
  
  componentDidMount() {
    // Foca o input quando o componente montar
    this.inputRef.current.focus();
  }
  
  render() {
    return <input ref={this.inputRef} />;
  }
}
```

### Criando Refs em Componentes Funcionais com useRef

Em componentes funcionais, você pode usar o hook `useRef`:

```jsx
import React, { useRef, useEffect } from 'react';

function MeuComponente() {
  // Cria uma ref para armazenar o elemento input
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Foca o input quando o componente montar
    inputRef.current.focus();
  }, []); // Array vazio significa que este efeito roda apenas uma vez após a montagem
  
  return <input ref={inputRef} />;
}
```

### Acessando o Valor da Ref

Independentemente de como você cria uma ref, você acessa o nó referenciado através da propriedade `current` da ref:

```jsx
const node = this.myRef.current; // Em componentes de classe
// ou
const node = myRef.current; // Em componentes funcionais
```

O valor de `current` depende do tipo de nó:
- Para um elemento HTML, `current` será o elemento DOM subjacente
- Para um componente de classe, `current` será a instância montada do componente
- Para um componente funcional, você não pode usar uma ref diretamente (a menos que use `forwardRef`)

## Exemplos Práticos de Uso de Refs

### 1. Focando um Input

Um caso de uso comum é focar automaticamente um campo de entrada quando um componente é montado:

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Foca o input automaticamente quando o componente montar
    inputRef.current.focus();
  }, []);
  
  return (
    <div>
      <input ref={inputRef} placeholder="Este input será focado automaticamente" />
    </div>
  );
}
```

### 2. Controlando Reprodução de Vídeo

As refs são úteis para controlar elementos de mídia:

```jsx
function VideoPlayer() {
  const videoRef = useRef(null);
  
  const handlePlay = () => {
    videoRef.current.play();
  };
  
  const handlePause = () => {
    videoRef.current.pause();
  };
  
  return (
    <div>
      <video 
        ref={videoRef}
        src="https://exemplo.com/video.mp4"
        width="300"
      />
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
}
```

### 3. Medindo Dimensões de Elementos

As refs permitem medir elementos DOM:

```jsx
function MedidorDeElemento() {
  const elementRef = useRef(null);
  const [dimensoes, setDimensoes] = useState({ largura: 0, altura: 0 });
  
  useEffect(() => {
    if (elementRef.current) {
      const { offsetWidth, offsetHeight } = elementRef.current;
      setDimensoes({
        largura: offsetWidth,
        altura: offsetHeight
      });
    }
  }, []);
  
  return (
    <div>
      <div 
        ref={elementRef}
        style={{ width: '100px', height: '100px', background: 'red' }}
      >
        Elemento a ser medido
      </div>
      <p>Largura: {dimensoes.largura}px, Altura: {dimensoes.altura}px</p>
    </div>
  );
}
```

### 4. Integrando com Bibliotecas de Terceiros

As refs são essenciais para integrar bibliotecas DOM de terceiros:

```jsx
function MapaComLeaflet() {
  const mapContainerRef = useRef(null);
  const [mapa, setMapa] = useState(null);
  
  useEffect(() => {
    if (mapContainerRef.current && !mapa) {
      // Inicializa o mapa Leaflet no elemento DOM referenciado
      const novoMapa = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(novoMapa);
      
      setMapa(novoMapa);
    }
    
    // Limpa o mapa quando o componente desmontar
    return () => {
      if (mapa) {
        mapa.remove();
      }
    };
  }, [mapa]);
  
  return <div ref={mapContainerRef} style={{ height: '400px' }} />;
}
```

## Refs Callback

Além de `createRef` e `useRef`, o React oferece uma abordagem mais flexível chamada "refs callback". Em vez de passar um objeto ref, você passa uma função:

```jsx
function MedidasDinamicas() {
  const [altura, setAltura] = useState(0);
  
  // Esta função será chamada quando o elemento for montado ou atualizado
  const medirAltura = elemento => {
    if (elemento) {
      setAltura(elemento.getBoundingClientRect().height);
    }
  };
  
  return (
    <div>
      <div
        ref={medirAltura}
        style={{ 
          border: '1px solid black',
          padding: '20px',
          maxWidth: '300px'
        }}
      >
        Este elemento terá sua altura medida dinamicamente.
        <br />
        Adicione mais conteúdo para ver a altura mudar.
      </div>
      <p>Altura atual: {altura}px</p>
    </div>
  );
}
```

As refs callback são chamadas com o elemento DOM quando ele é montado, e com `null` quando é desmontado. Isso permite reagir a essas mudanças de ciclo de vida.

## Encaminhamento de Refs (Ref Forwarding)

Por padrão, você não pode usar uma ref para acessar componentes funcionais. Isso ocorre porque componentes funcionais não têm instâncias.

No entanto, às vezes você precisa acessar um elemento DOM dentro de um componente funcional a partir de um componente pai. Para isso, o React fornece `forwardRef`:

```jsx
// Componente que encaminha a ref para seu input interno
const InputComFoco = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Componente pai que usa a ref encaminhada
function FormularioComFoco() {
  const inputRef = useRef(null);
  
  const focarInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <InputComFoco ref={inputRef} placeholder="Input com ref encaminhada" />
      <button onClick={focarInput}>Focar Input</button>
    </div>
  );
}
```

O encaminhamento de refs é particularmente útil ao criar bibliotecas de componentes reutilizáveis.

## useImperativeHandle para Personalizar Refs

Às vezes, você pode querer expor apenas certas funcionalidades através de uma ref, em vez de expor todo o elemento DOM. Para isso, você pode usar `useImperativeHandle` junto com `forwardRef`:

```jsx
const InputComMetodosPersonalizados = React.forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  // Expõe apenas os métodos que você quer tornar públicos
  React.useImperativeHandle(ref, () => ({
    focar: () => {
      inputRef.current.focus();
    },
    limpar: () => {
      inputRef.current.value = '';
    },
    definirValor: (valor) => {
      inputRef.current.value = valor;
    }
  }));
  
  return <input ref={inputRef} {...props} />;
});

// Uso do componente com métodos personalizados
function FormularioAvancado() {
  const inputRef = useRef(null);
  
  const handleFocar = () => {
    inputRef.current.focar();
  };
  
  const handleLimpar = () => {
    inputRef.current.limpar();
  };
  
  const handleDefinirValor = () => {
    inputRef.current.definirValor('Valor predefinido');
  };
  
  return (
    <div>
      <InputComMetodosPersonalizados ref={inputRef} />
      <button onClick={handleFocar}>Focar</button>
      <button onClick={handleLimpar}>Limpar</button>
      <button onClick={handleDefinirValor}>Definir Valor</button>
    </div>
  );
}
```

Isso permite criar APIs imperativas mais limpas e controladas para seus componentes.

## Refs e Componentes Não Controlados

As refs são frequentemente usadas com componentes não controlados, onde o estado é gerenciado pelo DOM em vez do React:

```jsx
function FormularioNaoControlado() {
  const inputRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const nome = inputRef.current.value;
    alert(`Nome enviado: ${nome}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" ref={inputRef} defaultValue="Nome inicial" />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

Em componentes não controlados, você usa `defaultValue` em vez de `value` e acessa o valor atual através da ref quando necessário.

## Refs e o Ciclo de Vida do Componente

É importante entender como as refs interagem com o ciclo de vida do componente:

- As refs são definidas quando o componente é montado
- As refs são atualizadas quando o componente é atualizado
- As refs são definidas como `null` quando o componente é desmontado

As atualizações de ref acontecem antes dos métodos de ciclo de vida `componentDidMount` ou `componentDidUpdate`.

## Armadilhas Comuns e Boas Práticas

### 1. Não Use Refs para Tudo

Evite usar refs para algo que pode ser feito declarativamente:

```jsx
// Ruim: Usando ref para atualizar conteúdo
function ComponenteRuim() {
  const divRef = useRef(null);
  
  const atualizarConteudo = () => {
    divRef.current.textContent = 'Novo conteúdo';
  };
  
  return (
    <div>
      <div ref={divRef}>Conteúdo inicial</div>
      <button onClick={atualizarConteudo}>Atualizar</button>
    </div>
  );
}

// Bom: Usando estado para atualizar conteúdo
function ComponenteBom() {
  const [conteudo, setConteudo] = useState('Conteúdo inicial');
  
  return (
    <div>
      <div>{conteudo}</div>
      <button onClick={() => setConteudo('Novo conteúdo')}>Atualizar</button>
    </div>
  );
}
```

### 2. Não Modifique Componentes Filhos Diretamente

Evite modificar diretamente o estado ou props de componentes filhos através de refs:

```jsx
// Ruim: Modificando estado do filho diretamente
class ComponentePai extends React.Component {
  constructor(props) {
    super(props);
    this.filhoRef = React.createRef();
  }
  
  modificarFilho = () => {
    // Isso quebra o fluxo de dados unidirecional do React
    this.filhoRef.current.setState({ valor: 'Novo valor' });
  };
  
  render() {
    return (
      <div>
        <ComponenteFilho ref={this.filhoRef} />
        <button onClick={this.modificarFilho}>Modificar Filho</button>
      </div>
    );
  }
}

// Bom: Passando props para controlar o filho
function ComponentePai() {
  const [valorFilho, setValorFilho] = useState('Valor inicial');
  
  return (
    <div>
      <ComponenteFilho valor={valorFilho} />
      <button onClick={() => setValorFilho('Novo valor')}>Modificar Filho</button>
    </div>
  );
}
```

### 3. Verifique se a Ref Existe Antes de Usá-la

Sempre verifique se `ref.current` existe antes de acessá-la, especialmente em efeitos:

```jsx
useEffect(() => {
  // Bom: Verifica se a ref existe antes de usá-la
  if (myRef.current) {
    myRef.current.focus();
  }
}, []);
```

### 4. Limpeza Adequada em useEffect

Certifique-se de limpar adequadamente quaisquer manipulações baseadas em ref em um efeito:

```jsx
useEffect(() => {
  const elemento = elementoRef.current;
  
  if (elemento) {
    // Configurar
    const observer = new ResizeObserver(() => {
      // Lógica de observação
    });
    
    observer.observe(elemento);
    
    // Limpar
    return () => {
      observer.unobserve(elemento);
    };
  }
}, []);
```

## Refs e Testes

Testar componentes que usam refs pode ser desafiador. Aqui estão algumas estratégias:

### 1. Teste o Comportamento, Não a Implementação

Foque em testar o comportamento observável do componente, não os detalhes de implementação com refs:

```jsx
// Componente
function InputComBotaoLimpar() {
  const inputRef = useRef(null);
  
  const limpar = () => {
    inputRef.current.value = '';
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} data-testid="input" />
      <button onClick={limpar} data-testid="botao-limpar">Limpar</button>
    </div>
  );
}

// Teste (usando React Testing Library)
test('limpa o input quando o botão é clicado', () => {
  render(<InputComBotaoLimpar />);
  
  const input = screen.getByTestId('input');
  const botao = screen.getByTestId('botao-limpar');
  
  // Preenche o input
  fireEvent.change(input, { target: { value: 'Texto de teste' } });
  expect(input.value).toBe('Texto de teste');
  
  // Clica no botão de limpar
  fireEvent.click(botao);
  
  // Verifica se o input foi limpo
  expect(input.value).toBe('');
  
  // Verifica se o input está focado
  expect(document.activeElement).toBe(input);
});
```

### 2. Mock de Refs para Testes Unitários

Em alguns casos, você pode precisar simular (mock) refs para testes unitários:

```jsx
// Mock de useRef
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useRef: jest.fn().mockImplementation(() => ({
      current: {
        focus: jest.fn(),
        value: ''
      }
    }))
  };
});
```

## Refs vs Estado

É importante entender quando usar refs versus estado:

| Característica | Refs | Estado |
|----------------|------|--------|
| Causa re-renderização | Não | Sim |
| Pode ser usado para valores que não afetam a saída visual | Sim | Não |
| Pode ser modificado diretamente | Sim | Não |
| Persiste entre renderizações | Sim | Sim |
| Pode armazenar objetos mutáveis | Sim | Não (deve ser imutável) |
| Acessível em manipuladores de eventos | Sim | Sim |

Use refs quando:
- Você precisa acessar elementos DOM diretamente
- Você precisa armazenar um valor que não afeta a renderização
- Você precisa armazenar objetos mutáveis

Use estado quando:
- O valor afeta o que é renderizado na UI
- Você precisa que as mudanças no valor causem re-renderização
- Você precisa que o valor seja passado como props para componentes filhos

## Conclusão

As refs no React fornecem uma maneira poderosa de acessar e manipular elementos DOM e componentes de classe diretamente. Embora devam ser usadas com moderação, elas são essenciais para casos onde o modelo declarativo do React não é suficiente.

Principais pontos a lembrar:

1. Use refs principalmente para acessar o DOM quando necessário, não para gerenciar o fluxo de dados da aplicação.
2. Em componentes de classe, crie refs com `React.createRef()`.
3. Em componentes funcionais, use o hook `useRef()`.
4. Acesse o valor da ref através da propriedade `current`.
5. Use `forwardRef` para passar refs através de componentes funciona
(Content truncated due to size limit. Use line ranges to read in chunks)