# Implementação de Segurança e Criptografia

## Introdução

A segurança em aplicações web e móveis é um aspecto fundamental que deve ser considerado desde as primeiras fases do desenvolvimento. Com o aumento constante de ataques cibernéticos e vazamentos de dados, implementar medidas robustas de segurança não é apenas uma boa prática, mas uma necessidade crítica para proteger informações sensíveis dos usuários e manter a confiança no sistema.

Este documento aborda as principais técnicas e práticas de segurança que devem ser implementadas em um sistema completo de cadastro de usuários, incluindo criptografia de senhas, autenticação baseada em tokens JWT, validação de dados, proteção contra ataques comuns como SQL Injection e Cross-Site Scripting (XSS), e implementação de HTTPS para comunicação segura.

A segurança deve ser tratada como um processo contínuo e multicamadas, onde cada componente do sistema - desde o banco de dados até a interface do usuário - implementa suas próprias medidas de proteção. Esta abordagem de "defesa em profundidade" garante que mesmo se uma camada de segurança for comprometida, outras camadas continuem protegendo o sistema.

Exploraremos conceitos fundamentais como hashing de senhas com bcrypt, geração e validação de tokens JWT, sanitização de entrada de dados, implementação de rate limiting para prevenir ataques de força bruta, e configuração de cabeçalhos de segurança HTTP. Também abordaremos práticas específicas para cada plataforma, incluindo segurança em APIs Node.js, proteção de aplicações React contra XSS, e implementação de armazenamento seguro em aplicações móveis.

## Criptografia de Senhas com bcrypt

### Conceitos Fundamentais de Hashing

O armazenamento seguro de senhas é um dos aspectos mais críticos da segurança de aplicações. Nunca devemos armazenar senhas em texto plano no banco de dados, pois isso expõe todos os usuários a riscos severos em caso de vazamento de dados. Em vez disso, utilizamos funções de hash criptográficas que transformam a senha original em uma string irreversível.

bcrypt é uma função de hash de senhas baseada no algoritmo Blowfish, especificamente projetada para ser computacionalmente custosa e resistente a ataques de força bruta. Diferentemente de funções de hash simples como MD5 ou SHA-1, bcrypt incorpora um "salt" aleatório e permite configurar o "cost factor" (fator de custo), que determina quantas iterações do algoritmo são executadas.

O salt é uma string aleatória adicionada à senha antes do hashing, garantindo que mesmo senhas idênticas resultem em hashes diferentes. Isso previne ataques de rainbow table, onde atacantes usam tabelas pré-computadas de hashes comuns para descobrir senhas. O cost factor torna o processo de hashing intencionalmente lento, dificultando ataques de força bruta mesmo com hardware poderoso.

### Implementação no Backend Node.js

Primeiro, instale a biblioteca bcrypt no projeto Node.js:

```bash
npm install bcrypt
npm install --save-dev @types/bcrypt
```

Crie um módulo utilitário para gerenciar operações de hash de senha. No arquivo `utils/passwordUtils.js`:

```javascript
const bcrypt = require('bcrypt');

class PasswordUtils {
    constructor() {
        // Cost factor de 12 oferece boa segurança sem impacto excessivo na performance
        this.saltRounds = 12;
    }

    /**
     * Gera hash da senha usando bcrypt
     * @param {string} plainPassword - Senha em texto plano
     * @returns {Promise<string>} Hash da senha
     */
    async hashPassword(plainPassword) {
        try {
            if (!plainPassword || typeof plainPassword !== 'string') {
                throw new Error('Senha deve ser uma string não vazia');
            }

            if (plainPassword.length < 8) {
                throw new Error('Senha deve ter pelo menos 8 caracteres');
            }

            const hashedPassword = await bcrypt.hash(plainPassword, this.saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error('Erro ao gerar hash da senha:', error);
            throw new Error('Falha na criptografia da senha');
        }
    }

    /**
     * Verifica se a senha fornecida corresponde ao hash armazenado
     * @param {string} plainPassword - Senha em texto plano
     * @param {string} hashedPassword - Hash armazenado no banco
     * @returns {Promise<boolean>} True se a senha estiver correta
     */
    async verifyPassword(plainPassword, hashedPassword) {
        try {
            if (!plainPassword || !hashedPassword) {
                return false;
            }

            const isValid = await bcrypt.compare(plainPassword, hashedPassword);
            return isValid;
        } catch (error) {
            console.error('Erro ao verificar senha:', error);
            return false;
        }
    }

    /**
     * Verifica se o hash precisa ser atualizado (cost factor mudou)
     * @param {string} hashedPassword - Hash atual
     * @returns {boolean} True se precisa atualizar
     */
    needsRehash(hashedPassword) {
        try {
            const currentCost = bcrypt.getRounds(hashedPassword);
            return currentCost < this.saltRounds;
        } catch (error) {
            console.error('Erro ao verificar necessidade de rehash:', error);
            return true; // Em caso de erro, assumir que precisa atualizar
        }
    }

    /**
     * Gera senha temporária segura
     * @param {number} length - Comprimento da senha
     * @returns {string} Senha temporária
     */
    generateTemporaryPassword(length = 12) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        
        return password;
    }
}

module.exports = new PasswordUtils();
```

