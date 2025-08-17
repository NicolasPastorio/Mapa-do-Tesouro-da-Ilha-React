# Tutorial Completo: Segurança e Criptografia em Aplicações Web e Mobile

**Autor:** Manus AI  
**Data:** Dezembro 2024  
**Versão:** 1.0

## Sumário

1. [Introdução à Segurança](#introdução-à-segurança)
2. [Fundamentos de Criptografia](#fundamentos-de-criptografia)
3. [Criptografia de Senhas](#criptografia-de-senhas)
4. [Autenticação JWT](#autenticação-jwt)
5. [Comunicação Segura HTTPS](#comunicação-segura-https)
6. [Validação e Sanitização de Dados](#validação-e-sanitização-de-dados)
7. [Proteção contra Ataques Comuns](#proteção-contra-ataques-comuns)
8. [Segurança no Backend](#segurança-no-backend)
9. [Segurança no Frontend](#segurança-no-frontend)
10. [Segurança em Aplicações Mobile](#segurança-em-aplicações-mobile)
11. [Armazenamento Seguro de Dados](#armazenamento-seguro-de-dados)
12. [Auditoria e Monitoramento](#auditoria-e-monitoramento)
13. [Compliance e Regulamentações](#compliance-e-regulamentações)
14. [Boas Práticas de Segurança](#boas-práticas-de-segurança)
15. [Testes de Segurança](#testes-de-segurança)
16. [Referências](#referências)

---

## Introdução à Segurança

A segurança em aplicações web e mobile é um aspecto fundamental que deve ser considerado desde o início do desenvolvimento. Com o crescimento exponencial de ameaças cibernéticas e a implementação de regulamentações como a LGPD (Lei Geral de Proteção de Dados) no Brasil e o GDPR na Europa, a proteção adequada de dados pessoais e sistemas tornou-se não apenas uma necessidade técnica, mas também uma obrigação legal [1].

### Princípios Fundamentais da Segurança

A segurança da informação baseia-se em três pilares fundamentais, conhecidos como a tríade CIA (Confidentiality, Integrity, Availability):

**Confidencialidade (Confidentiality)**: Garante que as informações sejam acessíveis apenas por pessoas autorizadas. Isso inclui a proteção de dados pessoais, credenciais de acesso e informações sensíveis do negócio. A confidencialidade é implementada através de técnicas como criptografia, controle de acesso e autenticação robusta.

**Integridade (Integrity)**: Assegura que os dados não sejam alterados de forma não autorizada durante o armazenamento ou transmissão. A integridade é mantida através de checksums, assinaturas digitais e controles de versão que permitem detectar modificações não autorizadas.

**Disponibilidade (Availability)**: Garante que os sistemas e dados estejam disponíveis quando necessário pelos usuários autorizados. Isso envolve a implementação de redundância, backups, planos de recuperação de desastres e proteção contra ataques de negação de serviço (DDoS).

### Modelo de Ameaças

Para implementar segurança efetiva, é essencial compreender as possíveis ameaças que uma aplicação pode enfrentar. O modelo STRIDE, desenvolvido pela Microsoft, categoriza as ameaças em seis tipos principais:

**Spoofing (Falsificação de Identidade)**: Ataques onde um invasor se faz passar por outro usuário ou sistema. Isso pode incluir falsificação de endereços IP, cookies de sessão ou credenciais de autenticação.

**Tampering (Adulteração)**: Modificação não autorizada de dados ou código. Pode ocorrer durante a transmissão de dados ou no armazenamento, comprometendo a integridade das informações.

**Repudiation (Repúdio)**: Situações onde um usuário nega ter realizado uma ação específica. A implementação de logs de auditoria e assinaturas digitais ajuda a prevenir esse tipo de ameaça.

**Information Disclosure (Divulgação de Informações)**: Exposição não autorizada de informações confidenciais. Pode ocorrer através de vazamentos de dados, configurações inadequadas ou falhas de segurança.

**Denial of Service (Negação de Serviço)**: Ataques que visam tornar um sistema ou serviço indisponível para usuários legítimos. Podem ser realizados através de sobrecarga de recursos ou exploração de vulnerabilidades.

**Elevation of Privilege (Elevação de Privilégios)**: Situações onde um atacante obtém acesso a recursos ou funcionalidades além de suas permissões normais.

### Segurança por Camadas (Defense in Depth)

A estratégia de segurança por camadas implementa múltiplos controles de segurança em diferentes níveis da aplicação. Essa abordagem garante que, se uma camada de proteção falhar, outras camadas ainda mantenham a segurança do sistema.

As camadas típicas incluem:

1. **Camada de Rede**: Firewalls, sistemas de detecção de intrusão (IDS) e segmentação de rede
2. **Camada de Sistema Operacional**: Hardening do SO, controle de acesso e monitoramento
3. **Camada de Aplicação**: Validação de entrada, autenticação e autorização
4. **Camada de Dados**: Criptografia, backup e controle de acesso ao banco de dados
5. **Camada Física**: Controle de acesso físico aos servidores e infraestrutura

### Princípio do Menor Privilégio

Este princípio estabelece que usuários, processos e sistemas devem ter apenas os privilégios mínimos necessários para realizar suas funções. A implementação adequada deste princípio reduz significativamente a superfície de ataque e limita o impacto potencial de uma violação de segurança.

## Fundamentos de Criptografia

A criptografia é a ciência de proteger informações através da transformação de dados legíveis (texto claro) em dados ilegíveis (texto cifrado) usando algoritmos matemáticos e chaves. É uma das ferramentas mais importantes para garantir a confidencialidade e integridade dos dados em aplicações modernas [2].

### Tipos de Criptografia

**Criptografia Simétrica**: Utiliza a mesma chave para criptografar e descriptografar dados. É mais rápida que a criptografia assimétrica, mas apresenta o desafio da distribuição segura de chaves. Algoritmos comuns incluem AES (Advanced Encryption Standard), DES (Data Encryption Standard) e 3DES.

O AES é atualmente o padrão mais utilizado, oferecendo três tamanhos de chave: 128, 192 e 256 bits. O AES-256 é considerado seguro contra ataques de computação quântica no futuro próximo.

**Criptografia Assimétrica**: Utiliza um par de chaves matematicamente relacionadas - uma chave pública e uma chave privada. Dados criptografados com uma chave só podem ser descriptografados com a outra chave do par. Algoritmos populares incluem RSA, ECC (Elliptic Curve Cryptography) e DSA (Digital Signature Algorithm).

A criptografia assimétrica resolve o problema de distribuição de chaves da criptografia simétrica, mas é computacionalmente mais lenta. Por isso, é comum usar criptografia assimétrica para trocar chaves simétricas, que são então usadas para criptografar os dados reais.

**Funções Hash Criptográficas**: Produzem uma saída de tamanho fixo (hash) a partir de uma entrada de qualquer tamanho. São unidirecionais (não é possível recuperar a entrada original a partir do hash) e determinísticas (a mesma entrada sempre produz o mesmo hash). Algoritmos comuns incluem SHA-256, SHA-3 e BLAKE2.

As funções hash são fundamentais para verificação de integridade, armazenamento seguro de senhas e implementação de assinaturas digitais.

### Algoritmos de Criptografia Modernos

**AES (Advanced Encryption Standard)**: Adotado pelo governo americano em 2001, o AES é um algoritmo de criptografia simétrica que opera em blocos de 128 bits. Suporta chaves de 128, 192 e 256 bits, sendo o AES-256 o mais seguro.

```javascript
// Exemplo de implementação AES em Node.js
const crypto = require('crypto');

function encryptAES(text, key) {
    const algorithm = 'aes-256-gcm';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(algorithm, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
        encrypted,
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex')
    };
}

function decryptAES(encryptedData, key) {
    const algorithm = 'aes-256-gcm';
    const decipher = crypto.createDecipher(algorithm, key, Buffer.from(encryptedData.iv, 'hex'));
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}
```

**RSA (Rivest-Shamir-Adleman)**: Algoritmo de criptografia assimétrica amplamente utilizado para troca segura de chaves e assinaturas digitais. A segurança do RSA baseia-se na dificuldade de fatorar números primos grandes.

```javascript
// Exemplo de geração de chaves RSA
const crypto = require('crypto');

function generateRSAKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    
    return { publicKey, privateKey };
}

function encryptRSA(text, publicKey) {
    const buffer = Buffer.from(text, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
}

function decryptRSA(encryptedText, privateKey) {
    const buffer = Buffer.from(encryptedText, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
}
```

### Modos de Operação

Os algoritmos de criptografia de bloco como o AES podem operar em diferentes modos, cada um com características específicas de segurança e performance:

**ECB (Electronic Codebook)**: O modo mais simples, onde cada bloco é criptografado independentemente. Não é recomendado para dados que podem conter padrões, pois blocos idênticos produzem saídas idênticas.

**CBC (Cipher Block Chaining)**: Cada bloco é combinado com o bloco anterior antes da criptografia, usando um vetor de inicialização (IV) para o primeiro bloco. Oferece melhor segurança que o ECB.

**GCM (Galois/Counter Mode)**: Combina criptografia com autenticação, fornecendo tanto confidencialidade quanto integridade. É amplamente recomendado para aplicações modernas.

**CTR (Counter Mode)**: Transforma um algoritmo de bloco em um algoritmo de fluxo, permitindo paralelização e acesso aleatório aos dados criptografados.

### Gerenciamento de Chaves

O gerenciamento adequado de chaves criptográficas é crucial para a segurança de qualquer sistema. Inclui a geração, distribuição, armazenamento, rotação e destruição segura de chaves.

**Geração de Chaves**: Deve usar geradores de números aleatórios criptograficamente seguros (CSPRNG). Chaves fracas ou previsíveis comprometem toda a segurança do sistema.

**Armazenamento de Chaves**: Chaves devem ser armazenadas de forma segura, preferencialmente em hardware security modules (HSMs) ou key management services (KMS) em nuvem.

**Rotação de Chaves**: Chaves devem ser rotacionadas regularmente para limitar o impacto de uma possível compromissão. A frequência de rotação depende do nível de segurança requerido e do volume de dados processados.

## Criptografia de Senhas

O armazenamento seguro de senhas é um dos aspectos mais críticos da segurança em aplicações. Nunca devemos armazenar senhas em texto claro no banco de dados. Em vez disso, utilizamos funções de hash especializadas para senhas, que são projetadas para serem computacionalmente caras e resistentes a ataques [3].

### Problemas com Hashes Simples

Usar funções hash simples como MD5 ou SHA-1 para senhas apresenta várias vulnerabilidades:

**Velocidade**: Essas funções são projetadas para serem rápidas, permitindo que atacantes testem milhões de senhas por segundo em ataques de força bruta.

**Rainbow Tables**: Tabelas pré-computadas de hashes para senhas comuns podem ser usadas para reverter hashes rapidamente.

**Ausência de Salt**: Sem um salt único para cada senha, senhas idênticas produzem hashes idênticos, facilitando ataques.

### Bcrypt: O Padrão Atual

O bcrypt é uma função de hash de senha baseada no algoritmo Blowfish, projetada especificamente para ser lenta e resistente a ataques. Incorpora automaticamente um salt aleatório e permite ajustar o "custo" computacional [4].

```javascript
// Implementação completa do bcrypt em Node.js
const bcrypt = require('bcrypt');

class PasswordManager {
    constructor() {
        // Número de rounds de salt (custo computacional)
        // Cada incremento dobra o tempo de processamento
        this.saltRounds = 12;
    }

    async hashPassword(plainPassword) {
        try {
            // Validar força da senha antes de fazer hash
            this.validatePasswordStrength(plainPassword);
            
            // Gerar salt e hash da senha
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hashedPassword = await bcrypt.hash(plainPassword, salt);
            
            return hashedPassword;
        } catch (error) {
            throw new Error(`Erro ao criptografar senha: ${error.message}`);
        }
    }

    async verifyPassword(plainPassword, hashedPassword) {
        try {
            const isValid = await bcrypt.compare(plainPassword, hashedPassword);
            return isValid;
        } catch (error) {
            throw new Error(`Erro ao verificar senha: ${error.message}`);
        }
    }

    validatePasswordStrength(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const errors = [];

        if (password.length < minLength) {
            errors.push(`Senha deve ter pelo menos ${minLength} caracteres`);
        }

        if (!hasUpperCase) {
            errors.push('Senha deve conter pelo menos uma letra maiúscula');
        }

        if (!hasLowerCase) {
            errors.push('Senha deve conter pelo menos uma letra minúscula');
        }

        if (!hasNumbers) {
            errors.push('Senha deve conter pelo menos um número');
        }

        if (!hasSpecialChar) {
            errors.push('Senha deve conter pelo menos um caractere especial');
        }

        // Verificar senhas comuns
        const commonPasswords = [
            '123456', 'password', '123456789', '12345678',
            'qwerty', '123123', '1234567', 'password123'
        ];

        if (commonPasswords.includes(password.toLowerCase())) {
            errors.push('Senha muito comum, escolha uma senha mais segura');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        return true;
    }

    // Método para verificar se o hash precisa ser atualizado
    needsRehash(hashedPassword) {
        try {
            // Extrair o custo atual do hash
            const currentCost = bcrypt.getRounds(hashedPassword);
            return currentCost < this.saltRounds;
        } catch (error) {
            // Se não conseguir extrair o custo, assumir que precisa atualizar
            return true;
        }
    }

    // Gerar senha temporária segura
    generateTemporaryPassword(length = 12) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        
        // Garantir pelo menos um caractere de cada tipo
        password += this.getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        password += this.getRandomChar('abcdefghijklmnopqrstuvwxyz');
        password += this.getRandomChar('0123456789');
        password += this.getRandomChar('!@#$%^&*');
        
        // Preencher o resto aleatoriamente
        for (let i = 4; i < length; i++) {
            password += this.getRandomChar(charset);
        }
        
        // Embaralhar a senha
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    getRandomChar(charset) {
        const crypto = require('crypto');
        const randomIndex = crypto.randomInt(0, charset.length);
        return charset[randomIndex];
    }
}

// Exemplo de uso
const passwordManager = new PasswordManager();

async function demonstratePasswordHashing() {
    try {
        const plainPassword = 'MinhaSenh@Segura123';
        
        // Hash da senha
        console.log('Fazendo hash da senha...');
        const hashedPassword = await passwordManager.hashPassword(plainPassword);
        console.log('Hash gerado:', hashedPassword);
        
        // Verificar senha
        console.log('Verificando senha...');
        const isValid = await passwordManager.verifyPassword(plainPassword, hashedPassword);
        console.log('Senha válida:', isValid);
        
        // Verificar senha incorreta
        const isInvalid = await passwordManager.verifyPassword('senhaErrada', hashedPassword);
        console.log('Senha inválida:', isInvalid);
        
        // Verificar se precisa rehash
        const needsUpdate = passwordManager.needsRehash(hashedPassword);
        console.log('Precisa atualizar hash:', needsUpdate);
        
    } catch (error) {
        console.error('Erro:', error.message);
    }
}
```

### Argon2: A Nova Geração

O Argon2 é o vencedor da Password Hashing Competition de 2015 e representa o estado da arte em hashing de senhas. Oferece três variantes: Argon2d, Argon2i e Argon2id, sendo o Argon2id recomendado para a maioria dos casos [5].

```javascript
// Implementação com Argon2
const argon2 = require('argon2');

class Argon2PasswordManager {
    constructor() {
        this.options = {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 64 MB
            timeCost: 3,         // 3 iterações
            parallelism: 1,      // 1 thread
        };
    }

    async hashPassword(plainPassword) {
        try {
            const hashedPassword = await argon2.hash(plainPassword, this.options);
            return hashedPassword;
        } catch (error) {
            throw new Error(`Erro ao criptografar senha: ${error.message}`);
        }
    }

    async verifyPassword(plainPassword, hashedPassword) {
        try {
            const isValid = await argon2.verify(hashedPassword, plainPassword);
            return isValid;
        } catch (error) {
            throw new Error(`Erro ao verificar senha: ${error.message}`);
        }
    }

    async needsRehash(hashedPassword) {
        try {
            return await argon2.needsRehash(hashedPassword, this.options);
        } catch (error) {
            return true;
        }
    }
}
```

### Implementação no Modelo de Usuário

```javascript
// Modelo de usuário com criptografia de senha
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
        minlength: 8
    },
    senhaAlteradaEm: {
        type: Date,
        default: Date.now
    },
    tentativasLogin: {
        type: Number,
        default: 0
    },
    bloqueadoAte: {
        type: Date
    },
    ultimoLogin: {
        type: Date
    }
}, {
    timestamps: true
});

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function(next) {
    // Só fazer hash se a senha foi modificada
    if (!this.isModified('senha')) return next();
    
    try {
        // Validar força da senha
        validatePasswordStrength(this.senha);
        
        // Gerar salt e hash
        const salt = await bcrypt.genSalt(12);
        this.senha = await bcrypt.hash(this.senha, salt);
        
        // Atualizar timestamp de alteração
        this.senhaAlteradaEm = new Date();
        
        next();
    } catch (error) {
        next(error);
    }
});

// Método para verificar senha
userSchema.methods.verificarSenha = async function(senhaCandidata) {
    return await bcrypt.compare(senhaCandidata, this.senha);
};

// Método para verificar se a senha foi alterada após o JWT ser emitido
userSchema.methods.senhaAlteradaApos = function(JWTTimestamp) {
    if (this.senhaAlteradaEm) {
        const senhaTimestamp = parseInt(this.senhaAlteradaEm.getTime() / 1000, 10);
        return JWTTimestamp < senhaTimestamp;
    }
    return false;
};

// Método para incrementar tentativas de login
userSchema.methods.incrementarTentativasLogin = async function() {
    // Se já passou do tempo de bloqueio, resetar contador
    if (this.bloqueadoAte && this.bloqueadoAte < Date.now()) {
        return await this.updateOne({
            $unset: { bloqueadoAte: 1, tentativasLogin: 1 }
        });
    }
    
    const updates = { $inc: { tentativasLogin: 1 } };
    
    // Se atingiu o limite de tentativas, bloquear conta
    if (this.tentativasLogin + 1 >= 5 && !this.bloqueadoAte) {
        updates.$set = {
            bloqueadoAte: Date.now() + 2 * 60 * 60 * 1000 // 2 horas
        };
    }
    
    return await this.updateOne(updates);
};

// Método para resetar tentativas de login após sucesso
userSchema.methods.resetarTentativasLogin = async function() {
    return await this.updateOne({
        $unset: { tentativasLogin: 1, bloqueadoAte: 1 },
        $set: { ultimoLogin: new Date() }
    });
};

function validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        throw new Error('Senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais');
    }
}

module.exports = mongoose.model('User', userSchema);
```

### Política de Senhas Avançada

```javascript
// Sistema avançado de política de senhas
class PasswordPolicy {
    constructor(options = {}) {
        this.minLength = options.minLength || 8;
        this.maxLength = options.maxLength || 128;
        this.requireUppercase = options.requireUppercase !== false;
        this.requireLowercase = options.requireLowercase !== false;
        this.requireNumbers = options.requireNumbers !== false;
        this.requireSpecialChars = options.requireSpecialChars !== false;
        this.preventCommonPasswords = options.preventCommonPasswords !== false;
        this.preventPersonalInfo = options.preventPersonalInfo !== false;
        this.historySize = options.historySize || 5;
        this.maxAge = options.maxAge || 90; // dias
    }

    validate(password, userInfo = {}) {
        const errors = [];
        
        // Verificar comprimento
        if (password.length < this.minLength) {
            errors.push(`Senha deve ter pelo menos ${this.minLength} caracteres`);
        }
        
        if (password.length > this.maxLength) {
            errors.push(`Senha deve ter no máximo ${this.maxLength} caracteres`);
        }
        
        // Verificar complexidade
        if (this.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Senha deve conter pelo menos uma letra maiúscula');
        }
        
        if (this.requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Senha deve conter pelo menos uma letra minúscula');
        }
        
        if (this.requireNumbers && !/\d/.test(password)) {
            errors.push('Senha deve conter pelo menos um número');
        }
        
        if (this.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Senha deve conter pelo menos um caractere especial');
        }
        
        // Verificar senhas comuns
        if (this.preventCommonPasswords && this.isCommonPassword(password)) {
            errors.push('Senha muito comum, escolha uma senha mais segura');
        }
        
        // Verificar informações pessoais
        if (this.preventPersonalInfo && this.containsPersonalInfo(password, userInfo)) {
            errors.push('Senha não deve conter informações pessoais');
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            strength: this.calculateStrength(password)
        };
    }

    isCommonPassword(password) {
        const commonPasswords = [
            '123456', 'password', '123456789', '12345678', 'qwerty',
            '123123', '1234567', 'password123', 'admin', 'letmein',
            'welcome', 'monkey', '1234567890', 'abc123', '111111'
        ];
        
        return commonPasswords.includes(password.toLowerCase());
    }

    containsPersonalInfo(password, userInfo) {
        const lowerPassword = password.toLowerCase();
        
        if (userInfo.nome) {
            const nameParts = userInfo.nome.toLowerCase().split(' ');
            for (const part of nameParts) {
                if (part.length > 2 && lowerPassword.includes(part)) {
                    return true;
                }
            }
        }
        
        if (userInfo.email) {
            const emailPart = userInfo.email.split('@')[0].toLowerCase();
            if (lowerPassword.includes(emailPart)) {
                return true;
            }
        }
        
        if (userInfo.dataNascimento) {
            const birthYear = new Date(userInfo.dataNascimento).getFullYear().toString();
            if (lowerPassword.includes(birthYear)) {
                return true;
            }
        }
        
        return false;
    }

    calculateStrength(password) {
        let score = 0;
        
        // Comprimento
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        
        // Complexidade
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
        
        // Diversidade de caracteres
        const uniqueChars = new Set(password).size;
        if (uniqueChars >= password.length * 0.7) score += 1;
        
        // Padrões
        if (!/(.)\1{2,}/.test(password)) score += 1; // Sem repetições
        if (!/123|abc|qwe/i.test(password)) score += 1; // Sem sequências
        
        if (score <= 3) return 'fraca';
        if (score <= 6) return 'média';
        if (score <= 8) return 'forte';
        return 'muito forte';
    }
}
```

## Autenticação JWT

JSON Web Tokens (JWT) são um padrão aberto (RFC 7519) para transmitir informações de forma segura entre partes como um objeto JSON. Os JWTs são amplamente utilizados para autenticação e autorização em aplicações web modernas devido à sua natureza stateless e capacidade de carregar informações do usuário [6].

### Estrutura do JWT

Um JWT consiste em três partes separadas por pontos (.):

**Header**: Contém metadados sobre o token, incluindo o tipo (JWT) e o algoritmo de assinatura usado.

**Payload**: Contém as claims (declarações) sobre o usuário e metadados adicionais. Existem três tipos de claims:
- Registered claims: Predefinidas pelo padrão (iss, exp, sub, aud, etc.)
- Public claims: Definidas publicamente e registradas
- Private claims: Customizadas para uso específico da aplicação

**Signature**: Garante que o token não foi alterado. É criada usando o header codificado, payload codificado, uma chave secreta e o algoritmo especificado no header.

### Implementação Segura de JWT

```javascript
// Implementação completa e segura de JWT
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');

class JWTManager {
    constructor() {
        // Chaves diferentes para diferentes tipos de token
        this.accessTokenSecret = process.env.JWT_ACCESS_SECRET || this.generateSecureSecret();
        this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET || this.generateSecureSecret();
        
        // Configurações de expiração
        this.accessTokenExpiry = '15m';
        this.refreshTokenExpiry = '7d';
        
        // Algoritmo de assinatura
        this.algorithm = 'HS256';
        
        // Lista de tokens revogados (em produção, usar Redis ou banco de dados)
        this.revokedTokens = new Set();
    }

    generateSecureSecret() {
        return crypto.randomBytes(64).toString('hex');
    }

    generateTokenPair(payload) {
        try {
            // Payload base com informações de segurança
            const basePayload = {
                ...payload,
                iat: Math.floor(Date.now() / 1000),
                jti: crypto.randomUUID(), // JWT ID único
                tokenType: 'access'
            };

            // Access Token
            const accessToken = jwt.sign(
                basePayload,
                this.accessTokenSecret,
                {
                    expiresIn: this.accessTokenExpiry,
                    algorithm: this.algorithm,
                    issuer: 'usuarios-app',
                    audience: 'usuarios-app-client'
                }
            );

            // Refresh Token
            const refreshTokenPayload = {
                userId: payload.userId,
                tokenType: 'refresh',
                jti: crypto.randomUUID()
            };

            const refreshToken = jwt.sign(
                refreshTokenPayload,
                this.refreshTokenSecret,
                {
                    expiresIn: this.refreshTokenExpiry,
                    algorithm: this.algorithm,
                    issuer: 'usuarios-app',
                    audience: 'usuarios-app-client'
                }
            );

            return {
                accessToken,
                refreshToken,
                expiresIn: this.accessTokenExpiry
            };
        } catch (error) {
            throw new Error(`Erro ao gerar tokens: ${error.message}`);
        }
    }

    async verifyAccessToken(token) {
        try {
            // Verificar se o token foi revogado
            if (this.revokedTokens.has(token)) {
                throw new Error('Token foi revogado');
            }

            const decoded = jwt.verify(token, this.accessTokenSecret, {
                algorithms: [this.algorithm],
                issuer: 'usuarios-app',
                audience: 'usuarios-app-client'
            });

            // Verificar tipo do token
            if (decoded.tokenType !== 'access') {
                throw new Error('Tipo de token inválido');
            }

            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token expirado');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Token inválido');
            } else {
                throw error;
            }
        }
    }

    async verifyRefreshToken(token) {
        try {
            if (this.revokedTokens.has(token)) {
                throw new Error('Refresh token foi revogado');
            }

            const decoded = jwt.verify(token, this.refreshTokenSecret, {
                algorithms: [this.algorithm],
                issuer: 'usuarios-app',
                audience: 'usuarios-app-client'
            });

            if (decoded.tokenType !== 'refresh') {
                throw new Error('Tipo de token inválido');
            }

            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Refresh token expirado');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Refresh token inválido');
            } else {
                throw error;
            }
        }
    }

    revokeToken(token) {
        this.revokedTokens.add(token);
    }

    revokeAllUserTokens(userId) {
        // Em produção, implementar lógica para revogar todos os tokens de um usuário
        // Pode ser feito através de um timestamp no banco de dados
        console.log(`Revogando todos os tokens do usuário ${userId}`);
    }

    // Decodificar token sem verificar assinatura (para debug)
    decodeToken(token) {
        return jwt.decode(token, { complete: true });
    }

    // Verificar se o token expira em breve
    isTokenExpiringSoon(token, thresholdMinutes = 5) {
        try {
            const decoded = jwt.decode(token);
            if (!decoded || !decoded.exp) return false;

            const expirationTime = decoded.exp * 1000;
            const currentTime = Date.now();
            const thresholdTime = thresholdMinutes * 60 * 1000;

            return (expirationTime - currentTime) < thresholdTime;
        } catch (error) {
            return false;
        }
    }
}

// Middleware de autenticação para Express
function createAuthMiddleware(jwtManager) {
    return async (req, res, next) => {
        try {
            // Extrair token do header Authorization
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: 'Token de acesso não fornecido'
                });
            }

            const token = authHeader.substring(7);

            // Verificar token
            const decoded = await jwtManager.verifyAccessToken(token);

            // Adicionar informações do usuário à requisição
            req.user = {
                id: decoded.userId,
                email: decoded.email,
                perfil: decoded.perfil
            };

            // Verificar se o token expira em breve e adicionar header
            if (jwtManager.isTokenExpiringSoon(token)) {
                res.set('X-Token-Refresh-Needed', 'true');
            }

            next();
        } catch (error) {
            return res.status(401).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    };
}

// Middleware de autorização baseado em perfis
function createAuthorizationMiddleware(allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Usuário não autenticado'
            });
        }

        if (!allowedRoles.includes(req.user.perfil)) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Acesso negado: privilégios insuficientes'
            });
        }

        next();
    };
}

// Exemplo de uso
const jwtManager = new JWTManager();

// Rota de login
app.post('/auth/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        // Validar credenciais (implementação omitida)
        const user = await validateUserCredentials(email, senha);
        
        if (!user) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Credenciais inválidas'
            });
        }

        // Gerar tokens
        const tokens = jwtManager.generateTokenPair({
            userId: user._id,
            email: user.email,
            perfil: user.perfil
        });

        res.json({
            sucesso: true,
            mensagem: 'Login realizado com sucesso',
            dados: {
                usuario: {
                    id: user._id,
                    nome: user.nome,
                    email: user.email,
                    perfil: user.perfil
                },
                ...tokens
            }
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno do servidor'
        });
    }
});

// Rota de renovação de token
app.post('/auth/renovar-token', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Refresh token não fornecido'
            });
        }

        // Verificar refresh token
        const decoded = await jwtManager.verifyRefreshToken(refreshToken);
        
        // Buscar usuário atualizado
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Usuário não encontrado'
            });
        }

        // Gerar novos tokens
        const tokens = jwtManager.generateTokenPair({
            userId: user._id,
            email: user.email,
            perfil: user.perfil
        });

        // Revogar refresh token antigo
        jwtManager.revokeToken(refreshToken);

        res.json({
            sucesso: true,
            mensagem: 'Token renovado com sucesso',
            dados: tokens
        });
    } catch (error) {
        res.status(401).json({
            sucesso: false,
            mensagem: error.message
        });
    }
});

// Aplicar middlewares
const authMiddleware = createAuthMiddleware(jwtManager);
const adminOnly = createAuthorizationMiddleware(['admin']);
const userOrAdmin = createAuthorizationMiddleware(['usuario', 'admin']);

// Rotas protegidas
app.get('/users/perfil', authMiddleware, userOrAdmin, getUserProfile);
app.get('/admin/usuarios', authMiddleware, adminOnly, getAllUsers);
```


### Boas Práticas para JWT

**Armazenamento Seguro**: Nunca armazenar JWTs em localStorage devido ao risco de XSS. Preferir httpOnly cookies ou armazenamento seguro em aplicações mobile.

**Tempo de Expiração Curto**: Access tokens devem ter vida útil curta (15-30 minutos) para limitar o impacto de um token comprometido.

**Rotação de Chaves**: Implementar rotação regular das chaves de assinatura para melhorar a segurança.

**Claims Mínimas**: Incluir apenas informações essenciais no payload para reduzir o tamanho do token e exposição de dados.

## Comunicação Segura HTTPS

HTTPS (HTTP Secure) é essencial para proteger dados em trânsito entre clientes e servidores. Utiliza TLS (Transport Layer Security) para criptografar a comunicação e verificar a identidade do servidor [7].

### Configuração de HTTPS

```javascript
// Configuração HTTPS com Express.js
const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

class SecureServer {
    constructor() {
        this.app = express();
        this.setupSecurityMiddleware();
        this.setupSSL();
    }

    setupSecurityMiddleware() {
        // Helmet para headers de segurança
        this.app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'"],
                    fontSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'none'"],
                },
            },
            crossOriginEmbedderPolicy: false,
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true
            }
        }));

        // Rate limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 100, // máximo 100 requests por IP
            message: {
                sucesso: false,
                mensagem: 'Muitas tentativas, tente novamente em 15 minutos'
            },
            standardHeaders: true,
            legacyHeaders: false,
        });

        this.app.use('/api/', limiter);

        // Rate limiting específico para login
        const loginLimiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 5, // máximo 5 tentativas de login por IP
            skipSuccessfulRequests: true,
            message: {
                sucesso: false,
                mensagem: 'Muitas tentativas de login, tente novamente em 15 minutos'
            }
        });

        this.app.use('/api/auth/login', loginLimiter);

        // CORS configurado de forma segura
        this.app.use((req, res, next) => {
            const allowedOrigins = [
                'https://meudominio.com',
                'https://app.meudominio.com'
            ];
            
            const origin = req.headers.origin;
            if (allowedOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Max-Age', '86400');
            
            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            } else {
                next();
            }
        });

        // Middleware para forçar HTTPS
        this.app.use((req, res, next) => {
            if (req.header('x-forwarded-proto') !== 'https') {
                res.redirect(`https://${req.header('host')}${req.url}`);
            } else {
                next();
            }
        });

        // Middleware para logging de segurança
        this.app.use((req, res, next) => {
            const securityLog = {
                timestamp: new Date().toISOString(),
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                method: req.method,
                url: req.url,
                headers: req.headers
            };
            
            // Log suspeito de atividades maliciosas
            if (this.detectSuspiciousActivity(req)) {
                console.warn('Atividade suspeita detectada:', securityLog);
            }
            
            next();
        });
    }

    detectSuspiciousActivity(req) {
        const suspiciousPatterns = [
            /\.\./,  // Path traversal
            /<script/i,  // XSS
            /union.*select/i,  // SQL injection
            /javascript:/i,  // JavaScript injection
            /vbscript:/i,  // VBScript injection
        ];

        const testString = `${req.url} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`;
        
        return suspiciousPatterns.some(pattern => pattern.test(testString));
    }

    setupSSL() {
        try {
            // Certificados SSL (em produção, usar Let's Encrypt ou certificado válido)
            this.sslOptions = {
                key: fs.readFileSync('path/to/private-key.pem'),
                cert: fs.readFileSync('path/to/certificate.pem'),
                ca: fs.readFileSync('path/to/ca-certificate.pem'), // Se necessário
                
                // Configurações de segurança TLS
                secureProtocol: 'TLSv1_2_method',
                ciphers: [
                    'ECDHE-RSA-AES128-GCM-SHA256',
                    'ECDHE-RSA-AES256-GCM-SHA384',
                    'ECDHE-RSA-AES128-SHA256',
                    'ECDHE-RSA-AES256-SHA384'
                ].join(':'),
                honorCipherOrder: true
            };
        } catch (error) {
            console.error('Erro ao carregar certificados SSL:', error);
            // Em desenvolvimento, usar certificados auto-assinados
            this.generateSelfSignedCertificate();
        }
    }

    generateSelfSignedCertificate() {
        // Para desenvolvimento apenas - NUNCA usar em produção
        const selfsigned = require('selfsigned');
        const attrs = [{ name: 'commonName', value: 'localhost' }];
        const pems = selfsigned.generate(attrs, { days: 365 });
        
        this.sslOptions = {
            key: pems.private,
            cert: pems.cert
        };
        
        console.warn('Usando certificado auto-assinado para desenvolvimento');
    }

    start(port = 443) {
        // Servidor HTTPS
        https.createServer(this.sslOptions, this.app).listen(port, () => {
            console.log(`Servidor HTTPS rodando na porta ${port}`);
        });

        // Redirecionar HTTP para HTTPS
        const httpApp = express();
        httpApp.use((req, res) => {
            res.redirect(301, `https://${req.headers.host}${req.url}`);
        });
        
        httpApp.listen(80, () => {
            console.log('Redirecionamento HTTP->HTTPS ativo na porta 80');
        });
    }
}

// Configuração para Let's Encrypt (produção)
const setupLetsEncrypt = () => {
    const greenlock = require('greenlock-express');
    
    return greenlock.init({
        packageRoot: __dirname,
        configDir: './greenlock.d',
        maintainerEmail: 'admin@meudominio.com',
        cluster: false
    }).serve(app);
};
```

### Configuração de Proxy Reverso (Nginx)

```nginx
# Configuração Nginx para HTTPS
server {
    listen 80;
    server_name meudominio.com www.meudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name meudominio.com www.meudominio.com;

    # Certificados SSL
    ssl_certificate /path/to/certificate.pem;
    ssl_certificate_key /path/to/private-key.pem;

    # Configurações SSL modernas
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Headers de segurança
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # CSP
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';" always;

    # Proxy para aplicação Node.js
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Servir arquivos estáticos
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
        
        # Cache para arquivos estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    location /api/ {
        limit_req zone=api burst=20 nodelay;
    }

    location /api/auth/login {
        limit_req zone=login burst=3 nodelay;
    }
}
```

## Validação e Sanitização de Dados

A validação e sanitização adequada de dados de entrada é crucial para prevenir diversos tipos de ataques, incluindo injeção SQL, XSS e outras vulnerabilidades [8].

### Sistema de Validação Robusto

```javascript
// Sistema completo de validação e sanitização
const validator = require('validator');
const xss = require('xss');
const mongoSanitize = require('express-mongo-sanitize');

class DataValidator {
    constructor() {
        this.rules = new Map();
        this.setupDefaultRules();
    }

    setupDefaultRules() {
        // Regras de validação padrão
        this.rules.set('email', {
            validate: (value) => validator.isEmail(value),
            sanitize: (value) => validator.normalizeEmail(value),
            message: 'Email deve ser válido'
        });

        this.rules.set('password', {
            validate: (value) => {
                return value.length >= 8 &&
                       /[A-Z]/.test(value) &&
                       /[a-z]/.test(value) &&
                       /\d/.test(value) &&
                       /[!@#$%^&*(),.?":{}|<>]/.test(value);
            },
            sanitize: (value) => value.trim(),
            message: 'Senha deve ter pelo menos 8 caracteres com maiúsculas, minúsculas, números e símbolos'
        });

        this.rules.set('name', {
            validate: (value) => {
                return value.length >= 2 && 
                       value.length <= 100 &&
                       /^[a-zA-ZÀ-ÿ\s]+$/.test(value);
            },
            sanitize: (value) => {
                return xss(value.trim().replace(/\s+/g, ' '));
            },
            message: 'Nome deve ter entre 2 e 100 caracteres e conter apenas letras'
        });

        this.rules.set('phone', {
            validate: (value) => {
                return validator.isMobilePhone(value, 'pt-BR');
            },
            sanitize: (value) => {
                return value.replace(/\D/g, '');
            },
            message: 'Telefone deve estar em formato válido'
        });

        this.rules.set('url', {
            validate: (value) => validator.isURL(value, {
                protocols: ['http', 'https'],
                require_protocol: true
            }),
            sanitize: (value) => validator.escape(value),
            message: 'URL deve ser válida'
        });

        this.rules.set('mongoId', {
            validate: (value) => validator.isMongoId(value),
            sanitize: (value) => value.trim(),
            message: 'ID deve ser um ObjectId válido do MongoDB'
        });

        this.rules.set('date', {
            validate: (value) => validator.isISO8601(value),
            sanitize: (value) => new Date(value).toISOString(),
            message: 'Data deve estar em formato ISO 8601'
        });

        this.rules.set('numeric', {
            validate: (value) => validator.isNumeric(value.toString()),
            sanitize: (value) => parseFloat(value),
            message: 'Valor deve ser numérico'
        });

        this.rules.set('alphanumeric', {
            validate: (value) => validator.isAlphanumeric(value, 'pt-BR'),
            sanitize: (value) => xss(value.trim()),
            message: 'Valor deve conter apenas letras e números'
        });
    }

    addRule(name, rule) {
        this.rules.set(name, rule);
    }

    validate(data, schema) {
        const errors = [];
        const sanitizedData = {};

        for (const [field, rules] of Object.entries(schema)) {
            const value = data[field];

            // Verificar se campo é obrigatório
            if (rules.required && (value === undefined || value === null || value === '')) {
                errors.push({
                    campo: field,
                    valor: value,
                    mensagem: `${field} é obrigatório`
                });
                continue;
            }

            // Se campo não é obrigatório e está vazio, pular validação
            if (!rules.required && (value === undefined || value === null || value === '')) {
                continue;
            }

            // Aplicar regras de validação
            for (const ruleName of rules.rules || []) {
                const rule = this.rules.get(ruleName);
                if (!rule) {
                    console.warn(`Regra de validação '${ruleName}' não encontrada`);
                    continue;
                }

                if (!rule.validate(value)) {
                    errors.push({
                        campo: field,
                        valor: value,
                        mensagem: rule.message
                    });
                    break; // Parar na primeira regra que falhar
                }
            }

            // Aplicar sanitização se não houver erros
            if (!errors.some(error => error.campo === field)) {
                let sanitizedValue = value;
                
                for (const ruleName of rules.rules || []) {
                    const rule = this.rules.get(ruleName);
                    if (rule && rule.sanitize) {
                        sanitizedValue = rule.sanitize(sanitizedValue);
                    }
                }

                sanitizedData[field] = sanitizedValue;
            }
        }

        return {
            isValid: errors.length === 0,
            errors,
            data: sanitizedData
        };
    }

    // Middleware para Express
    createValidationMiddleware(schema) {
        return (req, res, next) => {
            const result = this.validate(req.body, schema);
            
            if (!result.isValid) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Dados de entrada inválidos',
                    erros: result.errors
                });
            }

            // Substituir req.body pelos dados sanitizados
            req.body = result.data;
            next();
        };
    }
}

// Schemas de validação
const userRegistrationSchema = {
    nome: {
        required: true,
        rules: ['name']
    },
    email: {
        required: true,
        rules: ['email']
    },
    senha: {
        required: true,
        rules: ['password']
    },
    telefone: {
        required: false,
        rules: ['phone']
    },
    dataNascimento: {
        required: false,
        rules: ['date']
    }
};

const userLoginSchema = {
    email: {
        required: true,
        rules: ['email']
    },
    senha: {
        required: true,
        rules: [] // Não validar complexidade no login
    }
};

// Middleware de sanitização global
function setupGlobalSanitization(app) {
    // Sanitização contra NoSQL injection
    app.use(mongoSanitize({
        replaceWith: '_'
    }));

    // Sanitização XSS global
    app.use((req, res, next) => {
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
    });
}

function sanitizeObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return typeof obj === 'string' ? xss(obj) : obj;
    }

    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            sanitized[key] = value.map(item => sanitizeObject(item));
        } else if (typeof value === 'object') {
            sanitized[key] = sanitizeObject(value);
        } else if (typeof value === 'string') {
            sanitized[key] = xss(value);
        } else {
            sanitized[key] = value;
        }
    }
    return sanitized;
}

// Exemplo de uso
const validator = new DataValidator();

// Rota com validação
app.post('/api/auth/registrar', 
    validator.createValidationMiddleware(userRegistrationSchema),
    async (req, res) => {
        try {
            // req.body já está validado e sanitizado
            const user = await User.create(req.body);
            
            res.status(201).json({
                sucesso: true,
                mensagem: 'Usuário criado com sucesso',
                dados: {
                    id: user._id,
                    nome: user.nome,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({
                sucesso: false,
                mensagem: 'Erro interno do servidor'
            });
        }
    }
);
```

### Validação Avançada com Joi

```javascript
// Sistema de validação com Joi (alternativa mais robusta)
const Joi = require('joi');

class JoiValidator {
    constructor() {
        this.setupSchemas();
    }

    setupSchemas() {
        // Schema para registro de usuário
        this.userRegistrationSchema = Joi.object({
            nome: Joi.string()
                .min(2)
                .max(100)
                .pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
                .required()
                .messages({
                    'string.min': 'Nome deve ter pelo menos 2 caracteres',
                    'string.max': 'Nome deve ter no máximo 100 caracteres',
                    'string.pattern.base': 'Nome deve conter apenas letras',
                    'any.required': 'Nome é obrigatório'
                }),

            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.email': 'Email deve ser válido',
                    'any.required': 'Email é obrigatório'
                }),

            senha: Joi.string()
                .min(8)
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)
                .required()
                .messages({
                    'string.min': 'Senha deve ter pelo menos 8 caracteres',
                    'string.pattern.base': 'Senha deve conter maiúsculas, minúsculas, números e símbolos',
                    'any.required': 'Senha é obrigatória'
                }),

            telefone: Joi.string()
                .pattern(/^(\+55\s?)?((\d{2})\s?)?(\d{4,5})-?(\d{4})$/)
                .optional()
                .messages({
                    'string.pattern.base': 'Telefone deve estar em formato válido'
                }),

            dataNascimento: Joi.date()
                .iso()
                .max('now')
                .optional()
                .messages({
                    'date.max': 'Data de nascimento não pode ser no futuro'
                }),

            endereco: Joi.object({
                rua: Joi.string().max(200).optional(),
                numero: Joi.string().max(10).optional(),
                complemento: Joi.string().max(100).optional(),
                bairro: Joi.string().max(100).optional(),
                cidade: Joi.string().max(100).optional(),
                estado: Joi.string().length(2).optional(),
                cep: Joi.string().pattern(/^\d{5}-?\d{3}$/).optional()
            }).optional()
        });

        // Schema para login
        this.userLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            senha: Joi.string().required()
        });

        // Schema para atualização de perfil
        this.userUpdateSchema = Joi.object({
            nome: Joi.string().min(2).max(100).pattern(/^[a-zA-ZÀ-ÿ\s]+$/).optional(),
            telefone: Joi.string().pattern(/^(\+55\s?)?((\d{2})\s?)?(\d{4,5})-?(\d{4})$/).optional(),
            dataNascimento: Joi.date().iso().max('now').optional(),
            endereco: Joi.object({
                rua: Joi.string().max(200).optional(),
                numero: Joi.string().max(10).optional(),
                complemento: Joi.string().max(100).optional(),
                bairro: Joi.string().max(100).optional(),
                cidade: Joi.string().max(100).optional(),
                estado: Joi.string().length(2).optional(),
                cep: Joi.string().pattern(/^\d{5}-?\d{3}$/).optional()
            }).optional()
        });
    }

    validate(data, schemaName) {
        const schema = this[schemaName];
        if (!schema) {
            throw new Error(`Schema '${schemaName}' não encontrado`);
        }

        const { error, value } = schema.validate(data, {
            abortEarly: false,
            stripUnknown: true,
            convert: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                campo: detail.path.join('.'),
                valor: detail.context?.value,
                mensagem: detail.message
            }));

            return {
                isValid: false,
                errors,
                data: null
            };
        }

        return {
            isValid: true,
            errors: [],
            data: value
        };
    }

    createMiddleware(schemaName) {
        return (req, res, next) => {
            const result = this.validate(req.body, schemaName);
            
            if (!result.isValid) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Dados de entrada inválidos',
                    erros: result.errors
                });
            }

            req.body = result.data;
            next();
        };
    }
}

