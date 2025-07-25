# Exemplo Prático - Site React.js para AdMob

Este é um exemplo prático funcional do site React.js desenvolvido seguindo o tutorial principal.

## Como Executar

1. **Instalar dependências:**
   ```bash
   cd exemplo-pratico
   npm install
   # ou
   pnpm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   pnpm run dev
   ```

3. **Acessar o site:**
   Abra seu navegador em `http://localhost:5173`

## Estrutura do Projeto

```
src/
├── components/
│   ├── Header.jsx      # Cabeçalho com navegação
│   ├── Footer.jsx      # Rodapé
│   └── Layout.jsx      # Layout principal
├── pages/
│   ├── Home.jsx        # Página inicial
│   ├── Apps.jsx        # Lista de aplicativos
│   ├── Contact.jsx     # Página de contato
│   └── Privacy.jsx     # Política de privacidade
├── App.jsx             # Componente principal com roteamento
└── main.jsx            # Ponto de entrada
```

## Personalização

Para personalizar este exemplo para seu uso:

1. **Informações Pessoais:**
   - Substitua "João Silva" pelo seu nome
   - Atualize informações de contato
   - Modifique a biografia e experiência

2. **Aplicativos:**
   - Edite a lista de apps em `src/pages/Apps.jsx`
   - Adicione links reais para Google Play e App Store
   - Inclua screenshots reais dos seus apps

3. **Política de Privacidade:**
   - Atualize com suas informações reais
   - Adicione políticas específicas dos seus apps
   - Mantenha as seções sobre AdMob

4. **Estilo:**
   - Modifique cores no arquivo `src/App.css`
   - Ajuste layout e componentes conforme necessário

## Deploy

Para fazer deploy do site:

1. **Build de produção:**
   ```bash
   npm run build
   ```

2. **Deploy em plataformas:**
   - **Netlify:** Faça upload da pasta `dist`
   - **Vercel:** Use `vercel --prod`
   - **GitHub Pages:** Configure com `gh-pages`

## Observações

- Este exemplo usa Tailwind CSS para estilização
- Todas as páginas são responsivas
- Formulário de contato é apenas demonstrativo
- Links para lojas de apps são placeholders

Personalize completamente antes de usar em produção!

