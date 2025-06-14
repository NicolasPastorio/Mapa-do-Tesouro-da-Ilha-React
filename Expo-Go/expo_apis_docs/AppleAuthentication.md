# AppleAuthentication

A library that provides Sign-in with Apple capability for iOS.

`expo-apple-authentication` provides Apple authentication for iOS. It does not yet support Android or web.

Any app that includes third-party authentication options must provide Apple authentication as an option to comply with App Store Review guidelines. For more information, see Apple authentication on the [Sign In with Apple](https://developer.apple.com/sign-in-with-apple/) website.

## Installation

`-` `npx expo install expo-apple-authentication`

If you are installing this in an [existing React Native app](https://reactnative.dev/docs/integration-with-existing-apps), make sure to [install `expo`](https://docs.expo.dev/workflow/installing-expo-modules/) in your project.

## Configuration in app config

You can configure `expo-apple-authentication` using its built-in [config plugin](https://docs.expo.dev/guides/config-plugins/) if you use config plugins in your project ([EAS Build](https://docs.expo.dev/build/introduction/) or `npx expo run:[android|ios]`). The plugin allows you to configure various properties that cannot be set at runtime and require building a new app binary to take effect. If your app does not use EAS Build, then you'll need to manually configure the package.

### Setup iOS project

To enable the Sign In with Apple capability in your app, set the [`ios.usesAppleSignIn`](https://docs.expo.dev/versions/latest/config/app/#iosusessignin) property to `true` in your project's app config:

    {
      "expo": {
        "ios": {
          "usesAppleSignIn": true
        }
      }
    }
    

### Example app.json with config plugin

Running [EAS Build](https://docs.expo.dev/build/introduction/) locally will use [iOS capabilities signing](https://docs.expo.dev/build/ios-capabilities/) to enable the required capabilities before building.

    {
      "expo": {
        "plugins": ["expo-apple-authentication"]
      }
    }
    

Are you using this library in an existing React Native app?

Apps that don't use [EAS Build](https://docs.expo.dev/build/introduction/) must [manually configure](https://docs.expo.dev/guides/config-plugins/#manual-configuration) the Apple Sign In capability for their bundle identifier.

If you enable the Apple Sign In capability through the [Apple Developer Console](https://developer.apple.com/account/resources/identifiers/list), then be sure to add the following entitlements in your ios/[app]/[app].entitlements file:

    <key>com.apple.developer.applesignin</key>
    <array>
      <string>Default</string>
    </array>
    

Also, set `CFBundleAllowMixedLocalizations` to `true` in your ios/[app]/Info.plist to ensure the sign-in button uses the device locale.

## Usage

Apple Authentication Usage

    import * as AppleAuthentication from 'expo-apple-authentication';
    import { View, StyleSheet } from 'react-native';
    
    export default function App() {
      return (
        <View style={styles.container}>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={styles.button}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
                
              } catch (e) {
                if (e.code === 'ERR_REQUEST_CANCELED') {
                  
                } else {
                  
                }
              }
            }}
          />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        width: 200,
        height: 44,
      },
    });
    

## Development and testing

You can test this library in Expo Go on iOS without following any of the instructions above. However, you'll need to add the config plugin to use this library if you are using EAS Build. When you sign into Expo Go, the identifiers and values you receive will likely be different than what you'll receive in standalone apps.

You can do limited testing of this library on the iOS Simulator. However, not all methods will behave the same as on a device, so we highly recommend testing on a real device when possible while developing.

## Verifying the Response from Apple

Apple's response includes a signed JWT with information about the user. To ensure that the response came from Apple, you can cryptographically verify the signature with Apple's public key, which is published at [https://appleid.apple.com/auth/keys](https://appleid.apple.com/auth/keys). This process is not specific to Expo.

## API

    import * as AppleAuthentication from 'expo-apple-authentication';
    

### `AppleAuthenticationButton`

Type: `React.Element<AppleAuthenticationButtonProps>`

This component displays the proprietary "Sign In with Apple" / "Continue with Apple" button on your screen. The App Store Guidelines require you to use this component to start the authentication process instead of a custom button. Limited customization of the button is available via the provided properties.

You should only attempt to render this if `AppleAuthentication.isAvailableAsync()` resolves to `true`. This component will render nothing if it is not available, and you will get a warning in development mode (`__DEV__ === true`).

The properties of this component extend from `View`; however, you should not attempt to set `backgroundColor` or `borderRadius` with the `style` property. This will not work and is against the App Store Guidelines. Instead, you should use the `buttonStyle` property to choose one of the predefined color styles and the `cornerRadius` property to change the border radius of the button.

Make sure to attach height and width via the style props as without these styles, the button will not appear on the screen.

> See: [Apple Documentation](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidbutton) for more details.

AppleAuthenticationButtonProps

The Apple-defined color scheme to use to display the button.

The type of button text to display ("Sign In with Apple" vs. "Continue with Apple").

Optional • Type: `number`

The border radius to use when rendering the button. This works similarly to `style.borderRadius` in other Views.

Type: `(...`

