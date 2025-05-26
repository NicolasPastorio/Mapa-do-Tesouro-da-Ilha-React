# useInsertionEffect

## Introdução

O hook `useInsertionEffect` é um hook especializado do React projetado especificamente para bibliotecas de CSS-in-JS. Ele permite a injeção de estilos no DOM antes que qualquer efeito de layout seja executado. Este hook foi introduzido para resolver problemas de performance relacionados à injeção de estilos em tempo de execução.

## Aviso Importante

Antes de tudo, é crucial entender que `useInsertionEffect` **não é destinado para uso em componentes regulares**. Como a própria documentação do React enfatiza:

> `useInsertionEffect` é para autores de bibliotecas CSS-in-JS. A menos que você esteja trabalhando em uma biblioteca CSS-in-JS e precise de um lugar para injetar estilos, você provavelmente quer usar `useEffect` ou `useLayoutEffect` em vez disso.

## Sintaxe Básica

```jsx
import { useInsertionEffect } from 'react';

// Dentro de uma biblioteca CSS-in-JS
function useCSS(rule) {
  useInsertionEffect(() => {
    // Injetar tags <style> aqui
    
    return () => {
      // Função de limpeza opcional
    };
  }, [/* dependências */]);
  
  return rule;
}
```

## Ordem de Execução dos Efeitos no React

Para entender a utilidade do `useInsertionEffect`, é importante conhecer a ordem em que os efeitos são executados no React:

1. **useInsertionEffect**: Executa primeiro, antes de qualquer manipulação do DOM
2. **useLayoutEffect**: Executa depois que o DOM foi atualizado, mas antes que o navegador pinte a tela
3. **useEffect**: Executa depois que o navegador pintou a tela

Visualmente, a sequência é:

```
Renderização → useInsertionEffect → Mutações do DOM → useLayoutEffect → Pintura do navegador → useEffect
```

## Parâmetros

O hook `useInsertionEffect` aceita dois parâmetros:

1. **setup**: Uma função que contém o código do efeito. Esta função pode opcionalmente retornar uma função de limpeza.
2. **dependencies** (opcional): Um array de dependências. O efeito será executado novamente se qualquer valor neste array mudar entre renderizações.

## Propósito e Caso de Uso Principal

### Injeção de Estilos Dinâmicos em Bibliotecas CSS-in-JS

O principal (e praticamente único) caso de uso para `useInsertionEffect` é a injeção de estilos dinâmicos em bibliotecas CSS-in-JS que utilizam tags `<style>` em tempo de execução.

Quando uma biblioteca CSS-in-JS injeta tags `<style>` durante a renderização ou dentro de `useLayoutEffect`, isso pode causar problemas de performance significativos:

1. Se a injeção ocorrer durante a renderização, o navegador recalculará os estilos a cada quadro durante a renderização da árvore de componentes, o que pode ser extremamente lento.

2. Se a injeção ocorrer durante `useLayoutEffect`, outros efeitos de layout que dependem dos estilos corretos podem ser executados antes que os estilos sejam aplicados, causando cálculos incorretos.

O `useInsertionEffect` resolve esses problemas garantindo que os estilos sejam injetados antes que qualquer `useLayoutEffect` seja executado, mas depois que o React tenha calculado as mudanças no DOM.

```jsx
// Exemplo de implementação em uma biblioteca CSS-in-JS
const insertedRules = new Set();

function useCSS(rule) {
  useInsertionEffect(() => {
    if (!insertedRules.has(rule)) {
      insertedRules.add(rule);
      
      // Criar e injetar a tag <style>
      const styleElement = document.createElement('style');
      styleElement.textContent = rule;
      document.head.appendChild(styleElement);
      
      return () => {
        // Limpeza opcional
        insertedRules.delete(rule);
        styleElement.remove();
      };
    }
  }, [rule]);
  
  // Retorna um identificador de classe ou outro valor relevante
  return extractClassNameFromRule(rule);
}

// Uso em um componente
function Button({ primary }) {
  const className = useCSS(`
    .button-${primary ? 'primary' : 'secondary'} {
      background-color: ${primary ? 'blue' : 'gray'};
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
    }
  `);
  
  return <button className={className}>Clique-me</button>;
}
```

## Limitações e Considerações

### 1. Não Atualize o Estado

Você não pode atualizar o estado dentro de `useInsertionEffect`. Esta é uma limitação intencional, pois este hook é executado em um momento específico do ciclo de vida do React onde atualizações de estado não são permitidas.

