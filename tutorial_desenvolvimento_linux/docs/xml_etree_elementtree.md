# xml.etree.ElementTree: Manipulando XML em Python

O módulo `xml.etree.ElementTree` (geralmente importado como `ET`) da biblioteca padrão do Python fornece uma API leve e eficiente para trabalhar com dados XML. Ele permite que você analise (parse) documentos XML, crie novas estruturas XML, modifique elementos existentes e serialize árvores XML de volta para strings ou arquivos. É uma excelente escolha para tarefas de manipulação de XML que não exigem a complexidade de APIs DOM ou SAX completas.

## 1. O que é XML e por que usá-lo?

XML (Extensible Markup Language) é uma linguagem de marcação que define um conjunto de regras para codificar documentos em um formato que é legível por humanos e por máquinas. É amplamente utilizado para:

*   **Troca de Dados:** Intercâmbio de informações entre diferentes sistemas.
*   **Configuração:** Armazenamento de configurações de aplicações.
*   **Documentos:** Representação de documentos estruturados.

Embora JSON tenha se tornado mais popular para APIs web, XML ainda é prevalente em muitos sistemas legados, serviços web (SOAP), e formatos de arquivo (como SVG, Office Open XML).

## 2. Analisando (Parsing) Documentos XML

`ElementTree` representa o XML como uma estrutura de árvore, onde cada nó é um `Element`. O elemento raiz é o ponto de entrada para a árvore.

### Analisando de uma String

Use `ET.fromstring()` para analisar uma string XML.

```python
import xml.etree.ElementTree as ET

print("\n--- Exemplo 1: Analisando XML de uma String ---")

xml_string = """
<root>
    <item id="1">
        <name>Produto A</name>
        <price>10.99</price>
    </item>
    <item id="2">
        <name>Produto B</name>
        <price>20.50</price>
    </item>
</root>
"""

# Analisa a string XML e obtém o elemento raiz
root = ET.fromstring(xml_string)

print(f"Nome do elemento raiz: {root.tag}")

# Iterando sobre os filhos do elemento raiz
print("\nItens no XML:")
for item in root:
    print(f"  ID: {item.get("id")}")
    print(f"  Nome: {item.find("name").text}")
    print(f"  Preço: {item.find("price").text}")
```

### Analisando de um Arquivo

Use `ET.parse()` para analisar um arquivo XML.

```python
import xml.etree.ElementTree as ET
import os

print("\n--- Exemplo 2: Analisando XML de um Arquivo ---")

# Criar um arquivo XML de teste
xml_file_content = """
<config>
    <database>
        <host>localhost</host>
        <port>5432</port>
    </database>
    <api_key>xyz123</api_key>
</config>
"""

file_name = "config.xml"
with open(file_name, "w") as f:
    f.write(xml_file_content)

# Analisa o arquivo XML
tree = ET.parse(file_name)
root = tree.getroot()

print(f"Nome do elemento raiz: {root.tag}")

host = root.find("database/host").text
api_key = root.find("api_key").text

print(f"Host do banco de dados: {host}")
print(f"API Key: {api_key}")

os.remove(file_name) # Limpa o arquivo de teste
```

**Métodos Comuns para Acessar Elementos:**

*   `element.tag`: O nome da tag do elemento.
*   `element.text`: O texto contido no elemento.
*   `element.attrib`: Um dicionário de atributos do elemento.
*   `element.get(key)`: Obtém o valor de um atributo.
*   `element.find(xpath)`: Encontra o primeiro subelemento que corresponde ao caminho XPath.
*   `element.findall(xpath)`: Encontra todos os subelementos que correspondem ao caminho XPath.
*   `element.iter(tag=None)`: Itera sobre o elemento e seus subelementos (pré-ordem).

## 3. Criando e Modificando Documentos XML

Você pode construir árvores XML do zero ou modificar árvores existentes.

### Criando XML do Zero

Use `ET.Element()` para criar elementos e `ET.SubElement()` para adicionar filhos.

```python
import xml.etree.ElementTree as ET

print("\n--- Exemplo 3: Criando XML do Zero ---")

# Cria o elemento raiz
root = ET.Element("data")

# Adiciona subelementos
item1 = ET.SubElement(root, "item", id="A1")
name1 = ET.SubElement(item1, "name")
name1.text = "Item Um"
price1 = ET.SubElement(item1, "price")
price1.text = "100.00"

item2 = ET.SubElement(root, "item", id="B2")
name2 = ET.SubElement(item2, "name")
name2.text = "Item Dois"
price2 = ET.SubElement(item2, "price")
price2.text = "250.75"

# Cria um objeto ElementTree a partir do elemento raiz
tree = ET.ElementTree(root)

# Converte a árvore para uma string XML formatada
xml_output = ET.tostring(root, encoding=\'unicode\', pretty_print=True)
print("XML Gerado:\n", xml_output)
```

**Observação:** `pretty_print=True` não é um argumento padrão de `ET.tostring()`. Para formatar a saída, você precisaria de uma biblioteca externa ou de uma função auxiliar. O exemplo acima usa `encoding='unicode'` para obter uma string Python.

### Modificando Elementos

Você pode alterar o texto, atributos e adicionar/remover subelementos.

```python
import xml.etree.ElementTree as ET

print("\n--- Exemplo 4: Modificando XML ---")

xml_string = """
<catalog>
    <book id="bk101">
        <author>Gambardella, Matthew</author>
        <title>XML Developer's Guide</title>
        <price>44.95</price>
    </book>
</catalog>
"""

root = ET.fromstring(xml_string)

# Encontra o livro e modifica o preço
book = root.find("book")
if book:
    price = book.find("price")
    if price:
        price.text = "49.99" # Altera o texto

    # Adiciona um novo elemento
    pages = ET.SubElement(book, "pages")
    pages.text = "600"

    # Modifica um atributo
    book.set("status", "available")

# Remove um elemento
# author = book.find("author")
# if author:
#     book.remove(author)

xml_output = ET.tostring(root, encoding=\'unicode\')
print("XML Modificado:\n", xml_output)
```

## 4. Salvando XML em um Arquivo

Use o método `write()` do objeto `ElementTree` para salvar a árvore XML em um arquivo.

```python
import xml.etree.ElementTree as ET
import os

print("\n--- Exemplo 5: Salvando XML em Arquivo ---")

root = ET.Element("data")
ET.SubElement(root, "message").text = "Olá, XML!"

tree = ET.ElementTree(root)

output_file = "output.xml"
tree.write(output_file, encoding="utf-8", xml_declaration=True)

print(f"XML salvo em \'{output_file}\'.")

# Verificar o conteúdo do arquivo
with open(output_file, "r") as f:
    print("Conteúdo do arquivo salvo:\n", f.read())

os.remove(output_file) # Limpa o arquivo de teste
```

**Observações:**

*   `encoding="utf-8"`: Define a codificação do arquivo de saída.
*   `xml_declaration=True`: Adiciona a declaração `<?xml version="1.0" encoding="utf-8"?>` ao início do arquivo.

## Conclusão

O módulo `xml.etree.ElementTree` é uma ferramenta robusta e fácil de usar para manipulação de XML em Python. Ele oferece uma abordagem baseada em árvore que simplifica a leitura, escrita e modificação de documentos XML. Seja para analisar arquivos de configuração, processar dados de serviços web ou gerar novos documentos XML, `ElementTree` é uma escolha eficiente e flexível para suas necessidades de manipulação de XML.

