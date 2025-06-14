# Introdução às APIs REST

As APIs (Interfaces de Programação de Aplicações) tornaram-se componentes fundamentais no desenvolvimento de software moderno, permitindo a comunicação e integração entre diferentes sistemas. Nesta seção, vamos explorar os conceitos básicos das APIs REST, sua definição, funcionamento e importância no desenvolvimento de aplicações.

## O que é uma API?

Uma API é um conjunto de regras e protocolos que permite a comunicação entre diferentes softwares. Ela define os métodos de interação e a estrutura dos dados que podem ser trocados entre as aplicações. Em termos simples, uma API funciona como um intermediário que permite que dois sistemas de computador conversem entre si.

As APIs são frequentemente descritas como um contrato entre o provedor e o consumidor de informações, definindo o que é exigido na requisição (por parte do consumidor) e o que será entregue na resposta (por parte do provedor). Por exemplo, o design da API de um serviço meteorológico pode especificar que o usuário forneça um CEP e o produtor responda em duas partes, a primeira com a temperatura mais alta e a segunda com a mais baixa.

Uma das grandes vantagens das APIs é que você não precisa conhecer os detalhes internos de como um recurso é recuperado ou armazenado. A API abstrai essa complexidade, permitindo que você se concentre apenas na utilização dos recursos disponibilizados.

## O que é REST?

REST (Representational State Transfer) é um estilo de arquitetura de software que define um conjunto de princípios e restrições para o desenvolvimento de APIs. Criado por Roy Fielding em sua tese de doutorado em 2000, o REST não é um protocolo ou padrão, mas sim um conjunto de diretrizes que podem ser implementadas de diversas maneiras.

O termo "RESTful" é usado para descrever APIs que seguem os princípios do REST. Quando uma solicitação de cliente é feita por uma API RESTful, ela transfere uma representação do estado do recurso para o solicitante ou endpoint. Essa informação, ou representação, é entregue em um de vários formatos, via HTTP: JSON (Javascript Object Notation), HTML, XML, Python, PHP ou texto simples. O JSON é o formato mais utilizado atualmente, pois, apesar de seu nome, é um formato independente de linguagem e pode ser lido tanto por máquinas quanto por humanos.

## Princípios fundamentais do REST

Para uma API ser considerada RESTful, ela deve aderir aos seguintes princípios:

### 1. Interface Uniforme

A interface uniforme é fundamental para o design de qualquer serviço da Web RESTful. Ela indica que o servidor transfere informações em formato-padrão. O recurso formatado é chamado de representação em REST. A interface uniforme impõe quatro restrições arquitetônicas:

- As solicitações devem identificar recursos usando um identificador de recurso uniforme (URI).
- Os clientes têm informações suficientes na representação do recurso para modificar ou excluir o recurso caso queiram.
- Os clientes recebem informações sobre como processar ainda mais a representação através de mensagens autodescritivas.
- Os clientes recebem informações sobre todos os outros recursos relacionados de que precisam para concluir uma tarefa (HATEOAS - Hypermedia as the Engine of Application State).

### 2. Arquitetura Cliente-Servidor

A arquitetura cliente-servidor separa as responsabilidades entre o cliente (que se preocupa com a interface do usuário e a experiência) e o servidor (que se preocupa com o armazenamento de dados e a lógica de negócios). Essa separação permite que ambos evoluam independentemente.

### 3. Ausência de Estado (Stateless)

Na arquitetura REST, a ausência de estado refere-se a um método de comunicação no qual o servidor completa cada solicitação do cliente independentemente de todas as solicitações anteriores. Os clientes podem solicitar recursos em qualquer ordem, e cada solicitação é sem estado ou isolada de outras solicitações. Isso significa que o servidor não armazena nenhum estado sobre o cliente entre as requisições.

### 4. Sistema em Camadas

Em uma arquitetura de sistema em camadas, o cliente pode se conectar a outros intermediários autorizados entre o cliente e o servidor e ainda receber respostas do servidor. Os servidores também podem passar solicitações para outros servidores. Essas camadas permanecem invisíveis para o cliente.

### 5. Capacidade de Armazenamento em Cache

Os serviços da Web RESTful permitem o armazenamento em cache, que é o processo de armazenar algumas respostas no cliente ou em um intermediário para melhorar o tempo de resposta do servidor. Os serviços da Web RESTful controlam o cache usando respostas de API que se definem como armazenáveis ou não em cache.

### 6. Código sob Demanda (opcional)

No estilo de arquitetura REST, os servidores podem estender ou personalizar temporariamente a funcionalidade do cliente, transferindo o código de programação de software para o cliente. Este é o único princípio opcional do REST.

## Endpoints e Rotas em uma API REST

Os endpoints e as rotas são elementos fundamentais no desenvolvimento de uma API REST:

### Endpoints

Os endpoints são URLs específicas dentro de uma API que representam recursos ou ações disponíveis. Cada endpoint é responsável por uma operação específica. Por exemplo, em uma API de pagamentos online, poderíamos ter endpoints como:

- `/payments`: Representa o recurso de pagamentos, onde é possível realizar ações relacionadas a pagamentos.
- `/payments/create`: Representa o endpoint para criar um novo pagamento.
- `/payments/{id}`: Representa um pagamento específico, identificado pelo ID do pagamento.

Esses endpoints são acessados por meio de requisições HTTP, como GET, POST, PUT ou DELETE, para realizar as operações desejadas.

### Rotas

As rotas são responsáveis por mapear os endpoints para suas respectivas funções ou métodos no código da API. Ainda usando o exemplo de uma API de pagamentos online, as rotas definiriam qual função ou método será executado quando um determinado endpoint for acessado:

- Rota `/payments/create` mapeada para a função `create_payment()`: Essa função seria responsável por criar um novo pagamento no sistema e retornar a resposta apropriada.
- Rota `/payments/{id}` mapeada para a função `get_payment_by_id(id)`: Essa função seria responsável por buscar as informações de um pagamento específico com base no ID fornecido e retornar os detalhes correspondentes.

## Métodos HTTP em APIs REST

Os métodos HTTP são utilizados para indicar a ação que deve ser realizada em um recurso. Os principais métodos utilizados em APIs REST são:

- **GET**: Recupera um recurso ou uma coleção de recursos.
- **POST**: Cria um novo recurso.
- **PUT**: Atualiza um recurso existente (substituição completa).
- **PATCH**: Atualiza parcialmente um recurso existente.
- **DELETE**: Remove um recurso.

