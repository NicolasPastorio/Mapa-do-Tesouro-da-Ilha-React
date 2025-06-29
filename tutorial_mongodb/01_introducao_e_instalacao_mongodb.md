# Módulo 1: Introdução ao MongoDB e Instalação no Ubuntu

## 1.1 O que é MongoDB?

MongoDB é um banco de dados NoSQL (Not Only SQL) orientado a documentos, de código aberto e multiplataforma. Diferente dos bancos de dados relacionais que armazenam dados em tabelas com linhas e colunas, o MongoDB armazena dados em documentos BSON (Binary JSON), que são estruturas de dados flexíveis e semelhantes a JSON. Essa flexibilidade permite que o MongoDB lide com dados não estruturados ou semi-estruturados de forma eficiente, tornando-o ideal para aplicações modernas que exigem escalabilidade e agilidade no desenvolvimento.

## 1.2 Por que usar MongoDB no Terminal Linux Ubuntu?

O terminal Linux oferece um ambiente robusto para interagir com o MongoDB, especialmente para administradores de banco de dados e desenvolvedores que precisam de controle direto e automação. O Ubuntu, sendo uma das distribuições Linux mais populares e amigáveis, é uma excelente escolha para aprender e praticar MongoDB. A interação via terminal (`mongosh` ou `mongo` para versões mais antigas) permite executar comandos de forma rápida, criar scripts e gerenciar o banco de dados de forma eficiente.

## 1.3 Instalação do MongoDB Community Edition no Ubuntu

Vamos instalar a versão Community Edition do MongoDB no Ubuntu. O processo envolve adicionar a chave GPG pública do MongoDB, configurar o repositório e, em seguida, instalar os pacotes necessários.

### Passo 1: Importar a Chave GPG Pública do MongoDB

Primeiro, importe a chave GPG pública usada pelo sistema de gerenciamento de pacotes do MongoDB. Isso garante a autenticidade dos pacotes.

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```

**Nota:** O comando `apt-key add` está depreciado em versões mais recentes do Ubuntu. Uma alternativa mais moderna e segura é salvar a chave em `/etc/apt/trusted.gpg.d/`.

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/mongodb.gpg > /dev/null
```

### Passo 2: Criar o Arquivo de Lista para o MongoDB

Em seguida, crie o arquivo de lista `/etc/apt/sources.list.d/mongodb-org-6.0.list` para o MongoDB. Este arquivo informa ao `apt` onde encontrar os pacotes do MongoDB. Certifique-se de usar a versão correta do Ubuntu (por exemplo, `jammy` para Ubuntu 22.04, `focal` para Ubuntu 20.04).

Para Ubuntu 22.04 (Jammy Jellyfish):

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

Para Ubuntu 20.04 (Focal Fossa):

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

### Passo 3: Recarregar o Banco de Dados de Pacotes Locais

Após adicionar o novo repositório, você precisa atualizar a lista de pacotes para que o sistema reconheça os pacotes do MongoDB.

```bash
sudo apt update
```

### Passo 4: Instalar os Pacotes do MongoDB

Agora você pode instalar a versão mais recente do MongoDB Community Edition. O pacote `mongodb-org` instala os seguintes componentes:

*   `mongod`: O daemon do servidor MongoDB.
*   `mongosh`: O shell interativo do MongoDB.
*   `mongos`: O daemon do roteador de fragmentos (sharding).
*   `mongodb-database-tools`: Ferramentas de linha de comando para importar/exportar dados, backup/restauração, etc.

```bash
sudo apt install -y mongodb-org
```

### Passo 5: Iniciar o MongoDB

Após a instalação, inicie o serviço `mongod`.

```bash
sudo systemctl start mongod
```

### Passo 6: Verificar o Status do MongoDB

Verifique se o serviço `mongod` está em execução.

```bash
sudo systemctl status mongod
```

Você deve ver uma saída indicando que o serviço está `active (running)`.

### Passo 7: Habilitar o MongoDB para Iniciar na Inicialização do Sistema

Para que o MongoDB inicie automaticamente a cada reinicialização do sistema, habilite-o:

```bash
sudo systemctl enable mongod
```

## 1.4 Acessando o MongoDB via Terminal (`mongosh`)

Com o MongoDB instalado e em execução, você pode interagir com ele usando o shell `mongosh`.

### Conectando ao MongoDB

Simplesmente digite `mongosh` no terminal para se conectar à instância local do MongoDB.

```bash
mongosh
```

Você verá o prompt do `mongosh` (`test>`), indicando que você está conectado ao servidor e no banco de dados `test` (o banco de dados padrão).

### Comandos Básicos no `mongosh`

*   **Verificar o banco de dados atual:**

    ```javascript
db
    ```

*   **Listar todos os bancos de dados:**

    ```javascript
show dbs
    ```

*   **Sair do `mongosh`:**

    ```javascript
exit
    ```

Este módulo cobriu a instalação e o acesso básico ao MongoDB no terminal do Ubuntu. No próximo módulo, vamos explorar os comandos básicos para manipular bancos de dados e coleções.

