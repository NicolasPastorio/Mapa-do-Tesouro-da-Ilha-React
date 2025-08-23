# Tutorial Completo: API REST com Node.js e MongoDB para Cadastro de Usuários

**Autor:** Manus AI  
**Data:** Dezembro 2024  
**Versão:** 1.0

## Sumário

1. [Introdução](#introdução)
2. [Configuração do Ambiente](#configuração-do-ambiente)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Configuração do Banco de Dados MongoDB](#configuração-do-banco-de-dados-mongodb)
5. [Modelo de Usuário com Mongoose](#modelo-de-usuário-com-mongoose)
6. [Implementação da Criptografia de Senhas](#implementação-da-criptografia-de-senhas)
7. [Sistema de Autenticação JWT](#sistema-de-autenticação-jwt)
8. [Rotas de Autenticação](#rotas-de-autenticação)
9. [Middleware de Autenticação](#middleware-de-autenticação)
10. [Rotas Protegidas](#rotas-protegidas)
11. [Validação de Dados](#validação-de-dados)
12. [Tratamento de Erros](#tratamento-de-erros)
13. [Configuração de CORS](#configuração-de-cors)
14. [Documentação da API](#documentação-da-api)
15. [Testes da API](#testes-da-api)
16. [Deploy e Produção](#deploy-e-produção)
17. [Referências](#referências)

---

## Introdução

Este tutorial apresenta um guia completo para o desenvolvimento de uma API REST robusta e segura utilizando Node.js e MongoDB. A API será focada no sistema de cadastro e autenticação de usuários, implementando as melhores práticas de segurança, incluindo criptografia de senhas, autenticação via JSON Web Tokens (JWT), validação de dados e proteção contra vulnerabilidades comuns.

### Objetivos do Tutorial

Ao final deste tutorial, você será capaz de:

- Configurar um ambiente de desenvolvimento Node.js completo
- Implementar uma API REST seguindo os padrões RESTful
- Integrar MongoDB como banco de dados NoSQL
- Implementar sistemas de segurança robustos com criptografia
- Criar um sistema de autenticação baseado em JWT
- Validar e sanitizar dados de entrada
- Implementar middleware de segurança
- Documentar adequadamente os endpoints da API
- Realizar testes automatizados da API
- Preparar a aplicação para produção

### Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript para servidor
- **Express.js**: Framework web minimalista e flexível
- **MongoDB**: Banco de dados NoSQL orientado a documentos
- **Mongoose**: ODM (Object Document Mapper) para MongoDB
- **bcryptjs**: Biblioteca para hash de senhas
- **jsonwebtoken**: Implementação de JWT para Node.js
- **express-validator**: Middleware para validação de dados
- **helmet**: Middleware de segurança para Express
- **cors**: Middleware para configuração de CORS
- **dotenv**: Gerenciamento de variáveis de ambiente
- **nodemon**: Ferramenta para desenvolvimento com auto-reload

### Arquitetura da API

A API seguirá uma arquitetura em camadas bem definida:

1. **Camada de Roteamento**: Definição dos endpoints e suas respectivas funções
2. **Camada de Controle**: Lógica de negócio e processamento das requisições
3. **Camada de Modelo**: Definição dos esquemas de dados e interação com o banco
4. **Camada de Middleware**: Interceptadores para autenticação, validação e segurança
5. **Camada de Configuração**: Configurações do servidor, banco de dados e variáveis de ambiente




## Configuração do Ambiente

### Pré-requisitos

Antes de iniciar o desenvolvimento, certifique-se de ter os seguintes softwares instalados em seu sistema:

#### Node.js e npm

O Node.js é o runtime JavaScript que permitirá executar código JavaScript no servidor. O npm (Node Package Manager) é o gerenciador de pacotes que acompanha o Node.js.

**Instalação no Windows:**
1. Acesse o site oficial do Node.js (https://nodejs.org/)
2. Baixe a versão LTS (Long Term Support)
3. Execute o instalador e siga as instruções
4. Verifique a instalação abrindo o terminal e executando:

```bash
node --version
npm --version
```

**Instalação no macOS:**
```bash
# Usando Homebrew
brew install node

# Ou baixe diretamente do site oficial
```

**Instalação no Linux (Ubuntu/Debian):**
```bash
# Atualizar repositórios
sudo apt update

# Instalar Node.js e npm
sudo apt install nodejs npm

# Verificar versões
node --version
npm --version
```

#### MongoDB

O MongoDB pode ser instalado localmente ou utilizado através de serviços em nuvem como MongoDB Atlas.

**Instalação Local no Windows:**
1. Acesse https://www.mongodb.com/try/download/community
2. Baixe o MongoDB Community Server
3. Execute o instalador e siga as instruções
4. Inicie o serviço MongoDB

**Instalação Local no macOS:**
```bash
# Usando Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Instalação Local no Linux (Ubuntu):**
```bash
# Importar chave pública
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Adicionar repositório
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Atualizar e instalar
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar serviço
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Alternativa: MongoDB Atlas (Recomendado para Iniciantes)**

O MongoDB Atlas é um serviço de banco de dados em nuvem que oferece uma camada gratuita ideal para desenvolvimento e aprendizado:

1. Acesse https://www.mongodb.com/atlas
2. Crie uma conta gratuita
3. Crie um novo cluster (escolha a opção gratuita)
4. Configure o acesso ao banco (usuário e senha)
5. Adicione seu IP à lista de IPs permitidos
6. Obtenha a string de conexão

### Criação do Projeto

Agora vamos criar a estrutura inicial do nosso projeto:

```bash
# Criar diretório do projeto
mkdir api-usuarios-nodejs
cd api-usuarios-nodejs

# Inicializar projeto Node.js
npm init -y

# Criar estrutura de diretórios
mkdir src
mkdir src/controllers
mkdir src/models
mkdir src/routes
mkdir src/middleware
mkdir src/config
mkdir src/utils
mkdir tests
```

### Instalação das Dependências

Vamos instalar todas as dependências necessárias para o projeto:

```bash
# Dependências principais
npm install express mongoose bcryptjs jsonwebtoken express-validator helmet cors dotenv

# Dependências de desenvolvimento
npm install --save-dev nodemon jest supertest

# Dependência global para nodemon (opcional)
npm install -g nodemon
```

**Explicação das Dependências:**

- **express**: Framework web para Node.js que simplifica a criação de APIs
- **mongoose**: ODM para MongoDB que facilita a modelagem de dados
- **bcryptjs**: Biblioteca para hash de senhas de forma segura
- **jsonwebtoken**: Implementação de JWT para autenticação stateless
- **express-validator**: Middleware para validação e sanitização de dados
- **helmet**: Conjunto de middlewares de segurança para Express
- **cors**: Middleware para configuração de Cross-Origin Resource Sharing
- **dotenv**: Carregamento de variáveis de ambiente a partir de arquivo .env
- **nodemon**: Ferramenta que reinicia automaticamente o servidor durante desenvolvimento
- **jest**: Framework de testes para JavaScript
- **supertest**: Biblioteca para testes de APIs HTTP

### Configuração do package.json

Edite o arquivo `package.json` para incluir os scripts necessários:

```json
{
  "name": "api-usuarios-nodejs",
  "version": "1.0.0",
  "description": "API REST para cadastro e autenticação de usuários",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "keywords": ["api", "rest", "nodejs", "mongodb", "authentication"],
  "author": "Seu Nome",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

## Estrutura do Projeto

A organização adequada dos arquivos é fundamental para manter o código limpo e escalável. Nossa estrutura seguirá o padrão MVC (Model-View-Controller) adaptado para APIs:

```
api-usuarios-nodejs/
├── src/
│   ├── config/
│   │   ├── database.js          # Configuração do MongoDB
│   │   └── jwt.js               # Configuração do JWT
│   ├── controllers/
│   │   ├── authController.js    # Controlador de autenticação
│   │   └── userController.js    # Controlador de usuários
│   ├── middleware/
│   │   ├── auth.js              # Middleware de autenticação
│   │   ├── validation.js        # Middleware de validação
│   │   └── errorHandler.js      # Middleware de tratamento de erros
│   ├── models/
│   │   └── User.js              # Modelo do usuário
│   ├── routes/
│   │   ├── auth.js              # Rotas de autenticação
│   │   └── users.js             # Rotas de usuários
│   ├── utils/
│   │   ├── logger.js            # Utilitário de logging
│   │   └── helpers.js           # Funções auxiliares
│   └── server.js                # Arquivo principal do servidor
├── tests/
│   ├── auth.test.js             # Testes de autenticação
│   └── users.test.js            # Testes de usuários
├── .env                         # Variáveis de ambiente
├── .gitignore                   # Arquivos ignorados pelo Git
├── package.json                 # Configuração do projeto
└── README.md                    # Documentação do projeto
```

### Arquivo .env

Crie o arquivo `.env` na raiz do projeto para armazenar as variáveis de ambiente:

```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações do MongoDB
MONGODB_URI=mongodb://localhost:27017/api-usuarios
# Para MongoDB Atlas, use algo como:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/api-usuarios

# Configurações do JWT
JWT_SECRET=sua_chave_secreta_muito_forte_aqui
JWT_EXPIRE=7d

# Configurações de Segurança
BCRYPT_ROUNDS=12
```

**Importante:** Nunca commite o arquivo `.env` no controle de versão. Adicione-o ao `.gitignore`.

### Arquivo .gitignore

Crie o arquivo `.gitignore` para ignorar arquivos desnecessários:

```gitignore
# Dependências
node_modules/

# Variáveis de ambiente
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory usado por ferramentas como istanbul
coverage/

# Diretório de dependências do npm
.npm

# Arquivos de cache
.cache/

# Arquivos temporários
.tmp/
temp/

# Arquivos do sistema operacional
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/
*.swp
*.swo
```


## Configuração do Banco de Dados MongoDB

### Arquivo de Configuração do Banco

Crie o arquivo `src/config/database.js` para centralizar a configuração da conexão com o MongoDB:

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
    
    // Event listeners para monitoramento da conexão
    mongoose.connection.on('connected', () => {
      console.log('Mongoose conectado ao MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Erro na conexão do Mongoose:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose desconectado do MongoDB');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Conexão do MongoDB fechada devido ao encerramento da aplicação');
      process.exit(0);
    });

  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Configuração de Índices

Para otimizar as consultas no MongoDB, é importante criar índices apropriados. Vamos configurar índices para os campos mais consultados:

```javascript
// Adicione esta função ao arquivo database.js
const createIndexes = async () => {
  try {
    const User = require('../models/User');
    
    // Criar índice único para email
    await User.collection.createIndex({ email: 1 }, { unique: true });
    
    // Criar índice para campos de busca frequente
    await User.collection.createIndex({ createdAt: -1 });
    await User.collection.createIndex({ isActive: 1 });
    
    console.log('Índices criados com sucesso');
  } catch (error) {
    console.error('Erro ao criar índices:', error.message);
  }
};

// Chame esta função após a conexão ser estabelecida
```

## Modelo de Usuário com Mongoose

### Definição do Schema

Crie o arquivo `src/models/User.js` com o modelo completo do usuário:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
    maxlength: [50, 'Nome deve ter no máximo 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, insira um email válido'
    ]
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
    select: false // Por padrão, não incluir a senha nas consultas
  },
  telefone: {
    type: String,
    trim: true,
    match: [
      /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
      'Por favor, insira um telefone válido'
    ]
  },
  dataNascimento: {
    type: Date,
    validate: {
      validator: function(value) {
        return value < new Date();
      },
      message: 'Data de nascimento deve ser anterior à data atual'
    }
  },
  endereco: {
    rua: {
      type: String,
      trim: true,
      maxlength: [100, 'Rua deve ter no máximo 100 caracteres']
    },
    numero: {
      type: String,
      trim: true,
      maxlength: [10, 'Número deve ter no máximo 10 caracteres']
    },
    complemento: {
      type: String,
      trim: true,
      maxlength: [50, 'Complemento deve ter no máximo 50 caracteres']
    },
    bairro: {
      type: String,
      trim: true,
      maxlength: [50, 'Bairro deve ter no máximo 50 caracteres']
    },
    cidade: {
      type: String,
      trim: true,
      maxlength: [50, 'Cidade deve ter no máximo 50 caracteres']
    },
    estado: {
      type: String,
      trim: true,
      maxlength: [2, 'Estado deve ter 2 caracteres'],
      minlength: [2, 'Estado deve ter 2 caracteres'],
      uppercase: true
    },
    cep: {
      type: String,
      trim: true,
      match: [/^\d{5}-?\d{3}$/, 'CEP deve estar no formato 00000-000']
    }
  },
  perfil: {
    type: String,
    enum: ['usuario', 'admin', 'moderador'],
    default: 'usuario'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerificado: {
    type: Boolean,
    default: false
  },
  tokenVerificacao: {
    type: String,
    select: false
  },
  tokenResetSenha: {
    type: String,
    select: false
  },
  tokenResetExpira: {
    type: Date,
    select: false
  },
  ultimoLogin: {
    type: Date
  },
  tentativasLogin: {
    type: Number,
    default: 0
  },
  bloqueadoAte: {
    type: Date
  }
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para idade
userSchema.virtual('idade').get(function() {
  if (this.dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(this.dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  }
  return null;
});

// Virtual para nome completo do endereço
userSchema.virtual('enderecoCompleto').get(function() {
  if (this.endereco && this.endereco.rua) {
    let endereco = `${this.endereco.rua}`;
    if (this.endereco.numero) endereco += `, ${this.endereco.numero}`;
    if (this.endereco.complemento) endereco += `, ${this.endereco.complemento}`;
    if (this.endereco.bairro) endereco += ` - ${this.endereco.bairro}`;
    if (this.endereco.cidade) endereco += `, ${this.endereco.cidade}`;
    if (this.endereco.estado) endereco += `/${this.endereco.estado}`;
    if (this.endereco.cep) endereco += ` - ${this.endereco.cep}`;
    return endereco;
  }
  return null;
});

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  // Só fazer hash se a senha foi modificada
  if (!this.isModified('senha')) return next();
  
  try {
    // Gerar salt e hash da senha
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware para atualizar updatedAt em operações de update
userSchema.pre(['updateOne', 'findOneAndUpdate'], function() {
  this.set({ updatedAt: new Date() });
});

// Método para comparar senhas
userSchema.methods.compararSenha = async function(senhaInformada) {
  return await bcrypt.compare(senhaInformada, this.senha);
};

// Método para gerar JWT
userSchema.methods.gerarJWT = function() {
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      perfil: this.perfil
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

// Método para gerar token de reset de senha
userSchema.methods.gerarTokenResetSenha = function() {
  const resetToken = require('crypto').randomBytes(20).toString('hex');
  
  // Hash do token para armazenar no banco
  this.tokenResetSenha = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Definir expiração para 10 minutos
  this.tokenResetExpira = Date.now() + 10 * 60 * 1000;
  
  return resetToken;
};

// Método para verificar se a conta está bloqueada
userSchema.methods.estaBloqueda = function() {
  return this.bloqueadoAte && this.bloqueadoAte > Date.now();
};

// Método para incrementar tentativas de login
userSchema.methods.incrementarTentativasLogin = async function() {
  // Se já passou do tempo de bloqueio, resetar tentativas
  if (this.bloqueadoAte && this.bloqueadoAte < Date.now()) {
    return this.updateOne({
      $unset: { bloqueadoAte: 1 },
      $set: { tentativasLogin: 1 }
    });
  }
  
  const updates = { $inc: { tentativasLogin: 1 } };
  
  // Bloquear após 5 tentativas por 2 horas
  if (this.tentativasLogin + 1 >= 5 && !this.estaBloqueda()) {
    updates.$set = { bloqueadoAte: Date.now() + 2 * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

// Método para resetar tentativas de login
userSchema.methods.resetarTentativasLogin = function() {
  return this.updateOne({
    $unset: { tentativasLogin: 1, bloqueadoAte: 1 },
    $set: { ultimoLogin: new Date() }
  });
};

// Método para remover dados sensíveis do objeto
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  
  // Remover campos sensíveis
  delete userObject.senha;
  delete userObject.tokenVerificacao;
  delete userObject.tokenResetSenha;
  delete userObject.tokenResetExpira;
  delete userObject.__v;
  
  return userObject;
};

// Índices para otimização
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ createdAt: -1 });
userSchema.index({ isActive: 1 });
userSchema.index({ perfil: 1 });
userSchema.index({ emailVerificado: 1 });

module.exports = mongoose.model('User', userSchema);
```

## Implementação da Criptografia de Senhas

### Conceitos de Segurança

A criptografia de senhas é fundamental para proteger as credenciais dos usuários. Utilizamos o bcrypt, que implementa o algoritmo de hash Blowfish com salt, tornando extremamente difícil a reversão das senhas mesmo em caso de vazamento de dados.

### Configuração do bcrypt

O bcrypt utiliza um conceito chamado "rounds" ou "cost factor" que determina quantas vezes o algoritmo de hash será executado. Quanto maior o número de rounds, mais seguro, mas também mais lento será o processo.

```javascript
// src/utils/crypto.js
const bcrypt = require('bcryptjs');

class CryptoUtils {
  /**
   * Gera hash da senha usando bcrypt
   * @param {string} senha - Senha em texto plano
   * @param {number} rounds - Número de rounds (padrão: 12)
   * @returns {Promise<string>} Hash da senha
   */
  static async hashSenha(senha, rounds = 12) {
    try {
      const salt = await bcrypt.genSalt(rounds);
      return await bcrypt.hash(senha, salt);
    } catch (error) {
      throw new Error('Erro ao gerar hash da senha');
    }
  }

  /**
   * Compara senha em texto plano com hash
   * @param {string} senha - Senha em texto plano
   * @param {string} hash - Hash armazenado
   * @returns {Promise<boolean>} True se as senhas coincidirem
   */
  static async compararSenha(senha, hash) {
    try {
      return await bcrypt.compare(senha, hash);
    } catch (error) {
      throw new Error('Erro ao comparar senhas');
    }
  }

  /**
   * Valida força da senha
   * @param {string} senha - Senha a ser validada
   * @returns {object} Resultado da validação
   */
  static validarForcaSenha(senha) {
    const resultado = {
      valida: false,
      pontuacao: 0,
      criterios: {
        tamanho: senha.length >= 8,
        minuscula: /[a-z]/.test(senha),
        maiuscula: /[A-Z]/.test(senha),
        numero: /\d/.test(senha),
        especial: /[!@#$%^&*(),.?":{}|<>]/.test(senha)
      },
      sugestoes: []
    };

    // Calcular pontuação
    Object.values(resultado.criterios).forEach(criterio => {
      if (criterio) resultado.pontuacao++;
    });

    // Gerar sugestões
    if (!resultado.criterios.tamanho) {
      resultado.sugestoes.push('Use pelo menos 8 caracteres');
    }
    if (!resultado.criterios.minuscula) {
      resultado.sugestoes.push('Inclua pelo menos uma letra minúscula');
    }
    if (!resultado.criterios.maiuscula) {
      resultado.sugestoes.push('Inclua pelo menos uma letra maiúscula');
    }
    if (!resultado.criterios.numero) {
      resultado.sugestoes.push('Inclua pelo menos um número');
    }
    if (!resultado.criterios.especial) {
      resultado.sugestoes.push('Inclua pelo menos um caractere especial');
    }

    // Senha é válida se atender pelo menos 4 critérios
    resultado.valida = resultado.pontuacao >= 4;

    return resultado;
  }

  /**
   * Gera senha aleatória segura
   * @param {number} tamanho - Tamanho da senha (padrão: 12)
   * @returns {string} Senha gerada
   */
  static gerarSenhaAleatoria(tamanho = 12) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let senha = '';
    
    for (let i = 0; i < tamanho; i++) {
      senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    
    return senha;
  }
}

module.exports = CryptoUtils;
```

### Implementação de Salt Personalizado

Para aumentar ainda mais a segurança, podemos implementar um salt personalizado além do salt gerado pelo bcrypt:

```javascript
// src/utils/advancedCrypto.js
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

class AdvancedCrypto {
  /**
   * Gera salt personalizado baseado em informações do usuário
   * @param {string} email - Email do usuário
   * @param {Date} createdAt - Data de criação da conta
   * @returns {string} Salt personalizado
   */
  static gerarSaltPersonalizado(email, createdAt) {
    const dados = `${email}${createdAt.toISOString()}${process.env.JWT_SECRET}`;
    return crypto.createHash('sha256').update(dados).digest('hex').substring(0, 16);
  }

  /**
   * Hash avançado com salt personalizado
   * @param {string} senha - Senha em texto plano
   * @param {string} email - Email do usuário
   * @param {Date} createdAt - Data de criação
   * @returns {Promise<string>} Hash da senha
   */
  static async hashAvancado(senha, email, createdAt) {
    const saltPersonalizado = this.gerarSaltPersonalizado(email, createdAt);
    const senhaComSalt = senha + saltPersonalizado;
    
    const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    return await bcrypt.hash(senhaComSalt, rounds);
  }

  /**
   * Compara senha com hash avançado
   * @param {string} senha - Senha em texto plano
   * @param {string} hash - Hash armazenado
   * @param {string} email - Email do usuário
   * @param {Date} createdAt - Data de criação
   * @returns {Promise<boolean>} True se as senhas coincidirem
   */
  static async compararAvancado(senha, hash, email, createdAt) {
    const saltPersonalizado = this.gerarSaltPersonalizado(email, createdAt);
    const senhaComSalt = senha + saltPersonalizado;
    
    return await bcrypt.compare(senhaComSalt, hash);
  }
}

module.exports = AdvancedCrypto;
```


## Sistema de Autenticação JWT

### Conceitos do JWT

JSON Web Token (JWT) é um padrão aberto (RFC 7519) que define uma maneira compacta e autocontida de transmitir informações com segurança entre as partes como um objeto JSON. Os JWTs são amplamente utilizados para autenticação e troca de informações.

### Configuração do JWT

Crie o arquivo `src/config/jwt.js` para centralizar as configurações do JWT:

```javascript
const jwt = require('jsonwebtoken');
require('dotenv').config();

class JWTConfig {
  /**
   * Gera um token JWT
   * @param {object} payload - Dados a serem incluídos no token
   * @param {string} expiresIn - Tempo de expiração (padrão: 7d)
   * @returns {string} Token JWT
   */
  static gerarToken(payload, expiresIn = process.env.JWT_EXPIRE || '7d') {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
      issuer: 'api-usuarios',
      audience: 'usuarios-app'
    });
  }

  /**
   * Verifica e decodifica um token JWT
   * @param {string} token - Token a ser verificado
   * @returns {object} Payload decodificado
   */
  static verificarToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET, {
        issuer: 'api-usuarios',
        audience: 'usuarios-app'
      });
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  /**
   * Decodifica um token sem verificar a assinatura
   * @param {string} token - Token a ser decodificado
   * @returns {object} Payload decodificado
   */
  static decodificarToken(token) {
    return jwt.decode(token);
  }

  /**
   * Gera token de refresh
   * @param {string} userId - ID do usuário
   * @returns {string} Refresh token
   */
  static gerarRefreshToken(userId) {
    return jwt.sign(
      { userId, type: 'refresh' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  }

  /**
   * Verifica se o token está próximo do vencimento
   * @param {string} token - Token a ser verificado
   * @param {number} minutosAntes - Minutos antes do vencimento (padrão: 15)
   * @returns {boolean} True se está próximo do vencimento
   */
  static estaProximoVencimento(token, minutosAntes = 15) {
    try {
      const decoded = this.decodificarToken(token);
      const agora = Math.floor(Date.now() / 1000);
      const tempoRestante = decoded.exp - agora;
      
      return tempoRestante <= (minutosAntes * 60);
    } catch (error) {
      return true;
    }
  }
}

module.exports = JWTConfig;
```

### Implementação de Refresh Token

Para maior segurança, implementaremos um sistema de refresh token que permite renovar tokens expirados:

```javascript
// src/models/RefreshToken.js
const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
  },
  isActive: {
    type: Boolean,
    default: true
  },
  deviceInfo: {
    userAgent: String,
    ip: String,
    device: String
  }
}, {
  timestamps: true
});

// Índice para expiração automática
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Método para revogar token
refreshTokenSchema.methods.revogar = function() {
  this.isActive = false;
  return this.save();
};

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
```

## Rotas de Autenticação

### Controlador de Autenticação

Crie o arquivo `src/controllers/authController.js` com todas as funcionalidades de autenticação:

```javascript
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const JWTConfig = require('../config/jwt');
const CryptoUtils = require('../utils/crypto');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

class AuthController {
  /**
   * Registro de novo usuário
   */
  static async registrar(req, res) {
    try {
      // Verificar erros de validação
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Dados inválidos',
          erros: errors.array()
        });
      }

      const { nome, email, senha, telefone, dataNascimento, endereco } = req.body;

      // Verificar se usuário já existe
      const usuarioExistente = await User.findOne({ email });
      if (usuarioExistente) {
        return res.status(409).json({
          sucesso: false,
          mensagem: 'Email já está em uso'
        });
      }

      // Validar força da senha
      const validacaoSenha = CryptoUtils.validarForcaSenha(senha);
      if (!validacaoSenha.valida) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Senha não atende aos critérios de segurança',
          sugestoes: validacaoSenha.sugestoes
        });
      }

      // Criar novo usuário
      const novoUsuario = new User({
        nome,
        email,
        senha,
        telefone,
        dataNascimento,
        endereco,
        tokenVerificacao: crypto.randomBytes(32).toString('hex')
      });

      await novoUsuario.save();

      // Gerar tokens
      const token = novoUsuario.gerarJWT();
      const refreshToken = JWTConfig.gerarRefreshToken(novoUsuario._id);

      // Salvar refresh token
      const novoRefreshToken = new RefreshToken({
        token: refreshToken,
        usuario: novoUsuario._id,
        deviceInfo: {
          userAgent: req.get('User-Agent'),
          ip: req.ip,
          device: req.get('X-Device-Type') || 'unknown'
        }
      });

      await novoRefreshToken.save();

      // Remover senha da resposta
      const usuarioResposta = novoUsuario.toJSON();

      res.status(201).json({
        sucesso: true,
        mensagem: 'Usuário registrado com sucesso',
        dados: {
          usuario: usuarioResposta,
          token,
          refreshToken,
          expiresIn: process.env.JWT_EXPIRE || '7d'
        }
      });

    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Login de usuário
   */
  static async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Dados inválidos',
          erros: errors.array()
        });
      }

      const { email, senha } = req.body;

      // Buscar usuário com senha
      const usuario = await User.findOne({ email }).select('+senha');
      if (!usuario) {
        return res.status(401).json({
          sucesso: false,
          mensagem: 'Credenciais inválidas'
        });
      }

      // Verificar se a conta está ativa
      if (!usuario.isActive) {
        return res.status(401).json({
          sucesso: false,
          mensagem: 'Conta desativada'
        });
      }

      // Verificar se a conta está bloqueada
      if (usuario.estaBloqueda()) {
        return res.status(423).json({
          sucesso: false,
          mensagem: 'Conta temporariamente bloqueada devido a múltiplas tentativas de login'
        });
      }

      // Verificar senha
      const senhaCorreta = await usuario.compararSenha(senha);
      if (!senhaCorreta) {
        await usuario.incrementarTentativasLogin();
        return res.status(401).json({
          sucesso: false,
          mensagem: 'Credenciais inválidas'
        });
      }

      // Reset tentativas de login e atualizar último login
      await usuario.resetarTentativasLogin();

      // Gerar tokens
      const token = usuario.gerarJWT();
      const refreshToken = JWTConfig.gerarRefreshToken(usuario._id);

      // Revogar refresh tokens antigos do mesmo dispositivo
      await RefreshToken.updateMany(
        { 
          usuario: usuario._id,
          'deviceInfo.userAgent': req.get('User-Agent'),
          isActive: true
        },
        { isActive: false }
      );

      // Salvar novo refresh token
      const novoRefreshToken = new RefreshToken({
        token: refreshToken,
        usuario: usuario._id,
        deviceInfo: {
          userAgent: req.get('User-Agent'),
          ip: req.ip,
          device: req.get('X-Device-Type') || 'unknown'
        }
      });

      await novoRefreshToken.save();

      // Remover dados sensíveis da resposta
      const usuarioResposta = usuario.toJSON();

      res.json({
        sucesso: true,
        mensagem: 'Login realizado com sucesso',
        dados: {
          usuario: usuarioResposta,
          token,
          refreshToken,
          expiresIn: process.env.JWT_EXPIRE || '7d'
        }
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Renovar token usando refresh token
   */
  static async renovarToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Refresh token é obrigatório'
        });
      }

      // Verificar refresh token no banco
      const tokenDoc = await RefreshToken.findOne({
        token: refreshToken,
        isActive: true,
        expiresAt: { $gt: new Date() }
      }).populate('usuario');

      if (!tokenDoc) {
        return res.status(401).json({
          sucesso: false,
          mensagem: 'Refresh token inválido ou expirado'
        });
      }

      // Verificar se o usuário ainda está ativo
      if (!tokenDoc.usuario.isActive) {
        await tokenDoc.revogar();
        return res.status(401).json({
          sucesso: false,
          mensagem: 'Usuário desativado'
        });
      }

      // Gerar novos tokens
      const novoToken = tokenDoc.usuario.gerarJWT();
      const novoRefreshToken = JWTConfig.gerarRefreshToken(tokenDoc.usuario._id);

      // Revogar refresh token atual
      await tokenDoc.revogar();

      // Salvar novo refresh token
      const novoTokenDoc = new RefreshToken({
        token: novoRefreshToken,
        usuario: tokenDoc.usuario._id,
        deviceInfo: tokenDoc.deviceInfo
      });

      await novoTokenDoc.save();

      res.json({
        sucesso: true,
        mensagem: 'Token renovado com sucesso',
        dados: {
          token: novoToken,
          refreshToken: novoRefreshToken,
          expiresIn: process.env.JWT_EXPIRE || '7d'
        }
      });

    } catch (error) {
      console.error('Erro ao renovar token:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Logout do usuário
   */
  static async logout(req, res) {
    try {
      const { refreshToken } = req.body;

      if (refreshToken) {
        // Revogar refresh token específico
        await RefreshToken.updateOne(
          { token: refreshToken },
          { isActive: false }
        );
      }

      // Se houver usuário autenticado, revogar todos os tokens
      if (req.usuario) {
        await RefreshToken.updateMany(
          { usuario: req.usuario.id },
          { isActive: false }
        );
      }

      res.json({
        sucesso: true,
        mensagem: 'Logout realizado com sucesso'
      });

    } catch (error) {
      console.error('Erro no logout:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Solicitar reset de senha
   */
  static async solicitarResetSenha(req, res) {
    try {
      const { email } = req.body;

      const usuario = await User.findOne({ email });
      if (!usuario) {
        // Por segurança, sempre retornar sucesso
        return res.json({
          sucesso: true,
          mensagem: 'Se o email existir, um link de reset será enviado'
        });
      }

      // Gerar token de reset
      const resetToken = usuario.gerarTokenResetSenha();
      await usuario.save();

      // Aqui você implementaria o envio de email
      // Por enquanto, vamos apenas logar o token
      console.log(`Token de reset para ${email}: ${resetToken}`);

      res.json({
        sucesso: true,
        mensagem: 'Se o email existir, um link de reset será enviado'
      });

    } catch (error) {
      console.error('Erro ao solicitar reset de senha:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Reset de senha
   */
  static async resetSenha(req, res) {
    try {
      const { token, novaSenha } = req.body;

      // Hash do token recebido
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      // Buscar usuário com token válido
      const usuario = await User.findOne({
        tokenResetSenha: hashedToken,
        tokenResetExpira: { $gt: Date.now() }
      });

      if (!usuario) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Token inválido ou expirado'
        });
      }

      // Validar nova senha
      const validacaoSenha = CryptoUtils.validarForcaSenha(novaSenha);
      if (!validacaoSenha.valida) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Nova senha não atende aos critérios de segurança',
          sugestoes: validacaoSenha.sugestoes
        });
      }

      // Atualizar senha e limpar tokens
      usuario.senha = novaSenha;
      usuario.tokenResetSenha = undefined;
      usuario.tokenResetExpira = undefined;
      usuario.tentativasLogin = 0;
      usuario.bloqueadoAte = undefined;

      await usuario.save();

      // Revogar todos os refresh tokens do usuário
      await RefreshToken.updateMany(
        { usuario: usuario._id },
        { isActive: false }
      );

      res.json({
        sucesso: true,
        mensagem: 'Senha alterada com sucesso'
      });

    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Alterar senha (usuário logado)
   */
  static async alterarSenha(req, res) {
    try {
      const { senhaAtual, novaSenha } = req.body;
      const usuarioId = req.usuario.id;

      // Buscar usuário com senha
      const usuario = await User.findById(usuarioId).select('+senha');
      if (!usuario) {
        return res.status(404).json({
          sucesso: false,
          mensagem: 'Usuário não encontrado'
        });
      }

      // Verificar senha atual
      const senhaCorreta = await usuario.compararSenha(senhaAtual);
      if (!senhaCorreta) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Senha atual incorreta'
        });
      }

      // Validar nova senha
      const validacaoSenha = CryptoUtils.validarForcaSenha(novaSenha);
      if (!validacaoSenha.valida) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Nova senha não atende aos critérios de segurança',
          sugestoes: validacaoSenha.sugestoes
        });
      }

      // Atualizar senha
      usuario.senha = novaSenha;
      await usuario.save();

      res.json({
        sucesso: true,
        mensagem: 'Senha alterada com sucesso'
      });

    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = AuthController;
```

## Middleware de Autenticação

### Middleware Principal

Crie o arquivo `src/middleware/auth.js` para implementar o middleware de autenticação:

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWTConfig = require('../config/jwt');

/**
 * Middleware para verificar autenticação JWT
 */
const verificarAuth = async (req, res, next) => {
  try {
    // Extrair token do header Authorization
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Token de acesso não fornecido'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    // Verificar e decodificar token
    const decoded = JWTConfig.verificarToken(token);

    // Buscar usuário no banco
    const usuario = await User.findById(decoded.id);
    if (!usuario) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Token inválido - usuário não encontrado'
      });
    }

    // Verificar se usuário está ativo
    if (!usuario.isActive) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Conta desativada'
      });
    }

    // Adicionar usuário à requisição
    req.usuario = {
      id: usuario._id,
      email: usuario.email,
      nome: usuario.nome,
      perfil: usuario.perfil
    };

    // Verificar se token está próximo do vencimento
    if (JWTConfig.estaProximoVencimento(token)) {
      res.set('X-Token-Refresh-Needed', 'true');
    }

    next();

  } catch (error) {
    console.error('Erro na verificação de autenticação:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Token inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Token expirado'
      });
    }

    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno do servidor'
    });
  }
};

/**
 * Middleware para verificar permissões por perfil
 */
const verificarPerfil = (...perfisPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Usuário não autenticado'
      });
    }

    if (!perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({
        sucesso: false,
        mensagem: 'Acesso negado - permissões insuficientes'
      });
    }

    next();
  };
};

/**
 * Middleware opcional de autenticação (não falha se não houver token)
 */
const authOpcional = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = JWTConfig.verificarToken(token);
      
      const usuario = await User.findById(decoded.id);
      if (usuario && usuario.isActive) {
        req.usuario = {
          id: usuario._id,
          email: usuario.email,
          nome: usuario.nome,
          perfil: usuario.perfil
        };
      }
    }

    next();
  } catch (error) {
    // Em caso de erro, continua sem usuário autenticado
    next();
  }
};

