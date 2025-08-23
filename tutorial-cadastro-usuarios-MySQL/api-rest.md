# API REST com Node.js e MySQL para Cadastro de Usuários

## Introdução

A criação de uma API REST (Representational State Transfer) é fundamental para o desenvolvimento de aplicações modernas que necessitam de comunicação entre diferentes sistemas e plataformas. Neste tutorial abrangente, você aprenderá a construir uma API robusta utilizando Node.js como runtime JavaScript no servidor e MySQL como sistema de gerenciamento de banco de dados relacional.

Node.js revolucionou o desenvolvimento backend ao permitir que desenvolvedores utilizem JavaScript tanto no frontend quanto no backend, criando um ecossistema unificado de desenvolvimento. Sua arquitetura baseada em eventos e I/O não-bloqueante torna-o ideal para aplicações que requerem alta concorrência e performance, características essenciais para APIs que servirão múltiplos clientes simultaneamente.

MySQL, por sua vez, é um dos sistemas de gerenciamento de banco de dados relacionais mais populares e confiáveis do mundo. Sua robustez, performance e facilidade de uso o tornam uma escolha excelente para aplicações que necessitam de consistência de dados e transações ACID (Atomicidade, Consistência, Isolamento e Durabilidade).

A combinação dessas tecnologias permite criar APIs escaláveis, performáticas e confiáveis, capazes de atender desde pequenas aplicações até sistemas empresariais de grande porte. Durante este tutorial, você não apenas aprenderá a implementar funcionalidades básicas de cadastro de usuários, mas também compreenderá os princípios fundamentais que regem o desenvolvimento de APIs REST profissionais.

## Configuração do Ambiente de Desenvolvimento

### Instalação do Node.js

O primeiro passo para desenvolver nossa API é configurar adequadamente o ambiente de desenvolvimento. Node.js pode ser instalado de várias maneiras, sendo as mais comuns através do site oficial, gerenciadores de versão como NVM (Node Version Manager), ou gerenciadores de pacotes do sistema operacional.

Para usuários do Windows, recomenda-se baixar o instalador oficial do site nodejs.org, escolhendo a versão LTS (Long Term Support) para garantir estabilidade e suporte prolongado. Durante a instalação, certifique-se de marcar a opção para adicionar Node.js ao PATH do sistema, permitindo que seja executado de qualquer diretório no terminal.

Usuários de macOS podem utilizar o Homebrew executando o comando `brew install node`, ou baixar o instalador oficial. Para sistemas Linux baseados em Debian/Ubuntu, pode-se utilizar o comando `sudo apt update && sudo apt install nodejs npm`, embora seja recomendado utilizar o NodeSource repository para obter versões mais atualizadas.

Após a instalação, verifique se tudo está funcionando corretamente executando os comandos `node --version` e `npm --version` no terminal. Ambos devem retornar os números das versões instaladas, confirmando que a instalação foi bem-sucedida.

### Configuração do MySQL

MySQL pode ser instalado através de diferentes métodos dependendo do sistema operacional. Para Windows, o MySQL Installer disponível no site oficial oferece uma interface gráfica intuitiva para instalação e configuração inicial. Durante o processo, você definirá a senha do usuário root e poderá configurar o MySQL como um serviço do Windows.

Em sistemas macOS, o Homebrew novamente oferece uma solução simples com `brew install mysql`, seguido de `brew services start mysql` para iniciar o serviço. Alternativamente, o MySQL Workbench pode ser instalado para fornecer uma interface gráfica completa para administração do banco de dados.

Para distribuições Linux, o processo varia ligeiramente. Em sistemas baseados em Debian/Ubuntu, utilize `sudo apt update && sudo apt install mysql-server`. Após a instalação, execute `sudo mysql_secure_installation` para configurar as opções de segurança básicas, incluindo a definição da senha do usuário root.

Independentemente do método de instalação, é crucial testar a conectividade executando `mysql -u root -p` no terminal e inserindo a senha definida durante a configuração. Uma conexão bem-sucedida confirmará que o MySQL está funcionando corretamente e pronto para receber nossa aplicação.

### Inicialização do Projeto Node.js

Com o ambiente configurado, podemos inicializar nosso projeto Node.js. Crie um diretório para o projeto executando `mkdir api-cadastro-usuarios && cd api-cadastro-usuarios`. Este será o diretório raiz de nossa API, onde todos os arquivos e dependências serão organizados.

Execute `npm init -y` para criar o arquivo package.json com configurações padrão. Este arquivo é fundamental pois define as metainformações do projeto, incluindo dependências, scripts de execução e configurações específicas. Embora o comando com flag `-y` aceite todas as configurações padrão, você pode editar o arquivo posteriormente para personalizar informações como nome, descrição, autor e versão do projeto.

A estrutura inicial do projeto deve seguir boas práticas de organização. Crie os diretórios `src` para código-fonte, `config` para arquivos de configuração, `database` para scripts relacionados ao banco de dados, e `tests` para testes automatizados. Esta organização facilitará a manutenção e escalabilidade do projeto conforme ele cresce em complexidade.

Dentro do diretório `src`, crie subdiretórios para `controllers` (lógica de controle das rotas), `models` (definições de modelos de dados), `routes` (definições de rotas da API), `services` (lógica de negócio), e `middleware` (funções intermediárias para processamento de requisições). Esta arquitetura modular promove separação de responsabilidades e facilita testes unitários.

## Instalação e Configuração de Dependências

### Dependências Principais

Nossa API necessitará de várias dependências para funcionar adequadamente. Execute `npm install express mysql2 dotenv cors helmet morgan` para instalar as dependências principais. Cada uma dessas bibliotecas desempenha um papel específico na construção de nossa API robusta e segura.

Express.js é o framework web mais popular para Node.js, fornecendo uma camada de abstração sobre o módulo HTTP nativo. Ele simplifica significativamente a criação de rotas, middleware e manipulação de requisições e respostas HTTP. Sua arquitetura minimalista e flexível permite que desenvolvedores construam desde APIs simples até aplicações web complexas.

MySQL2 é um driver MySQL para Node.js que oferece melhor performance e suporte a recursos modernos comparado ao driver mysql original. Ele suporta prepared statements, conexões assíncronas e promises nativas, características essenciais para aplicações modernas que requerem alta performance e segurança.

Dotenv permite carregar variáveis de ambiente de um arquivo .env, facilitando a configuração de diferentes ambientes (desenvolvimento, teste, produção) sem modificar o código-fonte. Esta prática é fundamental para manter informações sensíveis como credenciais de banco de dados fora do controle de versão.

CORS (Cross-Origin Resource Sharing) é um middleware que configura cabeçalhos HTTP para permitir que aplicações frontend executando em diferentes domínios acessem nossa API. Sem esta configuração, navegadores modernos bloqueariam requisições cross-origin por questões de segurança.

Helmet adiciona várias camadas de segurança configurando cabeçalhos HTTP apropriados. Ele protege contra vulnerabilidades comuns como clickjacking, cross-site scripting (XSS) e outros ataques baseados em cabeçalhos HTTP maliciosos.

Morgan é um middleware de logging que registra informações detalhadas sobre requisições HTTP, incluindo método, URL, código de status, tempo de resposta e tamanho da resposta. Estas informações são valiosas para monitoramento, debugging e análise de performance.

### Dependências de Desenvolvimento

Para o ambiente de desenvolvimento, instale dependências adicionais executando `npm install --save-dev nodemon jest supertest`. Estas ferramentas melhorarão significativamente a experiência de desenvolvimento e qualidade do código.

Nodemon monitora alterações nos arquivos do projeto e reinicia automaticamente o servidor Node.js, eliminando a necessidade de reinicialização manual a cada modificação. Esta funcionalidade acelera o ciclo de desenvolvimento e reduz a possibilidade de esquecer de reiniciar o servidor após alterações.

