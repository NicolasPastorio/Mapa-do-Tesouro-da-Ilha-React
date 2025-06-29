# Módulo 5: Operadores de Projeção e Agregação

Neste módulo, vamos explorar como moldar a saída de suas consultas usando operadores de projeção e, em seguida, mergulhar no poderoso framework de agregação do MongoDB, que permite processar dados de forma complexa e retornar resultados computados.

## 5.1 Operadores de Projeção

Como vimos brevemente no Módulo 3, a projeção permite especificar quais campos devem ser retornados nos documentos resultantes de uma consulta. Além de simplesmente incluir (`1`) ou excluir (`0`) campos, existem operadores de projeção mais avançados.

### 5.1.1 Preparação: Dados de Exemplo

Continuaremos usando a coleção `funcionarios` com os dados populados do módulo anterior. Se necessário, reconecte-se ao `mongosh` e certifique-se de que o banco de dados `minhaEmpresa` esteja selecionado.

```bash
mongosh
```

```javascript
use minhaEmpresa
```

### 5.1.2 Projeção de Campos Aninhados

Você pode projetar campos dentro de documentos aninhados usando a notação de ponto.

Suponha que um funcionário tenha um campo `endereco` com `rua`, `numero` e `cidade`.

```javascript
// Exemplo de documento com campo aninhado
// db.funcionarios.insertOne({ nome: "Teste", endereco: { rua: "Rua A", numero: 123, cidade: "Cidade B" }})

db.funcionarios.find({}, { "endereco.cidade": 1, nome: 1, _id: 0 })
```

### 5.1.3 Projeção de Elementos de Array

*   `$elemMatch`: Retorna apenas o primeiro elemento de um array que corresponde a uma condição.

    ```javascript
    db.funcionarios.find(
        { departamento: "TI" },
        { habilidades: { $elemMatch: { $eq: "programação" } }, nome: 1, _id: 0 }
    )
    ```

*   `$slice`: Retorna um subconjunto de um array.

    ```javascript
    // Retorna os 2 primeiros elementos do array habilidades
    db.funcionarios.find({}, { habilidades: { $slice: 2 }, nome: 1, _id: 0 })

    // Retorna os 2 últimos elementos do array habilidades
    db.funcionarios.find({}, { habilidades: { $slice: -2 }, nome: 1, _id: 0 })

    // Retorna 1 elemento a partir do índice 1 (segundo elemento)
    db.funcionarios.find({}, { habilidades: { $slice: [1, 1] }, nome: 1, _id: 0 })
    ```

## 5.2 Framework de Agregação

O framework de agregação do MongoDB é uma ferramenta poderosa para processar documentos e retornar resultados computados. Ele funciona através de um pipeline de estágios, onde cada estágio transforma os documentos à medida que eles passam pelo pipeline. Os estágios mais comuns são `$match`, `$group`, `$project`, `$sort`, `$limit`, `$skip`.

### 5.2.1 `$match`: Filtragem de Documentos

O estágio `$match` filtra documentos para passar apenas aqueles que correspondem às condições especificadas para o próximo estágio do pipeline. É semelhante à cláusula `WHERE` em SQL.

```javascript
db.funcionarios.aggregate([
    { $match: { departamento: "TI" } }
])
```

### 5.2.2 `$group`: Agrupamento de Documentos

O estágio `$group` agrupa documentos por um campo especificado e pode ser usado para realizar operações de agregação (soma, média, contagem, etc.) nos documentos agrupados. É semelhante à cláusula `GROUP BY` em SQL.

*   **Contar funcionários por departamento:**

    ```javascript
    db.funcionarios.aggregate([
        { $group: { _id: "$departamento", totalFuncionarios: { $count: {} } } }
    ])
    ```

    **Explicação:**
    *   `_id: "$departamento"`: Agrupa os documentos pelo valor do campo `departamento`. O `$` indica que `departamento` é um campo do documento.
    *   `totalFuncionarios: { $count: {} }`: Cria um novo campo `totalFuncionarios` que conta o número de documentos em cada grupo.

*   **Salário médio por departamento:**

    ```javascript
    db.funcionarios.aggregate([
        { $group: { _id: "$departamento", salarioMedio: { $avg: "$salario" } } }
    ])
    ```

    **Operadores de Acumulador Comuns:**
    *   `$sum`: Calcula a soma dos valores.
    *   `$avg`: Calcula a média dos valores.
    *   `$min`: Retorna o valor mínimo.
    *   `$max`: Retorna o valor máximo.
    *   `$push`: Adiciona um valor a um array no documento de saída.
    *   `$first`, `$last`: Retorna o primeiro/último valor em um grupo.

