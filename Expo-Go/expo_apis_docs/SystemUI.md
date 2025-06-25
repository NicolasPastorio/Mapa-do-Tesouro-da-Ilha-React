# Interface do Sistema (SystemUI)

Uma biblioteca que permite interagir com elementos da interface do usuário do sistema.

`expo-system-ui` permite que você interaja com elementos da UI que estão fora da árvore React. Especificamente, a cor de fundo da visualização raiz e o bloqueio do estilo da interface do usuário globalmente no Android.

## Instalação

Para instalar a API SystemUI, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-system-ui
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import * as SystemUI from 'expo-system-ui';
```

## Métodos

### `SystemUI.getBackgroundColorAsync()`

Retorna a cor de fundo da visualização raiz em formato hexadecimal. Retorna `null` se a cor de fundo não estiver definida.

```javascript
import * as SystemUI from 'expo-system-ui';

async function getSystemBackgroundColor() {
  const color = await SystemUI.getBackgroundColorAsync();
  if (color) {
    console.log("Cor de fundo do sistema:", color);
  } else {
    console.log("Cor de fundo do sistema não definida.");
  }
}

getSystemBackgroundColor();
```

### `SystemUI.setBackgroundColorAsync(color)`

Define a cor de fundo da visualização raiz. O `color` deve ser uma string de cor hexadecimal (por exemplo, `#FF0000`).

```javascript
import * as SystemUI from 'expo-system-ui';

async function setSystemBackgroundColor(color) {
  try {
    await SystemUI.setBackgroundColorAsync(color);
    console.log(`Cor de fundo do sistema definida para ${color}`);
  } catch (e) {
    console.error("Erro ao definir a cor de fundo do sistema:", e);
  }
}

// Exemplo de uso:
// setSystemBackgroundColor("#00FF00"); // Define a cor de fundo para verde
```

---

**Autor:** Manus AI
**Data de Geração:** 21 de Junho de 2025

