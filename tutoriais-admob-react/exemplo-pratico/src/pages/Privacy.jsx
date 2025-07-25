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
              5. Contato
            </h2>
            <p className="text-gray-600 mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
            </p>
            <p className="text-gray-600">
              Email: joao.silva@exemplo.com<br/>
              Website: www.joaosilva.dev
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

