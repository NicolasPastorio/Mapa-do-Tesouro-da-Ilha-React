# Barometer

A library that provides access to device's barometer sensor.

`Barometer` from `expo-sensors` provides access to the device barometer sensor to respond to changes in air pressure, which is measured in hectopascals (`hPa`).

## Installation

`-` `npx expo install expo-sensors`

If you are installing this in an [existing React Native app](https://reactnative.dev/docs/integration-with-existing-apps), make sure to [install `expo`](https://docs.expo.dev/workflow/installing-expo-modules/) in your project.

## Usage

    import { useState } from 'react';
    import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
    import { Barometer } from 'expo-sensors';
    
    export default function App() {
      const [{ pressure, relativeAltitude }, setData] = useState({ pressure: 0, relativeAltitude: 0 });
      const [subscription, setSubscription] = useState(null);
    
      const toggleListener = () => {
        subscription ? unsubscribe() : subscribe();
      };
    
      const subscribe = () => {
        setSubscription(Barometer.addListener(setData));
      };
    
      const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };
    
      return (
        <View style={styles.wrapper}>
          <Text>Barometer: Listener {subscription ? 'ACTIVE' : 'INACTIVE'}</Text>
          <Text>Pressure: {pressure} hPa</Text>
          <Text>
            Relative Altitude:{' '}
            {Platform.OS === 'ios' ? `${relativeAltitude} m` : `Only available on iOS`}
          </Text>
          <TouchableOpacity onPress={toggleListener} style={styles.button}>
            <Text>Toggle listener</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
        marginTop: 15,
      },
      wrapper: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
    });

## API

    import { Barometer } from 'expo-sensors';

## Classes

Type: Class extends `[DeviceSensor](https://docs.expo.dev/versions/latest/sdk/sensors/#devicesensor)`

Barometer Methods

| Parameter | Type | Description |
| --- | --- | --- |
| listener | `Listener<BarometerMeasurement>` | 
A callback that is invoked when a barometer update is available. When invoked, the listener is provided with a single argument that is `BarometerMeasurement`.



 |

Subscribe for updates to the barometer.

Returns:

`EventSubscription`

A subscription that you can call `remove()` on when you would like to unsubscribe the listener.

Example

    const subscription = Barometer.addListener(({ pressure, relativeAltitude }) => {
      console.log({ pressure, relativeAltitude });
    });

Returns the registered listeners count.

Checks user's permissions for accessing sensor.

Returns boolean which signifies if sensor has any listeners registered.

> You should always check the sensor availability before attempting to use it.

Check the availability of the device barometer. Requires at least Android 2.3 (API Level 9) and iOS 8.

A promise that resolves to a `boolean` denoting the availability of the sensor.

Removes all registered listeners.

### `removeSubscription(subscription)`

| Parameter | Type | Description |
| --- | --- | --- |
| subscription | `EventSubscription` | 
A subscription to remove.



 |

Removes the given subscription.

### `requestPermissionsAsync()`

Asks the user to grant permissions for accessing sensor.

### `setUpdateInterval(intervalMs)`

| Parameter | Type | Description |
| --- | --- | --- |
| intervalMs | `number` | 
Desired interval in milliseconds between sensor updates.

> Starting from Android 12 (API level 31), the system has a 200ms limit for each sensor updates.
> 
> If you need an update interval less than 200ms, you should:
> 
> *   add `android.permission.HIGH_SAMPLING_RATE_SENSORS` to [app.json `permissions`](https://docs.expo.dev/versions/latest/config/app/#permissions)



 |

Sets the update interval for the barometer. The update interval is the rate at which the barometer will report new data.

## Interfaces

### `BarometerMeasurement`

Type: `object`

An object containing barometer data.

### `Subscription`

Type: `object`

A subscription to barometer updates.

## Types

### `BarometerMeasurement`

Type: `object`

An object containing barometer data.

### `PermissionExpiration`

Type: `string`

### `PermissionResponse`

Type: `object`

## Enums

### `PermissionStatus`

`PermissionStatus.GRANTED` | `PermissionStatus.DENIED` | `PermissionStatus.UNDETERMINED`

## Units and providers

Barometer data is measured in hectopascals (`hPa`).

On iOS, the barometer data is provided by the CoreMotion framework. On Android, the barometer data is provided by the Android Sensor Framework.