### Integração com o Sistema de Usuários

Modifique o controller de usuários para usar a criptografia de senhas. No arquivo `controllers/authController.js`:

```javascript
const User = require('../models/User');
const passwordUtils = require('../utils/passwordUtils');
const jwtUtils = require('../utils/jwtUtils');
const { validationResult } = require('express-validator');

class AuthController {
    /**
     * Registra um novo usuário
     */
    async register(req, res) {
        try {
            // Verificar erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Dados de entrada inválidos',
                    errors: errors.array()
                });
            }

            const { username, email, password, firstName, lastName } = req.body;

            // Verificar se usuário já existe
            const existingUser = await User.findByEmailOrUsername(email, username);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'Usuário já existe com este email ou username'
                });
            }

            // Criptografar senha
            const hashedPassword = await passwordUtils.hashPassword(password);

            // Criar usuário
            const userData = {
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
                isActive: true,
                emailVerified: false
            };

            const userId = await User.create(userData);
            const user = await User.findById(userId);

            // Gerar token JWT
            const token = jwtUtils.generateToken({
                userId: user.id,
                email: user.email,
                username: user.username
            });

            // Remover senha da resposta
            delete user.password;

            res.status(201).json({
                success: true,
                message: 'Usuário criado com sucesso',
                data: {
                    user,
                    token,
                    expiresIn: '24h'
                }
            });

        } catch (error) {
            console.error('Erro no registro:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    /**
     * Autentica um usuário
     */
    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Dados de entrada inválidos',
                    errors: errors.array()
                });
            }

            const { identifier, password } = req.body;

            // Buscar usuário por email ou username
            const user = await User.findByEmailOrUsername(identifier, identifier);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            // Verificar se usuário está ativo
            if (!user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Conta desativada. Entre em contato com o suporte.'
                });
            }

            // Verificar senha
            const isPasswordValid = await passwordUtils.verifyPassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

            // Verificar se hash precisa ser atualizado
            if (passwordUtils.needsRehash(user.password)) {
                const newHash = await passwordUtils.hashPassword(password);
                await User.updatePassword(user.id, newHash);
            }

            // Gerar token JWT
            const token = jwtUtils.generateToken({
                userId: user.id,
                email: user.email,
                username: user.username
            });

            // Atualizar último login
            await User.updateLastLogin(user.id);

            // Remover senha da resposta
            delete user.password;

            res.json({
                success: true,
                message: 'Login realizado com sucesso',
                data: {
                    user,
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

    /**
     * Altera senha do usuário
     */
    async changePassword(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Dados de entrada inválidos',
                    errors: errors.array()
                });
            }

            const { currentPassword, newPassword } = req.body;
            const userId = req.user.userId;

            // Buscar usuário
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            // Verificar senha atual
            const isCurrentPasswordValid = await passwordUtils.verifyPassword(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Senha atual incorreta'
                });
            }

            // Verificar se nova senha é diferente da atual
            const isSamePassword = await passwordUtils.verifyPassword(newPassword, user.password);
            if (isSamePassword) {
                return res.status(400).json({
                    success: false,
                    message: 'A nova senha deve ser diferente da senha atual'
                });
            }

            // Criptografar nova senha
            const hashedNewPassword = await passwordUtils.hashPassword(newPassword);

            // Atualizar senha no banco
            await User.updatePassword(userId, hashedNewPassword);

            res.json({
                success: true,
                message: 'Senha alterada com sucesso'
            });

        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }
}

module.exports = new AuthController();
```

## Autenticação JWT (JSON Web Tokens)

### Conceitos e Estrutura do JWT

JSON Web Tokens (JWT) é um padrão aberto (RFC 7519) que define uma forma compacta e segura de transmitir informações entre partes como um objeto JSON. JWTs são amplamente utilizados para autenticação e autorização em aplicações web e móveis devido à sua natureza stateless e capacidade de carregar informações do usuário.

Um JWT consiste em três partes separadas por pontos: Header, Payload e Signature. O Header contém metadados sobre o token, incluindo o tipo (JWT) e o algoritmo de assinatura usado. O Payload contém as claims (declarações) sobre o usuário e metadados adicionais. A Signature é criada combinando o header e payload codificados com uma chave secreta usando o algoritmo especificado no header.

A principal vantagem dos JWTs é que eles são self-contained, ou seja, contêm todas as informações necessárias sobre o usuário, eliminando a necessidade de consultar o banco de dados a cada requisição. Isso melhora significativamente a performance e escalabilidade da aplicação, especialmente em arquiteturas distribuídas.

### Implementação do Sistema JWT

Crie um módulo utilitário para gerenciar tokens JWT. No arquivo `utils/jwtUtils.js`:

```javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JWTUtils {
    constructor() {
        this.accessTokenSecret = process.env.JWT_ACCESS_SECRET || this.generateSecret();
        this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET || this.generateSecret();
        this.accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || '15m';
        this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d';
        this.issuer = process.env.JWT_ISSUER || 'cadastro-usuarios-api';
        this.audience = process.env.JWT_AUDIENCE || 'cadastro-usuarios-app';
    }

    /**
     * Gera uma chave secreta aleatória
     * @returns {string} Chave secreta
     */
    generateSecret() {
        return crypto.randomBytes(64).toString('hex');
    }

    /**
     * Gera um access token JWT
     * @param {Object} payload - Dados do usuário
     * @returns {string} Token JWT
     */
    generateAccessToken(payload) {
        try {
            const tokenPayload = {
                ...payload,
                type: 'access',
                iat: Math.floor(Date.now() / 1000),
                iss: this.issuer,
                aud: this.audience
            };

            return jwt.sign(tokenPayload, this.accessTokenSecret, {
                expiresIn: this.accessTokenExpiry,
                algorithm: 'HS256'
            });
        } catch (error) {
            console.error('Erro ao gerar access token:', error);
            throw new Error('Falha na geração do token');
        }
    }

    /**
     * Gera um refresh token JWT
     * @param {Object} payload - Dados do usuário
     * @returns {string} Refresh token
     */
    generateRefreshToken(payload) {
        try {
            const tokenPayload = {
                userId: payload.userId,
                type: 'refresh',
                iat: Math.floor(Date.now() / 1000),
                iss: this.issuer,
                aud: this.audience
            };

            return jwt.sign(tokenPayload, this.refreshTokenSecret, {
                expiresIn: this.refreshTokenExpiry,
                algorithm: 'HS256'
            });
        } catch (error) {
            console.error('Erro ao gerar refresh token:', error);
            throw new Error('Falha na geração do refresh token');
        }
    }

    /**
     * Gera par de tokens (access + refresh)
     * @param {Object} payload - Dados do usuário
     * @returns {Object} Par de tokens
     */
    generateTokenPair(payload) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
            tokenType: 'Bearer',
            expiresIn: this.accessTokenExpiry
        };
    }

    /**
     * Verifica e decodifica um access token
     * @param {string} token - Token JWT
     * @returns {Object} Payload decodificado
     */
    verifyAccessToken(token) {
        try {
            const decoded = jwt.verify(token, this.accessTokenSecret, {
                issuer: this.issuer,
                audience: this.audience,
                algorithms: ['HS256']
            });

            if (decoded.type !== 'access') {
                throw new Error('Tipo de token inválido');
            }

            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token expirado');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Token inválido');
            } else {
                throw new Error('Falha na verificação do token');
            }
        }
    }

    /**
     * Verifica e decodifica um refresh token
     * @param {string} token - Refresh token
     * @returns {Object} Payload decodificado
     */
    verifyRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, this.refreshTokenSecret, {
                issuer: this.issuer,
                audience: this.audience,
                algorithms: ['HS256']
            });

            if (decoded.type !== 'refresh') {
                throw new Error('Tipo de token inválido');
            }

            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Refresh token expirado');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Refresh token inválido');
            } else {
                throw new Error('Falha na verificação do refresh token');
            }
        }
    }

    /**
     * Extrai token do header Authorization
     * @param {string} authHeader - Header Authorization
     * @returns {string|null} Token extraído
     */
    extractTokenFromHeader(authHeader) {
        if (!authHeader) {
            return null;
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return null;
        }

        return parts[1];
    }

    /**
     * Decodifica token sem verificar assinatura (para debugging)
     * @param {string} token - Token JWT
     * @returns {Object} Payload decodificado
     */
    decodeToken(token) {
        try {
            return jwt.decode(token, { complete: true });
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return null;
        }
    }
}

module.exports = new JWTUtils();
```

### Middleware de Autenticação

Crie um middleware para verificar tokens JWT em rotas protegidas. No arquivo `middleware/authMiddleware.js`:

```javascript
const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/User');

/**
 * Middleware para verificar autenticação JWT
 */
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = jwtUtils.extractTokenFromHeader(authHeader);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token de acesso requerido'
            });
        }

        // Verificar e decodificar token
        const decoded = jwtUtils.verifyAccessToken(token);

        // Verificar se usuário ainda existe e está ativo
        const user = await User.findById(decoded.userId);
        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Usuário não encontrado ou inativo'
            });
        }

        // Adicionar informações do usuário ao request
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            username: decoded.username,
            iat: decoded.iat,
            exp: decoded.exp
        };

        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        
        let statusCode = 401;
        let message = 'Token inválido';

        if (error.message === 'Token expirado') {
            statusCode = 401;
            message = 'Token expirado';
        }

        return res.status(statusCode).json({
            success: false,
            message
        });
    }
};

/**
 * Middleware opcional de autenticação (não falha se token não existir)
 */
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = jwtUtils.extractTokenFromHeader(authHeader);

        if (token) {
            const decoded = jwtUtils.verifyAccessToken(token);
            const user = await User.findById(decoded.userId);
            
            if (user && user.isActive) {
                req.user = {
                    userId: decoded.userId,
                    email: decoded.email,
                    username: decoded.username,
                    iat: decoded.iat,
                    exp: decoded.exp
                };
            }
        }

        next();
    } catch (error) {
        // Em caso de erro, continuar sem autenticação
        next();
    }
};

/**
 * Middleware para verificar permissões específicas
 */
const requirePermission = (permission) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Autenticação requerida'
                });
            }

            // Buscar permissões do usuário
            const userPermissions = await User.getPermissions(req.user.userId);
            
            if (!userPermissions.includes(permission)) {
                return res.status(403).json({
                    success: false,
                    message: 'Permissão insuficiente'
                });
            }

            next();
        } catch (error) {
            console.error('Erro na verificação de permissão:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    };
};

module.exports = {
    authenticateToken,
    optionalAuth,
    requirePermission
};
```

