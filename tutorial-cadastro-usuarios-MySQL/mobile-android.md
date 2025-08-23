# Aplicativo Android Nativo com Kotlin para Cadastro de Usuários

## Introdução

O desenvolvimento de aplicações móveis nativas para Android representa uma das áreas mais dinâmicas e em constante evolução da programação moderna. Kotlin, oficialmente adotado pelo Google como linguagem preferencial para desenvolvimento Android em 2017, revolucionou a forma como desenvolvedores criam aplicações móveis, oferecendo sintaxe mais concisa, segurança de tipos aprimorada e interoperabilidade total com Java.

Android, como sistema operacional móvel mais utilizado globalmente, alimenta bilhões de dispositivos em todo o mundo, desde smartphones básicos até tablets premium e dispositivos IoT. Esta ubiquidade torna o desenvolvimento Android uma habilidade extremamente valiosa para programadores que desejam alcançar audiências massivas e criar impacto significativo no mercado móvel.

Kotlin trouxe modernidade ao desenvolvimento Android através de recursos como null safety, extension functions, data classes e coroutines para programação assíncrona. Estes recursos não apenas melhoram a produtividade do desenvolvedor, mas também resultam em aplicações mais robustas, performáticas e menos propensas a crashes comuns em aplicações Java tradicionais.

Neste tutorial abrangente, você aprenderá a construir um aplicativo Android completo utilizando Kotlin e as mais modernas ferramentas e bibliotecas do ecossistema Android. O aplicativo implementará funcionalidades de cadastro de usuários, autenticação segura, gerenciamento de perfil e sincronização com a API REST desenvolvida nas seções anteriores.

Durante este tutorial, exploraremos conceitos fundamentais como Activities, Fragments, ViewModels, LiveData, Room Database, Retrofit para comunicação HTTP, e Jetpack Compose para interfaces modernas. Também abordaremos tópicos avançados como arquitetura MVVM, injeção de dependências com Hilt, testes automatizados e boas práticas de segurança móvel.

A aplicação resultante demonstrará padrões profissionais de desenvolvimento Android, incluindo gerenciamento adequado de ciclo de vida, tratamento de estados de rede, persistência local de dados, e experiência de usuário otimizada para diferentes tamanhos de tela e orientações de dispositivo.

## Configuração do Ambiente de Desenvolvimento

### Instalação do Android Studio

Android Studio é o ambiente de desenvolvimento integrado (IDE) oficial para desenvolvimento Android, baseado no IntelliJ IDEA da JetBrains. Esta ferramenta poderosa oferece todas as funcionalidades necessárias para desenvolvimento, debugging, testing e deployment de aplicações Android profissionais.

Para instalar Android Studio, visite o site oficial developer.android.com/studio e baixe a versão mais recente para seu sistema operacional. O instalador inclui automaticamente o Android SDK, ferramentas de build, emuladores e outras dependências essenciais, simplificando significativamente o processo de configuração inicial.

Durante a instalação, certifique-se de aceitar as licenças do Android SDK e permitir que o instalador baixe componentes adicionais necessários. Este processo pode demorar considerável tempo dependendo da velocidade de sua conexão de internet, pois inclui download de imagens de sistema para emuladores e ferramentas de desenvolvimento.

Após a instalação, execute Android Studio e complete o processo de configuração inicial através do Setup Wizard. Este assistente configurará automaticamente o SDK path, criará um dispositivo virtual padrão para testes, e verificará se todas as dependências estão corretamente instaladas.

É recomendado instalar pelo menos duas versões de API do Android: uma versão recente (API 33 ou superior) para desenvolvimento com recursos modernos, e uma versão mais antiga (API 21 ou 23) para garantir compatibilidade com dispositivos legados que ainda representam parcela significativa do mercado Android.

### Configuração do SDK e Ferramentas

O Android SDK (Software Development Kit) contém todas as bibliotecas, ferramentas e documentação necessárias para desenvolvimento Android. Através do SDK Manager integrado ao Android Studio, você pode gerenciar diferentes versões de API, ferramentas de build, e componentes específicos conforme necessário.

Acesse o SDK Manager através de Tools > SDK Manager e verifique se os seguintes componentes estão instalados: Android SDK Platform para as versões de API que você planeja suportar, Android SDK Build-Tools na versão mais recente, Android Emulator para testes em dispositivos virtuais, e Google Play Services para funcionalidades como mapas, autenticação e analytics.

Para desenvolvimento Kotlin moderno, certifique-se de que o plugin Kotlin está habilitado e atualizado. Android Studio inclui suporte nativo ao Kotlin, mas é importante manter o plugin atualizado para acessar recursos mais recentes da linguagem e melhorias de performance do compilador.

Configure também o Android Virtual Device (AVD) Manager para criar emuladores que simulem diferentes dispositivos e configurações. Crie pelo menos dois AVDs: um smartphone moderno com tela grande e API recente, e um dispositivo com especificações mais modestas e API mais antiga para testar compatibilidade e performance.

A configuração adequada de variáveis de ambiente como ANDROID_HOME e PATH facilita uso de ferramentas de linha de comando como ADB (Android Debug Bridge) e Gradle. Embora Android Studio gerencie automaticamente estas configurações, ter acesso direto via terminal é valioso para automação e debugging avançado.

### Criação do Projeto Android

Inicie um novo projeto Android através de File > New > New Project no Android Studio. O wizard de criação oferece diversos templates pré-configurados, mas para nosso tutorial, selecione "Empty Activity" que fornece estrutura básica sem código desnecessário, permitindo implementação completa desde o início.

Configure o projeto com nome "CadastroUsuarios", package name "com.exemplo.cadastrousuarios", linguagem Kotlin, e API mínima 21 (Android 5.0) para garantir compatibilidade com aproximadamente 95% dos dispositivos Android ativos. Esta configuração oferece excelente equilíbrio entre recursos modernos e alcance de mercado.

Após criação do projeto, examine a estrutura de diretórios gerada. O diretório `app/src/main/java` contém código Kotlin, `app/src/main/res` contém recursos como layouts, strings e imagens, e `app/src/main/AndroidManifest.xml` define configurações e permissões da aplicação.

O arquivo `build.gradle` (Module: app) é fundamental para configuração de dependências, versões de compilação e configurações específicas do módulo. Este arquivo será frequentemente modificado durante desenvolvimento para adicionar bibliotecas e configurar recursos avançados.

Verifique se o projeto compila corretamente executando Build > Make Project. Uma compilação bem-sucedida confirma que o ambiente está configurado adequadamente e pronto para desenvolvimento. Caso ocorram erros, geralmente relacionam-se a versões incompatíveis de SDK ou problemas de conectividade durante download de dependências.

### Configuração de Dependências

Modifique o arquivo `app/build.gradle` para incluir dependências necessárias para nosso aplicativo de cadastro de usuários. Estas bibliotecas fornecerão funcionalidades essenciais como comunicação HTTP, gerenciamento de estado, injeção de dependências e interface moderna.

```kotlin
dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.7.0'
    implementation 'androidx.activity:activity-compose:1.8.2'
    
    // Jetpack Compose
    implementation platform('androidx.compose:compose-bom:2023.10.01')
    implementation 'androidx.compose.ui:ui'
    implementation 'androidx.compose.ui:ui-graphics'
    implementation 'androidx.compose.ui:ui-tooling-preview'
    implementation 'androidx.compose.material3:material3'
    
    // Navigation
    implementation 'androidx.navigation:navigation-compose:2.7.5'
    
    // ViewModel
    implementation 'androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    
    // Networking
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    
    // Dependency Injection
    implementation 'com.google.dagger:hilt-android:2.48'
    kapt 'com.google.dagger:hilt-compiler:2.48'
    implementation 'androidx.hilt:hilt-navigation-compose:1.1.0'
    
    // Local Storage
    implementation 'androidx.datastore:datastore-preferences:1.0.0'
    
    // Image Loading
    implementation 'io.coil-kt:coil-compose:2.5.0'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    testImplementation 'org.mockito:mockito-core:5.7.0'
    testImplementation 'org.mockito.kotlin:mockito-kotlin:5.1.0'
    testImplementation 'androidx.arch.core:core-testing:2.2.0'
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3'
    
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation platform('androidx.compose:compose-bom:2023.10.01')
    androidTestImplementation 'androidx.compose.ui:ui-test-junit4'
    
    debugImplementation 'androidx.compose.ui:ui-tooling'
    debugImplementation 'androidx.compose.ui:ui-test-manifest'
}
```

Adicione também as configurações necessárias no topo do arquivo `build.gradle`:

```kotlin
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
}

android {
    compileSdk 34

    defaultConfig {
        applicationId "com.exemplo.cadastrousuarios"
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary true
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
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
    }
    
    composeOptions {
        kotlinCompilerExtensionVersion '1.5.4'
    }
    
    packaging {
        resources {
            excludes += '/META-INF/{AL2.0,LGPL2.1}'
        }
    }
}
```

No arquivo `build.gradle` do projeto (nível raiz), adicione o plugin do Hilt:

```kotlin
plugins {
    id 'com.android.application' version '8.1.4' apply false
    id 'org.jetbrains.kotlin.android' version '1.9.10' apply false
    id 'com.google.dagger.hilt.android' version '2.48' apply false
}
```

Estas dependências fornecem base sólida para desenvolvimento Android moderno. Jetpack Compose revoluciona criação de interfaces com paradigma declarativo, Retrofit simplifica comunicação HTTP, Hilt oferece injeção de dependências robusta, e DataStore substitui SharedPreferences com API mais moderna e type-safe.

## Arquitetura MVVM e Estrutura do Projeto

### Conceitos Fundamentais da Arquitetura MVVM

Model-View-ViewModel (MVVM) é o padrão arquitetural recomendado pelo Google para aplicações Android modernas. Esta arquitetura promove separação clara de responsabilidades, facilita testes automatizados, e melhora manutenibilidade através de acoplamento reduzido entre componentes.

O Model representa dados e lógica de negócio da aplicação, incluindo repositórios que abstraem fontes de dados como APIs REST, bancos de dados locais, e SharedPreferences. Models são independentes de framework Android, facilitando testes unitários e reutilização em diferentes contextos.

A View corresponde à interface de usuário, implementada através de Activities, Fragments, ou Composables no caso de Jetpack Compose. Views são responsáveis apenas por exibir dados e capturar interações do usuário, delegando toda lógica de negócio para ViewModels.

ViewModel atua como intermediário entre View e Model, expondo dados observáveis e métodos para interação do usuário. ViewModels sobrevivem a mudanças de configuração como rotação de tela, mantendo estado da interface e evitando perda de dados durante recriação de Activities.

A comunicação entre camadas segue fluxo unidirecional: Views observam dados expostos por ViewModels através de LiveData ou StateFlow, ViewModels interagem com Repositories para obter/modificar dados, e Repositories coordenam acesso a diferentes fontes de dados mantendo cache local quando apropriado.

### Estrutura de Diretórios

Organize o projeto seguindo estrutura modular que facilite navegação e manutenção conforme aplicação cresce em complexidade. Crie a seguinte hierarquia de pacotes dentro de `com.exemplo.cadastrousuarios`:

```
com.exemplo.cadastrousuarios/
├── data/
│   ├── local/
│   │   ├── datastore/
│   │   └── preferences/
│   ├── remote/
│   │   ├── api/
│   │   ├── dto/
│   │   └── interceptors/
│   └── repository/
├── domain/
│   ├── model/
│   ├── repository/
│   └── usecase/
├── presentation/
│   ├── ui/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   └── common/
│   ├── viewmodel/
│   └── navigation/
├── di/
└── utils/
```

O pacote `data` contém implementações concretas de acesso a dados, incluindo APIs REST, armazenamento local, e repositórios que coordenam diferentes fontes. Esta camada é responsável por transformar dados externos em modelos de domínio utilizados pela aplicação.

O pacote `domain` define contratos e modelos de negócio independentes de framework Android. Use cases encapsulam lógica de negócio específica, enquanto interfaces de repository definem contratos para acesso a dados sem especificar implementação.

O pacote `presentation` contém toda lógica relacionada à interface de usuário, incluindo Composables, ViewModels, e navegação. Esta organização facilita localização de código específico de UI e permite modificações visuais sem afetar lógica de negócio.

O pacote `di` centraliza configuração de injeção de dependências usando Hilt, definindo como diferentes componentes são criados e injetados. O pacote `utils` contém funções auxiliares, extensões, e constantes utilizadas em múltiplas partes da aplicação.

### Configuração da Injeção de Dependências

Crie a classe Application personalizada para inicializar Hilt. No arquivo `CadastroUsuariosApplication.kt`:

```kotlin
package com.exemplo.cadastrousuarios

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class CadastroUsuariosApplication : Application()
```

Registre a Application no `AndroidManifest.xml`:

```xml
<application
    android:name=".CadastroUsuariosApplication"
    android:allowBackup="true"
    android:dataExtractionRules="@xml/data_extraction_rules"
    android:fullBackupContent="@xml/backup_rules"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:theme="@style/Theme.CadastroUsuarios"
    tools:targetApi="31">
    
    <!-- Activities serão definidas aqui -->
    
</application>
```

Crie módulos Hilt para configurar dependências. No arquivo `di/NetworkModule.kt`:

```kotlin
package com.exemplo.cadastrousuarios.di

import com.exemplo.cadastrousuarios.data.remote.api.AuthApi
import com.exemplo.cadastrousuarios.data.remote.api.UserApi
import com.exemplo.cadastrousuarios.data.remote.interceptors.AuthInterceptor
import com.exemplo.cadastrousuarios.utils.Constants
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
    fun provideHttpLoggingInterceptor(): HttpLoggingInterceptor {
        return HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
    }

    @Provides
    @Singleton
    fun provideOkHttpClient(
        authInterceptor: AuthInterceptor,
        loggingInterceptor: HttpLoggingInterceptor
    ): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(authInterceptor)
            .addInterceptor(loggingInterceptor)
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }

    @Provides
    @Singleton
    fun provideRetrofit(okHttpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
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

A configuração adequada de injeção de dependências elimina acoplamento forte entre componentes e facilita testes através de substituição fácil de implementações. Hilt automatiza muito do código boilerplate tradicionalmente necessário para DI em Android.

## Modelos de Dados e DTOs

### Definição de Modelos de Domínio

Crie modelos que representem entidades de negócio da aplicação. No arquivo `domain/model/User.kt`:

```kotlin
package com.exemplo.cadastrousuarios.domain.model

import java.util.Date

data class User(
    val id: Long,
    val username: String,
    val email: String,
    val firstName: String,
    val lastName: String,
    val isActive: Boolean,
    val emailVerified: Boolean,
    val createdAt: Date,
    val updatedAt: Date?
) {
    val fullName: String
        get() = "$firstName $lastName"
    
    val initials: String
        get() = "${firstName.firstOrNull()?.uppercase()}${lastName.firstOrNull()?.uppercase()}"
}

data class AuthToken(
    val token: String,
    val expiresIn: String,
    val user: User
)

data class LoginCredentials(
    val identifier: String,
    val password: String
)

data class RegisterData(
    val username: String,
    val email: String,
    val password: String,
    val firstName: String,
    val lastName: String
)

data class UpdateProfileData(
    val username: String? = null,
    val email: String? = null,
    val firstName: String? = null,
    val lastName: String? = null,
    val password: String? = null
)
```

### Data Transfer Objects (DTOs)

Crie DTOs para comunicação com API. No arquivo `data/remote/dto/AuthDto.kt`:

```kotlin
package com.exemplo.cadastrousuarios.data.remote.dto

import com.google.gson.annotations.SerializedName
import java.util.Date

data class LoginRequestDto(
    val identifier: String,
    val password: String
)

data class RegisterRequestDto(
    val username: String,
    val email: String,
    val password: String,
    @SerializedName("firstName")
    val firstName: String,
    @SerializedName("lastName")
    val lastName: String
)

data class AuthResponseDto(
    val success: Boolean,
    val message: String,
    val data: AuthDataDto?
)

data class AuthDataDto(
    val user: UserDto,
    val token: String,
    @SerializedName("expiresIn")
    val expiresIn: String
)

data class UserDto(
    val id: Long,
    val username: String,
    val email: String,
    @SerializedName("firstName")
    val firstName: String,
    @SerializedName("lastName")
    val lastName: String,
    @SerializedName("isActive")
    val isActive: Boolean,
    @SerializedName("emailVerified")
    val emailVerified: Boolean,
    @SerializedName("createdAt")
    val createdAt: Date,
    @SerializedName("updatedAt")
    val updatedAt: Date?
)

data class ApiErrorDto(
    val success: Boolean,
    val message: String,
    val errors: List<FieldErrorDto>?
)

data class FieldErrorDto(
    val field: String,
    val message: String,
    val value: String?
)
```

### Mappers para Conversão de Dados

Crie mappers para converter entre DTOs e modelos de domínio. No arquivo `data/remote/dto/Mappers.kt`:

```kotlin
package com.exemplo.cadastrousuarios.data.remote.dto

