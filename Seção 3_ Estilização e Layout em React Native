## Seção 3: Estilização e Layout em React Native

Com uma boa compreensão dos componentes básicos do React Native, o próximo passo crucial é aprender como estilizá-los e organizá-los na tela para criar interfaces de usuário visualmente atraentes e funcionais. Nesta seção, vamos mergulhar no sistema de estilização do React Native, que, embora inspirado no CSS da web, possui suas particularidades. Abordaremos o `StyleSheet` para criar estilos otimizados, discutiremos a estilização inline, exploraremos as unidades de medida e cores, e, mais importante, desvendaremos o poder do Flexbox para construir layouts responsivos e adaptáveis a diferentes tamanhos de tela. Além disso, cobriremos conceitos de posicionamento e dimensionamento de elementos.

Uma interface bem projetada não é apenas sobre aparência; é sobre usabilidade e experiência do usuário. Dominar as técnicas de estilização e layout em React Native permitirá que você traduza designs complexos em aplicativos móveis polidos e profissionais.

### Introdução ao `StyleSheet`

No React Native, os estilos não são escritos em arquivos CSS separados como na web. Em vez disso, você define os estilos usando JavaScript, geralmente através do módulo `StyleSheet` fornecido pela framework. O `StyleSheet.create()` é usado para definir um conjunto de estilos de forma otimizada.

Usar `StyleSheet.create` em vez de objetos JavaScript simples para estilos tem algumas vantagens:

1.  **Performance:** Os estilos criados com `StyleSheet.create` são enviados pela bridge nativa apenas uma vez e referenciados por um ID. Isso pode levar a um melhor desempenho, especialmente para estilos complexos ou usados em muitos lugares, pois evita a recriação e a passagem repetida de objetos de estilo.
2.  **Validação:** `StyleSheet` pode validar os estilos que você está definindo, ajudando a pegar erros (como propriedades de estilo inválidas ou valores incorretos) mais cedo no desenvolvimento.
3.  **Organização:** Agrupa todos os seus estilos em um local claro e definido, tornando o código mais legível e fácil de manter.

**Como usar `StyleSheet.create`:**

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExemploStyleSheet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, StyleSheet!</Text>
      <Text style={[styles.paragrafo, styles.textoDestacado]}>Este é um parágrafo com múltiplos estilos.</Text>
      <View style={styles.caixaColorida} />
    </View>
  );
};

// Definindo os estilos usando StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'dodgerblue',
    marginBottom: 10,
  },
  paragrafo: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  textoDestacado: {
    color: 'tomato',
    fontStyle: 'italic',
  },
  caixaColorida: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgreen',
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'darkgreen',
    borderRadius: 10,
  },
});

export default ExemploStyleSheet;
```

No exemplo acima:
*   Importamos `StyleSheet` de `react-native`.
*   Chamamos `StyleSheet.create()` passando um objeto onde cada chave (`container`, `titulo`, etc.) é um nome para um conjunto de estilos, e o valor é um objeto com as declarações de estilo (propriedade: valor).
*   No componente, aplicamos os estilos usando a prop `style`. Por exemplo, `style={styles.container}`.
*   É possível aplicar múltiplos estilos a um componente passando um array de objetos de estilo para a prop `style`, como em `style={[styles.paragrafo, styles.textoDestacado]}`. Os estilos no array são aplicados da esquerda para a direita, então estilos posteriores no array podem sobrescrever estilos anteriores se houver conflito de propriedades.

As propriedades de estilo em React Native são nomeadas usando `camelCase` (ex: `backgroundColor`, `fontSize`, `fontWeight`) em vez de `kebab-case` (ex: `background-color`) como no CSS tradicional.

### Estilização Inline vs. `StyleSheet`

Além de usar `StyleSheet.create`, você também pode aplicar estilos diretamente a um componente usando um objeto JavaScript inline na prop `style`. Isso é conhecido como **estilização inline**.

```javascript
import React from 'react';
import { View, Text } from 'react-native';