Cada método HTTP tem um propósito específico e deve ser utilizado de acordo com a operação que se deseja realizar.

## Diferenças entre APIs REST e SOAP

Embora uma API REST precise atender aos critérios mencionados anteriormente, ela ainda é considerada mais fácil de usar do que protocolos rígidos como o SOAP (Simple Object Access Protocol), que exige mensageria XML, conformidade com transações e segurança integrada, tornando-o mais lento e pesado.

Por outro lado, o REST é um conjunto de diretrizes que pode ser implementado conforme necessário, tornando as APIs REST mais rápidas, leves e escaláveis, e, por isso, ideais para Internet das Coisas (IoT) e o desenvolvimento de aplicativos móveis.

## Onde as APIs REST são utilizadas?

As APIs REST são amplamente utilizadas em diversos contextos, mesmo que muitas vezes não percebamos seu uso direto. Alguns exemplos comuns incluem:

- **Redes sociais**: Para obter dados de perfis, postagens, comentários, etc.
- **Mapas e localização**: Para obter informações de localização, rotas, pontos de interesse, etc.
- **Pagamentos online**: Para processar transações, verificar status de pagamentos, etc.
- **Previsão do tempo**: Para obter dados meteorológicos de diferentes regiões.
- **Integração de aplicativos empresariais**: Para permitir a comunicação entre diferentes sistemas dentro de uma organização.

Esses exemplos ilustram como as APIs REST desempenham um papel fundamental em diversas áreas, tornando possível a conexão e o intercâmbio de dados entre diferentes plataformas, serviços e aplicativos, criando experiências integradas e ampliando a funcionalidade dos sistemas.

No próximo capítulo, vamos explorar como configurar o ambiente de desenvolvimento para criar APIs REST com Node.js, MongoDB e MySQL.



# Fundamentos do Node.js para APIs

O Node.js é uma plataforma de desenvolvimento construída sobre o motor JavaScript V8 do Google Chrome, que permite executar código JavaScript no lado do servidor. Sua arquitetura assíncrona e orientada a eventos o torna uma excelente escolha para o desenvolvimento de APIs RESTful, especialmente quando se trata de aplicações que precisam lidar com muitas conexões simultâneas.

## O que é Node.js?

Node.js é um ambiente de execução JavaScript de código aberto e multiplataforma que permite aos desenvolvedores criar aplicações de rede e do lado do servidor usando JavaScript. Diferentemente de ambientes tradicionais, onde cada conexão cria uma nova thread consumindo recursos do sistema, o Node.js opera em um único thread, utilizando operações de entrada e saída não bloqueantes, o que o torna eficiente e leve.

## Características principais do Node.js

### Arquitetura Assíncrona e Orientada a Eventos

Uma das principais características do Node.js é sua natureza assíncrona. Em vez de bloquear o thread de execução enquanto aguarda a conclusão de operações de I/O (como leitura de arquivos ou consultas a bancos de dados), o Node.js continua executando outras tarefas e retorna aos processos pendentes quando os resultados estão disponíveis.

Isso é possível graças ao seu modelo de loop de eventos (event loop), que gerencia todas as operações assíncronas. Quando uma operação é concluída, uma função de callback é chamada para lidar com o resultado.

### NPM (Node Package Manager)

O NPM é o gerenciador de pacotes do Node.js e um dos maiores repositórios de software do mundo. Ele permite que os desenvolvedores instalem, compartilhem e gerenciem dependências de projetos Node.js com facilidade. Com o NPM, você pode adicionar bibliotecas e frameworks ao seu projeto com simples comandos, facilitando o desenvolvimento de aplicações complexas.

### Módulos

O Node.js utiliza um sistema de módulos que permite organizar o código em unidades reutilizáveis. Existem três tipos principais de módulos no Node.js:

1. **Módulos Nativos**: São módulos embutidos no Node.js, como `fs` (para operações de sistema de arquivos), `http` (para criar servidores HTTP) e `path` (para manipulação de caminhos de arquivos).

2. **Módulos de Terceiros**: São módulos criados pela comunidade e disponibilizados através do NPM.

3. **Módulos Locais**: São módulos criados pelo próprio desenvolvedor para organizar o código da aplicação.

## Express.js: O Framework Web para Node.js

Quando se trata de desenvolver APIs RESTful com Node.js, o Express.js é o framework mais popular e amplamente utilizado. Ele fornece uma camada fina de recursos fundamentais para aplicações web, sem obscurecer os recursos do Node.js.

### O que é Express.js?

Express.js é um framework web minimalista e flexível para Node.js que fornece um conjunto robusto de recursos para aplicações web e móveis. Ele facilita o desenvolvimento de APIs, simplificando tarefas comuns como roteamento, manipulação de requisições e respostas, e integração com mecanismos de visualização.

### Principais recursos do Express.js

#### Roteamento

O Express.js oferece um sistema de roteamento poderoso que permite definir como a aplicação responde a requisições de clientes para endpoints específicos (URIs) e métodos HTTP específicos (GET, POST, etc.).

```javascript
const express = require("express");
const app = express();

// Rota para GET /api/users
app.get("/api/users", (req, res) => {
  res.json({ users: ["João", "Maria", "Pedro"] });
});

// Rota para POST /api/users
app.post("/api/users", (req, res) => {
  // Código para criar um novo usuário
  res.status(201).json({ message: "Usuário criado com sucesso" });
});
```

#### Middleware

Middleware são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função middleware no ciclo de requisição-resposta da aplicação. Eles podem executar código, modificar objetos de requisição e resposta, encerrar o ciclo de requisição-resposta, ou chamar a próxima função middleware.

```javascript
// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Passa o controle para o próximo middleware
});

// Middleware para verificar autenticação
const autenticar = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  // Verificar token...
  next();
};

// Aplicando middleware a uma rota específica
app.get("/api/perfil", autenticar, (req, res) => {
  res.json({ nome: "Usuário Autenticado" });
});
```

#### Manipulação de Requisições e Respostas

O Express.js simplifica a manipulação de requisições e respostas HTTP, fornecendo métodos para acessar parâmetros de requisição, corpos de requisição, cabeçalhos, e para enviar respostas com diferentes formatos e códigos de status.

```javascript
// Acessando parâmetros de rota
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  // Buscar usuário com o ID fornecido
  res.json({ id: userId, nome: "João" });
});

// Acessando parâmetros de consulta
app.get("/api/search", (req, res) => {
  const query = req.query.q;
  // Buscar resultados com base na consulta
  res.json({ results: [`Resultado para: ${query}`] });
});

// Acessando corpo da requisição (requer middleware)
app.use(express.json()); // Middleware para parsing de JSON
app.post("/api/users", (req, res) => {
  const userData = req.body;
  // Criar usuário com os dados fornecidos
  res.status(201).json({ message: "Usuário criado", user: userData });
});
```

