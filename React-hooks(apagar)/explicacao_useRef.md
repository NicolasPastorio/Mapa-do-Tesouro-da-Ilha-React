# useRef no React

O Hook `useRef` é uma ferramenta poderosa no React que permite criar uma referência mutável que persiste durante todo o ciclo de vida do componente. Diferente do estado, atualizar uma ref não causa uma nova renderização do componente.

## Conceito Básico

O `useRef` retorna um objeto mutável com uma propriedade `.current` que pode armazenar qualquer valor. Este objeto permanece o mesmo entre renderizações, e modificar sua propriedade `.current` não causa uma re-renderização do componente.

Existem dois casos de uso principais para `useRef`:

1. **Acessar elementos DOM diretamente**: Criar uma referência para um elemento DOM para manipulá-lo imperativamente
2. **Armazenar valores mutáveis**: Manter valores que podem mudar mas não devem causar re-renderizações

## Sintaxe Básica

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

## Acessando Elementos DOM

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

Neste exemplo:
1. Criamos uma ref com `useRef(null)`
2. Atribuímos essa ref ao elemento input usando o atributo `ref`
3. Quando o botão é clicado, acessamos o elemento DOM real através de `inputRef.current` e chamamos o método `focus()`

## Armazenando Valores Mutáveis

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

Neste exemplo, usamos `useRef` para armazenar o ID do intervalo. Isso é ideal porque:
1. O ID do intervalo não é usado para renderização
2. Precisamos acessar e modificar o ID entre renderizações
3. Mudanças no ID não devem causar re-renderizações

## useRef vs. useState

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

## Casos de Uso Comuns

### 1. Manipulação de Foco

```jsx
function FormularioAcessivel() {
  const nomeInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const senhaInputRef = useRef(null);
  const enviarBotaoRef = useRef(null);
  
  const handleNomeKeyDown = (e) => {
    if (e.key === 'Enter') {
      emailInputRef.current.focus();
    }
  };
  
  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter') {
      senhaInputRef.current.focus();
    }
  };
  
  const handleSenhaKeyDown = (e) => {
    if (e.key === 'Enter') {
      enviarBotaoRef.current.focus();
    }
  };
  
  useEffect(() => {
    // Foca no primeiro input quando o componente monta
    nomeInputRef.current.focus();
  }, []);
  
  return (
    <form>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          ref={nomeInputRef}
          onKeyDown={handleNomeKeyDown}
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          ref={emailInputRef}
          onKeyDown={handleEmailKeyDown}
        />
      </div>
      
      <div>
        <label htmlFor="senha">Senha:</label>
        <input
          id="senha"
          type="password"
          ref={senhaInputRef}
          onKeyDown={handleSenhaKeyDown}
        />
      </div>
      
      <button type="submit" ref={enviarBotaoRef}>
        Enviar
      </button>
    </form>
  );
}
```

### 2. Medição de Elementos DOM

```jsx
function MedidorElemento() {
  const elementoRef = useRef(null);
  const [dimensoes, setDimensoes] = useState({ largura: 0, altura: 0 });
  
  const medirElemento = () => {
    if (elementoRef.current) {
      const { offsetWidth, offsetHeight } = elementoRef.current;
      setDimensoes({
        largura: offsetWidth,
        altura: offsetHeight
      });
    }
  };
  
  // Medir quando o componente montar
  useEffect(() => {
    medirElemento();
    
    // Adicionar listener de redimensionamento
    window.addEventListener('resize', medirElemento);
    
    return () => {
      window.removeEventListener('resize', medirElemento);
    };
  }, []);
  
  return (
    <div>
      <div
        ref={elementoRef}
        style={{
          width: '50%',
          padding: '20px',
          backgroundColor: 'lightblue',
          border: '2px solid navy'
        }}
      >
        Este elemento está sendo medido
      </div>
      
      <p>Dimensões: {dimensoes.largura}px x {dimensoes.altura}px</p>
      <button onClick={medirElemento}>Medir Novamente</button>
    </div>
  );
}
```

