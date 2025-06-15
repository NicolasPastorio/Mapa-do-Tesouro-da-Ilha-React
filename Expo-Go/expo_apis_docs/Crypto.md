# Criptografia (Crypto)

Uma biblioteca universal para operações criptográficas.

`expo-crypto` permite que você faça hash de dados de maneira equivalente à API `crypto` do Node.js. Uma função de hash criptográfica transforma um bloco de dados em uma saída de tamanho fixo. Digests criptográficos devem exibir _resistência a colisões_, o que significa que é muito difícil gerar múltiplas entradas que tenham valores de digest iguais. Você pode especificar o formato da string retornada como um dos `CryptoEncoding`. Por padrão, o valor resolvido será formatado como uma string `HEX`. Na web, este método só pode ser chamado de uma origem segura (HTTPS), caso contrário, um erro será lançado.

## Instalação

Para instalar a API Crypto, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-crypto
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

### Uso básico de Criptografia

```javascript
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Crypto from 'expo-crypto';

export default function App() {
  useEffect(() => {
    (async () => {
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        '🥓 Easy to Digest! 💙'
      );
      console.log('Digest:', digest);

      const randomBytes = Crypto.getRandomBytes(16);
      console.log('Bytes aleatórios:', randomBytes);

      const randomUUID = Crypto.randomUUID();
      console.log('UUID aleatório:', randomUUID);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Exemplo do Módulo de Criptografia</Text>
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
});
```

## API

```javascript
import * as Crypto from 'expo-crypto';
```

### Métodos

#### `Crypto.digest(algorithm, data, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `algorithm` | `CryptoDigestAlgorithm` | O algoritmo de hash criptográfico a ser usado. |
| `data` | `string` ou `ArrayBuffer` | Os dados a serem hashados. |
| `options` (opcional) | `CryptoDigestOptions` | Opções para o digest, como o formato de codificação da saída. |

Gera um digest (hash) dos dados fornecidos usando o algoritmo especificado. Retorna uma promessa que se resolve com o valor hash.

#### `Crypto.digestStringAsync(algorithm, data, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `algorithm` | `CryptoDigestAlgorithm` | O algoritmo de hash criptográfico a ser usado. |
| `data` | `string` | A string de dados a ser hashada. |
| `options` (opcional) | `CryptoDigestOptions` | Opções para o digest, como o formato de codificação da saída. |

Gera um digest (hash) da string de dados fornecida usando o algoritmo especificado. Retorna uma promessa que se resolve com o valor hash.

#### `Crypto.getRandomBytes(byteCount)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `byteCount` | `number` | O número de bytes aleatórios a serem gerados. |

Gera um `Uint8Array` de bytes criptograficamente seguros. Este método é síncrono.

#### `Crypto.getRandomBytesAsync(byteCount)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `byteCount` | `number` | O número de bytes aleatórios a serem gerados. |

Gera um `Uint8Array` de bytes criptograficamente seguros. Retorna uma promessa que se resolve com o `Uint8Array` de bytes aleatórios.

#### `Crypto.getRandomValues(typedArray)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `typedArray` | `TypedArray` | Um `TypedArray` (por exemplo, `Uint8Array`, `Uint16Array`) para preencher com valores aleatórios. |

Preenche um `TypedArray` com valores criptograficamente seguros. Este método é síncrono.

#### `Crypto.randomUUID()`

Gera um UUID (Universally Unique Identifier) versão 4 criptograficamente seguro. Retorna uma string que representa o UUID.

### Tipos

#### `CryptoDigestOptions`

Tipo: `object`

Opções para a função `digest`, incluindo o `encoding` da saída.

#### `Digest`

Tipo: `string`

O resultado de uma operação de digest (hash).

### Enums

#### `CryptoDigestAlgorithm`

Enum que representa os algoritmos de digest criptográfico suportados (`MD5`, `SHA1`, `SHA256`, `SHA384`, `SHA512`).

#### `CryptoEncoding`

Enum que representa as codificações de saída suportadas para o digest (`HEX`, `BASE64`).

### Códigos de Erro

Não há códigos de erro específicos documentados para esta API.

---

**Autor:** Manus AI
**Data de Geração:** 14 de Junho de 2025