## Configurando o Ambiente de Desenvolvimento

Antes de começarmos a criar nossas APIs RESTful com Node.js, precisamos configurar nosso ambiente de desenvolvimento. Vamos seguir os passos abaixo:

### 1. Instalação do Node.js

Primeiro, precisamos instalar o Node.js. Você pode baixá-lo diretamente do site oficial (https://nodejs.org/) ou usar um gerenciador de versões como o NVM (Node Version Manager).

Para verificar se a instalação foi bem-sucedida, abra o terminal e execute:

```bash
node --version
npm --version
```

Esses comandos devem exibir as versões do Node.js e do NPM instaladas em seu sistema.

### 2. Criação de um Projeto Node.js

Agora, vamos criar um novo projeto Node.js:

```bash
mkdir minha-api-rest
cd minha-api-rest
npm init -y
```

O comando `npm init -y` cria um arquivo `package.json` com configurações padrão. Este arquivo é essencial para qualquer projeto Node.js, pois contém metadados sobre o projeto e lista suas dependências.

### 3. Instalação do Express.js

Em seguida, vamos instalar o Express.js:

```bash
npm install express
```

### 4. Criação de um Servidor Básico

Vamos criar um arquivo `app.js` na raiz do projeto com o seguinte conteúdo:

```javascript
const express = require("express");
const app = express();
const port = 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à minha API REST!" });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
```

Para executar o servidor, use o comando:

```bash
node app.js
```

Agora, você pode acessar `http://localhost:3000` em seu navegador ou usar uma ferramenta como o Postman para testar a API.

## Estruturando uma API RESTful com Node.js

Ao desenvolver APIs RESTful com Node.js, é importante seguir boas práticas de estruturação de código para garantir que a aplicação seja fácil de manter e escalar. Vamos explorar uma estrutura de projeto comum para APIs RESTful:

### Estrutura de Diretórios

```
minha-api-rest/
├── node_modules/
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/
│   │   └── database.js
│   └── app.js
├── .env
├── package.json
└── README.md
```

### Componentes Principais

#### Controllers

Os controllers são responsáveis por processar as requisições recebidas, interagir com os models e retornar as respostas apropriadas.

```javascript
// src/controllers/userController.js
const User = require("../models/userModel");

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter um usuário específico
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Atualizar um usuário
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Excluir um usuário
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### Routes

As rotas definem os endpoints da API e conectam as requisições HTTP aos controllers apropriados.

```javascript
// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

// Rotas públicas
router.post("/register", userController.createUser);

// Rotas protegidas
router.use(authMiddleware);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
```

#### Middleware

Middleware são funções que têm acesso ao objeto de requisição, ao objeto de resposta e à próxima função middleware no ciclo de requisição-resposta.

```javascript
// src/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Autenticação falhou" });
  }
};

// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
};
```

#### App.js

O arquivo principal da aplicação, onde configuramos o Express e conectamos todos os componentes.

```javascript
// src/app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar ao banco de dados
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Rotas
app.use("/api/users", userRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
```

## Conclusão

Neste capítulo, exploramos os fundamentos do Node.js para o desenvolvimento de APIs RESTful. Vimos como o Node.js, com sua arquitetura assíncrona e orientada a eventos, é uma excelente escolha para aplicações que precisam lidar com muitas conexões simultâneas. Também aprendemos sobre o Express.js, o framework web mais popular para Node.js, e como ele simplifica o desenvolvimento de APIs.

Além disso, vimos como configurar um ambiente de desenvolvimento básico e como estruturar um projeto de API RESTful seguindo boas práticas. Nos próximos capítulos, vamos explorar como integrar bancos de dados MongoDB e MySQL às nossas APIs, além de implementar recursos avançados como autenticação, validação, testes e documentação.



# Introdução ao MongoDB e seu uso com Node.js

MongoDB é um banco de dados NoSQL orientado a documentos, projetado para armazenar, consultar e gerenciar dados de forma flexível e escalável. Diferentemente dos bancos de dados relacionais tradicionais, o MongoDB armazena dados em documentos semelhantes a JSON, o que o torna uma escolha natural para aplicações JavaScript, incluindo aquelas desenvolvidas com Node.js.

## O que é MongoDB?

MongoDB é um banco de dados de código aberto, orientado a documentos, que oferece alta performance, alta disponibilidade e fácil escalabilidade. Em vez de usar tabelas e linhas como nos bancos de dados relacionais tradicionais, o MongoDB utiliza coleções e documentos.

Os documentos são compostos por pares de campo-valor e são semelhantes aos objetos JSON. Os campos podem conter outros documentos, arrays e arrays de documentos, permitindo a representação de estruturas de dados hierárquicas complexas. As coleções podem ser vistas como equivalentes às tabelas nos bancos de dados relacionais, mas sem um esquema fixo.

## Principais características do MongoDB

### Modelo de Dados Flexível

O MongoDB utiliza um modelo de dados flexível baseado em documentos BSON (Binary JSON), que permite que os campos variem de documento para documento e que a estrutura de dados seja alterada ao longo do tempo. Isso é particularmente útil para modelar dados complexos e variáveis.

### Consultas Ad Hoc

O MongoDB suporta consultas ad hoc, indexação e agregação em tempo real, oferecendo maneiras poderosas de acessar e analisar seus dados.

### Escalabilidade Horizontal

O MongoDB foi projetado para ser escalável horizontalmente, permitindo que você distribua dados em vários servidores à medida que sua aplicação cresce. Isso é feito através de sharding, que distribui dados em várias máquinas.

### Alta Disponibilidade

O MongoDB oferece replicação, permitindo alta disponibilidade e redundância de dados. Um conjunto de réplicas é um grupo de instâncias do MongoDB que mantêm o mesmo conjunto de dados, fornecendo redundância e aumentando a disponibilidade dos dados.

## Instalação e Configuração do MongoDB

Antes de começarmos a usar o MongoDB com Node.js, precisamos instalá-lo e configurá-lo. Vamos seguir os passos abaixo:

### 1. Instalação do MongoDB

Para instalar o MongoDB, você pode baixá-lo diretamente do site oficial (https://www.mongodb.com/try/download/community) ou usar um gerenciador de pacotes como o apt (para Ubuntu) ou o brew (para macOS).

Para Ubuntu:

```bash
sudo apt update
sudo apt install -y mongodb
```

Para verificar se a instalação foi bem-sucedida, execute:

```bash
sudo systemctl status mongodb
```

### 2. Iniciar o Serviço do MongoDB

Se o MongoDB não estiver em execução, você pode iniciá-lo com:

```bash
sudo systemctl start mongodb
```

### 3. Configuração Básica

Por padrão, o MongoDB escuta na porta 27017. Você pode verificar se o MongoDB está funcionando corretamente conectando-se a ele usando o cliente mongo:

```bash
mongo
```

Isso abrirá o shell do MongoDB, onde você pode executar comandos para interagir com o banco de dados.

## Mongoose: ODM para MongoDB

Ao trabalhar com MongoDB em aplicações Node.js, é comum usar um ODM (Object Document Mapper) como o Mongoose. O Mongoose fornece uma solução direta baseada em esquemas para modelar os dados da sua aplicação e inclui validação de tipos, construção de consultas, hooks de eventos e muito mais.

### Instalação do Mongoose

Para instalar o Mongoose, execute o seguinte comando no diretório do seu projeto:

```bash
npm install mongoose
```

### Conectando ao MongoDB com Mongoose

Para conectar sua aplicação Node.js ao MongoDB usando Mongoose, você pode usar o seguinte código:

```javascript
const mongoose = require("mongoose");

// URI de conexão
const mongoURI = "mongodb://localhost:27017/minha-api";

// Opções de conexão
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Conectar ao MongoDB
mongoose.connect(mongoURI, options)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));
```

### Definindo Esquemas e Modelos

Com o Mongoose, você define esquemas que representam a estrutura dos documentos em uma coleção. Um esquema define os campos, tipos de dados, validações e outros aspectos dos documentos.

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definir esquema
const userSchema = new Schema({
  nome: {
    type: String,
    required: [true, "O nome é obrigatório"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "O email é obrigatório"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Por favor, forneça um email válido"]
  },
  senha: {
    type: String,
    required: [true, "A senha é obrigatória"],
    minlength: [6, "A senha deve ter pelo menos 6 caracteres"]
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  ativo: {
    type: Boolean,
    default: true
  }
});

// Criar modelo a partir do esquema
const User = mongoose.model("User", userSchema);

module.exports = User;
```