const joiValidator = new JoiValidator();

// Uso nas rotas
app.post('/api/auth/registrar', 
    joiValidator.createMiddleware('userRegistrationSchema'),
    registerUser
);

app.post('/api/auth/login',
    joiValidator.createMiddleware('userLoginSchema'),
    loginUser
);

app.put('/api/users/perfil',
    authMiddleware,
    joiValidator.createMiddleware('userUpdateSchema'),
    updateUserProfile
);
```

## Proteção contra Ataques Comuns

A proteção contra ataques comuns é essencial para manter a segurança da aplicação. Vamos abordar os principais tipos de ataques e como preveni-los [9].

### Cross-Site Scripting (XSS)

XSS ocorre quando dados não confiáveis são incluídos em uma página web sem validação ou codificação adequada.

```javascript
// Proteção contra XSS
const createDOMPurify = require('isomorphic-dompurify');
const xss = require('xss');

class XSSProtection {
    constructor() {
        this.setupXSSFilter();
    }

    setupXSSFilter() {
        // Configuração personalizada do filtro XSS
        this.xssOptions = {
            whiteList: {
                // Tags permitidas (muito restritivo)
                p: ['class'],
                br: [],
                strong: [],
                em: [],
                u: [],
                span: ['class']
            },
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script', 'style'],
            allowCommentTag: false,
            css: false // Desabilitar CSS inline
        };
    }

