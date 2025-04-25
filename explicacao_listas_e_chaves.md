# Listas e Chaves no React

Renderizar listas de elementos é uma tarefa comum no desenvolvimento de interfaces de usuário. No React, você pode criar coleções de elementos e incluí-los no JSX usando chaves `{}`. Esta seção explora como trabalhar com listas no React e a importância das chaves (keys) para otimizar a renderização.

## Renderizando Coleções

### Usando o método map()

A forma mais comum de renderizar uma lista de elementos no React é usando o método `map()` do JavaScript. Este método percorre um array e retorna um novo array com os resultados da função aplicada a cada elemento.

```jsx
function ListaDeNumeros() {
  const numeros = [1, 2, 3, 4, 5];
  
  return (
    <ul>
      {numeros.map((numero) => (
        <li key={numero}>{numero}</li>
      ))}
    </ul>
  );
}
```

Neste exemplo:
1. Temos um array `numeros` com cinco valores
2. Usamos `map()` para transformar cada número em um elemento `<li>`
3. O resultado é uma lista não ordenada com os números de 1 a 5

### Renderizando Componentes em uma Coleção

Você também pode usar `map()` para renderizar componentes personalizados para cada item em uma coleção:

```jsx
function ListaDeProdutos({ produtos }) {
  return (
    <div className="lista-produtos">
      {produtos.map((produto) => (
        <ProdutoItem 
          key={produto.id}
          id={produto.id}
          nome={produto.nome}
          preco={produto.preco}
          imagem={produto.imagem}
        />
      ))}
    </div>
  );
}

function ProdutoItem({ id, nome, preco, imagem }) {
  return (
    <div className="produto-item">
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      <p>R$ {preco.toFixed(2)}</p>
      <button>Adicionar ao Carrinho</button>
    </div>
  );
}
```

## Chaves (Keys)

### O que são Chaves?

Chaves são atributos especiais que você deve incluir ao criar listas de elementos. Elas ajudam o React a identificar quais itens foram alterados, adicionados ou removidos, o que é crucial para atualizações eficientes da interface.

```jsx
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.texto}
  </li>
);
```

### Por que as Chaves são Importantes?

1. **Performance**: Sem chaves, o React teria que recriar potencialmente toda a lista quando algo muda.
2. **Preservação de Estado**: Componentes com chaves mantêm seu estado entre re-renderizações.
3. **Reconciliação Eficiente**: O React usa chaves para determinar quais elementos foram modificados.

### Regras para Chaves

1. **Unicidade**: As chaves devem ser únicas entre elementos irmãos (no mesmo nível), mas não precisam ser globalmente únicas.
2. **Estabilidade**: As chaves devem ser estáveis, previsíveis e não mudar entre renderizações.
3. **Não use índices do array como chaves** (exceto em casos específicos).

```jsx
// Bom: usando IDs únicos
<li key={item.id}>{item.nome}</li>

// Ruim: usando índices do array (evite quando possível)
<li key={index}>{item.nome}</li>
```

### Quando é Seguro Usar Índices como Chaves?

Usar o índice do array como chave é geralmente desencorajado, mas pode ser aceitável quando todas estas condições são verdadeiras:

1. A lista é estática (não muda)
2. Os itens nunca são reordenados ou filtrados
3. Os itens não têm IDs estáveis/únicos
4. A lista nunca é reordenada ou filtrada

```jsx
// Aceitável para uma lista estática sem IDs
const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function ListaDias() {
  return (
    <ul>
      {diasDaSemana.map((dia, index) => (
        <li key={index}>{dia}</li>
      ))}
    </ul>
  );
}
```

### Problemas com Índices como Chaves

Considere este exemplo que mostra por que índices podem causar problemas:

```jsx
function ListaDeNomes({ nomes }) {
  return (
    <ul>
      {nomes.map((nome, index) => (
        <li key={index}>
          <input 
            type="text"
            defaultValue={nome}
          />
        </li>
      ))}
    </ul>
  );
}

// Inicialmente: ['João', 'Maria', 'Pedro']
// Se adicionarmos 'Ana' no início: ['Ana', 'João', 'Maria', 'Pedro']
```

Se usarmos índices como chaves e adicionarmos "Ana" no início da lista:
- O componente com key=0 agora mostrará "Ana" em vez de "João"
- O estado do input para "João" será reutilizado para "Ana"
- Isso pode causar comportamentos inesperados e bugs difíceis de rastrear

## Extraindo Componentes com Chaves

