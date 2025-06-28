# Módulo 4: Filtragem e Ordenação de Dados (WHERE, ORDER BY, LIMIT)

Neste módulo, vamos aprofundar no comando `SELECT` para recuperar dados de forma mais específica, utilizando as cláusulas `WHERE` para filtrar, `ORDER BY` para ordenar e `LIMIT` para restringir o número de resultados.

## 4.1 Preparação: Dados de Exemplo

Para este módulo, vamos usar a tabela `funcionarios` que criamos anteriormente. Certifique-se de que ela esteja populada com alguns dados. Se necessário, conecte-se ao MySQL e execute os comandos abaixo:

```bash
mysql -u dev_user -p
```

```sql
USE minha_empresa;

DROP TABLE IF EXISTS funcionarios;
CREATE TABLE funcionarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    data_contratacao DATE,
    salario DECIMAL(10, 2),
    departamento VARCHAR(50)
);

INSERT INTO funcionarios (nome, sobrenome, email, data_contratacao, salario, departamento)
VALUES
    ("João", "Silva", "joao.silva@empresa.com", "2020-01-15", 5000.00, "Vendas"),
    ("Maria", "Souza", "maria.souza@empresa.com", "2019-07-22", 5800.00, "Marketing"),
    ("Pedro", "Santos", "pedro.santos@empresa.com", "2021-03-10", 6500.00, "TI"),
    ("Ana", "Oliveira", "ana.oliveira@empresa.com", "2019-07-22", 5800.00, "Marketing"),
    ("Carlos", "Pereira", "carlos.pereira@empresa.com", "2022-05-01", 7200.00, "TI"),
    ("Fernanda", "Lima", "fernanda.lima@empresa.com", "2020-11-01", 4800.00, "Vendas"),
    ("Rafael", "Costa", "rafael.costa@empresa.com", "2018-09-01", 8000.00, "TI"),
    ("Juliana", "Almeida", "juliana.almeida@empresa.com", "2023-02-10", 5200.00, "RH");
```

## 4.2 Filtrando Dados com WHERE

A cláusula `WHERE` é usada para especificar uma condição para filtrar os registros. Somente as linhas que satisfazem a condição serão incluídas no resultado.

### 4.2.1 Operadores de Comparação

*   **Igual a (`=`):**

    ```sql
    SELECT * FROM funcionarios WHERE departamento = "TI";
    ```

*   **Diferente de (`!=` ou `<>`):**

    ```sql
    SELECT * FROM funcionarios WHERE departamento != "Vendas";
    ```

*   **Maior que (`>`):**

    ```sql
    SELECT nome, salario FROM funcionarios WHERE salario > 6000;
    ```

*   **Menor que (`<`):**

    ```sql
    SELECT nome, salario FROM funcionarios WHERE salario < 5000;
    ```

*   **Maior ou igual a (`>=`):**

    ```sql
    SELECT nome, salario FROM funcionarios WHERE salario >= 7000;
    ```

*   **Menor ou igual a (`<=`):**

    ```sql
    SELECT nome, salario FROM funcionarios WHERE salario <= 5000;
    ```

### 4.2.2 Operadores Lógicos (AND, OR, NOT)

Você pode combinar múltiplas condições usando operadores lógicos.

*   **AND:** Retorna `TRUE` se todas as condições forem `TRUE`.

    ```sql
    SELECT * FROM funcionarios WHERE departamento = "TI" AND salario > 7000;
    ```

*   **OR:** Retorna `TRUE` se pelo menos uma das condições for `TRUE`.

    ```sql
    SELECT * FROM funcionarios WHERE departamento = "Vendas" OR departamento = "Marketing";
    ```

*   **NOT:** Nega a condição.

    ```sql
    SELECT * FROM funcionarios WHERE NOT departamento = "RH";
    ```

### 4.2.3 Operadores Especiais

*   **BETWEEN:** Seleciona valores dentro de um determinado intervalo (inclusive).

    ```sql
    SELECT nome, salario FROM funcionarios WHERE salario BETWEEN 5000 AND 6000;
    ```

*   **LIKE:** Usado para buscar padrões em strings. `%` representa zero ou mais caracteres, `_` representa um único caractere.

    ```sql
    SELECT nome, sobrenome FROM funcionarios WHERE nome LIKE "J%"; -- Nomes que começam com J
    SELECT nome, sobrenome FROM funcionarios WHERE sobrenome LIKE "%a"; -- Sobrenomes que terminam com a
    SELECT nome, sobrenome FROM funcionarios WHERE email LIKE "%@empresa.com%"; -- Emails da empresa
    ```

*   **IN:** Permite especificar múltiplos valores possíveis para uma coluna.

    ```sql
    SELECT * FROM funcionarios WHERE departamento IN ("TI", "RH");
    ```

*   **IS NULL / IS NOT NULL:** Verifica se um valor é nulo ou não nulo.

    ```sql
    SELECT * FROM funcionarios WHERE email IS NULL;
    SELECT * FROM funcionarios WHERE email IS NOT NULL;
    ```

## 4.3 Ordenando Dados com ORDER BY

A cláusula `ORDER BY` é usada para classificar o conjunto de resultados de uma consulta em ordem crescente (ASC) ou decrescente (DESC).

*   **Ordem Crescente (ASC - padrão):**

    ```sql
    SELECT nome, salario FROM funcionarios ORDER BY salario ASC;
    -- ou simplesmente
    SELECT nome, salario FROM funcionarios ORDER BY salario;
    ```

*   **Ordem Decrescente (DESC):**

    ```sql
    SELECT nome, salario FROM funcionarios ORDER BY salario DESC;
    ```

*   **Ordenando por múltiplas colunas:**

    Você pode ordenar por várias colunas. A ordenação será aplicada na primeira coluna, e se houver valores iguais, a segunda coluna será usada para desempate, e assim por diante.

    ```sql
    SELECT nome, sobrenome, departamento, salario
    FROM funcionarios
    ORDER BY departamento ASC, salario DESC;
    ```

## 4.4 Limitando Resultados com LIMIT

A cláusula `LIMIT` é usada para restringir o número de linhas retornadas por uma consulta. É muito útil para paginação ou para obter apenas os 

primeiros N resultados.

### 4.4.1 Limitar o número de linhas

Para obter os 3 funcionários com os maiores salários:

```sql
SELECT nome, salario FROM funcionarios
ORDER BY salario DESC
LIMIT 3;
```

### 4.4.2 Limitar com offset

Você pode especificar um offset (deslocamento) para pular um certo número de linhas antes de começar a retornar os resultados. A sintaxe é `LIMIT offset, count`.

Para obter os 3 funcionários a partir do 4º (pulando os 3 primeiros):

```sql
SELECT nome, salario FROM funcionarios
ORDER BY salario DESC
LIMIT 3, 3; -- Pula 3, pega 3
```

Alternativamente, `LIMIT count OFFSET offset`:

```sql
SELECT nome, salario FROM funcionarios
ORDER BY salario DESC
LIMIT 3 OFFSET 3; -- Pega 3, pula 3
```

Este módulo cobriu as técnicas essenciais para filtrar, ordenar e limitar os dados que você recupera do seu banco de dados MySQL. No próximo módulo, exploraremos as funções de agregação e o agrupamento de dados.

