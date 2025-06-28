# Módulo 2: Comandos Básicos de Manipulação de Banco de Dados e Tabelas

Neste módulo, vamos explorar os comandos essenciais para criar, selecionar, modificar e excluir bancos de dados e tabelas no MySQL, tudo diretamente do terminal.

## 2.1 Conectando ao MySQL

Antes de começar, certifique-se de estar conectado ao servidor MySQL. Use o usuário que você criou no módulo anterior (ou o `root` se preferir, mas não é recomendado para o dia a dia):

```bash
mysql -u dev_user -p
```

Após inserir sua senha, você verá o prompt `mysql>`, indicando que está pronto para executar comandos SQL.

## 2.2 Gerenciando Bancos de Dados

### 2.2.1 Listar Bancos de Dados Existentes

Para ver todos os bancos de dados disponíveis no seu servidor MySQL, use o comando `SHOW DATABASES;`:

```sql
SHOW DATABASES;
```

Você verá uma lista de bancos de dados, incluindo os bancos de dados do sistema como `information_schema`, `mysql`, `performance_schema` e `sys`.

### 2.2.2 Criar um Novo Banco de Dados

Para criar um novo banco de dados, use o comando `CREATE DATABASE;`. Vamos criar um banco de dados chamado `minha_empresa`:

```sql
CREATE DATABASE minha_empresa;
```

É uma boa prática usar nomes de bancos de dados em letras minúsculas e sem espaços, usando underscores para separar palavras.

### 2.2.3 Selecionar um Banco de Dados para Uso

Antes de poder criar tabelas ou manipular dados, você precisa selecionar o banco de dados com o qual deseja trabalhar. Use o comando `USE;`:

```sql
USE minha_empresa;
```

O prompt mudará para `Database changed`, indicando que você está agora no contexto do banco de dados `minha_empresa`.

### 2.2.4 Excluir um Banco de Dados

Para remover um banco de dados (e todos os seus dados e tabelas), use o comando `DROP DATABASE;`. **Cuidado: esta operação é irreversível!**

```sql
DROP DATABASE minha_empresa;
```

## 2.3 Gerenciando Tabelas

Com um banco de dados selecionado, podemos começar a criar e manipular tabelas.

### 2.3.1 Criar uma Nova Tabela

Para criar uma tabela, usamos o comando `CREATE TABLE;`. Você precisa definir o nome da tabela e as colunas, juntamente com seus tipos de dados e quaisquer restrições.

Vamos criar uma tabela chamada `funcionarios` dentro do banco de dados `minha_empresa` (certifique-se de que `minha_empresa` esteja selecionado com `USE minha_empresa;`):

```sql
CREATE TABLE funcionarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    data_contratacao DATE,
    salario DECIMAL(10, 2)
);
```

**Explicação dos tipos de dados e restrições:**

*   `INT`: Tipo de dado para números inteiros.
*   `PRIMARY KEY`: Define a coluna `id` como chave primária, garantindo que cada `id` seja único e não nulo.
*   `AUTO_INCREMENT`: Atribui automaticamente um valor sequencial único para a coluna `id` a cada nova linha inserida.
*   `VARCHAR(100)`: Tipo de dado para strings de comprimento variável, com um máximo de 100 caracteres.
*   `NOT NULL`: Garante que a coluna não pode ter um valor nulo.
*   `VARCHAR(255) UNIQUE`: Garante que o valor na coluna `email` seja único em toda a tabela.
*   `DATE`: Tipo de dado para datas no formato 'YYYY-MM-DD'.
*   `DECIMAL(10, 2)`: Tipo de dado para números decimais, com um total de 10 dígitos, sendo 2 deles após o ponto decimal.

### 2.3.2 Listar Tabelas em um Banco de Dados

Para ver todas as tabelas no banco de dados atualmente selecionado, use `SHOW TABLES;`:

```sql
SHOW TABLES;
```

### 2.3.3 Descrever a Estrutura de uma Tabela

Para ver a estrutura de uma tabela (colunas, tipos de dados, chaves, etc.), use `DESCRIBE;` ou `DESC;`:

```sql
DESCRIBE funcionarios;
-- ou
DESC funcionarios;
```

### 2.3.4 Alterar a Estrutura de uma Tabela (ALTER TABLE)

Você pode modificar a estrutura de uma tabela existente usando o comando `ALTER TABLE;`.

*   **Adicionar uma nova coluna:**

    Vamos adicionar uma coluna `departamento` à tabela `funcionarios`:

    ```sql
    ALTER TABLE funcionarios
    ADD COLUMN departamento VARCHAR(50);
    ```

*   **Modificar uma coluna existente:**

    Vamos mudar o tipo de dado da coluna `departamento` para permitir mais caracteres:

    ```sql
    ALTER TABLE funcionarios
    MODIFY COLUMN departamento VARCHAR(100);
    ```

*   **Renomear uma coluna:**

    Vamos renomear `departamento` para `setor`:

    ```sql
    ALTER TABLE funcionarios
    CHANGE COLUMN departamento setor VARCHAR(100);
    ```

*   **Excluir uma coluna:**

    Vamos remover a coluna `setor`:

    ```sql
    ALTER TABLE funcionarios
    DROP COLUMN setor;
    ```

### 2.3.5 Renomear uma Tabela

Para renomear uma tabela, use `RENAME TABLE;`:

```sql
RENAME TABLE funcionarios TO empregados;
```

### 2.3.6 Excluir uma Tabela

Para remover uma tabela (e todos os seus dados), use `DROP TABLE;`. **Cuidado: esta operação é irreversível!**

```sql
DROP TABLE empregados;
```

Este módulo cobriu os fundamentos da manipulação de bancos de dados e tabelas. No próximo módulo, vamos aprender a inserir, selecionar, atualizar e excluir dados dentro dessas tabelas.

