# Application

`expo-application` provides useful information about the native application's ID, app name, and build version at runtime.

## Installation

`-` `npx expo install expo-application`

If you are installing this in an [existing React Native app](https://reactnative.dev/docs/integration-with-existing-apps), make sure to [install `expo`](https://docs.expo.dev/workflow/installing-expo-modules/) in your project.

## API

    import * as Application from 'expo-application';

### Constants

#### `Application.applicationId`

Type: `string | null`

The ID of the application. On Android, this is the application ID. On iOS, this is the bundle ID. On web, this is `null`.

Example

`"com.cococasts.scribbles"`, `"com.apple.Pages"`

#### `Application.applicationName`

Type: `string | null`

The human-readable name of the application. On Android, this is the label of the application. On iOS, this is the display name of the application. On web, this is `null`.

Example

`"Scribbles"`, `"Pages"`

#### `Application.nativeApplicationVersion`

Type: `string | null`

The native application version. On Android, this is the `versionName` from `build.gradle`. On iOS, this is the `CFBundleShortVersionString` from `Info.plist`. On web, this is `null`.

Example

`"1.0.0"`

#### `Application.nativeBuildVersion`

Type: `string | null`

The native build version. On Android, this is the `versionCode` from `build.gradle`. On iOS, this is the `CFBundleVersion` from `Info.plist`. On web, this is `null`.

Example

`"1"`

### Methods

#### `Application.getAndroidId()`

`Application.getAndroidId()`

Gets the value of [`Settings.Secure.ANDROID_ID`](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). This is a hexadecimal `string` unique to each combination of app-signing key, user, and device. The value may change if a factory reset is performed on the device or if an APK signing key changes. For more information about how the platform handles `ANDROID_ID` in Android 8.0 (API level 26) and higher, see [Android 8.0 Behavior Changes](https://developer.android.com/about/versions/oreo/android-8.0-changes#privacy-all).

> In versions of the platform lower than Android 8.0 (API level 26), this value remains constant for the lifetime of the user's device. See the [ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID) official docs for more information.

Example

`"dd96dec43fb81c97"`

#### `Application.getInstallationTimeAsync()`

`Application.getInstallationTimeAsync()`

Returns a `Promise` that fulfills with a `number` specifying the timestamp of when the app was installed onto the device. On web, this function is unavailable.

Example

    await Application.getInstallationTimeAsync();

#### `Application.getInstallReferrerAsync()`

`Application.getInstallReferrerAsync()`

Returns a `Promise` that fulfills with a `string` specifying the referrer URL of the app installation. On iOS and web, this function is unavailable.

Example

    await Application.getInstallReferrerAsync();

#### `Application.getIosApplicationReleaseTypeAsync()`

`Application.getIosApplicationReleaseTypeAsync()`

Returns a `Promise` that fulfills with an `ApplicationReleaseType` value indicating how the app was installed. On Android and web, this function is unavailable.

Example

    await Application.getIosApplicationReleaseTypeAsync();

#### `Application.getIosIdForVendorAsync()`

`Application.getIosIdForVendorAsync()`

Gets the iOS "identifier for vendor" ([IDFV](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)) value, a string ID that uniquely identifies a device to the app’s vendor. This method may sometimes return `nil`, in which case wait and call the method again later. This might happen when the device has been restarted before the user has unlocked the device.

The OS will change the vendor identifier if all apps from the current app's vendor have been uninstalled.

A `Promise` that fulfills with a `string` specifying the app's vendor ID. Apps from the same vendor will return the same ID. See Apple's documentation for more information about the vendor ID's semantics.

Example

    await Application.getIosIdForVendorAsync();

#### `Application.getIosPushNotificationServiceEnvironmentAsync()`

`Application.getIosPushNotificationServiceEnvironmentAsync()`

Returns a `Promise` that fulfills with a `PushNotificationServiceEnvironment` value indicating the push notification service environment. On Android and web, this function is unavailable.

Example

    await Application.getIosPushNotificationServiceEnvironmentAsync();

#### `Application.getLastUpdateTimeAsync()`

`Application.getLastUpdateTimeAsync()`

Returns a `Promise` that fulfills with a `number` specifying the timestamp of when the app was last updated. On iOS and web, this function is unavailable.

Example

    await Application.getLastUpdateTimeAsync();

### Types

#### `PushNotificationServiceEnvironment`

`'development'` | `'production'`

#### `ApplicationReleaseType`

`'SIMULATOR'` | `'STORE'` | `'AD_HOC'` | `'ENTERPRISE'` | `'DEVELOPMENT'`

### Error codes

#### `Application.ErrorCode`

`'E_APPLICATION_GET_ANDROID_ID_FAILED'` | `'E_APPLICATION_GET_INSTALLATION_TIME_FAILED'` | `'E_APPLICATION_GET_INSTALL_REFERRER_FAILED'` | `'E_APPLICATION_GET_IOS_APPLICATION_RELEASE_TYPE_FAILED'` | `'E_APPLICATION_GET_IOS_ID_FOR_VENDOR_FAILED'` | `'E_APPLICATION_GET_IOS_PUSH_NOTIFICATION_SERVICE_ENVIRONMENT_FAILED'` | `'E_APPLICATION_GET_LAST_UPDATE_TIME_FAILED'`