### Sistema de Refresh Tokens

Implemente um sistema de refresh tokens para renovar access tokens expirados. No arquivo `controllers/tokenController.js`:

```javascript
const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

class TokenController {
    /**
     * Renova access token usando refresh token
     */
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token requerido'
                });
            }

            // Verificar refresh token
            const decoded = jwtUtils.verifyRefreshToken(refreshToken);

            // Verificar se refresh token existe no banco e não foi revogado
            const storedToken = await RefreshToken.findByToken(refreshToken);
            if (!storedToken || storedToken.isRevoked) {
                return res.status(401).json({
                    success: false,
                    message: 'Refresh token inválido ou revogado'
                });
            }

            // Verificar se usuário ainda existe e está ativo
            const user = await User.findById(decoded.userId);
            if (!user || !user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuário não encontrado ou inativo'
                });
            }

            // Gerar novo par de tokens
            const tokenPair = jwtUtils.generateTokenPair({
                userId: user.id,
                email: user.email,
                username: user.username
            });

            // Revogar refresh token antigo
            await RefreshToken.revokeToken(refreshToken);

            // Armazenar novo refresh token
            await RefreshToken.create({
                token: tokenPair.refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
            });

            res.json({
                success: true,
                message: 'Token renovado com sucesso',
                data: tokenPair
            });

        } catch (error) {
            console.error('Erro ao renovar token:', error);
            
            let message = 'Erro interno do servidor';
            if (error.message.includes('expirado')) {
                message = 'Refresh token expirado';
            } else if (error.message.includes('inválido')) {
                message = 'Refresh token inválido';
            }

            res.status(401).json({
                success: false,
                message
            });
        }
    }

    /**
     * Revoga refresh token (logout)
     */
    async revokeToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (refreshToken) {
                await RefreshToken.revokeToken(refreshToken);
            }

            res.json({
                success: true,
                message: 'Logout realizado com sucesso'
            });

        } catch (error) {
            console.error('Erro ao revogar token:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    /**
     * Revoga todos os refresh tokens do usuário
     */
    async revokeAllTokens(req, res) {
        try {
            const userId = req.user.userId;

            await RefreshToken.revokeAllUserTokens(userId);

            res.json({
                success: true,
                message: 'Todos os tokens foram revogados'
            });

        } catch (error) {
            console.error('Erro ao revogar todos os tokens:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }
}

module.exports = new TokenController();
```

## Validação e Sanitização de Dados

### Implementação com Express Validator

A validação adequada de dados de entrada é fundamental para prevenir ataques de injeção e garantir a integridade dos dados. Express Validator oferece uma API robusta para validação e sanitização de dados em aplicações Express.

Instale as dependências necessárias:

```bash
npm install express-validator
npm install validator
npm install dompurify jsdom
```

Crie validadores personalizados. No arquivo `validators/userValidators.js`:

```javascript
const { body, param, query } = require('express-validator');
const validator = require('validator');
const User = require('../models/User');

/**
 * Validações para registro de usuário
 */
const registerValidation = [
    body('firstName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Nome deve ter entre 2 e 50 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Nome deve conter apenas letras e espaços')
        .escape(),

    body('lastName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Sobrenome deve ter entre 2 e 50 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Sobrenome deve conter apenas letras e espaços')
        .escape(),

    body('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username deve ter entre 3 e 30 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username deve conter apenas letras, números e underscore')
        .custom(async (value) => {
            const existingUser = await User.findByUsername(value);
            if (existingUser) {
                throw new Error('Username já está em uso');
            }
            return true;
        }),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Email deve ter formato válido')
        .normalizeEmail()
        .custom(async (value) => {
            const existingUser = await User.findByEmail(value);
            if (existingUser) {
                throw new Error('Email já está em uso');
            }
            return true;
        }),

    body('password')
        .isLength({ min: 8, max: 128 })
        .withMessage('Senha deve ter entre 8 e 128 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial')
];

/**
 * Validações para login
 */
const loginValidation = [
    body('identifier')
        .trim()
        .notEmpty()
        .withMessage('Email ou username é obrigatório')
        .isLength({ max: 255 })
        .withMessage('Identificador muito longo'),

    body('password')
        .notEmpty()
        .withMessage('Senha é obrigatória')
        .isLength({ max: 128 })
        .withMessage('Senha muito longa')
];

/**
 * Validações para atualização de perfil
 */
const updateProfileValidation = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Nome deve ter entre 2 e 50 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Nome deve conter apenas letras e espaços')
        .escape(),

    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Sobrenome deve ter entre 2 e 50 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Sobrenome deve conter apenas letras e espaços')
        .escape(),

    body('username')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username deve ter entre 3 e 30 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username deve conter apenas letras, números e underscore')
        .custom(async (value, { req }) => {
            if (value) {
                const existingUser = await User.findByUsername(value);
                if (existingUser && existingUser.id !== req.user.userId) {
                    throw new Error('Username já está em uso');
                }
            }
            return true;
        }),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Email deve ter formato válido')
        .normalizeEmail()
        .custom(async (value, { req }) => {
            if (value) {
                const existingUser = await User.findByEmail(value);
                if (existingUser && existingUser.id !== req.user.userId) {
                    throw new Error('Email já está em uso');
                }
            }
            return true;
        })
];

/**
 * Validações para alteração de senha
 */
const changePasswordValidation = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Senha atual é obrigatória'),

    body('newPassword')
        .isLength({ min: 8, max: 128 })
        .withMessage('Nova senha deve ter entre 8 e 128 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial')
        .custom((value, { req }) => {
            if (value === req.body.currentPassword) {
                throw new Error('Nova senha deve ser diferente da senha atual');
            }
            return true;
        })
];

/**
 * Validação de parâmetros de ID
 */
const idParamValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID deve ser um número inteiro positivo')
        .toInt()
];

/**
 * Validações para paginação
 */
const paginationValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Página deve ser um número inteiro positivo')
        .toInt(),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limite deve ser um número entre 1 e 100')
        .toInt(),

    query('sort')
        .optional()
        .isIn(['id', 'username', 'email', 'firstName', 'lastName', 'createdAt'])
        .withMessage('Campo de ordenação inválido'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Ordem deve ser "asc" ou "desc"')
];

module.exports = {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation,
    idParamValidation,
    paginationValidation
};
```

### Sanitização de Conteúdo HTML

Para aplicações que permitem entrada de conteúdo HTML, implemente sanitização adequada. No arquivo `utils/sanitizer.js`:

```javascript
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

class Sanitizer {
    constructor() {
        const window = new JSDOM('').window;
        this.DOMPurify = createDOMPurify(window);
        
        // Configuração padrão para sanitização
        this.defaultConfig = {
            ALLOWED_TAGS: [
                'p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'
            ],
            ALLOWED_ATTR: ['class'],
            KEEP_CONTENT: true,
            RETURN_DOM: false,
            RETURN_DOM_FRAGMENT: false,
            RETURN_DOM_IMPORT: false
        };
    }

    /**
     * Sanitiza conteúdo HTML
     * @param {string} html - HTML a ser sanitizado
     * @param {Object} config - Configuração personalizada
     * @returns {string} HTML sanitizado
     */
    sanitizeHTML(html, config = {}) {
        if (!html || typeof html !== 'string') {
            return '';
        }

        const finalConfig = { ...this.defaultConfig, ...config };
        return this.DOMPurify.sanitize(html, finalConfig);
    }

    /**
     * Remove todas as tags HTML
     * @param {string} html - HTML a ser limpo
     * @returns {string} Texto sem tags
     */
    stripHTML(html) {
        if (!html || typeof html !== 'string') {
            return '';
        }

        return this.DOMPurify.sanitize(html, { 
            ALLOWED_TAGS: [],
            KEEP_CONTENT: true 
        });
    }

    /**
     * Sanitiza entrada de texto simples
     * @param {string} text - Texto a ser sanitizado
     * @returns {string} Texto sanitizado
     */
    sanitizeText(text) {
        if (!text || typeof text !== 'string') {
            return '';
        }

        // Remove caracteres de controle e normaliza espaços
        return text
            .replace(/[\x00-\x1F\x7F]/g, '') // Remove caracteres de controle
            .replace(/\s+/g, ' ') // Normaliza espaços
            .trim();
    }

    /**
     * Valida e sanitiza URL
     * @param {string} url - URL a ser validada
     * @returns {string|null} URL sanitizada ou null se inválida
     */
    sanitizeURL(url) {
        if (!url || typeof url !== 'string') {
            return null;
        }

        try {
            const urlObj = new URL(url);
            
            // Permitir apenas protocolos seguros
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                return null;
            }

            return urlObj.toString();
        } catch (error) {
            return null;
        }
    }

    /**
     * Sanitiza dados de objeto recursivamente
     * @param {Object} obj - Objeto a ser sanitizado
     * @returns {Object} Objeto sanitizado
     */
    sanitizeObject(obj) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        const sanitized = {};

        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                sanitized[key] = this.sanitizeText(value);
            } else if (typeof value === 'object' && value !== null) {
                sanitized[key] = this.sanitizeObject(value);
            } else {
                sanitized[key] = value;
            }
        }

        return sanitized;
    }
}

module.exports = new Sanitizer();
```

