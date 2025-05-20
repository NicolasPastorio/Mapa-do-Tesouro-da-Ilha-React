## Seção 5: Trabalhando com APIs Externas e Dados Locais

A maioria dos aplicativos móveis modernos precisa interagir com dados, seja buscando informações de um servidor remoto, enviando dados para uma API, ou armazenando informações localmente no dispositivo do usuário. Nesta seção, vamos explorar como seu aplicativo React Native pode se comunicar com APIs externas para buscar e enviar dados, e como gerenciar dados localmente usando o AsyncStorage.

Abordaremos as principais formas de fazer requisições HTTP, como a API `fetch` nativa do JavaScript e a popular biblioteca `Axios`. Discutiremos como lidar com respostas (especialmente no formato JSON), como exibir esses dados em listas de forma eficiente, e as melhores práticas para tratar erros de rede e gerenciar estados de carregamento para uma boa experiência do usuário. Por fim, introduziremos o `AsyncStorage` para persistência de dados simples no dispositivo.

### Introdução a Requisições HTTP (fetch API, Axios)

Para que seu aplicativo React Native se comunique com um servidor web (uma API REST, por exemplo), ele precisa fazer requisições HTTP. As operações mais comuns são:

*   **GET:** Para buscar dados de um recurso.
*   **POST:** Para enviar dados para criar um novo recurso.
*   **PUT:** Para enviar dados para atualizar um recurso existente completamente.
*   **PATCH:** Para enviar dados para atualizar parcialmente um recurso existente.
*   **DELETE:** Para remover um recurso.

React Native suporta a API `fetch` padrão do JavaScript, que é uma maneira moderna e baseada em Promises para fazer requisições de rede. Alternativamente, muitos desenvolvedores preferem usar bibliotecas de terceiros como `Axios`, que oferece uma API mais conveniente, interceptadores, cancelamento de requisições e melhor tratamento de erros em alguns casos.

**1. Usando a API `fetch`:**

A API `fetch` está disponível globalmente em ambientes React Native, então você não precisa instalar nada extra para usá-la.

**Exemplo de requisição GET com `fetch`:**

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const ExemploFetchGet = () => {
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // URL de uma API pública de exemplo (JSONPlaceholder)
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10') // Busca os 10 primeiros posts
      .then(response => {
        if (!response.ok) { // Verifica se a resposta HTTP foi bem-sucedida (status 200-299)
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then(json => {
        setDados(json); // Atualiza o estado com os dados recebidos
        setCarregando(false);
      })
      .catch(error => {
        console.error("Erro ao buscar dados: ", error);
        setErro(error.message);
        setCarregando(false);
      });
  }, []); // Array de dependências vazio para executar apenas na montagem

  if (carregando) {
    return <View style={styles.containerCentralizado}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (erro) {
    return <View style={styles.containerCentralizado}><Text style={styles.textoErro}>Erro: {erro}</Text></View>;
  }

  return (
    <View style={styles.containerLista}>
      <Text style={styles.tituloLista}>Posts da API (Fetch):</Text>
      <FlatList
        data={dados}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemListaApi}>
            <Text style={styles.itemTitulo}>{item.id}. {item.title}</Text>
            <Text style={styles.itemCorpo}>{item.body.substring(0, 100)}...</Text>
          </View>
        )}
      />
    </View>
  );
};

// ... (Estilos definidos abaixo)
```

**Exemplo de requisição POST com `fetch`:**

```javascript
const criarNovoPost = async (titulo, corpo) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', // Especifica o método HTTP
      body: JSON.stringify({ // Corpo da requisição, convertido para string JSON
        title: titulo,
        body: corpo,
        userId: 1, // Exemplo de outro dado necessário pela API
      }),
      headers: { // Cabeçalhos da requisição
        'Content-type': 'application/json; charset=UTF-8',
        // 'Authorization': 'Bearer SEU_TOKEN_AQUI', // Exemplo de header de autorização
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log('Post criado:', jsonResponse);
    alert('Post criado com sucesso! ID: ' + jsonResponse.id);
    return jsonResponse;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    alert('Falha ao criar post: ' + error.message);
    throw error;
  }
};

// Para usar:
// criarNovoPost('Meu Título Incrível', 'Este é o conteúdo do meu novo post.');
```

**2. Usando `Axios`:**

Axios é uma biblioteca popular baseada em Promises para fazer requisições HTTP. Ela oferece algumas conveniências sobre `fetch`, como transformação automática de dados JSON, melhor tratamento de erros e interceptadores.

Primeiro, instale o Axios:
```bash
npm install axios
# ou
yarn add axios
```

**Exemplo de requisição GET com `Axios`:**

```javascript
import axios from 'axios';
// ... (resto do componente ExemploFetchGet, mas adaptado para Axios)