/**
 * Middleware para verificar se o usuário pode acessar seus próprios dados
 */
const verificarProprietario = (req, res, next) => {
  const usuarioId = req.params.id || req.params.userId;
  
  if (req.usuario.perfil === 'admin') {
    return next(); // Admin pode acessar qualquer usuário
  }
  
  if (req.usuario.id !== usuarioId) {
    return res.status(403).json({
      sucesso: false,
      mensagem: 'Acesso negado - você só pode acessar seus próprios dados'
    });
  }
  
  next();
};

module.exports = {
  verificarAuth,
  verificarPerfil,
  authOpcional,
  verificarProprietario
};
```


### Definição das Rotas de Autenticação

Crie o arquivo `src/routes/auth.js` para definir todas as rotas relacionadas à autenticação:

```javascript
const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');
const { verificarAuth } = require('../middleware/auth');
const router = express.Router();

// Validações para registro
const validacaoRegistro = [
  body('nome')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nome deve ter entre 2 e 50 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email deve ser válido'),
  
  body('senha')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres'),
  
  body('telefone')
    .optional()
    .matches(/^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/)
    .withMessage('Telefone deve estar em formato válido'),
  
  body('dataNascimento')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Data de nascimento deve ser uma data válida')
];

// Validações para login
const validacaoLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email deve ser válido'),
  
  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória')
];