## Proteção Contra Ataques Comuns

### Prevenção de SQL Injection

SQL Injection é um dos ataques mais comuns e perigosos contra aplicações web. A melhor defesa é usar prepared statements (consultas parametrizadas) que separam código SQL dos dados de entrada.

Exemplo de implementação segura no modelo User. No arquivo `models/User.js`:

```javascript
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

class User {
    constructor() {
        this.pool = mysql.createPool(dbConfig);
    }

    /**
     * Busca usuário por email ou username de forma segura
     * @param {string} email - Email do usuário
     * @param {string} username - Username do usuário
     * @returns {Object|null} Dados do usuário
     */
    async findByEmailOrUsername(email, username) {
        try {
            const query = `
                SELECT id, username, email, password, firstName, lastName, 
                       isActive, emailVerified, createdAt, updatedAt
                FROM users 
                WHERE email = ? OR username = ?
                LIMIT 1
            `;
            
            const [rows] = await this.pool.execute(query, [email, username]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw new Error('Erro na consulta ao banco de dados');
        }
    }

    /**
     * Cria novo usuário com validação de dados
     * @param {Object} userData - Dados do usuário
     * @returns {number} ID do usuário criado
     */
    async create(userData) {
        const connection = await this.pool.getConnection();
        
        try {
            await connection.beginTransaction();

            // Validar dados antes da inserção
            this.validateUserData(userData);

            const query = `
                INSERT INTO users (username, email, password, firstName, lastName, isActive, emailVerified)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                userData.username,
                userData.email,
                userData.password,
                userData.firstName,
                userData.lastName,
                userData.isActive || true,
                userData.emailVerified || false
            ];

            const [result] = await connection.execute(query, values);

            // Log da criação do usuário
            await this.logUserAction(connection, result.insertId, 'USER_CREATED');

            await connection.commit();
            return result.insertId;

        } catch (error) {
            await connection.rollback();
            console.error('Erro ao criar usuário:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    /**
     * Atualiza dados do usuário com validação
     * @param {number} userId - ID do usuário
     * @param {Object} updateData - Dados a serem atualizados
     * @returns {boolean} Sucesso da operação
     */
    async update(userId, updateData) {
        const connection = await this.pool.getConnection();
        
        try {
            await connection.beginTransaction();

            // Construir query dinamicamente apenas com campos válidos
            const allowedFields = ['username', 'email', 'firstName', 'lastName'];
            const updateFields = [];
            const values = [];

            for (const [field, value] of Object.entries(updateData)) {
                if (allowedFields.includes(field) && value !== undefined) {
                    updateFields.push(`${field} = ?`);
                    values.push(value);
                }
            }

            if (updateFields.length === 0) {
                throw new Error('Nenhum campo válido para atualização');
            }

            // Adicionar updatedAt e userId
            updateFields.push('updatedAt = NOW()');
            values.push(userId);

            const query = `
                UPDATE users 
                SET ${updateFields.join(', ')}
                WHERE id = ? AND isActive = true
            `;

            const [result] = await connection.execute(query, values);

            if (result.affectedRows === 0) {
                throw new Error('Usuário não encontrado ou inativo');
            }

            // Log da atualização
            await this.logUserAction(connection, userId, 'USER_UPDATED', updateData);

            await connection.commit();
            return true;

        } catch (error) {
            await connection.rollback();
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    /**
     * Busca usuários com paginação e filtros seguros
     * @param {Object} filters - Filtros de busca
     * @param {Object} pagination - Configuração de paginação
     * @returns {Object} Resultado da busca
     */
    async findWithFilters(filters = {}, pagination = {}) {
        try {
            const { page = 1, limit = 10, sort = 'id', order = 'asc' } = pagination;
            const offset = (page - 1) * limit;

            // Campos permitidos para ordenação
            const allowedSortFields = ['id', 'username', 'email', 'firstName', 'lastName', 'createdAt'];
            const sortField = allowedSortFields.includes(sort) ? sort : 'id';
            const sortOrder = ['asc', 'desc'].includes(order.toLowerCase()) ? order.toUpperCase() : 'ASC';

            // Construir WHERE clause com filtros seguros
            const whereConditions = ['isActive = true'];
            const queryParams = [];

            if (filters.search) {
                whereConditions.push('(firstName LIKE ? OR lastName LIKE ? OR username LIKE ? OR email LIKE ?)');
                const searchTerm = `%${filters.search}%`;
                queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
            }

            if (filters.emailVerified !== undefined) {
                whereConditions.push('emailVerified = ?');
                queryParams.push(filters.emailVerified);
            }

            const whereClause = whereConditions.join(' AND ');

            // Query para contar total de registros
            const countQuery = `SELECT COUNT(*) as total FROM users WHERE ${whereClause}`;
            const [countResult] = await this.pool.execute(countQuery, queryParams);
            const total = countResult[0].total;

            // Query principal com paginação
            const query = `
                SELECT id, username, email, firstName, lastName, isActive, 
                       emailVerified, createdAt, updatedAt
                FROM users 
                WHERE ${whereClause}
                ORDER BY ${sortField} ${sortOrder}
                LIMIT ? OFFSET ?
            `;

            queryParams.push(limit, offset);
            const [rows] = await this.pool.execute(query, queryParams);

            return {
                users: rows,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };

        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            throw new Error('Erro na consulta ao banco de dados');
        }
    }

    /**
     * Valida dados do usuário
     * @param {Object} userData - Dados a serem validados
     */
    validateUserData(userData) {
        const required = ['username', 'email', 'password', 'firstName', 'lastName'];
        
        for (const field of required) {
            if (!userData[field] || typeof userData[field] !== 'string') {
                throw new Error(`Campo ${field} é obrigatório e deve ser uma string`);
            }
        }

        // Validações específicas
        if (userData.email.length > 255) {
            throw new Error('Email muito longo');
        }

        if (userData.username.length > 50) {
            throw new Error('Username muito longo');
        }
    }

    /**
     * Registra ação do usuário para auditoria
     * @param {Object} connection - Conexão do banco
     * @param {number} userId - ID do usuário
     * @param {string} action - Ação realizada
     * @param {Object} details - Detalhes da ação
     */
    async logUserAction(connection, userId, action, details = {}) {
        try {
            const query = `
                INSERT INTO user_audit_log (userId, action, details, createdAt)
                VALUES (?, ?, ?, NOW())
            `;

            await connection.execute(query, [
                userId,
                action,
                JSON.stringify(details)
            ]);
        } catch (error) {
            console.error('Erro ao registrar log de auditoria:', error);
            // Não propagar erro de log para não afetar operação principal
        }
    }
}

module.exports = new User();
```

### Proteção Contra XSS (Cross-Site Scripting)

XSS é um ataque onde código malicioso é injetado em páginas web visualizadas por outros usuários. Implemente proteção adequada no frontend e backend.

Para aplicações React, crie um hook personalizado para sanitização. No arquivo `hooks/useSanitizer.js`:

```javascript
import { useMemo } from 'react';
import DOMPurify from 'dompurify';

/**
 * Hook para sanitização de conteúdo HTML
 */
export const useSanitizer = () => {
    const sanitizer = useMemo(() => {
        return {
            /**
             * Sanitiza HTML mantendo tags seguras
             */
            sanitizeHTML: (html, options = {}) => {
                const defaultOptions = {
                    ALLOWED_TAGS: [
                        'p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li',
                        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'
                    ],
                    ALLOWED_ATTR: ['class'],
                    KEEP_CONTENT: true
                };

                return DOMPurify.sanitize(html, { ...defaultOptions, ...options });
            },

            /**
             * Remove todas as tags HTML
             */
            stripHTML: (html) => {
                return DOMPurify.sanitize(html, { 
                    ALLOWED_TAGS: [],
                    KEEP_CONTENT: true 
                });
            },

            /**
             * Escapa caracteres especiais para exibição segura
             */
            escapeHTML: (text) => {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
        };
    }, []);

    return sanitizer;
};

/**
 * Componente para renderizar HTML sanitizado
 */
export const SafeHTML = ({ html, className, ...props }) => {
    const { sanitizeHTML } = useSanitizer();
    
    const sanitizedHTML = useMemo(() => {
        return sanitizeHTML(html);
    }, [html, sanitizeHTML]);

    return (
        <div 
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            {...props}
        />
    );
};
```

### Rate Limiting e Proteção contra Força Bruta

Implemente rate limiting para proteger contra ataques de força bruta. No arquivo `middleware/rateLimitMiddleware.js`:

```javascript
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

// Configurar cliente Redis (opcional, para aplicações distribuídas)
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD
});

/**
 * Rate limiting geral para API
 */
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo 100 requisições por IP
    message: {
        success: false,
        message: 'Muitas requisições. Tente novamente em 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // store: new RedisStore({ client: redisClient }) // Usar Redis em produção
});

/**
 * Rate limiting rigoroso para login
 */
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo 5 tentativas de login por IP
    message: {
        success: false,
        message: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
    },
    skipSuccessfulRequests: true, // Não contar requisições bem-sucedidas
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Rate limiting para registro
 */
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 3, // Máximo 3 registros por IP por hora
    message: {
        success: false,
        message: 'Muitas tentativas de registro. Tente novamente em 1 hora.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Slow down para requisições frequentes
 */
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutos
    delayAfter: 50, // Começar a atrasar após 50 requisições
    delayMs: 500, // Atraso de 500ms por requisição adicional
    maxDelayMs: 20000 // Atraso máximo de 20 segundos
});

