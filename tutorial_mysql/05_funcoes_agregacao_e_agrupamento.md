# Módulo 5: Funções de Agregação e Agrupamento (GROUP BY)

Neste módulo, vamos explorar as funções de agregação do MySQL, que permitem realizar cálculos em um conjunto de linhas e retornar um único valor. Também aprenderemos a usar a cláusula `GROUP BY` para agrupar linhas que têm os mesmos valores em colunas especificadas, permitindo que as funções de agregação operem em cada grupo.

## 5.1 Preparação: Dados de Exemplo

Continuaremos usando a tabela `funcionarios` com os dados populados do módulo anterior. Se necessário, reconecte-se ao MySQL e certifique-se de que o banco de dados `minha_empresa` esteja selecionado.

```bash
mysql -u dev_user -p
```

```sql
USE minha_empresa;

-- Se a tabela não estiver populada, execute o INSERT do módulo anterior
-- INSERT INTO funcionarios (nome, sobrenome, email, data_contratacao, salario, departamento)
-- VALUES
--     ("João", "Silva", "joao.silva@empresa.com", "2020-01-15", 5000.00, "Vendas"),
--     ("Maria", "Souza", "maria.souza@empresa.com", "2019-07-22", 5800.00, "Marketing"),
--     ("Pedro", "Santos", "pedro.santos@empresa.com", "2021-03-10", 6500.00, "TI"),
--     ("Ana", "Oliveira", "ana.oliveira@empresa.com", "2019-07-22", 5800.00, "Marketing"),
--     ("Carlos", "Pereira", "carlos.pereira@empresa.com", "2022-05-01", 7200.00, "TI"),
--     ("Fernanda", "Lima", "fernanda.lima@empresa.com", "2020-11-01", 4800.00, "Vendas"),
--     ("Rafael", "Costa", "rafael.costa@empresa.com", "2018-09-01", 8000.00, "TI"),
--     ("Juliana", "Almeida", "juliana.almeida@empresa.com", "2023-02-10", 5200.00, "RH");
```

## 5.2 Funções de Agregação

As funções de agregação operam em um conjunto de linhas e retornam um único valor resumido.

### 5.2.1 COUNT()

Retorna o número de linhas que correspondem a um critério especificado.

*   **Contar todas as linhas:**

    ```sql
    SELECT COUNT(*) FROM funcionarios;
    ```

*   **Contar linhas não nulas em uma coluna:**

    ```sql
    SELECT COUNT(email) FROM funcionarios;
    ```

*   **Contar valores distintos:**

    ```sql
    SELECT COUNT(DISTINCT departamento) FROM funcionarios;
    ```

### 5.2.2 SUM()

Retorna a soma total de uma coluna numérica.

*   **Soma de todos os salários:**

    ```sql
    SELECT SUM(salario) FROM funcionarios;
    ```

### 5.2.3 AVG()

Retorna o valor médio de uma coluna numérica.

*   **Salário médio:**

    ```sql
    SELECT AVG(salario) FROM funcionarios;
    ```

### 5.2.4 MIN()

Retorna o menor valor de uma coluna.

*   **Menor salário:**

    ```sql
    SELECT MIN(salario) FROM funcionarios;
    ```

*   **Data de contratação mais antiga:**

    ```sql
    SELECT MIN(data_contratacao) FROM funcionarios;
    ```

### 5.2.5 MAX()

Retorna o maior valor de uma coluna.

*   **Maior salário:**

    ```sql
    SELECT MAX(salario) FROM funcionarios;
    ```

*   **Data de contratação mais recente:**

    ```sql
    SELECT MAX(data_contratacao) FROM funcionarios;
    ```

## 5.3 Agrupando Dados com GROUP BY

A cláusula `GROUP BY` é usada em conjunto com as funções de agregação para agrupar linhas que têm os mesmos valores em uma ou mais colunas. Isso permite que as funções de agregação sejam aplicadas a cada grupo separadamente.

### 5.3.1 Contar funcionários por departamento

```sql
SELECT departamento, COUNT(*) AS total_funcionarios
FROM funcionarios
GROUP BY departamento;
```

### 5.3.2 Salário médio por departamento

```sql
SELECT departamento, AVG(salario) AS salario_medio
FROM funcionarios
GROUP BY departamento;
```

### 5.3.3 Soma de salários por departamento e ordenação

```sql
SELECT departamento, SUM(salario) AS soma_salarios
FROM funcionarios
GROUP BY departamento
ORDER BY soma_salarios DESC;
```

### 5.3.4 Múltiplas colunas no GROUP BY

Você pode agrupar por mais de uma coluna. Por exemplo, para ver o salário médio por departamento e por ano de contratação:

```sql
SELECT departamento, YEAR(data_contratacao) AS ano_contratacao, AVG(salario) AS salario_medio
FROM funcionarios
GROUP BY departamento, ano_contratacao
ORDER BY departamento, ano_contratacao;
```

## 5.4 Filtrando Grupos com HAVING

A cláusula `WHERE` filtra linhas *antes* do agrupamento. A cláusula `HAVING` filtra grupos *depois* que as funções de agregação foram aplicadas.

### 5.4.1 Departamentos com mais de 2 funcionários

```sql
SELECT departamento, COUNT(*) AS total_funcionarios
FROM funcionarios
GROUP BY departamento
HAVING COUNT(*) > 2;
```

### 5.4.2 Departamentos com salário médio acima de 6000

```sql
SELECT departamento, AVG(salario) AS salario_medio
FROM funcionarios
GROUP BY departamento
HAVING AVG(salario) > 6000;
```

### 5.4.3 Combinando WHERE e HAVING

Você pode usar `WHERE` para filtrar as linhas antes do agrupamento e `HAVING` para filtrar os grupos resultantes.

```sql
SELECT departamento, COUNT(*) AS total_funcionarios, AVG(salario) AS salario_medio
FROM funcionarios
WHERE data_contratacao >= "2020-01-01" -- Filtra funcionários contratados a partir de 2020
GROUP BY departamento
HAVING AVG(salario) > 5500; -- Filtra grupos com salário médio acima de 5500
```

Este módulo forneceu uma compreensão sólida das funções de agregação e da cláusula `GROUP BY`, ferramentas poderosas para resumir e analisar dados. No próximo módulo, abordaremos as operações de `JOIN`, que são cruciais para combinar dados de múltiplas tabelas.

