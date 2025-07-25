# Tutorial: Criando um Site React.js para Google AdMob

Este tutorial irá ensiná-lo a criar um site completo em React.js com todas as páginas necessárias para atender aos requisitos do Google AdMob. O site incluirá uma página inicial, política de privacidade, informações de contato e uma lista de aplicativos.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em seu sistema:
- Node.js (versão 14 ou superior)
- npm ou yarn
- Um editor de código (VS Code recomendado)

## Estrutura do Projeto

Nosso site terá as seguintes páginas:
1. **Página Inicial** - Apresentação como desenvolvedor
2. **Política de Privacidade** - Essencial para AdMob
3. **Contato** - Informações de contato
4. **Apps** - Lista dos seus aplicativos

## Passo 1: Criando o Projeto React

Primeiro, vamos criar um novo projeto React usando Create React App:

```bash
npx create-react-app meu-site-dev
cd meu-site-dev
```

## Passo 2: Instalando Dependências

Vamos instalar as dependências necessárias para roteamento e estilização:

```bash
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Passo 3: Configurando o Tailwind CSS

Edite o arquivo `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Substitua o conteúdo do arquivo `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Passo 4: Estrutura de Pastas

Organize seu projeto com a seguinte estrutura:

```
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   └── Layout.js
├── pages/
│   ├── Home.js
│   ├── Privacy.js
│   ├── Contact.js
│   └── Apps.js
├── App.js
├── index.js
└── index.css
```

## Passo 5: Criando o Layout Principal

Crie o arquivo `src/components/Layout.js`:

```javascript
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
```

## Passo 6: Criando o Header

Crie o arquivo `src/components/Header.js`:

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Seu Nome
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Início
              </Link>
            </li>
            <li>
              <Link to="/apps" className="hover:text-blue-200 transition-colors">
                Apps
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-200 transition-colors">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-200 transition-colors">
                Privacidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
```

## Passo 7: Criando o Footer

Crie o arquivo `src/components/Footer.js`:

```javascript
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 Seu Nome. Todos os direitos reservados.</p>
        <p className="mt-2 text-gray-400">
          Desenvolvedor de aplicativos móveis
        </p>
      </div>
    </footer>
  );
};

export default Footer;
```



## Passo 8: Criando a Página Inicial

Crie o arquivo `src/pages/Home.js`:

```javascript
import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Seção Hero */}
        <section className="text-center mb-16">
          <div className="mb-8">
            <img 
              src="/api/placeholder/200/200" 
              alt="Foto do desenvolvedor" 
              className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Olá, eu sou <span className="text-blue-600">Seu Nome</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Desenvolvedor de aplicativos móveis apaixonado por criar experiências 
            digitais incríveis que fazem a diferença na vida das pessoas.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="#sobre" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Saiba Mais
            </a>
            <a 
              href="/apps" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              Ver Apps
            </a>
          </div>
        </section>

        {/* Seção Sobre */}
        <section id="sobre" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Sobre Mim
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sou um desenvolvedor de aplicativos móveis com mais de X anos de experiência 
                criando soluções inovadoras para Android e iOS. Minha paixão é transformar 
                ideias em aplicativos funcionais e intuitivos que resolvem problemas reais.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Especializo-me em desenvolvimento nativo e híbrido, sempre focando na 
                experiência do usuário e na performance dos aplicativos. Cada projeto 
                é uma oportunidade de aprender algo novo e criar algo extraordinário.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">X+</h3>
                <p className="text-gray-600">Apps Publicados</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-green-600 mb-2">XXk+</h3>
                <p className="text-gray-600">Downloads</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-purple-600 mb-2">X+</h3>
                <p className="text-gray-600">Anos de Experiência</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-orange-600 mb-2">4.X</h3>
                <p className="text-gray-600">Avaliação Média</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Tecnologias */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Tecnologias que Utilizo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['React Native', 'Flutter', 'Android Studio', 'Xcode', 'Firebase', 'Node.js', 'MongoDB', 'Git'].map((tech) => (
              <div key={tech} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <p className="font-semibold text-gray-800">{tech}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
```

## Passo 9: Criando a Página de Política de Privacidade

Crie o arquivo `src/pages/Privacy.js`:

```javascript
import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Política de Privacidade
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Informações que Coletamos
            </h2>
            <p className="text-gray-600 mb-4">
              Nossos aplicativos podem coletar as seguintes informações:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Informações de dispositivo (modelo, sistema operacional, identificadores únicos)</li>
              <li>Dados de uso do aplicativo (recursos utilizados, tempo de uso)</li>
              <li>Informações de localização (quando permitido pelo usuário)</li>
              <li>Dados de crash e performance para melhorar a experiência</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Como Usamos suas Informações
            </h2>
            <p className="text-gray-600 mb-4">
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Personalizar a experiência do usuário</li>
              <li>Analisar o uso dos aplicativos</li>
              <li>Corrigir bugs e problemas técnicos</li>
              <li>Exibir anúncios relevantes através do Google AdMob</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              3. Google AdMob e Publicidade
            </h2>
            <p className="text-gray-600 mb-4">
              Nossos aplicativos utilizam o Google AdMob para exibir anúncios. O AdMob pode coletar e usar informações sobre você para fornecer anúncios personalizados. Isso inclui:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Identificadores de publicidade</li>
              <li>Informações de localização</li>
              <li>Dados de uso do aplicativo</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Você pode optar por não receber anúncios personalizados nas configurações do seu dispositivo.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. Compartilhamento de Informações
            </h2>
            <p className="text-gray-600 mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Com provedores de serviços (como Google AdMob) para funcionalidade do app</li>
              <li>Quando exigido por lei</li>
              <li>Para proteger nossos direitos e segurança</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Segurança dos Dados
            </h2>
            <p className="text-gray-600 mb-4">
              Implementamos medidas de segurança adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Seus Direitos
            </h2>
            <p className="text-gray-600 mb-4">
              Você tem o direito de:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações incorretas</li>
              <li>Solicitar a exclusão de suas informações</li>
              <li>Optar por não receber anúncios personalizados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              7. Contato
            </h2>
            <p className="text-gray-600 mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
            </p>
            <p className="text-gray-600">
              Email: seuemail@exemplo.com<br/>
              Website: www.seusite.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              8. Alterações nesta Política
            </h2>
            <p className="text-gray-600 mb-4">
              Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre como protegemos suas informações.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
```


## Passo 10: Criando a Página de Contato

Crie o arquivo `src/pages/Contact.js`:

```javascript
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar o envio do formulário
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Entre em Contato
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Vamos Conversar!
            </h2>
            <p className="text-gray-600 mb-8">
              Tem alguma ideia para um aplicativo? Quer discutir um projeto? 
              Ou apenas quer dizer olá? Ficarei feliz em ouvir de você!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">seuemail@exemplo.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Telefone</h3>
                  <p className="text-gray-600">+55 (11) 99999-9999</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Localização</h3>
                  <p className="text-gray-600">São Paulo, Brasil</p>
                </div>
              </div>
            </div>

            {/* Links Sociais */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-800 mb-4">Me siga nas redes sociais</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="bg-blue-800 text-white p-3 rounded-full hover:bg-blue-900 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Conte-me sobre seu projeto ou dúvida..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
```

## Passo 11: Criando a Página de Lista de Apps

Crie o arquivo `src/pages/Apps.js`:

```javascript
import React from 'react';

const Apps = () => {
  const apps = [
    {
      id: 1,
      name: "Meu App Incrível",
      description: "Um aplicativo revolucionário que facilita a vida das pessoas com funcionalidades únicas e interface intuitiva.",
      category: "Produtividade",
      downloads: "10k+",
      rating: 4.5,
      image: "/api/placeholder/300/200",
      playStoreLink: "#",
      appStoreLink: "#",
      features: ["Interface intuitiva", "Sincronização em nuvem", "Modo offline"]
    },
    {
      id: 2,
      name: "App de Fitness",
      description: "Seu companheiro pessoal para uma vida mais saudável, com treinos personalizados e acompanhamento de progresso.",
      category: "Saúde e Fitness",
      downloads: "25k+",
      rating: 4.7,
      image: "/api/placeholder/300/200",
      playStoreLink: "#",
      appStoreLink: "#",
      features: ["Treinos personalizados", "Tracking de atividades", "Comunidade ativa"]
    },
    {
      id: 3,
      name: "Organizador Pessoal",
      description: "Mantenha sua vida organizada com este poderoso aplicativo de gerenciamento de tarefas e lembretes.",
      category: "Produtividade",
      downloads: "15k+",
      rating: 4.3,
      image: "/api/placeholder/300/200",
      playStoreLink: "#",
      appStoreLink: "#",
      features: ["Lembretes inteligentes", "Categorização automática", "Relatórios de produtividade"]
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fillOpacity="0.5"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Meus Aplicativos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça os aplicativos que desenvolvi para tornar a vida das pessoas mais fácil e produtiva.
          </p>
        </div>

        <div className="grid gap-8">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={app.image} 
                    alt={app.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {app.name}
                      </h2>
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {app.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        {renderStars(app.rating)}
                        <span className="ml-2 text-gray-600">{app.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">{app.downloads} downloads</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {app.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Principais Funcionalidades:</h3>
                    <div className="flex flex-wrap gap-2">
                      {app.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <a 
                      href={app.playStoreLink}
                      className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      Google Play
                    </a>
                    <a 
                      href={app.appStoreLink}
                      className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                      </svg>
                      App Store
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tem uma ideia para um app?
          </h2>
          <p className="text-gray-600 mb-6">
            Vamos trabalhar juntos para transformar sua ideia em realidade!
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </div>
  );
};

export default Apps;
```


