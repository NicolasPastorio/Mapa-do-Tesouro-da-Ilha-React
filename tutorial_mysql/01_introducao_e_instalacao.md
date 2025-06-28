# Módulo 1: Introdução ao MySQL e Instalação no Ubuntu

## 1.1 O que é MySQL?

MySQL é um sistema de gerenciamento de banco de dados relacional (RDBMS) de código aberto baseado em Structured Query Language (SQL). É uma das soluções de banco de dados mais populares para uma ampla variedade de aplicações, desde pequenos projetos pessoais até grandes sistemas empresariais. Sua popularidade se deve à sua robustez, escalabilidade, facilidade de uso e à vasta comunidade de suporte.

## 1.2 Por que usar MySQL no Terminal Linux Ubuntu?

O terminal Linux oferece um ambiente poderoso e flexível para interagir com o MySQL. Embora existam ferramentas gráficas, o domínio do terminal permite maior controle, automação de tarefas e é essencial para administradores de sistemas e desenvolvedores que trabalham em ambientes de servidor. O Ubuntu, por ser uma distribuição Linux amplamente utilizada e amigável, é uma excelente plataforma para aprender e praticar MySQL.

## 1.3 Instalação do MySQL Server no Ubuntu

Para começar a usar o MySQL, primeiro precisamos instalá-lo no seu sistema Ubuntu. O processo é relativamente simples e pode ser feito usando o gerenciador de pacotes `apt`.

### Passo 1: Atualizar os pacotes do sistema

É sempre uma boa prática atualizar a lista de pacotes e as atualizações existentes antes de instalar novos softwares. Abra o terminal (Ctrl+Alt+T) e execute os seguintes comandos:

```bash
sudo apt update
sudo apt upgrade
```

### Passo 2: Instalar o MySQL Server

Agora, instale o pacote `mysql-server`. Este pacote inclui o servidor MySQL e as ferramentas de cliente necessárias para interagir com ele.

```bash
sudo apt install mysql-server
```

Durante a instalação, você será solicitado a definir uma senha para o usuário `root` do MySQL. É crucial que você defina uma senha forte e a guarde em um local seguro. Esta senha será usada para acessar o servidor MySQL com privilégios administrativos.

### Passo 3: Verificar o status do serviço MySQL

Após a instalação, o serviço MySQL deve iniciar automaticamente. Você pode verificar o status do serviço com o seguinte comando:

```bash
sudo systemctl status mysql
```

Você deve ver uma saída indicando que o serviço está `active (running)`.

### Passo 4: Executar o script de segurança do MySQL

O MySQL vem com um script de segurança que ajuda a melhorar a segurança da sua instalação. Ele irá guiá-lo através de algumas etapas, como remover usuários anônimos, desabilitar o login remoto do root e remover o banco de dados de teste.

```bash
sudo mysql_secure_installation
```

Ao executar este script, você será solicitado a:

1.  **Validar o componente de senha (VALIDATE PASSWORD COMPONENT):** Recomenda-se habilitar este componente para garantir senhas fortes. Você pode escolher o nível de validação (LOW, MEDIUM, STRONG).
2.  **Alterar a senha do root:** Se você não definiu uma senha forte durante a instalação, o script permitirá que você a altere.
3.  **Remover usuários anônimos:** É altamente recomendável remover esses usuários para evitar acessos não autorizados.
4.  **Disallow root login remotely:** Desabilitar o login remoto para o usuário `root` aumenta a segurança, pois o `root` só poderá se conectar localmente.
5.  **Remover o banco de dados de teste e acesso a ele:** O banco de dados `test` é criado por padrão e pode ser um risco de segurança.
6.  **Recarregar as tabelas de privilégios:** Isso garante que as alterações de segurança sejam aplicadas imediatamente.

Responda `Y` (sim) para todas as perguntas, exceto se você tiver um motivo específico para não fazê-lo. Para o componente de validação de senha, escolha o nível que melhor se adapta às suas necessidades, mas `MEDIUM` ou `STRONG` são preferíveis.

## 1.4 Acessando o MySQL via Terminal

Com o MySQL instalado e seguro, você pode acessá-lo a partir do terminal usando o cliente MySQL.

### Conectando como usuário root

Para se conectar como o usuário `root` (o usuário administrativo), use o seguinte comando e insira a senha que você definiu durante a instalação ou no script de segurança:

```bash
mysql -u root -p
```

Após inserir a senha correta, você verá o prompt do MySQL (`mysql>`), indicando que você está conectado ao servidor.

### Criando um novo usuário (recomendado para o dia a dia)

Não é uma boa prática usar o usuário `root` para todas as operações. É melhor criar um usuário com privilégios específicos para suas tarefas diárias. Vamos criar um novo usuário chamado `dev_user` com a senha `dev_password` (substitua por uma senha forte de sua escolha).

Primeiro, conecte-se como `root`:

```bash
mysql -u root -p
```

Dentro do prompt do MySQL, execute os seguintes comandos:

```sql
CREATE USER 'dev_user'@'localhost' IDENTIFIED BY 'dev_password';
GRANT ALL PRIVILEGES ON *.* TO 'dev_user'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

**Explicação dos comandos:**

*   `CREATE USER 'dev_user'@'localhost' IDENTIFIED BY 'dev_password';`: Cria um novo usuário chamado `dev_user` que pode se conectar apenas do `localhost` (sua própria máquina) e define sua senha.
*   `GRANT ALL PRIVILEGES ON *.* TO 'dev_user'@'localhost' WITH GRANT OPTION;`: Concede todos os privilégios em todos os bancos de dados (`*.*`) para o `dev_user` quando ele se conecta do `localhost`. O `WITH GRANT OPTION` permite que este usuário conceda privilégios a outros usuários (use com cautela).
*   `FLUSH PRIVILEGES;`: Recarrega as tabelas de privilégios para que as alterações entrem em vigor imediatamente.
*   `EXIT;`: Sai do prompt do MySQL.

### Conectando como o novo usuário

Agora você pode se conectar com o novo usuário que acabou de criar:

```bash
mysql -u dev_user -p
```

Você estará no prompt do MySQL, pronto para começar a trabalhar com bancos de dados.

