# json: Manipulando Dados JSON em Python

O módulo `json` da biblioteca padrão do Python fornece funcionalidades para trabalhar com dados no formato JSON (JavaScript Object Notation). JSON é um formato leve de intercâmbio de dados, fácil para humanos lerem e escreverem, e fácil para máquinas analisarem e gerarem. É amplamente utilizado em APIs web, arquivos de configuração e para armazenar dados estruturados.

## 1. O que é JSON?

JSON é construído sobre duas estruturas:

*   Uma coleção de pares nome/valor (objetos em JSON, que correspondem a dicionários em Python).
*   Uma lista ordenada de valores (arrays em JSON, que correspondem a listas em Python).

Os tipos de dados suportados em JSON são:

*   Strings (sequências de caracteres Unicode)
*   Números (inteiros e de ponto flutuante)
*   Booleanos (`true`, `false`)
*   `null`
*   Objetos (coleções de pares nome/valor)
*   Arrays (listas ordenadas de valores)

## 2. Codificando (Serializando) Dados Python para JSON

Para converter objetos Python em strings JSON, usamos a função `json.dumps()` (dump string) ou `json.dump()` (dump file).

### `json.dumps()`: Python para String JSON

Esta função serializa um objeto Python em uma string formatada em JSON.

```python
import json

print("\n--- Exemplo 1: json.dumps() ---")

dados_python = {
    "nome": "Alice",
    "idade": 30,
    "cidades": ["Nova York", "Londres"],
    "ativo": True,
    "saldo": 1234.56,
    "info_extra": None
}

# Serializa o dicionário Python para uma string JSON
json_string = json.dumps(dados_python)
print("String JSON simples:\n", json_string)

# Serializa com indentação para melhor legibilidade
json_string_formatado = json.dumps(dados_python, indent=4)
print("\nString JSON formatada:\n", json_string_formatado)

# Serializa com ordenação de chaves
json_string_ordenado = json.dumps(dados_python, indent=4, sort_keys=True)
print("\nString JSON ordenada:\n", json_string_ordenado)

# Serializa com separadores personalizados
json_string_separadores = json.dumps(dados_python, separators=(",", ":"))
print("\nString JSON com separadores:\n", json_string_separadores)
```

**Mapeamento de Tipos Python para JSON:**

| Tipo Python | Tipo JSON |
| :---------- | :-------- |
| `dict`      | `object`  |
| `list`, `tuple` | `array`   |
| `str`       | `string`  |
| `int`, `float` | `number`  |
| `True`      | `true`    |
| `False`     | `false`   |
| `None`      | `null`    |

### `json.dump()`: Python para Arquivo JSON

Esta função serializa um objeto Python diretamente para um arquivo (objeto tipo arquivo).

```python
import json
import os

print("\n--- Exemplo 2: json.dump() para arquivo ---")

dados_para_arquivo = {
    "produto": "Laptop",
    "preco": 1200.00,
    "disponivel": True,
    "caracteristicas": ["Tela 15.6", "8GB RAM", "256GB SSD"]
}

file_name = "dados.json"
with open(file_name, "w") as f:
    json.dump(dados_para_arquivo, f, indent=4)

print(f"Dados salvos em \'{file_name}\'")

# Verificar o conteúdo do arquivo
with open(file_name, "r") as f:
    print("Conteúdo do arquivo:\n", f.read())

os.remove(file_name) # Limpa o arquivo de teste
```

## 3. Decodificando (Desserializando) Dados JSON para Python

Para converter strings JSON ou dados de arquivos JSON em objetos Python, usamos as funções `json.loads()` (load string) ou `json.load()` (load file).

### `json.loads()`: String JSON para Python

Esta função desserializa uma string JSON em um objeto Python.

```python
import json

print("\n--- Exemplo 3: json.loads() ---")

json_string_recebida = '{"nome": "Bob", "idade": 25, "hobbies": ["leitura", "caminhada"]}'

# Desserializa a string JSON para um dicionário Python
dados_python_carregados = json.loads(json_string_recebida)

print("Tipo do objeto carregado:", type(dados_python_carregados))
print("Dados Python carregados:", dados_python_carregados)
print("Nome:", dados_python_carregados["nome"])
print("Primeiro hobby:", dados_python_carregados["hobbies"][0])

# Exemplo com JSON mais complexo
json_complexo = '''
{
    "empresa": "TechCorp",
    "funcionarios": [
        {
            "id": 101,
            "nome": "Carlos",
            "cargo": "Engenheiro",
            "projetos": ["Alpha", "Beta"]
        },
        {
            "id": 102,
            "nome": "Diana",
            "cargo": "Designer",
            "projetos": ["Gama"]
        }
    ]
}
'''

dados_complexos = json.loads(json_complexo)
print("\nDados complexos carregados:", dados_complexos)
print("Nome do segundo funcionário:", dados_complexos["funcionarios"][1]["nome"])
```

### `json.load()`: Arquivo JSON para Python

Esta função desserializa dados de um arquivo (objeto tipo arquivo) em um objeto Python.

```python
import json
import os

print("\n--- Exemplo 4: json.load() de arquivo ---")

# Criar um arquivo JSON de teste
file_name_load = "config.json"
config_data = {
    "database": {
        "host": "localhost",
        "port": 5432,
        "user": "admin"
    },
    "api_key": "abc123xyz"
}
with open(file_name_load, "w") as f:
    json.dump(config_data, f, indent=4)

print(f"Arquivo \'{file_name_load}\' criado para teste.")

# Carregar dados do arquivo JSON
with open(file_name_load, "r") as f:
    config_carregada = json.load(f)

print("Configuração carregada:", config_carregada)
print("Host do banco de dados:", config_carregada["database"]["host"])

os.remove(file_name_load) # Limpa o arquivo de teste
```

## 4. Tratamento de Erros

Ao trabalhar com JSON, é importante lidar com possíveis erros de formatação. O módulo `json` levanta `json.JSONDecodeError` se a string JSON for inválida.

```python
import json

print("\n--- Exemplo 5: Tratamento de Erros ---")

invalid_json = "{'chave': 'valor'}" # Aspas simples são inválidas em JSON

try:
    data = json.loads(invalid_json)
    print(data)
except json.JSONDecodeError as e:
    print(f"Erro ao decodificar JSON: {e}")

valid_json = '{"chave": "valor"}'
try:
    data = json.loads(valid_json)
    print("JSON válido carregado:", data)
except json.JSONDecodeError as e:
    print(f"Erro inesperado: {e}")
```

## Conclusão

O módulo `json` é uma ferramenta indispensável para qualquer aplicação Python que precise interagir com dados JSON. Seja para serializar objetos Python para armazenamento ou transmissão, ou para desserializar dados JSON recebidos de APIs ou arquivos, o módulo `json` oferece uma interface simples e eficiente. Dominar suas funções `dumps()`, `dump()`, `loads()` e `load()` é fundamental para trabalhar com dados estruturados de forma eficaz em Python.