### 3. Integração com Bibliotecas Externas

```jsx
function MapaInterativo() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  
  useEffect(() => {
    // Inicializar o mapa quando o componente montar
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Exemplo com biblioteca fictícia de mapas
      mapInstanceRef.current = new MapLibrary.Map(mapContainerRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2
      });
      
      // Adicionar marcadores, camadas, etc.
      const marker = new MapLibrary.Marker({
        position: { lat: 0, lng: 0 },
        title: 'Centro do mapa'
      });
      
      marker.setMap(mapInstanceRef.current);
    }
    
    // Limpar quando o componente desmontar
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);
  
  const moverParaBrasil = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: -14.235, lng: -51.925 });
      mapInstanceRef.current.setZoom(4);
    }
  };
  
  const moverParaJapao = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: 36.204, lng: 138.252 });
      mapInstanceRef.current.setZoom(5);
    }
  };
  
  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '400px' }}
      />
      
      <div>
        <button onClick={moverParaBrasil}>Ver Brasil</button>
        <button onClick={moverParaJapao}>Ver Japão</button>
      </div>
    </div>
  );
}
```

### 4. Rastreamento de Valores Anteriores

```jsx
function UsarValorAnterior(valor) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = valor;
  }, [valor]);
  
  return ref.current; // Retorna o valor da renderização anterior
}

function MonitorDePreco({ preco }) {
  const precoAnterior = UsarValorAnterior(preco);
  
  const diferencaPreco = preco - (precoAnterior || 0);
  const aumentou = diferencaPreco > 0;
  const diminuiu = diferencaPreco < 0;
  
  return (
    <div>
      <p>Preço atual: R$ {preco.toFixed(2)}</p>
      
      {precoAnterior !== undefined && (
        <>
          <p>Preço anterior: R$ {precoAnterior.toFixed(2)}</p>
          
          {aumentou && (
            <p style={{ color: 'red' }}>
              O preço aumentou R$ {diferencaPreco.toFixed(2)}
            </p>
          )}
          
          {diminuiu && (
            <p style={{ color: 'green' }}>
              O preço diminuiu R$ {Math.abs(diferencaPreco).toFixed(2)}
            </p>
          )}
          
          {!aumentou && !diminuiu && (
            <p>O preço não mudou</p>
          )}
        </>
      )}
    </div>
  );
}
```

### 5. Gerenciamento de Temporizadores e Intervalos

```jsx
function Temporizador() {
  const [segundos, setSegundos] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const [pausado, setPausado] = useState(false);
  
  // Armazenar o ID do intervalo em uma ref
  const intervaloRef = useRef(null);
  
  // Iniciar o temporizador
  const iniciar = () => {
    if (!ativo) {
      setAtivo(true);
      setPausado(false);
      
      intervaloRef.current = setInterval(() => {
        setSegundos(s => s + 1);
      }, 1000);
    }
  };
  
  // Pausar o temporizador
  const pausar = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
      setPausado(true);
    }
  };
  
  // Continuar o temporizador
  const continuar = () => {
    if (ativo && pausado) {
      setPausado(false);
      
      intervaloRef.current = setInterval(() => {
        setSegundos(s => s + 1);
      }, 1000);
    }
  };
  
  // Resetar o temporizador
  const resetar = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    
    setAtivo(false);
    setPausado(false);
    setSegundos(0);
  };
  
  // Limpar o intervalo quando o componente desmontar
  useEffect(() => {
    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, []);
  
  // Formatar segundos para MM:SS
  const formatarTempo = (totalSegundos) => {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  };
  
  return (
    <div>
      <h2>Temporizador</h2>
      <div className="tempo">{formatarTempo(segundos)}</div>
      
      <div className="controles">
        {!ativo && (
          <button onClick={iniciar}>Iniciar</button>
        )}
        
        {ativo && !pausado && (
          <button onClick={pausar}>Pausar</button>
        )}
        
        {ativo && pausado && (
          <button onClick={continuar}>Continuar</button>
        )}
        
        <button onClick={resetar}>Resetar</button>
      </div>
    </div>
  );
}
```