import com.exemplo.cadastrousuarios.domain.model.AuthToken
import com.exemplo.cadastrousuarios.domain.model.User

fun UserDto.toDomain(): User {
    return User(
        id = id,
        username = username,
        email = email,
        firstName = firstName,
        lastName = lastName,
        isActive = isActive,
        emailVerified = emailVerified,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

fun AuthDataDto.toDomain(): AuthToken {
    return AuthToken(
        token = token,
        expiresIn = expiresIn,
        user = user.toDomain()
    )
}

fun User.toUpdateDto(): Map<String, Any> {
    return mapOf(
        "username" to username,
        "email" to email,
        "firstName" to firstName,
        "lastName" to lastName
    )
}
```

A separação entre modelos de domínio e DTOs permite evolução independente da API e lógica de negócio. Mappers centralizam lógica de conversão e facilitam adaptação a mudanças no formato de dados da API.

## Comunicação com API REST

### Definição de Interfaces de API

Crie interfaces Retrofit para comunicação com backend. No arquivo `data/remote/api/AuthApi.kt`:

```kotlin
package com.exemplo.cadastrousuarios.data.remote.api

import com.exemplo.cadastrousuarios.data.remote.dto.AuthResponseDto
import com.exemplo.cadastrousuarios.data.remote.dto.LoginRequestDto
import com.exemplo.cadastrousuarios.data.remote.dto.RegisterRequestDto
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApi {
    
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequestDto): Response<AuthResponseDto>
    
    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequestDto): Response<AuthResponseDto>
    
    @POST("auth/verify-token")
    suspend fun verifyToken(): Response<AuthResponseDto>
    
    @POST("auth/refresh-token")
    suspend fun refreshToken(): Response<AuthResponseDto>
    
    @POST("auth/logout")
    suspend fun logout(): Response<Unit>
}
```

No arquivo `data/remote/api/UserApi.kt`:

```kotlin
package com.exemplo.cadastrousuarios.data.remote.api

import com.exemplo.cadastrousuarios.data.remote.dto.UserDto
import com.exemplo.cadastrousuarios.data.remote.dto.UserResponseDto
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PUT

interface UserApi {
    
    @GET("users/profile")
    suspend fun getProfile(): Response<UserResponseDto>
    
    @PUT("users/profile")
    suspend fun updateProfile(@Body userData: Map<String, Any>): Response<UserResponseDto>
}

data class UserResponseDto(
    val success: Boolean,
    val message: String,
    val data: UserDataDto?
)

data class UserDataDto(
    val user: UserDto
)
```

### Interceptors para Autenticação

Crie interceptor para adicionar automaticamente tokens de autenticação. No arquivo `data/remote/interceptors/AuthInterceptor.kt`:

```kotlin
package com.exemplo.cadastrousuarios.data.remote.interceptors

import com.exemplo.cadastrousuarios.data.local.preferences.AuthPreferences
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthInterceptor @Inject constructor(
    private val authPreferences: AuthPreferences
) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        
        // Endpoints que não precisam de autenticação
        val publicEndpoints = listOf("/auth/login", "/auth/register")
        val isPublicEndpoint = publicEndpoints.any { 
            originalRequest.url.encodedPath.endsWith(it) 
        }
        
        if (isPublicEndpoint) {
            return chain.proceed(originalRequest)
        }
        
        // Adicionar token de autenticação
        val token = runBlocking {
            authPreferences.getAuthToken().first()
        }
        
        val authenticatedRequest = if (token != null) {
            originalRequest.newBuilder()
                .addHeader("Authorization", "Bearer $token")
                .build()
        } else {
            originalRequest
        }
        
        return chain.proceed(authenticatedRequest)
    }
}
```

### Tratamento de Erros de Rede

Crie classe para encapsular resultados de operações de rede. No arquivo `utils/Resource.kt`:

```kotlin
package com.exemplo.cadastrousuarios.utils

sealed class Resource<T>(
    val data: T? = null,
    val message: String? = null
) {
    class Success<T>(data: T) : Resource<T>(data)
    class Error<T>(message: String, data: T? = null) : Resource<T>(data, message)
    class Loading<T>(data: T? = null) : Resource<T>(data)
}

sealed class NetworkError : Exception() {
    object NetworkUnavailable : NetworkError()
    object Timeout : NetworkError()
    data class HttpError(val code: Int, val errorMessage: String) : NetworkError()
    data class UnknownError(val errorMessage: String) : NetworkError()
}
```

Crie extensão para tratar respostas Retrofit. No arquivo `utils/NetworkExtensions.kt`:

```kotlin
package com.exemplo.cadastrousuarios.utils

import com.exemplo.cadastrousuarios.data.remote.dto.ApiErrorDto
import com.google.gson.Gson
import retrofit2.Response
import java.io.IOException
import java.net.SocketTimeoutException
import java.net.UnknownHostException

suspend fun <T> safeApiCall(apiCall: suspend () -> Response<T>): Resource<T> {
    return try {
        val response = apiCall()
        if (response.isSuccessful) {
            Resource.Success(response.body()!!)
        } else {
            val errorBody = response.errorBody()?.string()
            val errorMessage = try {
                val apiError = Gson().fromJson(errorBody, ApiErrorDto::class.java)
                apiError.message
            } catch (e: Exception) {
                "Erro desconhecido"
            }
            Resource.Error(errorMessage)
        }
    } catch (e: UnknownHostException) {
        Resource.Error("Sem conexão com a internet")
    } catch (e: SocketTimeoutException) {
        Resource.Error("Timeout na conexão")
    } catch (e: IOException) {
        Resource.Error("Erro de rede")
    } catch (e: Exception) {
        Resource.Error("Erro inesperado: ${e.message}")
    }
}
```

O tratamento robusto de erros de rede é fundamental para aplicações móveis que operam em ambientes com conectividade instável. A classe Resource oferece padrão consistente para representar diferentes estados de operações assíncronas.

## Armazenamento Local com DataStore

### Configuração do DataStore

Crie classe para gerenciar preferências de autenticação. No arquivo `data/local/preferences/AuthPreferences.kt`:

```kotlin
package com.exemplo.cadastrousuarios.data.local.preferences

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.exemplo.cadastrousuarios.domain.model.User
import com.google.gson.Gson
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "auth_preferences")

@Singleton
class AuthPreferences @Inject constructor(
    @ApplicationContext private val context: Context,
    private val gson: Gson
) {
    private object PreferencesKeys {
        val AUTH_TOKEN = stringPreferencesKey("auth_token")
        val USER_DATA = stringPreferencesKey("user_data")
        val IS_LOGGED_IN = stringPreferencesKey("is_logged_in")
    }

    suspend fun saveAuthToken(token: String) {
        context.dataStore.edit { preferences ->
            preferences[PreferencesKeys.AUTH_TOKEN] = token
        }
    }

    fun getAuthToken(): Flow<String?> {
        return context.dataStore.data.map { preferences ->
            preferences[PreferencesKeys.AUTH_TOKEN]
        }
    }

    suspend fun saveUserData(user: User) {
        context.dataStore.edit { preferences ->
            preferences[PreferencesKeys.USER_DATA] = gson.toJson(user)
            preferences[PreferencesKeys.IS_LOGGED_IN] = "true"
        }
    }

    fun getUserData(): Flow<User?> {
        return context.dataStore.data.map { preferences ->
            val userJson = preferences[PreferencesKeys.USER_DATA]
            if (userJson != null) {
                try {
                    gson.fromJson(userJson, User::class.java)
                } catch (e: Exception) {
                    null
                }
            } else {
                null
            }
        }
    }

    fun isLoggedIn(): Flow<Boolean> {
        return context.dataStore.data.map { preferences ->
            preferences[PreferencesKeys.IS_LOGGED_IN] == "true"
        }
    }

    suspend fun clearAuthData() {
        context.dataStore.edit { preferences ->
            preferences.remove(PreferencesKeys.AUTH_TOKEN)
            preferences.remove(PreferencesKeys.USER_DATA)
            preferences.remove(PreferencesKeys.IS_LOGGED_IN)
        }
    }
}
```

### Módulo de Dependências para DataStore

Adicione configuração no módulo Hilt. No arquivo `di/DataModule.kt`:

```kotlin
package com.exemplo.cadastrousuarios.di

