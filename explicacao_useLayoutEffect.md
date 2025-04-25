# useLayoutEffect

## Introdução

O hook `useLayoutEffect` é uma variante do `useEffect` que é executada de forma síncrona imediatamente após as mutações do DOM, mas antes que o navegador tenha a chance de pintar essas mudanças na tela. Este hook é especialmente útil quando você precisa realizar medições do DOM ou modificações que devem ser calculadas e aplicadas antes que o usuário veja qualquer atualização visual.

## Sintaxe Básica

```jsx
import { useLayoutEffect } from 'react';

function MeuComponente() {
  useLayoutEffect(() => {
    // Código que será executado após as mutações do DOM
    // mas antes que o navegador pinte a tela
    
    return () => {
      // Função de limpeza opcional
    };
  }, [/* dependências */]);
  
  return <div>Conteúdo</div>;
}
```

## Diferença entre useLayoutEffect e useEffect

A principal diferença entre `useLayoutEffect` e `useEffect` está no momento da execução:

1. **useLayoutEffect**: Executa de forma síncrona imediatamente após as mutações do DOM, mas antes que o navegador pinte a tela.
2. **useEffect**: Executa de forma assíncrona após o navegador ter pintado a tela.

Visualmente, a sequência de eventos é:

```
Renderização do React → Mutações do DOM → useLayoutEffect → Pintura do navegador → useEffect
```

## Parâmetros

O hook `useLayoutEffect` aceita dois parâmetros:

1. **setup**: Uma função que contém o código do efeito. Esta função pode opcionalmente retornar uma função de limpeza.
2. **dependencies** (opcional): Um array de dependências. O efeito será executado novamente se qualquer valor neste array mudar entre renderizações.

## Casos de Uso

### 1. Medições de Layout

O caso de uso mais comum para `useLayoutEffect` é quando você precisa medir elementos do DOM antes que o navegador pinte a tela:

```jsx
function Tooltip() {
  const tooltipRef = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  
  useLayoutEffect(() => {
    // Mede a altura real do tooltip após ele ser renderizado no DOM
    const { height } = tooltipRef.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
  
  // Usa tooltipHeight para posicionar o tooltip corretamente
  const tooltipStyle = {
    position: 'absolute',
    top: `-${tooltipHeight}px`,
    // outros estilos...
  };
  
  return (
    <div ref={tooltipRef} style={tooltipStyle}>
      Conteúdo do tooltip
    </div>
  );
}
```

Neste exemplo, o `useLayoutEffect` permite que você:
1. Renderize o tooltip inicialmente (possivelmente em uma posição incorreta)
2. Meça sua altura real
3. Atualize o estado para reposicionar o tooltip
4. Tudo isso antes que o navegador pinte qualquer coisa na tela

Isso evita que o usuário veja o tooltip "pulando" para sua posição correta, o que aconteceria se você usasse `useEffect`.

### 2. Animações Síncronas

Quando você precisa iniciar uma animação imediatamente após uma mudança no DOM:

```jsx
function AnimacaoEntrada({ children }) {
  const elementoRef = useRef(null);
  
  useLayoutEffect(() => {
    const elemento = elementoRef.current;
    
    // Configura o estado inicial da animação
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(20px)';
    
    // Força um reflow para que as propriedades iniciais sejam aplicadas
    elemento.getBoundingClientRect();
    
    // Configura a transição e o estado final
    elemento.style.transition = 'opacity 500ms, transform 500ms';
    elemento.style.opacity = '1';
    elemento.style.transform = 'translateY(0)';
    
    return () => {
      elemento.style.transition = '';
    };
  }, []);
  
  return <div ref={elementoRef}>{children}</div>;
}
```

Usando `useLayoutEffect`, você garante que o elemento comece com opacidade 0 e depois anime para opacidade 1, sem que o usuário veja o estado intermediário.

### 3. Prevenção de Flickering

