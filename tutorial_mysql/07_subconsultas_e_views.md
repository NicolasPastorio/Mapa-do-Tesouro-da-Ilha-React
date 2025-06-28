# Módulo 7: Subconsultas e Views

Neste módulo final do nível intermediário, vamos explorar dois conceitos poderosos em SQL: Subconsultas (ou Subqueries) e Views. Ambos permitem a criação de consultas mais complexas e a organização lógica dos dados, tornando o trabalho com bancos de dados mais eficiente e legível.

## 7.1 Subconsultas (Subqueries)

Uma subconsulta é uma consulta SQL aninhada dentro de outra consulta SQL. Ela pode ser usada em várias cláusulas, como `SELECT`, `FROM`, `WHERE` e `HAVING`. A subconsulta é executada primeiro, e seu resultado é então usado pela consulta externa.

## 7.1.1 Subconsultas na Cláusula WHERE

Este é o uso mais comum de subconsultas, onde o resultado da subconsulta é usado para filtrar os dados da consulta externa.

### Exemplo 1: Funcionários com salário maior que a média

Primeiro, precisamos calcular o salário médio de todos os funcionários. Em seguida, usamos esse valor para encontrar os funcionários que ganham mais do que a média.

```sql
SELECT nome, sobrenome, salario
FROM funcionarios
WHERE salario > (SELECT AVG(salario) FROM funcionarios);
```

**Explicação:**

*   A subconsulta `(SELECT AVG(salario) FROM funcionarios)` é executada primeiro, retornando o salário médio.
*   A consulta externa então usa esse valor para filtrar os funcionários.

### Exemplo 2: Funcionários do departamento de Vendas

Podemos usar uma subconsulta para encontrar o `id` do departamento de Vendas e, em seguida, listar os funcionários desse departamento.

```sql
SELECT nome, sobrenome
FROM funcionarios
WHERE departamento_id = (SELECT id FROM departamentos WHERE nome_departamento = "Vendas");
```

### Exemplo 3: Funcionários que não estão em nenhum projeto

Assumindo que temos uma tabela `funcionario_projeto` que liga funcionários a projetos, ou que o `departamento_id` do projeto se refere ao departamento do funcionário.

Vamos usar a tabela `projetos` que criamos no módulo anterior.

```sql
SELECT nome, sobrenome
FROM funcionarios
WHERE departamento_id NOT IN (SELECT DISTINCT departamento_responsavel_id FROM projetos WHERE departamento_responsavel_id IS NOT NULL);
```

**Explicação:**

*   A subconsulta `(SELECT DISTINCT departamento_responsavel_id FROM projetos WHERE departamento_responsavel_id IS NOT NULL)` retorna uma lista de IDs de departamentos que são responsáveis por algum projeto.
*   A consulta externa então seleciona os funcionários cujo `departamento_id` *não está* nessa lista.

## 7.1.2 Subconsultas na Cláusula FROM (Tabelas Derivadas)

Uma subconsulta pode ser usada como uma tabela temporária (também conhecida como tabela derivada) na cláusula `FROM`. O resultado da subconsulta é tratado como uma tabela regular.

### Exemplo: Salário médio dos funcionários por departamento, mas apenas para departamentos com mais de um funcionário

```sql
SELECT
    departamento_nome,
    salario_medio_departamento
FROM
    (SELECT
        d.nome_departamento AS departamento_nome,
        AVG(f.salario) AS salario_medio_departamento,
        COUNT(f.id) AS total_funcionarios
    FROM
        funcionarios f
    INNER JOIN
        departamentos d ON f.departamento_id = d.id
    GROUP BY
        d.nome_departamento
    ) AS resumo_departamentos
WHERE
    total_funcionarios > 1;
```

**Explicação:**

*   A subconsulta interna calcula o salário médio e o total de funcionários por departamento.
*   O resultado dessa subconsulta é nomeado como `resumo_departamentos` e tratado como uma tabela temporária.
*   A consulta externa então filtra essa tabela temporária para incluir apenas os departamentos com mais de um funcionário.

## 7.2 Views

Uma View é uma tabela virtual baseada no conjunto de resultados de uma consulta SQL. Uma View contém linhas e colunas, assim como uma tabela real. Os campos em uma View são campos de uma ou mais tabelas reais no banco de dados. Você pode adicionar funções SQL, cláusulas `WHERE` e `JOIN` a uma View e apresentar os dados como se fossem de uma única tabela.

As Views não armazenam dados fisicamente; elas apenas armazenam a definição da consulta. Quando você consulta uma View, o MySQL executa a consulta subjacente e retorna os resultados.

### 7.2.1 Criando uma View

Para criar uma View, use o comando `CREATE VIEW;`.

### Exemplo 1: View de Funcionários Ativos

Vamos criar uma View que mostra apenas os funcionários com salário superior a 5000.

```sql
CREATE VIEW funcionarios_ativos AS
SELECT id, nome, sobrenome, salario, departamento_id
FROM funcionarios
WHERE salario > 5000;
```

### 7.2.2 Consultando uma View

Depois de criar uma View, você pode consultá-la como se fosse uma tabela normal.

```sql
SELECT * FROM funcionarios_ativos;
```

```sql
SELECT nome, sobrenome FROM funcionarios_ativos WHERE departamento_id = (SELECT id FROM departamentos WHERE nome_departamento = "TI");
```

### 7.2.3 Alterando uma View

Para modificar uma View existente, use `ALTER VIEW;`.

```sql
ALTER VIEW funcionarios_ativos AS
SELECT id, nome, sobrenome, salario, departamento_id, data_contratacao
FROM funcionarios
WHERE salario > 5000 AND data_contratacao >= "2020-01-01";
```

### 7.2.4 Excluindo uma View

Para remover uma View, use `DROP VIEW;`.

```sql
DROP VIEW funcionarios_ativos;
```

## 7.3 Vantagens das Views

*   **Segurança:** Você pode restringir o acesso dos usuários a certas linhas ou colunas de uma tabela, permitindo que eles vejam apenas os dados relevantes através de uma View, sem conceder acesso direto à tabela subjacente.
*   **Simplicidade:** Views podem simplificar consultas complexas, encapsulando lógicas de `JOIN` e `WHERE` em um objeto único e fácil de usar.
*   **Consistência:** Garante que todos os usuários vejam os dados da mesma forma, com a mesma lógica de filtragem e combinação.
*   **Reusabilidade:** Uma vez criada, uma View pode ser usada repetidamente em diferentes consultas e relatórios.

Este módulo conclui a parte intermediária do tutorial, fornecendo ferramentas para consultas mais avançadas e organização de dados. Você agora tem uma base sólida para trabalhar com MySQL no terminal do Linux Ubuntu.