```jsx
// ❌ Isso causará um erro
useInsertionEffect(() => {
  setAlgumEstado(novoValor); // Erro: não pode atualizar estado aqui
}, []);
```

### 2. Refs Ainda Não Estão Anexadas

No momento em que `useInsertionEffect` é executado, as refs ainda não foram anexadas aos elementos do DOM. Isso significa que você não pode acessar refs dentro deste hook.

```jsx
// ❌ Isso não funcionará como esperado
useInsertionEffect(() => {
  if (ref.current) {
    // ref.current será null aqui
  }
}, []);
```

### 3. Execução Apenas no Cliente

Como outros efeitos, `useInsertionEffect` só é executado no cliente, não durante a renderização no servidor. Se você precisar coletar quais regras CSS foram usadas no servidor, você precisará fazer isso durante a renderização:

```jsx
let regrasColetadasNoServidor = new Set();

function useCSS(rule) {
  // Coleta regras durante a renderização no servidor
  if (typeof window === 'undefined') {
    regrasColetadasNoServidor.add(rule);
  }
  
  useInsertionEffect(() => {
    // Injeção de estilos no cliente
    // ...
  }, [rule]);
  
  return extractClassNameFromRule(rule);
}
```

### 4. Não Confie na Atualização do DOM em um Momento Específico

O `useInsertionEffect` pode ser executado antes ou depois que o DOM foi atualizado. Você não deve confiar que o DOM estará em um estado específico quando este hook for executado.

### 5. Ordem de Limpeza e Configuração

Diferentemente de outros tipos de efeitos, onde a limpeza é executada para todos os efeitos e depois a configuração para todos os efeitos, `useInsertionEffect` executará tanto a limpeza quanto a configuração um componente por vez. Isso resulta em um "entrelaçamento" das funções de limpeza e configuração.

## Implementação em Bibliotecas CSS-in-JS Populares

### Styled-components

A biblioteca styled-components, uma das mais populares para CSS-in-JS, implementou o uso de `useInsertionEffect` para melhorar a performance:

```jsx
// Simplificação da implementação interna do styled-components
function insertStyles(rule) {
  const isClient = typeof document !== 'undefined';
  
  if (isClient) {
    useInsertionEffect(() => {
      // Injetar estilos no DOM
      const styleElement = document.createElement('style');
      styleElement.textContent = rule;
      document.head.appendChild(styleElement);
      
      return () => {
        // Remover estilos quando não forem mais necessários
        styleElement.remove();
      };
    }, [rule]);
  }
}
```

### Emotion

Emotion, outra biblioteca CSS-in-JS popular, também adotou `useInsertionEffect`:

```jsx
// Simplificação da implementação interna do Emotion
function useInsertionEffectWithFallbacks(effect) {
  if (React.useInsertionEffect) {
    React.useInsertionEffect(effect, []);
  } else if (React.useLayoutEffect) {
    // Fallback para versões mais antigas do React
    React.useLayoutEffect(effect, []);
  } else {
    React.useEffect(effect, []);
  }
}

function injectStyles(rule, cache) {
  useInsertionEffectWithFallbacks(() => {
    cache.insert(rule);
  });
}
```

## Alternativas ao useInsertionEffect

Se você não está desenvolvendo uma biblioteca CSS-in-JS, existem abordagens melhores para lidar com estilos em React:

### 1. CSS Estático em Arquivos Separados

A abordagem mais tradicional e geralmente mais eficiente:

```jsx
// Em seu arquivo JS
import './Button.css';

function Button() {
  return <button className="button">Clique-me</button>;
}

// Em Button.css
.button {
  background-color: blue;
  color: white;
}
```

### 2. CSS Modules

Uma abordagem que combina a modularidade do CSS-in-JS com a eficiência do CSS estático:

```jsx
// Em seu arquivo JS
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Clique-me</button>;
}

// Em Button.module.css
.button {
  background-color: blue;
  color: white;
}
```

### 3. Estilos Inline para Estilos Dinâmicos

Para estilos que precisam mudar com base em props ou estado:

```jsx
function Button({ primary }) {
  const buttonStyle = {
    backgroundColor: primary ? 'blue' : 'gray',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px'
  };
  
  return <button style={buttonStyle}>Clique-me</button>;
}
```

### 4. CSS-in-JS com Extração Estática

Algumas bibliotecas CSS-in-JS suportam extração estática durante o build, o que evita a necessidade de injeção em tempo de execução:

```jsx
// Com styled-components e plugin de extração estática
const Button = styled.button`
  background-color: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