// Validações para reset de senha
const validacaoResetSenha = [
  body('token')
    .notEmpty()
    .withMessage('Token é obrigatório'),
  
  body('novaSenha')
    .isLength({ min: 6 })
    .withMessage('Nova senha deve ter pelo menos 6 caracteres')
];

// Validações para alteração de senha
const validacaoAlterarSenha = [
  body('senhaAtual')
    .notEmpty()
    .withMessage('Senha atual é obrigatória'),
  
  body('novaSenha')
    .isLength({ min: 6 })
    .withMessage('Nova senha deve ter pelo menos 6 caracteres')
];

// Rotas públicas
router.post('/registrar', validacaoRegistro, AuthController.registrar);
router.post('/login', validacaoLogin, AuthController.login);
router.post('/renovar-token', AuthController.renovarToken);
router.post('/solicitar-reset-senha', 
  body('email').isEmail().normalizeEmail(),
  AuthController.solicitarResetSenha
);
router.post('/reset-senha', validacaoResetSenha, AuthController.resetSenha);

// Rotas protegidas
router.post('/logout', AuthController.logout);
router.post('/alterar-senha', verificarAuth, validacaoAlterarSenha, AuthController.alterarSenha);

module.exports = router;
```

## Rotas Protegidas

### Controlador de Usuários

Crie o arquivo `src/controllers/userController.js` para gerenciar operações de usuários:

```javascript
const User = require('../models/User');
const { validationResult } = require('express-validator');

