# Battery

`expo-battery` provides battery information for the physical device (such as battery level, whether or not the device is charging, and more) as well as corresponding event listeners.

## Installation

`-` `npx expo install expo-battery`

If you are installing this in an [existing React Native app](https://reactnative.dev/docs/integration-with-existing-apps), make sure to [install `expo`](https://docs.expo.dev/workflow/installing-expo-modules/) in your project.

## Usage

    import { useBatteryLevel } from 'expo-battery';
    import { StyleSheet, Text, View } from 'react-native';
    
    export default function App() {
      const batteryLevel = useBatteryLevel();
    
      return (
        <View style={styles.container}>
          <Text>Current Battery Level: {batteryLevel}</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

## API

    import * as Battery from 'expo-battery';

### Hooks

#### `useBatteryLevel()`

`useBatteryLevel()`

A React hook that returns the battery level of the device, or `null` if the battery level is not available.

Returns:

`number | null`

Example

    const batteryLevel = useBatteryLevel();

#### `useBatteryState()`

`useBatteryState()`

A React hook that returns the battery state of the device, or `null` if the battery state is not available.

Returns:

`BatteryState | null`

Example

    const batteryState = useBatteryState();

#### `useLowPowerMode()`

`useLowPowerMode()`

A React hook that returns whether low power mode is enabled on the device, or `null` if the information is not available.

Returns:

`boolean | null`

Example

    const isLowPowerModeEnabled = useLowPowerMode();

#### `usePowerState()`

`usePowerState()`

A React hook that returns the power state of the device, or `null` if the power state is not available.

Returns:

`PowerState | null`

Example

    const powerState = usePowerState();

### Methods

#### `Battery.getBatteryLevelAsync()`

`Battery.getBatteryLevelAsync()`

Returns a `Promise` that fulfills with a `number` specifying the battery level of the device. The battery level is a float number between `0` and `1`.

Returns:

`Promise<number>`

Example

    const batteryLevel = await Battery.getBatteryLevelAsync();

#### `Battery.getBatteryStateAsync()`

`Battery.getBatteryStateAsync()`

Returns a `Promise` that fulfills with a `BatteryState` enum value indicating the battery state of the device.

Returns:

`Promise<BatteryState>`

Example

    const batteryState = await Battery.getBatteryStateAsync();

#### `Battery.getPowerStateAsync()`

`Battery.getPowerStateAsync()`

Returns a `Promise` that fulfills with a `PowerState` object specifying the power state of the device.

Returns:

`Promise<PowerState>`

Example

    const powerState = await Battery.getPowerStateAsync();

#### `Battery.isAvailableAsync()`

`Battery.isAvailableAsync()`

Returns a `Promise` that fulfills with a `boolean` value indicating whether the battery API is available on the current device.

Returns:

`Promise<boolean>`

Example

    const isAvailable = await Battery.isAvailableAsync();

#### `Battery.isBatteryOptimizationEnabledAsync()`

`Battery.isBatteryOptimizationEnabledAsync()`

Returns a `Promise` that fulfills with a `boolean` value indicating whether battery optimization is enabled for the app. On iOS and web, this function is unavailable.

Returns:

`Promise<boolean>`

Example

    const isBatteryOptimizationEnabled = await Battery.isBatteryOptimizationEnabledAsync();

#### `Battery.isLowPowerModeEnabledAsync()`

`Battery.isLowPowerModeEnabledAsync()`

Returns a `Promise` that fulfills with a `boolean` value indicating whether low power mode is enabled on the device. On Android and web, this function is unavailable.

Returns:

`Promise<boolean>`

Example

    const isLowPowerModeEnabled = await Battery.isLowPowerModeEnabledAsync();

### Event Subscriptions

#### `Battery.addBatteryLevelListener(listener)`

`Battery.addBatteryLevelListener(listener)`

| Parameter | Type | Description |
| --- | --- | --- |
| listener | `(event: BatteryLevelEvent) => void` | 
A callback that is invoked when battery level changes. The callback is provided a single argument that is an object with a `batteryLevel` key.



 |

Subscribe to the battery level change updates.

On Android devices, the event fires only when significant changes happens, which is when the battery level drops below [`android.intent.action.BATTERY_LOW`](https://developer.android.com/reference/android/content/Intent#ACTION_BATTERY_LOW) or rises above [`android.intent.action.BATTERY_OKAY`](https://developer.android.com/reference/android/content/Intent#ACTION_BATTERY_OKAY) from a low battery level. See [Monitor the Battery Level and Charging State](https://developer.android.com/training/monitoring-device-state/battery-monitoring) in Android documentation for more information.

On iOS devices, the event fires when the battery level drops one percent or more, but is only fired once per minute at maximum.

On web, the event never fires.

Returns:

`EventSubscription`

A `Subscription` object on which you can call `remove()` to unsubscribe from the listener.

Example

    const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      console.log(batteryLevel);
    });

#### `Battery.addBatteryStateListener(listener)`

`Battery.addBatteryStateListener(listener)`

| Parameter | Type | Description |
| --- | --- | --- |
| listener | `(event: BatteryStateEvent) => void` | 
A callback that is invoked when battery state changes. The callback is provided a single argument that is an object with a `batteryState` key.



 |

Subscribe to the battery state change updates.

Returns:

`EventSubscription`

A `Subscription` object on which you can call `remove()` to unsubscribe from the listener.

Example

    const subscription = Battery.addBatteryStateListener(({ batteryState }) => {
      console.log(batteryState);
    });

#### `Battery.addLowPowerModeListener(listener)`

`Battery.addLowPowerModeListener(listener)`

| Parameter | Type | Description |
| --- | --- | --- |
| listener | `(event: PowerModeEvent) => void` | 
A callback that is invoked when low power mode changes. The callback is provided a single argument that is an object with a `lowPowerMode` key.



 |

Subscribe to the low power mode change updates.

Returns:

`EventSubscription`

A `Subscription` object on which you can call `remove()` to unsubscribe from the listener.

Example

    const subscription = Battery.addLowPowerModeListener(({ lowPowerMode }) => {
      console.log(lowPowerMode);
    });

### Interfaces

#### `PowerState`

Type: `object`

An object containing the power state of the device.

### `Subscription`

Type: `object`

A subscription to battery updates.

### Types

#### `BatteryLevelEvent`

Type: `object`

An object containing the battery level.

#### `BatteryStateEvent`

Type: `object`

An object containing the battery state.

#### `PowerModeEvent`

Type: `object`

An object containing the low power mode status.

#### `PowerState`

Type: `object`

An object containing the power state of the device.

## Enums

#### `BatteryState`

`Battery.BatteryState.UNKNOWN` | `Battery.BatteryState.UNPLUGGED` | `Battery.BatteryState.CHARGING` | `Battery.BatteryState.FULL`

