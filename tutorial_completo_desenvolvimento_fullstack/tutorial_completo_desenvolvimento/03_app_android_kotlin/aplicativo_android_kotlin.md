# Tutorial Completo: Aplicativo Android Nativo em Kotlin para Consumo da API de Usuários

**Autor:** Manus AI  
**Data:** Dezembro 2024  
**Versão:** 1.0

## Sumário

1. [Introdução](#introdução)
2. [Configuração do Ambiente Android](#configuração-do-ambiente-android)
3. [Estrutura do Projeto Android](#estrutura-do-projeto-android)
4. [Arquitetura MVVM com Clean Architecture](#arquitetura-mvvm-com-clean-architecture)
5. [Configuração de Dependências](#configuração-de-dependências)
6. [Implementação com Jetpack Compose](#implementação-com-jetpack-compose)
7. [Gerenciamento de Estado](#gerenciamento-de-estado)
8. [Networking com Retrofit](#networking-com-retrofit)
9. [Sistema de Autenticação](#sistema-de-autenticação)
10. [Injeção de Dependência com Hilt](#injeção-de-dependência-com-hilt)
11. [Coroutines e Programação Assíncrona](#coroutines-e-programação-assíncrona)
12. [Navegação com Navigation Component](#navegação-com-navigation-component)
13. [Persistência de Dados](#persistência-de-dados)
14. [Testes Automatizados](#testes-automatizados)
15. [Segurança e Criptografia](#segurança-e-criptografia)
16. [Build e Deploy](#build-e-deploy)
17. [Referências](#referências)

---

## Introdução

Este tutorial apresenta o desenvolvimento completo de um aplicativo Android nativo utilizando Kotlin e as mais modernas tecnologias do ecossistema Android. O aplicativo consumirá a API REST de usuários desenvolvida anteriormente, implementando um sistema completo de autenticação, cadastro de usuários e gerenciamento de perfil.

### Objetivos do Tutorial

Ao final deste tutorial, você será capaz de:

- Configurar um ambiente de desenvolvimento Android completo
- Implementar arquitetura MVVM com Clean Architecture
- Utilizar Jetpack Compose para criação de interfaces modernas
- Gerenciar estado da aplicação de forma eficiente
- Consumir APIs REST com Retrofit e OkHttp
- Implementar autenticação JWT no Android
- Utilizar injeção de dependência com Hilt
- Trabalhar com Coroutines para programação assíncrona
- Implementar navegação com Navigation Component
- Persistir dados localmente com Room
- Criar testes automatizados robustos
- Aplicar medidas de segurança adequadas

### Tecnologias Utilizadas

- **Kotlin**: Linguagem de programação moderna para Android
- **Jetpack Compose**: Toolkit moderno para UI declarativa
- **Android Architecture Components**: ViewModel, LiveData, Navigation
- **Retrofit**: Cliente HTTP type-safe para Android
- **OkHttp**: Cliente HTTP eficiente
- **Hilt**: Framework de injeção de dependência
- **Room**: Biblioteca de persistência SQLite
- **Coroutines**: Programação assíncrona em Kotlin
- **Flow**: Streams de dados reativos
- **DataStore**: Armazenamento de preferências moderno
- **CameraX**: API moderna para câmera
- **Biometric**: Autenticação biométrica
- **WorkManager**: Tarefas em background
- **JUnit**: Framework de testes unitários
- **Espresso**: Testes de UI automatizados

### Funcionalidades do Aplicativo

O aplicativo Android incluirá as seguintes funcionalidades:

1. **Autenticação Completa**
   - Tela de splash com verificação de autenticação
   - Login com email e senha
   - Registro de novos usuários
   - Recuperação de senha
   - Autenticação biométrica (opcional)
   - Logout seguro

2. **Gerenciamento de Perfil**
   - Visualização de dados do usuário
   - Edição de informações pessoais
   - Upload de foto de perfil com câmera/galeria
   - Alteração de senha
   - Configurações de privacidade

3. **Interface Moderna**
   - Design Material 3
   - Tema claro e escuro
   - Animações fluidas
   - Feedback háptico
   - Suporte a diferentes tamanhos de tela

4. **Funcionalidades Avançadas**
   - Sincronização offline
   - Notificações push
   - Compartilhamento de dados
   - Backup e restauração
   - Analytics e crash reporting

## Configuração do Ambiente Android

### Pré-requisitos

Antes de iniciar o desenvolvimento, você precisa configurar o ambiente de desenvolvimento Android:

#### Android Studio

O Android Studio é a IDE oficial para desenvolvimento Android, baseada no IntelliJ IDEA.

**Instalação:**

1. **Download**: Acesse https://developer.android.com/studio e baixe a versão mais recente
2. **Instalação**: Execute o instalador e siga as instruções
3. **Configuração inicial**: Na primeira execução, o Android Studio irá baixar os componentes necessários

**Componentes essenciais a serem instalados:**
- Android SDK (API level 24 ou superior)
- Android SDK Build-Tools
- Android Emulator
- Intel x86 Emulator Accelerator (HAXM) ou AMD Processor
- Google Play Services
- Google Repository

#### Configuração do SDK

Após a instalação do Android Studio, configure o SDK:

1. Abra o Android Studio
2. Vá em **File > Settings** (ou **Android Studio > Preferences** no macOS)
3. Navegue até **Appearance & Behavior > System Settings > Android SDK**
4. Na aba **SDK Platforms**, instale:
   - Android 14 (API level 34) - mais recente
   - Android 13 (API level 33)
   - Android 12 (API level 31)
   - Android 7.0 (API level 24) - mínimo suportado

5. Na aba **SDK Tools**, certifique-se de ter:
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools
   - Google Play Services
   - Intel x86 Emulator Accelerator (HAXM)

#### Configuração do Emulador

Para testar o aplicativo, configure um emulador Android:

1. No Android Studio, vá em **Tools > AVD Manager**
2. Clique em **Create Virtual Device**
3. Escolha um dispositivo (recomendado: Pixel 6 ou Pixel 7)
4. Selecione uma imagem do sistema (recomendado: API 34 com Google Play)
5. Configure as opções avançadas se necessário
6. Finalize a criação do AVD

#### Configuração do Dispositivo Físico (Opcional)

Para testar em um dispositivo real:

1. **Ativar opções do desenvolvedor**:
   - Vá em **Configurações > Sobre o telefone**
   - Toque 7 vezes em **Número da versão**
   - Volte às configurações principais
   - Entre em **Opções do desenvolvedor**

2. **Ativar depuração USB**:
   - Nas opções do desenvolvedor, ative **Depuração USB**
   - Conecte o dispositivo ao computador via USB
   - Autorize a depuração quando solicitado

### Criação do Projeto

Agora vamos criar o projeto Android:

1. **Novo Projeto**:
   - Abra o Android Studio
   - Clique em **New Project**
   - Selecione **Empty Compose Activity**
   - Clique em **Next**

2. **Configuração do Projeto**:
   - **Name**: UsuariosApp
   - **Package name**: com.exemplo.usuariosapp
   - **Save location**: Escolha um diretório apropriado
   - **Language**: Kotlin
   - **Minimum SDK**: API 24 (Android 7.0)
   - Clique em **Finish**

### Configuração Inicial do Gradle

Após a criação do projeto, configure os arquivos Gradle:

#### build.gradle (Project level)

```kotlin
// Top-level build file where you can add configuration options common to all sub-modules.
plugins {
    id 'com.android.application' version '8.2.0' apply false
    id 'com.android.library' version '8.2.0' apply false
    id 'org.jetbrains.kotlin.android' version '1.9.20' apply false
    id 'com.google.dagger.hilt.android' version '2.48' apply false
    id 'kotlin-kapt' apply false
}
```

#### build.gradle (Module: app)

```kotlin
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
    id 'kotlin-parcelize'
}

android {
    namespace 'com.exemplo.usuariosapp'
    compileSdk 34

    defaultConfig {
        applicationId "com.exemplo.usuariosapp"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary true
        }

        // Configuração da API
        buildConfigField "String", "BASE_URL", "\"http://10.0.2.2:3000/api/\""
        buildConfigField "String", "API_VERSION", "\"v1\""
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            buildConfigField "String", "BASE_URL", "\"https://sua-api-producao.com/api/\""
        }
        debug {
            debuggable true
            applicationIdSuffix ".debug"
            versionNameSuffix "-debug"
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = '1.8'
    }

    buildFeatures {
        compose true
        buildConfig true
    }

    composeOptions {
        kotlinCompilerExtensionVersion '1.5.5'
    }

    packagingOptions {
        resources {
            excludes += '/META-INF/{AL2.0,LGPL2.1}'
        }
    }
}

dependencies {
    // Core Android
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.7.0'
    implementation 'androidx.activity:activity-compose:1.8.2'

    // Compose BOM - gerencia versões de todas as bibliotecas Compose
    implementation platform('androidx.compose:compose-bom:2023.10.01')
    implementation 'androidx.compose.ui:ui'
    implementation 'androidx.compose.ui:ui-graphics'
    implementation 'androidx.compose.ui:ui-tooling-preview'
    implementation 'androidx.compose.material3:material3'

    // Navigation
    implementation 'androidx.navigation:navigation-compose:2.7.5'

    // ViewModel
    implementation 'androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0'

    // Hilt - Injeção de Dependência
    implementation 'com.google.dagger:hilt-android:2.48'
    kapt 'com.google.dagger:hilt-compiler:2.48'
    implementation 'androidx.hilt:hilt-navigation-compose:1.1.0'

    // Networking
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.12.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'

    // Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3'

    // Room - Banco de dados local
    implementation 'androidx.room:room-runtime:2.6.1'
    implementation 'androidx.room:room-ktx:2.6.1'
    kapt 'androidx.room:room-compiler:2.6.1'

    // DataStore - Preferências
    implementation 'androidx.datastore:datastore-preferences:1.0.0'

    // Image Loading
    implementation 'io.coil-kt:coil-compose:2.5.0'

    // Permissions
    implementation 'com.google.accompanist:accompanist-permissions:0.32.0'

    // Biometric
    implementation 'androidx.biometric:biometric:1.1.0'

    // CameraX
    implementation 'androidx.camera:camera-camera2:1.3.1'
    implementation 'androidx.camera:camera-lifecycle:1.3.1'
    implementation 'androidx.camera:camera-view:1.3.1'

    // WorkManager
    implementation 'androidx.work:work-runtime-ktx:2.9.0'

    // Splash Screen
    implementation 'androidx.core:core-splashscreen:1.0.1'

    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.7.0'
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'

    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation platform('androidx.compose:compose-bom:2023.10.01')
    androidTestImplementation 'androidx.compose.ui:ui-test-junit4'

    debugImplementation 'androidx.compose.ui:ui-tooling'
    debugImplementation 'androidx.compose.ui:ui-test-manifest'
}

// Permitir referências a APIs experimentais
tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach {
    kotlinOptions {
        freeCompilerArgs += [
            "-opt-in=androidx.compose.material3.ExperimentalMaterial3Api",
            "-opt-in=androidx.compose.foundation.ExperimentalFoundationApi"
        ]
    }
}
```

## Estrutura do Projeto Android

### Organização de Pacotes

Vamos organizar o projeto seguindo os princípios da Clean Architecture:

```
app/src/main/java/com/exemplo/usuariosapp/
├── data/                    # Camada de dados
│   ├── local/              # Dados locais (Room, DataStore)
│   ├── remote/             # Dados remotos (API)
│   ├── repository/         # Implementação dos repositórios
│   └── mapper/             # Mapeadores entre camadas
├── domain/                 # Camada de domínio
│   ├── model/              # Modelos de domínio
│   ├── repository/         # Interfaces dos repositórios
│   └── usecase/            # Casos de uso
├── presentation/           # Camada de apresentação
│   ├── ui/                 # Componentes de UI
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── screens/        # Telas da aplicação
│   │   └── theme/          # Tema e estilos
│   ├── viewmodel/          # ViewModels
│   └── navigation/         # Navegação
├── di/                     # Injeção de dependência
├── util/                   # Utilitários
└── UsuariosApplication.kt  # Classe da aplicação
```

### Modelos de Domínio

Crie o arquivo `domain/model/User.kt`:

```kotlin
package com.exemplo.usuariosapp.domain.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize
import java.time.LocalDate
import java.time.LocalDateTime

@Parcelize
data class User(
    val id: String,
    val nome: String,
    val email: String,
    val telefone: String? = null,
    val dataNascimento: LocalDate? = null,
    val endereco: Endereco? = null,
    val perfil: UserRole = UserRole.USUARIO,
    val isActive: Boolean = true,
    val emailVerificado: Boolean = false,
    val ultimoLogin: LocalDateTime? = null,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
    val fotoPerfil: String? = null
) : Parcelable {
    
    val idade: Int?
        get() = dataNascimento?.let { nascimento ->
            val hoje = LocalDate.now()
            var idade = hoje.year - nascimento.year
            if (hoje.dayOfYear < nascimento.dayOfYear) {
                idade--
            }
            idade
        }
    
    val nomeCompleto: String
        get() = nome.trim()
    
    val iniciais: String
        get() = nome.split(" ")
            .take(2)
            .mapNotNull { it.firstOrNull()?.uppercaseChar() }
            .joinToString("")
}

@Parcelize
data class Endereco(
    val rua: String? = null,
    val numero: String? = null,
    val complemento: String? = null,
    val bairro: String? = null,
    val cidade: String? = null,
    val estado: String? = null,
    val cep: String? = null
) : Parcelable {
    
    val enderecoCompleto: String
        get() = buildString {
            rua?.let { append(it) }
            numero?.let { 
                if (isNotEmpty()) append(", ")
                append(it) 
            }
            complemento?.let { 
                if (isNotEmpty()) append(", ")
                append(it) 
            }
            bairro?.let { 
                if (isNotEmpty()) append(" - ")
                append(it) 
            }
            cidade?.let { 
                if (isNotEmpty()) append(", ")
                append(it) 
            }
            estado?.let { 
                if (isNotEmpty()) append("/")
                append(it) 
            }
            cep?.let { 
                if (isNotEmpty()) append(" - ")
                append(it) 
            }
        }
}

enum class UserRole(val displayName: String) {
    USUARIO("Usuário"),
    ADMIN("Administrador"),
    MODERADOR("Moderador");
    
    companion object {
        fun fromString(value: String): UserRole {
            return when (value.lowercase()) {
                "admin" -> ADMIN
                "moderador" -> MODERADOR
                else -> USUARIO
            }
        }
    }
}
```

### Modelos de Autenticação

Crie o arquivo `domain/model/Auth.kt`:

```kotlin
package com.exemplo.usuariosapp.domain.model

data class LoginCredentials(
    val email: String,
    val senha: String
)

data class RegisterData(
    val nome: String,
    val email: String,
    val senha: String,
    val telefone: String? = null,
    val dataNascimento: String? = null,
    val endereco: Endereco? = null
)

data class AuthResponse(
    val user: User,
    val token: String,
    val refreshToken: String,
    val expiresIn: String
)

data class ChangePasswordData(
    val senhaAtual: String,
    val novaSenha: String
)

sealed class AuthState {
    object Loading : AuthState()
    object Unauthenticated : AuthState()
    data class Authenticated(val user: User) : AuthState()
    data class Error(val message: String) : AuthState()
}
```

### Modelos de Resposta da API

Crie o arquivo `data/remote/dto/ApiResponse.kt`:

```kotlin
package com.exemplo.usuariosapp.data.remote.dto

import com.google.gson.annotations.SerializedName

data class ApiResponse<T>(
    @SerializedName("sucesso")
    val sucesso: Boolean,
    @SerializedName("mensagem")
    val mensagem: String,
    @SerializedName("dados")
    val dados: T? = null,
    @SerializedName("erros")
    val erros: List<ApiError>? = null
)

data class ApiError(
    @SerializedName("campo")
    val campo: String,
    @SerializedName("valor")
    val valor: String?,
    @SerializedName("mensagem")
    val mensagem: String
)

data class PaginatedResponse<T>(
    @SerializedName("sucesso")
    val sucesso: Boolean,
    @SerializedName("dados")
    val dados: PaginatedData<T>
)

data class PaginatedData<T>(
    val usuarios: List<T>,
    @SerializedName("paginacao")
    val paginacao: PaginationInfo
)

data class PaginationInfo(
    @SerializedName("paginaAtual")
    val paginaAtual: Int,
    @SerializedName("totalPaginas")
    val totalPaginas: Int,
    @SerializedName("totalItens")
    val totalItens: Int,
    @SerializedName("itensPorPagina")
    val itensPorPagina: Int
)
```

## Arquitetura MVVM com Clean Architecture

### Princípios da Clean Architecture

A Clean Architecture organiza o código em camadas bem definidas, cada uma com responsabilidades específicas:

1. **Camada de Apresentação (Presentation)**: Contém as telas, ViewModels e lógica de UI
2. **Camada de Domínio (Domain)**: Contém as regras de negócio, modelos e casos de uso
3. **Camada de Dados (Data)**: Contém repositórios, fontes de dados e mapeadores

### Interfaces dos Repositórios

Crie o arquivo `domain/repository/AuthRepository.kt`:

```kotlin
package com.exemplo.usuariosapp.domain.repository

import com.exemplo.usuariosapp.domain.model.*
import kotlinx.coroutines.flow.Flow

interface AuthRepository {
    suspend fun login(credentials: LoginCredentials): Result<AuthResponse>
    suspend fun register(registerData: RegisterData): Result<AuthResponse>
    suspend fun logout(): Result<Unit>
    suspend fun refreshToken(): Result<String>
    suspend fun forgotPassword(email: String): Result<Unit>
    suspend fun resetPassword(token: String, newPassword: String): Result<Unit>
    suspend fun changePassword(changePasswordData: ChangePasswordData): Result<Unit>
    suspend fun verifyToken(): Result<Unit>
    
    // Observar estado de autenticação
    fun getAuthState(): Flow<AuthState>
    suspend fun saveAuthData(authResponse: AuthResponse)
    suspend fun clearAuthData()
    suspend fun getStoredUser(): User?
    suspend fun getStoredToken(): String?
}
```

Crie o arquivo `domain/repository/UserRepository.kt`:

```kotlin
package com.exemplo.usuariosapp.domain.repository

import com.exemplo.usuariosapp.domain.model.User
import kotlinx.coroutines.flow.Flow

interface UserRepository {
    suspend fun getProfile(): Result<User>
    suspend fun updateProfile(user: User): Result<User>
    suspend fun uploadProfilePhoto(photoUri: String): Result<String>
    suspend fun getUsers(
        page: Int = 1,
        limit: Int = 10,
        search: String? = null,
        role: String? = null,
        active: Boolean? = null
    ): Result<List<User>>
    suspend fun getUserById(id: String): Result<User>
    suspend fun updateUserStatus(id: String, isActive: Boolean): Result<User>
    suspend fun deactivateAccount(): Result<Unit>
    
    // Cache local
    fun getCachedProfile(): Flow<User?>
    suspend fun cacheProfile(user: User)
    suspend fun clearCache()
}
```

### Casos de Uso

Crie o arquivo `domain/usecase/auth/LoginUseCase.kt`:

```kotlin
package com.exemplo.usuariosapp.domain.usecase.auth

import com.exemplo.usuariosapp.domain.model.AuthResponse
import com.exemplo.usuariosapp.domain.model.LoginCredentials
import com.exemplo.usuariosapp.domain.repository.AuthRepository
import javax.inject.Inject

class LoginUseCase @Inject constructor(
    private val authRepository: AuthRepository
) {
    suspend operator fun invoke(credentials: LoginCredentials): Result<AuthResponse> {
        // Validações de entrada
        if (credentials.email.isBlank()) {
            return Result.failure(Exception("Email é obrigatório"))
        }
        
        if (!isValidEmail(credentials.email)) {
            return Result.failure(Exception("Email deve ser válido"))
        }
        
        if (credentials.senha.isBlank()) {
            return Result.failure(Exception("Senha é obrigatória"))
        }
        
        if (credentials.senha.length < 6) {
            return Result.failure(Exception("Senha deve ter pelo menos 6 caracteres"))
        }
        
        return try {
            val result = authRepository.login(credentials)
            if (result.isSuccess) {
                // Salvar dados de autenticação
                result.getOrNull()?.let { authResponse ->
                    authRepository.saveAuthData(authResponse)
                }
            }
            result
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    private fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }
}
```

Crie o arquivo `domain/usecase/auth/RegisterUseCase.kt`:

```kotlin
package com.exemplo.usuariosapp.domain.usecase.auth

import com.exemplo.usuariosapp.domain.model.AuthResponse
import com.exemplo.usuariosapp.domain.model.RegisterData
import com.exemplo.usuariosapp.domain.repository.AuthRepository
import javax.inject.Inject

class RegisterUseCase @Inject constructor(
    private val authRepository: AuthRepository
) {
    suspend operator fun invoke(registerData: RegisterData): Result<AuthResponse> {
        // Validações de entrada
        if (registerData.nome.isBlank()) {
            return Result.failure(Exception("Nome é obrigatório"))
        }
        
        if (registerData.nome.length < 2) {
            return Result.failure(Exception("Nome deve ter pelo menos 2 caracteres"))
        }
        
        if (registerData.email.isBlank()) {
            return Result.failure(Exception("Email é obrigatório"))
        }
        
        if (!isValidEmail(registerData.email)) {
            return Result.failure(Exception("Email deve ser válido"))
        }
        
        if (registerData.senha.isBlank()) {
            return Result.failure(Exception("Senha é obrigatória"))
        }
        
        if (registerData.senha.length < 6) {
            return Result.failure(Exception("Senha deve ter pelo menos 6 caracteres"))
        }
        
        // Validar telefone se fornecido
        registerData.telefone?.let { telefone ->
            if (!isValidPhone(telefone)) {
                return Result.failure(Exception("Telefone deve estar em formato válido"))
            }
        }
        
        return try {
            val result = authRepository.register(registerData)
            if (result.isSuccess) {
                // Salvar dados de autenticação
                result.getOrNull()?.let { authResponse ->
                    authRepository.saveAuthData(authResponse)
                }
            }
            result
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    private fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }
    
    private fun isValidPhone(phone: String): Boolean {
        val phonePattern = "^(\\+55\\s?)?(\\(?\\d{2}\\)?\\s?)?\\d{4,5}-?\\d{4}$"
        return phone.matches(phonePattern.toRegex())
    }
}
```

### ViewModels

Crie o arquivo `presentation/viewmodel/AuthViewModel.kt`:

```kotlin
package com.exemplo.usuariosapp.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.exemplo.usuariosapp.domain.model.*
import com.exemplo.usuariosapp.domain.repository.AuthRepository
import com.exemplo.usuariosapp.domain.usecase.auth.LoginUseCase
import com.exemplo.usuariosapp.domain.usecase.auth.RegisterUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authRepository: AuthRepository,
    private val loginUseCase: LoginUseCase,
    private val registerUseCase: RegisterUseCase
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(AuthUiState())
    val uiState: StateFlow<AuthUiState> = _uiState.asStateFlow()
    
    val authState: StateFlow<AuthState> = authRepository.getAuthState()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = AuthState.Loading
        )
    
    fun login(email: String, password: String) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            
            val credentials = LoginCredentials(email.trim(), password)
            loginUseCase(credentials)
                .onSuccess { authResponse ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        loginSuccess = true
                    )
                }
                .onFailure { exception ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = exception.message ?: "Erro desconhecido"
                    )
                }
        }
    }
    
    fun register(
        nome: String,
        email: String,
        password: String,
        telefone: String? = null
    ) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            
            val registerData = RegisterData(
                nome = nome.trim(),
                email = email.trim(),
                senha = password,
                telefone = telefone?.trim()?.takeIf { it.isNotBlank() }
            )
            
            registerUseCase(registerData)
                .onSuccess { authResponse ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        registerSuccess = true
                    )
                }
                .onFailure { exception ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = exception.message ?: "Erro desconhecido"
                    )
                }
        }
    }
    
    fun logout() {
        viewModelScope.launch {
            authRepository.logout()
        }
    }
    
    fun forgotPassword(email: String) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            
            authRepository.forgotPassword(email.trim())
                .onSuccess {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        forgotPasswordSuccess = true
                    )
                }
                .onFailure { exception ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = exception.message ?: "Erro desconhecido"
                    )
                }
        }
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
    
    fun clearSuccessStates() {
        _uiState.value = _uiState.value.copy(
            loginSuccess = false,
            registerSuccess = false,
            forgotPasswordSuccess = false
        )
    }
}

data class AuthUiState(
    val isLoading: Boolean = false,
    val error: String? = null,
    val loginSuccess: Boolean = false,
    val registerSuccess: Boolean = false,
    val forgotPasswordSuccess: Boolean = false
)
```


## Configuração de Dependências

### Arquivo de Aplicação

Crie o arquivo `UsuariosApplication.kt`:

```kotlin
package com.exemplo.usuariosapp

import android.app.Application
import androidx.work.Configuration
import androidx.work.WorkManager
import dagger.hilt.android.HiltAndroidApp
import timber.log.Timber

@HiltAndroidApp
class UsuariosApplication : Application(), Configuration.Provider {
    
    override fun onCreate() {
        super.onCreate()
        
        // Configurar logging
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
        
        // Inicializar WorkManager
        WorkManager.initialize(this, workManagerConfiguration)
    }
    
    override fun getWorkManagerConfiguration(): Configuration {
        return Configuration.Builder()
            .setMinimumLoggingLevel(if (BuildConfig.DEBUG) android.util.Log.DEBUG else android.util.Log.ERROR)
            .build()
    }
}
```

### Configuração no Manifest

Atualize o arquivo `AndroidManifest.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Permissões -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
        android:maxSdkVersion="28" />
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <!-- Features -->
    <uses-feature
        android:name="android.hardware.camera"
        android:required="false" />
    <uses-feature
        android:name="android.hardware.fingerprint"
        android:required="false" />

    <application
        android:name=".UsuariosApplication"
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.UsuariosApp"
        android:usesCleartextTraffic="true"
        tools:targetApi="31">
        
        <activity
            android:name=".presentation.MainActivity"
            android:exported="true"
            android:theme="@style/Theme.UsuariosApp">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
        <!-- Provider para compartilhamento de arquivos -->
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>
    </application>
</manifest>
```

## Implementação com Jetpack Compose

### Tema e Design System

Crie o arquivo `presentation/ui/theme/Color.kt`:

```kotlin
package com.exemplo.usuariosapp.presentation.ui.theme

import androidx.compose.ui.graphics.Color

// Cores primárias
val Primary = Color(0xFF2563EB)
val PrimaryVariant = Color(0xFF1D4ED8)
val OnPrimary = Color(0xFFFFFFFF)

// Cores secundárias
val Secondary = Color(0xFF64748B)
val SecondaryVariant = Color(0xFF475569)
val OnSecondary = Color(0xFFFFFFFF)

// Cores de superfície
val Surface = Color(0xFFFFFFFF)
val OnSurface = Color(0xFF1F2937)
val Background = Color(0xFFF9FAFB)
val OnBackground = Color(0xFF1F2937)

// Cores de erro
val Error = Color(0xFFEF4444)
val OnError = Color(0xFFFFFFFF)

// Cores para modo escuro
val DarkPrimary = Color(0xFF3B82F6)
val DarkPrimaryVariant = Color(0xFF2563EB)
val DarkOnPrimary = Color(0xFF000000)

val DarkSecondary = Color(0xFF94A3B8)
val DarkSecondaryVariant = Color(0xFF64748B)
val DarkOnSecondary = Color(0xFF000000)

val DarkSurface = Color(0xFF1F2937)
val DarkOnSurface = Color(0xFFE5E7EB)
val DarkBackground = Color(0xFF111827)
val DarkOnBackground = Color(0xFFE5E7EB)

val DarkError = Color(0xFFF87171)
val DarkOnError = Color(0xFF000000)

// Cores utilitárias
val Success = Color(0xFF10B981)
val Warning = Color(0xFFF59E0B)
val Info = Color(0xFF3B82F6)

// Cores de texto
val TextPrimary = Color(0xFF1F2937)
val TextSecondary = Color(0xFF6B7280)
val TextDisabled = Color(0xFF9CA3AF)

// Cores de borda
val BorderLight = Color(0xFFE5E7EB)
val BorderMedium = Color(0xFFD1D5DB)
val BorderDark = Color(0xFF9CA3AF)
```

Crie o arquivo `presentation/ui/theme/Theme.kt`:

```kotlin
package com.exemplo.usuariosapp.presentation.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = DarkPrimary,
    onPrimary = DarkOnPrimary,
    primaryContainer = DarkPrimaryVariant,
    onPrimaryContainer = DarkOnPrimary,
    secondary = DarkSecondary,
    onSecondary = DarkOnSecondary,
    secondaryContainer = DarkSecondaryVariant,
    onSecondaryContainer = DarkOnSecondary,
    tertiary = Info,
    onTertiary = DarkOnPrimary,
    error = DarkError,
    onError = DarkOnError,
    errorContainer = DarkError,
    onErrorContainer = DarkOnError,
    background = DarkBackground,
    onBackground = DarkOnBackground,
    surface = DarkSurface,
    onSurface = DarkOnSurface,
    surfaceVariant = DarkSurface,
    onSurfaceVariant = DarkOnSurface,
    outline = BorderMedium
)

private val LightColorScheme = lightColorScheme(
    primary = Primary,
    onPrimary = OnPrimary,
    primaryContainer = PrimaryVariant,
    onPrimaryContainer = OnPrimary,
    secondary = Secondary,
    onSecondary = OnSecondary,
    secondaryContainer = SecondaryVariant,
    onSecondaryContainer = OnSecondary,
    tertiary = Info,
    onTertiary = OnPrimary,
    error = Error,
    onError = OnError,
    errorContainer = Error,
    onErrorContainer = OnError,
    background = Background,
    onBackground = OnBackground,
    surface = Surface,
    onSurface = OnSurface,
    surfaceVariant = Surface,
    onSurfaceVariant = OnSurface,
    outline = BorderLight
)

@Composable
fun UsuariosAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }
    
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
```

### Componentes Reutilizáveis

Crie o arquivo `presentation/ui/components/CustomButton.kt`:

```kotlin
package com.exemplo.usuariosapp.presentation.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun CustomButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    isLoading: Boolean = false,
    variant: ButtonVariant = ButtonVariant.Primary,
    size: ButtonSize = ButtonSize.Medium,
    icon: ImageVector? = null,
    iconPosition: IconPosition = IconPosition.Start
) {
    val buttonColors = when (variant) {
        ButtonVariant.Primary -> ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.primary,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            disabledContainerColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.5f),
            disabledContentColor = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.5f)
        )
        ButtonVariant.Secondary -> ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.secondary,
            contentColor = MaterialTheme.colorScheme.onSecondary,
            disabledContainerColor = MaterialTheme.colorScheme.secondary.copy(alpha = 0.5f),
            disabledContentColor = MaterialTheme.colorScheme.onSecondary.copy(alpha = 0.5f)
        )
        ButtonVariant.Outline -> ButtonDefaults.outlinedButtonColors(
            contentColor = MaterialTheme.colorScheme.primary,
            disabledContentColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.5f)
        )
        ButtonVariant.Danger -> ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.error,
            contentColor = MaterialTheme.colorScheme.onError,
            disabledContainerColor = MaterialTheme.colorScheme.error.copy(alpha = 0.5f),
            disabledContentColor = MaterialTheme.colorScheme.onError.copy(alpha = 0.5f)
        )
    }
    
    val buttonHeight = when (size) {
        ButtonSize.Small -> 36.dp
        ButtonSize.Medium -> 44.dp
        ButtonSize.Large -> 52.dp
    }
    
    val horizontalPadding = when (size) {
        ButtonSize.Small -> 12.dp
        ButtonSize.Medium -> 16.dp
        ButtonSize.Large -> 20.dp
    }
    
    val textStyle = when (size) {
        ButtonSize.Small -> MaterialTheme.typography.labelMedium
        ButtonSize.Medium -> MaterialTheme.typography.labelLarge
        ButtonSize.Large -> MaterialTheme.typography.titleMedium
    }

    when (variant) {
        ButtonVariant.Outline -> {
            OutlinedButton(
                onClick = onClick,
                enabled = enabled && !isLoading,
                colors = buttonColors,
                modifier = modifier.height(buttonHeight),
                contentPadding = PaddingValues(horizontal = horizontalPadding),
                shape = RoundedCornerShape(8.dp)
            ) {
                ButtonContent(
                    text = text,
                    isLoading = isLoading,
                    icon = icon,
                    iconPosition = iconPosition,
                    textStyle = textStyle
                )
            }
        }
        else -> {
            Button(
                onClick = onClick,
                enabled = enabled && !isLoading,
                colors = buttonColors,
                modifier = modifier.height(buttonHeight),
                contentPadding = PaddingValues(horizontal = horizontalPadding),
                shape = RoundedCornerShape(8.dp)
            ) {
                ButtonContent(
                    text = text,
                    isLoading = isLoading,
                    icon = icon,
                    iconPosition = iconPosition,
                    textStyle = textStyle
                )
            }
        }
    }
}

@Composable
private fun ButtonContent(
    text: String,
    isLoading: Boolean,
    icon: ImageVector?,
    iconPosition: IconPosition,
    textStyle: androidx.compose.ui.text.TextStyle
) {
    Row(
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (isLoading) {
            CircularProgressIndicator(
                modifier = Modifier.size(16.dp),
                strokeWidth = 2.dp,
                color = LocalContentColor.current
            )
            Spacer(modifier = Modifier.width(8.dp))
        } else if (icon != null && iconPosition == IconPosition.Start) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                modifier = Modifier.size(18.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
        }
        
        Text(
            text = text,
            style = textStyle.copy(fontWeight = FontWeight.Medium)
        )
        
        if (icon != null && iconPosition == IconPosition.End && !isLoading) {
            Spacer(modifier = Modifier.width(8.dp))
            Icon(
                imageVector = icon,
                contentDescription = null,
                modifier = Modifier.size(18.dp)
            )
        }
    }
}

enum class ButtonVariant {
    Primary, Secondary, Outline, Danger
}

enum class ButtonSize {
    Small, Medium, Large
}

enum class IconPosition {
    Start, End
}
```

Crie o arquivo `presentation/ui/components/CustomTextField.kt`:

```kotlin
package com.exemplo.usuariosapp.presentation.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CustomTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier,
    placeholder: String? = null,
    leadingIcon: ImageVector? = null,
    trailingIcon: ImageVector? = null,
    onTrailingIconClick: (() -> Unit)? = null,
    isError: Boolean = false,
    errorMessage: String? = null,
    helperText: String? = null,
    keyboardType: KeyboardType = KeyboardType.Text,
    imeAction: ImeAction = ImeAction.Next,
    onImeAction: (() -> Unit)? = null,
    isPassword: Boolean = false,
    enabled: Boolean = true,
    readOnly: Boolean = false,
    singleLine: Boolean = true,
    maxLines: Int = if (singleLine) 1 else Int.MAX_VALUE
) {
    var passwordVisible by remember { mutableStateOf(false) }
    
    Column(modifier = modifier) {
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            label = { Text(label) },
            placeholder = placeholder?.let { { Text(it) } },
            leadingIcon = leadingIcon?.let { 
                { Icon(imageVector = it, contentDescription = null) }
            },
            trailingIcon = when {
                isPassword -> {
                    {
                        IconButton(onClick = { passwordVisible = !passwordVisible }) {
                            Icon(
                                imageVector = if (passwordVisible) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                                contentDescription = if (passwordVisible) "Ocultar senha" else "Mostrar senha"
                            )
                        }
                    }
                }
                trailingIcon != null -> {
                    {
                        IconButton(onClick = { onTrailingIconClick?.invoke() }) {
                            Icon(imageVector = trailingIcon, contentDescription = null)
                        }
                    }
                }
                else -> null
            },
            isError = isError,
            visualTransformation = if (isPassword && !passwordVisible) {
                PasswordVisualTransformation()
            } else {
                VisualTransformation.None
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = keyboardType,
                imeAction = imeAction
            ),
            keyboardActions = KeyboardActions(
                onAny = { onImeAction?.invoke() }
            ),
            enabled = enabled,
            readOnly = readOnly,
            singleLine = singleLine,
            maxLines = maxLines,
            shape = RoundedCornerShape(8.dp),
            modifier = Modifier.fillMaxWidth()
        )
        
        // Mensagem de erro ou texto de ajuda
        if (isError && errorMessage != null) {
            Text(
                text = errorMessage,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp)
            )
        } else if (helperText != null) {
            Text(
                text = helperText,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp)
            )
        }
    }
}
```

## Gerenciamento de Estado

### Estados de UI

Crie o arquivo `presentation/ui/state/UiState.kt`:

```kotlin
package com.exemplo.usuariosapp.presentation.ui.state

sealed class UiState<out T> {
    object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String, val throwable: Throwable? = null) : UiState<Nothing>()
    object Empty : UiState<Nothing>()
}

inline fun <T> UiState<T>.onSuccess(action: (T) -> Unit): UiState<T> {
    if (this is UiState.Success) action(data)
    return this
}

inline fun <T> UiState<T>.onError(action: (String, Throwable?) -> Unit): UiState<T> {
    if (this is UiState.Error) action(message, throwable)
    return this
}

inline fun <T> UiState<T>.onLoading(action: () -> Unit): UiState<T> {
    if (this is UiState.Loading) action()
    return this
}

fun <T> UiState<T>.isLoading(): Boolean = this is UiState.Loading
fun <T> UiState<T>.isSuccess(): Boolean = this is UiState.Success
fun <T> UiState<T>.isError(): Boolean = this is UiState.Error
fun <T> UiState<T>.isEmpty(): Boolean = this is UiState.Empty

fun <T> UiState<T>.getDataOrNull(): T? = if (this is UiState.Success) data else null
```

## Networking com Retrofit

### Configuração da API

Crie o arquivo `data/remote/api/AuthApi.kt`:

```kotlin
package com.exemplo.usuariosapp.data.remote.api

import com.exemplo.usuariosapp.data.remote.dto.*
import retrofit2.Response
import retrofit2.http.*

interface AuthApi {
    
    @POST("auth/login")
    suspend fun login(@Body credentials: LoginDto): Response<ApiResponse<AuthResponseDto>>
    
    @POST("auth/registrar")
    suspend fun register(@Body registerData: RegisterDto): Response<ApiResponse<AuthResponseDto>>
    
    @POST("auth/logout")
    suspend fun logout(@Body refreshToken: RefreshTokenDto): Response<ApiResponse<Unit>>
    
    @POST("auth/renovar-token")
    suspend fun refreshToken(@Body refreshToken: RefreshTokenDto): Response<ApiResponse<AuthResponseDto>>
    
    @POST("auth/solicitar-reset-senha")
    suspend fun forgotPassword(@Body email: EmailDto): Response<ApiResponse<Unit>>
    
    @POST("auth/reset-senha")
    suspend fun resetPassword(@Body resetData: ResetPasswordDto): Response<ApiResponse<Unit>>
    
    @POST("auth/alterar-senha")
    suspend fun changePassword(@Body changePasswordData: ChangePasswordDto): Response<ApiResponse<Unit>>
}

// DTOs para requisições
data class LoginDto(
    val email: String,
    val senha: String
)

data class RegisterDto(
    val nome: String,
    val email: String,
    val senha: String,
    val telefone: String? = null,
    val dataNascimento: String? = null,
    val endereco: EnderecoDto? = null
)

data class RefreshTokenDto(
    val refreshToken: String
)

data class EmailDto(
    val email: String
)

data class ResetPasswordDto(
    val token: String,
    val novaSenha: String
)

data class ChangePasswordDto(
    val senhaAtual: String,
    val novaSenha: String
)

// DTOs para respostas
data class AuthResponseDto(
    val usuario: UserDto,
    val token: String,
    val refreshToken: String,
    val expiresIn: String
)

data class UserDto(
    val _id: String,
    val nome: String,
    val email: String,
    val telefone: String? = null,
    val dataNascimento: String? = null,
    val endereco: EnderecoDto? = null,
    val perfil: String,
    val isActive: Boolean,
    val emailVerificado: Boolean,
    val ultimoLogin: String? = null,
    val createdAt: String,
    val updatedAt: String,
    val fotoPerfil: String? = null
)

data class EnderecoDto(
    val rua: String? = null,
    val numero: String? = null,
    val complemento: String? = null,
    val bairro: String? = null,
    val cidade: String? = null,
    val estado: String? = null,
    val cep: String? = null
)
```

### Interceptadores HTTP

Crie o arquivo `data/remote/interceptor/AuthInterceptor.kt`:

```kotlin
package com.exemplo.usuariosapp.data.remote.interceptor

import com.exemplo.usuariosapp.data.local.datastore.AuthDataStore
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class AuthInterceptor @Inject constructor(
    private val authDataStore: AuthDataStore
) : Interceptor {
    
    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        
        // Não adicionar token para endpoints de autenticação
        val authEndpoints = listOf("/auth/login", "/auth/registrar", "/auth/solicitar-reset-senha", "/auth/reset-senha")
        val isAuthEndpoint = authEndpoints.any { originalRequest.url.encodedPath.contains(it) }
        
        if (isAuthEndpoint) {
            return chain.proceed(originalRequest)
        }
        
        // Obter token do DataStore
        val token = runBlocking {
            authDataStore.getToken().first()
        }
        
        val newRequest = if (token != null) {
            originalRequest.newBuilder()
                .addHeader("Authorization", "Bearer $token")
                .build()
        } else {
            originalRequest
        }
        
        return chain.proceed(newRequest)
    }
}
```

Crie o arquivo `data/remote/interceptor/TokenRefreshInterceptor.kt`:

```kotlin
package com.exemplo.usuariosapp.data.remote.interceptor

import com.exemplo.usuariosapp.data.local.datastore.AuthDataStore
import com.exemplo.usuariosapp.data.remote.api.AuthApi
import com.exemplo.usuariosapp.data.remote.dto.RefreshTokenDto
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class TokenRefreshInterceptor @Inject constructor(
    private val authDataStore: AuthDataStore,
    private val authApi: AuthApi
) : Interceptor {
    
    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        val response = chain.proceed(originalRequest)
        
        // Se recebeu 401 (Unauthorized), tentar renovar o token
        if (response.code == 401 && !originalRequest.url.encodedPath.contains("/auth/renovar-token")) {
            response.close()
            
            val refreshToken = runBlocking {
                authDataStore.getRefreshToken().first()
            }
            
            if (refreshToken != null) {
                try {
                    val refreshResponse = runBlocking {
                        authApi.refreshToken(RefreshTokenDto(refreshToken))
                    }
                    
                    if (refreshResponse.isSuccessful) {
                        val authResponse = refreshResponse.body()?.dados
                        if (authResponse != null) {
                            // Salvar novo token
                            runBlocking {
                                authDataStore.saveToken(authResponse.token)
                                authDataStore.saveRefreshToken(authResponse.refreshToken)
                            }
                            
                            // Tentar novamente a requisição original com o novo token
                            val newRequest = originalRequest.newBuilder()
                                .removeHeader("Authorization")
                                .addHeader("Authorization", "Bearer ${authResponse.token}")
                                .build()
                            
                            return chain.proceed(newRequest)
                        }
                    }
                } catch (e: Exception) {
                    // Falha na renovação do token, limpar dados de autenticação
                    runBlocking {
                        authDataStore.clearAuthData()
                    }
                }
            }
        }
        
        return response
    }
}
```

## Sistema de Autenticação

### DataStore para Persistência

Crie o arquivo `data/local/datastore/AuthDataStore.kt`:

```kotlin
package com.exemplo.usuariosapp.data.local.datastore

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import com.exemplo.usuariosapp.domain.model.User
import com.google.gson.Gson
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "auth_preferences")

@Singleton
class AuthDataStore @Inject constructor(
    @ApplicationContext private val context: Context,
    private val gson: Gson
) {
    private val dataStore = context.dataStore
    
    companion object {
        private val TOKEN_KEY = stringPreferencesKey("auth_token")
        private val REFRESH_TOKEN_KEY = stringPreferencesKey("refresh_token")
        private val USER_KEY = stringPreferencesKey("user_data")
        private val IS_LOGGED_IN_KEY = booleanPreferencesKey("is_logged_in")
        private val BIOMETRIC_ENABLED_KEY = booleanPreferencesKey("biometric_enabled")
    }
    
    // Token de acesso
    suspend fun saveToken(token: String) {
        dataStore.edit { preferences ->
            preferences[TOKEN_KEY] = token
        }
    }
    
    fun getToken(): Flow<String?> {
        return dataStore.data.map { preferences ->
            preferences[TOKEN_KEY]
        }
    }
    
    // Refresh token
    suspend fun saveRefreshToken(refreshToken: String) {
        dataStore.edit { preferences ->
            preferences[REFRESH_TOKEN_KEY] = refreshToken
        }
    }
    
    fun getRefreshToken(): Flow<String?> {
        return dataStore.data.map { preferences ->
            preferences[REFRESH_TOKEN_KEY]
        }
    }
    
    // Dados do usuário
    suspend fun saveUser(user: User) {
        dataStore.edit { preferences ->
            preferences[USER_KEY] = gson.toJson(user)
            preferences[IS_LOGGED_IN_KEY] = true
        }
    }
    
    fun getUser(): Flow<User?> {
        return dataStore.data.map { preferences ->
            preferences[USER_KEY]?.let { userJson ->
                try {
                    gson.fromJson(userJson, User::class.java)
                } catch (e: Exception) {
                    null
                }
            }
        }
    }
    
    // Status de login
    fun isLoggedIn(): Flow<Boolean> {
        return dataStore.data.map { preferences ->
            preferences[IS_LOGGED_IN_KEY] ?: false
        }
    }
    
    // Autenticação biométrica
    suspend fun setBiometricEnabled(enabled: Boolean) {
        dataStore.edit { preferences ->
            preferences[BIOMETRIC_ENABLED_KEY] = enabled
        }
    }
    
    fun isBiometricEnabled(): Flow<Boolean> {
        return dataStore.data.map { preferences ->
            preferences[BIOMETRIC_ENABLED_KEY] ?: false
        }
    }
    
    // Limpar todos os dados de autenticação
    suspend fun clearAuthData() {
        dataStore.edit { preferences ->
            preferences.remove(TOKEN_KEY)
            preferences.remove(REFRESH_TOKEN_KEY)
            preferences.remove(USER_KEY)
            preferences.remove(IS_LOGGED_IN_KEY)
        }
    }
}
```

### Implementação do Repositório de Autenticação

Crie o arquivo `data/repository/AuthRepositoryImpl.kt`:

```kotlin
package com.exemplo.usuariosapp.data.repository

import com.exemplo.usuariosapp.data.local.datastore.AuthDataStore
import com.exemplo.usuariosapp.data.mapper.AuthMapper
import com.exemplo.usuariosapp.data.remote.api.AuthApi
import com.exemplo.usuariosapp.data.remote.dto.*
import com.exemplo.usuariosapp.domain.model.*
import com.exemplo.usuariosapp.domain.repository.AuthRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.first
import javax.inject.Inject

class AuthRepositoryImpl @Inject constructor(
    private val authApi: AuthApi,
    private val authDataStore: AuthDataStore,
    private val authMapper: AuthMapper
) : AuthRepository {
    
    override suspend fun login(credentials: LoginCredentials): Result<AuthResponse> {
        return try {
            val loginDto = LoginDto(
                email = credentials.email,
                senha = credentials.senha
            )
            
            val response = authApi.login(loginDto)
            
            if (response.isSuccessful) {
                val apiResponse = response.body()
                if (apiResponse?.sucesso == true && apiResponse.dados != null) {
                    val authResponse = authMapper.mapToAuthResponse(apiResponse.dados)
                    Result.success(authResponse)
                } else {
                    Result.failure(Exception(apiResponse?.mensagem ?: "Erro desconhecido"))
                }
            } else {
                val errorBody = response.errorBody()?.string()
                val errorMessage = parseErrorMessage(errorBody) ?: "Erro na autenticação"
                Result.failure(Exception(errorMessage))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    override suspend fun register(registerData: RegisterData): Result<AuthResponse> {
        return try {
            val registerDto = authMapper.mapToRegisterDto(registerData)
            
            val response = authApi.register(registerDto)
            
            if (response.isSuccessful) {
                val apiResponse = response.body()
                if (apiResponse?.sucesso == true && apiResponse.dados != null) {
                    val authResponse = authMapper.mapToAuthResponse(apiResponse.dados)
                    Result.success(authResponse)
                } else {
                    Result.failure(Exception(apiResponse?.mensagem ?: "Erro desconhecido"))
                }
            } else {
                val errorBody = response.errorBody()?.string()
                val errorMessage = parseErrorMessage(errorBody) ?: "Erro no registro"
                Result.failure(Exception(errorMessage))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    override suspend fun logout(): Result<Unit> {
        return try {
            val refreshToken = authDataStore.getRefreshToken().first()
            
            if (refreshToken != null) {
                authApi.logout(RefreshTokenDto(refreshToken))
            }
            
            authDataStore.clearAuthData()
            Result.success(Unit)
        } catch (e: Exception) {
            // Mesmo em caso de erro, limpar dados locais
            authDataStore.clearAuthData()
            Result.success(Unit)
        }
    }
    
    override suspend fun refreshToken(): Result<String> {
        return try {
            val refreshToken = authDataStore.getRefreshToken().first()
                ?: return Result.failure(Exception("Refresh token não encontrado"))
            
            val response = authApi.refreshToken(RefreshTokenDto(refreshToken))
            
            if (response.isSuccessful) {
                val apiResponse = response.body()
                if (apiResponse?.sucesso == true && apiResponse.dados != null) {
                    val newToken = apiResponse.dados.token
                    authDataStore.saveToken(newToken)
                    
                    // Atualizar refresh token se fornecido
                    if (apiResponse.dados.refreshToken.isNotEmpty()) {
                        authDataStore.saveRefreshToken(apiResponse.dados.refreshToken)
                    }
                    
                    Result.success(newToken)
                } else {
                    Result.failure(Exception(apiResponse?.mensagem ?: "Erro ao renovar token"))
                }
            } else {
                Result.failure(Exception("Falha na renovação do token"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    override suspend fun forgotPassword(email: String): Result<Unit> {
        return try {
            val response = authApi.forgotPassword(EmailDto(email))
            
            if (response.isSuccessful) {
                val apiResponse = response.body()
                if (apiResponse?.sucesso == true) {
                    Result.success(Unit)
                } else {
                    Result.failure(Exception(apiResponse?.mensagem ?: "Erro ao solicitar reset"))
                }
            } else {
                Result.failure(Exception("Erro ao solicitar reset de senha"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    override suspend fun resetPassword(token: String, newPassword: String): Result<Unit> {
        return try {
            val resetDto = ResetPasswordDto(token, newPassword)
            val response = authApi.resetPassword(resetDto)
            
            if (response.isSuccessful) {
                val apiResponse = response.body()
                if (apiResponse?.sucesso == true) {
                    Result.success(Unit)
                } else {
                    Result.failure(Exception(apiResponse?.mensagem ?: "Erro ao resetar senha"))
                }
            } else {
                Result.failure(Exception("Erro ao resetar senha"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    override suspend fun changePassword(changePasswordData: ChangePasswordData): Result<Unit> {
        return try {
            val changeDto = ChangePasswordDto(
                senhaAtual = changePasswordData.senhaAtual,
                novaSenha = changePasswordData.novaSenha
            )
            
            val response = authApi.changePassword(changeDto)
            
            if (response.isSuccessful) {
                val apiResponse = response.body()
                if (apiResponse?.sucesso == true) {
                    Result.success(Unit)
                } else {
                    Result.failure(Exception(apiResponse?.mensagem ?: "Erro ao alterar senha"))
                }
            } else {
                Result.failure(Exception("Erro ao alterar senha"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    override suspend fun verifyToken(): Result<Unit> {
        return try {
            val token = authDataStore.getToken().first()
            if (token != null) {
                Result.success(Unit)
            } else {
                Result.failure(Exception("Token não encontrado"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    override fun getAuthState(): Flow<AuthState> {
        return combine(
            authDataStore.isLoggedIn(),
            authDataStore.getUser()
        ) { isLoggedIn, user ->
            when {
                isLoggedIn && user != null -> AuthState.Authenticated(user)
                else -> AuthState.Unauthenticated
            }
        }
    }
    
    override suspend fun saveAuthData(authResponse: AuthResponse) {
        authDataStore.saveToken(authResponse.token)
        authDataStore.saveRefreshToken(authResponse.refreshToken)
        authDataStore.saveUser(authResponse.user)
    }
    
    override suspend fun clearAuthData() {
        authDataStore.clearAuthData()
    }
    
    override suspend fun getStoredUser(): User? {
        return authDataStore.getUser().first()
    }
    
    override suspend fun getStoredToken(): String? {
        return authDataStore.getToken().first()
    }
    
    private fun parseErrorMessage(errorBody: String?): String? {
        return try {
            // Implementar parsing do JSON de erro se necessário
            errorBody
        } catch (e: Exception) {
            null
        }
    }
}
```

## Injeção de Dependência com Hilt

### Módulos de Injeção

Crie o arquivo `di/NetworkModule.kt`:

```kotlin
package com.exemplo.usuariosapp.di

import com.exemplo.usuariosapp.BuildConfig
import com.exemplo.usuariosapp.data.local.datastore.AuthDataStore
import com.exemplo.usuariosapp.data.remote.api.AuthApi
import com.exemplo.usuariosapp.data.remote.api.UserApi
import com.exemplo.usuariosapp.data.remote.interceptor.AuthInterceptor
import com.exemplo.usuariosapp.data.remote.interceptor.TokenRefreshInterceptor
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    
    @Provides
    @Singleton
    fun provideGson(): Gson {
        return GsonBuilder()
            .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            .create()
    }
    
    @Provides
    @Singleton
    fun provideHttpLoggingInterceptor(): HttpLoggingInterceptor {
        return HttpLoggingInterceptor().apply {
            level = if (BuildConfig.DEBUG) {
                HttpLoggingInterceptor.Level.BODY
            } else {
                HttpLoggingInterceptor.Level.NONE
            }
        }
    }
    
    @Provides
    @Singleton
    fun provideOkHttpClient(
        authInterceptor: AuthInterceptor,
        tokenRefreshInterceptor: TokenRefreshInterceptor,
        loggingInterceptor: HttpLoggingInterceptor
    ): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(authInterceptor)
            .addInterceptor(tokenRefreshInterceptor)
            .addInterceptor(loggingInterceptor)
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }
    
    @Provides
    @Singleton
    fun provideRetrofit(
        okHttpClient: OkHttpClient,
        gson: Gson
    ): Retrofit {
        return Retrofit.Builder()
            .baseUrl(BuildConfig.BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
    }
    
    @Provides
    @Singleton
    fun provideAuthApi(retrofit: Retrofit): AuthApi {
        return retrofit.create(AuthApi::class.java)
    }
    
    @Provides
    @Singleton
    fun provideUserApi(retrofit: Retrofit): UserApi {
        return retrofit.create(UserApi::class.java)
    }
}
```

Crie o arquivo `di/RepositoryModule.kt`:

```kotlin
package com.exemplo.usuariosapp.di

import com.exemplo.usuariosapp.data.repository.AuthRepositoryImpl
import com.exemplo.usuariosapp.data.repository.UserRepositoryImpl
import com.exemplo.usuariosapp.domain.repository.AuthRepository
import com.exemplo.usuariosapp.domain.repository.UserRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    
    @Binds
    @Singleton
    abstract fun bindAuthRepository(
        authRepositoryImpl: AuthRepositoryImpl
    ): AuthRepository
    
    @Binds
    @Singleton
    abstract fun bindUserRepository(
        userRepositoryImpl: UserRepositoryImpl
    ): UserRepository
}
```

## Coroutines e Programação Assíncrona

### Utilitários para Coroutines

Crie o arquivo `util/CoroutineUtils.kt`:

```kotlin
package com.exemplo.usuariosapp.util

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

/**
 * Executa uma operação com timeout e retry
 */
suspend fun <T> withRetry(
    times: Int = 3,
    initialDelay: Long = 1000,
    maxDelay: Long = 10000,
    factor: Double = 2.0,
    block: suspend () -> T
): T {
    var currentDelay = initialDelay
    repeat(times - 1) {
        try {
            return block()
        } catch (e: Exception) {
            delay(currentDelay)
            currentDelay = (currentDelay * factor).toLong().coerceAtMost(maxDelay)
        }
    }
    return block() // última tentativa
}

/**
 * Combina múltiplos flows em um único resultado
 */
fun <T1, T2, R> combineFlows(
    flow1: Flow<T1>,
    flow2: Flow<T2>,
    transform: suspend (T1, T2) -> R
): Flow<R> = flow1.combine(flow2, transform)

/**
 * Debounce para pesquisas
 */
fun <T> Flow<T>.debounceSearch(timeoutMillis: Long = 300): Flow<T> {
    return this.debounce(timeoutMillis)
        .distinctUntilChanged()
}

/**
 * Wrapper para operações de rede com loading state
 */
suspend fun <T> safeApiCall(
    apiCall: suspend () -> T
): Result<T> {
    return try {
        Result.success(apiCall())
    } catch (e: Exception) {
        Result.failure(e)
    }
}

/**
 * Extensão para converter Flow em StateFlow
 */
fun <T> Flow<T>.asStateFlow(
    scope: CoroutineScope,
    initialValue: T
): StateFlow<T> {
    return this.stateIn(
        scope = scope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = initialValue
    )
}
```

## Navegação com Navigation Component

### Configuração de Navegação

Crie o arquivo `presentation/navigation/NavigationGraph.kt`:

```kotlin
package com.exemplo.usuariosapp.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.exemplo.usuariosapp.domain.model.AuthState
import com.exemplo.usuariosapp.presentation.ui.screens.auth.*
import com.exemplo.usuariosapp.presentation.ui.screens.main.*
import com.exemplo.usuariosapp.presentation.ui.screens.splash.SplashScreen
import com.exemplo.usuariosapp.presentation.viewmodel.AuthViewModel

@Composable
fun NavigationGraph(
    navController: NavHostController,
    authViewModel: AuthViewModel = hiltViewModel()
) {
    val authState by authViewModel.authState.collectAsState()
    
    NavHost(
        navController = navController,
        startDestination = Screen.Splash.route
    ) {
        // Splash Screen
        composable(Screen.Splash.route) {
            SplashScreen(
                authState = authState,
                onNavigateToAuth = {
                    navController.navigate(Screen.Login.route) {
                        popUpTo(Screen.Splash.route) { inclusive = true }
                    }
                },
                onNavigateToMain = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Splash.route) { inclusive = true }
                    }
                }
            )
        }
        
        // Auth Screens
        composable(Screen.Login.route) {
            LoginScreen(
                onNavigateToRegister = {
                    navController.navigate(Screen.Register.route)
                },
                onNavigateToForgotPassword = {
                    navController.navigate(Screen.ForgotPassword.route)
                },
                onLoginSuccess = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                }
            )
        }
        
        composable(Screen.Register.route) {
            RegisterScreen(
                onNavigateBack = {
                    navController.popBackStack()
                },
                onRegisterSuccess = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Register.route) { inclusive = true }
                    }
                }
            )
        }
        
        composable(Screen.ForgotPassword.route) {
            ForgotPasswordScreen(
                onNavigateBack = {
                    navController.popBackStack()
                },
                onResetSent = {
                    navController.popBackStack()
                }
            )
        }
        
        // Main Screens
        composable(Screen.Dashboard.route) {
            DashboardScreen(
                onNavigateToProfile = {
                    navController.navigate(Screen.Profile.route)
                },
                onLogout = {
                    authViewModel.logout()
                    navController.navigate(Screen.Login.route) {
                        popUpTo(0) { inclusive = true }
                    }
                }
            )
        }
        
        composable(Screen.Profile.route) {
            ProfileScreen(
                onNavigateBack = {
                    navController.popBackStack()
                },
                onLogout = {
                    authViewModel.logout()
                    navController.navigate(Screen.Login.route) {
                        popUpTo(0) { inclusive = true }
                    }
                }
            )
        }
    }
}

sealed class Screen(val route: String) {
    object Splash : Screen("splash")
    object Login : Screen("login")
    object Register : Screen("register")
    object ForgotPassword : Screen("forgot_password")
    object Dashboard : Screen("dashboard")
    object Profile : Screen("profile")
}
```

## Persistência de Dados

### Configuração do Room

Crie o arquivo `data/local/database/AppDatabase.kt`:

```kotlin
package com.exemplo.usuariosapp.data.local.database

import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import android.content.Context
import com.exemplo.usuariosapp.data.local.dao.UserDao
import com.exemplo.usuariosapp.data.local.entity.UserEntity
import com.exemplo.usuariosapp.data.local.converter.Converters

@Database(
    entities = [UserEntity::class],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    
    abstract fun userDao(): UserDao
    
    companion object {
        const val DATABASE_NAME = "usuarios_app_database"
    }
}
```

### Entidades do Room

Crie o arquivo `data/local/entity/UserEntity.kt`:

```kotlin
package com.exemplo.usuariosapp.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.time.LocalDateTime

@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey
    val id: String,
    val nome: String,
    val email: String,
    val telefone: String?,
    val dataNascimento: String?,
    val endereco: String?, // JSON string
    val perfil: String,
    val isActive: Boolean,
    val emailVerificado: Boolean,
    val ultimoLogin: String?,
    val createdAt: String,
    val updatedAt: String,
    val fotoPerfil: String?,
    val cachedAt: Long = System.currentTimeMillis()
)
```

## Testes Automatizados

### Testes Unitários

Crie o arquivo `test/java/com/exemplo/usuariosapp/domain/usecase/LoginUseCaseTest.kt`:

```kotlin
package com.exemplo.usuariosapp.domain.usecase

import com.exemplo.usuariosapp.domain.model.*
import com.exemplo.usuariosapp.domain.repository.AuthRepository
import com.exemplo.usuariosapp.domain.usecase.auth.LoginUseCase
import kotlinx.coroutines.test.runTest
import org.junit.Before
import org.junit.Test
import org.mockito.Mock
import org.mockito.MockitoAnnotations
import org.mockito.kotlin.whenever
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class LoginUseCaseTest {
    
    @Mock
    private lateinit var authRepository: AuthRepository
    
    private lateinit var loginUseCase: LoginUseCase
    
    @Before
    fun setup() {
        MockitoAnnotations.openMocks(this)
        loginUseCase = LoginUseCase(authRepository)
    }
    
    @Test
    fun `login with valid credentials should return success`() = runTest {
        // Given
        val credentials = LoginCredentials("test@email.com", "password123")
        val expectedResponse = AuthResponse(
            user = createTestUser(),
            token = "test_token",
            refreshToken = "test_refresh_token",
            expiresIn = "7d"
        )
        
        whenever(authRepository.login(credentials)).thenReturn(Result.success(expectedResponse))
        
        // When
        val result = loginUseCase(credentials)
        
        // Then
        assertTrue(result.isSuccess)
        assertEquals(expectedResponse, result.getOrNull())
    }
    
    @Test
    fun `login with empty email should return failure`() = runTest {
        // Given
        val credentials = LoginCredentials("", "password123")
        
        // When
        val result = loginUseCase(credentials)
        
        // Then
        assertTrue(result.isFailure)
        assertEquals("Email é obrigatório", result.exceptionOrNull()?.message)
    }
    
    @Test
    fun `login with invalid email should return failure`() = runTest {
        // Given
        val credentials = LoginCredentials("invalid-email", "password123")
        
        // When
        val result = loginUseCase(credentials)
        
        // Then
        assertTrue(result.isFailure)
        assertEquals("Email deve ser válido", result.exceptionOrNull()?.message)
    }
    
    @Test
    fun `login with short password should return failure`() = runTest {
        // Given
        val credentials = LoginCredentials("test@email.com", "123")
        
        // When
        val result = loginUseCase(credentials)
        
        // Then
        assertTrue(result.isFailure)
        assertEquals("Senha deve ter pelo menos 6 caracteres", result.exceptionOrNull()?.message)
    }
    
    private fun createTestUser(): User {
        return User(
            id = "1",
            nome = "Test User",
            email = "test@email.com",
            perfil = UserRole.USUARIO,
            isActive = true,
            emailVerificado = true,
            createdAt = java.time.LocalDateTime.now(),
            updatedAt = java.time.LocalDateTime.now()
        )
    }
}
```

### Testes de UI

Crie o arquivo `androidTest/java/com/exemplo/usuariosapp/presentation/ui/LoginScreenTest.kt`:

```kotlin
package com.exemplo.usuariosapp.presentation.ui

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.exemplo.usuariosapp.presentation.ui.screens.auth.LoginScreen
import com.exemplo.usuariosapp.presentation.ui.theme.UsuariosAppTheme
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class LoginScreenTest {
    
    @get:Rule
    val composeTestRule = createComposeRule()
    
    @Test
    fun loginScreen_displaysAllElements() {
        composeTestRule.setContent {
            UsuariosAppTheme {
                LoginScreen(
                    onNavigateToRegister = {},
                    onNavigateToForgotPassword = {},
                    onLoginSuccess = {}
                )
            }
        }
        
        // Verificar se os elementos estão presentes
        composeTestRule.onNodeWithText("Email").assertIsDisplayed()
        composeTestRule.onNodeWithText("Senha").assertIsDisplayed()
        composeTestRule.onNodeWithText("Entrar").assertIsDisplayed()
        composeTestRule.onNodeWithText("Esqueceu sua senha?").assertIsDisplayed()
    }
    
    @Test
    fun loginScreen_emailInput_acceptsText() {
        composeTestRule.setContent {
            UsuariosAppTheme {
                LoginScreen(
                    onNavigateToRegister = {},
                    onNavigateToForgotPassword = {},
                    onLoginSuccess = {}
                )
            }
        }
        
        val emailInput = composeTestRule.onNodeWithText("Email")
        emailInput.performTextInput("test@email.com")
        emailInput.assertTextEquals("test@email.com")
    }
    
    @Test
    fun loginScreen_passwordInput_hidesText() {
        composeTestRule.setContent {
            UsuariosAppTheme {
                LoginScreen(
                    onNavigateToRegister = {},
                    onNavigateToForgotPassword = {},
                    onLoginSuccess = {}
                )
            }
        }
        
        val passwordInput = composeTestRule.onNodeWithText("Senha")
        passwordInput.performTextInput("password123")
        
        // Verificar se a senha está oculta (não deve mostrar o texto real)
        composeTestRule.onNodeWithText("password123").assertDoesNotExist()
    }
}
```

## Segurança e Criptografia

### Utilitários de Segurança

Crie o arquivo `util/SecurityUtils.kt`:

```kotlin
package com.exemplo.usuariosapp.util

import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.IvParameterSpec
import android.util.Base64

object SecurityUtils {
    
    private const val ANDROID_KEYSTORE = "AndroidKeyStore"
    private const val KEY_ALIAS = "UsuariosAppKey"
    private const val TRANSFORMATION = "AES/CBC/PKCS7Padding"
    
    /**
     * Gera uma chave no Android Keystore
     */
    fun generateKey(): SecretKey {
        val keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, ANDROID_KEYSTORE)
        
        val keyGenParameterSpec = KeyGenParameterSpec.Builder(
            KEY_ALIAS,
            KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
        )
            .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
            .setUserAuthenticationRequired(false)
            .build()
        
        keyGenerator.init(keyGenParameterSpec)
        return keyGenerator.generateKey()
    }
    
    /**
     * Obtém a chave do Android Keystore
     */
    private fun getKey(): SecretKey? {
        val keyStore = KeyStore.getInstance(ANDROID_KEYSTORE)
        keyStore.load(null)
        
        return if (keyStore.containsAlias(KEY_ALIAS)) {
            keyStore.getKey(KEY_ALIAS, null) as SecretKey
        } else {
            generateKey()
        }
    }
    
    /**
     * Criptografa dados sensíveis
     */
    fun encrypt(data: String): String? {
        return try {
            val key = getKey() ?: return null
            val cipher = Cipher.getInstance(TRANSFORMATION)
            cipher.init(Cipher.ENCRYPT_MODE, key)
            
            val iv = cipher.iv
            val encryptedData = cipher.doFinal(data.toByteArray())
            
            // Combinar IV + dados criptografados
            val combined = iv + encryptedData
            Base64.encodeToString(combined, Base64.DEFAULT)
        } catch (e: Exception) {
            null
        }
    }
    
    /**
     * Descriptografa dados sensíveis
     */
    fun decrypt(encryptedData: String): String? {
        return try {
            val key = getKey() ?: return null
            val combined = Base64.decode(encryptedData, Base64.DEFAULT)
            
            // Separar IV dos dados criptografados
            val iv = combined.sliceArray(0..15)
            val encrypted = combined.sliceArray(16 until combined.size)
            
            val cipher = Cipher.getInstance(TRANSFORMATION)
            cipher.init(Cipher.DECRYPT_MODE, key, IvParameterSpec(iv))
            
            val decryptedData = cipher.doFinal(encrypted)
            String(decryptedData)
        } catch (e: Exception) {
            null
        }
    }
    
    /**
     * Valida força da senha
     */
    fun validatePasswordStrength(password: String): PasswordStrength {
        var score = 0
        val feedback = mutableListOf<String>()
        
        if (password.length >= 8) score++ else feedback.add("Use pelo menos 8 caracteres")
        if (password.any { it.isLowerCase() }) score++ else feedback.add("Inclua letras minúsculas")
        if (password.any { it.isUpperCase() }) score++ else feedback.add("Inclua letras maiúsculas")
        if (password.any { it.isDigit() }) score++ else feedback.add("Inclua números")
        if (password.any { !it.isLetterOrDigit() }) score++ else feedback.add("Inclua caracteres especiais")
        
        val strength = when (score) {
            0, 1 -> PasswordStrength.WEAK
            2, 3 -> PasswordStrength.MEDIUM
            4 -> PasswordStrength.STRONG
            5 -> PasswordStrength.VERY_STRONG
            else -> PasswordStrength.WEAK
        }
        
        return strength.copy(feedback = feedback)
    }
}

data class PasswordStrength(
    val level: Level,
    val feedback: List<String> = emptyList()
) {
    enum class Level {
        WEAK, MEDIUM, STRONG, VERY_STRONG
    }
    
    companion object {
        val WEAK = PasswordStrength(Level.WEAK)
        val MEDIUM = PasswordStrength(Level.MEDIUM)
        val STRONG = PasswordStrength(Level.STRONG)
        val VERY_STRONG = PasswordStrength(Level.VERY_STRONG)
    }
    
    fun copy(feedback: List<String>) = PasswordStrength(level, feedback)
}
```

## Build e Deploy

### Configuração de Build Types

Atualize o arquivo `build.gradle (Module: app)` com configurações de build:

```kotlin
android {
    // ... outras configurações
    
    buildTypes {
        debug {
            debuggable true
            applicationIdSuffix ".debug"
            versionNameSuffix "-debug"
            buildConfigField "String", "BASE_URL", "\"http://10.0.2.2:3000/api/\""
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
        }
        
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            buildConfigField "String", "BASE_URL", "\"https://sua-api-producao.com/api/\""
            buildConfigField "boolean", "ENABLE_LOGGING", "false"
            
            signingConfig signingConfigs.release
        }
        
        staging {
            initWith debug
            applicationIdSuffix ".staging"
            versionNameSuffix "-staging"
            buildConfigField "String", "BASE_URL", "\"https://sua-api-staging.com/api/\""
            buildConfigField "boolean", "ENABLE_LOGGING", "true"
        }
    }
    
    signingConfigs {
        release {
            // Configurar assinatura para release
            storeFile file("path/to/keystore.jks")
            storePassword "store_password"
            keyAlias "key_alias"
            keyPassword "key_password"
        }
    }
}
```

### Scripts de Build

Crie o arquivo `scripts/build.sh`:

```bash
#!/bin/bash

# Script de build para diferentes ambientes

set -e

ENVIRONMENT=${1:-debug}
BUILD_TYPE=${2:-assembleDebug}

echo "Building for environment: $ENVIRONMENT"
echo "Build type: $BUILD_TYPE"

# Limpar projeto
./gradlew clean

# Executar testes
if [ "$ENVIRONMENT" != "release" ]; then
    echo "Running tests..."
    ./gradlew test
fi

# Build
case $ENVIRONMENT in
    "debug")
        ./gradlew assembleDebug
        ;;
    "staging")
        ./gradlew assembleStaging
        ;;
    "release")
        ./gradlew assembleRelease
        ;;
    *)
        echo "Unknown environment: $ENVIRONMENT"
        exit 1
        ;;
esac

echo "Build completed successfully!"
```

## Referências

[1] Android Developers Documentation - https://developer.android.com/
[2] Kotlin Documentation - https://kotlinlang.org/docs/
[3] Jetpack Compose Documentation - https://developer.android.com/jetpack/compose
[4] Android Architecture Components - https://developer.android.com/topic/libraries/architecture
[5] Retrofit Documentation - https://square.github.io/retrofit/
[6] Hilt Dependency Injection - https://dagger.dev/hilt/
[7] Kotlin Coroutines Guide - https://kotlinlang.org/docs/coroutines-guide.html
[8] Room Persistence Library - https://developer.android.com/training/data-storage/room
[9] Android Security Best Practices - https://developer.android.com/topic/security/best-practices
[10] Android Testing Documentation - https://developer.android.com/training/testing

---

**Conclusão**

Este tutorial apresentou um guia completo para o desenvolvimento de um aplicativo Android nativo moderno utilizando Kotlin e as mais recentes tecnologias do ecossistema Android. A implementação segue as melhores práticas de arquitetura, segurança e desenvolvimento, resultando em uma aplicação robusta, escalável e maintível.

O aplicativo desenvolvido oferece uma experiência de usuário fluida e intuitiva, com arquitetura bem estruturada que facilita a manutenção e evolução do código. As tecnologias utilizadas garantem performance otimizada e compatibilidade com as versões mais recentes do Android, enquanto as medidas de segurança implementadas protegem adequadamente os dados dos usuários.