### Operações CRUD com Mongoose

O Mongoose simplifica as operações CRUD (Create, Read, Update, Delete) no MongoDB. Vamos ver como realizar essas operações:

#### Create (Criar)

```javascript
// Criar um novo usuário
const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
};

// Exemplo de uso
createUser({
  nome: "João Silva",
  email: "joao@exemplo.com",
  senha: "senha123"
})
  .then(user => console.log("Usuário criado:", user))
  .catch(err => console.error("Erro ao criar usuário:", err));
```

#### Read (Ler)

```javascript
// Buscar todos os usuários
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

// Buscar usuário por ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

// Buscar usuários com filtros
const findUsers = async (filter) => {
  try {
    const users = await User.find(filter);
    return users;
  } catch (error) {
    throw error;
  }
};

// Exemplos de uso
getAllUsers()
  .then(users => console.log("Todos os usuários:", users))
  .catch(err => console.error("Erro ao buscar usuários:", err));

getUserById("60d21b4667d0d8992e610c85")
  .then(user => console.log("Usuário encontrado:", user))
  .catch(err => console.error("Erro ao buscar usuário:", err));

findUsers({ ativo: true })
  .then(users => console.log("Usuários ativos:", users))
  .catch(err => console.error("Erro ao buscar usuários ativos:", err));
```

#### Update (Atualizar)

```javascript
// Atualizar usuário por ID
const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      throw new Error("Usuário não encontrado");
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Exemplo de uso
updateUser("60d21b4667d0d8992e610c85", { nome: "João Silva Atualizado" })
  .then(user => console.log("Usuário atualizado:", user))
  .catch(err => console.error("Erro ao atualizar usuário:", err));
```

#### Delete (Excluir)

```javascript
// Excluir usuário por ID
const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("Usuário não encontrado");
    }
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

// Exemplo de uso
deleteUser("60d21b4667d0d8992e610c85")
  .then(user => console.log("Usuário excluído:", user))
  .catch(err => console.error("Erro ao excluir usuário:", err));
```

## Integrando MongoDB com Express.js

Agora que entendemos como usar o MongoDB com Mongoose, vamos ver como integrá-lo a uma API RESTful construída com Express.js. Vamos criar uma API completa para gerenciar usuários.

### Estrutura do Projeto

```
minha-api-mongodb/
├── node_modules/
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/
│   │   └── database.js
│   └── app.js
├── .env
├── package.json
└── README.md
```

### Configuração do Banco de Dados

```javascript
// src/config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Modelo de Usuário

```javascript
// src/models/userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome é obrigatório"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "O email é obrigatório"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Por favor, forneça um email válido"]
  },
  senha: {
    type: String,
    required: [true, "A senha é obrigatória"],
    minlength: [6, "A senha deve ter pelo menos 6 caracteres"],
    select: false // Não incluir a senha nas consultas por padrão
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  ativo: {
    type: Boolean,
    default: true
  }
});