const ExemploEstiloInline = () => {
  const corDoTextoVariavel = 'purple';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text 
        style={{
          fontSize: 20,
          color: corDoTextoVariavel, // Usando uma variável no estilo inline
          fontWeight: 'bold',
          padding: 10,
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 5,
        }}
      >
        Texto com Estilo Inline
      </Text>
    </View>
  );
};

export default ExemploEstiloInline;
```

**Quando usar qual?**

*   **`StyleSheet.create` (Preferível na maioria dos casos):**
    *   **Melhor performance:** Como mencionado, os estilos são otimizados.
    *   **Código mais limpo e organizado:** Separa os estilos da lógica do componente, tornando o JSX menos verboso.
    *   **Reutilização:** Fácil de reutilizar os mesmos estilos em múltiplos componentes ou em diferentes partes do mesmo componente.
    *   **Validação:** Ajuda a pegar erros de digitação ou propriedades inválidas.

*   **Estilização Inline:**
    *   **Estilos Dinâmicos:** Útil para estilos que mudam com base no estado ou props do componente, onde criar todas as variações no `StyleSheet` seria impraticável. No exemplo acima, `corDoTextoVariavel` é um bom caso para inline se essa cor mudar frequentemente.
    *   **Pequenos Ajustes ou Prototipação Rápida:** Para um ajuste muito específico e pequeno em um único componente, ou durante a prototipação, pode ser mais rápido usar inline.
    *   **Componentes Únicos:** Se um estilo é verdadeiramente único para uma instância de um componente e não será reutilizado.

**Combinação:** É comum usar `StyleSheet` para a maioria dos estilos e complementar com estilos inline para ajustes dinâmicos. Você pode combinar estilos de `StyleSheet` com estilos inline em um array:

```javascript
// ... (styles definidos com StyleSheet.create)
const MeuComponente = ({ isActive }) => {
  return (
    <View style={[styles.base, isActive ? styles.active : styles.inactive]}>
      <Text style={[styles.textoBase, { color: isActive ? 'green' : 'red' }]}>
        Status: {isActive ? 'Ativo' : 'Inativo'}
      </Text>
    </View>
  );
};
```
Neste caso, `styles.base`, `styles.active`, `styles.inactive`, e `styles.textoBase` viriam de um `StyleSheet.create`, enquanto `{ color: isActive ? 'green' : 'red' }` é um estilo inline dinâmico.

Em geral, a recomendação é favorecer `StyleSheet.create` pela organização e performance, e usar estilos inline criteriosamente para casos dinâmicos ou muito específicos.

### Unidades de Medida e Cores

**Unidades de Medida:**

No React Native, a maioria das dimensões e posições são especificadas como **números adimensionais**, que correspondem a **pixels independentes de densidade (dp ou dip)**. Isso significa que o React Native tenta fazer com que os elementos tenham aproximadamente o mesmo tamanho físico em telas com diferentes densidades de pixels.

*   **Números:** `width: 100`, `height: 50`, `fontSize: 16`, `margin: 10`, `padding: 5`, `borderWidth: 1`.
    Estes são os mais comuns e recomendados.

*   **Porcentagens:** Você também pode usar strings de porcentagem para `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`, `flexBasis`. A porcentagem é relativa ao elemento pai.
    `width: '50%'` (ocupa 50% da largura do pai).
    O suporte a porcentagens pode ter algumas nuances dependendo da propriedade e do contexto do layout, especialmente com Flexbox.

Unidades como `em`, `rem`, `vw`, `vh` do CSS web não são diretamente suportadas da mesma forma. Para responsividade baseada no tamanho da tela, você pode usar o módulo `Dimensions` para obter as dimensões da tela e calcular os tamanhos dinamicamente, ou usar bibliotecas de terceiros que ajudam com isso.

```javascript
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.8, // 80% da largura da janela
    height: windowHeight / 2,  // Metade da altura da janela
  },
  imagemResponsiva: {
    width: '100%', // 100% da largura do container pai
    aspectRatio: 16 / 9, // Mantém a proporção 16:9, altura será calculada
  }
});
```

**Cores:**

React Native suporta várias formas de definir cores, similar ao CSS:

1.  **Nomes de Cores (Named Colors):** Um subconjunto dos nomes de cores do CSS é suportado (ex: `'red'`, `'blue'`, `'green'`, `'black'`, `'white'`, `'transparent'`).
    `color: 'tomato'`
    `backgroundColor: 'skyblue'`

2.  **Hexadecimal (RGB e RGBA):**
    *   `'#RRGGBB'` (ex: `'#FF0000'` para vermelho)
    *   `'#RGB'` (forma curta, ex: `'#F00'` para vermelho)
    *   `'#RRGGBBAA'` (com canal alfa para transparência, ex: `'#FF000080'` para vermelho com 50% de opacidade)
    *   `'#RGBA'` (forma curta com alfa, ex: `'#F008'` para vermelho com 50% de opacidade)
    `color: '#333333'`
    `backgroundColor: '#00FF007F'` (verde com aproximadamente 50% de opacidade)

3.  **Funções `rgb()` e `rgba()`:**
    *   `'rgb(R, G, B)'` (valores de 0 a 255, ex: `'rgb(255, 0, 0)'`)
    *   `'rgba(R, G, B, A)'` (A é de 0.0 a 1.0 para opacidade, ex: `'rgba(0, 0, 255, 0.5)'` para azul com 50% de opacidade)
    `color: 'rgb(123, 104, 238)'`
    `backgroundColor: 'rgba(255, 165, 0, 0.75)'` (laranja com 75% de opacidade)

4.  **Funções `hsl()` e `hsla()` (Hue, Saturation, Lightness, Alpha):**
    *   `'hsl(H, S%, L%)'` (H de 0 a 360, S e L de 0% a 100%)
    *   `'hsla(H, S%, L%, A)'` (A de 0.0 a 1.0)
    `color: 'hsl(120, 100%, 50%)'` (verde puro)
    `backgroundColor: 'hsla(240, 100%, 50%, 0.3)'` (azul com 30% de opacidade)

5.  **`currentColor` (Experimental/Limitado):** Em alguns contextos, pode herdar a cor do pai.

6.  **`PlatformColor` e `DynamicColorIOS`:** Para usar cores definidas nativamente pela plataforma (ex: cores do sistema que se adaptam ao modo claro/escuro). Requer configuração mais específica e pode ser mais avançado.

É uma boa prática definir suas cores principais em um arquivo de constantes ou tema para fácil reutilização e manutenção, especialmente em aplicativos maiores.

```javascript
// utils/colors.js (exemplo)
export const COLORS = {
  primary: 'dodgerblue',
  secondary: 'tomato',
  text: '#333',
  background: '#fff',
  lightGrey: '#ccc',
  transparent: 'transparent',
};

