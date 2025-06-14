# Detalhamento dos Hooks do React

## Introdução aos Hooks

Os Hooks permitem que você use diferentes funcionalidades do React em seus componentes. Você pode usar os Hooks embutidos ou combiná-los para construir os seus próprios. Esta seção detalha todos os Hooks embutidos no React.

## State Hooks

Os State Hooks permitem que um componente "lembre" informações como entrada do usuário. Por exemplo, um componente de formulário pode usar o state para armazenar o valor da entrada, enquanto um componente de galeria de imagens pode usar o state para armazenar o índice da imagem selecionada.

### useState

O Hook `useState` declara uma variável de state que você pode atualizar diretamente.

```jsx
function ImageGallery() {
  const [index, setIndex] = useState(0);
  // ...
}
```

### useReducer

O Hook `useReducer` declara uma variável de state com a lógica de atualização dentro de uma função reducer.

```jsx
function ImageGallery() {
  const [state, dispatch] = useReducer(galleryReducer, { index: 0 });
  // ...
}

function galleryReducer(state, action) {
  switch (action.type) {
    case 'NEXT':
      return { ...state, index: state.index + 1 };
    case 'PREV':
      return { ...state, index: state.index - 1 };
    default:
      return state;
  }
}
```

## Context Hooks

Os Context Hooks permitem que um componente receba informações de pais distantes sem passá-las como props.

### useContext

O Hook `useContext` permite ler e assinar o contexto diretamente em seu componente.

```jsx
function Button() {
  const theme = useContext(ThemeContext);
  // ...
}
```

## Ref Hooks

Os Ref Hooks permitem referenciar um valor que não é necessário para renderização.

### useRef

O Hook `useRef` declara uma ref, que é como uma "caixa" que pode conter um valor mutável em sua propriedade `.current`.

```jsx
function Form() {
  const inputRef = useRef(null);
  
  function handleClick() {
    inputRef.current.focus();
  }
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focar no input</button>
    </>
  );
}
```

## Effect Hooks

Os Effect Hooks permitem conectar um componente a sistemas externos ou realizar operações após a renderização.

### useEffect

O Hook `useEffect` conecta um componente a sistemas externos e executa código após a renderização.

```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
```

### useLayoutEffect

Similar ao `useEffect`, mas dispara sincronicamente após todas as mutações do DOM.

### useInsertionEffect

Similar ao `useEffect`, mas dispara antes de qualquer mutação do DOM.

## Performance Hooks

Os Performance Hooks ajudam a otimizar a renderização e evitar cálculos desnecessários.

### useMemo

O Hook `useMemo` permite memorizar o resultado de um cálculo custoso entre renderizações.

```jsx
function TodoList({ todos, filter }) {
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => todo.status === filter);
  }, [todos, filter]);
  // ...
}
```

### useCallback

O Hook `useCallback` permite memorizar uma definição de função entre renderizações.

```jsx
function ProductPage({ productId }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', { orderDetails });
  }, [productId]);
  // ...
}
```

## Outros Hooks

### useId

O Hook `useId` gera um ID único que pode ser passado para atributos de acessibilidade.

```jsx
function NameField() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Nome:</label>
      <input id={id} />
    </>
  );
}
```

### useDebugValue

O Hook `useDebugValue` permite exibir um valor personalizado para Hooks customizados nas React DevTools.

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
```

### useDeferredValue

O Hook `useDeferredValue` permite adiar a atualização de uma parte menos crítica da UI.

```jsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

### useImperativeHandle

O Hook `useImperativeHandle` permite personalizar a instância que é exposta quando se usa refs.

```jsx
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    }
  }));
  
  return <input {...props} ref={inputRef} />;
});
```

### useOptimistic

O Hook `useOptimistic` permite atualizar a UI otimisticamente antes que uma operação seja concluída.

```jsx
function MessageThread({ messages }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, newMessage]
  );
  // ...
}
```

### useActionState

O Hook `useActionState` permite gerenciar o estado de uma ação assíncrona.

```jsx
function SubmitButton() {
  const [state, dispatch] = useActionState(submitAction);
  // ...
}
```

## Criando Hooks Customizados

Você pode criar seus próprios Hooks para reutilizar lógica de estado entre componentes. Um Hook customizado é uma função JavaScript cujo nome começa com "use" e que pode chamar outros Hooks.

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}
```

Os Hooks customizados permitem extrair lógica de componentes em funções reutilizáveis, simplificando o código e facilitando o compartilhamento de funcionalidades entre diferentes componentes.
