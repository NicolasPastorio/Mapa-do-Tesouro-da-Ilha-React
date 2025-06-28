# Módulo 6: Joins (INNER JOIN, LEFT JOIN, RIGHT JOIN)

Até agora, trabalhamos com dados de uma única tabela. No entanto, em bancos de dados relacionais, as informações são frequentemente distribuídas em várias tabelas para evitar redundância e garantir a integridade dos dados. A cláusula `JOIN` é usada para combinar linhas de duas ou mais tabelas com base em uma coluna relacionada entre elas.

## 6.1 Preparação: Criando Novas Tabelas e Dados de Exemplo

Para demonstrar os diferentes tipos de `JOIN`, vamos criar duas novas tabelas: `departamentos` e `projetos`, e popular a tabela `funcionarios` com uma chave estrangeira para `departamentos`.

Certifique-se de estar conectado ao MySQL e no banco de dados `minha_empresa`.

```bash
mysql -u dev_user -p
```

```sql
USE minha_empresa;

-- Excluir tabelas se existirem para começar do zero
DROP TABLE IF EXISTS projetos;
DROP TABLE IF EXISTS funcionarios;
DROP TABLE IF EXISTS departamentos;

-- Criar tabela departamentos
CREATE TABLE departamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_departamento VARCHAR(100) NOT NULL UNIQUE
);

-- Inserir dados na tabela departamentos
INSERT INTO departamentos (nome_departamento)
VALUES
    ("Vendas"),
    ("Marketing"),
    ("TI"),
    ("RH"),
    ("Financeiro");

-- Criar tabela funcionarios com chave estrangeira para departamentos
CREATE TABLE funcionarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    data_contratacao DATE,
    salario DECIMAL(10, 2),
    departamento_id INT,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);

-- Inserir dados na tabela funcionarios
INSERT INTO funcionarios (nome, sobrenome, email, data_contratacao, salario, departamento_id)
VALUES
    ("João", "Silva", "joao.silva@empresa.com", "2020-01-15", 5000.00, (SELECT id FROM departamentos WHERE nome_departamento = "Vendas")),
    ("Maria", "Souza", "maria.souza@empresa.com", "2019-07-22", 5800.00, (SELECT id FROM departamentos WHERE nome_departamento = "Marketing")),
    ("Pedro", "Santos", "pedro.santos@empresa.com", "2021-03-10", 6500.00, (SELECT id FROM departamentos WHERE nome_departamento = "TI")),
    ("Ana", "Oliveira", "ana.oliveira@empresa.com", "2019-07-22", 5800.00, (SELECT id FROM departamentos WHERE nome_departamento = "Marketing")),
    ("Carlos", "Pereira", "carlos.pereira@empresa.com", "2022-05-01", 7200.00, (SELECT id FROM departamentos WHERE nome_departamento = "TI")),
    ("Fernanda", "Lima", "fernanda.lima@empresa.com", "2020-11-01", 4800.00, (SELECT id FROM departamentos WHERE nome_departamento = "Vendas")),
    ("Rafael", "Costa", "rafael.costa@empresa.com", "2018-09-01", 8000.00, (SELECT id FROM departamentos WHERE nome_departamento = "TI")),
    ("Juliana", "Almeida", "juliana.almeida@empresa.com", "2023-02-10", 5200.00, (SELECT id FROM departamentos WHERE nome_departamento = "RH")),
    ("Lucas", "Martins", "lucas.martins@empresa.com", "2023-01-01", 6000.00, NULL); -- Funcionário sem departamento

-- Criar tabela projetos
CREATE TABLE projetos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_projeto VARCHAR(100) NOT NULL,
    departamento_responsavel_id INT,
    FOREIGN KEY (departamento_responsavel_id) REFERENCES departamentos(id)
);

-- Inserir dados na tabela projetos
INSERT INTO projetos (nome_projeto, departamento_responsavel_id)
VALUES
    ("Campanha de Verão", (SELECT id FROM departamentos WHERE nome_departamento = "Marketing")),
    ("Desenvolvimento App Mobile", (SELECT id FROM departamentos WHERE nome_departamento = "TI")),
    ("Otimização de Vendas", (SELECT id FROM departamentos WHERE nome_departamento = "Vendas")),
    ("Recrutamento 2024", (SELECT id FROM departamentos WHERE nome_departamento = "RH")),
    ("Auditoria Financeira", NULL); -- Projeto sem departamento responsável
```

## 6.2 INNER JOIN

O `INNER JOIN` retorna apenas as linhas que têm correspondência em *ambas* as tabelas. É o tipo de `JOIN` mais comum.

### Sintaxe Básica

```sql
SELECT colunas
FROM tabela1
INNER JOIN tabela2
ON tabela1.coluna_comum = tabela2.coluna_comum;
```

### Exemplo: Funcionários e seus Departamentos

Vamos listar o nome dos funcionários e o nome do departamento ao qual pertencem.

```sql
SELECT
    f.nome, f.sobrenome, d.nome_departamento
FROM
    funcionarios f
INNER JOIN
    departamentos d ON f.departamento_id = d.id;
```

**Explicação:**

*   `funcionarios f`: Usamos `f` como um alias para a tabela `funcionarios` para facilitar a escrita.
*   `departamentos d`: Usamos `d` como um alias para a tabela `departamentos`.
*   `ON f.departamento_id = d.id`: Esta é a condição de junção. Ela especifica que as linhas devem ser combinadas quando o `departamento_id` da tabela `funcionarios` for igual ao `id` da tabela `departamentos`.

Observe que o funcionário 


Lucas Martins, que não tem um `departamento_id` atribuído (NULL), não aparece no resultado do `INNER JOIN`, pois não há correspondência na tabela `departamentos`.