/**
 * Rate limiting baseado em usuário autenticado
 */
const createUserBasedLimiter = (windowMs, max) => {
    const store = new Map();

    return (req, res, next) => {
        const key = req.user ? `user:${req.user.userId}` : `ip:${req.ip}`;
        const now = Date.now();
        const windowStart = now - windowMs;

        // Limpar entradas antigas
        if (store.has(key)) {
            const requests = store.get(key).filter(time => time > windowStart);
            store.set(key, requests);
        } else {
            store.set(key, []);
        }

        const requests = store.get(key);

        if (requests.length >= max) {
            return res.status(429).json({
                success: false,
                message: 'Limite de requisições excedido'
            });
        }

        requests.push(now);
        store.set(key, requests);
        next();
    };
};

/**
 * Middleware para detectar e bloquear IPs suspeitos
 */
const suspiciousActivityDetector = (req, res, next) => {
    const suspiciousPatterns = [
        /union.*select/i,
        /script.*alert/i,
        /<script/i,
        /javascript:/i,
        /vbscript:/i,
        /onload=/i,
        /onerror=/i
    ];

    const checkSuspicious = (value) => {
        if (typeof value === 'string') {
            return suspiciousPatterns.some(pattern => pattern.test(value));
        }
        return false;
    };

    // Verificar parâmetros da query
    for (const [key, value] of Object.entries(req.query)) {
        if (checkSuspicious(value)) {
            console.warn(`Atividade suspeita detectada - Query: ${key}=${value}, IP: ${req.ip}`);
            return res.status(400).json({
                success: false,
                message: 'Requisição inválida'
            });
        }
    }

    // Verificar corpo da requisição
    if (req.body && typeof req.body === 'object') {
        const checkObject = (obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (checkSuspicious(value)) {
                    console.warn(`Atividade suspeita detectada - Body: ${key}=${value}, IP: ${req.ip}`);
                    return true;
                }
                if (typeof value === 'object' && value !== null) {
                    if (checkObject(value)) return true;
                }
            }
            return false;
        };

        if (checkObject(req.body)) {
            return res.status(400).json({
                success: false,
                message: 'Requisição inválida'
            });
        }
    }

    next();
};