Quando você extrai um componente de lista, a chave deve ser especificada no componente de lista, não nos elementos dentro do componente:

```jsx
// Incorreto
function ListaItem({ item }) {
  return (
    <li key={item.id}>  // Errado! A chave não deve estar aqui
      {item.nome}
    </li>
  );
}

function Lista({ itens }) {
  return (
    <ul>
      {itens.map(item => <ListaItem item={item} />)}  // Falta a chave aqui
    </ul>
  );
}

// Correto
function ListaItem({ item }) {
  return (
    <li>
      {item.nome}
    </li>
  );
}

function Lista({ itens }) {
  return (
    <ul>
      {itens.map(item => <ListaItem key={item.id} item={item} />)}
    </ul>
  );
}
```

## Chaves Devem Ser Únicas Apenas Entre Irmãos

As chaves só precisam ser únicas entre elementos irmãos, não globalmente. Você pode usar os mesmos valores de chave em arrays diferentes:

```jsx
function Blog() {
  return (
    <div>
      <h1>Artigos</h1>
      <ul>
        {artigos.map(artigo => (
          <li key={artigo.id}>{artigo.titulo}</li>
        ))}
      </ul>
      
      <h1>Comentários</h1>
      <ul>
        {comentarios.map(comentario => (
          <li key={comentario.id}>{comentario.texto}</li>
        ))}
      </ul>
    </div>
  );
}
```

Neste exemplo, podemos ter um artigo e um comentário com o mesmo ID (por exemplo, id=1), mas isso não é um problema porque eles estão em listas diferentes.

## Técnicas Avançadas

### Renderização de Listas Aninhadas

Para renderizar listas aninhadas, você precisa garantir que cada elemento tenha uma chave única em seu nível:

```jsx
function ListaAninhada() {
  const dados = [
    { id: 1, nome: 'Categoria 1', itens: [
      { id: 101, nome: 'Item 1.1' },
      { id: 102, nome: 'Item 1.2' }
    ]},
    { id: 2, nome: 'Categoria 2', itens: [
      { id: 201, nome: 'Item 2.1' },
      { id: 202, nome: 'Item 2.2' }
    ]}
  ];
  
  return (
    <div>
      {dados.map(categoria => (
        <div key={categoria.id}>
          <h2>{categoria.nome}</h2>
          <ul>
            {categoria.itens.map(item => (
              <li key={item.id}>{item.nome}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

### Gerando Chaves Únicas

Se seus dados não têm IDs únicos, você pode gerar chaves únicas:

```jsx
import { v4 as uuidv4 } from 'uuid';

