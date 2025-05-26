# useImperativeHandle

## Introdução

O hook `useImperativeHandle` é uma ferramenta avançada do React que permite personalizar o valor ou as funcionalidades expostas quando um componente é acessado através de uma referência (ref). Este hook é particularmente útil quando você precisa expor uma API imperativa específica de um componente filho para seu componente pai, em vez de expor todo o elemento DOM subjacente.

## Sintaxe Básica

```jsx
import { useImperativeHandle, forwardRef, useRef } from 'react';

const MeuComponente = forwardRef((props, ref) => {
  const referenciaInterna = useRef(null);
  
  useImperativeHandle(ref, () => ({
    // Métodos e propriedades personalizados que você quer expor
    metodo1() {
      // Implementação
    },
    metodo2() {
      // Implementação
    },
    propriedade: valor
  }), [/* dependências */]);
  
  return <div ref={referenciaInterna}>Conteúdo</div>;
});
```

## Parâmetros

O hook `useImperativeHandle` aceita três parâmetros:

1. **ref**: A referência recebida do componente pai através do `forwardRef`.
2. **createHandle**: Uma função que retorna o objeto com os métodos e propriedades que você deseja expor.
3. **dependencies** (opcional): Um array de dependências, similar ao usado em `useEffect` ou `useMemo`. Se qualquer valor neste array mudar, a função `createHandle` será executada novamente.

## Propósito e Casos de Uso

### 1. Expor uma API Limitada

O principal propósito do `useImperativeHandle` é permitir que você controle precisamente quais funcionalidades de um componente filho são expostas para o componente pai. Isso é útil quando:

- Você quer esconder a complexidade interna do componente
- Você quer limitar as operações que o componente pai pode realizar
- Você quer abstrair a implementação subjacente

```jsx
const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    // Apenas expõe o método focus, não todo o elemento input
    focus() {
      inputRef.current.focus();
    }
  }));
  
  return <input ref={inputRef} {...props} />;
});

// Uso no componente pai
function Formulario() {
  const inputRef = useRef(null);
  
  const focarInput = () => {
    // Pode chamar apenas o método focus, não tem acesso a outros métodos do DOM
    inputRef.current.focus();
  };
  
  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={focarInput}>Focar no input</button>
    </div>
  );
}
```

### 2. Criar APIs Imperativas Personalizadas

Você pode criar APIs imperativas personalizadas que não existem naturalmente no DOM:

```jsx
const Carrossel = forwardRef((props, ref) => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const itens = props.itens || [];
  
  // Expõe métodos personalizados para controlar o carrossel
  useImperativeHandle(ref, () => ({
    proximo() {
      setIndiceAtual(i => (i + 1) % itens.length);
    },
    anterior() {
      setIndiceAtual(i => (i - 1 + itens.length) % itens.length);
    },
    irPara(indice) {
      setIndiceAtual(Math.max(0, Math.min(indice, itens.length - 1)));
    },
    get indiceAtual() {
      return indiceAtual;
    }
  }), [itens.length, indiceAtual]);
  
  return (
    <div className="carrossel">
      {itens[indiceAtual]}
      {/* Controles internos do carrossel */}
    </div>
  );
});

// Uso no componente pai
function App() {
  const carrosselRef = useRef(null);
  
  return (
    <div>
      <Carrossel 
        ref={carrosselRef} 
        itens={[/* itens do carrossel */]} 
      />
      <button onClick={() => carrosselRef.current.anterior()}>Anterior</button>
      <button onClick={() => carrosselRef.current.proximo()}>Próximo</button>
      <button onClick={() => carrosselRef.current.irPara(0)}>Ir para o primeiro</button>
    </div>
  );
}
```

### 3. Combinar Múltiplas Refs

Você pode usar `useImperativeHandle` para combinar funcionalidades de múltiplas refs internas:

```jsx
const MeuComponenteComposto = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const botaoRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    focarInput() {
      inputRef.current.focus();
    },
    clicarBotao() {
      botaoRef.current.click();
    },
    limparInput() {
      inputRef.current.value = '';
    }
  }));
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button ref={botaoRef}>Enviar</button>
    </div>
  );
});
```

## Integração com forwardRef

O `useImperativeHandle` é quase sempre usado em conjunto com `forwardRef`. Isso porque:

1. `forwardRef` permite que seu componente receba uma ref do componente pai
2. `useImperativeHandle` permite personalizar o que essa ref expõe

```jsx
// Sem forwardRef (não funciona corretamente)
function MeuComponente(props) {
  // ❌ Erro: props.ref não está disponível diretamente
  useImperativeHandle(props.ref, () => ({
    // ...
  }));
  
  return <div>...</div>;
}

// Com forwardRef (correto)
const MeuComponente = forwardRef((props, ref) => {
  // ✅ Correto: ref é passado como segundo parâmetro
  useImperativeHandle(ref, () => ({
    // ...
  }));
  
  return <div>...</div>;
});
```

## Considerações sobre Dependências

Assim como outros hooks do React, o `useImperativeHandle` aceita um array de dependências como terceiro parâmetro. Este array controla quando a função `createHandle` será executada novamente:

```jsx
useImperativeHandle(ref, () => ({
  valor: calculoComplexo(a, b)
}), [a, b]); // Recria o handle quando a ou b mudam
```

Se você omitir o array de dependências, a função `createHandle` será executada em cada renderização. Se você fornecer um array vazio `[]`, a função será executada apenas uma vez, durante a montagem do componente.

## Exemplo Completo: Campo de Texto com Validação

Aqui está um exemplo mais completo de um campo de texto com validação que expõe métodos personalizados:

```jsx
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';

const CampoTextoValidado = forwardRef((props, ref) => {
  const { label, validacao, ...outrosProps } = props;
  const inputRef = useRef(null);
  const [erro, setErro] = useState('');
  
  // Função de validação interna
  const validarCampo = () => {
    if (!inputRef.current) return false;
    
    const valor = inputRef.current.value;
    if (validacao) {
      const mensagemErro = validacao(valor);
      setErro(mensagemErro || '');
      return !mensagemErro;
    }
    return true;
  };
  
  // Expõe API personalizada
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    clear() {
      inputRef.current.value = '';
      setErro('');
    },
    validate() {
      return validarCampo();
    },
    get value() {
      return inputRef.current ? inputRef.current.value : '';
    },
    get isValid() {
      return !erro;
    }
  }));
  
  return (
    <div className="campo-texto">
      {label && <label>{label}</label>}
      <input 
        ref={inputRef} 
        onBlur={validarCampo}
        className={erro ? 'invalido' : ''}
        {...outrosProps} 
      />
      {erro && <div className="mensagem-erro">{erro}</div>}
    </div>
  );
});

// Uso em um formulário
function Formulario() {
  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  
  const validarEmail = (valor) => {
    if (!valor) return 'Email é obrigatório';
    if (!/\S+@\S+\.\S+/.test(valor)) return 'Email inválido';
    return '';
  };
  
  const validarSenha = (valor) => {
    if (!valor) return 'Senha é obrigatória';
    if (valor.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
    return '';
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Usa os métodos personalizados expostos
    const emailValido = emailRef.current.validate();
    const senhaValida = senhaRef.current.validate();
    
    if (emailValido && senhaValida) {
      console.log('Formulário válido!');
      console.log('Email:', emailRef.current.value);
      console.log('Senha:', senhaRef.current.value);
      // Enviar dados...
    }
  };
  
  const limparFormulario = () => {
    emailRef.current.clear();
    senhaRef.current.clear();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CampoTextoValidado
        ref={emailRef}
        label="Email"
        type="email"
        placeholder="seu@email.com"
        validacao={validarEmail}
      />
      
      <CampoTextoValidado
        ref={senhaRef}
        label="Senha"
        type="password"
        validacao={validarSenha}
      />
      
      <div className="botoes">
        <button type="submit">Entrar</button>
        <button type="button" onClick={limparFormulario}>Limpar</button>
      </div>
    </form>
  );
}
```

## Boas Práticas

### 1. Use com Moderação

O `useImperativeHandle` representa uma abordagem imperativa, que vai contra o fluxo de dados declarativo que o React incentiva. Use-o apenas quando necessário, como:

- Quando você precisa expor métodos imperativos como `focus()`, `play()`, `scrollTo()`, etc.
- Quando você está integrando com bibliotecas de terceiros que exigem acesso imperativo
- Quando você está criando componentes de baixo nível que precisam expor uma API imperativa

