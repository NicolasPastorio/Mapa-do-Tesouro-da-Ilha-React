# Módulo 3: Inserção, Seleção, Atualização e Exclusão de Documentos

Neste módulo, vamos aprender os comandos fundamentais para manipular os documentos dentro das coleções do MongoDB: `insert`, `find`, `update` e `delete`. Estes são os pilares de qualquer operação de banco de dados NoSQL.

## 3.1 Preparação: Selecionando o Banco de Dados e a Coleção

Certifique-se de que você está conectado ao `mongosh` e que o banco de dados `minhaEmpresa` está selecionado. Se não estiver, use os comandos:

```bash
mongosh
```

```javascript
use minhaEmpresa
```

Vamos garantir que temos uma coleção `funcionarios` para trabalhar. Se ela não existir, o MongoDB a criará na primeira inserção.

## 3.2 Inserindo Documentos

O MongoDB oferece vários métodos para inserir documentos em uma coleção: `insertOne()`, `insertMany()` e o método `insert()` (depreciado, mas ainda funcional).

### 3.2.1 `insertOne()`: Inserindo um único documento

Este método insere um único documento em uma coleção. Se o documento não tiver um campo `_id`, o MongoDB adicionará um `ObjectId` único.

```javascript
db.funcionarios.insertOne({
    nome: "João",
    sobrenome: "Silva",
    email: "joao.silva@empresa.com",
    dataContratacao: new Date("2020-01-15"),
    salario: 5000.00,
    departamento: "Vendas"
})
```

### 3.2.2 `insertMany()`: Inserindo múltiplos documentos

Este método insere múltiplos documentos em uma coleção. Ele aceita um array de documentos.

```javascript
db.funcionarios.insertMany([
    {
        nome: "Maria",
        sobrenome: "Souza",
        email: "maria.souza@empresa.com",
        dataContratacao: new Date("2019-07-22"),
        salario: 5800.00,
        departamento: "Marketing"
    },
    {
        nome: "Pedro",
        sobrenome: "Santos",
        email: "pedro.santos@empresa.com",
        dataContratacao: new Date("2021-03-10"),
        salario: 6500.00,
        departamento: "TI"
    },
    {
        nome: "Ana",
        sobrenome: "Oliveira",
        email: "ana.oliveira@empresa.com",
        dataContratacao: new Date("2019-07-22"),
        salario: 5800.00,
        departamento: "Marketing"
    },
    {
        nome: "Carlos",
        sobrenome: "Pereira",
        email: "carlos.pereira@empresa.com",
        dataContratacao: new Date("2022-05-01"),
        salario: 7200.00,
        departamento: "TI"
    }
])
```

## 3.3 Selecionando Documentos (`find()`)

O método `find()` é usado para recuperar documentos de uma coleção. Ele aceita dois argumentos opcionais: um objeto de consulta para filtrar os documentos e um objeto de projeção para especificar quais campos retornar.

### 3.3.1 `find()` sem argumentos: Selecionando todos os documentos

Para selecionar todos os documentos de uma coleção, chame `find()` sem argumentos.

```javascript
db.funcionarios.find()
```

Para uma saída mais formatada e legível, adicione `.pretty()`:

```javascript
db.funcionarios.find().pretty()
```

### 3.3.2 `find()` com objeto de consulta: Filtrando documentos

Para filtrar documentos, passe um objeto de consulta para `find()`. Este objeto especifica os critérios de seleção.

*   **Filtrar por um campo específico:**

    ```javascript
    db.funcionarios.find({ departamento: "TI" })
    ```

*   **Filtrar por múltiplos campos (AND implícito):**

    ```javascript
    db.funcionarios.find({ departamento: "Marketing", salario: 5800.00 })
    ```