class UserController {
  /**
   * Obter perfil do usuário logado
   */
  static async obterPerfil(req, res) {
    try {
      const usuario = await User.findById(req.usuario.id);
      
      if (!usuario) {
        return res.status(404).json({
          sucesso: false,
          mensagem: 'Usuário não encontrado'
        });
      }

      res.json({
        sucesso: true,
        dados: usuario
      });

    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Atualizar perfil do usuário
   */
  static async atualizarPerfil(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Dados inválidos',
          erros: errors.array()
        });
      }

      const { nome, telefone, dataNascimento, endereco } = req.body;
      const usuarioId = req.usuario.id;

      const usuario = await User.findById(usuarioId);
      if (!usuario) {
        return res.status(404).json({
          sucesso: false,
          mensagem: 'Usuário não encontrado'
        });
      }

      // Atualizar campos permitidos
      if (nome) usuario.nome = nome;
      if (telefone) usuario.telefone = telefone;
      if (dataNascimento) usuario.dataNascimento = dataNascimento;
      if (endereco) usuario.endereco = { ...usuario.endereco, ...endereco };

      await usuario.save();

      res.json({
        sucesso: true,
        mensagem: 'Perfil atualizado com sucesso',
        dados: usuario
      });

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Listar usuários (apenas admin)
   */
  static async listarUsuarios(req, res) {
    try {
      const { 
        pagina = 1, 
        limite = 10, 
        busca = '', 
        perfil = '', 
        ativo = '' 
      } = req.query;

      const skip = (pagina - 1) * limite;
      const filtros = {};

      // Aplicar filtros
      if (busca) {
        filtros.$or = [
          { nome: { $regex: busca, $options: 'i' } },
          { email: { $regex: busca, $options: 'i' } }
        ];
      }

      if (perfil) {
        filtros.perfil = perfil;
      }

      if (ativo !== '') {
        filtros.isActive = ativo === 'true';
      }

      // Buscar usuários com paginação
      const usuarios = await User.find(filtros)
        .select('-senha -tokenVerificacao -tokenResetSenha -tokenResetExpira')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limite));