Jest é um framework de testes JavaScript desenvolvido pelo Facebook, oferecendo uma solução completa para testes unitários, de integração e snapshot. Sua configuração zero e recursos avançados como mocking automático e coverage reports o tornam ideal para garantir a qualidade e confiabilidade de nossa API.

Supertest é uma biblioteca que facilita testes de APIs HTTP, permitindo fazer requisições de teste e verificar respostas de forma programática. Combinado com Jest, oferece uma solução poderosa para testes de integração que verificam o comportamento completo da API.

### Configuração do Arquivo .env

Crie um arquivo `.env` na raiz do projeto para armazenar variáveis de ambiente sensíveis. Este arquivo deve conter configurações como credenciais de banco de dados, chaves secretas e configurações específicas do ambiente. Um exemplo de configuração seria:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=cadastro_usuarios
JWT_SECRET=sua_chave_secreta_jwt_muito_longa_e_complexa
PORT=3000
NODE_ENV=development
```

É fundamental adicionar o arquivo `.env` ao `.gitignore` para evitar que informações sensíveis sejam commitadas no repositório. Crie um arquivo `.env.example` com as mesmas chaves mas sem os valores reais, servindo como template para outros desenvolvedores configurarem seus próprios ambientes.

A variável JWT_SECRET deve ser uma string longa e complexa, preferencialmente gerada aleatoriamente. Esta chave será utilizada para assinar e verificar tokens JWT, sendo crucial para a segurança do sistema de autenticação. Em produção, considere utilizar um gerador de chaves criptográficas para criar uma chave ainda mais segura.

## Criação e Configuração do Banco de Dados

### Design do Esquema de Dados

O design adequado do esquema de dados é fundamental para o sucesso de qualquer aplicação. Para nosso sistema de cadastro de usuários, começaremos com uma estrutura simples mas extensível que pode ser expandida conforme necessário.

A tabela principal `users` armazenará informações essenciais dos usuários. O campo `id` será a chave primária, utilizando AUTO_INCREMENT para garantir unicidade automática. O tipo INT UNSIGNED é adequado para a maioria das aplicações, suportando mais de 4 bilhões de registros únicos.

O campo `username` armazenará o nome de usuário único para cada conta. Utilizaremos VARCHAR(50) com restrição UNIQUE para garantir que não existam usernames duplicados. Esta limitação de tamanho é adequada para a maioria dos casos de uso e ajuda a manter a performance das consultas.

O campo `email` também será único e utilizará VARCHAR(255) para acomodar endereços de email longos. A validação de formato será implementada tanto no nível da aplicação quanto através de constraints do banco de dados para garantir integridade dos dados.

O campo `password` armazenará o hash da senha do usuário, nunca a senha em texto plano. Utilizaremos VARCHAR(255) para acomodar diferentes algoritmos de hash que possam ser implementados no futuro, garantindo flexibilidade e segurança.

Campos de timestamp como `created_at` e `updated_at` são essenciais para auditoria e rastreamento de alterações. O MySQL oferece funcionalidades automáticas para estes campos, eliminando a necessidade de gerenciamento manual.

### Script de Criação do Banco

Crie um arquivo `database/schema.sql` contendo os comandos SQL para criação do banco de dados e tabelas. Este script deve ser idempotente, ou seja, pode ser executado múltiplas vezes sem causar erros ou inconsistências.

```sql
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS cadastro_usuarios 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Seleção do banco de dados
USE cadastro_usuarios;

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para otimização de consultas
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- Criação da tabela de tokens de verificação
CREATE TABLE IF NOT EXISTS verification_tokens (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    token_type ENUM('email_verification', 'password_reset') NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);
```

A escolha do charset utf8mb4 e collation utf8mb4_unicode_ci garante suporte completo a caracteres Unicode, incluindo emojis e caracteres especiais de diferentes idiomas. Esta configuração é essencial para aplicações modernas que podem ter usuários internacionais.

Os índices adicionados otimizam consultas frequentes como busca por username, email e ordenação por data de criação. Embora adicionem overhead nas operações de escrita, significativamente melhoram a performance de leitura, que geralmente representa a maioria das operações em sistemas de cadastro.

### Configuração da Conexão com o Banco

Crie um arquivo `config/database.js` para centralizar a configuração de conexão com o banco de dados. Este arquivo utilizará as variáveis de ambiente definidas no arquivo .env e implementará um pool de conexões para otimizar performance.

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração do pool de conexões
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    charset: 'utf8mb4'
});

// Função para testar a conexão
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexão com MySQL estabelecida com sucesso');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar com MySQL:', error.message);
        return false;
    }
}

// Função para executar queries com tratamento de erro
async function executeQuery(query, params = []) {
    try {
        const [results] = await pool.execute(query, params);
        return results;
    } catch (error) {
        console.error('Erro na execução da query:', error.message);
        throw error;
    }
}

module.exports = {
    pool,
    testConnection,
    executeQuery
};
```

O pool de conexões é uma técnica fundamental para otimização de performance em aplicações que fazem múltiplas consultas ao banco de dados. Em vez de criar e destruir conexões para cada operação, o pool mantém um conjunto de conexões reutilizáveis, reduzindo significativamente o overhead de estabelecimento de conexão.

A configuração `connectionLimit: 10` define o número máximo de conexões simultâneas. Este valor deve ser ajustado baseado na capacidade do servidor MySQL e no padrão de uso esperado da aplicação. Para aplicações de pequeno a médio porte, 10 conexões são geralmente suficientes.

O parâmetro `acquireTimeout: 60000` define o tempo máximo (em milissegundos) que a aplicação aguardará por uma conexão disponível no pool. Este timeout previne que a aplicação trave indefinidamente em situações de alta concorrência.

## Desenvolvimento dos Modelos de Dados

### Modelo de Usuário

Crie um arquivo `src/models/User.js` que encapsulará todas as operações relacionadas à entidade usuário. Este modelo seguirá o padrão Active Record, onde cada instância representa um registro no banco de dados e contém métodos para manipulação dos dados.

