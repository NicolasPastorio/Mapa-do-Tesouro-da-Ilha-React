# re: Expressões Regulares em Python

O módulo `re` da biblioteca padrão do Python fornece suporte para operações com expressões regulares (regex). Expressões regulares são sequências de caracteres que formam um padrão de busca, usadas para encontrar e manipular strings de texto de forma poderosa e flexível. Elas são amplamente utilizadas em tarefas como validação de entrada, extração de informações, substituição de texto e análise de logs.

## 1. Conceitos Básicos de Expressões Regulares

Uma expressão regular é composta por caracteres literais e metacaracteres, que possuem significados especiais.

### Metacaracteres Comuns:

*   `.`: Corresponde a qualquer caractere (exceto nova linha).
*   `^`: Corresponde ao início da string.
*   `$`: Corresponde ao final da string.
*   `*`: Corresponde a 0 ou mais ocorrências do caractere/grupo anterior.
*   `+`: Corresponde a 1 ou mais ocorrências do caractere/grupo anterior.
*   `?`: Corresponde a 0 ou 1 ocorrência do caractere/grupo anterior.
*   `{n}`: Corresponde a exatamente `n` ocorrências.
*   `{n,m}`: Corresponde a entre `n` e `m` ocorrências.
*   `[]`: Define um conjunto de caracteres (e.g., `[abc]` corresponde a 'a', 'b' ou 'c').
*   `[^]`: Define um conjunto de caracteres negado (e.g., `[^abc]` corresponde a qualquer caractere exceto 'a', 'b' ou 'c').
*   `|`: Operador OU (e.g., `a|b` corresponde a 'a' ou 'b').
*   `()`: Agrupa caracteres e cria grupos de captura.
*   `\`: Caractere de escape (e.g., `\.` corresponde a um ponto literal).

### Sequências Especiais:

*   `\d`: Corresponde a um dígito (0-9).
*   `\D`: Corresponde a um não-dígito.
*   `\w`: Corresponde a um caractere de palavra (letras, números, underscore).
*   `\W`: Corresponde a um não-caractere de palavra.
*   `\s`: Corresponde a um caractere de espaço em branco (espaço, tab, nova linha).
*   `\S`: Corresponde a um não-caractere de espaço em branco.
*   `\b`: Corresponde a uma fronteira de palavra.
*   `\B`: Corresponde a uma não-fronteira de palavra.

## 2. Funções do Módulo `re`

O módulo `re` oferece várias funções para trabalhar com expressões regulares.

### `re.search(pattern, string)`: Busca por uma correspondência

Procura a primeira ocorrência do `pattern` na `string`. Retorna um objeto `Match` se encontrar, `None` caso contrário.

```python
import re

print("\n--- Exemplo 1: re.search() ---")

texto = "A linguagem Python é poderosa e versátil."

# Busca por "Python"
match = re.search(r"Python", texto)
if match:
    print(f"Encontrado: {match.group()} na posição {match.start()} a {match.end()}")

# Busca por um padrão mais complexo
texto2 = "Meu email é usuario@dominio.com.br"
match2 = re.search(r"\w+@\w+\.\w+", texto2)
if match2:
    print(f"Email encontrado: {match2.group()}")
else:
    print("Email não encontrado.")
```

### `re.match(pattern, string)`: Busca no início da string

Procura o `pattern` apenas no início da `string`. Retorna um objeto `Match` se encontrar, `None` caso contrário.

```python
import re

print("\n--- Exemplo 2: re.match() ---")

texto = "Começo da frase."

match = re.match(r"Começo", texto)
if match:
    print(f"Encontrado no início: {match.group()}")

match2 = re.match(r"frase", texto)
if match2:
    print(f"Encontrado no início: {match2.group()}")
else:
    print("Não encontrado no início.")
```

### `re.findall(pattern, string)`: Encontra todas as correspondências

Retorna uma lista de todas as correspondências não sobrepostas do `pattern` na `string`.

```python
import re

print("\n--- Exemplo 3: re.findall() ---")

texto = "Os números são 123, 456 e 789."

# Encontra todos os números
numeros = re.findall(r"\d+", texto)
print(f"Números encontrados: {numeros}")

texto2 = "Maçã, Banana, Laranja, Maçã."
frutas = re.findall(r"Maçã|Banana", texto2)
print(f"Frutas encontradas: {frutas}")
```

### `re.sub(pattern, repl, string)`: Substitui correspondências

Substitui todas as ocorrências do `pattern` na `string` pelo `repl` (replacement).

```python
import re

print("\n--- Exemplo 4: re.sub() ---")

texto = "Olá mundo! Olá Python!"

