# useMemo no React

O Hook `useMemo` é uma ferramenta de otimização de performance no React que permite memorizar valores computados entre renderizações. Ele é especialmente útil para cálculos caros ou para preservar a identidade de referência de objetos e arrays.

## Conceito Básico

No React, quando um componente é renderizado, todo o seu código é executado novamente. Isso significa que cálculos complexos são refeitos e novos objetos/arrays são criados a cada renderização, mesmo que os dados de entrada não tenham mudado.

```jsx
function MeuComponente({ items, termo }) {
  // Este cálculo é executado em cada renderização
  const itensFiltrados = items.filter(item => 
    item.nome.toLowerCase().includes(termo.toLowerCase())
  );
  
  return (
    <div>
      <p>Encontrados {itensFiltrados.length} itens</p>
      <ul>
        {itensFiltrados.map(item => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}
```

Isso geralmente não é um problema para cálculos simples. No entanto, pode se tornar um problema de performance quando:

1. O cálculo é computacionalmente caro (como filtragem, ordenação ou transformação de grandes conjuntos de dados)
2. O resultado é passado como prop para componentes filhos otimizados
3. O resultado é usado como dependência em outros Hooks

O `useMemo` resolve esse problema memorizando o resultado do cálculo entre renderizações, desde que as dependências não mudem.

## Sintaxe Básica

```jsx
import { useMemo } from 'react';

function MeuComponente({ items, termo }) {
  // O cálculo só é executado quando 'items' ou 'termo' mudam
  const itensFiltrados = useMemo(() => {
    console.log('Calculando itens filtrados...');
    return items.filter(item => 
      item.nome.toLowerCase().includes(termo.toLowerCase())
    );
  }, [items, termo]); // Array de dependências
  
  return (
    <div>
      <p>Encontrados {itensFiltrados.length} itens</p>
      <ul>
        {itensFiltrados.map(item => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}
```

O Hook `useMemo` aceita dois argumentos:
1. Uma **função** que retorna o valor que você deseja memorizar
2. Um **array de dependências** que, quando alterado, recalculará o valor

## Quando Usar useMemo

O `useMemo` não é necessário em todos os casos. Você deve considerar usá-lo quando:

### 1. Otimizando Cálculos Caros

Se você tem um cálculo que é computacionalmente intensivo, `useMemo` pode evitar que ele seja executado desnecessariamente:

```jsx
function AnaliseDados({ dados, limiar }) {
  // Cálculo caro que só deve ser executado quando necessário
  const estatisticas = useMemo(() => {
    console.log('Calculando estatísticas...');
    
    // Simulando um cálculo caro
    let resultado = { total: 0, acimaDeLimiar: 0, media: 0 };
    
    if (dados.length === 0) return resultado;
    
    // Processamento intensivo
    for (let i = 0; i < dados.length; i++) {
      resultado.total += dados[i].valor;
      if (dados[i].valor > limiar) {
        resultado.acimaDeLimiar++;
      }
    }
    
    resultado.media = resultado.total / dados.length;
    
    return resultado;
  }, [dados, limiar]); // Recalcula apenas quando dados ou limiar mudam
  
  return (
    <div>
      <h2>Análise de Dados</h2>
      <p>Total: {estatisticas.total}</p>
      <p>Média: {estatisticas.media.toFixed(2)}</p>
      <p>Valores acima do limiar: {estatisticas.acimaDeLimiar}</p>
    </div>
  );
}
```

### 2. Preservando a Identidade de Referência

Quando você cria objetos ou arrays dentro de um componente, eles são recriados com novas referências a cada renderização. Isso pode causar re-renderizações desnecessárias em componentes filhos otimizados:

```jsx
function ListaDeUsuarios({ usuarios, onUsuarioClick }) {
  // Sem useMemo - novas referências a cada renderização
  const usuariosFormatados = usuarios.map(usuario => ({
    id: usuario.id,
    nomeCompleto: `${usuario.nome} ${usuario.sobrenome}`,
    email: usuario.email
  }));
  
  // Com useMemo - preserva a referência quando usuarios não muda
  const usuariosFormatadosMemo = useMemo(() => {
    return usuarios.map(usuario => ({
      id: usuario.id,
      nomeCompleto: `${usuario.nome} ${usuario.sobrenome}`,
      email: usuario.email
    }));
  }, [usuarios]);
  
  return (
    <div>
      <h2>Usuários</h2>
      <ListaOtimizada 
        items={usuariosFormatadosMemo} 
        onItemClick={onUsuarioClick} 
      />
    </div>
  );
}

// Componente otimizado que só renderiza quando suas props mudam
const ListaOtimizada = React.memo(function Lista({ items, onItemClick }) {
  console.log('ListaOtimizada renderizada');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item)}>
          {item.nomeCompleto} ({item.email})
        </li>
      ))}
    </ul>
  );
});
```

### 3. Valores como Dependências de useEffect

Quando você usa objetos ou arrays como dependências em `useEffect` ou outros Hooks, `useMemo` evita que o efeito seja executado desnecessariamente:

```jsx
function ConfiguracaoAPI({ baseURL, endpoints }) {
  // Sem useMemo - config é recriado a cada renderização
  const config = {
    baseURL,
    endpoints,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  };
  
  // Com useMemo - config só muda quando baseURL ou endpoints mudam
  const configMemo = useMemo(() => {
    return {
      baseURL,
      endpoints,
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' }
    };
  }, [baseURL, endpoints]);
  
  // useEffect depende de config
  useEffect(() => {
    console.log('Configuração da API mudou, reinicializando cliente...');
    const api = inicializarAPI(configMemo);
    
    return () => {
      api.desconectar();
    };
  }, [configMemo]); // configMemo só muda quando baseURL ou endpoints mudam
  
  return <div>API configurada</div>;
}
```

## useMemo vs. Variáveis Regulares

Vamos comparar o uso de `useMemo` com variáveis regulares:

```jsx
function Exemplo({ data }) {
  // Abordagem 1: Variável regular (recalculada a cada renderização)
  const processedData = processData(data);
  
  // Abordagem 2: useMemo (memorizada entre renderizações)
  const processedDataMemo = useMemo(() => {
    return processData(data);
  }, [data]);
  
  return <ChildComponent data={processedDataMemo} />;
}
```

**Quando usar variáveis regulares é adequado**:
- Para cálculos simples e rápidos
- Quando o resultado não é passado para componentes memorizados
- Quando o resultado não é usado como dependência em outros Hooks
- Quando a clareza do código é mais importante que a otimização

**Quando usar useMemo é adequado**:
- Para cálculos computacionalmente caros
- Quando o resultado é passado para componentes memorizados
- Quando o resultado é usado como dependência em outros Hooks
- Quando você precisa preservar a identidade de referência de objetos/arrays

## Dependências do useMemo

O array de dependências do `useMemo` funciona de maneira similar ao do `useEffect` e `useCallback`:

```jsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

- O cálculo será refeito sempre que qualquer valor no array de dependências mudar
- Se o array estiver vazio `[]`, o cálculo será feito apenas uma vez e reutilizado em todas as renderizações
- Se você omitir o array, o cálculo será refeito em cada renderização (tornando o `useMemo` inútil)

## Padrões Comuns

### 1. Filtragem e Ordenação de Listas

```jsx
function ListaProdutos({ produtos, filtro, ordenacao }) {
  // Memoriza os produtos filtrados e ordenados
  const produtosProcessados = useMemo(() => {
    console.log('Processando produtos...');
    
    // Primeiro filtra
    let resultado = produtos;
    
    if (filtro.categoria) {
      resultado = resultado.filter(p => p.categoria === filtro.categoria);
    }
    
    if (filtro.precoMinimo) {
      resultado = resultado.filter(p => p.preco >= filtro.precoMinimo);
    }
    
    if (filtro.precoMaximo) {
      resultado = resultado.filter(p => p.preco <= filtro.precoMaximo);
    }
    
    if (filtro.termo) {
      const termoLower = filtro.termo.toLowerCase();
      resultado = resultado.filter(p => 
        p.nome.toLowerCase().includes(termoLower) || 
        p.descricao.toLowerCase().includes(termoLower)
      );
    }
    
    // Depois ordena
    if (ordenacao === 'preco-asc') {
      resultado = [...resultado].sort((a, b) => a.preco - b.preco);
    } else if (ordenacao === 'preco-desc') {
      resultado = [...resultado].sort((a, b) => b.preco - a.preco);
    } else if (ordenacao === 'nome') {
      resultado = [...resultado].sort((a, b) => a.nome.localeCompare(b.nome));
    }
    
    return resultado;
  }, [produtos, filtro.categoria, filtro.precoMinimo, filtro.precoMaximo, filtro.termo, ordenacao]);
  
  return (
    <div>
      <h2>Produtos ({produtosProcessados.length})</h2>
      <ul>
        {produtosProcessados.map(produto => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 2. Cálculos Derivados de Dados

```jsx
function DashboardVendas({ vendas }) {
  // Memoriza estatísticas calculadas a partir dos dados de vendas
  const estatisticas = useMemo(() => {
    if (!vendas.length) return { total: 0, media: 0, maximo: 0, minimo: 0 };
    
    let total = 0;
    let maximo = vendas[0].valor;
    let minimo = vendas[0].valor;
    
    for (const venda of vendas) {
      total += venda.valor;
      maximo = Math.max(maximo, venda.valor);
      minimo = Math.min(minimo, venda.valor);
    }
    
    return {
      total,
      media: total / vendas.length,
      maximo,
      minimo,
      quantidade: vendas.length
    };
  }, [vendas]);
  
  // Memoriza dados agrupados por mês
  const vendasPorMes = useMemo(() => {
    const resultado = {};
    
    for (const venda of vendas) {
      const data = new Date(venda.data);
      const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
      
      if (!resultado[mes]) {
        resultado[mes] = { total: 0, quantidade: 0 };
      }
      
      resultado[mes].total += venda.valor;
      resultado[mes].quantidade += 1;
    }
    
    return Object.entries(resultado).map(([mes, dados]) => ({
      mes,
      ...dados,
      media: dados.total / dados.quantidade
    }));
  }, [vendas]);
  
  return (
    <div>
      <h2>Dashboard de Vendas</h2>
      
      <div className="estatisticas">
        <div className="card">
          <h3>Total de Vendas</h3>
          <p>R$ {estatisticas.total.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Ticket Médio</h3>
          <p>R$ {estatisticas.media.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Maior Venda</h3>
          <p>R$ {estatisticas.maximo.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Menor Venda</h3>
          <p>R$ {estatisticas.minimo.toFixed(2)}</p>
        </div>
      </div>
      
      <h3>Vendas por Mês</h3>
      <table>
        <thead>
          <tr>
            <th>Mês</th>
            <th>Quantidade</th>
            <th>Total</th>
            <th>Média</th>
          </tr>
        </thead>
        <tbody>
          {vendasPorMes.map(({ mes, quantidade, total, media }) => (
            <tr key={mes}>
              <td>{mes}</td>
              <td>{quantidade}</td>
              <td>R$ {total.toFixed(2)}</td>
              <td>R$ {media.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 3. Objetos de Configuração

```jsx
function GraficoConfiguravel({ dados, tipo, cores, opcoes }) {
  // Memoriza a configuração completa do gráfico
  const configGrafico = useMemo(() => {
    return {
      dados: processarDadosParaGrafico(dados, tipo),
      opcoes: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            display: opcoes.mostrarLegenda
          },
          tooltip: {
            enabled: opcoes.mostrarTooltip
          },
          title: {
            display: !!opcoes.titulo,
            text: opcoes.titulo
          }
        },
        scales: {
          y: {
            beginAtZero: opcoes.iniciarEmZero,
            display: opcoes.mostrarEixoY
          },
          x: {
            display: opcoes.mostrarEixoX
          }
        },
        ...opcoes.configAvancada
      },
      cores: gerarPaletaDeCores(cores, dados.length)
    };
  }, [dados, tipo, cores, opcoes]);
  
  return (
    <div className="grafico-container">
      <GraficoComponente config={configGrafico} />
    </div>
  );
}

// Componente otimizado que só renderiza quando a configuração muda
const GraficoComponente = React.memo(function GraficoComponente({ config }) {
  console.log('Renderizando gráfico');
  
  // Lógica para renderizar o gráfico com a biblioteca escolhida
  // (por exemplo, Chart.js, D3, etc.)
  
  return <canvas ref={/* ... */} />;
});
```

## Otimizações de Performance

### 1. Granularidade das Dependências

Em vez de memorizar um objeto grande com muitas propriedades, considere memorizar partes menores e mais específicas:

```jsx
function Dashboard({ dados }) {
  // ❌ Menos eficiente: Um único useMemo com muitas dependências
  const estatisticasCompletas = useMemo(() => {
    return {
      vendas: calcularEstatisticasVendas(dados.vendas),
      usuarios: calcularEstatisticasUsuarios(dados.usuarios),
      produtos: calcularEstatisticasProdutos(dados.produtos)
    };
  }, [dados.vendas, dados.usuarios, dados.produtos]);
  
  // ✅ Mais eficiente: Múltiplos useMemo com dependências específicas
  const estatisticasVendas = useMemo(() => {
    return calcularEstatisticasVendas(dados.vendas);
  }, [dados.vendas]);
  
  const estatisticasUsuarios = useMemo(() => {
    return calcularEstatisticasUsuarios(dados.usuarios);
  }, [dados.usuarios]);
  
  const estatisticasProdutos = useMemo(() => {
    return calcularEstatisticasProdutos(dados.produtos);
  }, [dados.produtos]);
  
  // Agora, se apenas dados.vendas mudar, apenas estatisticasVendas será recalculado
  
  return (
    <div>
      <SecaoVendas estatisticas={estatisticasVendas} />
      <SecaoUsuarios estatisticas={estatisticasUsuarios} />
      <SecaoProdutos estatisticas={estatisticasProdutos} />
    </div>
  );
}
```

### 2. Evitando Recálculos Desnecessários

Às vezes, você pode evitar completamente o cálculo se os dados de entrada não forem válidos:

```jsx
function Relatorio({ dados, filtros }) {
  const dadosFiltrados = useMemo(() => {
    // Verificação rápida antes de fazer o cálculo caro
    if (!dados || dados.length === 0) {
      return [];
    }
    
    // Se chegou aqui, prossegue com o cálculo caro
    console.log('Filtrando dados...');
    return filtrarDados(dados, filtros);
  }, [dados, filtros]);
  
  if (dadosFiltrados.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }
  
  return (
    <div>
      <h2>Relatório</h2>
      <TabelaDados dados={dadosFiltrados} />
    </div>
  );
}
```

### 3. Combinando useMemo com useCallback

Você pode usar `useMemo` para criar funções memorizadas (similar ao `useCallback`):

```jsx
function Componente({ id }) {
  // Equivalente a useCallback
  const handleClick = useMemo(() => {
    return () => {
      console.log('Clicado no item', id);
    };
  }, [id]);
  
  // Mais comum usar useCallback diretamente
  const handleClickCallback = useCallback(() => {
    console.log('Clicado no item', id);
  }, [id]);
  
  return <button onClick={handleClick}>Clique em {id}</button>;
}
```

## Armadilhas Comuns

### 1. Dependências Ausentes

```jsx
function Componente({ dados, filtro }) {
  // ❌ Problema: 'filtro' é usado mas não está nas dependências
  const dadosFiltrados = useMemo(() => {
    return dados.filter(item => item.categoria === filt
(Content truncated due to size limit. Use line ranges to read in chunks)