    sanitizeHTML(dirty) {
        return xss(dirty, this.xssOptions);
    }

    sanitizeText(text) {
        if (typeof text !== 'string') return text;
        
        // Escapar caracteres HTML
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    // Middleware para sanitização automática
    createSanitizationMiddleware() {
        return (req, res, next) => {
            if (req.body) {
                req.body = this.sanitizeObject(req.body);
            }
            if (req.query) {
                req.query = this.sanitizeObject(req.query);
            }
            next();
        };
    }

    sanitizeObject(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return typeof obj === 'string' ? this.sanitizeText(obj) : obj;
        }

        const sanitized = {};
        for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {
                sanitized[key] = value.map(item => this.sanitizeObject(item));
            } else if (typeof value === 'object') {
                sanitized[key] = this.sanitizeObject(value);
            } else {
                sanitized[key] = this.sanitizeObject(value);
            }
        }
        return sanitized;
    }

    // CSP (Content Security Policy) headers
    generateCSPHeader() {
        return [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'", // Evitar 'unsafe-inline' em produção
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self'",
            "connect-src 'self'",
            "media-src 'self'",
            "object-src 'none'",
            "child-src 'none'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
        ].join('; ');
    }
}
```

### SQL Injection e NoSQL Injection

```javascript
// Proteção contra injeção SQL/NoSQL
const mongoSanitize = require('express-mongo-sanitize');