// Middleware para criptografar a senha antes de salvar
userSchema.pre("save", async function(next) {
  // Só criptografa a senha se ela foi modificada (ou é nova)
  if (!this.isModified("senha")) return next();
  
  // Gerar salt
  const salt = await bcrypt.genSalt(10);
  // Criptografar senha
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Método para verificar senha
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.senha);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
```

### Controller de Usuário

```javascript
// src/controllers/userController.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// Registrar um novo usuário
exports.registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criar novo usuário
    const user = await User.create({
      nome,
      email,
      senha
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        nome: user.nome,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: "Dados de usuário inválidos" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Autenticar usuário e gerar token
exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ email }).select("+senha");
    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    // Verificar se a senha está correta
    const isMatch = await user.matchPassword(senha);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    res.json({
      _id: user._id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter perfil do usuário
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({
      _id: user._id,
      nome: user.nome,
      email: user.email,
      dataCriacao: user.dataCriacao,
      ativo: user.ativo
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar perfil do usuário
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    user.nome = req.body.nome || user.nome;
    user.email = req.body.email || user.email;
    
    if (req.body.senha) {
      user.senha = req.body.senha;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      nome: updatedUser.nome,
      email: updatedUser.email,
      token: generateToken(updatedUser._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter todos os usuários (admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Excluir usuário
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await user.remove();
    res.json({ message: "Usuário removido" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Middleware de Autenticação

```javascript
// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  // Verificar se o token está no header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obter token do header
      token = req.headers.authorization.split(" ")[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obter usuário do token
      req.user = await User.findById(decoded.id).select("-senha");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Não autorizado, token inválido" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Não autorizado, sem token" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Não autorizado como administrador" });
  }
};

module.exports = { protect, admin };
```

### Rotas de Usuário

```javascript
// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, admin } = require("../middleware/auth");

// Rotas públicas
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Rotas protegidas
router.get("/profile", protect, userController.getUserProfile);
router.put("/profile", protect, userController.updateUserProfile);

// Rotas de admin
router.get("/", protect, admin, userController.getUsers);
router.delete("/:id", protect, admin, userController.deleteUser);

module.exports = router;
```

### Aplicação Principal

```javascript
// src/app.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

// Inicializar Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api/users", userRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({ message: "API está funcionando..." });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
```

### Arquivo .env

```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/minha-api
JWT_SECRET=abc123
```

## Validação de Dados com Mongoose

O Mongoose fornece validação de esquema integrada, que é uma maneira poderosa de garantir que os dados inseridos no banco de dados estejam corretos. Vamos explorar algumas técnicas de validação:

### Validação Básica

```javascript
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome é obrigatório"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "O email é obrigatório"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Por favor, forneça um email válido"]
  },
  idade: {
    type: Number,
    min: [18, "A idade mínima é 18 anos"],
    max: [100, "A idade máxima é 100 anos"]
  },
  status: {
    type: String,
    enum: {
      values: ["ativo", "inativo", "pendente"],
      message: "{VALUE} não é um status válido"
    },
    default: "pendente"
  }
});
```

### Validação Personalizada

```javascript
const userSchema = new mongoose.Schema({
  // ... outros campos
  senha: {
    type: String,
    required: [true, "A senha é obrigatória"],
    minlength: [6, "A senha deve ter pelo menos 6 caracteres"],
    validate: {
      validator: function(v) {
        // Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(v);
      },
      message: props => "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
    }
  }
});
```

### Validação Assíncrona

```javascript
userSchema.path("email").validate(async function(value) {
  const emailCount = await mongoose.models.User.countDocuments({ email: value });
  return !emailCount; // Retorna true se o email não existir
}, "Email já está em uso");
```

## Conclusão

Neste capítulo, exploramos o MongoDB e como integrá-lo a aplicações Node.js usando o Mongoose. Vimos como configurar o MongoDB, definir esquemas e modelos com o Mongoose, realizar operações CRUD e implementar validação de dados.

Também criamos uma API RESTful completa com Express.js e MongoDB, incluindo autenticação de usuários com JWT, validação de dados e estruturação adequada do projeto.

No próximo capítulo, vamos explorar como usar o MySQL com Node.js para criar APIs RESTful, e depois compararemos as abordagens MongoDB e MySQL para ajudar você a escolher a melhor opção para seus projetos.



# Introdução ao MySQL e seu uso com Node.js

MySQL é um dos sistemas de gerenciamento de banco de dados relacionais (RDBMS) mais populares do mundo. Diferentemente do MongoDB, que é um banco de dados NoSQL orientado a documentos, o MySQL segue o modelo relacional, organizando dados em tabelas com linhas e colunas, e utilizando SQL (Structured Query Language) para manipulação dos dados.

## O que é MySQL?

MySQL é um sistema de gerenciamento de banco de dados relacional de código aberto baseado em SQL. Foi originalmente desenvolvido pela MySQL AB e agora é mantido pela Oracle Corporation. O MySQL é conhecido por sua confiabilidade, desempenho e facilidade de uso, sendo amplamente utilizado em aplicações web, desde pequenos sites até grandes plataformas como Facebook, Twitter e YouTube.

## Principais características do MySQL

### Modelo Relacional

O MySQL segue o modelo relacional, onde os dados são organizados em tabelas (relações) compostas por linhas (registros) e colunas (atributos). As tabelas podem ser relacionadas entre si através de chaves primárias e estrangeiras, permitindo a criação de estruturas de dados complexas e normalizadas.

### SQL (Structured Query Language)

O MySQL utiliza SQL como linguagem para definição, manipulação e consulta de dados. SQL é uma linguagem declarativa padronizada que permite realizar operações como criar tabelas, inserir, atualizar, excluir e consultar dados de forma eficiente.

### ACID Compliance

O MySQL suporta transações que seguem as propriedades ACID (Atomicidade, Consistência, Isolamento e Durabilidade), garantindo a integridade dos dados mesmo em caso de falhas do sistema.

### Escalabilidade e Desempenho

O MySQL oferece recursos para otimização de desempenho, como índices, cache de consultas e particionamento de tabelas. Além disso, suporta replicação e clustering para escalabilidade horizontal e alta disponibilidade.

### Segurança

O MySQL fornece um sistema robusto de segurança baseado em privilégios, permitindo controlar o acesso aos dados em diferentes níveis (servidor, banco de dados, tabela e coluna).

## Instalação e Configuração do MySQL

Antes de começarmos a usar o MySQL com Node.js, precisamos instalá-lo e configurá-lo. Vamos seguir os passos abaixo:

### 1. Instalação do MySQL

Para instalar o MySQL, você pode baixá-lo diretamente do site oficial (https://dev.mysql.com/downloads/) ou usar um gerenciador de pacotes como o apt (para Ubuntu) ou o brew (para macOS).

Para Ubuntu:

```bash
sudo apt update
sudo apt install -y mysql-server
```

Para verificar se a instalação foi bem-sucedida, execute:

```bash
sudo systemctl status mysql
```

### 2. Configuração Inicial

Após a instalação, é recomendável executar o script de segurança para configurar uma senha para o usuário root e remover algumas configurações padrão inseguras:

```bash
sudo mysql_secure_installation
```

Siga as instruções na tela para configurar a senha do root e outras opções de segurança.

### 3. Criação de Banco de Dados e Usuário

Vamos criar um banco de dados e um usuário específico para nossa aplicação:

```bash
sudo mysql -u root -p
```

Após inserir a senha do root, execute os seguintes comandos SQL:

```sql
CREATE DATABASE minha_api;
CREATE USER "api_user"@"localhost" IDENTIFIED BY "senha_segura";
GRANT ALL PRIVILEGES ON minha_api.* TO "api_user"@"localhost";
FLUSH PRIVILEGES;
EXIT;
```

## Node.js e MySQL

Para trabalhar com MySQL em aplicações Node.js, utilizamos bibliotecas específicas que facilitam a conexão e a execução de consultas SQL. As duas bibliotecas mais populares são:

1. **mysql2**: Uma versão melhorada da biblioteca mysql original, com suporte a Promises e melhor desempenho.
2. **Sequelize**: Um ORM (Object-Relational Mapping) para Node.js que suporta MySQL, PostgreSQL, SQLite e outros bancos de dados relacionais.

Neste guia, vamos explorar ambas as abordagens, começando com o mysql2 para entender os conceitos básicos e depois avançando para o Sequelize para uma abordagem mais estruturada e orientada a objetos.

### Usando mysql2

Primeiro, vamos instalar a biblioteca mysql2:

```bash
npm install mysql2
```

#### Conexão com o Banco de Dados

```javascript
const mysql = require("mysql2/promise");

// Configuração da conexão
const dbConfig = {
  host: "localhost",
  user: "api_user",
  password: "senha_segura",
  database: "minha_api"
};

// Função para criar pool de conexões
const createPool = async () => {
  try {
    const pool = mysql.createPool(dbConfig);
    console.log("Conexão com MySQL estabelecida");
    return pool;
  } catch (error) {
    console.error("Erro ao conectar ao MySQL:", error);
    throw error;
  }
};

module.exports = createPool;
```

#### Criação de Tabelas

```javascript
const createTables = async (pool) => {
  try {
    // Tabela de usuários
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(100) NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ativo BOOLEAN DEFAULT TRUE
      )
    `);

    // Tabela de posts
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(200) NOT NULL,
        conteudo TEXT NOT NULL,
        usuario_id INT NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      )
    `);

    console.log("Tabelas criadas com sucesso");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
    throw error;
  }
};
```

#### Operações CRUD com mysql2

Vamos implementar operações CRUD (Create, Read, Update, Delete) básicas para a entidade "usuário":

```javascript
// userModel.js
const createPool = require("../config/database");

let pool;

// Inicializar pool
const initPool = async () => {
  if (!pool) {
    pool = await createPool();
  }
  return pool;
};

// Criar usuário
const createUser = async (userData) => {
  try {
    const { nome, email, senha } = userData;
    const pool = await initPool();
    
    const [result] = await pool.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );
    
    return { id: result.insertId, nome, email };
  } catch (error) {
    throw error;
  }
};

// Buscar todos os usuários
const getAllUsers = async () => {
  try {
    const pool = await initPool();
    const [rows] = await pool.execute("SELECT id, nome, email, data_criacao, ativo FROM usuarios");
    return rows;
  } catch (error) {
    throw error;
  }
};

// Buscar usuário por ID
const getUserById = async (userId) => {
  try {
    const pool = await initPool();
    const [rows] = await pool.execute(
      "SELECT id, nome, email, data_criacao, ativo FROM usuarios WHERE id = ?",
      [userId]
    );
    
    if (rows.length === 0) {
      throw new Error("Usuário não encontrado");
    }
    
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Buscar usuário por email
const getUserByEmail = async (email) => {
  try {
    const pool = await initPool();
    const [rows] = await pool.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    
    if (rows.length === 0) {
      return null;
    }
    
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Atualizar usuário
const updateUser = async (userId, userData) => {
  try {
    const { nome, email } = userData;
    const pool = await initPool();
    
    const [result] = await pool.execute(
      "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
      [nome, email, userId]
    );
    
    if (result.affectedRows === 0) {
      throw new Error("Usuário não encontrado");
    }
    
    return { id: userId, nome, email };
  } catch (error) {
    throw error;
  }
};

// Excluir usuário
const deleteUser = async (userId) => {
  try {
    const pool = await initPool();
    const [result] = await pool.execute(
      "DELETE FROM usuarios WHERE id = ?",
      [userId]
    );
    
    if (result.affectedRows === 0) {
      throw new Error("Usuário não encontrado");
    }
    
    return { message: "Usuário excluído com sucesso" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
};
```

### Usando Sequelize (ORM)

O Sequelize é um ORM (Object-Relational Mapping) para Node.js que facilita o trabalho com bancos de dados relacionais, incluindo MySQL. Ele permite definir modelos, associações entre eles e realizar operações CRUD de forma mais orientada a objetos.

Vamos instalar o Sequelize e o driver do MySQL:

```bash
npm install sequelize mysql2
```

#### Configuração do Sequelize

```javascript
// src/config/database.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "minha_api",
  process.env.DB_USER || "api_user",
  process.env.DB_PASSWORD || "senha_segura",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
```

#### Definição de Modelos

```javascript
// src/models/userModel.js
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O nome é obrigatório"
      }
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: "Este email já está em uso"
    },
    validate: {
      isEmail: {
        msg: "Por favor, forneça um email válido"
      }
    }
  },
  senha: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
        msg: "A senha deve ter pelo menos 6 caracteres"
      }
    }
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: "usuarios",
  timestamps: true,
  createdAt: "data_criacao",
  updatedAt: "data_atualizacao"
});

// Hook para criptografar a senha antes de salvar
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.senha = await bcrypt.hash(user.senha, salt);
});

// Hook para criptografar a senha antes de atualizar
User.beforeUpdate(async (user) => {
  if (user.changed("senha")) {
    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(user.senha, salt);
  }
});

// Método para verificar senha
User.prototype.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.senha);
};

module.exports = User;
```

```javascript
// src/models/postModel.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./userModel");

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O título é obrigatório"
      }
    }
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O conteúdo é obrigatório"
      }
    }
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  }
}, {
  tableName: "posts",
  timestamps: true,
  createdAt: "data_criacao",
  updatedAt: "data_atualizacao"
});

// Definir associações
Post.belongsTo(User, { foreignKey: "usuario_id", as: "autor" });
User.hasMany(Post, { foreignKey: "usuario_id", as: "posts" });

module.exports = Post;
```

#### Sincronização de Modelos

```javascript
// src/models/index.js
const { sequelize } = require("../config/database");
const User = require("./userModel");
const Post = require("./postModel");

const syncModels = async () => {
  try {
    // Sincronizar todos os modelos
    // force: true recria as tabelas (use apenas em desenvolvimento)
    await sequelize.sync({ force: process.env.NODE_ENV === "development" });
    console.log("Modelos sincronizados com o banco de dados");
  } catch (error) {
    console.error("Erro ao sincronizar modelos:", error);
    throw error;
  }
};

module.exports = {
  syncModels,
  User,
  Post
};
```

#### Controllers com Sequelize

```javascript
// src/controllers/userController.js
const { User } = require("../models");
const jwt = require("jsonwebtoken");

// Gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// Registrar um novo usuário
exports.registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criar novo usuário
    const user = await User.create({
      nome,
      email,
      senha
    });

    res.status(201).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user.id)
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// Autenticar usuário e gerar token
exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    // Verificar se a senha está correta
    const isMatch = await user.matchPassword(senha);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter perfil do usuário
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["senha"] }
    });
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar perfil do usuário
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    user.nome = req.body.nome || user.nome;
    user.email = req.body.email || user.email;
    
    if (req.body.senha) {
      user.senha = req.body.senha;
    }

    await user.save();

    res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user.id)
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// Obter todos os usuários (admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["senha"] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Excluir usuário
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await user.destroy();
    res.json({ message: "Usuário removido" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Middleware de Autenticação (Sequelize)

O middleware de autenticação (`protect` e `admin`) pode ser adaptado para usar o Sequelize:

```javascript
// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["senha"] }
      });
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Não autorizado, token inválido" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Não autorizado, sem token" });
  }
};

const admin = (req, res, next) => {
  // Adicione uma coluna `isAdmin` ao modelo User se necessário
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Não autorizado como administrador" });
  }
};

module.exports = { protect, admin };
```

### Aplicação Principal (Sequelize)

```javascript
// src/app.js
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const { syncModels } = require("./models");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes"); // Adicionar rotas de posts
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

// Conectar ao banco de dados
connectDB();

// Sincronizar modelos (opcional, pode ser feito separadamente)
syncModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes); // Adicionar rotas de posts

app.get("/", (req, res) => {
  res.json({ message: "API com Sequelize está funcionando..." });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
```

## Validação de Dados com Sequelize

O Sequelize oferece validações integradas e personalizadas que podem ser definidas diretamente nos modelos.

### Validações Integradas

O Sequelize fornece várias validações prontas para uso, como `isEmail`, `notEmpty`, `len`, `min`, `max`, `isUrl`, etc.

```javascript
const User = sequelize.define("User", {
  // ...
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: { msg: "Este email já está em uso" },
    validate: {
      isEmail: { msg: "Por favor, forneça um email válido" }
    }
  },
  idade: {
    type: DataTypes.INTEGER,
    validate: {
      min: { args: [18], msg: "A idade mínima é 18 anos" },
      max: { args: [100], msg: "A idade máxima é 100 anos" }
    }
  }
});
```

### Validações Personalizadas

Você pode definir suas próprias funções de validação:

```javascript
const User = sequelize.define("User", {
  // ...
  senha: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isStrongPassword(value) {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)) {
          throw new Error("A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número");
        }
      }
    }
  }
});
```

## Conclusão

Neste capítulo, exploramos como usar o MySQL com Node.js para criar APIs RESTful. Vimos duas abordagens principais: usando a biblioteca `mysql2` para interação direta com o banco de dados e usando o ORM Sequelize para uma abordagem mais orientada a objetos.

Ambas as abordagens têm suas vantagens. O `mysql2` oferece mais controle sobre as consultas SQL, enquanto o Sequelize abstrai muitas das complexidades do SQL, facilitando a definição de modelos, associações e validações.

No próximo capítulo, faremos uma comparação detalhada entre MongoDB e MySQL para ajudar você a decidir qual banco de dados é mais adequado para suas necessidades ao construir APIs RESTful com Node.js.



# Comparação entre MongoDB e MySQL para APIs REST

Ao desenvolver APIs RESTful, a escolha do banco de dados é uma decisão crucial que afeta o desempenho, a escalabilidade e a manutenção da aplicação. Neste capítulo, vamos comparar MongoDB e MySQL, dois dos sistemas de banco de dados mais populares, analisando suas diferenças, vantagens e desvantagens, e discutindo cenários em que cada um é mais adequado.

## Diferenças Fundamentais

### Modelo de Dados

**MongoDB** é um banco de dados NoSQL orientado a documentos. Ele armazena dados em documentos semelhantes a JSON (BSON), que podem ter estruturas variáveis e aninhadas. Não há esquema rígido, o que significa que os documentos em uma coleção podem ter campos diferentes.

**MySQL** é um banco de dados relacional que armazena dados em tabelas com linhas e colunas. Ele segue um esquema rígido, onde cada tabela tem uma estrutura predefinida, e as relações entre tabelas são estabelecidas através de chaves primárias e estrangeiras.

### Linguagem de Consulta

**MongoDB** utiliza uma API de consulta baseada em JavaScript. As consultas são expressas como documentos JSON, o que torna a sintaxe familiar para desenvolvedores JavaScript.

**MySQL** utiliza SQL (Structured Query Language), uma linguagem declarativa padronizada para manipulação de dados em bancos de dados relacionais.

### Escalabilidade

**MongoDB** foi projetado para escalabilidade horizontal, permitindo distribuir dados em vários servidores (sharding) à medida que a aplicação cresce. Isso facilita o gerenciamento de grandes volumes de dados e tráfego.

**MySQL** tradicionalmente escala verticalmente (adicionando mais recursos ao servidor), embora também ofereça opções para escalabilidade horizontal, como replicação e clustering.

### Transações e Consistência

**MongoDB** suporta transações ACID (Atomicidade, Consistência, Isolamento e Durabilidade) em múltiplos documentos desde a versão 4.0, mas com algumas limitações em comparação com bancos de dados relacionais.

**MySQL** oferece suporte completo a transações ACID, garantindo a integridade dos dados mesmo em operações complexas que envolvem múltiplas tabelas.

## Vantagens e Desvantagens

### MongoDB

**Vantagens:**
- **Flexibilidade de esquema**: Ideal para dados não estruturados ou semiestruturados, permitindo evolução do modelo de dados sem migrações complexas.
- **Desempenho em leitura/escrita**: Geralmente oferece melhor desempenho para operações simples de leitura e escrita.
- **Escalabilidade horizontal**: Facilita a distribuição de dados em múltiplos servidores.
- **Integração natural com JavaScript**: Sintaxe familiar para desenvolvedores Node.js, com documentos semelhantes a objetos JavaScript.
- **Consultas geoespaciais**: Suporte nativo para consultas baseadas em localização.

**Desvantagens:**
- **Consumo de memória**: Pode consumir mais memória devido à natureza dos documentos BSON.
- **Complexidade em consultas relacionais**: Junções (joins) são mais complexas e menos eficientes em comparação com bancos de dados relacionais.
- **Menos maduro em transações**: Suporte a transações é mais recente e tem algumas limitações.
- **Curva de aprendizado para SQL developers**: Desenvolvedores familiarizados com SQL precisam aprender uma nova abordagem.

### MySQL

**Vantagens:**
- **Maturidade e estabilidade**: Sistema bem estabelecido com décadas de desenvolvimento e uso em produção.
- **Forte consistência de dados**: Garantia de integridade referencial e transações ACID completas.
- **Consultas complexas**: Excelente para consultas que envolvem múltiplas tabelas e agregações.
- **Eficiência em armazenamento**: Geralmente mais eficiente em termos de espaço de armazenamento.
- **Amplo suporte e ecossistema**: Grande comunidade, ferramentas e recursos disponíveis.

**Desvantagens:**
- **Rigidez de esquema**: Alterações no esquema podem ser complexas e exigir migrações cuidadosas.
- **Escalabilidade horizontal mais complexa**: Requer mais configuração e manutenção para escalar horizontalmente.
- **Desempenho em determinados cenários**: Pode ser mais lento para certos tipos de consultas e volumes de dados muito grandes.
- **Menos adequado para dados não estruturados**: Modelagem de dados hierárquicos ou variáveis é mais complexa.

## Cenários de Uso

### Quando escolher MongoDB

MongoDB é geralmente mais adequado para:

1. **Aplicações com dados não estruturados ou semiestruturados**: Quando o esquema dos dados pode mudar frequentemente ou varia significativamente entre registros.

2. **Desenvolvimento ágil e prototipagem rápida**: A flexibilidade de esquema permite iterar rapidamente sem migrações complexas.

3. **Aplicações com alta carga de leitura/escrita**: Especialmente quando as operações são relativamente simples e não envolvem muitas junções.

4. **Aplicações baseadas em localização**: O suporte nativo para consultas geoespaciais facilita o desenvolvimento de aplicações baseadas em localização.

5. **Microsserviços e arquiteturas orientadas a eventos**: A natureza flexível e independente dos documentos se alinha bem com esses padrões arquiteturais.

Exemplos de aplicações que se beneficiam do MongoDB:
- Redes sociais e plataformas de conteúdo
- Aplicações de IoT (Internet das Coisas)
- Sistemas de análise em tempo real
- Aplicações de comércio eletrônico com catálogos de produtos variáveis
- Aplicações móveis com requisitos de dados offline

### Quando escolher MySQL

MySQL é geralmente mais adequado para:

1. **Aplicações com dados altamente estruturados**: Quando o esquema dos dados é bem definido e relativamente estável.

2. **Sistemas que exigem integridade referencial rigorosa**: Quando a consistência dos dados é crítica e as relações entre entidades são complexas.

3. **Aplicações com consultas complexas**: Quando são necessárias consultas que envolvem múltiplas tabelas, agregações e análises complexas.

4. **Sistemas financeiros e transacionais**: Onde transações ACID completas são essenciais para garantir a integridade dos dados.

5. **Aplicações legadas ou integração com sistemas existentes**: Quando há necessidade de compatibilidade com sistemas que já utilizam SQL.

Exemplos de aplicações que se beneficiam do MySQL:
- Sistemas bancários e financeiros
- Sistemas de gestão empresarial (ERP)
- Sistemas de reservas e inventário
- Aplicações de comércio eletrônico com processamento de pedidos complexo
- Sistemas de gerenciamento de conteúdo (CMS) tradicionais

## Abordagem Híbrida

Em muitos casos, uma abordagem híbrida pode ser a melhor solução, utilizando diferentes bancos de dados para diferentes partes da aplicação, de acordo com suas necessidades específicas. Por exemplo:

- Usar MongoDB para armazenar dados de perfil de usuário, conteúdo gerado pelo usuário e logs, que podem ter estruturas variáveis.
- Usar MySQL para armazenar dados transacionais, financeiros e relacionais, que exigem integridade referencial e consultas complexas.

Esta abordagem, conhecida como persistência poliglota, permite aproveitar os pontos fortes de cada banco de dados, otimizando o desempenho e a manutenção da aplicação.

## Considerações para APIs RESTful

Ao desenvolver APIs RESTful, considere os seguintes fatores na escolha entre MongoDB e MySQL:

### Modelagem de Recursos

**MongoDB** facilita a modelagem de recursos que se alinham naturalmente com o formato JSON usado em APIs REST. Um documento MongoDB pode ser facilmente convertido em uma resposta JSON sem transformações complexas.

**MySQL** pode exigir junções e transformações para converter dados relacionais em respostas JSON estruturadas hierarquicamente.

### Evolução da API

**MongoDB** permite adicionar novos campos a recursos existentes sem afetar clientes antigos, facilitando a evolução da API sem quebrar a compatibilidade.

**MySQL** pode exigir migrações de esquema mais cuidadosas ao adicionar novos campos, embora isso possa ser gerenciado com ORMs como o Sequelize.

### Desempenho e Escalabilidade

**MongoDB** pode oferecer melhor desempenho para APIs com alto volume de requisições simples e pode escalar horizontalmente com mais facilidade.

**MySQL** pode ser mais eficiente para APIs que envolvem consultas complexas e relacionamentos entre recursos, mas pode exigir mais esforço para escalar horizontalmente.

## Conclusão

A escolha entre MongoDB e MySQL para APIs RESTful depende das necessidades específicas da sua aplicação, do modelo de dados, dos padrões de acesso e dos requisitos de escalabilidade.

MongoDB é uma excelente escolha quando a flexibilidade, a escalabilidade horizontal e o alinhamento natural com JSON são prioritários. É particularmente adequado para aplicações com dados não estruturados ou semiestruturados e para desenvolvimento ágil.

MySQL é uma escolha sólida quando a integridade referencial, as transações ACID completas e as consultas complexas são essenciais. É especialmente adequado para aplicações com dados altamente estruturados e relacionamentos complexos.

Em muitos casos, a melhor abordagem pode ser híbrida, utilizando o banco de dados mais adequado para cada parte da aplicação. O importante é avaliar cuidadosamente os requisitos do seu projeto e escolher a solução que melhor atenda às suas necessidades específicas.

Independentemente da escolha, tanto MongoDB quanto MySQL podem ser integrados eficientemente com Node.js para criar APIs RESTful robustas, escaláveis e de alto desempenho.

