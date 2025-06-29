# Módulo 4: Filtragem e Ordenação de Documentos

Neste módulo, vamos aprofundar no método `find()` para recuperar documentos de forma mais específica, utilizando operadores de consulta avançados para filtrar e o método `sort()` para ordenar os resultados.

## 4.1 Preparação: Dados de Exemplo

Para este módulo, vamos usar a coleção `funcionarios` que criamos anteriormente. Certifique-se de que ela esteja populada com alguns dados. Se necessário, conecte-se ao `mongosh` e execute os comandos abaixo para popular a coleção:

```bash
mongosh
```

```javascript
use minhaEmpresa

db.funcionarios.deleteMany({}); // Limpa a coleção para começar do zero

db.funcionarios.insertMany([
    {
        nome: "João",
        sobrenome: "Silva",
        email: "joao.silva@empresa.com",
        dataContratacao: new Date("2020-01-15T00:00:00Z"),
        salario: 5000.00,
        departamento: "Vendas",
        habilidades: ["comunicação", "negociação"]
    },
    {
        nome: "Maria",
        sobrenome: "Souza",
        email: "maria.souza@empresa.com",
        dataContratacao: new Date("2019-07-22T00:00:00Z"),
        salario: 5800.00,
        departamento: "Marketing",
        habilidades: ["criatividade", "mídias sociais"]
    },
    {
        nome: "Pedro",
        sobrenome: "Santos",
        email: "pedro.santos@empresa.com",
        dataContratacao: new Date("2021-03-10T00:00:00Z"),
        salario: 6500.00,
        departamento: "TI",
        habilidades: ["programação", "banco de dados"]
    },
    {
        nome: "Ana",
        sobrenome: "Oliveira",
        email: "ana.oliveira@empresa.com",
        dataContratacao: new Date("2019-07-22T00:00:00Z"),
        salario: 5800.00,
        departamento: "Marketing",
        habilidades: ["análise de dados"]
    },
    {
        nome: "Carlos",
        sobrenome: "Pereira",
        email: "carlos.pereira@empresa.com",
        dataContratacao: new Date("2022-05-01T00:00:00Z"),
        salario: 7200.00,
        departamento: "TI",
        habilidades: ["redes", "segurança"]
    },
    {
        nome: "Fernanda",
        sobrenome: "Lima",
        email: "fernanda.lima@empresa.com",
        dataContratacao: new Date("2020-11-01T00:00:00Z"),
        salario: 4800.00,
        departamento: "Vendas",
        habilidades: ["vendas", "CRM"]
    },
    {
        nome: "Rafael",
        sobrenome: "Costa",
        email: "rafael.costa@empresa.com",
        dataContratacao: new Date("2018-09-01T00:00:00Z"),
        salario: 8000.00,
        departamento: "TI",
        habilidades: ["cloud", "devops"]
    },
    {
        nome: "Juliana",
        sobrenome: "Almeida",
        email: "juliana.almeida@empresa.com",
        dataContratacao: new Date("2023-02-10T00:00:00Z"),
        salario: 5200.00,
        departamento: "RH",
        habilidades: ["recrutamento", "treinamento"]
    }
]);
```

## 4.2 Filtrando Documentos com Operadores de Consulta

Além dos operadores de comparação básicos (`$gt`, `$lt`, etc.) e lógicos (`$or`, `$and`) que vimos no Módulo 3, o MongoDB oferece uma rica variedade de operadores para consultas mais complexas.

### 4.2.1 Operadores de Elemento

*   `$exists`: Verifica se um campo existe ou não.

    ```javascript
    db.funcionarios.find({ habilidades: { $exists: true } })
    ```

*   `$type`: Seleciona documentos onde o valor de um campo é de um tipo BSON específico.

    ```javascript
    db.funcionarios.find({ salario: { $type: "double" } })
    ```

### 4.2.2 Operadores de Avaliação

*   `$regex`: Permite usar expressões regulares para buscar padrões em strings.

    ```javascript
    db.funcionarios.find({ email: { $regex: /@empresa\.com$/ } })
    ```

*   `$where`: Permite executar JavaScript para filtrar documentos. Use com cautela, pois pode ser lento.

    ```javascript
    db.funcionarios.find({ $where: "this.salario > 6000 && this.departamento == 'TI'" })
    ```

### 4.2.3 Operadores de Array

*   `$all`: Seleciona documentos onde o valor de um campo é um array que contém todos os elementos especificados.

    ```javascript
    db.funcionarios.find({ habilidades: { $all: ["programação", "banco de dados"] } })
    ```

*   `$size`: Seleciona documentos onde o array tem um número específico de elementos.

    ```javascript
    db.funcionarios.find({ habilidades: { $size: 2 } })
    ```

*   `$elemMatch`: Seleciona documentos se um elemento em um array corresponde a todas as condições de consulta especificadas.

    ```javascript
    db.funcionarios.find({ habilidades: { $elemMatch: { $eq: "programação" } } })
    ```

## 4.3 Ordenando Documentos com `sort()`

O método `sort()` é usado para classificar os documentos retornados por uma consulta. Ele aceita um objeto onde os campos são especificados com `1` para ordem crescente e `-1` para ordem decrescente.

### 4.3.1 Ordenação Simples

*   **Ordenar por salário crescente:**

    ```javascript
    db.funcionarios.find().sort({ salario: 1 })
    ```

*   **Ordenar por data de contratação decrescente:**

    ```javascript
    db.funcionarios.find().sort({ dataContratacao: -1 })
    ```

### 4.3.2 Ordenação por Múltiplos Campos

Você pode ordenar por vários campos. A ordenação será aplicada no primeiro campo, e se houver valores iguais, o segundo campo será usado para desempate, e assim por diante.

```javascript
db.funcionarios.find().sort({ departamento: 1, salario: -1 })
```

## 4.4 Limitando e Pulando Resultados com `limit()` e `skip()`

### 4.4.1 `limit()`: Restringindo o número de documentos

O método `limit()` restringe o número de documentos retornados pela consulta. É útil para paginação ou para obter apenas os primeiros N resultados.

Para obter os 3 funcionários com os maiores salários:

```javascript
db.funcionarios.find().sort({ salario: -1 }).limit(3)
```

### 4.4.2 `skip()`: Pulando documentos

O método `skip()` pula um certo número de documentos antes de começar a retornar os resultados. É usado em conjunto com `limit()` para implementar paginação.

Para obter os próximos 3 funcionários após os 3 primeiros (segunda página, se cada página tiver 3 resultados):

```javascript
db.funcionarios.find().sort({ salario: -1 }).skip(3).limit(3)
```

## 4.5 Contando Documentos com `countDocuments()` e `estimatedDocumentCount()`

*   `countDocuments()`: Retorna o número de documentos que correspondem a um filtro.

    ```javascript
    db.funcionarios.countDocuments({ departamento: "TI" })
    ```

*   `estimatedDocumentCount()`: Retorna uma contagem rápida do número total de documentos na coleção, sem aplicar nenhum filtro. É mais rápido para grandes coleções, mas pode não ser preciso.

    ```javascript
    db.funcionarios.estimatedDocumentCount()
    ```

Este módulo cobriu técnicas avançadas de filtragem, ordenação e limitação de resultados no MongoDB. No próximo módulo, exploraremos os operadores de projeção e o poderoso framework de agregação.