## Passo 12: Configurando o Roteamento

Edite o arquivo `src/App.js`:

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Apps from './pages/Apps';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
```

## Passo 13: Executando o Projeto

Para executar seu projeto React:

```bash
npm start
```

O site será aberto automaticamente em `http://localhost:3000`.

## Passo 14: Preparando para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Isso criará uma pasta `build` com os arquivos otimizados prontos para deploy.

## Passo 15: Deploy (Opcional)

Você pode fazer o deploy do seu site em várias plataformas:

### Netlify
1. Faça upload da pasta `build` no Netlify
2. Configure o domínio personalizado se desejar

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
1. Instale o pacote gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Adicione no `package.json`:
```json
{
  "homepage": "https://seuusuario.github.io/nome-do-repositorio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Execute o deploy:
```bash
npm run deploy
```

## Personalização Adicional

### Adicionando Google Analytics
Para acompanhar o tráfego do seu site, adicione o Google Analytics:

1. Instale o pacote:
```bash
npm install react-ga4
```

2. Configure no `src/index.js`:
```javascript
import ReactGA from 'react-ga4';

ReactGA.initialize('SEU_TRACKING_ID');
```

### SEO e Meta Tags
Para melhorar o SEO, adicione meta tags no `public/index.html`:

```html
<meta name="description" content="Desenvolvedor de aplicativos móveis especializado em React Native e Flutter">
<meta name="keywords" content="desenvolvedor, apps, mobile, React Native, Flutter">
<meta property="og:title" content="Seu Nome - Desenvolvedor de Apps">
<meta property="og:description" content="Desenvolvedor de aplicativos móveis especializado em React Native e Flutter">
<meta property="og:image" content="URL_DA_SUA_IMAGEM">
```

## Considerações Importantes para AdMob

1. **Política de Privacidade**: A página de política de privacidade é obrigatória para usar o AdMob. Certifique-se de personalizá-la com suas informações reais.

2. **Informações de Contato**: Mantenha suas informações de contato atualizadas e acessíveis.

3. **Lista de Apps**: Mantenha a lista de aplicativos atualizada com informações precisas sobre downloads e avaliações.

4. **Responsividade**: Certifique-se de que o site funciona bem em dispositivos móveis.

5. **Performance**: Otimize imagens e recursos para carregamento rápido.

## Conclusão

Parabéns! Você criou um site completo em React.js com todas as páginas necessárias para atender aos requisitos do Google AdMob. O site inclui:

- ✅ Página inicial profissional
- ✅ Política de privacidade completa
- ✅ Informações de contato
- ✅ Lista de aplicativos
- ✅ Design responsivo
- ✅ Navegação intuitiva

Lembre-se de personalizar todo o conteúdo com suas informações reais antes de publicar o site. Mantenha o site sempre atualizado com seus novos aplicativos e conquistas.

## Próximos Passos

1. Personalize todo o conteúdo com suas informações
2. Adicione suas próprias imagens e screenshots dos apps
3. Configure um domínio personalizado
4. Implemente Google Analytics para acompanhar visitantes
5. Otimize para SEO
6. Teste em diferentes dispositivos e navegadores

Seu site está pronto para ser usado como portfólio profissional e para atender aos requisitos do Google AdMob!