Quando você precisa atualizar o DOM para evitar efeitos visuais indesejados:

```jsx
function AjusteAutomatico() {
  const [largura, setLargura] = useState('auto');
  const elementoRef = useRef(null);
  
  useLayoutEffect(() => {
    // Ajusta a largura para evitar quebra de linha
    if (elementoRef.current) {
      const larguraCalculada = elementoRef.current.scrollWidth;
      setLargura(`${larguraCalculada}px`);
    }
  }, []);
  
  return (
    <div 
      ref={elementoRef} 
      style={{ width: largura, whiteSpace: 'nowrap' }}
    >
      Texto que não deve quebrar linha
    </div>
  );
}
```

## Considerações de Performance

### Impacto no Desempenho

Como o `useLayoutEffect` é executado de forma síncrona e bloqueia a pintura do navegador, seu uso excessivo pode afetar negativamente o desempenho da aplicação. A documentação oficial do React recomenda usar `useEffect` sempre que possível, reservando `useLayoutEffect` apenas para casos onde é realmente necessário.

```jsx
// ❌ Não use useLayoutEffect para operações que poderiam ser assíncronas
useLayoutEffect(() => {
  fetchDados(); // Operação potencialmente lenta
}, []);

// ✅ Use useEffect para a maioria dos casos
useEffect(() => {
  fetchDados();
}, []);
```

### Quando Usar useLayoutEffect vs useEffect

Use `useLayoutEffect` quando:
- Você precisa medir elementos do DOM antes da pintura
- Você precisa posicionar elementos com base em medições do DOM
- Você precisa evitar flickering ou saltos visuais
- Você precisa sincronizar animações com mudanças no DOM

Use `useEffect` para todos os outros casos, especialmente:
- Busca de dados
- Configuração de event listeners
- Manipulação de timers
- Qualquer operação que não precise ser concluída antes da pintura

## Comportamento no Servidor

O `useLayoutEffect` não funciona durante a renderização no servidor (SSR), pois não há DOM para medir ou manipular. Se você tentar usar `useLayoutEffect` em um componente que é renderizado no servidor, o React emitirá um aviso:

```
Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client.
```

Para resolver este problema, você pode:

1. **Usar useEffect quando possível**: Se a medição ou manipulação do DOM não precisa acontecer antes da pintura, use `useEffect`.

2. **Renderizar o componente apenas no cliente**: Use técnicas como renderização condicional ou dynamic imports para garantir que o componente só seja renderizado no cliente.

```jsx
// Exemplo com renderização condicional
function ComponenteComMedicao() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <Placeholder />; // Um componente substituto durante SSR
  }
  
  return (
    <ComponenteQueUsaLayoutEffect />
  );
}
```

3. **Usar useEffect com um flag**: Combine `useEffect` e `useLayoutEffect` para obter o melhor dos dois mundos.

```jsx
function ComponenteHibrido() {
  const [medidas, setMedidas] = useState(null);
  const ref = useRef(null);
  
  // Este useEffect roda tanto no servidor quanto no cliente
  useEffect(() => {
    // Este useLayoutEffect só roda no cliente
    // e antes da pintura do navegador
    const timeout = setTimeout(() => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setMedidas({ width, height });
      }
    }, 0);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return <div ref={ref}>Conteúdo</div>;
}
```

## Exemplos Práticos

### Exemplo 1: Tooltip Posicionado Dinamicamente

