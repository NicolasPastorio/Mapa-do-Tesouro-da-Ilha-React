# Mass Assignment Attack: Entendendo e Prevenindo

## O que é Mass Assignment Attack?

Mass Assignment, também conhecido como Over-posting ou Auto-binding, é uma vulnerabilidade que ocorre quando uma aplicação web permite que um atacante modifique propriedades de um objeto no servidor que não deveriam ser acessíveis ou modificáveis por ele. Isso geralmente acontece quando frameworks ou ORMs (Object-Relational Mappers) automaticamente mapeiam os parâmetros de entrada de uma requisição HTTP (como dados de um formulário ou JSON) para propriedades de um objeto de modelo de dados sem uma validação ou filtragem adequada.

## Como funciona o ataque?

Imagine uma aplicação de e-commerce onde um usuário pode atualizar seu perfil. O formulário de atualização de perfil pode ter campos como `nome`, `email` e `endereco`. No lado do servidor, esses dados são recebidos e mapeados para um objeto `Usuario`.

**Cenário Vulnerável:**

Se o objeto `Usuario` também tiver uma propriedade `isAdmin` (booleana) ou `saldoConta` (numérica) que não é exibida no formulário, um atacante pode tentar adicionar esses campos à requisição HTTP.

**Requisição Legítima:**

```
POST /api/usuario/123
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao.silva@example.com"
}
```

**Requisição Maliciosa (Mass Assignment):**

Um atacante intercepta a requisição e adiciona um campo `isAdmin` ou `saldoConta`:

```
POST /api/usuario/123
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao.silva@example.com",
  "isAdmin": true, 
  "saldoConta": 999999
}
```

Se a aplicação usar um mecanismo de mass assignment ingênuo, ela pode automaticamente atualizar a propriedade `isAdmin` para `true` ou `saldoConta` para `999999` no objeto `Usuario` no banco de dados, concedendo privilégios de administrador ao atacante ou um saldo irreal.

Essa vulnerabilidade é comum em frameworks que facilitam o mapeamento automático de dados, como Ruby on Rails, Laravel, Spring, Node.js com certos ORMs, etc., se não forem configurados corretamente.

## Como proteger sua aplicação?

A proteção contra Mass Assignment envolve controlar explicitamente quais atributos de um modelo podem ser preenchidos automaticamente a partir da entrada do usuário.

### 1. Whitelisting (Permissão Explícita)

Esta é a abordagem mais segura e recomendada. Consiste em definir explicitamente uma lista de atributos que são permitidos para serem preenchidos a partir da entrada do usuário. Quaisquer outros atributos presentes na requisição serão ignorados.

**Exemplo (Ruby on Rails - `strong_parameters`):**

```ruby
class UsersController < ApplicationController
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      # ...
    end
  end

  private

  def user_params
    params.require(:user).permit(:nome, :email, :endereco) # Apenas estes atributos são permitidos
  end
end
```

**Exemplo (Laravel - `fillable`):**

```php
class User extends Model
{
    protected $fillable = [
        'nome',
        'email',
        'endereco',
    ]; // Apenas estes atributos são permitidos para mass assignment
}
```

### 2. Blacklisting (Negação Explícita) - Não Recomendado

Consiste em definir uma lista de atributos que *não* são permitidos para serem preenchidos automaticamente. Todos os outros atributos são permitidos. Esta abordagem é menos segura porque é fácil esquecer de adicionar um novo atributo sensível à lista negra, ou um atacante pode descobrir um atributo que você não considerou sensível.

**Exemplo (Laravel - `guarded` - Não recomendado como única defesa):**

```php
class User extends Model
{
    protected $guarded = [
        'isAdmin',
        'saldoConta',
    ]; // Estes atributos são protegidos contra mass assignment
}
```

### 3. Uso de DTOs (Data Transfer Objects) ou Formulários Específicos

Em linguagens e frameworks que não possuem mecanismos de whitelisting nativos ou para uma camada extra de segurança, você pode usar DTOs ou objetos de formulário. Esses objetos são projetados para receber apenas os dados esperados da entrada do usuário. Após a validação, os dados são mapeados manualmente para o modelo de domínio.

**Exemplo (Java/Spring Boot):**

```java
// DTO para receber dados do perfil do usuário
public class UserProfileUpdateDTO {
    private String nome;
    private String email;
    private String endereco;

    // Getters e Setters
}

@RestController
@RequestMapping("/api/usuario")
public class UserController {

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserProfileUpdateDTO userProfileUpdateDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Mapeamento manual e seguro
        user.setNome(userProfileUpdateDTO.getNome());
        user.setEmail(userProfileUpdateDTO.getEmail());
        user.setEndereco(userProfileUpdateDTO.getEndereco());

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
```

Neste exemplo, o `UserProfileUpdateDTO` só contém os campos que o usuário pode atualizar, impedindo que campos como `isAdmin` sejam injetados.

### 4. Validação de Entrada Robusta

Sempre combine as defesas de mass assignment com uma validação de entrada robusta. Mesmo que um atributo seja permitido, a validação garante que o valor fornecido seja válido e seguro (por exemplo, um email válido, um número dentro de um intervalo esperado).

## Conclusão

Mass Assignment é uma vulnerabilidade sutil, mas perigosa, que pode levar a escalação de privilégios ou manipulação de dados críticos. A melhor defesa é a abordagem de whitelisting, onde você explicitamente define quais atributos podem ser preenchidos a partir da entrada do usuário. Evite o blacklisting e considere o uso de DTOs para maior controle sobre o mapeamento de dados.

