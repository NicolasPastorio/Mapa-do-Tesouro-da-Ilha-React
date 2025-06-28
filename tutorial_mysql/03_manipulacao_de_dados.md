# Módulo 3: Inserção, Seleção, Atualização e Exclusão de Dados

Neste módulo, vamos aprender os comandos fundamentais para manipular os dados dentro das tabelas do MySQL: `INSERT`, `SELECT`, `UPDATE` e `DELETE`. Estes são os pilares de qualquer operação de banco de dados.

## 3.1 Preparação: Selecionando o Banco de Dados e Criando a Tabela

Certifique-se de que você está conectado ao MySQL e que o banco de dados `minha_empresa` está selecionado. Se não estiver, use os comandos:

```bash
mysql -u dev_user -p
```

```sql
USE minha_empresa;
```

Vamos recriar a tabela `funcionarios` para este módulo, caso você a tenha excluído ou modificado no módulo anterior. Se ela já existir, você pode excluí-la primeiro com `DROP TABLE IF EXISTS funcionarios;`.

```sql
DROP TABLE IF EXISTS funcionarios;
CREATE TABLE funcionarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    data_contratacao DATE,
    salario DECIMAL(10, 2)
);
```

## 3.2 Inserindo Dados (INSERT)

O comando `INSERT INTO` é usado para adicionar novas linhas (registros) a uma tabela.

### 3.2.1 Inserindo todos os valores

Você pode inserir valores para todas as colunas da tabela na ordem em que foram definidas. Não é necessário especificar a coluna `id` se ela for `AUTO_INCREMENT`.

```sql
INSERT INTO funcionarios (nome, sobrenome, email, data_contratacao, salario)
VALUES ('João', 'Silva', 'joao.silva@empresa.com', '2020-01-15', 5000.00);
```

### 3.2.2 Inserindo valores para colunas específicas

Você pode inserir dados apenas para algumas colunas, desde que as colunas `NOT NULL` sejam preenchidas. As colunas omitidas receberão o valor `NULL` ou seu valor padrão, se definido.

```sql
INSERT INTO funcionarios (nome, sobrenome, email)
VALUES ('Maria', 'Souza', 'maria.souza@empresa.com');
```

### 3.2.3 Inserindo múltiplas linhas

Você pode inserir várias linhas em uma única instrução `INSERT` separando os conjuntos de valores por vírgulas.

```sql
INSERT INTO funcionarios (nome, sobrenome, email, data_contratacao, salario)
VALUES
    ('Pedro', 'Santos', 'pedro.santos@empresa.com', '2021-03-10', 6500.00),
    ('Ana', 'Oliveira', 'ana.oliveira@empresa.com', '2019-07-22', 5800.00),
    ('Carlos', 'Pereira', 'carlos.pereira@empresa.com', '2022-05-01', 7200.00);
```

## 3.3 Selecionando Dados (SELECT)

O comando `SELECT` é usado para recuperar dados de uma ou mais tabelas. É o comando mais utilizado em SQL.

### 3.3.1 Selecionando todas as colunas

Para selecionar todas as colunas de uma tabela, use o asterisco (`*`).

```sql
SELECT * FROM funcionarios;
```

### 3.3.2 Selecionando colunas específicas

Para selecionar apenas algumas colunas, liste os nomes das colunas separados por vírgulas.

```sql
SELECT nome, sobrenome, salario FROM funcionarios;
```

### 3.3.3 Usando ALIAS para colunas

Você pode dar um nome temporário (alias) a uma coluna ou tabela para facilitar a leitura do resultado.

```sql
SELECT nome AS PrimeiroNome, sobrenome AS UltimoNome, salario FROM funcionarios;
```

## 3.4 Atualizando Dados (UPDATE)

O comando `UPDATE` é usado para modificar dados existentes em uma ou mais linhas de uma tabela.

**Cuidado: Sempre use a cláusula `WHERE` com `UPDATE` para especificar quais linhas devem ser atualizadas. Sem `WHERE`, todas as linhas da tabela serão atualizadas!**

### 3.4.1 Atualizando uma única coluna

Vamos aumentar o salário de João Silva (id=1) para 5500.00:

```sql
UPDATE funcionarios
SET salario = 5500.00
WHERE id = 1;
```

### 3.4.2 Atualizando múltiplas colunas

Vamos atualizar o email e a data de contratação de Maria Souza (id=2):

```sql
UPDATE funcionarios
SET email = 'maria.souza.nova@empresa.com', data_contratacao = '2020-02-01'
WHERE id = 2;
```

## 3.5 Excluindo Dados (DELETE)

O comando `DELETE FROM` é usado para remover linhas existentes de uma tabela.

**Cuidado: Assim como no `UPDATE`, sempre use a cláusula `WHERE` com `DELETE` para especificar quais linhas devem ser removidas. Sem `WHERE`, todas as linhas da tabela serão excluídas!**

### 3.5.1 Excluindo uma única linha

Vamos excluir o registro de Pedro Santos (id=3):

```sql
DELETE FROM funcionarios
WHERE id = 3;
```

### 3.5.2 Excluindo múltiplas linhas com uma condição

Vamos excluir todos os funcionários contratados antes de 2020:

```sql
DELETE FROM funcionarios
WHERE data_contratacao < '2020-01-01';
```

### 3.5.3 Excluindo todos os dados da tabela (TRUNCATE TABLE)

Se você precisar remover *todos* os dados de uma tabela, mas manter a estrutura da tabela (e redefinir `AUTO_INCREMENT`), `TRUNCATE TABLE` é mais eficiente que `DELETE FROM` sem `WHERE`.

```sql
TRUNCATE TABLE funcionarios;
```

**Diferença entre `DELETE FROM tabela;` e `TRUNCATE TABLE tabela;`:**

*   `DELETE FROM tabela;`: Remove todas as linhas uma por uma. É mais lento para tabelas grandes e mantém o contador `AUTO_INCREMENT` (a próxima inserção continuará a partir do último ID). Pode ser revertido (ROLLBACK) se estiver dentro de uma transação.
*   `TRUNCATE TABLE tabela;`: Remove todas as linhas rapidamente, recria a tabela internamente e redefine o contador `AUTO_INCREMENT` para 1. Não pode ser revertido (ROLLBACK).

Este módulo cobriu as operações CRUD (Create, Read, Update, Delete) essenciais para manipular dados em suas tabelas MySQL. No próximo módulo, vamos aprofundar na seleção de dados com filtragem e ordenação avançadas.