# Substitui "Olá" por "Oi"
novo_texto = re.sub(r"Olá", "Oi", texto)
print(f"Texto original: {texto}")
print(f"Texto modificado: {novo_texto}")

# Remover dígitos
texto2 = "Produto A123, B456, C789."
texto_sem_digitos = re.sub(r"\d+", "", texto2)
print(f"Texto sem dígitos: {texto_sem_digitos}")
```

### `re.split(pattern, string)`: Divide a string por correspondências

Divide a `string` onde o `pattern` corresponde, retornando uma lista de strings.

```python
import re

print("\n--- Exemplo 5: re.split() ---")

texto = "um,dois;tres quatro"

# Divide por vírgula, ponto e vírgula ou espaço
palavras = re.split(r"[,; ]", texto)
print(f"Palavras: {palavras}")
```

## 3. Objetos de Expressão Regular (Compilação)

Para expressões regulares que serão usadas várias vezes, é mais eficiente compilá-las usando `re.compile()`. Isso cria um objeto `RegexObject` que pode ser usado para realizar operações de busca, substituição, etc.

```python
import re

print("\n--- Exemplo 6: re.compile() ---")

# Compila a expressão regular para emails
email_pattern = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")

texto1 = "Contato: teste@exemplo.com"
texto2 = "Meu site é www.site.com"
texto3 = "Email do suporte: suporte@minhaempresa.org"

match1 = email_pattern.search(texto1)
if match1: print(f"Email 1: {match1.group()}")

match2 = email_pattern.search(texto2)
if match2: print(f"Email 2: {match2.group()}")
else: print("Email 2: Nenhum email encontrado.")

match3 = email_pattern.search(texto3)
if match3: print(f"Email 3: {match3.group()}")
```

## 4. Grupos de Captura

Parênteses `()` em uma expressão regular criam grupos de captura, permitindo extrair partes específicas da correspondência.

```python
import re

print("\n--- Exemplo 7: Grupos de Captura ---")

texto = "Data: 25/12/2023"

# Captura dia, mês e ano
match = re.search(r"Data: (\d{2})/(\d{2})/(\d{4})", texto)
if match:
    print(f"Correspondência completa: {match.group(0)}") # Ou match.group()
    print(f"Dia: {match.group(1)}")
    print(f"Mês: {match.group(2)}")
    print(f"Ano: {match.group(3)}")
    print(f"Todos os grupos: {match.groups()}")

# Grupos nomeados
texto2 = "Nome: João, Idade: 30"
match2 = re.search(r"Nome: (?P<nome>\w+), Idade: (?P<idade>\d+)", texto2)
if match2:
    print(f"\nNome (grupo nomeado): {match2.group("nome")}")
    print(f"Idade (grupo nomeado): {match2.group("idade")}")
    print(f"Dicionário de grupos: {match2.groupdict()}")
```

## 5. Flags (Modificadores)

As flags modificam o comportamento da expressão regular. Elas podem ser passadas como um argumento para as funções do módulo `re`.

*   `re.IGNORECASE` ou `re.I`: Ignora maiúsculas/minúsculas.
*   `re.MULTILINE` ou `re.M`: `^` e `$` correspondem ao início/fim de cada linha, não apenas da string.
*   `re.DOTALL` ou `re.S`: `.` corresponde a qualquer caractere, incluindo nova linha.
*   `re.VERBOSE` ou `re.X`: Permite comentários e espaços em branco na regex para melhor legibilidade.

```python
import re

print("\n--- Exemplo 8: Flags ---")

texto = "Python\npython\nPYTHON"

# Ignorar maiúsculas/minúsculas
matches = re.findall(r"python", texto, re.IGNORECASE)
print(f"Matches (IGNORECASE): {matches}")

texto_multiline = "Linha 1\nLinha 2\nLinha 3"
# ^ e $ com MULTILINE
matches_multiline = re.findall(r"^Linha \d$", texto_multiline, re.MULTILINE)
print(f"Matches (MULTILINE): {matches_multiline}")

texto_dotall = "Primeira linha.\nSegunda linha."
# . com DOTALL
match_dotall = re.search(r"Primeira.*Segunda", texto_dotall, re.DOTALL)
if match_dotall:
    print(f"Match (DOTALL): {match_dotall.group()}")
```

## Conclusão

O módulo `re` e as expressões regulares são ferramentas incrivelmente poderosas para manipulação de texto em Python. Embora a sintaxe possa parecer complexa no início, dominar os conceitos básicos e as funções principais do módulo `re` abrirá um vasto leque de possibilidades para processar e extrair informações de strings de forma eficiente e concisa. Pratique com diferentes padrões e textos para se familiarizar com o poder das regex! regex!