import android.content.Context
import com.exemplo.cadastrousuarios.data.local.preferences.AuthPreferences
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import java.util.Date
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DataModule {

    @Provides
    @Singleton
    fun provideGson(): Gson {
        return GsonBuilder()
            .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            .create()
    }

    @Provides
    @Singleton
    fun provideAuthPreferences(
        @ApplicationContext context: Context,
        gson: Gson
    ): AuthPreferences {
        return AuthPreferences(context, gson)
    }
}
```

DataStore oferece API moderna e type-safe para armazenamento de preferências, substituindo SharedPreferences com melhor performance e suporte a coroutines. A serialização JSON permite armazenar objetos complexos de forma simples e eficiente.

## Implementação de Repositórios

### Repository de Autenticação

Crie repositório que coordena acesso a dados de autenticação. No arquivo `data/repository/AuthRepositoryImpl.kt`:

```kotlin
package com.exemplo.cadastrousuarios.data.repository

import com.exemplo.cadastrousuarios.data.local.preferences.AuthPreferences
import com.exemplo.cadastrousuarios.data.remote.api.AuthApi
import com.exemplo.cadastrousuarios.data.remote.dto.LoginRequestDto
import com.exemplo.cadastrousuarios.data.remote.dto.RegisterRequestDto
import com.exemplo.cadastrousuarios.data.remote.dto.toDomain
import com.exemplo.cadastrousuarios.domain.model.AuthToken
import com.exemplo.cadastrousuarios.domain.model.LoginCredentials
import com.exemplo.cadastrousuarios.domain.model.RegisterData
import com.exemplo.cadastrousuarios.domain.model.User
import com.exemplo.cadastrousuarios.domain.repository.AuthRepository
import com.exemplo.cadastrousuarios.utils.Resource
import com.exemplo.cadastrousuarios.utils.safeApiCall
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepositoryImpl @Inject constructor(
    private val authApi: AuthApi,
    private val authPreferences: AuthPreferences
) : AuthRepository {

    override suspend fun login(credentials: LoginCredentials): Resource<AuthToken> {
        val result = safeApiCall {
            authApi.login(
                LoginRequestDto(
                    identifier = credentials.identifier,
                    password = credentials.password
                )
            )
        }

        return when (result) {
            is Resource.Success -> {
                val authData = result.data?.data
                if (authData != null) {
                    val authToken = authData.toDomain()
                    // Salvar dados localmente
                    authPreferences.saveAuthToken(authToken.token)
                    authPreferences.saveUserData(authToken.user)
                    Resource.Success(authToken)
                } else {
                    Resource.Error("Dados de autenticação inválidos")
                }
            }
            is Resource.Error -> Resource.Error(result.message ?: "Erro no login")
            is Resource.Loading -> Resource.Loading()
        }
    }

    override suspend fun register(registerData: RegisterData): Resource<AuthToken> {
        val result = safeApiCall {
            authApi.register(
                RegisterRequestDto(
                    username = registerData.username,
                    email = registerData.email,
                    password = registerData.password,
                    firstName = registerData.firstName,
                    lastName = registerData.lastName
                )
            )
        }

        return when (result) {
            is Resource.Success -> {
                val authData = result.data?.data
                if (authData != null) {
                    val authToken = authData.toDomain()
                    // Salvar dados localmente
                    authPreferences.saveAuthToken(authToken.token)
                    authPreferences.saveUserData(authToken.user)
                    Resource.Success(authToken)
                } else {
                    Resource.Error("Dados de registro inválidos")
                }
            }
            is Resource.Error -> Resource.Error(result.message ?: "Erro no registro")
            is Resource.Loading -> Resource.Loading()
        }
    }

    override suspend fun logout(): Resource<Unit> {
        return try {
            // Tentar fazer logout no servidor
            safeApiCall { authApi.logout() }
            
            // Limpar dados locais independentemente do resultado
            authPreferences.clearAuthData()
            Resource.Success(Unit)
        } catch (e: Exception) {
            // Mesmo com erro, limpar dados locais
            authPreferences.clearAuthData()
            Resource.Success(Unit)
        }
    }

    override suspend fun verifyToken(): Resource<Boolean> {
        val token = authPreferences.getAuthToken().first()
        if (token == null) {
            return Resource.Success(false)
        }

        val result = safeApiCall { authApi.verifyToken() }
        return when (result) {
            is Resource.Success -> Resource.Success(true)
            is Resource.Error -> {
                // Token inválido, limpar dados locais
                authPreferences.clearAuthData()
                Resource.Success(false)
            }
            is Resource.Loading -> Resource.Loading()
        }
    }

    override fun getCurrentUser(): Flow<User?> {
        return authPreferences.getUserData()
    }

    override fun isLoggedIn(): Flow<Boolean> {
        return authPreferences.isLoggedIn()
    }

    override suspend fun refreshToken(): Resource<String> {
        val result = safeApiCall { authApi.refreshToken() }
        return when (result) {
            is Resource.Success -> {
                val newToken = result.data?.data?.token
                if (newToken != null) {
                    authPreferences.saveAuthToken(newToken)
                    Resource.Success(newToken)
                } else {
                    Resource.Error("Token de renovação inválido")
                }
            }
            is Resource.Error -> Resource.Error(result.message ?: "Erro ao renovar token")
            is Resource.Loading -> Resource.Loading()
        }
    }
}
```

### Interface do Repository

Defina contrato do repository no domínio. No arquivo `domain/repository/AuthRepository.kt`:

```kotlin
package com.exemplo.cadastrousuarios.domain.repository

import com.exemplo.cadastrousuarios.domain.model.AuthToken
import com.exemplo.cadastrousuarios.domain.model.LoginCredentials
import com.exemplo.cadastrousuarios.domain.model.RegisterData
import com.exemplo.cadastrousuarios.domain.model.User
import com.exemplo.cadastrousuarios.utils.Resource
import kotlinx.coroutines.flow.Flow

interface AuthRepository {
    suspend fun login(credentials: LoginCredentials): Resource<AuthToken>
    suspend fun register(registerData: RegisterData): Resource<AuthToken>
    suspend fun logout(): Resource<Unit>
    suspend fun verifyToken(): Resource<Boolean>
    suspend fun refreshToken(): Resource<String>
    fun getCurrentUser(): Flow<User?>
    fun isLoggedIn(): Flow<Boolean>
}
```

### Configuração no Módulo Hilt

Adicione binding no módulo de repositórios. No arquivo `di/RepositoryModule.kt`:

```kotlin
package com.exemplo.cadastrousuarios.di

import com.exemplo.cadastrousuarios.data.repository.AuthRepositoryImpl
import com.exemplo.cadastrousuarios.data.repository.UserRepositoryImpl
import com.exemplo.cadastrousuarios.domain.repository.AuthRepository
import com.exemplo.cadastrousuarios.domain.repository.UserRepository
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

Repositórios implementam padrão Repository que abstrai fontes de dados e oferece API limpa para ViewModels. Esta camada coordena cache local, sincronização com servidor, e tratamento de conflitos de dados.

## Use Cases e Lógica de Negócio

### Use Cases de Autenticação

Crie use cases que encapsulam lógica de negócio específica. No arquivo `domain/usecase/auth/LoginUseCase.kt`:

```kotlin
package com.exemplo.cadastrousuarios.domain.usecase.auth

import com.exemplo.cadastrousuarios.domain.model.AuthToken
import com.exemplo.cadastrousuarios.domain.model.LoginCredentials
import com.exemplo.cadastrousuarios.domain.repository.AuthRepository
import com.exemplo.cadastrousuarios.utils.Resource
import javax.inject.Inject

class LoginUseCase @Inject constructor(
    private val authRepository: AuthRepository
) {
    suspend operator fun invoke(credentials: LoginCredentials): Resource<AuthToken> {
        // Validações de negócio
        if (credentials.identifier.isBlank()) {
            return Resource.Error("Email ou username é obrigatório")
        }
        
        if (credentials.password.isBlank()) {
            return Resource.Error("Senha é obrigatória")
        }
        
        if (credentials.password.length < 8) {
            return Resource.Error("Senha deve ter pelo menos 8 caracteres")
        }
        
        return authRepository.login(credentials)
    }
}
```

No arquivo `domain/usecase/auth/RegisterUseCase.kt`:

```kotlin
package com.exemplo.cadastrousuarios.domain.usecase.auth

import com.exemplo.cadastrousuarios.domain.model.AuthToken
import com.exemplo.cadastrousuarios.domain.model.RegisterData
import com.exemplo.cadastrousuarios.domain.repository.AuthRepository
import com.exemplo.cadastrousuarios.utils.Resource
import java.util.regex.Pattern
import javax.inject.Inject

class RegisterUseCase @Inject constructor(
    private val authRepository: AuthRepository
) {
    private val emailPattern = Pattern.compile(
        "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" +
        "\\@" +
        "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
        "(" +
        "\\." +
        "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
        ")+"
    )

    suspend operator fun invoke(registerData: RegisterData): Resource<AuthToken> {
        // Validações de negócio
        val validationError = validateRegisterData(registerData)
        if (validationError != null) {
            return Resource.Error(validationError)
        }
        
        return authRepository.register(registerData)
    }

    private fun validateRegisterData(data: RegisterData): String? {
        return when {
            data.firstName.isBlank() -> "Nome é obrigatório"
            data.firstName.length < 2 -> "Nome deve ter pelo menos 2 caracteres"
            data.lastName.isBlank() -> "Sobrenome é obrigatório"
            data.lastName.length < 2 -> "Sobrenome deve ter pelo menos 2 caracteres"
            data.username.isBlank() -> "Username é obrigatório"
            data.username.length < 3 -> "Username deve ter pelo menos 3 caracteres"
            !data.username.matches(Regex("^[a-zA-Z0-9_]+$")) -> 
                "Username deve conter apenas letras, números e underscore"
            data.email.isBlank() -> "Email é obrigatório"
            !emailPattern.matcher(data.email).matches() -> "Email deve ter formato válido"
            data.password.isBlank() -> "Senha é obrigatória"
            data.password.length < 8 -> "Senha deve ter pelo menos 8 caracteres"
            !data.password.matches(Regex("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*")) ->
                "Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número"
            else -> null
        }
    }
}
```

### Use Case para Verificação de Autenticação

No arquivo `domain/usecase/auth/GetAuthStateUseCase.kt`:

```kotlin
package com.exemplo.cadastrousuarios.domain.usecase.auth

import com.exemplo.cadastrousuarios.domain.model.User
import com.exemplo.cadastrousuarios.domain.repository.AuthRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import javax.inject.Inject

data class AuthState(
    val isLoggedIn: Boolean,
    val user: User?
)

class GetAuthStateUseCase @Inject constructor(
    private val authRepository: AuthRepository
) {
    operator fun invoke(): Flow<AuthState> {
        return combine(
            authRepository.isLoggedIn(),
            authRepository.getCurrentUser()
        ) { isLoggedIn, user ->
            AuthState(isLoggedIn = isLoggedIn, user = user)
        }
    }
}
```

Use cases encapsulam regras de negócio específicas e validações que não pertencem nem à camada de dados nem à interface. Esta separação facilita testes unitários e reutilização de lógica em diferentes contextos.

## ViewModels e Gerenciamento de Estado

### ViewModel de Autenticação

Crie ViewModel para gerenciar estado de autenticação. No arquivo `presentation/viewmodel/AuthViewModel.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.exemplo.cadastrousuarios.domain.model.LoginCredentials
import com.exemplo.cadastrousuarios.domain.model.RegisterData
import com.exemplo.cadastrousuarios.domain.usecase.auth.GetAuthStateUseCase
import com.exemplo.cadastrousuarios.domain.usecase.auth.LoginUseCase
import com.exemplo.cadastrousuarios.domain.usecase.auth.LogoutUseCase
import com.exemplo.cadastrousuarios.domain.usecase.auth.RegisterUseCase
import com.exemplo.cadastrousuarios.utils.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val loginUseCase: LoginUseCase,
    private val registerUseCase: RegisterUseCase,
    private val logoutUseCase: LogoutUseCase,
    private val getAuthStateUseCase: GetAuthStateUseCase
) : ViewModel() {

    private val _loginState = MutableStateFlow<Resource<Unit>?>(null)
    val loginState: StateFlow<Resource<Unit>?> = _loginState.asStateFlow()

    private val _registerState = MutableStateFlow<Resource<Unit>?>(null)
    val registerState: StateFlow<Resource<Unit>?> = _registerState.asStateFlow()

    val authState = getAuthStateUseCase()

    fun login(identifier: String, password: String) {
        viewModelScope.launch {
            _loginState.value = Resource.Loading()
            
            val credentials = LoginCredentials(identifier, password)
            val result = loginUseCase(credentials)
            
            _loginState.value = when (result) {
                is Resource.Success -> Resource.Success(Unit)
                is Resource.Error -> Resource.Error(result.message ?: "Erro no login")
                is Resource.Loading -> Resource.Loading()
            }
        }
    }

    fun register(
        firstName: String,
        lastName: String,
        username: String,
        email: String,
        password: String
    ) {
        viewModelScope.launch {
            _registerState.value = Resource.Loading()
            
            val registerData = RegisterData(
                firstName = firstName,
                lastName = lastName,
                username = username,
                email = email,
                password = password
            )
            
            val result = registerUseCase(registerData)
            
            _registerState.value = when (result) {
                is Resource.Success -> Resource.Success(Unit)
                is Resource.Error -> Resource.Error(result.message ?: "Erro no registro")
                is Resource.Loading -> Resource.Loading()
            }
        }
    }

    fun logout() {
        viewModelScope.launch {
            logoutUseCase()
        }
    }

    fun clearLoginState() {
        _loginState.value = null
    }

    fun clearRegisterState() {
        _registerState.value = null
    }
}
```

### ViewModel de Perfil de Usuário

No arquivo `presentation/viewmodel/ProfileViewModel.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.exemplo.cadastrousuarios.domain.model.UpdateProfileData
import com.exemplo.cadastrousuarios.domain.model.User
import com.exemplo.cadastrousuarios.domain.usecase.user.GetUserProfileUseCase
import com.exemplo.cadastrousuarios.domain.usecase.user.UpdateUserProfileUseCase
import com.exemplo.cadastrousuarios.utils.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val getUserProfileUseCase: GetUserProfileUseCase,
    private val updateUserProfileUseCase: UpdateUserProfileUseCase
) : ViewModel() {

    private val _profileState = MutableStateFlow<Resource<User>?>(null)
    val profileState: StateFlow<Resource<User>?> = _profileState.asStateFlow()

    private val _updateState = MutableStateFlow<Resource<Unit>?>(null)
    val updateState: StateFlow<Resource<Unit>?> = _updateState.asStateFlow()

    init {
        loadProfile()
    }

    fun loadProfile() {
        viewModelScope.launch {
            _profileState.value = Resource.Loading()
            _profileState.value = getUserProfileUseCase()
        }
    }

    fun updateProfile(
        firstName: String? = null,
        lastName: String? = null,
        username: String? = null,
        email: String? = null
    ) {
        viewModelScope.launch {
            _updateState.value = Resource.Loading()
            
            val updateData = UpdateProfileData(
                firstName = firstName,
                lastName = lastName,
                username = username,
                email = email
            )
            
            val result = updateUserProfileUseCase(updateData)
            _updateState.value = when (result) {
                is Resource.Success -> {
                    // Recarregar perfil após atualização
                    loadProfile()
                    Resource.Success(Unit)
                }
                is Resource.Error -> Resource.Error(result.message ?: "Erro na atualização")
                is Resource.Loading -> Resource.Loading()
            }
        }
    }

    fun clearUpdateState() {
        _updateState.value = null
    }
}
```

ViewModels gerenciam estado da interface e coordenam interações entre UI e camada de domínio. O uso de StateFlow oferece observação reativa de mudanças de estado com lifecycle awareness automático.

## Interface de Usuário com Jetpack Compose

### Configuração do Tema

Crie sistema de cores e tipografia. No arquivo `presentation/ui/theme/Color.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.ui.theme

import androidx.compose.ui.graphics.Color

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

// Cores personalizadas
val Primary = Color(0xFF3B82F6)
val PrimaryVariant = Color(0xFF2563EB)
val Secondary = Color(0xFF6B7280)
val Background = Color(0xFFF9FAFB)
val Surface = Color(0xFFFFFFFF)
val Error = Color(0xFFEF4444)
val Success = Color(0xFF10B981)
val Warning = Color(0xFFF59E0B)

val OnPrimary = Color(0xFFFFFFFF)
val OnSecondary = Color(0xFFFFFFFF)
val OnBackground = Color(0xFF111827)
val OnSurface = Color(0xFF111827)
val OnError = Color(0xFFFFFFFF)
```

No arquivo `presentation/ui/theme/Theme.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Purple80,
    secondary = PurpleGrey80,
    tertiary = Pink80
)

private val LightColorScheme = lightColorScheme(
    primary = Primary,
    onPrimary = OnPrimary,
    secondary = Secondary,
    onSecondary = OnSecondary,
    background = Background,
    onBackground = OnBackground,
    surface = Surface,
    onSurface = OnSurface,
    error = Error,
    onError = OnError
)

@Composable
fun CadastroUsuariosTheme(
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

Crie componentes de UI reutilizáveis. No arquivo `presentation/ui/common/CustomTextField.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.ui.common

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp

@Composable
fun CustomTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier,
    isPassword: Boolean = false,
    keyboardType: KeyboardType = KeyboardType.Text,
    isError: Boolean = false,
    errorMessage: String? = null,
    enabled: Boolean = true
) {
    Column(modifier = modifier) {
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            label = { Text(label) },
            modifier = Modifier.fillMaxWidth(),
            visualTransformation = if (isPassword) PasswordVisualTransformation() else VisualTransformation.None,
            keyboardOptions = KeyboardOptions(keyboardType = keyboardType),
            isError = isError,
            enabled = enabled,
            singleLine = true
        )
        
        if (isError && errorMessage != null) {
            Text(
                text = errorMessage,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp)
            )
        }
    }
}
```

No arquivo `presentation/ui/common/LoadingButton.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.ui.common

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun LoadingButton(
    onClick: () -> Unit,
    text: String,
    modifier: Modifier = Modifier,
    isLoading: Boolean = false,
    enabled: Boolean = true
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        enabled = enabled && !isLoading
    ) {
        if (isLoading) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.size(20.dp)
            ) {
                CircularProgressIndicator(
                    modifier = Modifier.size(16.dp),
                    strokeWidth = 2.dp,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }
        } else {
            Text(text)
        }
    }
}
```

### Tela de Login

Crie tela de login usando Compose. No arquivo `presentation/ui/auth/LoginScreen.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.ui.auth

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.exemplo.cadastrousuarios.presentation.ui.common.CustomTextField
import com.exemplo.cadastrousuarios.presentation.ui.common.LoadingButton
import com.exemplo.cadastrousuarios.presentation.viewmodel.AuthViewModel
import com.exemplo.cadastrousuarios.utils.Resource

@Composable
fun LoginScreen(
    onNavigateToRegister: () -> Unit,
    onLoginSuccess: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    var identifier by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var identifierError by remember { mutableStateOf<String?>(null) }
    var passwordError by remember { mutableStateOf<String?>(null) }
    
    val loginState by viewModel.loginState.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }

    // Observar mudanças no estado de login
    LaunchedEffect(loginState) {
        when (loginState) {
            is Resource.Success -> {
                onLoginSuccess()
                viewModel.clearLoginState()
            }
            is Resource.Error -> {
                snackbarHostState.showSnackbar(
                    message = loginState.message ?: "Erro no login"
                )
            }
            else -> {}
        }
    }

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Entrar",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Text(
                        text = "Digite suas credenciais para acessar",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center
                    )
                    
                    Spacer(modifier = Modifier.height(32.dp))
                    
                    CustomTextField(
                        value = identifier,
                        onValueChange = { 
                            identifier = it
                            identifierError = null
                        },
                        label = "Email ou Username",
                        keyboardType = KeyboardType.Email,
                        isError = identifierError != null,
                        errorMessage = identifierError,
                        modifier = Modifier.fillMaxWidth()
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    CustomTextField(
                        value = password,
                        onValueChange = { 
                            password = it
                            passwordError = null
                        },
                        label = "Senha",
                        isPassword = true,
                        isError = passwordError != null,
                        errorMessage = passwordError,
                        modifier = Modifier.fillMaxWidth()
                    )
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    LoadingButton(
                        onClick = {
                            // Validações locais
                            var hasError = false
                            
                            if (identifier.isBlank()) {
                                identifierError = "Email ou username é obrigatório"
                                hasError = true
                            }
                            
                            if (password.isBlank()) {
                                passwordError = "Senha é obrigatória"
                                hasError = true
                            }
                            
                            if (!hasError) {
                                viewModel.login(identifier, password)
                            }
                        },
                        text = "Entrar",
                        isLoading = loginState is Resource.Loading,
                        modifier = Modifier.fillMaxWidth()
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    TextButton(
                        onClick = onNavigateToRegister,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Não tem conta? Cadastre-se")
                    }
                }
            }
        }
        
        SnackbarHost(
            hostState = snackbarHostState,
            modifier = Modifier.align(Alignment.BottomCenter)
        )
    }
}
```

### Tela de Registro

No arquivo `presentation/ui/auth/RegisterScreen.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.ui.auth

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.exemplo.cadastrousuarios.presentation.ui.common.CustomTextField
import com.exemplo.cadastrousuarios.presentation.ui.common.LoadingButton
import com.exemplo.cadastrousuarios.presentation.viewmodel.AuthViewModel
import com.exemplo.cadastrousuarios.utils.Resource

@Composable
fun RegisterScreen(
    onNavigateToLogin: () -> Unit,
    onRegisterSuccess: () -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    var firstName by remember { mutableStateOf("") }
    var lastName by remember { mutableStateOf("") }
    var username by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var confirmPassword by remember { mutableStateOf("") }
    
    // Estados de erro para cada campo
    var firstNameError by remember { mutableStateOf<String?>(null) }
    var lastNameError by remember { mutableStateOf<String?>(null) }
    var usernameError by remember { mutableStateOf<String?>(null) }
    var emailError by remember { mutableStateOf<String?>(null) }
    var passwordError by remember { mutableStateOf<String?>(null) }
    var confirmPasswordError by remember { mutableStateOf<String?>(null) }
    
    val registerState by viewModel.registerState.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }

    // Observar mudanças no estado de registro
    LaunchedEffect(registerState) {
        when (registerState) {
            is Resource.Success -> {
                onRegisterSuccess()
                viewModel.clearRegisterState()
            }
            is Resource.Error -> {
                snackbarHostState.showSnackbar(
                    message = registerState.message ?: "Erro no registro"
                )
            }
            else -> {}
        }
    }

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Criar Conta",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Text(
                        text = "Preencha os dados para se cadastrar",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center
                    )
                    
                    Spacer(modifier = Modifier.height(32.dp))
                    
                    // Nome e Sobrenome em linha
                    Row(modifier = Modifier.fillMaxWidth()) {
                        CustomTextField(
                            value = firstName,
                            onValueChange = { 
                                firstName = it
                                firstNameError = null
                            },
                            label = "Nome",
                            isError = firstNameError != null,
                            errorMessage = firstNameError,
                            modifier = Modifier.weight(1f)
                        )
                        
                        Spacer(modifier = Modifier.width(8.dp))
                        
                        CustomTextField(
                            value = lastName,
                            onValueChange = { 
                                lastName = it
                                lastNameError = null
                            },
                            label = "Sobrenome",
                            isError = lastNameError != null,
                            errorMessage = lastNameError,
                            modifier = Modifier.weight(1f)
                        )
                    }
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    CustomTextField(
                        value = username,
                        onValueChange = { 
                            username = it
                            usernameError = null
                        },
                        label = "Username",
                        isError = usernameError != null,
                        errorMessage = usernameError,
                        modifier = Modifier.fillMaxWidth()
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    CustomTextField(
                        value = email,
                        onValueChange = { 
                            email = it
                            emailError = null
                        },
                        label = "Email",
                        keyboardType = KeyboardType.Email,
                        isError = emailError != null,
                        errorMessage = emailError,
                        modifier = Modifier.fillMaxWidth()
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    CustomTextField(
                        value = password,
                        onValueChange = { 
                            password = it
                            passwordError = null
                        },
                        label = "Senha",
                        isPassword = true,
                        isError = passwordError != null,
                        errorMessage = passwordError,
                        modifier = Modifier.fillMaxWidth()
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    CustomTextField(
                        value = confirmPassword,
                        onValueChange = { 
                            confirmPassword = it
                            confirmPasswordError = null
                        },
                        label = "Confirmar Senha",
                        isPassword = true,
                        isError = confirmPasswordError != null,
                        errorMessage = confirmPasswordError,
                        modifier = Modifier.fillMaxWidth()
                    )
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    LoadingButton(
                        onClick = {
                            // Validações locais
                            var hasError = false
                            
                            if (firstName.isBlank()) {
                                firstNameError = "Nome é obrigatório"
                                hasError = true
                            }
                            
                            if (lastName.isBlank()) {
                                lastNameError = "Sobrenome é obrigatório"
                                hasError = true
                            }
                            
                            if (username.isBlank()) {
                                usernameError = "Username é obrigatório"
                                hasError = true
                            }
                            
                            if (email.isBlank()) {
                                emailError = "Email é obrigatório"
                                hasError = true
                            }
                            
                            if (password.isBlank()) {
                                passwordError = "Senha é obrigatória"
                                hasError = true
                            }
                            
                            if (confirmPassword != password) {
                                confirmPasswordError = "Senhas não coincidem"
                                hasError = true
                            }
                            
                            if (!hasError) {
                                viewModel.register(firstName, lastName, username, email, password)
                            }
                        },
                        text = "Cadastrar",
                        isLoading = registerState is Resource.Loading,
                        modifier = Modifier.fillMaxWidth()
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    TextButton(
                        onClick = onNavigateToLogin,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Já tem conta? Entre aqui")
                    }
                }
            }
        }
        
        SnackbarHost(
            hostState = snackbarHostState,
            modifier = Modifier.align(Alignment.BottomCenter)
        )
    }
}
```

Jetpack Compose revoluciona desenvolvimento de UI Android com paradigma declarativo que simplifica criação de interfaces complexas. A composição de componentes reutilizáveis acelera desenvolvimento e garante consistência visual.

## Navegação e Roteamento

### Configuração da Navegação

Crie sistema de navegação usando Navigation Compose. No arquivo `presentation/navigation/NavGraph.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.exemplo.cadastrousuarios.presentation.ui.auth.LoginScreen
import com.exemplo.cadastrousuarios.presentation.ui.auth.RegisterScreen
import com.exemplo.cadastrousuarios.presentation.ui.dashboard.DashboardScreen
import com.exemplo.cadastrousuarios.presentation.ui.profile.ProfileScreen
import com.exemplo.cadastrousuarios.presentation.viewmodel.AuthViewModel