function AdicionarItem() {
  const [itens, setItens] = useState([]);
  
  const adicionarNovoItem = () => {
    const novoItem = {
      id: uuidv4(), // Gera um ID único
      texto: `Item ${itens.length + 1}`,
      timestamp: Date.now()
    };
    
    setItens([...itens, novoItem]);
  };
  
  return (
    <div>
      <button onClick={adicionarNovoItem}>Adicionar Item</button>
      <ul>
        {itens.map(item => (
          <li key={item.id}>{item.texto}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Usando Chaves Compostas

Em alguns casos, você pode precisar de uma chave composta:

```jsx
function TabelaMatriz() {
  const dados = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  
  return (
    <table>
      <tbody>
        {dados.map((linha, linhaIndex) => (
          <tr key={`linha-${linhaIndex}`}>
            {linha.map((celula, colunaIndex) => (
              <td key={`celula-${linhaIndex}-${colunaIndex}`}>
                {celula}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Otimizações de Performance

### Virtualização de Listas

Para listas muito grandes, considere usar virtualização para renderizar apenas os itens visíveis na viewport:

```jsx
import { FixedSizeList } from 'react-window';

function ListaGrande({ itens }) {
  const Row = ({ index, style }) => (
    <div style={style} className="row">
      Item {itens[index].nome}
    </div>
  );
  
  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={itens.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

### Memoização de Itens de Lista

Para evitar re-renderizações desnecessárias, você pode usar `React.memo` para componentes de item de lista:

```jsx
const ItemLista = React.memo(function ItemLista({ item, onDelete }) {
  console.log(`Renderizando item: ${item.id}`);
  
  return (
    <li>
      {item.texto}
      <button onClick={() => onDelete(item.id)}>Excluir</button>
    </li>
  );
});

function Lista({ itens }) {
  const [lista, setLista] = useState(itens);
  
  // useCallback para evitar recriação da função em cada renderização
  const handleDelete = useCallback((id) => {
    setLista(listaAtual => listaAtual.filter(item => item.id !== id));
  }, []);
  
  return (
    <ul>
      {lista.map(item => (
        <ItemLista 
          key={item.id} 
          item={item} 
          onDelete={handleDelete} 
        />
      ))}
    </ul>
  );
}
```

## Exemplos Práticos

### Lista de Tarefas (Todo List)

```jsx
function TodoList() {
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
    <div className="todo-list">
      <h2>Lista de Tarefas</h2>
      
      <div className="add-todo">
        <input 
          type="text" 
          value={novaTarefa} 
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
      
      <ul className="tarefas">
        {tarefas.length === 0 ? (
          <li className="vazio">Nenhuma tarefa adicionada</li>
        ) : (
          tarefas.map(tarefa => (
            <li 
              key={tarefa.id} 
              className={tarefa.concluida ? 'concluida' : ''}
            >
              <span 
                className="texto-tarefa"
                onClick={() => alternarTarefa(tarefa.id)}
              >
                {tarefa.texto}
              </span>
              <button 
                className="remover"
                onClick={() => removerTarefa(tarefa.id)}
              >
                X
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
```

### Tabela de Dados Filtráveis

```jsx
function TabelaFiltravel({ dados }) {
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState({ campo: 'nome', direcao: 'asc' });
  
  // Filtra os dados com base no termo de pesquisa
  const dadosFiltrados = dados.filter(item => 
    item.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    item.email.toLowerCase().includes(filtro.toLowerCase())
  );
  
  // Ordena os dados com base no campo e direção selecionados
  const dadosOrdenados = [...dadosFiltrados].sort((a, b) => {
    const valorA = a[ordenacao.campo];
    const valorB = b[ordenacao.campo];
    
    if (valorA < valorB) return ordenacao.direcao === 'asc' ? -1 : 1;
    if (valorA > valorB) return ordenacao.direcao === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Alterna a direção da ordenação ou muda o campo
  const alternarOrdenacao = (campo) => {
    if (ordenacao.campo === campo) {
      setOrdenacao({
        campo,
        direcao: ordenacao.direcao === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setOrdenacao({ campo, direcao: 'asc' });
    }
  };
  
  return (
    <div className="tabela-filtravel">
      <div className="controles">
        <input 
          type="text" 
          value={filtro} 
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar por nome ou email..."
        />
      </div>
      
      <table>
        <thead>
          <tr>
            <th onClick={() => alternarOrdenacao('nome')}>
              Nome
              {ordenacao.campo === 'nome' && (
                ordenacao.direcao === 'asc' ? ' ↑' : ' ↓'
              )}
            </th>
            <th onClick={() => alternarOrdenacao('email')}>
              Email
              {ordenacao.campo === 'email' && (
                ordenacao.direcao === 'asc' ? ' ↑' : ' ↓'
              )}
            </th>
            <th onClick={() => alternarOrdenacao('idade')}>
              Idade
              {ordenacao.campo === 'idade' && (
                ordenacao.direcao === 'asc' ? ' ↑' : ' ↓'
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {dadosOrdenados.length === 0 ? (
            <tr>
              <td colSpan="3">Nenhum resultado encontrado</td>
            </tr>
          ) : (
            dadosOrdenados.map(item => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.email}</td>
                <td>{item.idade}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
```

## Boas Práticas

1. **Sempre use chaves**: Nunca omita a propriedade `key` ao renderizar listas.

2. **Use IDs estáveis**: Prefira usar IDs de dados ou outras propriedades únicas e estáveis como chaves.

3. **Evite índices como chaves**: Use índices apenas quando a lista é estática e não será reordenada.

4. **Não gere chaves durante a renderização**: Gerar chaves durante a renderização (como `Math.random()`) causa problemas de performance.

5. **Mantenha as chaves no componente de lista**: Coloque a chave no componente que você está mapeando, não em componentes filhos.

6. **Extraia lógica complexa**: Se a lógica de renderização da lista ficar complexa, extraia-a para funções auxiliares.

7. **Considere a virtualização**: Para listas muito grandes (centenas ou milhares de itens), use bibliotecas de virtualização como `react-window` ou `react-virtualized`.

8. **Memoize itens de lista**: Use `React.memo()` para evitar re-renderizações desnecessárias de itens de lista.

Trabalhar com listas e chaves de forma eficiente é fundamental para criar aplicações React performáticas e livres de bugs. Ao seguir estas práticas recomendadas, você garantirá que suas listas sejam renderizadas corretamente e que o React possa otimizar as atualizações da interface do usuário.