// Dentro do useEffect do ExemploFetchGet, substitua o bloco fetch por:
useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then(response => {
      // Axios coloca os dados da resposta diretamente em response.data
      setDados(response.data);
      setCarregando(false);
    })
    .catch(error => {
      console.error("Erro ao buscar dados com Axios: ", error);
      // Axios anexa mais informações ao objeto de erro
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um status fora da faixa 2xx
        setErro(`Erro do servidor: ${error.response.status} - ${error.response.data.message || 'Erro desconhecido'}`);
      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        setErro('Nenhuma resposta do servidor. Verifique sua conexão.');
      } else {
        // Algo aconteceu ao configurar a requisição que acionou um Erro
        setErro(`Erro na configuração da requisição: ${error.message}`);
      }
      setCarregando(false);
    });
}, []);
```

**Exemplo de requisição POST com `Axios`:**

```javascript
const criarNovoPostComAxios = async (titulo, corpo) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      // O segundo argumento do axios.post é o corpo da requisição (objeto JS)
      title: titulo,
      body: corpo,
      userId: 1,
    }, {
      // O terceiro argumento (opcional) são as configurações, incluindo headers
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer SEU_TOKEN_AQUI',
      }
    });
    console.log('Post criado com Axios:', response.data);
    alert('Post criado com sucesso (Axios)! ID: ' + response.data.id);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar post com Axios:', error);
    // Tratamento de erro mais detalhado como no exemplo GET com Axios
    alert('Falha ao criar post (Axios): ' + (error.response?.data?.message || error.message));
    throw error;
  }
};
```

**Fetch vs. Axios:**
*   **Fetch:** Embutido, sem dependências extras. API um pouco mais verbosa para JSON e tratamento de erros (erros HTTP como 404 ou 500 não rejeitam a Promise por padrão, você precisa checar `response.ok`).
*   **Axios:** API mais concisa para JSON, tratamento de erro mais robusto (rejeita a Promise para status de erro), suporta interceptadores (para modificar requisições/respostas globalmente, ex: adicionar tokens de autenticação), cancelamento de requisições.

A escolha entre eles muitas vezes é uma questão de preferência ou requisitos específicos do projeto. Para projetos simples, `fetch` pode ser suficiente. Para projetos maiores ou com necessidades mais complexas de rede, `Axios` é uma escolha popular.

### Lidando com Respostas (JSON)

A maioria das APIs modernas retorna dados no formato JSON (JavaScript Object Notation). Como vimos nos exemplos:

*   Com `fetch`, você precisa chamar `response.json()` para converter o corpo da resposta em um objeto JavaScript. Esta operação também retorna uma Promise.
*   Com `Axios`, a conversão de JSON para objeto JavaScript geralmente é feita automaticamente, e os dados ficam disponíveis em `response.data`.

É importante sempre verificar se a requisição foi bem-sucedida antes de tentar processar a resposta. Com `fetch`, isso é feito checando `response.ok` ou `response.status`. Com `Axios`, erros de status HTTP (4xx, 5xx) geralmente causam a rejeição da Promise, caindo no bloco `.catch()`.

### Exibindo Dados de APIs em Listas

Uma vez que você buscou os dados (geralmente um array de objetos) de uma API, o próximo passo é exibi-los ao usuário, frequentemente em uma lista. O componente `FlatList` é ideal para isso, pois é otimizado para renderizar listas longas de forma eficiente.

O exemplo `ExemploFetchGet` já demonstra isso:

```javascript
// ... (componente ExemploFetchGet)
  return (
    <View style={styles.containerLista}>
      <Text style={styles.tituloLista}>Posts da API (Fetch):</Text>
      <FlatList
        data={dados} // O array de posts buscados da API
        keyExtractor={item => item.id.toString()} // Usa o ID do post como chave única
        renderItem={({ item }) => ( // Função para renderizar cada item da lista
          <View style={styles.itemListaApi}>
            <Text style={styles.itemTitulo}>{item.id}. {item.title}</Text>
            <Text style={styles.itemCorpo}>{item.body.substring(0, 100)}...</Text>
          </View>
        )}
        // Outras props úteis do FlatList:
        // ListEmptyComponent={<Text>Nenhum item encontrado.</Text>} // Exibido se 'dados' estiver vazio
        // ListHeaderComponent={<Text>Cabeçalho da Lista</Text>}
        // ListFooterComponent={<ActivityIndicator />} // Para indicar carregamento de mais itens (paginação)
        // onEndReached={() => console.log('Chegou ao fim da lista!')} // Chamado ao rolar perto do fim
        // onEndReachedThreshold={0.5} // Quão perto do fim (0 a 1) para chamar onEndReached
        // refreshing={carregando} // Para pull-to-refresh
        // onRefresh={() => fetchDataFunction()} // Função para recarregar os dados
      />
    </View>
  );
