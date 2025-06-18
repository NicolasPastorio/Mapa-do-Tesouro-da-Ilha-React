# Gradiente de Malha (MeshGradient)

Um módulo que expõe a visualização MeshGradient do SwiftUI para React Native.

**iOS, tvOS**

## Instalação

Para instalar a API MeshGradient, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-mesh-gradient
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import { MeshGradientView } from 'expo-mesh-gradient';
```

### Componente

#### `<MeshGradientView />`

Um componente React Native que exibe um gradiente de malha. Ele aceita as seguintes propriedades:

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `colors` | `string[]` | `[]` | Um array de cores. Deve conter `columns * rows` elementos. |
| `columns` | `number` | `0` | Largura da malha, ou seja, o número de vértices por linha. |
| `ignoreSafeArea` | `boolean` | `true` | Se deve ignorar as áreas seguras ao posicionar a visualização. |
| `masked` | `boolean` | `false` | Mascara o gradiente usando o canal alfa das visualizações filhas fornecidas.

> **Nota:** Quando esta opção está habilitada, todas as interações do usuário (gestos) nas visualizações filhas são ignoradas. |
| `points` | `number[][]` | `[]` | Um array de pontos bidimensionais na malha. Deve conter `columns * rows` elementos. |
| `rows` | `number` | `0` | Altura da malha, ou seja, o número de vértices por coluna. |
| `smoothsColors` | `boolean` | `true` | Se a interpolação cúbica (suave) deve ser usada para as cores na malha, em vez de apenas para a forma da malha. |

#### Propriedades Herdadas

*   `ViewProps`

## Uso

```javascript
import { MeshGradientView } from 'expo-mesh-gradient';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MeshGradientView
        style={styles.meshGradient}
        columns={3}
        rows={3}
        colors={[
          'red', 'purple', 'indigo',
          'orange', 'white', 'blue',
          'yellow', 'green', 'cyan',
        ]}
        points={[
          [0.0, 0.0], [0.5, 0.0], [1.0, 0.0],
          [0.0, 0.5], [0.5, 0.5], [1.0, 0.5],
          [0.0, 1.0], [0.5, 1.0], [1.0, 1.0],
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meshGradient: {
    width: '100%',
    height: '100%',
  },
});
```

---

**Autor:** Manus AI
**Data de Geração:** 18 de Junho de 2025