`;

function MyButton({ primary }) {
  return <Button primary={primary}>Clique-me</Button>;
}
```

## Quando Usar useInsertionEffect

Você deve considerar usar `useInsertionEffect` apenas se:

1. Você está desenvolvendo uma biblioteca CSS-in-JS que injeta estilos em tempo de execução
2. Você identificou problemas de performance relacionados à injeção de estilos
3. Você precisa garantir que os estilos sejam injetados antes que qualquer medição de layout ocorra

Em todos os outros casos, você deve usar `useEffect` ou `useLayoutEffect`.

## Exemplo Completo: Implementação de um Hook CSS-in-JS Simples

Aqui está um exemplo de como você poderia implementar um hook CSS-in-JS simples usando `useInsertionEffect`:

```jsx
import { useInsertionEffect } from 'react';

// Cache para evitar injeções duplicadas
const injectedRules = new Set();

// Função para gerar um nome de classe único
function generateUniqueClassName(rule) {
  return 'css-' + Math.abs(hashString(rule)).toString(16).slice(0, 6);
}

// Função simples de hash para strings
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Converte para inteiro de 32 bits
  }
  return hash;
}

// Hook CSS-in-JS
function useCSS(cssTemplate, ...values) {
  // Interpola os valores no template CSS
  const rule = cssTemplate.reduce((acc, part, i) => {
    return acc + part + (values[i] || '');
  }, '');
  
  // Gera um nome de classe único baseado na regra
  const className = generateUniqueClassName(rule);
  
  // Cria a regra CSS completa
  const fullRule = `.${className} { ${rule} }`;
  
  // Usa useInsertionEffect para injetar a regra no DOM
  useInsertionEffect(() => {
    if (!injectedRules.has(fullRule)) {
      injectedRules.add(fullRule);
      
      // Cria e injeta a tag <style>
      const styleElement = document.createElement('style');
      styleElement.textContent = fullRule;
      document.head.appendChild(styleElement);
      
      // Retorna função de limpeza
      return () => {
        injectedRules.delete(fullRule);
        styleElement.remove();
      };
    }
  }, [fullRule]);
  
  return className;
}

// Uso do hook
function Button({ primary, children }) {
  const className = useCSS`
    background-color: ${primary ? 'blue' : 'gray'};
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    
    &:hover {
      opacity: 0.9;
    }
  `;
  
  return <button className={className}>{children}</button>;
}
```

## Considerações de Performance

### Benefícios de Performance

O uso de `useInsertionEffect` em bibliotecas CSS-in-JS pode trazer benefícios significativos de performance:

1. **Evita recálculos de estilo excessivos**: Ao injetar estilos antes de qualquer efeito de layout, você evita que o navegador recalcule os estilos múltiplas vezes durante a renderização.

2. **Garante cálculos de layout corretos**: Ao garantir que os estilos estejam disponíveis antes que qualquer `useLayoutEffect` seja executado, você assegura que medições de layout sejam baseadas nos estilos corretos.

### Impacto na Performance

Apesar dos benefícios, é importante lembrar que a injeção de estilos em tempo de execução ainda tem um custo de performance. A documentação do React recomenda evitar a injeção de tags `<style>` em tempo de execução por duas razões:

1. A injeção em tempo de execução força o navegador a recalcular os estilos com muito mais frequência.
2. A injeção em tempo de execução pode ser muito lenta se ocorrer no momento errado no ciclo de vida do React.

O `useInsertionEffect` ajuda a mitigar o segundo problema, mas não resolve o primeiro.

## Conclusão

O hook `useInsertionEffect` é uma ferramenta especializada no arsenal do React, projetada para resolver um problema muito específico: a injeção eficiente de estilos em tempo de execução em bibliotecas CSS-in-JS.

A menos que você esteja desenvolvendo uma biblioteca CSS-in-JS ou enfrentando problemas específicos de performance relacionados à injeção de estilos, você provavelmente não precisará usar este hook diretamente. Para a maioria dos casos de uso, `useEffect` ou `useLayoutEffect` são escolhas mais apropriadas.

Se você está usando uma biblioteca CSS-in-JS moderna, é provável que ela já esteja utilizando `useInsertionEffect` internamente para otimizar a injeção de estilos, então você obtém os benefícios sem precisar usar o hook diretamente.

Para aplicações que priorizam performance, considere abordagens alternativas para estilos, como CSS estático, CSS Modules ou CSS-in-JS com extração estática, que geralmente oferecem melhor performance do que a injeção de estilos em tempo de execução.
