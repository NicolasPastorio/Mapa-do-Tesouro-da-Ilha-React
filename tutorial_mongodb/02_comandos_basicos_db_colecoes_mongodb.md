# Módulo 2: Comandos Básicos de Banco de Dados e Coleções

Neste módulo, vamos explorar os comandos essenciais para criar, selecionar, e manipular bancos de dados e coleções no MongoDB, tudo diretamente do terminal usando o `mongosh`.

## 2.1 Conectando ao MongoDB

Antes de começar, certifique-se de estar conectado ao servidor MongoDB. Abra o terminal e digite:

```bash
mongosh
```

Você verá o prompt `test>`, indicando que está conectado e no banco de dados padrão `test`.

## 2.2 Gerenciando Bancos de Dados

No MongoDB, um banco de dados é criado implicitamente quando você insere dados em uma coleção pela primeira vez dentro desse banco de dados. No entanto, você pode "selecionar" um banco de dados para trabalhar com ele.

### 2.2.1 Listar Bancos de Dados Existentes

Para ver todos os bancos de dados disponíveis no seu servidor MongoDB, use o comando `show dbs`:

```javascript
show dbs
```

Você verá uma lista de bancos de dados, incluindo os bancos de dados do sistema como `admin`, `config` e `local`.

### 2.2.2 Selecionar/Criar um Banco de Dados

Para selecionar um banco de dados para trabalhar, use o comando `use <nome_do_banco_de_dados>`. Se o banco de dados não existir, o MongoDB o criará quando você inserir o primeiro documento nele.

Vamos selecionar (e implicitamente criar, se não existir) um banco de dados chamado `minhaEmpresa`:

```javascript
use minhaEmpresa
```

O prompt mudará para `minhaEmpresa>`, indicando que você está agora no contexto do banco de dados `minhaEmpresa`.

### 2.2.3 Excluir um Banco de Dados

Para remover o banco de dados atualmente selecionado (e todas as suas coleções e documentos), use o comando `db.dropDatabase()`. **Cuidado: esta operação é irreversível!**

```javascript
db.dropDatabase()
```

## 2.3 Gerenciando Coleções

No MongoDB, os documentos são armazenados em coleções, que são análogas às tabelas em bancos de dados relacionais. Assim como os bancos de dados, as coleções são criadas implicitamente quando você insere o primeiro documento nelas.

### 2.3.1 Listar Coleções em um Banco de Dados

Para ver todas as coleções no banco de dados atualmente selecionado, use `show collections`:

```javascript
show collections
```

### 2.3.2 Criar uma Nova Coleção (Explícita)

Embora as coleções sejam criadas implicitamente, você pode criá-las explicitamente usando `db.createCollection()`. Isso é útil se você quiser definir opções específicas para a coleção, como validação de esquema ou tamanho máximo (para coleções capped).

Vamos criar uma coleção chamada `funcionarios`:

```javascript
db.createCollection("funcionarios")
```

### 2.3.3 Renomear uma Coleção

Para renomear uma coleção, use o método `renameCollection()` na coleção que você deseja renomear.

```javascript
db.funcionarios.renameCollection("colaboradores")
```

### 2.3.4 Excluir uma Coleção

Para remover uma coleção (e todos os seus documentos), use o método `drop()` na coleção que você deseja excluir. **Cuidado: esta operação é irreversível!**

```javascript
db.colaboradores.drop()
```

## 2.4 Inserindo o Primeiro Documento (Criação Implícita)

Para demonstrar a criação implícita de um banco de dados e uma coleção, vamos inserir um documento na coleção `produtos` dentro do banco de dados `loja`.

Primeiro, mude para o banco de dados `loja`:

```javascript
use loja
```

Agora, insira um documento na coleção `produtos`. Se `loja` e `produtos` não existirem, eles serão criados.

```javascript
db.produtos.insertOne({
    nome: "Laptop",
    marca: "Dell",
    preco: 1200,
    quantidade: 50
})
```

Após a inserção, você pode verificar se o banco de dados `loja` e a coleção `produtos` foram criados:

```javascript
show dbs
show collections
```

Este módulo cobriu os fundamentos da manipulação de bancos de dados e coleções no MongoDB. No próximo módulo, vamos aprender a inserir, selecionar, atualizar e excluir documentos dentro dessas coleções.