class InjectionProtection {
    constructor() {
        this.setupProtection();
    }

    setupProtection() {
        // Padrões suspeitos de SQL injection
        this.sqlInjectionPatterns = [
            /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
            /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
            /(--|\/\*|\*\/|;)/g,
            /(\b(CHAR|NCHAR|VARCHAR|NVARCHAR)\s*\()/gi,
            /(\b(WAITFOR|DELAY)\b)/gi
        ];

        // Padrões suspeitos de NoSQL injection
        this.noSqlInjectionPatterns = [
            /\$where/gi,
            /\$ne/gi,
            /\$gt/gi,
            /\$lt/gi,
            /\$regex/gi,
            /\$or/gi,
            /\$and/gi
        ];
    }

    detectSQLInjection(input) {
        if (typeof input !== 'string') return false;
        
        return this.sqlInjectionPatterns.some(pattern => pattern.test(input));
    }

    detectNoSQLInjection(input) {
        const inputStr = typeof input === 'string' ? input : JSON.stringify(input);
        
        return this.noSqlInjectionPatterns.some(pattern => pattern.test(inputStr));
    }

    sanitizeForSQL(input) {
        if (typeof input !== 'string') return input;
        
        // Escapar caracteres perigosos
        return input
            .replace(/'/g, "''")
            .replace(/;/g, '')
            .replace(/--/g, '')
            .replace(/\/\*/g, '')
            .replace(/\*\//g, '');
    }

    // Middleware de proteção
    createProtectionMiddleware() {
        return (req, res, next) => {
            // Verificar SQL injection
            const checkSQLInjection = (obj, path = '') => {
                for (const [key, value] of Object.entries(obj)) {
                    const currentPath = path ? `${path}.${key}` : key;
                    
                    if (typeof value === 'string' && this.detectSQLInjection(value)) {
                        return res.status(400).json({
                            sucesso: false,
                            mensagem: 'Entrada suspeita detectada',
                            campo: currentPath
                        });
                    }
                    
                    if (typeof value === 'object' && value !== null) {
                        const result = checkSQLInjection(value, currentPath);
                        if (result) return result;
                    }
                }
                return null;
            };

            // Verificar NoSQL injection
            const checkNoSQLInjection = (obj, path = '') => {
                for (const [key, value] of Object.entries(obj)) {
                    const currentPath = path ? `${path}.${key}` : key;
                    
                    if (this.detectNoSQLInjection(value)) {
                        return res.status(400).json({
                            sucesso: false,
                            mensagem: 'Entrada suspeita detectada',
                            campo: currentPath
                        });
                    }
                    
                    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                        const result = checkNoSQLInjection(value, currentPath);
                        if (result) return result;
                    }
                }
                return null;
            };

            // Verificar body, query e params
            if (req.body && typeof req.body === 'object') {
                const sqlResult = checkSQLInjection(req.body);
                if (sqlResult) return sqlResult;
                
                const noSqlResult = checkNoSQLInjection(req.body);
                if (noSqlResult) return noSqlResult;
            }

            if (req.query && typeof req.query === 'object') {
                const sqlResult = checkSQLInjection(req.query);
                if (sqlResult) return sqlResult;
                
                const noSqlResult = checkNoSQLInjection(req.query);
                if (noSqlResult) return noSqlResult;
            }

            next();
        };
    }

    // Usar prepared statements para SQL
    createSafeQuery(query, params) {
        // Exemplo com MySQL
        const mysql = require('mysql2/promise');
        
        return async (connection) => {
            try {
                const [rows] = await connection.execute(query, params);
                return rows;
            } catch (error) {
                console.error('Erro na query:', error);
                throw new Error('Erro na consulta ao banco de dados');
            }
        };
    }

    // Usar agregação segura para MongoDB
    createSafeAggregation(pipeline) {
        // Validar pipeline de agregação
        const safePipeline = pipeline.filter(stage => {
            const stageKeys = Object.keys(stage);
            const dangerousOperators = ['$where', '$function'];
            
            return !stageKeys.some(key => dangerousOperators.includes(key));
        });

        return safePipeline;
    }
}

// Configuração global de proteção
function setupInjectionProtection(app) {
    const protection = new InjectionProtection();
    
    // Sanitização MongoDB
    app.use(mongoSanitize({
        replaceWith: '_',
        onSanitize: ({ req, key }) => {
            console.warn(`Tentativa de NoSQL injection detectada: ${key} em ${req.path}`);
        }
    }));
    
    // Middleware de detecção
    app.use(protection.createProtectionMiddleware());
}
```

### Cross-Site Request Forgery (CSRF)

```javascript
// Proteção contra CSRF
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

class CSRFProtection {
    constructor() {
        this.setupCSRFProtection();
    }

    setupCSRFProtection() {
        // Configuração do CSRF
        this.csrfProtection = csrf({
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            },
            ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
            value: (req) => {
                // Verificar token no header ou body
                return req.headers['x-csrf-token'] || 
                       req.body._csrf || 
                       req.query._csrf;
            }
        });
    }

    // Middleware para aplicar proteção CSRF
    applyProtection() {
        return [
            cookieParser(),
            this.csrfProtection,
            (req, res, next) => {
                // Disponibilizar token para o frontend
                res.locals.csrfToken = req.csrfToken();
                next();
            }
        ];
    }

    // Endpoint para obter token CSRF
    getTokenEndpoint() {
        return (req, res) => {
            res.json({
                sucesso: true,
                csrfToken: req.csrfToken()
            });
        };
    }

    // Verificação manual de CSRF para APIs
    verifyCSRFToken(req, expectedToken) {
        const token = req.headers['x-csrf-token'] || 
                     req.body._csrf || 
                     req.query._csrf;
        
        return token === expectedToken;
    }

    // Implementação customizada para SPAs
    createSPAProtection() {
        const tokens = new Map();
        
        return {
            generateToken: (sessionId) => {
                const token = require('crypto').randomBytes(32).toString('hex');
                tokens.set(sessionId, token);
                
                // Expirar token após 1 hora
                setTimeout(() => {
                    tokens.delete(sessionId);
                }, 60 * 60 * 1000);
                
                return token;
            },
            
            verifyToken: (sessionId, token) => {
                return tokens.get(sessionId) === token;
            },
            
            middleware: (req, res, next) => {
                if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
                    return next();
                }
                
                const sessionId = req.session?.id || req.headers['x-session-id'];
                const token = req.headers['x-csrf-token'];
                
                if (!sessionId || !token || !this.verifyToken(sessionId, token)) {
                    return res.status(403).json({
                        sucesso: false,
                        mensagem: 'Token CSRF inválido'
                    });
                }
                
                next();
            }
        };
    }
}

