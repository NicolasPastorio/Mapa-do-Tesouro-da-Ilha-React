# Módulo 6: Índices e Performance

Neste módulo, vamos explorar um aspecto crucial para o desempenho de qualquer banco de dados: os índices. No MongoDB, os índices são estruturas de dados especiais que armazenam uma pequena parte do conjunto de dados de forma fácil de percorrer. Eles são usados para otimizar a velocidade das operações de consulta, permitindo que o MongoDB localize e recupere dados rapidamente sem ter que escanear todos os documentos de uma coleção.

## 6.1 O que são Índices?

Pense em um índice como o índice remissivo de um livro. Em vez de ler o livro inteiro para encontrar um tópico específico, você consulta o índice para encontrar rapidamente a página onde o tópico está localizado. Da mesma forma, um índice no MongoDB armazena o valor de um campo ou conjunto de campos em uma ordem específica, juntamente com uma referência ao documento onde esse valor está armazenado. Isso permite que o MongoDB pule diretamente para os documentos relevantes, em vez de percorrer toda a coleção (um "collection scan").

## 6.2 Tipos de Índices

O MongoDB suporta vários tipos de índices, cada um otimizado para diferentes casos de uso.

### 6.2.1 Índice de Campo Único (Single Field Index)

Este é o tipo mais básico de índice, criado em um único campo. Por padrão, o MongoDB cria um índice único no campo `_id` para cada coleção.

*   **Criar um índice ascendente no campo `email`:**

    ```javascript
    db.funcionarios.createIndex({ email: 1 })
    ```

*   **Criar um índice descendente no campo `salario`:**

    ```javascript
    db.funcionarios.createIndex({ salario: -1 })
    ```

### 6.2.2 Índices Compostos (Compound Indexes)

Um índice composto inclui múltiplos campos. A ordem dos campos no índice é importante, pois afeta a forma como o índice pode ser usado para consultas e ordenações.

*   **Criar um índice composto em `departamento` (ascendente) e `salario` (descendente):**

    ```javascript
    db.funcionarios.createIndex({ departamento: 1, salario: -1 })
    ```

    Este índice pode ser usado para consultas que filtram por `departamento` e/ou `salario`, e também para ordenações que correspondem à ordem dos campos no índice.

### 6.2.3 Índices Multichave (Multikey Indexes)

Se um campo indexado contém um array, o MongoDB cria um índice multichave. Um índice multichave cria uma entrada de índice separada para cada elemento do array.

*   **Criar um índice no campo `habilidades` (que é um array):**

    ```javascript
    db.funcionarios.createIndex({ habilidades: 1 })
    ```

### 6.2.4 Índices de Texto (Text Indexes)

Permitem a busca de texto em campos de string. Você pode criar um índice de texto em um ou mais campos de string em uma coleção.

*   **Criar um índice de texto nos campos `nome` e `sobrenome`:**

    ```javascript
    db.funcionarios.createIndex({ nome: "text", sobrenome: "text" })
    ```

*   **Realizar uma busca de texto:**

    ```javascript
    db.funcionarios.find({ $text: { $search: "Maria" } })
    ```

### 6.2.5 Índices Geoespaciais (Geospatial Indexes)

Suportam consultas em dados de coordenadas geoespaciais (pontos, linhas, polígonos).

*   **Criar um índice 2dsphere em um campo `localizacao` (assumindo que `localizacao` contém dados GeoJSON):**

    ```javascript
    db.lojas.createIndex({ localizacao: "2dsphere" })
    ```

## 6.3 Gerenciando Índices

### 6.3.1 Listar Índices

Para ver todos os índices em uma coleção:

```javascript
db.funcionarios.getIndexes()
```

### 6.3.2 Excluir Índices

*   **Excluir um índice pelo nome:**

    ```javascript
    db.funcionarios.dropIndex("email_1") // O nome do índice é geralmente o nome do campo seguido por _1 ou _-1
    ```

*   **Excluir todos os índices (exceto o _id):**

    ```javascript
    db.funcionarios.dropIndexes()
    ```

## 6.4 Analisando o Desempenho da Consulta com `explain()`

O método `explain()` é uma ferramenta poderosa para entender como o MongoDB executa suas consultas. Ele fornece informações detalhadas sobre o plano de execução da consulta, incluindo quais índices foram usados, o número de documentos escaneados e o tempo de execução.

### Exemplo de uso de `explain()`

```javascript
db.funcionarios.find({ departamento: "TI", salario: { $gt: 6000 } }).explain("executionStats")
```

**Saída de `explain()` (simplificada):**

A saída do `explain()` pode ser complexa, mas alguns campos chave para observar são:

*   `winningPlan.stage`: O estágio principal do plano de execução (e.g., `IXSCAN` para uso de índice, `COLLSCAN` para escaneamento de coleção).
*   `totalDocsExamined`: O número total de documentos que o MongoDB teve que examinar para satisfazer a consulta.
*   `totalKeysExamined`: O número total de chaves de índice que o MongoDB teve que examinar.
*   `executionTimeMillis`: O tempo total de execução da consulta em milissegundos.

**Regra de ouro:** Para uma consulta eficiente, você quer que `totalDocsExamined` e `totalKeysExamined` sejam o mais próximo possível do número de documentos retornados pela consulta. Se `totalDocsExamined` for muito alto e `winningPlan.stage` for `COLLSCAN`, isso indica que a consulta está fazendo um escaneamento completo da coleção e pode se beneficiar de um índice.

## 6.5 Boas Práticas para Índices

*   **Indexar campos frequentemente consultados:** Campos usados em cláusulas `find()`, `sort()`, `group()` e `lookup` são bons candidatos para indexação.
*   **Índices compostos para consultas com múltiplos campos:** A ordem dos campos no índice composto deve corresponder à ordem dos campos na consulta (ou pelo menos os campos mais seletivos primeiro).
*   **Cuidado com a cardinalidade:** Índices em campos com baixa cardinalidade (poucos valores únicos, como `sexo`) podem não ser tão eficazes quanto em campos com alta cardinalidade (muitos valores únicos, como `email`).
*   **Impacto na escrita:** Índices melhoram a leitura, mas podem degradar o desempenho da escrita (inserções, atualizações, exclusões), pois o MongoDB precisa atualizar os índices a cada modificação de documento. Use índices com moderação.
*   **Tamanho dos índices:** Índices consomem espaço em disco e memória RAM. Monitore o tamanho dos seus índices.
*   **Use `explain()`:** Sempre use `explain()` para analisar o desempenho das suas consultas e verificar se os índices estão sendo usados de forma eficaz.

Este módulo forneceu uma compreensão fundamental sobre índices no MongoDB e como eles impactam a performance das suas consultas. O uso inteligente de índices é essencial para construir aplicações escaláveis e de alto desempenho com MongoDB.

