import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Seção Hero */}
        <section className="text-center mb-16">
          <div className="mb-8">
            <div className="w-48 h-48 rounded-full mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-6xl text-white font-bold">JS</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Olá, eu sou <span className="text-blue-600">João Silva</span>
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
            <Link 
              to="/apps" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              Ver Apps
            </Link>
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
                Sou um desenvolvedor de aplicativos móveis com mais de 5 anos de experiência 
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
                <h3 className="text-2xl font-bold text-blue-600 mb-2">15+</h3>
                <p className="text-gray-600">Apps Publicados</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-green-600 mb-2">100k+</h3>
                <p className="text-gray-600">Downloads</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-purple-600 mb-2">5+</h3>
                <p className="text-gray-600">Anos de Experiência</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-orange-600 mb-2">4.7</h3>
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