// ...
```

**Estilos para o exemplo de lista:**
```javascript
const styles = StyleSheet.create({
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoErro: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  containerLista: {
    flex: 1,
    paddingTop: 20,
  },
  tituloLista: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  itemListaApi: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCorpo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
```

### Tratamento de Erros e Estados de Carregamento

Ao fazer requisições de rede, é crucial lidar com possíveis erros e informar ao usuário o que está acontecendo, especialmente durante o tempo de espera da resposta.

**1. Estados de Carregamento (`loading`):**

   Mantenha uma variável de estado (ex: `carregando` ou `isLoading`) que é `true` enquanto a requisição está em andamento e `false` quando ela termina (seja com sucesso ou erro). Use este estado para exibir um indicador de carregamento, como o componente `ActivityIndicator`.

   ```javascript
   const [carregando, setCarregando] = useState(true);
   // ...
   setCarregando(true); // Antes de iniciar a requisição
   fetch(...) // ou axios(...)
     .finally(() => {
       setCarregando(false); // Após a requisição terminar (sucesso ou erro)
     });
   
   if (carregando) {
     return <ActivityIndicator />;
   }
   ```

**2. Tratamento de Erros (`error`):**

   Mantenha uma variável de estado para armazenar mensagens de erro (ex: `erro` ou `error`). No bloco `.catch()` da sua Promise de requisição, atualize este estado com uma mensagem de erro apropriada.

   ```javascript
   const [erro, setErro] = useState(null);
   // ...
   fetch(...)
     .catch(error => {
       setErro(error.message || 'Ocorreu um erro desconhecido.');
       // ...
     });

   if (erro) {
     return <Text>Erro: {erro}</Text>;
   }
   ```
   É importante limpar o estado de erro antes de uma nova tentativa de requisição: `setErro(null);`

**Boas Práticas:**
*   **Feedback Claro:** Sempre forneça feedback visual para o usuário (indicadores de carregamento, mensagens de erro claras e amigáveis).
*   **Tentativas (Retries):** Para erros de rede intermitentes, você pode implementar uma lógica de nova tentativa (retry), possivelmente com um backoff exponencial.
*   **Timeout:** Configure timeouts para suas requisições para evitar que o aplicativo fique esperando indefinidamente por uma resposta que nunca virá.
*   **Tratamento Específico de Erros HTTP:** Diferencie erros de rede (sem conexão) de erros de servidor (status 4xx, 5xx) para fornecer mensagens mais precisas.

### Armazenamento Local (`AsyncStorage`)

Às vezes, você precisa armazenar dados simples no dispositivo do usuário para que persistam entre as sessões do aplicativo. Exemplos incluem preferências do usuário, tokens de autenticação, ou dados em cache.

Para isso, o React Native (através da comunidade) oferece o `AsyncStorage`. Ele é um sistema de armazenamento de chave-valor, assíncrono e não criptografado, persistente e global para o aplicativo.

**Importante:** `AsyncStorage` foi removido do núcleo do React Native e agora é mantido pela comunidade como um pacote separado: `@react-native-async-storage/async-storage`.

**1. Instalar `AsyncStorage`:**

```bash
npm install @react-native-async-storage/async-storage
# ou
yarn add @react-native-async-storage/async-storage
```

Se estiver em um projeto Bare Workflow, pode ser necessário fazer o link (geralmente `npx pod-install ios` para iOS).

**2. Usando `AsyncStorage`:**

As operações com `AsyncStorage` são assíncronas e retornam Promises.

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const KEY_NOME_USUARIO = '@MeuApp:nomeUsuario';

const ExemploAsyncStorage = () => {
  const [nomeInput, setNomeInput] = useState('');
  const [nomeSalvo, setNomeSalvo] = useState('');
  const [carregandoNome, setCarregandoNome] = useState(true);

  // Carregar o nome salvo ao montar o componente
  useEffect(() => {
    const carregarNome = async () => {
      try {
        const nome = await AsyncStorage.getItem(KEY_NOME_USUARIO);
        if (nome !== null) {
          setNomeSalvo(nome);
        }
      } catch (e) {
        console.error('Falha ao carregar o nome do AsyncStorage', e);
        Alert.alert('Erro', 'Não foi possível carregar o nome salvo.');
      } finally {
        setCarregandoNome(false);
      }
    };
    carregarNome();
  }, []);

  const salvarNome = async () => {
    if (!nomeInput.trim()) {
      Alert.alert('Atenção', 'Por favor, digite um nome para salvar.');
      return;
    }
    try {
      await AsyncStorage.setItem(KEY_NOME_USUARIO, nomeInput);
      setNomeSalvo(nomeInput);
      setNomeInput(''); // Limpa o input após salvar
      Alert.alert('Sucesso', 'Nome salvo localmente!');
    } catch (e) {
      console.error('Falha ao salvar o nome no AsyncStorage', e);
      Alert.alert('Erro', 'Não foi possível salvar o nome.');
    }
  };

  const removerNome = async () => {
    try {
      await AsyncStorage.removeItem(KEY_NOME_USUARIO);
      setNomeSalvo('');
      Alert.alert('Sucesso', 'Nome removido do armazenamento local.');
    } catch (e) {
      console.error('Falha ao remover o nome do AsyncStorage', e);
      Alert.alert('Erro', 'Não foi possível remover o nome.');
    }
  };

  if (carregandoNome) {
    return <View style={styles.container}><ActivityIndicator size="small" /></View>;
  }

  return (
    <View style={styles.containerAsyncStorage}>
      <Text style={styles.labelAsyncStorage}>Digite seu nome:</Text>
      <TextInput
        style={styles.inputAsyncStorage}
        placeholder="Seu nome aqui"
        value={nomeInput}
        onChangeText={setNomeInput}
      />
      <Button title="Salvar Nome" onPress={salvarNome} />
      
      {nomeSalvo ? (
        <View style={styles.infoSalvaContainer}>
          <Text style={styles.infoSalvaTexto}>Nome Salvo: {nomeSalvo}</Text>
          <Button title="Remover Nome Salvo" onPress={removerNome} color="red" />
        </View>
      ) : (
        <Text style={styles.infoSalvaTexto}>Nenhum nome salvo localmente.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (outros estilos como containerCentralizado, textoErro)
  containerAsyncStorage: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  labelAsyncStorage: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputAsyncStorage: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  infoSalvaContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  infoSalvaTexto: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ExemploAsyncStorage;
```

**Principais Métodos do `AsyncStorage`:**
*   `AsyncStorage.setItem(key, value)`: Salva um valor (string) associado a uma chave. Se o valor não for uma string, você precisará convertê-lo (ex: `JSON.stringify()` para objetos).
*   `AsyncStorage.getItem(key)`: Recupera o valor (string) associado a uma chave. Se a chave não existir, retorna `null`. Você pode precisar converter de volta (ex: `JSON.parse()`).
*   `AsyncStorage.removeItem(key)`: Remove um item do armazenamento.
*   `AsyncStorage.mergeItem(key, value)`: Mescla um valor JSON existente com um novo valor JSON.
*   `AsyncStorage.clear()`: Remove todos os dados do AsyncStorage para o seu aplicativo (use com cuidado!).
*   `AsyncStorage.getAllKeys()`: Retorna um array com todas as chaves usadas pelo seu aplicativo.
*   `AsyncStorage.multiGet(keys)`: Recupera múltiplos itens de uma vez.
*   `AsyncStorage.multiSet(keyValuePairs)`: Salva múltiplos itens de uma vez.
*   `AsyncStorage.multiRemove(keys)`: Remove múltiplos itens de uma vez.

**Considerações sobre `AsyncStorage`:**
*   **Assíncrono:** Todas as operações são assíncronas, então use `async/await` ou `.then()`.
*   **Apenas Strings:** Armazena apenas strings. Para objetos ou arrays, use `JSON.stringify()` antes de salvar e `JSON.parse()` após recuperar.
*   **Não Criptografado:** Os dados são armazenados em texto simples. Não use para dados sensíveis sem uma camada adicional de criptografia (ex: usando bibliotecas como `expo-secure-store` para dados sensíveis).
*   **Limites de Tamanho:** Embora geralmente grande, há limites práticos para a quantidade de dados que você pode armazenar (geralmente alguns megabytes, mas pode variar por plataforma e dispositivo).
*   **Não é um Banco de Dados:** Para dados complexos, relacionais ou grandes volumes de dados, considere usar um banco de dados local como SQLite (ex: com `expo-sqlite` ou `react-native-sqlite-storage`) ou soluções mais robustas como WatermelonDB ou Realm.

Saber como buscar dados de APIs e como armazená-los localmente são habilidades essenciais para construir aplicativos React Native dinâmicos e úteis. Lembre-se sempre de priorizar a experiência do usuário, fornecendo feedback adequado durante as operações de rede e tratando os erros de forma graciosa.

Na próxima seção, exploraremos algumas funcionalidades intermediárias do React Native, como gerenciamento de estado mais avançado, acesso a APIs nativas do dispositivo e animações básicas.