@Composable
fun NavGraph(
    navController: NavHostController,
    authViewModel: AuthViewModel = hiltViewModel()
) {
    val authState by authViewModel.authState.collectAsState()
    
    val startDestination = if (authState.isLoggedIn) {
        Screen.Dashboard.route
    } else {
        Screen.Login.route
    }

    NavHost(
        navController = navController,
        startDestination = startDestination
    ) {
        composable(Screen.Login.route) {
            LoginScreen(
                onNavigateToRegister = {
                    navController.navigate(Screen.Register.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
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
                onNavigateToLogin = {
                    navController.navigate(Screen.Login.route) {
                        popUpTo(Screen.Register.route) { inclusive = true }
                    }
                },
                onRegisterSuccess = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Register.route) { inclusive = true }
                    }
                }
            )
        }
        
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
                }
            )
        }
    }
}
```

### Definição de Rotas

No arquivo `presentation/navigation/Screen.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.navigation

sealed class Screen(val route: String) {
    object Login : Screen("login")
    object Register : Screen("register")
    object Dashboard : Screen("dashboard")
    object Profile : Screen("profile")
}
```

### Activity Principal

Configure a Activity principal. No arquivo `MainActivity.kt`:

```kotlin
package com.exemplo.cadastrousuarios

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.navigation.compose.rememberNavController
import com.exemplo.cadastrousuarios.presentation.navigation.NavGraph
import com.exemplo.cadastrousuarios.presentation.ui.theme.CadastroUsuariosTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CadastroUsuariosTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    NavGraph(navController = navController)
                }
            }
        }
    }
}
```

A navegação em Compose oferece type safety e integração natural com o ciclo de vida de componentes. O gerenciamento de back stack garante experiência de usuário consistente com padrões Android.

## Testes Automatizados

### Testes Unitários de ViewModels

Crie testes para ViewModels. No arquivo `test/presentation/viewmodel/AuthViewModelTest.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.viewmodel

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.exemplo.cadastrousuarios.domain.model.AuthToken
import com.exemplo.cadastrousuarios.domain.model.User
import com.exemplo.cadastrousuarios.domain.usecase.auth.GetAuthStateUseCase
import com.exemplo.cadastrousuarios.domain.usecase.auth.LoginUseCase
import com.exemplo.cadastrousuarios.domain.usecase.auth.LogoutUseCase
import com.exemplo.cadastrousuarios.domain.usecase.auth.RegisterUseCase
import com.exemplo.cadastrousuarios.utils.Resource
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.mockito.Mock
import org.mockito.MockitoAnnotations
import org.mockito.kotlin.any
import org.mockito.kotlin.verify
import org.mockito.kotlin.whenever
import java.util.Date

@ExperimentalCoroutinesApi
class AuthViewModelTest {

    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule()

    @Mock
    private lateinit var loginUseCase: LoginUseCase

    @Mock
    private lateinit var registerUseCase: RegisterUseCase

    @Mock
    private lateinit var logoutUseCase: LogoutUseCase

    @Mock
    private lateinit var getAuthStateUseCase: GetAuthStateUseCase

    private lateinit var viewModel: AuthViewModel

    private val testDispatcher = UnconfinedTestDispatcher()

    @Before
    fun setup() {
        MockitoAnnotations.openMocks(this)
        Dispatchers.setMain(testDispatcher)
        
        whenever(getAuthStateUseCase()).thenReturn(
            flowOf(AuthState(isLoggedIn = false, user = null))
        )
        
        viewModel = AuthViewModel(
            loginUseCase,
            registerUseCase,
            logoutUseCase,
            getAuthStateUseCase
        )
    }

    @Test
    fun `login com credenciais válidas deve retornar sucesso`() = runTest {
        // Given
        val mockUser = User(
            id = 1,
            username = "testuser",
            email = "test@example.com",
            firstName = "Test",
            lastName = "User",
            isActive = true,
            emailVerified = false,
            createdAt = Date(),
            updatedAt = null
        )
        val mockAuthToken = AuthToken("token", "24h", mockUser)
        
        whenever(loginUseCase(any())).thenReturn(Resource.Success(mockAuthToken))

        // When
        viewModel.login("test@example.com", "password123")

        // Then
        verify(loginUseCase).invoke(any())
        assert(viewModel.loginState.value is Resource.Success)
    }

    @Test
    fun `login com credenciais inválidas deve retornar erro`() = runTest {
        // Given
        whenever(loginUseCase(any())).thenReturn(Resource.Error("Credenciais inválidas"))

        // When
        viewModel.login("test@example.com", "wrongpassword")

        // Then
        verify(loginUseCase).invoke(any())
        assert(viewModel.loginState.value is Resource.Error)
    }

    @Test
    fun `logout deve chamar use case de logout`() = runTest {
        // When
        viewModel.logout()

        // Then
        verify(logoutUseCase).invoke()
    }
}
```

### Testes de Integração

Crie testes de integração para repositórios. No arquivo `androidTest/data/repository/AuthRepositoryTest.kt`:

```kotlin
package com.exemplo.cadastrousuarios.data.repository

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.exemplo.cadastrousuarios.data.local.preferences.AuthPreferences
import com.exemplo.cadastrousuarios.data.remote.api.AuthApi
import com.exemplo.cadastrousuarios.data.remote.dto.AuthDataDto
import com.exemplo.cadastrousuarios.data.remote.dto.AuthResponseDto
import com.exemplo.cadastrousuarios.data.remote.dto.UserDto
import com.exemplo.cadastrousuarios.domain.model.LoginCredentials
import com.exemplo.cadastrousuarios.utils.Resource
import kotlinx.coroutines.test.runTest
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.MockitoAnnotations
import org.mockito.kotlin.any
import org.mockito.kotlin.verify
import org.mockito.kotlin.whenever
import retrofit2.Response
import java.util.Date

@RunWith(AndroidJUnit4::class)
class AuthRepositoryTest {

    @Mock
    private lateinit var authApi: AuthApi

    @Mock
    private lateinit var authPreferences: AuthPreferences

    private lateinit var repository: AuthRepositoryImpl

    @Before
    fun setup() {
        MockitoAnnotations.openMocks(this)
        repository = AuthRepositoryImpl(authApi, authPreferences)
    }