module.exports = {
    generalLimiter,
    loginLimiter,
    registerLimiter,
    speedLimiter,
    createUserBasedLimiter,
    suspiciousActivityDetector
};
```

## Configuração HTTPS e Cabeçalhos de Segurança

### Implementação de HTTPS

Configure HTTPS adequadamente para proteger comunicações. No arquivo `server.js`:

```javascript
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const app = express();

// Middleware de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// CORS configurado adequadamente
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Compressão de resposta
app.use(compression());

// Middleware para forçar HTTPS em produção
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && !req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect(301, `https://${req.get('host')}${req.url}`);
    }
    next();
});

// Configuração de servidor HTTPS
const startServer = () => {
    const PORT = process.env.PORT || 3000;
    const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

    if (process.env.NODE_ENV === 'production') {
        // Configuração para produção com certificados SSL
        const privateKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH, 'utf8');
        const certificate = fs.readFileSync(process.env.SSL_CERTIFICATE_PATH, 'utf8');
        const ca = fs.readFileSync(process.env.SSL_CA_PATH, 'utf8');

        const credentials = {
            key: privateKey,
            cert: certificate,
            ca: ca
        };

        // Servidor HTTPS
        https.createServer(credentials, app).listen(HTTPS_PORT, () => {
            console.log(`Servidor HTTPS rodando na porta ${HTTPS_PORT}`);
        });

        // Servidor HTTP para redirecionamento
        http.createServer((req, res) => {
            res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
            res.end();
        }).listen(PORT, () => {
            console.log(`Servidor HTTP (redirecionamento) rodando na porta ${PORT}`);
        });

    } else {
        // Desenvolvimento com HTTP
        app.listen(PORT, () => {
            console.log(`Servidor HTTP rodando na porta ${PORT}`);
        });
    }
};

startServer();
```

### Cabeçalhos de Segurança Personalizados

Implemente cabeçalhos de segurança adicionais. No arquivo `middleware/securityHeaders.js`:

```javascript
/**
 * Middleware para adicionar cabeçalhos de segurança personalizados
 */
const securityHeaders = (req, res, next) => {
    // Prevenir clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Prevenir MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Habilitar proteção XSS do navegador
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Política de referrer
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Política de permissões
    res.setHeader('Permissions-Policy', 
        'geolocation=(), microphone=(), camera=(), payment=(), usb=()');
    
    // Remover cabeçalhos que revelam informações do servidor
    res.removeHeader('X-Powered-By');
    res.removeHeader('Server');
    
    next();
};

module.exports = securityHeaders;
```

A implementação adequada de segurança e criptografia é fundamental para proteger aplicações modernas contra ameaças cibernéticas. As técnicas apresentadas neste documento fornecem uma base sólida de proteção, mas a segurança deve ser tratada como um processo contínuo de avaliação e melhoria.

