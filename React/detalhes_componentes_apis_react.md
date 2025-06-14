# Detalhamento dos Principais Componentes e APIs do React

## Componentes

Os componentes são os blocos de construção fundamentais das aplicações React. Um componente é uma parte da UI (interface do usuário) que possui sua própria lógica e aparência. Um componente pode ser tão pequeno quanto um botão, ou tão grande quanto uma página inteira.

### Tipos de Componentes

#### Componentes Funcionais

```jsx
function Welcome(props) {
  return <h1>Olá, {props.name}</h1>;
}
```

#### Componentes de Classe (menos comuns em código moderno)

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Olá, {this.props.name}</h1>;
  }
}
```

### Componentes Integrados

O React fornece alguns componentes integrados que você pode usar no seu JSX:

#### Fragment

Permite agrupar uma lista de filhos sem adicionar nós extras ao DOM.

```jsx
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
```

#### Suspense

Permite que você exiba um fallback enquanto os componentes filhos estão carregando.

```jsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

## APIs Principais

### createElement

Cria e retorna um novo elemento React com as propriedades especificadas.

```jsx
React.createElement(
  type,
  [props],
  [...children]
)
```

### createContext

Cria um objeto Context que pode ser usado para compartilhar dados entre componentes sem passar props manualmente.

```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Botão Temático</button>;
}
```

### lazy

Permite definir um componente que é carregado dinamicamente.

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

### memo

Um componente de ordem superior que memoriza o resultado de um componente para evitar renderizações desnecessárias.

```jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Renderiza usando props
});
```

## APIs do Cliente (react-dom/client)

### createRoot

Cria uma raiz React para renderizar ou atualizar elementos React no nó DOM do navegador.

```jsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### hydrateRoot

Similar ao createRoot, mas usado para "hidratar" um contêiner cujo HTML foi renderizado pelo React no servidor.

```jsx
import { hydrateRoot } from 'react-dom/client';

const root = hydrateRoot(document.getElementById('root'), <App />);
```

## APIs do Servidor (react-dom/server)

### renderToString

Renderiza um elemento React para seu HTML inicial.

```jsx
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />);
```

### renderToStaticMarkup

Similar ao renderToString, mas não cria atributos DOM extras que o React usa internamente.

```jsx
import { renderToStaticMarkup } from 'react-dom/server';

const html = renderToStaticMarkup(<App />);
```

## Diretivas

As diretivas fornecem instruções para empacotadores compatíveis com Componentes de Servidor do React.

### 'use client'

Marca um arquivo e todos os seus imports como código de cliente.

```jsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Contagem: {count}
    </button>
  );
}
```

### 'use server'

Marca funções assíncronas do servidor que podem ser chamadas do cliente.

```jsx
'use server';

export async function addToCart(productId) {
  // Lógica do servidor para adicionar ao carrinho
}
```

## React Server Components

Os Server Components são um novo tipo de componente que é executado apenas no servidor. Eles permitem:

1. Acessar recursos do servidor diretamente (banco de dados, sistema de arquivos)
2. Manter código sensível no servidor (tokens de API, lógica de negócios)
3. Reduzir o tamanho do pacote JavaScript enviado ao cliente
4. Melhorar o desempenho inicial da página

```jsx
// ServerComponent.js (implicitamente um componente de servidor)
import { db } from './database';

export default async function ServerComponent() {
  const data = await db.query('SELECT * FROM products');
  
  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {data.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## useEffect

O useEffect é um Hook do React que permite sincronizar um componente com um sistema externo. É uma das ferramentas mais importantes para gerenciar efeitos colaterais em componentes React.

### Casos de uso comuns:

1. **Conectando-se a sistemas externos**:
   ```jsx
   useEffect(() => {
     const connection = createConnection(serverUrl, roomId);
     connection.connect();
     return () => {
       connection.disconnect();
     };
   }, [serverUrl, roomId]);
   ```

2. **Controlando widgets não-React**:
   ```jsx
   useEffect(() => {
     const map = new MapLibrary.Map(mapRef.current);
     map.setZoom(zoom);
     return () => {
       map.remove();
     };
   }, [zoom]);
   ```

3. **Buscando dados**:
   ```jsx
   useEffect(() => {
     let ignore = false;
     
     async function fetchData() {
       const response = await fetch(`/api/products?query=${query}`);
       const json = await response.json();
       if (!ignore) {
         setProducts(json);
       }
     }
     
     fetchData();
     
     return () => {
       ignore = true;
     };
   }, [query]);
   ```

### Especificando dependências:

O array de dependências controla quando o efeito é executado:
- Array vazio `[]`: Executa apenas uma vez após a montagem
- Com dependências `[a, b]`: Executa quando qualquer dependência muda
- Sem array: Executa após cada renderização

### Função de limpeza:

A função retornada pelo efeito é chamada antes que o componente seja desmontado ou antes que o efeito seja executado novamente.

```jsx
useEffect(() => {
  // Configuração
  const subscription = subscribe();
  
  // Limpeza
  return () => {
    unsubscribe(subscription);
  };
}, [dependencies]);
```