```javascript
const { executeQuery } = require('../../config/database');
const bcrypt = require('bcrypt');

class User {
    constructor(data = {}) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.firstName = data.first_name || data.firstName;
        this.lastName = data.last_name || data.lastName;
        this.isActive = data.is_active !== undefined ? data.is_active : true;
        this.emailVerified = data.email_verified || false;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    // Método para criar um novo usuário
    async save() {
        if (this.id) {
            return await this.update();
        } else {
            return await this.create();
        }
    }

    // Método privado para criação
    async create() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        
        const query = `
            INSERT INTO users (username, email, password, first_name, last_name, is_active, email_verified)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        const params = [
            this.username,
            this.email,
            hashedPassword,
            this.firstName,
            this.lastName,
            this.isActive,
            this.emailVerified
        ];

        try {
            const result = await executeQuery(query, params);
            this.id = result.insertId;
            this.password = undefined; // Remove password do objeto por segurança
            return this;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.message.includes('username')) {
                    throw new Error('Username já está em uso');
                } else if (error.message.includes('email')) {
                    throw new Error('Email já está em uso');
                }
            }
            throw error;
        }
    }

    // Método privado para atualização
    async update() {
        let query = `
            UPDATE users 
            SET username = ?, email = ?, first_name = ?, last_name = ?, is_active = ?, email_verified = ?
        `;
        let params = [this.username, this.email, this.firstName, this.lastName, this.isActive, this.emailVerified];

        if (this.password) {
            const hashedPassword = await bcrypt.hash(this.password, 12);
            query += `, password = ?`;
            params.push(hashedPassword);
        }

        query += ` WHERE id = ?`;
        params.push(this.id);

        try {
            await executeQuery(query, params);
            this.password = undefined; // Remove password do objeto por segurança
            return this;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.message.includes('username')) {
                    throw new Error('Username já está em uso');
                } else if (error.message.includes('email')) {
                    throw new Error('Email já está em uso');
                }
            }
            throw error;
        }
    }

    // Método estático para buscar usuário por ID
    static async findById(id) {
        const query = 'SELECT * FROM users WHERE id = ?';
        const results = await executeQuery(query, [id]);
        
        if (results.length === 0) {
            return null;
        }
        
        return new User(results[0]);
    }

    // Método estático para buscar usuário por email
    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const results = await executeQuery(query, [email]);
        
        if (results.length === 0) {
            return null;
        }
        
        return new User(results[0]);
    }

    // Método estático para buscar usuário por username
    static async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const results = await executeQuery(query, [username]);
        
        if (results.length === 0) {
            return null;
        }
        
        return new User(results[0]);
    }

    // Método para verificar senha
    async verifyPassword(plainPassword) {
        if (!this.password) {
            // Recarrega o usuário com a senha se necessário
            const userWithPassword = await User.findById(this.id);
            this.password = userWithPassword.password;
        }
        
        return await bcrypt.compare(plainPassword, this.password);
    }

    // Método para converter para JSON (remove campos sensíveis)
    toJSON() {
        const obj = { ...this };
        delete obj.password;
        return obj;
    }

    // Método estático para listar usuários com paginação
    static async findAll(page = 1, limit = 10, filters = {}) {
        const offset = (page - 1) * limit;
        let query = 'SELECT * FROM users WHERE 1=1';
        let countQuery = 'SELECT COUNT(*) as total FROM users WHERE 1=1';
        const params = [];

        // Aplicar filtros
        if (filters.isActive !== undefined) {
            query += ' AND is_active = ?';
            countQuery += ' AND is_active = ?';
            params.push(filters.isActive);
        }

        if (filters.emailVerified !== undefined) {
            query += ' AND email_verified = ?';
            countQuery += ' AND email_verified = ?';
            params.push(filters.emailVerified);
        }

        if (filters.search) {
            query += ' AND (username LIKE ? OR email LIKE ? OR first_name LIKE ? OR last_name LIKE ?)';
            countQuery += ' AND (username LIKE ? OR email LIKE ? OR first_name LIKE ? OR last_name LIKE ?)';
            const searchTerm = `%${filters.search}%`;
            params.push(searchTerm, searchTerm, searchTerm, searchTerm);
        }

        // Ordenação e paginação
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        const queryParams = [...params, limit, offset];
        const countParams = [...params];

        const [users, countResult] = await Promise.all([
            executeQuery(query, queryParams),
            executeQuery(countQuery, countParams)
        ]);

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        return {
            users: users.map(user => new User(user)),
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };
    }

    // Método para deletar usuário
    async delete() {
        if (!this.id) {
            throw new Error('Não é possível deletar usuário sem ID');
        }

        const query = 'DELETE FROM users WHERE id = ?';
        await executeQuery(query, [this.id]);
        
        // Limpa o ID do objeto para indicar que foi deletado
        this.id = null;
    }
}

module.exports = User;
```

Este modelo implementa o padrão Active Record, onde cada instância da classe User representa um registro na tabela users. Os métodos estáticos funcionam como factory methods para criar instâncias baseadas em consultas ao banco de dados, enquanto os métodos de instância operam sobre registros específicos.

A implementação de hash de senha utilizando bcrypt com salt rounds 12 garante que mesmo senhas idênticas resultem em hashes diferentes, protegendo contra ataques de rainbow table. O salt rounds 12 oferece um bom equilíbrio entre segurança e performance para a maioria das aplicações.

O tratamento de erros de duplicação (ER_DUP_ENTRY) fornece mensagens de erro específicas e amigáveis ao usuário, melhorando a experiência de uso da API. Esta abordagem evita que detalhes técnicos do banco de dados sejam expostos aos clientes da API.

### Validação de Dados

Crie um arquivo `src/models/validators/UserValidator.js` para centralizar todas as validações relacionadas aos dados de usuário. Esta separação de responsabilidades facilita manutenção e reutilização das validações em diferentes partes da aplicação.

```javascript
const validator = require('validator');

