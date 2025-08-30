# os: Interagindo com o Sistema Operacional em Python

O módulo `os` em Python fornece uma maneira portátil de interagir com o sistema operacional. Ele oferece funções para trabalhar com caminhos de arquivo, diretórios, variáveis de ambiente, processos e muito mais. Embora o módulo `pathlib` seja a abordagem moderna e orientada a objetos para manipulação de caminhos, o `os` ainda é fundamental para muitas operações de baixo nível e interações diretas com o sistema.

## 1. Caminhos e Diretórios

O módulo `os.path` (que é parte do módulo `os`) contém funções úteis para manipular nomes de caminhos de forma independente do sistema operacional.

```python
import os

print("\n--- Operações com Caminhos e Diretórios ---")

# Diretório de trabalho atual
current_dir = os.getcwd()
print(f"Diretório de trabalho atual: {current_dir}")

# Mudar diretório de trabalho
# os.chdir("/tmp")
# print(f"Novo diretório de trabalho: {os.getcwd()}")
# os.chdir(current_dir) # Voltar ao original

# Listar conteúdo de um diretório
print("Conteúdo do diretório atual:")
for item in os.listdir(current_dir):
    print(f"  - {item}")

# Criar um diretório
new_dir = "./meu_novo_diretorio"
if not os.path.exists(new_dir):
    os.mkdir(new_dir)
    print(f"Diretório '{new_dir}' criado.")
else:
    print(f"Diretório '{new_dir}' já existe.")

# Criar diretórios aninhados (recursivamente)
nested_dir = "./dir1/dir2/dir3"
if not os.path.exists(nested_dir):
    os.makedirs(nested_dir)
    print(f"Diretórios '{nested_dir}' criados.")
else:
    print(f"Diretórios '{nested_dir}' já existem.")

# Remover um diretório vazio
if os.path.exists(new_dir):
    os.rmdir(new_dir)
    print(f"Diretório '{new_dir}' removido.")

# Remover diretórios aninhados (recursivamente) - CUIDADO!
# Use shutil.rmtree para remover diretórios não vazios
# if os.path.exists(nested_dir):
#     os.removedirs(nested_dir) # Remove dir3, dir2, dir1 se estiverem vazios
#     print(f"Diretórios '{nested_dir}' removidos.")

# Juntar caminhos de forma segura
file_path = os.path.join(current_dir, "documentos", "relatorio.txt")
print(f"Caminho completo do arquivo: {file_path}")

# Obter nome do diretório e nome do arquivo de um caminho
dir_name, file_name = os.path.split(file_path)
print(f"Nome do diretório: {dir_name}, Nome do arquivo: {file_name}")

# Obter extensão do arquivo
base_name, extension = os.path.splitext(file_name)
print(f"Nome base: {base_name}, Extensão: {extension}")

# Verificar se é um arquivo ou diretório
print(f"'{current_dir}' é um diretório? {os.path.isdir(current_dir)}")
print(f"'{file_path}' é um arquivo? {os.path.isfile(file_path)}")

# Verificar se um caminho existe
print(f"'{current_dir}' existe? {os.path.exists(current_dir)}")
```

## 2. Variáveis de Ambiente

O módulo `os` permite acessar e modificar variáveis de ambiente do sistema.

```python
import os

print("\n--- Variáveis de Ambiente ---")

# Acessar uma variável de ambiente
path_var = os.environ.get("PATH")
print(f"Variável PATH: {path_var[:50]}...") # Imprime apenas os primeiros 50 caracteres

# Definir uma variável de ambiente (apenas para o processo atual e seus filhos)
os.environ["MINHA_VAR"] = "Valor Teste"
print(f"MINHA_VAR: {os.environ.get("MINHA_VAR")}")

# Remover uma variável de ambiente
del os.environ["MINHA_VAR"]
print(f"MINHA_VAR após remoção: {os.environ.get("MINHA_VAR")}")
```

## 3. Informações do Sistema e Processos

O módulo `os` também fornece funções para obter informações sobre o sistema e o processo atual.

```python
import os

print("\n--- Informações do Sistema e Processos ---")

# Nome do sistema operacional
print(f"Nome do SO: {os.name}") # 'posix' para Linux/Unix, 'nt' para Windows

# Nome do sistema operacional (mais detalhado)
print(f"Nome do SO (uname): {os.uname().sysname}")

# ID do processo atual
print(f"PID do processo atual: {os.getpid()}")

# ID do usuário efetivo
print(f"UID efetivo: {os.geteuid()}")

# ID do grupo efetivo
print(f"GID efetivo: {os.getegid()}")

# Executar um comando do sistema (método antigo, preferir subprocess)
# os.system("echo Olá do os.system!")

# Obter o número de CPUs
print(f"Número de CPUs: {os.cpu_count()}")
```

## 4. Permissões de Arquivo

Você pode usar o módulo `os` para verificar e modificar permissões de arquivo.

```python
import os
import stat # Módulo para constantes de modo de arquivo

print("\n--- Permissões de Arquivo ---")

# Criar um arquivo de teste
test_file = "./teste_permissoes.txt"
with open(test_file, "w") as f:
    f.write("Conteúdo de teste.")

# Obter informações do arquivo (stat object)
file_stat = os.stat(test_file)
print(f"Permissões de '{test_file}': {oct(file_stat.st_mode)}")

# Verificar se o arquivo é executável para o usuário atual
if os.access(test_file, os.X_OK):
    print(f"'{test_file}' é executável.")
else:
    print(f"'{test_file}' NÃO é executável.")

# Mudar permissões (adicionar permissão de execução para o proprietário)
# stat.S_IXUSR é a constante para permissão de execução do proprietário
os.chmod(test_file, file_stat.st_mode | stat.S_IXUSR)
print(f"Novas permissões de '{test_file}': {oct(os.stat(test_file).st_mode)}")

# Remover o arquivo de teste
os.remove(test_file)
print(f"Arquivo '{test_file}' removido.")
```

## Conclusão

O módulo `os` é uma parte fundamental da biblioteca padrão do Python para interagir com o sistema operacional. Ele fornece uma interface consistente e portátil para gerenciar arquivos, diretórios, variáveis de ambiente e processos. Embora `pathlib` seja preferível para manipulação de caminhos e `subprocess` para execução de comandos externos, o `os` continua sendo indispensável para operações de baixo nível e para obter informações detalhadas sobre o ambiente de execução. Dominar o `os` é crucial para escrever scripts Python robustos e eficientes que interagem com o sistema Linux.