// Configuração para aplicação
function setupCSRFProtection(app) {
    const csrfProtection = new CSRFProtection();
    
    // Aplicar proteção CSRF
    app.use('/api', csrfProtection.applyProtection());
    
    // Endpoint para obter token
    app.get('/api/csrf-token', csrfProtection.getTokenEndpoint());
    
    // Handler de erro CSRF
    app.use((err, req, res, next) => {
        if (err.code === 'EBADCSRFTOKEN') {
            res.status(403).json({
                sucesso: false,
                mensagem: 'Token CSRF inválido'
            });
        } else {
            next(err);
        }
    });
}
```

### Clickjacking Protection

```javascript
// Proteção contra Clickjacking
class ClickjackingProtection {
    constructor() {
        this.setupProtection();
    }

    setupProtection() {
        // Configurações de X-Frame-Options
        this.frameOptions = {
            DENY: 'DENY',
            SAMEORIGIN: 'SAMEORIGIN',
            ALLOWFROM: (uri) => `ALLOW-FROM ${uri}`
        };
    }

    // Middleware de proteção
    createProtectionMiddleware(option = 'DENY', allowedOrigin = null) {
        return (req, res, next) => {
            if (option === 'ALLOWFROM' && allowedOrigin) {
                res.setHeader('X-Frame-Options', this.frameOptions.ALLOWFROM(allowedOrigin));
            } else {
                res.setHeader('X-Frame-Options', this.frameOptions[option]);
            }
            
            // CSP frame-ancestors como backup
            const csp = res.getHeader('Content-Security-Policy') || '';
            if (!csp.includes('frame-ancestors')) {
                const frameAncestors = option === 'DENY' ? "'none'" : 
                                     option === 'SAMEORIGIN' ? "'self'" :
                                     allowedOrigin || "'none'";
                
                const newCSP = csp ? `${csp}; frame-ancestors ${frameAncestors}` : 
                              `frame-ancestors ${frameAncestors}`;
                
                res.setHeader('Content-Security-Policy', newCSP);
            }
            
            next();
        };
    }
}
```

## Segurança no Backend

### Configuração Segura do Servidor

```javascript
// Configuração completa de segurança para servidor Node.js
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