class UserValidator {
    static validateRegistration(userData) {
        const errors = [];

        // Validação de username
        if (!userData.username) {
            errors.push('Username é obrigatório');
        } else if (userData.username.length < 3) {
            errors.push('Username deve ter pelo menos 3 caracteres');
        } else if (userData.username.length > 50) {
            errors.push('Username deve ter no máximo 50 caracteres');
        } else if (!/^[a-zA-Z0-9_]+$/.test(userData.username)) {
            errors.push('Username deve conter apenas letras, números e underscore');
        }

        // Validação de email
        if (!userData.email) {
            errors.push('Email é obrigatório');
        } else if (!validator.isEmail(userData.email)) {
            errors.push('Email deve ter um formato válido');
        } else if (userData.email.length > 255) {
            errors.push('Email deve ter no máximo 255 caracteres');
        }

        // Validação de senha
        if (!userData.password) {
            errors.push('Senha é obrigatória');
        } else if (userData.password.length < 8) {
            errors.push('Senha deve ter pelo menos 8 caracteres');
        } else if (userData.password.length > 128) {
            errors.push('Senha deve ter no máximo 128 caracteres');
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(userData.password)) {
            errors.push('Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número');
        }

        // Validação de nome
        if (!userData.firstName) {
            errors.push('Nome é obrigatório');
        } else if (userData.firstName.length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        } else if (userData.firstName.length > 100) {
            errors.push('Nome deve ter no máximo 100 caracteres');
        }

        // Validação de sobrenome
        if (!userData.lastName) {
            errors.push('Sobrenome é obrigatório');
        } else if (userData.lastName.length < 2) {
            errors.push('Sobrenome deve ter pelo menos 2 caracteres');
        } else if (userData.lastName.length > 100) {
            errors.push('Sobrenome deve ter no máximo 100 caracteres');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static validateLogin(userData) {
        const errors = [];

        // Validação de identificador (email ou username)
        if (!userData.identifier) {
            errors.push('Email ou username é obrigatório');
        }

        // Validação de senha
        if (!userData.password) {
            errors.push('Senha é obrigatória');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static validateUpdate(userData) {
        const errors = [];

        // Validações opcionais para atualização
        if (userData.username !== undefined) {
            if (userData.username.length < 3) {
                errors.push('Username deve ter pelo menos 3 caracteres');
            } else if (userData.username.length > 50) {
                errors.push('Username deve ter no máximo 50 caracteres');
            } else if (!/^[a-zA-Z0-9_]+$/.test(userData.username)) {
                errors.push('Username deve conter apenas letras, números e underscore');
            }
        }

        if (userData.email !== undefined) {
            if (!validator.isEmail(userData.email)) {
                errors.push('Email deve ter um formato válido');
            } else if (userData.email.length > 255) {
                errors.push('Email deve ter no máximo 255 caracteres');
            }
        }

        if (userData.password !== undefined) {
            if (userData.password.length < 8) {
                errors.push('Senha deve ter pelo menos 8 caracteres');
            } else if (userData.password.length > 128) {
                errors.push('Senha deve ter no máximo 128 caracteres');
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(userData.password)) {
                errors.push('Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número');
            }
        }

        if (userData.firstName !== undefined) {
            if (userData.firstName.length < 2) {
                errors.push('Nome deve ter pelo menos 2 caracteres');
            } else if (userData.firstName.length > 100) {
                errors.push('Nome deve ter no máximo 100 caracteres');
            }
        }

        if (userData.lastName !== undefined) {
            if (userData.lastName.length < 2) {
                errors.push('Sobrenome deve ter pelo menos 2 caracteres');
            } else if (userData.lastName.length > 100) {
                errors.push('Sobrenome deve ter no máximo 100 caracteres');
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static sanitizeUserData(userData) {
        const sanitized = {};

        if (userData.username) {
            sanitized.username = userData.username.trim().toLowerCase();
        }

        if (userData.email) {
            sanitized.email = userData.email.trim().toLowerCase();
        }

        if (userData.password) {
            sanitized.password = userData.password; // Não modificar a senha
        }

        if (userData.firstName) {
            sanitized.firstName = userData.firstName.trim();
        }

        if (userData.lastName) {
            sanitized.lastName = userData.lastName.trim();
        }

        return sanitized;
    }
}

module.exports = UserValidator;
```

A biblioteca validator oferece uma ampla gama de validações pré-construídas e testadas, incluindo validação de email, URLs, números de cartão de crédito e muitos outros formatos. Utilizá-la reduz a possibilidade de erros em validações complexas e garante conformidade com padrões internacionais.

As validações de senha implementadas seguem boas práticas de segurança, exigindo uma combinação de caracteres que torna ataques de força bruta significativamente mais difíceis. A limitação de tamanho máximo previne ataques de negação de serviço através de senhas extremamente longas.

O método sanitizeUserData normaliza os dados de entrada, convertendo email e username para minúsculas e removendo espaços em branco desnecessários. Esta normalização garante consistência nos dados armazenados e facilita buscas futuras.

## Implementação dos Controllers

### Controller de Autenticação

Crie um arquivo `src/controllers/AuthController.js` que gerenciará todas as operações relacionadas à autenticação de usuários. Este controller implementará endpoints para registro, login, logout e verificação de tokens.

```javascript
const User = require('../models/User');
const UserValidator = require('../models/validators/UserValidator');
const jwt = require('jsonwebtoken');

class AuthController {
    // Registro de novo usuário
    static async register(req, res) {
        try {
            // Sanitização dos dados de entrada
            const sanitizedData = UserValidator.sanitizeUserData(req.body);
            
            // Validação dos dados
            const validation = UserValidator.validateRegistration(sanitizedData);
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Dados de entrada inválidos',
                    errors: validation.errors
                });
            }

            // Verificação se usuário já existe
            const existingUserByEmail = await User.findByEmail(sanitizedData.email);
            if (existingUserByEmail) {
                return res.status(409).json({
                    success: false,
                    message: 'Email já está em uso'
                });
            }

            const existingUserByUsername = await User.findByUsername(sanitizedData.username);
            if (existingUserByUsername) {
                return res.status(409).json({
                    success: false,
                    message: 'Username já está em uso'
                });
            }

            // Criação do novo usuário
            const newUser = new User(sanitizedData);
            await newUser.save();

            // Geração do token JWT
            const token = jwt.sign(
                { 
                    userId: newUser.id,
                    email: newUser.email,
                    username: newUser.username
                },
                process.env.JWT_SECRET,
                { 
                    expiresIn: '24h',
                    issuer: 'cadastro-usuarios-api',
                    audience: 'cadastro-usuarios-clients'
                }
            );

            // Resposta de sucesso
            res.status(201).json({
                success: true,
                message: 'Usuário criado com sucesso',
                data: {
                    user: newUser.toJSON(),
                    token,
                    expiresIn: '24h'
                }
            });

        } catch (error) {
            console.error('Erro no registro:', error);
            
            // Tratamento de erros específicos
            if (error.message.includes('já está em uso')) {
                return res.status(409).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Login de usuário
    static async login(req, res) {
        try {
            // Validação dos dados de entrada
            const validation = UserValidator.validateLogin(req.body);
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Dados de entrada inválidos',
                    errors: validation.errors
                });
            }

            const { identifier, password } = req.body;

            // Busca do usuário por email ou username
            let user = null;
            if (identifier.includes('@')) {
                user = await User.findByEmail(identifier.toLowerCase());
            } else {
                user = await User.findByUsername(identifier.toLowerCase());
            }

            // Verificação se usuário existe
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            // Verificação se usuário está ativo
            if (!user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Conta desativada. Entre em contato com o suporte.'
                });
            }

            // Verificação da senha
            const isPasswordValid = await user.verifyPassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            // Geração do token JWT
            const token = jwt.sign(
                { 
                    userId: user.id,
                    email: user.email,
                    username: user.username
                },
                process.env.JWT_SECRET,
                { 
                    expiresIn: '24h',
                    issuer: 'cadastro-usuarios-api',
                    audience: 'cadastro-usuarios-clients'
                }
            );

            // Resposta de sucesso
            res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso',
                data: {
                    user: user.toJSON(),
                    token,
                    expiresIn: '24h'
                }
            });

        } catch (error) {
            console.error('Erro no login:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Verificação de token
    static async verifyToken(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Token não fornecido'
                });
            }

            // Verificação e decodificação do token
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                issuer: 'cadastro-usuarios-api',
                audience: 'cadastro-usuarios-clients'
            });

            // Busca do usuário atual
            const user = await User.findById(decoded.userId);
            if (!user || !user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Token inválido ou usuário inativo'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Token válido',
                data: {
                    user: user.toJSON(),
                    tokenInfo: {
                        issuedAt: new Date(decoded.iat * 1000),
                        expiresAt: new Date(decoded.exp * 1000)
                    }
                }
            });

        } catch (error) {
            console.error('Erro na verificação do token:', error);
            
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token inválido'
                });
            }
            
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expirado'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Refresh token
    static async refreshToken(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Token não fornecido'
                });
            }

            // Verificação do token (mesmo que expirado)
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET, {
                    issuer: 'cadastro-usuarios-api',
                    audience: 'cadastro-usuarios-clients'
                });
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    // Token expirado, mas ainda podemos decodificar
                    decoded = jwt.decode(token);
                } else {
                    throw error;
                }
            }

            // Busca do usuário
            const user = await User.findById(decoded.userId);
            if (!user || !user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuário inválido ou inativo'
                });
            }

            // Geração de novo token
            const newToken = jwt.sign(
                { 
                    userId: user.id,
                    email: user.email,
                    username: user.username
                },
                process.env.JWT_SECRET,
                { 
                    expiresIn: '24h',
                    issuer: 'cadastro-usuarios-api',
                    audience: 'cadastro-usuarios-clients'
                }
            );

            res.status(200).json({
                success: true,
                message: 'Token renovado com sucesso',
                data: {
                    token: newToken,
                    expiresIn: '24h'
                }
            });

        } catch (error) {
            console.error('Erro no refresh token:', error);
            res.status(401).json({
                success: false,
                message: 'Não foi possível renovar o token'
            });
        }
    }
}

module.exports = AuthController;
```

O controller de autenticação implementa todas as operações fundamentais para um sistema de login seguro. A separação entre registro e login permite diferentes níveis de validação e tratamento de erros específicos para cada operação.

A implementação de JWT (JSON Web Tokens) oferece uma solução stateless para autenticação, onde o servidor não precisa manter sessões em memória. Isso facilita a escalabilidade horizontal da aplicação e simplifica a arquitetura de sistemas distribuídos.

O endpoint de verificação de token permite que clientes validem tokens existentes sem precisar fazer login novamente, melhorando a experiência do usuário. O refresh token possibilita renovar tokens expirados sem exigir nova autenticação, desde que o usuário ainda esteja ativo no sistema.

### Controller de Usuários

Crie um arquivo `src/controllers/UserController.js` para gerenciar operações CRUD (Create, Read, Update, Delete) relacionadas aos usuários. Este controller implementará endpoints para listar, visualizar, atualizar e deletar usuários.

```javascript
const User = require('../models/User');
const UserValidator = require('../models/validators/UserValidator');