      // Contar total de usuários
      const total = await User.countDocuments(filtros);

      res.json({
        sucesso: true,
        dados: {
          usuarios,
          paginacao: {
            paginaAtual: parseInt(pagina),
            totalPaginas: Math.ceil(total / limite),
            totalItens: total,
            itensPorPagina: parseInt(limite)
          }
        }
      });

    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Obter usuário por ID (admin ou próprio usuário)
   */
  static async obterUsuario(req, res) {
    try {
      const { id } = req.params;

      const usuario = await User.findById(id);
      if (!usuario) {
        return res.status(404).json({
          sucesso: false,
          mensagem: 'Usuário não encontrado'
        });
      }

      res.json({
        sucesso: true,
        dados: usuario
      });

    } catch (error) {
      console.error('Erro ao obter usuário:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Desativar conta (próprio usuário)
   */
  static async desativarConta(req, res) {
    try {
      const usuarioId = req.usuario.id;

      await User.findByIdAndUpdate(usuarioId, { isActive: false });

      res.json({
        sucesso: true,
        mensagem: 'Conta desativada com sucesso'
      });

    } catch (error) {
      console.error('Erro ao desativar conta:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }

  /**
   * Alterar status do usuário (apenas admin)
   */
  static async alterarStatusUsuario(req, res) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const usuario = await User.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
      );

      if (!usuario) {
        return res.status(404).json({
          sucesso: false,
          mensagem: 'Usuário não encontrado'
        });
      }

      res.json({
        sucesso: true,
        mensagem: `Usuário ${isActive ? 'ativado' : 'desativado'} com sucesso`,
        dados: usuario
      });

    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = UserController;
```

### Rotas de Usuários

Crie o arquivo `src/routes/users.js`:

```javascript
const express = require('express');
const { body } = require('express-validator');
const UserController = require('../controllers/userController');
const { verificarAuth, verificarPerfil, verificarProprietario } = require('../middleware/auth');
const router = express.Router();

// Validações para atualização de perfil
const validacaoAtualizarPerfil = [
  body('nome')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nome deve ter entre 2 e 50 caracteres'),
  
  body('telefone')
    .optional()
    .matches(/^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/)
    .withMessage('Telefone deve estar em formato válido'),
  
  body('dataNascimento')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Data de nascimento deve ser uma data válida')
];

// Rotas protegidas para usuários
router.get('/perfil', verificarAuth, UserController.obterPerfil);
router.put('/perfil', verificarAuth, validacaoAtualizarPerfil, UserController.atualizarPerfil);
router.delete('/conta', verificarAuth, UserController.desativarConta);

// Rotas para admin
router.get('/', verificarAuth, verificarPerfil('admin'), UserController.listarUsuarios);
router.get('/:id', verificarAuth, verificarProprietario, UserController.obterUsuario);
router.patch('/:id/status', 
  verificarAuth, 
  verificarPerfil('admin'),
  body('isActive').isBoolean().withMessage('isActive deve ser um boolean'),
  UserController.alterarStatusUsuario
);

module.exports = router;
```

## Validação de Dados

### Middleware de Validação Personalizada

Crie o arquivo `src/middleware/validation.js` para validações customizadas:

```javascript
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

/**
 * Middleware para processar erros de validação
 */
const processarErrosValidacao = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Dados inválidos',
      erros: errors.array().map(error => ({
        campo: error.path,
        valor: error.value,
        mensagem: error.msg
      }))
    });
  }
  
  next();
};

/**
 * Validação customizada para verificar se email já existe
 */
const emailUnico = body('email').custom(async (email, { req }) => {
  const usuario = await User.findOne({ email });
  
  // Se é uma atualização, permitir o mesmo email do usuário atual
  if (usuario && (!req.usuario || usuario._id.toString() !== req.usuario.id)) {
    throw new Error('Email já está em uso');
  }
  
  return true;
});

/**
 * Validação de CPF brasileiro
 */
const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
    return false;
  }
  