    @Test
    fun `login bem-sucedido deve salvar dados localmente`() = runTest {
        // Given
        val credentials = LoginCredentials("test@example.com", "password123")
        val mockUserDto = UserDto(
            id = 1,
            username = "testuser",
            email = "test@example.com",
            firstName = "Test",
            lastName = "User",
            isActive = true,
            emailVerified = false,
            createdAt = Date(),
            updatedAt = null
        )
        val mockAuthData = AuthDataDto(mockUserDto, "token123", "24h")
        val mockResponse = AuthResponseDto(true, "Login successful", mockAuthData)

        whenever(authApi.login(any())).thenReturn(Response.success(mockResponse))

        // When
        val result = repository.login(credentials)

        // Then
        assert(result is Resource.Success)
        verify(authPreferences).saveAuthToken("token123")
        verify(authPreferences).saveUserData(any())
    }
}
```

### Testes de UI com Compose

Crie testes de UI. No arquivo `androidTest/presentation/ui/auth/LoginScreenTest.kt`:

```kotlin
package com.exemplo.cadastrousuarios.presentation.ui.auth

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.exemplo.cadastrousuarios.presentation.ui.theme.CadastroUsuariosTheme
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class LoginScreenTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun loginScreen_displaysCorrectElements() {
        composeTestRule.setContent {
            CadastroUsuariosTheme {
                LoginScreen(
                    onNavigateToRegister = {},
                    onLoginSuccess = {}
                )
            }
        }

        composeTestRule.onNodeWithText("Entrar").assertIsDisplayed()
        composeTestRule.onNodeWithText("Email ou Username").assertIsDisplayed()
        composeTestRule.onNodeWithText("Senha").assertIsDisplayed()
        composeTestRule.onNodeWithText("Não tem conta? Cadastre-se").assertIsDisplayed()
    }

    @Test
    fun loginScreen_showsErrorForEmptyFields() {
        composeTestRule.setContent {
            CadastroUsuariosTheme {
                LoginScreen(
                    onNavigateToRegister = {},
                    onLoginSuccess = {}
                )
            }
        }

        // Tentar fazer login sem preencher campos
        composeTestRule.onNodeWithText("Entrar").performClick()

        // Verificar se erros são exibidos
        composeTestRule.onNodeWithText("Email ou username é obrigatório").assertIsDisplayed()
        composeTestRule.onNodeWithText("Senha é obrigatória").assertIsDisplayed()
    }

    @Test
    fun loginScreen_allowsTextInput() {
        composeTestRule.setContent {
            CadastroUsuariosTheme {
                LoginScreen(
                    onNavigateToRegister = {},
                    onLoginSuccess = {}
                )
            }
        }

        // Inserir texto nos campos
        composeTestRule.onNodeWithText("Email ou Username").performTextInput("test@example.com")
        composeTestRule.onNodeWithText("Senha").performTextInput("password123")

        // Verificar se texto foi inserido (implicitamente através da ausência de erros)
        composeTestRule.onNodeWithText("Entrar").performClick()
    }
}
```

Testes automatizados garantem qualidade e confiabilidade da aplicação, detectando regressões durante desenvolvimento. A combinação de testes unitários, integração e UI oferece cobertura abrangente de funcionalidades.

## Otimização e Performance

### Configuração de ProGuard

Configure ofuscação e otimização para builds de release. No arquivo `proguard-rules.pro`:

```
# Add project specific ProGuard rules here.

# Keep Retrofit interfaces
-keep interface com.exemplo.cadastrousuarios.data.remote.api.** { *; }

# Keep data classes used with Gson
-keep class com.exemplo.cadastrousuarios.data.remote.dto.** { *; }
-keep class com.exemplo.cadastrousuarios.domain.model.** { *; }

# Gson specific rules
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn sun.misc.**
-keep class com.google.gson.** { *; }
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer

# Hilt rules
-keep class dagger.hilt.** { *; }
-keep class javax.inject.** { *; }
-keep class * extends dagger.hilt.android.lifecycle.HiltViewModel { *; }

# Coroutines
-keepnames class kotlinx.coroutines.internal.MainDispatcherFactory {}
-keepnames class kotlinx.coroutines.CoroutineExceptionHandler {}
-dontwarn kotlinx.coroutines.flow.**
```

### Otimizações de Compose

Implemente otimizações específicas do Compose. No arquivo `utils/ComposeUtils.kt`:

```kotlin
package com.exemplo.cadastrousuarios.utils

import androidx.compose.runtime.Composable
import androidx.compose.runtime.Stable
import androidx.compose.runtime.remember

@Stable
data class TextFieldState(
    val text: String = "",
    val error: String? = null
) {
    val isError: Boolean get() = error != null
}

@Composable
fun rememberTextFieldState(
    initialText: String = "",
    initialError: String? = null
): TextFieldState {
    return remember {
        TextFieldState(initialText, initialError)
    }
}

// Extensão para otimizar recomposições
@Stable
fun TextFieldState.copy(
    text: String = this.text,
    error: String? = this.error
): TextFieldState {
    return TextFieldState(text, error)
}
```

### Configuração de Build Variants

Configure diferentes variantes de build no `build.gradle`:

```kotlin
android {
    buildTypes {
        debug {
            isDebuggable = true
            applicationIdSuffix = ".debug"
            versionNameSuffix = "-debug"
            buildConfigField("String", "API_BASE_URL", "\"http://10.0.2.2:3000/api\"")
        }
        
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            buildConfigField("String", "API_BASE_URL", "\"https://api.exemplo.com\"")
        }
        
        create("staging") {
            initWith(getByName("release"))
            isDebuggable = true
            applicationIdSuffix = ".staging"
            versionNameSuffix = "-staging"
            buildConfigField("String", "API_BASE_URL", "\"https://staging-api.exemplo.com\"")
        }
    }
}
```

As otimizações implementadas melhoram performance da aplicação em produção através de redução de tamanho do APK, ofuscação de código e configurações específicas para diferentes ambientes de deployment.

## Considerações de Segurança

### Configuração de Network Security

Crie configuração de segurança de rede. No arquivo `res/xml/network_security_config.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">api.exemplo.com</domain>
        <pin-set expiration="2025-12-31">
            <pin digest="SHA-256">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=</pin>
            <pin digest="SHA-256">BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=</pin>
        </pin-set>
    </domain-config>
    
    <!-- Permitir tráfego HTTP apenas em debug -->
    <debug-overrides>
        <trust-anchors>
            <certificates src="system"/>
            <certificates src="user"/>
        </trust-anchors>
    </debug-overrides>
</network-security-config>
```

### Implementação de Certificate Pinning

Adicione certificate pinning no OkHttp. Modifique o `NetworkModule.kt`:

```kotlin
@Provides
@Singleton
fun provideCertificatePinner(): CertificatePinner {
    return CertificatePinner.Builder()
        .add("api.exemplo.com", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
        .add("api.exemplo.com", "sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=")
        .build()
}

@Provides
@Singleton
fun provideOkHttpClient(
    authInterceptor: AuthInterceptor,
    loggingInterceptor: HttpLoggingInterceptor,
    certificatePinner: CertificatePinner
): OkHttpClient {
    return OkHttpClient.Builder()
        .addInterceptor(authInterceptor)
        .addInterceptor(loggingInterceptor)
        .certificatePinner(certificatePinner)
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()
}
```

### Proteção de Dados Sensíveis

Implemente criptografia adicional para dados sensíveis. No arquivo `utils/CryptoUtils.kt`:

```kotlin
package com.exemplo.cadastrousuarios.utils

import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.IvParameterSpec

object CryptoUtils {
    private const val TRANSFORMATION = "AES/CBC/PKCS7Padding"
    private const val ANDROID_KEYSTORE = "AndroidKeyStore"
    private const val KEY_ALIAS = "CadastroUsuariosKey"

    private fun getOrCreateSecretKey(): SecretKey {
        val keyStore = KeyStore.getInstance(ANDROID_KEYSTORE)
        keyStore.load(null)

        if (!keyStore.containsAlias(KEY_ALIAS)) {
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
            keyGenerator.generateKey()
        }

        return keyStore.getKey(KEY_ALIAS, null) as SecretKey
    }

    fun encrypt(data: String): Pair<ByteArray, ByteArray> {
        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.ENCRYPT_MODE, getOrCreateSecretKey())
        
        val iv = cipher.iv
        val encryptedData = cipher.doFinal(data.toByteArray())
        
        return Pair(encryptedData, iv)
    }

    fun decrypt(encryptedData: ByteArray, iv: ByteArray): String {
        val cipher = Cipher.getInstance(TRANSFORMATION)
        val spec = IvParameterSpec(iv)
        cipher.init(Cipher.DECRYPT_MODE, getOrCreateSecretKey(), spec)
        
        val decryptedData = cipher.doFinal(encryptedData)
        return String(decryptedData)
    }
}
```

As medidas de segurança implementadas protegem dados sensíveis e comunicações da aplicação contra ataques comuns. Certificate pinning previne ataques man-in-the-middle, enquanto criptografia local protege dados armazenados no dispositivo.

Esta implementação completa do aplicativo Android nativo com Kotlin demonstra como construir aplicações móveis modernas que consomem APIs REST de forma segura e eficiente. A arquitetura MVVM, uso de Jetpack Compose, injeção de dependências e testes automatizados criam uma base sólida para aplicações Android profissionais que podem escalar conforme necessário.