class UserController {
    // Listar usuários com paginação e filtros
    static async index(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = Math.min(parseInt(req.query.limit) || 10, 100); // Máximo 100 por página
            
            // Construção dos filtros
            const filters = {};
            
            if (req.query.active !== undefined) {
                filters.isActive = req.query.active === 'true';
            }
            
            if (req.query.verified !== undefined) {
                filters.emailVerified = req.query.verified === 'true';
            }
            
            if (req.query.search) {
                filters.search = req.query.search.trim();
            }

            // Busca dos usuários
            const result = await User.findAll(page, limit, filters);

            res.status(200).json({
                success: true,
                message: 'Usuários listados com sucesso',
                data: {
                    users: result.users.map(user => user.toJSON()),
                    pagination: result.pagination
                }
            });

        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Visualizar usuário específico
    static async show(req, res) {
        try {
            const userId = parseInt(req.params.id);
            
            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do usuário deve ser um número válido'
                });
            }

            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuário encontrado',
                data: {
                    user: user.toJSON()
                }
            });

        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Atualizar usuário
    static async update(req, res) {
        try {
            const userId = parseInt(req.params.id);
            
            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do usuário deve ser um número válido'
                });
            }

            // Busca do usuário existente
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            // Sanitização dos dados
            const sanitizedData = UserValidator.sanitizeUserData(req.body);
            
            // Validação dos dados
            const validation = UserValidator.validateUpdate(sanitizedData);
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Dados de entrada inválidos',
                    errors: validation.errors
                });
            }

            // Verificação de duplicação de email/username
            if (sanitizedData.email && sanitizedData.email !== user.email) {
                const existingUser = await User.findByEmail(sanitizedData.email);
                if (existingUser && existingUser.id !== userId) {
                    return res.status(409).json({
                        success: false,
                        message: 'Email já está em uso por outro usuário'
                    });
                }
            }

            if (sanitizedData.username && sanitizedData.username !== user.username) {
                const existingUser = await User.findByUsername(sanitizedData.username);
                if (existingUser && existingUser.id !== userId) {
                    return res.status(409).json({
                        success: false,
                        message: 'Username já está em uso por outro usuário'
                    });
                }
            }

            // Atualização dos dados
            Object.assign(user, sanitizedData);
            await user.save();

            res.status(200).json({
                success: true,
                message: 'Usuário atualizado com sucesso',
                data: {
                    user: user.toJSON()
                }
            });

        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            
            if (error.message.includes('já está em uso')) {
                return res.status(409).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Deletar usuário
    static async delete(req, res) {
        try {
            const userId = parseInt(req.params.id);
            
            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do usuário deve ser um número válido'
                });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            await user.delete();

            res.status(200).json({
                success: true,
                message: 'Usuário deletado com sucesso'
            });

        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Desativar usuário (soft delete)
    static async deactivate(req, res) {
        try {
            const userId = parseInt(req.params.id);
            
            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do usuário deve ser um número válido'
                });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            user.isActive = false;
            await user.save();

            res.status(200).json({
                success: true,
                message: 'Usuário desativado com sucesso',
                data: {
                    user: user.toJSON()
                }
            });

        } catch (error) {
            console.error('Erro ao desativar usuário:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Reativar usuário
    static async activate(req, res) {
        try {
            const userId = parseInt(req.params.id);
            
            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do usuário deve ser um número válido'
                });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            user.isActive = true;
            await user.save();

            res.status(200).json({
                success: true,
                message: 'Usuário reativado com sucesso',
                data: {
                    user: user.toJSON()
                }
            });

        } catch (error) {
            console.error('Erro ao reativar usuário:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Obter perfil do usuário autenticado
    static async profile(req, res) {
        try {
            // O middleware de autenticação deve adicionar req.user
            const user = await User.findById(req.user.userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Perfil do usuário',
                data: {
                    user: user.toJSON()
                }
            });

        } catch (error) {
            console.error('Erro ao buscar perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Atualizar perfil do usuário autenticado
    static async updateProfile(req, res) {
        try {
            const user = await User.findById(req.user.userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            // Sanitização dos dados
            const sanitizedData = UserValidator.sanitizeUserData(req.body);
            
            // Validação dos dados
            const validation = UserValidator.validateUpdate(sanitizedData);
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Dados de entrada inválidos',
                    errors: validation.errors
                });
            }

            // Verificação de duplicação
            if (sanitizedData.email && sanitizedData.email !== user.email) {
                const existingUser = await User.findByEmail(sanitizedData.email);
                if (existingUser) {
                    return res.status(409).json({
                        success: false,
                        message: 'Email já está em uso'
                    });
                }
            }

            if (sanitizedData.username && sanitizedData.username !== user.username) {
                const existingUser = await User.findByUsername(sanitizedData.username);
                if (existingUser) {
                    return res.status(409).json({
                        success: false,
                        message: 'Username já está em uso'
                    });
                }
            }

            // Atualização dos dados
            Object.assign(user, sanitizedData);
            await user.save();

            res.status(200).json({
                success: true,
                message: 'Perfil atualizado com sucesso',
                data: {
                    user: user.toJSON()
                }
            });

        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }
}

module.exports = UserController;
```

O controller de usuários implementa operações CRUD completas com validações apropriadas e tratamento de erros específicos. A separação entre operações administrativas (index, show, update, delete) e operações de usuário (profile, updateProfile) permite implementar diferentes níveis de autorização.

A implementação de paginação no método index é crucial para performance em aplicações com muitos usuários. A limitação de 100 registros por página previne sobrecarga do servidor e melhora a experiência do usuário em interfaces web e mobile.

O conceito de soft delete através dos métodos activate/deactivate é uma prática recomendada que preserva dados históricos enquanto remove logicamente usuários do sistema. Isso facilita auditoria e permite recuperação de contas em caso de erro.

## Implementação de Middleware

### Middleware de Autenticação

Crie um arquivo `src/middleware/auth.js` para implementar middleware de autenticação que verificará tokens JWT em rotas protegidas. Este middleware será fundamental para proteger endpoints que requerem usuário autenticado.

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de autenticação obrigatória
const requireAuth = async (req, res, next) => {
    try {
        // Extração do token do cabeçalho Authorization
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Token de acesso requerido'
            });
        }

        const token = authHeader.substring(7); // Remove "Bearer "

        // Verificação e decodificação do token
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            issuer: 'cadastro-usuarios-api',
            audience: 'cadastro-usuarios-clients'
        });

        // Busca do usuário no banco de dados
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Conta desativada'
            });
        }

        // Adiciona informações do usuário à requisição
        req.user = {
            userId: user.id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
            emailVerified: user.emailVerified
        };

        next();

    } catch (error) {
        console.error('Erro no middleware de autenticação:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
};

// Middleware de autenticação opcional
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // Sem token, continua sem autenticação
            req.user = null;
            return next();
        }

        const token = authHeader.substring(7);

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                issuer: 'cadastro-usuarios-api',
                audience: 'cadastro-usuarios-clients'
            });

            const user = await User.findById(decoded.userId);
            
            if (user && user.isActive) {
                req.user = {
                    userId: user.id,
                    username: user.username,
                    email: user.email,
                    isActive: user.isActive,
                    emailVerified: user.emailVerified
                };
            } else {
                req.user = null;
            }
        } catch (tokenError) {
            // Token inválido ou expirado, continua sem autenticação
            req.user = null;
        }

        next();

    } catch (error) {
        console.error('Erro no middleware de autenticação opcional:', error);
        req.user = null;
        next();
    }
};

// Middleware para verificar se email foi verificado
const requireEmailVerification = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Autenticação requerida'
        });
    }

    if (!req.user.emailVerified) {
        return res.status(403).json({
            success: false,
            message: 'Email não verificado. Verifique seu email antes de continuar.'
        });
    }

    next();
};

// Middleware para verificar se usuário é administrador
const requireAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Autenticação requerida'
            });
        }

        // Busca informações completas do usuário
        const user = await User.findById(req.user.userId);
        
        if (!user || !user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Acesso negado. Privilégios de administrador requeridos.'
            });
        }

        next();

    } catch (error) {
        console.error('Erro no middleware de administrador:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
};

module.exports = {
    requireAuth,
    optionalAuth,
    requireEmailVerification,
    requireAdmin
};
```

O middleware de autenticação é um componente crucial que intercepta requisições antes que cheguem aos controllers, verificando se o usuário tem permissão para acessar determinados recursos. A implementação de diferentes níveis de autenticação (obrigatória, opcional, verificação de email, admin) oferece flexibilidade para diferentes tipos de endpoints.

A verificação de usuário ativo no middleware garante que usuários desativados não possam acessar recursos protegidos mesmo com tokens válidos. Esta camada adicional de segurança é importante para sistemas que implementam suspensão de contas.

O middleware opcional de autenticação é útil para endpoints que podem funcionar tanto para usuários autenticados quanto anônimos, mas oferecem funcionalidades diferentes baseadas no status de autenticação.

### Middleware de Validação e Sanitização

Crie um arquivo `src/middleware/validation.js` para implementar middleware genérico de validação que pode ser reutilizado em diferentes rotas.

```javascript
const { body, param, query, validationResult } = require('express-validator');

// Middleware para processar resultados de validação
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => ({
            field: error.param,
            message: error.msg,
            value: error.value
        }));

        return res.status(400).json({
            success: false,
            message: 'Dados de entrada inválidos',
            errors: formattedErrors
        });
    }

    next();
};

// Validações para registro de usuário
const validateUserRegistration = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Username deve ter entre 3 e 50 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username deve conter apenas letras, números e underscore')
        .toLowerCase(),
    
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email deve ter um formato válido')
        .isLength({ max: 255 })
        .withMessage('Email deve ter no máximo 255 caracteres')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 8, max: 128 })
        .withMessage('Senha deve ter entre 8 e 128 caracteres')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
    
    body('firstName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Nome deve ter entre 2 e 100 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Nome deve conter apenas letras e espaços'),
    
    body('lastName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Sobrenome deve ter entre 2 e 100 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Sobrenome deve conter apenas letras e espaços'),
    
    handleValidationErrors
];

// Validações para login
const validateUserLogin = [
    body('identifier')
        .trim()
        .notEmpty()
        .withMessage('Email ou username é obrigatório'),
    
    body('password')
        .notEmpty()
        .withMessage('Senha é obrigatória'),
    
    handleValidationErrors
];

// Validações para atualização de usuário
const validateUserUpdate = [
    body('username')
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Username deve ter entre 3 e 50 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username deve conter apenas letras, números e underscore')
        .toLowerCase(),
    
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Email deve ter um formato válido')
        .isLength({ max: 255 })
        .withMessage('Email deve ter no máximo 255 caracteres')
        .normalizeEmail(),
    
    body('password')
        .optional()
        .isLength({ min: 8, max: 128 })
        .withMessage('Senha deve ter entre 8 e 128 caracteres')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
    
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Nome deve ter entre 2 e 100 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Nome deve conter apenas letras e espaços'),
    
    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Sobrenome deve ter entre 2 e 100 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Sobrenome deve conter apenas letras e espaços'),
    
    handleValidationErrors
];

// Validação de parâmetros de ID
const validateUserId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID deve ser um número inteiro positivo'),
    
    handleValidationErrors
];

// Validações para query parameters de listagem
const validateUserListQuery = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Página deve ser um número inteiro positivo'),
    
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limite deve ser um número entre 1 e 100'),
    
    query('active')
        .optional()
        .isBoolean()
        .withMessage('Active deve ser true ou false'),
    
    query('verified')
        .optional()
        .isBoolean()
        .withMessage('Verified deve ser true ou false'),
    
    query('search')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Busca deve ter entre 1 e 100 caracteres'),
    
    handleValidationErrors
];

// Middleware de sanitização adicional
const sanitizeInput = (req, res, next) => {
    // Remove propriedades potencialmente perigosas
    const dangerousProps = ['__proto__', 'constructor', 'prototype'];
    
    const sanitizeObject = (obj) => {
        if (typeof obj !== 'object' || obj === null) return obj;
        
        for (const prop of dangerousProps) {
            delete obj[prop];
        }
        
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                sanitizeObject(obj[key]);
            }
        }
        
        return obj;
    };

    if (req.body) {
        req.body = sanitizeObject(req.body);
    }
    
    if (req.query) {
        req.query = sanitizeObject(req.query);
    }
    
    if (req.params) {
        req.params = sanitizeObject(req.params);
    }

    next();
};

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateUserUpdate,
    validateUserId,
    validateUserListQuery,
    sanitizeInput,
    handleValidationErrors
};
```

O middleware de validação utilizando express-validator oferece uma abordagem declarativa e robusta para validação de dados de entrada. A separação de validações específicas para diferentes operações permite reutilização e manutenção mais fácil.

A sanitização automática de dados de entrada protege contra ataques de prototype pollution e outras vulnerabilidades relacionadas à manipulação de objetos JavaScript. Esta camada adicional de segurança é crucial para aplicações que processam dados de usuários não confiáveis.

O tratamento centralizado de erros de validação garante consistência nas respostas da API e facilita a integração com clientes frontend que precisam exibir mensagens de erro específicas para cada campo.

## Configuração de Rotas

### Rotas de Autenticação

Crie um arquivo `src/routes/auth.js` para definir todas as rotas relacionadas à autenticação de usuários.

```javascript
const express = require('express');
const AuthController = require('../controllers/AuthController');
const { validateUserRegistration, validateUserLogin, sanitizeInput } = require('../middleware/validation');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Aplicar sanitização em todas as rotas
router.use(sanitizeInput);

/**
 * @route   POST /api/auth/register
 * @desc    Registrar novo usuário
 * @access  Public
 */
router.post('/register', validateUserRegistration, AuthController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Fazer login
 * @access  Public
 */
router.post('/login', validateUserLogin, AuthController.login);

/**
 * @route   POST /api/auth/verify-token
 * @desc    Verificar validade do token
 * @access  Public
 */
router.post('/verify-token', AuthController.verifyToken);

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Renovar token expirado
 * @access  Public
 */
router.post('/refresh-token', AuthController.refreshToken);

/**
 * @route   POST /api/auth/logout
 * @desc    Fazer logout (invalidar token no cliente)
 * @access  Private
 */
router.post('/logout', requireAuth, (req, res) => {
    // Em uma implementação JWT stateless, o logout é feito no cliente
    // removendo o token. Aqui apenas confirmamos o logout.
    res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso'
    });
});

module.exports = router;
```

### Rotas de Usuários

Crie um arquivo `src/routes/users.js` para definir rotas relacionadas ao gerenciamento de usuários.

```javascript
const express = require('express');
const UserController = require('../controllers/UserController');
const { 
    validateUserUpdate, 
    validateUserId, 
    validateUserListQuery, 
    sanitizeInput 
} = require('../middleware/validation');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Aplicar sanitização em todas as rotas
router.use(sanitizeInput);

/**
 * @route   GET /api/users
 * @desc    Listar usuários (apenas admins)
 * @access  Private (Admin)
 */
router.get('/', requireAuth, requireAdmin, validateUserListQuery, UserController.index);

/**
 * @route   GET /api/users/profile
 * @desc    Obter perfil do usuário autenticado
 * @access  Private
 */
router.get('/profile', requireAuth, UserController.profile);

/**
 * @route   PUT /api/users/profile
 * @desc    Atualizar perfil do usuário autenticado
 * @access  Private
 */
router.put('/profile', requireAuth, validateUserUpdate, UserController.updateProfile);

/**
 * @route   GET /api/users/:id
 * @desc    Obter usuário específico (apenas admins)
 * @access  Private (Admin)
 */
router.get('/:id', requireAuth, requireAdmin, validateUserId, UserController.show);

/**
 * @route   PUT /api/users/:id
 * @desc    Atualizar usuário específico (apenas admins)
 * @access  Private (Admin)
 */
router.put('/:id', requireAuth, requireAdmin, validateUserId, validateUserUpdate, UserController.update);

/**
 * @route   DELETE /api/users/:id
 * @desc    Deletar usuário (apenas admins)
 * @access  Private (Admin)
 */
router.delete('/:id', requireAuth, requireAdmin, validateUserId, UserController.delete);

/**
 * @route   PATCH /api/users/:id/deactivate
 * @desc    Desativar usuário (apenas admins)
 * @access  Private (Admin)
 */
router.patch('/:id/deactivate', requireAuth, requireAdmin, validateUserId, UserController.deactivate);

/**
 * @route   PATCH /api/users/:id/activate
 * @desc    Reativar usuário (apenas admins)
 * @access  Private (Admin)
 */
router.patch('/:id/activate', requireAuth, requireAdmin, validateUserId, UserController.activate);

module.exports = router;
```

### Arquivo Principal da Aplicação

Crie um arquivo `src/app.js` que configurará e inicializará a aplicação Express com todos os middleware e rotas necessários.

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importação das rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Importação da configuração do banco de dados
const { testConnection } = require('../config/database');

const app = express();

// Configuração de middleware de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

// Configuração de CORS
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware de logging
app.use(morgan('combined'));

// Middleware para parsing de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para adicionar cabeçalhos de resposta padrão
app.use((req, res, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    res.setHeader('X-Powered-By', 'Node.js');
    next();
});

// Rota de health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API funcionando corretamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Configuração das rotas principais
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        path: req.originalUrl,
        method: req.method
    });
});