```jsx
import { useState, useRef, useLayoutEffect } from 'react';

function Tooltip({ texto, posicaoAlvo }) {
  const tooltipRef = useRef(null);
  const [posicao, setPosicao] = useState({ top: 0, left: 0 });
  const [dimensoes, setDimensoes] = useState({ largura: 0, altura: 0 });
  
  useLayoutEffect(() => {
    if (tooltipRef.current) {
      // Mede o tooltip
      const { width, height } = tooltipRef.current.getBoundingClientRect();
      setDimensoes({ largura: width, altura: height });
      
      // Calcula a melhor posição
      let top, left;
      
      // Tenta posicionar acima do alvo
      if (posicaoAlvo.top > height + 10) {
        top = posicaoAlvo.top - height - 10;
      } else {
        // Senão, posiciona abaixo
        top = posicaoAlvo.top + posicaoAlvo.altura + 10;
      }
      
      // Centraliza horizontalmente
      left = posicaoAlvo.left + (posicaoAlvo.largura / 2) - (width / 2);
      
      // Garante que não saia da tela
      if (left < 10) left = 10;
      if (left + width > window.innerWidth - 10) {
        left = window.innerWidth - width - 10;
      }
      
      setPosicao({ top, left });
    }
  }, [posicaoAlvo]);
  
  return (
    <div 
      ref={tooltipRef}
      className="tooltip"
      style={{
        position: 'absolute',
        top: `${posicao.top}px`,
        left: `${posicao.left}px`,
        opacity: dimensoes.largura ? 1 : 0, // Só mostra quando medido
      }}
    >
      {texto}
    </div>
  );
}
```

### Exemplo 2: Animação de Acordeão

```jsx
import { useState, useRef, useLayoutEffect } from 'react';

function Acordeao({ titulo, children }) {
  const [aberto, setAberto] = useState(false);
  const conteudoRef = useRef(null);
  const [altura, setAltura] = useState(0);
  
  useLayoutEffect(() => {
    if (conteudoRef.current) {
      const alturaReal = aberto ? conteudoRef.current.scrollHeight : 0;
      setAltura(alturaReal);
    }
  }, [aberto]);
  
  return (
    <div className="acordeao">
      <button 
        className="acordeao-titulo"
        onClick={() => setAberto(!aberto)}
      >
        {titulo} {aberto ? '▲' : '▼'}
      </button>
      <div 
        ref={conteudoRef}
        className="acordeao-conteudo"
        style={{
          height: `${altura}px`,
          overflow: 'hidden',
          transition: 'height 300ms ease-in-out',
        }}
      >
        <div className="acordeao-conteudo-interno">
          {children}
        </div>
      </div>
    </div>
  );
}
```

### Exemplo 3: Redimensionamento de Textarea

```jsx
import { useState, useRef, useLayoutEffect } from 'react';

function TextareaAutoResize({ value, onChange }) {
  const textareaRef = useRef(null);
  
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reseta a altura para calcular o tamanho correto
      textarea.style.height = 'auto';
      // Define a altura com base no conteúdo
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);
  
  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{
        minHeight: '40px',
        resize: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
```

## Boas Práticas

### 1. Mantenha o Código Leve

Como `useLayoutEffect` bloqueia a renderização, mantenha o código dentro dele o mais leve possível:

```jsx
// ❌ Código pesado que bloqueia a renderização
useLayoutEffect(() => {
  // Operações complexas ou demoradas
  for (let i = 0; i < 10000; i++) {
    // Processamento intensivo
  }
  
  setEstado(novoValor);
}, []);

// ✅ Apenas o necessário antes da renderização
useLayoutEffect(() => {
  // Apenas medições e atualizações críticas
  const { height } = ref.current.getBoundingClientRect();
  setAltura(height);
}, []);
```

### 2. Use Corretamente o Array de Dependências

Assim como com `useEffect`, é importante especificar corretamente as dependências:

```jsx
// ❌ Dependências ausentes
useLayoutEffect(() => {
  setLargura(elemento.offsetWidth * escala);
}, []); // Falta 'escala' como dependência

// ✅ Todas as dependências listadas
useLayoutEffect(() => {
  setLargura(elemento.offsetWidth * escala);
}, [escala]); // 'escala' incluída como dependência
```

### 3. Combine com useEffect Quando Apropriado

Em alguns casos, você pode dividir o trabalho entre `useLayoutEffect` e `useEffect`:

```jsx
function ComponenteOtimizado() {
  // Medições e atualizações críticas antes da renderização
  useLayoutEffect(() => {
    // Apenas o necessário para evitar flickering
    const { height } = ref.current.getBoundingClientRect();
    setAlturaInicial(height);
  }, []);
  
  // Trabalho adicional após a renderização
  useEffect(() => {
    // Operações mais pesadas que podem esperar
    calcularEstatisticas(altura);
    atualizarGrafico();
  }, [altura]);
  
  return <div ref={ref}>Conteúdo</div>;
}
```

## Limitações e Considerações

### 1. Regras dos Hooks

Como todos os hooks do React, `useLayoutEffect` está sujeito às mesmas regras:

- Só pode ser chamado no nível superior de um componente ou hook personalizado
- Não pode ser chamado dentro de loops, condições ou funções aninhadas

```jsx
// ❌ Incorreto: dentro de uma condição
if (condicao) {
  useLayoutEffect(() => {
    // ...
  }, []);
}

// ✅ Correto: no nível superior
useLayoutEffect(() => {
  if (condicao) {
    // ...
  }
}, [condicao]);
```

### 2. Modo Estrito

No Modo Estrito do React, o `useLayoutEffect` (assim como outros efeitos) será executado duas vezes em desenvolvimento para ajudar a detectar efeitos colaterais impuros. Certifique-se de que sua função de limpeza desfaça corretamente o que a função de configuração faz.

### 3. Atualizações de Estado em Cascata

Quando você atualiza o estado dentro de `useLayoutEffect`, o React executará todos os efeitos restantes imediatamente, incluindo `useEffect`. Isso pode levar a comportamentos inesperados se você não estiver ciente dessa ordem de execução.

## Hooks Personalizados com useLayoutEffect

Você pode encapsular lógicas comuns que usam `useLayoutEffect` em hooks personalizados:

### useResizeObserver

```jsx
function useResizeObserver(ref) {
  const [dimensoes, setDimensoes] = useState({ largura: 0, altura: 0 });
  
  useLayoutEffect(() => {
    if (!ref.current) return;
    
    const observarDimensoes = () => {
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensoes({ largura: width, altura: height });
    };
    
    // Observa inicialmente
    observarDimensoes();
    
    // Configura o ResizeObserver
    const resizeObserver = new ResizeObserver(observarDimensoes);
    resizeObserver.observe(ref.current);
    
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
      resizeObserver.disconnect();
    };
  }, [ref]);
  
  return dimensoes;
}
```

### useMeasure

```jsx
function useMeasure() {
  const ref = useRef(null);
  const [rect, setRect] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  
  useLayoutEffect(() => {
    if (ref.current) {
      const medirElemento = () => {
        setRect(ref.current.getBoundingClientRect());
      };
      
      medirElemento();
      
      window.addEventListener('resize', medirElemento);
      window.addEventListener('scroll', medirElemento);
      
      return () => {
        window.removeEventListener('resize', medirElemento);
        window.removeEventListener('scroll', medirElemento);
      };
    }
  }, []);
  
  return [ref, rect];
}
```

## Conclusão

O hook `useLayoutEffect` é uma ferramenta poderosa para casos específicos onde você precisa realizar medições ou modificações no DOM antes que o navegador pinte a tela. Embora seja similar ao `useEffect`, sua natureza síncrona o torna ideal para evitar flickering e garantir que certas atualizações visuais aconteçam sem que o usuário perceba estados intermediários.

No entanto, devido ao seu impacto potencial no desempenho, é importante usá-lo com moderação e apenas quando realmente necessário. Para a maioria dos efeitos colaterais em componentes React, o `useEffect` regular continua sendo a escolha recomendada.

Ao decidir entre `useLayoutEffect` e `useEffect`, pergunte-se: "O usuário notaria algum problema visual se este código fosse executado após a pintura do nave
(Content truncated due to size limit. Use line ranges to read in chunks)