class SecureBackend {
    constructor() {
        this.app = express();
        this.setupSecurity();
        this.setupMiddleware();
        this.setupErrorHandling();
    }

    setupSecurity() {
        // Helmet para headers de segurança
        this.app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                    fontSrc: ["'self'", "https://fonts.gstatic.com"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'"],
                    mediaSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    childSrc: ["'none'"],
                    frameAncestors: ["'none'"],
                    baseUri: ["'self'"],
                    formAction: ["'self'"]
                }
            },
            crossOriginEmbedderPolicy: false,
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true
            },
            noSniff: true,
            frameguard: { action: 'deny' },
            xssFilter: true,
            referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
        }));

        // CORS configurado de forma segura
        const corsOptions = {
            origin: (origin, callback) => {
                const allowedOrigins = [
                    'https://meudominio.com',
                    'https://app.meudominio.com',
                    'https://admin.meudominio.com'
                ];
                
                // Permitir requests sem origin (mobile apps, Postman, etc.)
                if (!origin) return callback(null, true);
                
                if (allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Não permitido pelo CORS'));
                }
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
            exposedHeaders: ['X-Token-Refresh-Needed'],
            maxAge: 86400 // 24 horas
        };

        this.app.use(cors(corsOptions));

        // Rate limiting global
        const globalLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 1000, // máximo 1000 requests por IP
            message: {
                sucesso: false,
                mensagem: 'Muitas requisições, tente novamente em 15 minutos'
            },
            standardHeaders: true,
            legacyHeaders: false,
            skip: (req) => {
                // Pular rate limiting para IPs confiáveis
                const trustedIPs = ['127.0.0.1', '::1'];
                return trustedIPs.includes(req.ip);
            }
        });

        this.app.use('/api/', globalLimiter);

        // Rate limiting específico para autenticação
        const authLimiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 5,
            skipSuccessfulRequests: true,
            message: {
                sucesso: false,
                mensagem: 'Muitas tentativas de login, tente novamente em 15 minutos'
            }
        });

        this.app.use('/api/auth/login', authLimiter);

        // Slow down para requests suspeitos
        const speedLimiter = slowDown({
            windowMs: 15 * 60 * 1000,
            delayAfter: 100,
            delayMs: 500,
            maxDelayMs: 20000
        });

        this.app.use('/api/', speedLimiter);

        // Compressão de resposta
        this.app.use(compression({
            filter: (req, res) => {
                if (req.headers['x-no-compression']) {
                    return false;
                }
                return compression.filter(req, res);
            },
            level: 6,
            threshold: 1024
        }));
    }

    setupMiddleware() {
        // Parser JSON com limite de tamanho
        this.app.use(express.json({ 
            limit: '10mb',
            verify: (req, res, buf) => {
                // Verificar se o JSON é válido
                try {
                    JSON.parse(buf);
                } catch (e) {
                    throw new Error('JSON inválido');
                }
            }
        }));

        // Parser URL-encoded
        this.app.use(express.urlencoded({ 
            extended: true, 
            limit: '10mb' 
        }));

        // Middleware de logging de segurança
        this.app.use((req, res, next) => {
            const securityLog = {
                timestamp: new Date().toISOString(),
                ip: req.ip,
                method: req.method,
                url: req.url,
                userAgent: req.get('User-Agent'),
                referer: req.get('Referer')
            };

            // Detectar atividades suspeitas
            if (this.detectSuspiciousActivity(req)) {
                console.warn('Atividade suspeita:', securityLog);
                
                // Opcional: bloquear IP suspeito
                // return res.status(403).json({ sucesso: false, mensagem: 'Acesso negado' });
            }

            next();
        });

        // Middleware de timeout
        this.app.use((req, res, next) => {
            res.setTimeout(30000, () => {
                res.status(408).json({
                    sucesso: false,
                    mensagem: 'Timeout da requisição'
                });
            });
            next();
        });
    }

    detectSuspiciousActivity(req) {
        const suspiciousPatterns = [
            /\.\./,                    // Path traversal
            /<script/i,               // XSS
            /union.*select/i,         // SQL injection
            /javascript:/i,           // JavaScript injection
            /vbscript:/i,            // VBScript injection
            /on\w+\s*=/i,            // Event handlers
            /expression\s*\(/i,       // CSS expression
            /import\s+/i,            // ES6 imports
            /require\s*\(/i,         // Node.js require
            /eval\s*\(/i,            // eval function
            /function\s*\(/i,        // Function constructor
            /setTimeout|setInterval/i // Timer functions
        ];

        const testString = `${req.url} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`;
        
        return suspiciousPatterns.some(pattern => pattern.test(testString));
    }

    setupErrorHandling() {
        // Handler para 404
        this.app.use('*', (req, res) => {
            res.status(404).json({
                sucesso: false,
                mensagem: 'Endpoint não encontrado'
            });
        });

        // Handler global de erros
        this.app.use((err, req, res, next) => {
            console.error('Erro:', err);

            // Não vazar informações sensíveis em produção
            const isDevelopment = process.env.NODE_ENV === 'development';
            
            let message = 'Erro interno do servidor';
            let statusCode = 500;

            // Tratar tipos específicos de erro
            if (err.name === 'ValidationError') {
                statusCode = 400;
                message = 'Dados de entrada inválidos';
            } else if (err.name === 'UnauthorizedError') {
                statusCode = 401;
                message = 'Token inválido';
            } else if (err.name === 'CastError') {
                statusCode = 400;
                message = 'ID inválido';
            } else if (err.code === 11000) {
                statusCode = 409;
                message = 'Dados duplicados';
            }

            res.status(statusCode).json({
                sucesso: false,
                mensagem: message,
                ...(isDevelopment && { stack: err.stack })
            });
        });
    }

    // Middleware de auditoria
    createAuditMiddleware() {
        return (req, res, next) => {
            const originalSend = res.send;
            
            res.send = function(data) {
                // Log da resposta para auditoria
                const auditLog = {
                    timestamp: new Date().toISOString(),
                    userId: req.user?.id,
                    ip: req.ip,
                    method: req.method,
                    url: req.url,
                    statusCode: res.statusCode,
                    responseTime: Date.now() - req.startTime
                };

                // Salvar log de auditoria (implementar conforme necessário)
                console.log('Audit:', auditLog);
                
                originalSend.call(this, data);
            };

            req.startTime = Date.now();
            next();
        };
    }

    start(port = 3000) {
        this.app.listen(port, () => {
            console.log(`Servidor seguro rodando na porta ${port}`);
        });
    }
}

// Configuração de processo seguro
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

const secureBackend = new SecureBackend();
secureBackend.start();
```

## Referências

[1] OWASP Foundation - https://owasp.org/
[2] NIST Cryptographic Standards - https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
[3] bcrypt Documentation - https://github.com/kelektiv/node.bcrypt.js
[4] Password Hashing Competition - https://password-hashing.net/
[5] Argon2 Specification - https://github.com/P-H-C/phc-winner-argon2
[6] RFC 7519 - JSON Web Token (JWT) - https://tools.ietf.org/html/rfc7519
[7] Mozilla Web Security Guidelines - https://infosec.mozilla.org/guidelines/web_security
[8] OWASP Input Validation Cheat Sheet - https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
[9] OWASP Top 10 - https://owasp.org/www-project-top-ten/
[10] Node.js Security Best Practices - https://nodejs.org/en/docs/guides/security/

---

**Conclusão**

A segurança em aplicações web e mobile é um processo contínuo que requer atenção constante e atualização regular das práticas implementadas. Este tutorial apresentou uma abordagem abrangente para implementar medidas de segurança robustas, desde a criptografia básica até a proteção contra ataques sofisticados.

A implementação adequada dessas práticas de segurança não apenas protege os dados dos usuários e a integridade do sistema, mas também garante conformidade com regulamentações como LGPD e GDPR. É fundamental manter-se atualizado com as últimas ameaças e vulnerabilidades, participar de comunidades de segurança e realizar auditorias regulares dos sistemas implementados.

Lembre-se de que a segurança não é um destino, mas uma jornada contínua de melhoria e adaptação às novas ameaças que surgem constantemente no cenário digital.