### 5.2.3 `$project`: Remodelando Documentos

O estágio `$project` passa para o próximo estágio apenas os campos especificados. Ele também pode adicionar novos campos calculados ou remodelar a estrutura dos documentos. É semelhante à seleção de colunas em SQL.

```javascript
db.funcionarios.aggregate([
    { $project: { nomeCompleto: { $concat: ["$nome", " ", "$sobrenome"] }, salario: 1, _id: 0 } }
])
```

### 5.2.4 `$sort`: Ordenação de Documentos

O estágio `$sort` ordena os documentos. É semelhante ao método `sort()`.

```javascript
db.funcionarios.aggregate([
    { $sort: { salario: -1 } }
])
```

### 5.2.5 `$limit` e `$skip`: Paginação

Estes estágios funcionam exatamente como os métodos `limit()` e `skip()`.

```javascript
db.funcionarios.aggregate([
    { $sort: { salario: -1 } },
    { $skip: 2 },
    { $limit: 3 }
])
```

### 5.2.6 Exemplo de Pipeline Completo

Vamos encontrar o salário médio dos funcionários por departamento, mas apenas para departamentos com mais de 2 funcionários, e ordenar pelo salário médio em ordem decrescente.

```javascript
db.funcionarios.aggregate([
    { $group: { _id: "$departamento", salarioMedio: { $avg: "$salario" }, totalFuncionarios: { $count: {} } } },
    { $match: { totalFuncionarios: { $gt: 2 } } },
    { $sort: { salarioMedio: -1 } },
    { $project: { departamento: "$_id", salarioMedio: 1, _id: 0 } }
])
```

**Fluxo do Pipeline:**

1.  `$group`: Agrupa os documentos por `departamento`, calcula o `salarioMedio` e `totalFuncionarios` para cada grupo.
2.  `$match`: Filtra os grupos, mantendo apenas aqueles onde `totalFuncionarios` é maior que 2.
3.  `$sort`: Ordena os grupos restantes pelo `salarioMedio` em ordem decrescente.
4.  `$project`: Remodela os documentos de saída, renomeando `_id` para `departamento` e incluindo `salarioMedio`.

## 5.3 `$lookup`: Joins em MongoDB (Agregação)

Embora o MongoDB seja um banco de dados NoSQL e não use `JOIN`s relacionais, o estágio `$lookup` no pipeline de agregação permite realizar operações de junção semelhantes a `LEFT OUTER JOIN` entre coleções.

### Exemplo: Juntar Funcionários com Informações de Projetos

Suponha que temos uma coleção `projetos`:

```javascript
// Inserir alguns projetos
db.projetos.insertMany([
    { _id: 1, nomeProjeto: "Campanha de Marketing", departamentoResponsavel: "Marketing" },
    { _id: 2, nomeProjeto: "Desenvolvimento de API", departamentoResponsavel: "TI" },
    { _id: 3, nomeProjeto: "Recrutamento de Verão", departamentoResponsavel: "RH" }
]);
```

Agora, vamos juntar funcionários com os projetos em que seus departamentos estão envolvidos.

```javascript
db.funcionarios.aggregate([
    {
        $lookup: {
            from: "projetos",
            localField: "departamento",
            foreignField: "departamentoResponsavel",
            as: "projetosDoDepartamento"
        }
    }
])
```

**Explicação:**

*   `from`: A coleção na qual realizar o `join` (`projetos`).
*   `localField`: O campo da coleção de entrada (`funcionarios`) (`departamento`).
*   `foreignField`: O campo da coleção `from` (`projetos`) (`departamentoResponsavel`).
*   `as`: O nome do novo campo de array a ser adicionado aos documentos de entrada. Este array conterá os documentos correspondentes da coleção `from`.

Este estágio adicionará um array `projetosDoDepartamento` a cada documento de funcionário, contendo os projetos cujo `departamentoResponsavel` corresponde ao `departamento` do funcionário.

Este módulo forneceu uma visão aprofundada dos operadores de projeção e do framework de agregação, ferramentas essenciais para consultas complexas e análise de dados no MongoDB. No próximo módulo, abordaremos a criação de índices para otimizar a performance das suas consultas.

