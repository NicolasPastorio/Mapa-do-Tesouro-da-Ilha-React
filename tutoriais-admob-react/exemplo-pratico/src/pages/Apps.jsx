import React from 'react';
import { Star, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Apps = () => {
  const apps = [
    {
      id: 1,
      name: "TaskMaster Pro",
      description: "Um aplicativo revolucionário de gerenciamento de tarefas que facilita a organização da sua vida pessoal e profissional com funcionalidades únicas e interface intuitiva.",
      category: "Produtividade",
      downloads: "25k+",
      rating: 4.5,
      features: ["Interface intuitiva", "Sincronização em nuvem", "Modo offline", "Lembretes inteligentes"]
    },
    {
      id: 2,
      name: "FitTracker",
      description: "Seu companheiro pessoal para uma vida mais saudável, com treinos personalizados, acompanhamento de progresso e comunidade ativa de usuários.",
      category: "Saúde e Fitness",
      downloads: "50k+",
      rating: 4.7,
      features: ["Treinos personalizados", "Tracking de atividades", "Comunidade ativa", "Relatórios detalhados"]
    },
    {
      id: 3,
      name: "ExpenseTracker",
      description: "Mantenha suas finanças organizadas com este poderoso aplicativo de controle de gastos, orçamento e relatórios financeiros detalhados.",
      category: "Finanças",
      downloads: "15k+",
      rating: 4.3,
      features: ["Controle de gastos", "Orçamento mensal", "Relatórios gráficos", "Categorização automática"]
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 text-yellow-400 fill-current opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
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
                  <div className="w-full h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="text-lg font-semibold">{app.name}</div>
                    </div>
                  </div>
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
                      <div className="flex items-center text-sm text-gray-500">
                        <Download className="w-4 h-4 mr-1" />
                        {app.downloads} downloads
                      </div>
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
                    <button className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Google Play
                    </button>
                    <button className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      App Store
                    </button>
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
          <Link 
            to="/contact" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Entre em Contato
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Apps;

