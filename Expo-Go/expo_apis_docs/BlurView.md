# BlurView

A React component that blurs everything underneath the view.

A React component that blurs everything underneath the view. Common usage of this is for navigation bars, tab bars, and modals.

> `BlurView` on Android is an experimental feature. To enable it use the [`experimentalBlurMethod`](https://docs.expo.dev/versions/latest/sdk/blur-view/#experimentalblurmethod) prop.

#### Known issues

The blur effect does not update when `BlurView` is rendered before dynamic content is rendered using, for example, `FlatList`. To fix this, make sure that `BlurView` is rendered after the dynamic content component. For example:

    <View>
      <FlatList />
      <BlurView />
    </View>
    

## Installation

`-` `npx expo install expo-blur`

If you are installing this in an [existing React Native app](https://reactnative.dev/docs/integration-with-existing-apps), make sure to [install `expo`](https://docs.expo.dev/workflow/installing-expo-modules/) in your project.

## Usage

    import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
    import { BlurView } from 'expo-blur';
    
    export default function App() {
      const text = 'Hello, my container is blurring contents underneath!';
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.background}>
            {[...Array(20).keys()].map(i => (
              <View
                key={`box-${i}`}
                style={[styles.box, i % 2 === 1 ? styles.boxOdd : styles.boxEven]}
              />
            ))}
          </View>
          <BlurView intensity={100} style={styles.blurContainer}>
            <Text style={styles.text}>{text}</Text>
          </BlurView>
          <BlurView intensity={80} tint="light" style={styles.blurContainer}>
            <Text style={styles.text}>{text}</Text>
          </BlurView>
          <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
            <Text style={[styles.text, { color: '#fff' }]}>{text}</Text>
          </BlurView>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      blurContainer: {
        flex: 1,
        padding: 20,
        margin: 16,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 20,
      },
      background: {
        flex: 1,
        flexWrap: 'wrap',
        ...StyleSheet.absoluteFill,
      },
      box: {
        width: '25%',
        height: '20%',
      },
      boxEven: {
        backgroundColor: 'orangered',
      },
      boxOdd: {
        backgroundColor: 'gold',
      },
      text: {
        fontSize: 24,
        fontWeight: '600',
      },
    });
    

## API

    import { BlurView } from 'expo-blur';
    

## Component

Type: `React.[Component](https://react.dev/reference/react/Component)<>`

Optional • Type: `number` • Default: `4`

A number by which the blur intensity will be divided on Android.

When using experimental blur methods on Android, the perceived blur intensity might differ from iOS at different intensity levels. This property can be used to fine tune it on Android to match it more closely with iOS.

Optional • Type: • Default: `'none'`

Blur method to use on Android.

> Currently, `BlurView` support is experimental on Android and may cause performance and graphical issues. It can be enabled by setting this property.

Optional • Type: `number` • Default: `50`

A number from `1` to `100` to control the intensity of the blur effect.

You can animate this property using `react-native-reanimated`.

Optional • Type: • Default: `'default'`

A tint mode which will be applied to the view.

#### Inherited Props

*   `[ViewProps](https://reactnative.dev/docs/view#props)`

## Types

Literal Type: `string`

Acceptable values are: `'light'` | `'dark'` | `'default'`