## 6.3 LEFT JOIN (ou LEFT OUTER JOIN)

O `LEFT JOIN` retorna todas as linhas da tabela da esquerda (a primeira tabela mencionada no `FROM`) e as linhas correspondentes da tabela da direita. Se não houver correspondência na tabela da direita, as colunas da tabela da direita terão valores `NULL`.

### Sintaxe Básica

```sql
SELECT colunas
FROM tabela1
LEFT JOIN tabela2
ON tabela1.coluna_comum = tabela2.coluna_comum;
```

### Exemplo: Todos os Funcionários e seus Departamentos (se houver)

Vamos listar todos os funcionários e seus respectivos departamentos. Se um funcionário não tiver departamento, ele ainda aparecerá na lista.

```sql
SELECT
    f.nome, f.sobrenome, d.nome_departamento
FROM
    funcionarios f
LEFT JOIN
    departamentos d ON f.departamento_id = d.id;
```

**Observação:** Agora, Lucas Martins aparece no resultado, e a coluna `nome_departamento` para ele é `NULL`, pois não há um departamento correspondente.

## 6.4 RIGHT JOIN (ou RIGHT OUTER JOIN)

O `RIGHT JOIN` retorna todas as linhas da tabela da direita (a segunda tabela mencionada no `FROM`) e as linhas correspondentes da tabela da esquerda. Se não houver correspondência na tabela da esquerda, as colunas da tabela da esquerda terão valores `NULL`.

### Sintaxe Básica

```sql
SELECT colunas
FROM tabela1
RIGHT JOIN tabela2
ON tabela1.coluna_comum = tabela2.coluna_comum;
```

### Exemplo: Todos os Departamentos e seus Funcionários (se houver)

Vamos listar todos os departamentos e os funcionários que pertencem a eles. Se um departamento não tiver funcionários, ele ainda aparecerá na lista.

```sql
SELECT
    d.nome_departamento, f.nome, f.sobrenome
FROM
    funcionarios f
RIGHT JOIN
    departamentos d ON f.departamento_id = d.id;
```

**Observação:** O departamento 


Financeiro aparece no resultado, mesmo não tendo nenhum funcionário associado a ele, e as colunas de funcionário (`nome`, `sobrenome`) são `NULL`.

## 6.5 FULL JOIN (Simulação em MySQL)

O `FULL JOIN` (ou `FULL OUTER JOIN`) retorna todas as linhas quando há uma correspondência em uma das tabelas. Ou seja, ele retorna todas as linhas da tabela da esquerda e todas as linhas da tabela da direita, combinando-as onde há correspondência e preenchendo com `NULL` onde não há.

**Importante:** O MySQL não possui um `FULL JOIN` nativo. No entanto, você pode simular um `FULL JOIN` combinando um `LEFT JOIN` e um `RIGHT JOIN` com a cláusula `UNION`.

### Sintaxe de Simulação

```sql
SELECT colunas
FROM tabela1
LEFT JOIN tabela2
ON tabela1.coluna_comum = tabela2.coluna_comum

UNION

SELECT colunas
FROM tabela1
RIGHT JOIN tabela2
ON tabela1.coluna_comum = tabela2.coluna_comum
WHERE tabela1.coluna_comum IS NULL; -- Para evitar duplicatas já cobertas pelo LEFT JOIN
```

### Exemplo: Todos os Funcionários e Todos os Departamentos

Vamos listar todos os funcionários e seus departamentos, e todos os departamentos com seus funcionários, incluindo aqueles sem correspondência em ambos os lados.

```sql
SELECT
    f.nome, f.sobrenome, d.nome_departamento
FROM
    funcionarios f
LEFT JOIN
    departamentos d ON f.departamento_id = d.id

UNION

SELECT
    f.nome, f.sobrenome, d.nome_departamento
FROM
    funcionarios f
RIGHT JOIN
    departamentos d ON f.departamento_id = d.id
WHERE f.id IS NULL; -- Garante que apenas as linhas exclusivas do RIGHT JOIN sejam adicionadas
```

**Explicação:**

*   A primeira parte (`LEFT JOIN`) traz todos os funcionários e seus departamentos correspondentes, incluindo Lucas Martins com `NULL` para departamento.
*   A segunda parte (`RIGHT JOIN` com `WHERE f.id IS NULL`) traz apenas os departamentos que não têm funcionários correspondentes (como o 


departamento Financeiro) e as colunas de funcionário como `NULL`.
*   `UNION` combina os resultados de ambas as consultas, removendo duplicatas automaticamente.

## 6.6 CROSS JOIN

O `CROSS JOIN` retorna o produto cartesiano das duas tabelas, ou seja, cada linha da primeira tabela é combinada com cada linha da segunda tabela. Isso resulta em um número de linhas igual ao número de linhas da Tabela A multiplicado pelo número de linhas da Tabela B. É raramente usado em cenários de dados reais, mas pode ser útil para gerar combinações ou para testes.

### Sintaxe Básica

```sql
SELECT colunas
FROM tabela1
CROSS JOIN tabela2;
```

### Exemplo: Todas as Combinações Possíveis

Vamos ver todas as combinações possíveis entre funcionários e projetos (sem qualquer relação lógica).

```sql
SELECT
    f.nome, p.nome_projeto
FROM
    funcionarios f
CROSS JOIN
    projetos p;
```

Este módulo cobriu os diferentes tipos de `JOIN` no MySQL, que são essenciais para trabalhar com bancos de dados relacionais e combinar informações de múltiplas tabelas. No próximo módulo, exploraremos subconsultas e views, que permitem consultas mais complexas e a criação de objetos de banco de dados virtuais.

