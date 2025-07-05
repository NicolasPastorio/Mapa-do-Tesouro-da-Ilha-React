# SQL Injection: Entendendo e Prevenindo

## O que é SQL Injection?

SQL Injection (Injeção SQL) é uma técnica de ataque que consiste em inserir ou "injetar" código SQL malicioso em campos de entrada de dados de uma aplicação web. Quando a aplicação não valida ou sanitiza adequadamente esses dados, o código malicioso é executado pelo banco de dados, permitindo que o atacante manipule ou acesse informações não autorizadas.

## Como funciona o ataque?

Imagine uma aplicação web que permite aos usuários fazer login com um nome de usuário e senha. A consulta SQL para verificar as credenciais pode ser algo como:

```sql
SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "';
```

Se um atacante inserir `' OR '1'='1` no campo de nome de usuário, a consulta se tornaria:

```sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'alguma_senha';
```

Como `'1'='1'` é sempre verdadeiro, a condição `username = '' OR '1'='1'` também será verdadeira, permitindo que o atacante faça login sem conhecer a senha. Este é um exemplo simples de injeção de autenticação.

Outros tipos de ataques de SQL Injection incluem:

*   **Injeção de Erro:** O atacante força o banco de dados a gerar mensagens de erro que revelam informações sobre a estrutura do banco de dados.
*   **Injeção Baseada em União:** O atacante usa a cláusula `UNION` para combinar os resultados de uma consulta legítima com os resultados de uma consulta maliciosa, extraindo dados de outras tabelas.
*   **Injeção Baseada em Tempo:** O atacante usa funções de atraso de tempo (como `SLEEP()` ou `WAITFOR DELAY`) para inferir informações do banco de dados com base no tempo de resposta.

## Como proteger sua aplicação?

### 1. Consultas Parametrizadas (Prepared Statements)

Esta é a defesa mais eficaz contra SQL Injection. Em vez de concatenar strings para construir consultas SQL, você usa parâmetros. O banco de dados diferencia o código SQL dos dados de entrada, tratando os dados como literais e não como parte da lógica da consulta.

**Exemplo (Python com `sqlite3`):**

```python
import sqlite3

conn = sqlite3.connect('mydatabase.db')
cursor = conn.cursor()

username = input("Enter username: ")
password = input("Enter password: ")

# Consulta parametrizada
cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))

user = cursor.fetchone()

if user:
    print("Login successful!")
else:
    print("Invalid credentials.")

conn.close()
```

### 2. Validação e Sanitização de Entrada

Embora consultas parametrizadas sejam a principal defesa, a validação e sanitização de entrada ainda são importantes para a segurança geral da aplicação. Valide os dados de entrada para garantir que eles correspondam ao formato esperado (por exemplo, números inteiros, strings alfanuméricas) e sanitize-os para remover ou escapar caracteres especiais.

### 3. Princípio do Menor Privilégio

Configure as permissões do usuário do banco de dados para que ele tenha apenas os privilégios mínimos necessários para a aplicação funcionar. Por exemplo, se a aplicação só precisa ler dados de uma tabela, não conceda permissões de escrita ou exclusão.

### 4. Mensagens de Erro Detalhadas

Evite exibir mensagens de erro detalhadas do banco de dados diretamente para o usuário. Essas mensagens podem fornecer informações valiosas a um atacante sobre a estrutura do seu banco de dados. Em vez disso, registre os erros internamente e exiba mensagens de erro genéricas ao usuário.

### 5. Web Application Firewall (WAF)

Um WAF pode ajudar a detectar e bloquear tentativas de SQL Injection, analisando o tráfego HTTP e identificando padrões de ataque conhecidos. No entanto, um WAF não substitui a necessidade de codificação segura.

## Conclusão

SQL Injection continua sendo uma das vulnerabilidades mais comuns e perigosas em aplicações web. A implementação de consultas parametrizadas é a medida mais crucial para proteger sua aplicação. Combinada com validação de entrada, princípio do menor privilégio e tratamento adequado de erros, você pode construir aplicações web muito mais seguras.