// No seu componente:
// import { COLORS } from './utils/colors';
// ...
// titulo: { color: COLORS.primary }
```

### Layout com Flexbox

Flexbox é o principal mecanismo de layout em React Native. Se você já usou Flexbox no CSS para web, muitos conceitos serão familiares, embora existam algumas diferenças e padrões específicos no React Native.

Por padrão, todos os componentes `View` em React Native usam Flexbox para layout. A propriedade `flexDirection` por padrão é `column` (diferente do padrão `row` na web). Isso significa que os itens dentro de uma `View` são empilhados verticalmente.

**Principais Propriedades do Flexbox (Aplicadas ao Container Pai):**

1.  **`flexDirection`**: Define o eixo principal do layout. Os itens filhos serão dispostos ao longo deste eixo.
    *   `'column'` (padrão): Itens empilhados verticalmente (de cima para baixo).
    *   `'row'`: Itens dispostos horizontalmente (da esquerda para a direita).
    *   `'column-reverse'`: Itens empilhados verticalmente (de baixo para cima).
    *   `'row-reverse'`: Itens dispostos horizontalmente (da direita para a esquerda).

2.  **`justifyContent`**: Alinha os filhos ao longo do eixo principal (definido por `flexDirection`).
    *   `'flex-start'` (padrão): Alinha os itens no início do eixo principal.
    *   `'flex-end'`: Alinha os itens no final do eixo principal.
    *   `'center'`: Alinha os itens no centro do eixo principal.
    *   `'space-between'`: Distribui os itens uniformemente no eixo principal; o primeiro item no início, o último no final, com espaço igual entre os demais.
    *   `'space-around'`: Distribui os itens uniformemente com espaço igual ao redor deles (incluindo antes do primeiro e depois do último, resultando em metade do espaço nas extremidades em comparação com o espaço entre os itens).
    *   `'space-evenly'`: Distribui os itens uniformemente com espaço igual entre eles e nas extremidades.

3.  **`alignItems`**: Alinha os filhos ao longo do eixo transversal (perpendicular ao eixo principal).
    *   `'stretch'` (padrão): Estica os itens para preencher a altura (se `flexDirection: 'row'`) ou largura (se `flexDirection: 'column'`) do container, respeitando `min/max-width/height`.
    *   `'flex-start'`: Alinha os itens no início do eixo transversal.
    *   `'flex-end'`: Alinha os itens no final do eixo transversal.
    *   `'center'`: Alinha os itens no centro do eixo transversal.
    *   `'baseline'`: Alinha os itens de acordo com suas linhas de base de texto (mais relevante para componentes `Text`).

4.  **`flexWrap`**: Controla se os itens devem quebrar para a próxima linha quando não couberem no eixo principal.
    *   `'nowrap'` (padrão): Os itens tentarão caber em uma única linha (podendo transbordar).
    *   `'wrap'`: Os itens quebram para a próxima linha se necessário.
    *   `'wrap-reverse'`: Os itens quebram para a próxima linha na direção oposta.

5.  **`alignContent`**: Similar ao `justifyContent`, mas alinha as linhas de um container multi-linha (quando `flexWrap` é `wrap` ou `wrap-reverse`) ao longo do eixo transversal. Não tem efeito se houver apenas uma linha de itens.
    *   Valores: `'flex-start'`, `'flex-end'`, `'center'`, `'stretch'` (padrão), `'space-between'`, `'space-around'`.

**Principais Propriedades do Flexbox (Aplicadas aos Itens Filhos):**

1.  **`flex`**: Define a capacidade de um item filho de crescer ou encolher para preencher o espaço disponível ao longo do eixo principal. É um número adimensional.
    *   `flex: <número positivo>`: O item crescerá proporcionalmente ao seu valor de `flex` em relação aos outros itens flexíveis. Por exemplo, se um item tem `flex: 2` e outro `flex: 1`, o primeiro ocupará o dobro do espaço do segundo.
    *   `flex: 0`: O item não crescerá nem encolherá, usando seu tamanho base (definido por `width`/`height` ou conteúdo).
    *   `flex: -1`: O item encolherá se necessário, mas não mais do que seu tamanho base.
    *   **Importante:** `flex: 1` em um componente filho fará com que ele ocupe todo o espaço disponível no container pai ao longo do eixo principal, após os outros itens terem sido dimensionados.

2.  **`alignSelf`**: Permite que um item filho individual sobrescreva o `alignItems` definido pelo container pai.
    *   Valores: `'auto'` (padrão, herda de `alignItems`), `'flex-start'`, `'flex-end'`, `'center'`, `'stretch'`, `'baseline'`.

3.  **`flexGrow`**: Especifica o fator de crescimento de um item flexível. Similar a `flex: <número>` quando o número é positivo.

4.  **`flexShrink`**: Especifica o fator de encolhimento de um item flexível. Controla o quanto um item pode encolher se não houver espaço suficiente.

5.  **`flexBasis`**: Define o tamanho inicial de um item flexível ao longo do eixo principal antes que o espaço restante seja distribuído. Pode ser um número (dp) ou uma porcentagem.

**Exemplo Prático de Layout com Flexbox:**

```javascript
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ExemploFlexbox = () => {
  return (
    <View style={styles.containerPrincipal}> // Container principal ocupa toda a tela
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.textoHeader}>Cabeçalho</Text>
      </View>

      {/* Conteúdo Principal com Sidebar e Área de Conteúdo */}
      <View style={styles.corpo}> 
        {/* Sidebar (ocupa 1 parte do espaço) */}
        <View style={styles.sidebar}>
          <Text style={styles.texto}>Sidebar</Text>
        </View>
        {/* Área de Conteúdo (ocupa 2 partes do espaço) */}
        <View style={styles.conteudoPrincipal}>
          <Text style={styles.texto}>Conteúdo Principal</Text>
          <View style={styles.caixaInterna} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.textoFooter}>Rodapé</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1, // Faz o container ocupar toda a altura disponível
    flexDirection: 'column', // Padrão, mas explícito aqui
  },
  header: {
    height: 60,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoHeader: { fontSize: 18, color: 'white' },
  corpo: {
    flex: 1, // Ocupa o espaço restante entre header e footer
    flexDirection: 'row', // Sidebar e Conteúdo Principal lado a lado
    backgroundColor: '#f0f0f0',
  },
  sidebar: {
    flex: 1, // Ocupa 1/3 do espaço horizontal (1 de 1+2)
    backgroundColor: 'steelblue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudoPrincipal: {
    flex: 2, // Ocupa 2/3 do espaço horizontal (2 de 1+2)
    backgroundColor: 'powderblue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: { fontSize: 16, color: 'white' },
  caixaInterna: {
    width: 50,
    height: 50,
    backgroundColor: 'navy',
    marginTop: 10,
  },
  footer: {
    height: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFooter: { fontSize: 16, color: '#333' },
});

export default ExemploFlexbox;
```
Neste exemplo:
*   O `containerPrincipal` usa `flex: 1` para ocupar toda a tela e `flexDirection: 'column'` para empilhar header, corpo e footer.
*   O `corpo` usa `flex: 1` para ocupar o espaço vertical restante e `flexDirection: 'row'` para colocar `sidebar` e `conteudoPrincipal` lado a lado.
*   `sidebar` e `conteudoPrincipal` usam `flex: 1` e `flex: 2` respectivamente para dividir o espaço horizontal do `corpo` na proporção de 1:2.
*   `justifyContent` e `alignItems` são usados extensivamente para centralizar conteúdo dentro de cada seção.

Flexbox é extremamente poderoso e é a base para criar layouts responsivos em React Native. Praticar com diferentes combinações de suas propriedades é a melhor maneira de dominá-lo.

### Posicionamento (Absolute e Relative)

Além do Flexbox, o React Native suporta duas formas de posicionamento que são familiares do CSS: `relative` (padrão) e `absolute`.

*   **`position: 'relative'` (Padrão):**
    Quando um elemento tem `position: 'relative'`, ele é posicionado de acordo com o fluxo normal do layout (geralmente determinado pelo Flexbox). Você pode então usar as propriedades `top`, `bottom`, `left`, e `right` para deslocá-lo em relação à sua posição normal. Esse deslocamento não afeta a posição de outros elementos; eles se comportam como se o elemento relativo ainda estivesse em sua posição original.

*   **`position: 'absolute'`:**
    Quando um elemento tem `position: 'absolute'`, ele é removido do fluxo normal do layout. Sua posição é determinada em relação ao seu ancestral posicionado mais próximo (um ancestral que tenha `position: 'relative'` ou `position: 'absolute'`). Se não houver ancestral posicionado, ele é posicionado em relação ao container raiz (geralmente a tela inteira).
    As propriedades `top`, `bottom`, `left`, e `right` são usadas para especificar a distância das bordas do container de referência.
    Elementos posicionados absolutamente não ocupam espaço no layout para outros elementos.

**Exemplo de Posicionamento:**

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExemploPosicionamento = () => {
  return (
    <View style={styles.container}>
      <View style={styles.caixaRelativaPai}>
        <Text>Caixa Relativa Pai</Text>
        <View style={styles.caixaRelativaFilha}>
          <Text>Caixa Relativa Filha (deslocada)</Text>
        </View>
      </View>

      <View style={styles.caixaAbsolutaContainer}>
        <Text>Container para Absoluta</Text>
        <View style={styles.caixaAbsoluta}>
          <Text style={{ color: 'white' }}>Absoluta</Text>
        </View>
        <View style={styles.outraCaixaAbsoluta}>
          <Text style={{ color: 'white' }}>Outra Absoluta</Text>
        </View>
      </View>
      
      <View style={styles.badgeContainer}>
        <Text>Item com Badge</Text>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  caixaRelativaPai: {
    width: 200,
    height: 100,
    backgroundColor: 'lightcoral',
    padding: 10,
    marginBottom: 70, // Espaço para a filha deslocada não sobrepor o próximo
  },
  caixaRelativaFilha: {
    position: 'relative', // Já é o padrão, mas explícito
    top: 20, // Desloca 20dp para baixo da sua posição normal
    left: 20, // Desloca 20dp para a direita da sua posição normal
    width: 150,
    height: 50,
    backgroundColor: 'lightsalmon',
    padding: 5,
  },
  caixaAbsolutaContainer: {
    width: 250,
    height: 150,
    backgroundColor: 'lightseagreen',
    padding: 10,
    // position: 'relative', // Se este fosse o container de referência para as absolutas
    marginTop: 20,
    marginBottom: 70,
  },
  caixaAbsoluta: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 80,
    height: 40,
    backgroundColor: 'darkslateblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outraCaixaAbsoluta: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
    backgroundColor: 'purple',
  },
  badgeContainer: {
    backgroundColor: 'gold',
    padding: 15,
    borderRadius: 5,
    // position: 'relative', // Necessário para o badge absoluto se posicionar corretamente dentro dele
    width: 150,
    alignSelf: 'center',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default ExemploPosicionamento;
```

O posicionamento absoluto é frequentemente usado para sobrepor elementos, como modais, tooltips, badges ou botões flutuantes.

**`zIndex` (iOS e Android a partir de certas versões):**

A propriedade `zIndex` (um número) pode ser usada para controlar a ordem de empilhamento de elementos posicionados (especialmente os absolutos). Um elemento com `zIndex` maior será renderizado na frente de um elemento com `zIndex` menor. O suporte e comportamento podem ter algumas nuances entre plataformas e versões do React Native, mas geralmente funciona como esperado para elementos irmãos.

### Dimensões (Width, Height, Percentages)

Controlar as dimensões dos seus componentes é fundamental para o layout.

*   **`width` e `height`:** Podem ser definidos com números (dp) ou porcentagens (string).
    ```javascript
    style={{ width: 150, height: 100 }}
    style={{ width: '80%', height: '50%' }} // Relativo ao pai
    ```

*   **`minWidth`, `maxWidth`, `minHeight`, `maxHeight`:** Úteis para restringir o tamanho de um componente.

*   **`aspectRatio`:** Uma propriedade muito útil, especialmente para imagens ou vídeos, para manter a proporção (largura/altura). Se você definir `width` e `aspectRatio`, a `height` será calculada automaticamente, e vice-versa.
    `style={{ width: '100%', aspectRatio: 16/9 }}` // Imagem widescreen
    `style={{ height: 100, aspectRatio: 1 }}` // Quadrado de 100x100

*   **Obtendo Dimensões da Tela/Janela:** O módulo `Dimensions` permite obter as dimensões da janela (área visível) ou da tela do dispositivo.
    ```javascript
    import { Dimensions } from 'react-native';

    const window = Dimensions.get('window'); // { width, height, scale, fontScale }
    const screen = Dimensions.get('screen'); // Dimensões da tela física

    console.log('Largura da Janela:', window.width);
    console.log('Altura da Janela:', window.height);
    ```
    Isso é útil para criar layouts responsivos que se adaptam a diferentes tamanhos de tela. No entanto, as dimensões obtidas com `Dimensions.get()` não são atualizadas dinamicamente em caso de rotação da tela ou redimensionamento da janela (em plataformas que suportam). Para isso, você pode usar o hook `useWindowDimensions` ou adicionar um event listener para o evento `change` do `Dimensions`.

    ```javascript
    import { useWindowDimensions } from 'react-native';

    const MeuComponenteResponsivo = () => {
      const { width, height } = useWindowDimensions();
      // width e height serão atualizados automaticamente em rotações/redimensionamentos

      return (
        <View style={{ width: width / 2, height: height / 3, backgroundColor: 'lightgreen' }}>
          <Text>Metade da Largura, Um Terço da Altura</Text>
        </View>
      );
    };
    ```

### Exemplos Práticos de Layouts Comuns

Vamos ver alguns exemplos de como combinar essas propriedades para criar layouts comuns.

**1. Cartão Simples:**

```javascript
const Cartao = ({ titulo, conteudo }) => (
  <View style={stylesCartao.cartao}>
    <Text style={stylesCartao.titulo}>{titulo}</Text>
    <Text style={stylesCartao.conteudo}>{conteudo}</Text>
  </View>
);

const stylesCartao = StyleSheet.create({
  cartao: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  conteudo: { fontSize: 14, color: '#333' },
});
```

**2. Layout em Grade (2 Colunas):**

```javascript
const ItensEmGrade = ({ dados }) => (
  <View style={stylesGrade.containerGrade}>
    {dados.map(item => (
      <View key={item.id} style={stylesGrade.itemGrade}>
        <Text>{item.nome}</Text>
      </View>
    ))}
  </View>
);

const stylesGrade = StyleSheet.create({
  containerGrade: {
    flexDirection: 'row', // Itens lado a lado
    flexWrap: 'wrap',     // Quebra para a próxima linha
    justifyContent: 'space-between', // Espaço entre colunas (para 2 colunas)
    // Se fossem mais colunas, poderia ser 'flex-start' e adicionar margens
  },
  itemGrade: {
    width: '48%', // Aproximadamente metade, com espaço para margem/padding
    // Ou: width: (Dimensions.get('window').width / 2) - (paddingHorizontalTotal / 2) - (gapEntreItens / 2)
    height: 100,
    backgroundColor: 'lightyellow',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gold',
  },
});
// Uso: <ItensEmGrade dados={[{id:1, nome:'A'}, {id:2, nome:'B'}, {id:3, nome:'C'}, {id:4, nome:'D'}]} />
// Para FlatList com numColumns={2}, a lógica de estilização do item é similar.
```

**3. Cabeçalho Fixo com Conteúdo Rolável:**

```javascript
const LayoutCabecalhoFixo = () => (
  <View style={{ flex: 1 }}>
    <View style={stylesFixo.cabecalho}>
      <Text>Meu Cabeçalho Fixo</Text>
    </View>
    <ScrollView style={stylesFixo.conteudoRolavel}>
      {/* Conteúdo longo aqui... */}
      {Array.from({length: 30}).map((_, i) => <Text key={i} style={stylesFixo.itemLista}>Item {i+1}</Text>)}
    </ScrollView>
  </View>
);

const stylesFixo = StyleSheet.create({
  cabecalho: { height: 60, backgroundColor: 'tomato', justifyContent: 'center', alignItems: 'center' },
  conteudoRolavel: { flex: 1, backgroundColor: '#eee' }, // flex: 1 faz ocupar o espaço restante
  itemLista: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
```

A estilização e o layout são aspectos vastos e cheios de nuances. A chave é entender os fundamentos do `StyleSheet`, Flexbox e posicionamento, e então praticar construindo diferentes tipos de interfaces. A documentação oficial do React Native e guias online sobre Flexbox (como o Flexbox Froggy) são excelentes recursos para aprofundar seus conhecimentos.

Na próxima seção, abordaremos a navegação entre diferentes telas em seu aplicativo React Native, um componente essencial para qualquer aplicação com mais de uma visualização.