### 2. Mantenha a API Mínima

Exponha apenas o que é absolutamente necessário. Quanto menor a superfície da API, mais fácil será manter e evoluir seu componente.

### 3. Documente a API Exposta

Como a API imperativa não é visível na interface de props do componente, é importante documentá-la claramente:

```jsx
/**
 * Campo de texto com validação integrada.
 * 
 * @component
 * @example
 * const ref = useRef(null);
 * <CampoTextoValidado ref={ref} validacao={(valor) => !valor ? 'Campo obrigatório' : ''} />
 * 
 * // API imperativa:
 * ref.current.focus(); // Foca o campo
 * ref.current.clear(); // Limpa o campo
 * ref.current.validate(); // Valida o campo manualmente, retorna boolean
 * ref.current.value; // Obtém o valor atual
 * ref.current.isValid; // Verifica se o campo está válido
 */
const CampoTextoValidado = forwardRef((props, ref) => {
  // Implementação...
});
```

### 4. Considere Alternativas Declarativas

Antes de usar `useImperativeHandle`, considere se uma abordagem declarativa poderia funcionar:

```jsx
// Abordagem imperativa
const MeuInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    }
  }));
  
  return <input ref={inputRef} />;
});

// Uso imperativo
function Form() {
  const inputRef = useRef(null);
  
  const handleClick = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <MeuInput ref={inputRef} />
      <button onClick={handleClick}>Focar</button>
    </>
  );
}

// Alternativa declarativa
function MeuInput({ autoFocus }) {
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  return <input ref={inputRef} />;
}

// Uso declarativo
function Form() {
  const [focar, setFocar] = useState(false);
  
  return (
    <>
      <MeuInput autoFocus={focar} />
      <button onClick={() => setFocar(true)}>Focar</button>
    </>
  );
}
```

## Limitações e Considerações

### 1. Compatibilidade com TypeScript

Ao usar `useImperativeHandle` com TypeScript, você precisa definir explicitamente os tipos para a ref:

```typescript
import { forwardRef, useRef, useImperativeHandle, Ref } from 'react';

// Define a interface para a ref exposta
interface MeuComponenteHandle {
  focus: () => void;
  reset: () => void;
}

// Use a interface no forwardRef
const MeuComponente = forwardRef<MeuComponenteHandle, MeuComponenteProps>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      reset: () => {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }));
    
    return <input ref={inputRef} />;
  }
);
```

### 2. Mudanças no React 19

A partir do React 19, a prop `ref` está disponível diretamente como uma prop normal, sem a necessidade de usar `forwardRef`. No entanto, para compatibilidade com versões anteriores do React (18 e anteriores), ainda é recomendado usar `forwardRef`.

```jsx
// React 19+
function MeuComponente({ ref }) {
  useImperativeHandle(ref, () => ({
    // ...
  }));
  
  return <div>...</div>;
}

// React 18 e anteriores (e compatível com React 19)
const MeuComponente = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    // ...
  }));
  
  return <div>...</div>;
});
```

### 3. Performance

Tenha cuidado ao criar funções dentro do callback `createHandle`. Se você não fornecer um array de dependências adequado, essas funções serão recriadas em cada renderização, o que pode causar problemas de performance em componentes pai que dependem da estabilidade dessas funções.

```jsx
// ❌ Problema: funções recriadas em cada renderização
useImperativeHandle(ref, () => ({
  metodo1() { /* ... */ },
  metodo2() { /* ... */ }
})); // Sem array de dependências

// ✅ Melhor: funções criadas apenas uma vez
useImperativeHandle(ref, () => ({
  metodo1() { /* ... */ },
  metodo2() { /* ... */ }
}), []); // Array de dependências vazio
```

## Conclusão

O hook `useImperativeHandle` é uma ferramenta poderosa para casos específicos onde você precisa de controle fino sobre a API imperativa exposta por seus componentes. Embora vá contra o fluxo de dados declarativo que o React incentiva, ele é valioso para:

1. Limitar a API exposta por um componente
2. Criar APIs imperativas personalizadas
3. Abstrair a implementação interna de um componente

Use-o com moderação e sempre considere se uma abordagem declarativa poderia resolver o mesmo problema de forma mais elegante e alinhada com a filosofia do React.