// Middleware de tratamento de erros global
app.use((error, req, res, next) => {
    console.error('Erro não tratado:', error);

    // Erro de parsing JSON
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            success: false,
            message: 'JSON inválido no corpo da requisição'
        });
    }

    // Erro de payload muito grande
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            success: false,
            message: 'Payload muito grande'
        });
    }

    // Erro genérico
    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
});

// Função para inicializar a aplicação
const initializeApp = async () => {
    try {
        // Testar conexão com o banco de dados
        const dbConnected = await testConnection();
        if (!dbConnected) {
            console.error('❌ Falha na conexão com o banco de dados');
            process.exit(1);
        }

        console.log('✅ Aplicação inicializada com sucesso');
        return app;
    } catch (error) {
        console.error('❌ Erro na inicialização da aplicação:', error);
        process.exit(1);
    }
};

module.exports = { app, initializeApp };
```

### Arquivo de Inicialização do Servidor

Crie um arquivo `server.js` na raiz do projeto para inicializar o servidor HTTP.

```javascript
const { initializeApp } = require('./src/app');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Função principal para iniciar o servidor
const startServer = async () => {
    try {
        const app = await initializeApp();
        
        const server = app.listen(PORT, HOST, () => {
            console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
            console.log(`📚 Documentação da API: http://${HOST}:${PORT}/api/docs`);
            console.log(`🏥 Health check: http://${HOST}:${PORT}/health`);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('🛑 Recebido SIGTERM, encerrando servidor...');
            server.close(() => {
                console.log('✅ Servidor encerrado com sucesso');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('🛑 Recebido SIGINT, encerrando servidor...');
            server.close(() => {
                console.log('✅ Servidor encerrado com sucesso');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

startServer();
```

A estrutura de rotas implementada segue o padrão RESTful, organizando endpoints de forma lógica e intuitiva. A separação entre rotas de autenticação e usuários facilita manutenção e permite aplicar diferentes níveis de middleware conforme necessário.

O sistema de middleware em camadas garante que validações, autenticação e sanitização sejam aplicadas consistentemente em todas as rotas relevantes. Esta abordagem reduz duplicação de código e garante que aspectos de segurança não sejam esquecidos.

A implementação de graceful shutdown permite que a aplicação encerre de forma controlada, finalizando requisições em andamento e liberando recursos adequadamente. Isso é especialmente importante em ambientes de produção onde a aplicação pode ser reiniciada frequentemente.

## Testes da API

### Configuração do Ambiente de Testes

Crie um arquivo `tests/setup.js` para configurar o ambiente de testes e utilitários compartilhados.

```javascript
const { app, initializeApp } = require('../src/app');
const { executeQuery } = require('../config/database');

// Configuração global para testes
beforeAll(async () => {
    // Inicializar aplicação para testes
    await initializeApp();
    
    // Limpar e preparar banco de dados de teste
    await setupTestDatabase();
});

afterAll(async () => {
    // Limpar banco de dados após todos os testes
    await cleanupTestDatabase();
});

// Função para configurar banco de dados de teste
const setupTestDatabase = async () => {
    try {
        // Limpar tabelas existentes
        await executeQuery('DELETE FROM verification_tokens');
        await executeQuery('DELETE FROM users');
        
        // Resetar auto_increment
        await executeQuery('ALTER TABLE users AUTO_INCREMENT = 1');
        await executeQuery('ALTER TABLE verification_tokens AUTO_INCREMENT = 1');
        
        console.log('✅ Banco de dados de teste configurado');
    } catch (error) {
        console.error('❌ Erro ao configurar banco de dados de teste:', error);
        throw error;
    }
};

// Função para limpar banco de dados após testes
const cleanupTestDatabase = async () => {
    try {
        await executeQuery('DELETE FROM verification_tokens');
        await executeQuery('DELETE FROM users');
        console.log('✅ Banco de dados de teste limpo');
    } catch (error) {
        console.error('❌ Erro ao limpar banco de dados de teste:', error);
    }
};

// Utilitários para testes
const testUtils = {
    // Criar usuário de teste
    createTestUser: async (userData = {}) => {
        const defaultUser = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'TestPassword123',
            firstName: 'Test',
            lastName: 'User'
        };
        
        return { ...defaultUser, ...userData };
    },
    
    // Fazer login e obter token
    loginAndGetToken: async (request, credentials = {}) => {
        const defaultCredentials = {
            identifier: 'test@example.com',
            password: 'TestPassword123'
        };
        
        const loginData = { ...defaultCredentials, ...credentials };
        
        const response = await request
            .post('/api/auth/login')
            .send(loginData);
            
        return response.body.data.token;
    },
    
    // Criar cabeçalho de autorização
    authHeader: (token) => ({
        'Authorization': `Bearer ${token}`
    })
};

module.exports = {
    app,
    testUtils,
    setupTestDatabase,
    cleanupTestDatabase
};
```

### Testes de Autenticação

Crie um arquivo `tests/auth.test.js` para testar todos os endpoints de autenticação.

```javascript
const request = require('supertest');
const { app, testUtils } = require('./setup');

describe('Autenticação', () => {
    beforeEach(async () => {
        // Limpar dados antes de cada teste
        await testUtils.setupTestDatabase();
    });

    describe('POST /api/auth/register', () => {
        it('deve registrar um novo usuário com dados válidos', async () => {
            const userData = await testUtils.createTestUser();
            
            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Usuário criado com sucesso');
            expect(response.body.data.user).toHaveProperty('id');
            expect(response.body.data.user.email).toBe(userData.email);
            expect(response.body.data.user.username).toBe(userData.username);
            expect(response.body.data).toHaveProperty('token');
            expect(response.body.data.user).not.toHaveProperty('password');
        });

        it('deve rejeitar registro com email duplicado', async () => {
            const userData = await testUtils.createTestUser();
            
            // Primeiro registro
            await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            // Segundo registro com mesmo email
            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(409);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Email já está em uso');
        });

        it('deve rejeitar registro com username duplicado', async () => {
            const userData1 = await testUtils.createTestUser();
            const userData2 = await testUtils.createTestUser({
                email: 'different@example.com'
            });
            
            // Primeiro registro
            await request(app)
                .post('/api/auth/register')
                .send(userData1)
                .expect(201);

            // Segundo registro com mesmo username
            const response = await request(app)
                .post('/api/auth/register')
                .send(userData2)
                .expect(409);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Username já está em uso');
        });

        it('deve rejeitar registro com dados inválidos', async () => {
            const invalidData = {
                username: 'ab', // Muito curto
                email: 'email-inválido',
                password: '123', // Muito simples
                firstName: '',
                lastName: ''
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(invalidData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Dados de entrada inválidos');
            expect(response.body.errors).toBeInstanceOf(Array);
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Criar usuário para testes de login
            const userData = await testUtils.createTestUser();
            await request(app)
                .post('/api/auth/register')
                .send(userData);
        });

        it('deve fazer login com email e senha válidos', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    identifier: 'test@example.com',
                    password: 'TestPassword123'
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Login realizado com sucesso');
            expect(response.body.data).toHaveProperty('token');
            expect(response.body.data).toHaveProperty('user');
            expect(response.body.data.user).not.toHaveProperty('password');
        });

        it('deve fazer login com username e senha válidos', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    identifier: 'testuser',
                    password: 'TestPassword123'
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('token');
        });

        it('deve rejeitar login com credenciais inválidas', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    identifier: 'test@example.com',
                    password: 'SenhaErrada'
                })
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Credenciais inválidas');
        });

        it('deve rejeitar login com usuário inexistente', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    identifier: 'inexistente@example.com',
                    password: 'TestPassword123'
                })
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Credenciais inválidas');
        });
    });

    describe('POST /api/auth/verify-token', () => {
        let token;

        beforeEach(async () => {
            // Criar usuário e obter token
            const userData = await testUtils.createTestUser();
            await request(app)
                .post('/api/auth/register')
                .send(userData);
            
            token = await testUtils.loginAndGetToken(request(app));
        });

        it('deve verificar token válido', async () => {
            const response = await request(app)
                .post('/api/auth/verify-token')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Token válido');
            expect(response.body.data).toHaveProperty('user');
            expect(response.body.data).toHaveProperty('tokenInfo');
        });

        it('deve rejeitar token inválido', async () => {
            const response = await request(app)
                .post('/api/auth/verify-token')
                .set('Authorization', 'Bearer token-inválido')
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Token inválido');
        });

        it('deve rejeitar requisição sem token', async () => {
            const response = await request(app)
                .post('/api/auth/verify-token')
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Token não fornecido');
        });
    });

    describe('POST /api/auth/logout', () => {
        let token;

        beforeEach(async () => {
            const userData = await testUtils.createTestUser();
            await request(app)
                .post('/api/auth/register')
                .send(userData);
            
            token = await testUtils.loginAndGetToken(request(app));
        });

        it('deve fazer logout com token válido', async () => {
            const response = await request(app)
                .post('/api/auth/logout')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Logout realizado com sucesso');
        });

        it('deve rejeitar logout sem token', async () => {
            const response = await request(app)
                .post('/api/auth/logout')
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });
});
```

### Testes de Usuários

Crie um arquivo `tests/users.test.js` para testar endpoints relacionados ao gerenciamento de usuários.

```javascript
const request = require('supertest');
const { app, testUtils } = require('./setup');

describe('Usuários', () => {
    let userToken;
    let adminToken;
    let userId;

    beforeEach(async () => {
        await testUtils.setupTestDatabase();
        
        // Criar usuário comum
        const userData = await testUtils.createTestUser();
        const userResponse = await request(app)
            .post('/api/auth/register')
            .send(userData);
        
        userToken = userResponse.body.data.token;
        userId = userResponse.body.data.user.id;

        // Criar usuário admin (simulado)
        const adminData = await testUtils.createTestUser({
            username: 'admin',
            email: 'admin@example.com'
        });
        const adminResponse = await request(app)
            .post('/api/auth/register')
            .send(adminData);
        
        adminToken = adminResponse.body.data.token;
    });

    describe('GET /api/users/profile', () => {
        it('deve retornar perfil do usuário autenticado', async () => {
            const response = await request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.user).toHaveProperty('id');
            expect(response.body.data.user).toHaveProperty('username');
            expect(response.body.data.user).toHaveProperty('email');
            expect(response.body.data.user).not.toHaveProperty('password');
        });

        it('deve rejeitar acesso sem token', async () => {
            const response = await request(app)
                .get('/api/users/profile')
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });

    describe('PUT /api/users/profile', () => {
        it('deve atualizar perfil com dados válidos', async () => {
            const updateData = {
                firstName: 'Nome Atualizado',
                lastName: 'Sobrenome Atualizado'
            };

            const response = await request(app)
                .put('/api/users/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.user.firstName).toBe(updateData.firstName);
            expect(response.body.data.user.lastName).toBe(updateData.lastName);
        });

        it('deve rejeitar atualização com email duplicado', async () => {
            // Criar segundo usuário
            const secondUser = await testUtils.createTestUser({
                username: 'seconduser',
                email: 'second@example.com'
            });
            await request(app)
                .post('/api/auth/register')
                .send(secondUser);

            // Tentar atualizar com email do segundo usuário
            const response = await request(app)
                .put('/api/users/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .send({ email: 'second@example.com' })
                .expect(409);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Email já está em uso');
        });

        it('deve rejeitar dados inválidos', async () => {
            const invalidData = {
                email: 'email-inválido',
                firstName: 'A' // Muito curto
            };

            const response = await request(app)
                .put('/api/users/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .send(invalidData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBeInstanceOf(Array);
        });
    });

    describe('GET /api/users/:id', () => {
        it('deve permitir admin visualizar usuário específico', async () => {
            const response = await request(app)
                .get(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.user.id).toBe(userId);
        });

        it('deve rejeitar acesso de usuário comum', async () => {
            const response = await request(app)
                .get(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403);

            expect(response.body.success).toBe(false);
        });

        it('deve retornar 404 para usuário inexistente', async () => {
            const response = await request(app)
                .get('/api/users/99999')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Usuário não encontrado');
        });
    });

    describe('PATCH /api/users/:id/deactivate', () => {
        it('deve permitir admin desativar usuário', async () => {
            const response = await request(app)
                .patch(`/api/users/${userId}/deactivate`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.user.isActive).toBe(false);
        });

        it('deve rejeitar acesso de usuário comum', async () => {
            const response = await request(app)
                .patch(`/api/users/${userId}/deactivate`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403);

            expect(response.body.success).toBe(false);
        });
    });
});
```

Os testes implementados cobrem cenários positivos e negativos, garantindo que a API funcione corretamente em situações normais e trate adequadamente casos de erro. A estrutura de testes utiliza hooks do Jest para configurar e limpar o ambiente antes e depois de cada teste, garantindo isolamento entre execuções.

A utilização de utilitários compartilhados reduz duplicação de código nos testes e facilita manutenção quando a estrutura de dados ou endpoints mudam. Os testes de integração verificam o comportamento completo da API, incluindo middleware, validações e interações com o banco de dados.

A cobertura de testes inclui validação de dados, autenticação, autorização, tratamento de erros e casos extremos, proporcionando confiança na qualidade e confiabilidade da API desenvolvida.

## Scripts de Package.json

Atualize o arquivo `package.json` para incluir scripts úteis para desenvolvimento, teste e produção.

```json
{
  "name": "api-cadastro-usuarios",
  "version": "1.0.0",
  "description": "API REST para cadastro de usuários com Node.js e MySQL",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "db:setup": "mysql -u root -p < database/schema.sql",
    "db:seed": "node database/seeds.js",
    "lint": "eslint src/ tests/",
    "lint:fix": "eslint src/ tests/ --fix"
  },
  "keywords": [
    "nodejs",
    "express",
    "mysql",
    "jwt",
    "rest-api",
    "authentication"
  ],
  "author": "Seu Nome",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "validator": "^13.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3",
    "eslint": "^8.47.0"
  },
  "jest": {
    "testEnvironment": "node",
    "setupFilesAfterEnv": ["<rootDir>/tests/setup.js"],
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/**/*.test.js"
    ],
    "coverageDirectory": "coverage",
    "coverageReporters": ["text", "lcov", "html"]
  }
}
```

Esta configuração completa da API REST com Node.js e MySQL fornece uma base sólida para sistemas de cadastro de usuários. A implementação inclui todas as funcionalidades essenciais: autenticação segura, validação robusta de dados, tratamento adequado de erros, testes abrangentes e estrutura organizacional que facilita manutenção e escalabilidade.

A API está preparada para ser consumida por diferentes tipos de clientes, incluindo aplicações web React, aplicativos móveis nativos Android e aplicações React Native, que serão abordados nas próximas seções deste tutorial.