*   **Usando operadores de comparação (e.g., `$gt`, `$lt`, `$gte`, `$lte`, `$ne`):**

    ```javascript
    db.funcionarios.find({ salario: { $gt: 6000 } })
    ```

    *   `$gt`: maior que
    *   `$lt`: menor que
    *   `$gte`: maior ou igual a
    *   `$lte`: menor ou igual a
    *   `$ne`: diferente de

*   **Usando operadores lógicos (`$and`, `$or`, `$not`, `$nor`):**

    ```javascript
    db.funcionarios.find({ $or: [{ departamento: "Vendas" }, { departamento: "Marketing" }] })
    ```

*   **Filtrar por arrays (`$in`, `$nin`):**

    ```javascript
    db.funcionarios.find({ departamento: { $in: ["TI", "RH"] } })
    ```

### 3.3.3 `find()` com objeto de projeção: Selecionando campos específicos

O segundo argumento de `find()` é um objeto de projeção, onde você especifica quais campos incluir (`1`) ou excluir (`0`) do resultado. O campo `_id` é incluído por padrão, a menos que você o exclua explicitamente.

```javascript
db.funcionarios.find({}, { nome: 1, sobrenome: 1, salario: 1, _id: 0 })
```

## 3.4 Atualizando Documentos (`updateMany()`, `updateOne()`)

O MongoDB oferece `updateOne()` para atualizar um único documento e `updateMany()` para atualizar múltiplos documentos. O método `update()` é depreciado.

**Cuidado: Sempre use um filtro com `update` para especificar quais documentos devem ser atualizados. Sem um filtro, todos os documentos da coleção podem ser afetados!**

### 3.4.1 `updateOne()`: Atualizando um único documento

Este método aceita dois argumentos: um filtro para encontrar o documento e um objeto de atualização (`$set`, `$inc`, etc.) para especificar as mudanças.

Vamos aumentar o salário de João Silva para 5500.00:

```javascript
db.funcionarios.updateOne(
    { nome: "João", sobrenome: "Silva" },
    { $set: { salario: 5500.00 } }
)
```

### 3.4.2 `updateMany()`: Atualizando múltiplos documentos

Vamos adicionar um campo `status` com o valor "ativo" para todos os funcionários do departamento de Marketing:

```javascript
db.funcionarios.updateMany(
    { departamento: "Marketing" },
    { $set: { status: "ativo" } }
)
```

### 3.4.3 Operadores de Atualização Comuns

*   `$set`: Define o valor de um campo. Se o campo não existir, ele será adicionado.
*   `$inc`: Incrementa o valor de um campo numérico.
*   `$unset`: Remove um campo de um documento.
*   `$push`: Adiciona um elemento a um array.
*   `$pull`: Remove um elemento de um array.

## 3.5 Excluindo Documentos (`deleteOne()`, `deleteMany()`)

O MongoDB oferece `deleteOne()` para excluir um único documento e `deleteMany()` para excluir múltiplos documentos. O método `remove()` é depreciado.

**Cuidado: Assim como no `update`, sempre use um filtro com `delete` para especificar quais documentos devem ser removidos. Sem um filtro, todos os documentos da coleção serão excluídos!**

### 3.5.1 `deleteOne()`: Excluindo um único documento

Vamos excluir o documento de Pedro Santos:

```javascript
db.funcionarios.deleteOne({ nome: "Pedro", sobrenome: "Santos" })
```

### 3.5.2 `deleteMany()`: Excluindo múltiplos documentos

Vamos excluir todos os funcionários do departamento de Vendas:

```javascript
db.funcionarios.deleteMany({ departamento: "Vendas" })
```

### 3.5.3 Excluindo todos os documentos da coleção

Para remover *todos* os documentos de uma coleção, passe um objeto de filtro vazio `{}` para `deleteMany()`.

```javascript
db.funcionarios.deleteMany({})
```

Este módulo cobriu as operações CRUD (Create, Read, Update, Delete) essenciais para manipular documentos em suas coleções MongoDB. No próximo módulo, vamos aprofundar na seleção de dados com filtragem e ordenação avançadas.