## Técnicas Avançadas

### 1. Encaminhamento de Refs (forwardRef)

Quando você cria componentes personalizados, às vezes precisa expor uma ref para um elemento DOM interno. Isso é feito com `forwardRef`:

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

// Componente de input personalizado que encaminha a ref
const InputPersonalizado = forwardRef((props, ref) => {
  return (
    <div className="input-container">
      <input ref={ref} {...props} className="input-estilizado" />
    </div>
  );
});

// Componente que expõe métodos personalizados via ref
const CampoFormulario = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  // Expõe apenas os métodos que queremos
  useImperativeHandle(ref, () => ({
    focar: () => {
      inputRef.current.focus();
    },
    limpar: () => {
      inputRef.current.value = '';
    },
    validar: () => {
      return inputRef.current.value.length > 0;
    }
  }));
  
  return (
    <div>
      <label>{props.label}</label>
      <input ref={inputRef} {...props} />
    </div>
  );
});

// Uso dos componentes
function Formulario() {
  const inputRef = useRef(null);
  const campoNomeRef = useRef(null);
  
  const focarInput = () => {
    inputRef.current.focus();
  };
  
  const focarELimparCampo = () => {
    campoNomeRef.current.focar();
    campoNomeRef.current.limpar();
  };
  
  const validarCampo = () => {
    const valido = campoNomeRef.current.validar();
    alert(valido ? 'Campo válido!' : 'Campo inválido!');
  };
  
  return (
    <form>
      <InputPersonalizado
        ref={inputRef}
        type="text"
        placeholder="Input com ref encaminhada"
      />
      <button type="button" onClick={focarInput}>
        Focar no input
      </button>
      
      <CampoFormulario
        ref={campoNomeRef}
        label="Nome"
        placeholder="Digite seu nome"
      />
      <div>
        <button type="button" onClick={focarELimparCampo}>
          Focar e Limpar
        </button>
        <button type="button" onClick={validarCampo}>
          Validar
        </button>
      </div>
    </form>
  );
}
```

### 2. Refs Callback

Além de usar `useRef`, você pode usar uma função de callback para a prop `ref`, o que dá mais controle sobre quando e como a ref é atribuída:

```jsx
function ListaComRefs() {
  const [itens, setItens] = useState(['Item 1', 'Item 2', 'Item 3']);
  // Objeto para armazenar múltiplas refs
  const itemsRef = useRef({});
  
  // Função de callback para ref
  const setItemRef = (elemento, index) => {
    if (elemento) {
      itemsRef.current[index] = elemento;
    } else {
      // Elemento foi desmontado
      delete itemsRef.current[index];
    }
  };
  
  const destacarItem = (index) => {
    // Resetar todos os itens
    Object.values(itemsRef.current).forEach(elemento => {
      elemento.style.backgroundColor = '';
      elemento.style.fontWeight = 'normal';
    });
    
    // Destacar o item selecionado
    if (itemsRef.current[index]) {
      itemsRef.current[index].style.backgroundColor = 'yellow';
      itemsRef.current[index].style.fontWeight = 'bold';
    }
  };
  
  const adicionarItem = () => {
    setItens(prev => [...prev, `Item ${prev.length + 1}`]);
  };
  
  return (
    <div>
      <ul>
        {itens.map((item, index) => (
          <li
            key={index}
            ref={(el) => setItemRef(el, index)}
            onClick={() => destacarItem(index)}
          >
            {item}
          </li>
        ))}
      </ul>
      
      <button onClick={adicionarItem}>Adicionar Item</button>
      <div>
        <p>Clique em um item para destacá-lo</p>
      </div>
 
(Content truncated due to size limit. Use line ranges to read in chunks)