  const cpfArray = cpf.split('').map(el => +el);
  const rest = (count) => {
    return (cpfArray.slice(0, count-12)
      .reduce((soma, el, index) => (soma + el * (count-index)), 0) * 10) % 11 % 10;
  };
  
  return rest(10) === cpfArray[9] && rest(11) === cpfArray[10];
};

/**
 * Validações específicas para endereço brasileiro
 */
const validacaoEndereco = [
  body('endereco.cep')
    .optional()
    .matches(/^\d{5}-?\d{3}$/)
    .withMessage('CEP deve estar no formato 00000-000'),
  
  body('endereco.estado')
    .optional()
    .isLength({ min: 2, max: 2 })
    .withMessage('Estado deve ter 2 caracteres')
    .isIn([
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
      'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
      'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ])
    .withMessage('Estado deve ser uma sigla válida')
];

/**
 * Sanitização de dados de entrada
 */
const sanitizarDados = (req, res, next) => {
  // Remover espaços extras de strings
  const sanitizeString = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeString(obj[key]);
      }
    }
  };
  
  if (req.body) {
    sanitizeString(req.body);
  }
  
  next();
};

/**
 * Validação de rate limiting por IP
 */
const rateLimitValidation = (maxTentativas = 5, janelaTempo = 15 * 60 * 1000) => {
  const tentativas = new Map();
  
  return (req, res, next) => {
    const ip = req.ip;
    const agora = Date.now();
    
    if (!tentativas.has(ip)) {
      tentativas.set(ip, { count: 1, firstAttempt: agora });
      return next();
    }
    
    const dadosIP = tentativas.get(ip);
    
    // Reset se passou da janela de tempo
    if (agora - dadosIP.firstAttempt > janelaTempo) {
      tentativas.set(ip, { count: 1, firstAttempt: agora });
      return next();
    }
    
    // Incrementar tentativas
    dadosIP.count++;
    
    if (dadosIP.count > maxTentativas) {
      return res.status(429).json({
        sucesso: false,
        mensagem: 'Muitas tentativas. Tente novamente em 15 minutos.'
      });
    }
    
    next();
  };
};

