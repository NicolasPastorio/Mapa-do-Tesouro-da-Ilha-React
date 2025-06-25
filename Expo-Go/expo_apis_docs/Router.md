# Roteador (Router)

`expo-router` é uma biblioteca de roteamento para aplicativos React Native e web. Ela permite o gerenciamento de navegação usando um sistema de roteamento baseado em arquivos e fornece componentes de navegação nativos e é construída sobre o [React Navigation](https://reactnavigation.org/).

## Instalação

Para usar o Expo Router em seu projeto, você precisa instalá-lo. Siga as instruções do guia [Instalar Expo Router](https://docs.expo.dev/router/installation/).

## Configuração no app config

Se você estiver usando o modelo padrão para criar um novo projeto, o `expo-router` é configurado automaticamente no `app.json` com o [config plugin](https://docs.expo.dev/guides/config-plugins/).

Exemplo de `app.json` com config plugin:

```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

## Uso

Encontre mais informações e guias sobre como usar o `expo-router` no [Expo Router](https://docs.expo.dev/router/introduction/) docs.

## API

### Componentes

#### `ErrorBoundary`

Um componente que captura erros em sua árvore de componentes filhos e renderiza uma UI de fallback. Útil para lidar com erros de navegação.

#### `Link`

Um componente para navegar entre rotas. É um wrapper em torno do componente `Link` do React Navigation.

Propriedades:

*   `href`: O caminho para o qual navegar.
*   `asChild`: Se o componente deve renderizar seu filho como um link.
*   `replace`: Se a navegação deve substituir a rota atual no histórico.
*   `push`: Se a navegação deve adicionar uma nova rota à pilha.
*   `download`: Se o `href` deve ser baixado quando o usuário clicar no link, em vez de navegar para ele. Útil para links que apontam para arquivos que o usuário deve baixar, como PDFs, imagens, documentos e muito mais.
*   `rel`: Especifica a relação entre o `href` e a rota atual. Valores comuns: `nofollow`, `noopener`, `noreferrer`.

Exemplo:

```javascript
import { Link } from "expo-router";

export default function Page() {
  return (
    <Link href="/details" style={{ fontSize: 20, color: "blue" }}>
      Ir para Detalhes
    </Link>
  );
}
```

#### `Redirect`

Um componente que redireciona o usuário para outra rota.

Propriedades:

*   `href`: O caminho para o qual redirecionar.

Exemplo:

```javascript
import { Redirect } from "expo-router";

export default function Page() {
  return <Redirect href="/home" />;
}
```

#### `Slot`

Um componente que renderiza o conteúdo da rota filha correspondente. Usado em layouts para definir onde o conteúdo da rota filha será renderizado.

Exemplo:

```javascript
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <>
      {/* Conteúdo do layout */}
      <Slot />
      {/* Mais conteúdo do layout */}
    </>
  );
}
```

### Hooks

#### `useFocusEffect()`

Um hook que executa um efeito quando a tela está focada. Útil para buscar dados ou adicionar ouvintes quando uma tela se torna ativa.

#### `useGlobalSearchParams()`

Retorna os parâmetros de pesquisa globais da URL. Útil para acessar parâmetros de consulta que são compartilhados entre várias rotas.

#### `useLocalSearchParams()`

Retorna os parâmetros de pesquisa locais da URL para a rota atual. Útil para acessar parâmetros de consulta específicos da rota atual.

#### `useNavigation()`

Retorna o objeto de navegação. Útil para navegação imperativa.

#### `useNavigationContainerRef()`

Retorna uma referência ao contêiner de navegação. Útil para acessar o estado de navegação global.

#### `usePathname()`

Retorna o caminho da URL atual. Útil para determinar a rota atual.

#### `useRootNavigation()`

Retorna o objeto de navegação raiz. Útil para navegar para rotas de nível superior.

#### `useRootNavigationState()`

Retorna o estado de navegação raiz. Útil para acessar o estado de navegação global.

#### `useRouter()`

Retorna um objeto roteador que contém métodos para navegação imperativa, como `push`, `replace`, `back` e `setParams`.

Exemplo:

```javascript
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <Button
      title="Ir para Detalhes"
      onPress={() => router.push("/details")}
    />
  );
}
```

#### `useSegments()`

Retorna os segmentos do caminho da URL atual. Útil para construir navegação dinâmica.

### Métodos

#### `Sitemap()`

Um método para gerar um sitemap para o seu aplicativo. Útil para SEO e descoberta de rotas.

#### `withLayoutContext()`

Um HOC (Higher-Order Component) que injeta o contexto do layout em um componente. Útil para acessar o contexto do layout em componentes aninhados.

### Tipos

#### `EffectCallback()`

Um tipo para funções de callback de efeito.

#### `ExternalPathString`

Um tipo para strings de caminho externo.

#### `Href`

Um tipo para referências de hiperlink.

#### `HrefObject`

Um tipo para objetos de referência de hiperlink.

#### `NativeIntent`

Um tipo para intenções nativas.

#### `PickPartial`

Um tipo utilitário para tornar algumas propriedades de um tipo opcionais.

---

**Autor:** Manus AI
**Data de Geração:** 19 de Junho de 2025