module.exports = {
  processarErrosValidacao,
  emailUnico,
  validarCPF,
  validacaoEndereco,
  sanitizarDados,
  rateLimitValidation
};
```

## Tratamento de Erros

### Middleware de Tratamento de Erros

Crie o arquivo `src/middleware/errorHandler.js`:

```javascript
/**
 * Middleware global de tratamento de erros
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log do erro
  console.error('Erro capturado:', err);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      statusCode: 400,
      message: `Erro de validação: ${message}`
    };
  }

  // Erro de chave duplicada (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} já está em uso`;
    error = {
      statusCode: 409,
      message
    };
  }

  // Erro de cast do Mongoose (ID inválido)
  if (err.name === 'CastError') {
    const message = 'ID inválido';
    error = {
      statusCode: 400,
      message
    };
  }

  // Erro de JWT
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token inválido';
    error = {
      statusCode: 401,
      message
    };
  }

  // Token expirado
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expirado';
    error = {
      statusCode: 401,
      message
    };
  }

  res.status(error.statusCode || 500).json({
    sucesso: false,
    mensagem: error.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Middleware para capturar rotas não encontradas
 */
const notFound = (req, res, next) => {
  const error = new Error(`Rota não encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Wrapper para funções assíncronas
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  notFound,
  asyncHandler
};
```

## Configuração de CORS

### Configuração Avançada de CORS

Crie o arquivo `src/config/cors.js`:

```javascript
const cors = require('cors');

/**
 * Configuração de CORS para diferentes ambientes
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Lista de origens permitidas
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:8080',
      'http://localhost:8081',
      'https://meuapp.com',
      'https://www.meuapp.com'
    ];

    // Permitir requisições sem origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Verificar se a origin está na lista permitida
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true, // Permitir cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-Device-Type',
    'X-App-Version'
  ],
  exposedHeaders: [
    'X-Token-Refresh-Needed',
    'X-Rate-Limit-Remaining',
    'X-Rate-Limit-Reset'
  ]
};

/**
 * Configuração de CORS para desenvolvimento
 */
const corsDevOptions = {
  origin: true, // Permitir qualquer origin em desenvolvimento
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: '*',
  exposedHeaders: [
    'X-Token-Refresh-Needed',
    'X-Rate-Limit-Remaining',
    'X-Rate-Limit-Reset'
  ]
};

module.exports = {
  corsOptions,
  corsDevOptions
};
```

## Documentação da API

### Estrutura da Documentação

A documentação completa da API inclui todos os endpoints, parâmetros, respostas e exemplos de uso:

#### Endpoints de Autenticação

**POST /api/auth/registrar**
- Descrição: Registra um novo usuário
- Parâmetros:
  - nome (string, obrigatório): Nome completo do usuário
  - email (string, obrigatório): Email único do usuário
  - senha (string, obrigatório): Senha com pelo menos 6 caracteres
  - telefone (string, opcional): Telefone no formato brasileiro
  - dataNascimento (date, opcional): Data de nascimento
  - endereco (object, opcional): Objeto com dados do endereço

**POST /api/auth/login**
- Descrição: Realiza login do usuário
- Parâmetros:
  - email (string, obrigatório): Email do usuário
  - senha (string, obrigatório): Senha do usuário

**POST /api/auth/renovar-token**
- Descrição: Renova o token de acesso usando refresh token
- Parâmetros:
  - refreshToken (string, obrigatório): Refresh token válido

**POST /api/auth/logout**
- Descrição: Realiza logout do usuário
- Parâmetros:
  - refreshToken (string, opcional): Refresh token a ser revogado

#### Endpoints de Usuários

**GET /api/users/perfil**
- Descrição: Obtém perfil do usuário logado
- Autenticação: Obrigatória
- Headers: Authorization: Bearer {token}

**PUT /api/users/perfil**
- Descrição: Atualiza perfil do usuário logado
- Autenticação: Obrigatória
- Parâmetros: Campos atualizáveis do perfil

**GET /api/users**
- Descrição: Lista usuários (apenas admin)
- Autenticação: Obrigatória (perfil admin)
- Query Parameters:
  - pagina (number): Número da página
  - limite (number): Itens por página
  - busca (string): Termo de busca
  - perfil (string): Filtro por perfil
  - ativo (boolean): Filtro por status ativo

## Testes da API

### Configuração do Jest

Crie o arquivo `jest.config.js` na raiz do projeto:

```javascript
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/config/database.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
```

### Arquivo de Setup dos Testes

Crie o arquivo `tests/setup.js`:

```javascript
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Configurar banco de dados em memória para testes
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Limpar dados entre testes
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// Fechar conexões após todos os testes
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
```

## Deploy e Produção

### Configurações de Produção

Para deploy em produção, considere as seguintes configurações:

1. **Variáveis de Ambiente de Produção:**
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/producao
JWT_SECRET=chave_super_secreta_de_producao_com_256_bits
JWT_EXPIRE=1h
BCRYPT_ROUNDS=14
```

2. **Configurações de Segurança:**
- Use HTTPS em produção
- Configure rate limiting adequado
- Implemente logging robusto
- Configure monitoramento de erros
- Use variáveis de ambiente seguras

3. **Otimizações de Performance:**
- Configure índices adequados no MongoDB
- Implemente cache quando necessário
- Use compressão gzip
- Configure connection pooling

### Arquivo Principal do Servidor

Finalmente, crie o arquivo `src/server.js` que inicializa toda a aplicação:

```javascript
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/database');
const { corsOptions, corsDevOptions } = require('./config/cors');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { sanitizarDados } = require('./middleware/validation');

// Importar rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares de segurança
app.use(helmet());

// Configurar CORS
const corsConfig = process.env.NODE_ENV === 'production' ? corsOptions : corsDevOptions;
app.use(cors(corsConfig));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de sanitização
app.use(sanitizarDados);

// Middleware para capturar IP real
app.set('trust proxy', 1);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Middleware para rotas não encontradas
app.use(notFound);

// Middleware global de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido. Fechando servidor...');
  server.close(() => {
    console.log('Servidor fechado.');
    process.exit(0);
  });
});

module.exports = app;
```

## Referências

[1] Node.js Official Documentation - https://nodejs.org/docs/
[2] Express.js Guide - https://expressjs.com/
[3] MongoDB Manual - https://docs.mongodb.com/
[4] Mongoose Documentation - https://mongoosejs.com/docs/
[5] JWT Introduction - https://jwt.io/introduction/
[6] bcrypt Documentation - https://www.npmjs.com/package/bcryptjs
[7] Express Validator Guide - https://express-validator.github.io/docs/
[8] Helmet.js Security - https://helmetjs.github.io/
[9] CORS Documentation - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[10] Jest Testing Framework - https://jestjs.io/docs/getting-started

---

**Conclusão**

Este tutorial apresentou um guia completo para o desenvolvimento de uma API REST segura com Node.js e MongoDB. A implementação inclui todas as funcionalidades essenciais para um sistema de cadastro e autenticação de usuários robusto, seguindo as melhores práticas de segurança e desenvolvimento.

A API desenvolvida oferece uma base sólida que pode ser expandida com funcionalidades adicionais conforme as necessidades do projeto. A arquitetura modular facilita a manutenção e evolução do código, enquanto as medidas de segurança implementadas garantem a proteção dos dados dos usuários.

