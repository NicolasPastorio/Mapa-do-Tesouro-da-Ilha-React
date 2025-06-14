# BackgroundTask

A library that provides an API for running background tasks.

`expo-background-task` provides an API to run deferrable background tasks in a way that optimizes battery and power consumption on the end user's device. This module uses the [`WorkManager`](https://developer.android.com/topic/libraries/architecture/workmanager) API on Android and the [`BGTaskScheduler`](https://developer.apple.com/documentation/backgroundtasks/bgtaskscheduler) API on iOS to schedule tasks. It also uses the [`expo-task-manager`](https://docs.expo.dev/versions/latest/sdk/task-manager/) Native API to run JavaScript tasks.

## Background tasks

A background task is a deferrable unit of work that is performed in the background, outside your app's lifecycle. This is useful for tasks that need to be executed when the app is inactive, such as syncing data with a server, fetching new content, or even checking if there are any [`expo-updates`](https://docs.expo.dev/versions/latest/sdk/updates/).

### When are background tasks run?

The Expo Background Task API leverages each platform to execute tasks at the most optimal time for both the user and the device when the app is in the background.

This means that the task may not run immediately after it is scheduled, but it will run at some point in the future if the system decides so. You can specify a minimum interval in minutes for the task to run. The task will execute sometime after the interval has passed, provided the specified conditions are met.

A background task will only run if the battery has enough charge (or the device is plugged into power) and the network is available. Without these conditions, the task won't execute. The exact behavior will vary depending on the operating system.

### When will they be stopped?

Background tasks are managed by platform APIs and system constraints. Knowing when tasks stop helps plan their use effectively.

*   Background tasks are stopped if the user kills the app. Tasks resume when the app is restarted.
*   If the system stops the app or the device reboots, background tasks will resume, and the app will be restarted.

On Android, removing an app from the recent apps list doesn't completely stop it, whereas on iOS, swiping it away in the app switcher fully terminates it.

> On Android, behavior varies by device vendor. For example, some implementations treat removing an app from the recent apps list as killing it. Read more about these differences here: [https://dontkillmyapp.com](https://dontkillmyapp.com/).

## Platform differences

### Android

On Android, the [`WorkManager`](https://developer.android.com/topic/libraries/architecture/workmanager) API allows specifying a minimum interval for a task to run (minimum 15 minutes). The task will execute sometime after the interval has passed, provided the specified conditions are met.

### iOS

On iOS, the [`BGTaskScheduler`](https://developer.apple.com/documentation/backgroundtasks/bgtaskscheduler) API decides the best time to launch your background task. The system will consider the battery level, the network availability, and the user's usage patterns to determine when to run the task. You can still specify a minimum interval for the task to run, but the system may choose to run the task at a later time.

## Known limitations

### iOS

The [`Background Tasks`](https://developer.apple.com/documentation/backgroundtasks/) API is unavailable on iOS simulators. It is only available when running on a physical device.

## Installation

`-` `npx expo install expo-background-task`

If you are installing this in an [existing React Native app](https://reactnative.dev/docs/integration-with-existing-apps), make sure to [install `expo`](https://docs.expo.dev/workflow/installing-expo-modules/) in your project.

## Configuration

iOS

To be able to run background tasks on iOS, you need to add the `processing` value to the `UIBackgroundModes` array in your app's Info.plist file. This is required for background fetch to work properly.

If you're using [CNG](https://docs.expo.dev/guides/config-plugins/#continuous-native-generation), the required `UIBackgroundModes` configuration will be applied automatically by prebuild.

Configure UIBackgroundModes manually on iOS

If you're not using Continuous Native Generation ([CNG](https://docs.expo.dev/guides/config-plugins/#continuous-native-generation)), then you'll need to add the following to your Info.plist file:

ios/project-name/Supporting/Info.plist

    <key>UIBackgroundModes</key>
      <array>
        <string>processing</string>
      </array>
    </key>

## Usage

Below is an example that demonstrates how to use `expo-background-task`.

    import * as BackgroundTask from 'expo-background-task';
    import * as TaskManager from 'expo-task-manager';
    import { useEffect, useState } from 'react';
    import { StyleSheet, Text, View, Button } from 'react-native';
    
    const BACKGROUND_TASK_IDENTIFIER = 'background-task';
    
    
    
    
    TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
      try {
        const now = Date.now();
        console.log(`Got background task call at date: ${new Date(now).toISOString()}`);
      } catch (error) {
        console.error('Failed to execute the background task:', error);
        return BackgroundTask.BackgroundTaskResult.Failed;
      }
      return BackgroundTask.BackgroundTaskResult.Success;
    });
    
    
    
    
    async function registerBackgroundTaskAsync() {
      return BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER);
    }
    
    
    
    
    async function unregisterBackgroundTaskAsync() {
      return BackgroundTask.unregisterTaskAsync(BACKGROUND_TASK_IDENTIFIER);
    }
    
    export default function BackgroundTaskScreen() {
      const [isRegistered, setIsRegistered] = useState<boolean>(false);
      const [status, setStatus] = useState<BackgroundTask.BackgroundTaskStatus | null>(null);
    
      useEffect(() => {
        updateAsync();
      }, []);
    
      const updateAsync = async () => {
        const status = await BackgroundTask.getStatusAsync();
        setStatus(status);
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_IDENTIFIER);
        setIsRegistered(isRegistered);
      };
    
      const toggle = async () => {
        if (!isRegistered) {
          await registerBackgroundTaskAsync();
        } else {
          await unregisterBackgroundTaskAsync();
        }
        updateAsync();
      };
    
      return (
        <View style={styles.container}>
          <Text>Background task status: {status}</Text>
          <Text>Is registered: {isRegistered ? 'Yes' : 'No'}</Text>
          <Button
            title={isRegistered ? 'Unregister background task' : 'Register background task'}
            onPress={toggle}
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
    });

## Multiple background tasks

You can register multiple background tasks with different identifiers. Each task will run independently.

## Testing background tasks

To test background tasks, you can use the `triggerTaskWorkerForTestingAsync()` method. This method will immediately execute the task worker, even if the minimum interval has not passed.

## Inspecting background tasks

You can inspect the status of background tasks using the `getStatusAsync()` method. This method returns a `BackgroundTaskStatus` enum value indicating whether the task is registered, unregistered, or unknown.

## Troubleshooting background tasks

If your background tasks are not running as expected, you can try the following:

*   Check the device logs for any errors.
*   Ensure that the app has the necessary permissions to run background tasks.
*   Verify that the task identifier is correct.
*   Increase the minimum interval to give the system more time to run the task.

## API

    import * as BackgroundTask from 'expo-background-task';

### Methods

#### `BackgroundTask.getStatusAsync()`

`BackgroundTask.getStatusAsync()`

Returns a `Promise` that fulfills with a `BackgroundTaskStatus` enum value indicating whether the task is registered, unregistered, or unknown.

Returns:

`Promise<BackgroundTaskStatus>`

Example

    const status = await BackgroundTask.getStatusAsync();

#### `BackgroundTask.registerTaskAsync(taskName, taskWorker, options)`

`BackgroundTask.registerTaskAsync(taskName, taskWorker, options)`

| Parameter | Type | Description |
| --- | --- | --- |
| taskName | `string` | 
The name of the task to register. This name must be unique across all background tasks.



 |
| taskWorker | `Function` | 
The function to execute when the task is run. This function must be an `async` function.



 |
| options(optional) | `BackgroundTaskOptions` | 
Options for the background task.



 |

  

Registers a background task with the given name and worker function. The task will be executed periodically in the background.

Returns:

`Promise<void>`

Example

    await BackgroundTask.registerTaskAsync(
      'my-background-task',
      async () => {
        console.log('My background task is running!');
      },
      {
        minimumInterval: 60 * 15, // Run every 15 minutes
      }
    );

#### `BackgroundTask.triggerTaskWorkerForTestingAsync(taskName)`

`BackgroundTask.triggerTaskWorkerForTestingAsync(taskName)`

| Parameter | Type | Description |
| --- | --- | --- |
| taskName | `string` | 
The name of the task to trigger.



 |

  

Immediately executes the task worker for the given task name. This method is useful for testing background tasks.

Returns:

`Promise<void>`

Example

    await BackgroundTask.triggerTaskWorkerForTestingAsync('my-background-task');

#### `BackgroundTask.unregisterTaskAsync(taskName)`

`BackgroundTask.unregisterTaskAsync(taskName)`

| Parameter | Type | Description |
| --- | --- | --- |
| taskName | `string` | 
The name of the task to unregister.



 |

  

Unregisters a background task with the given name. The task will no longer be executed in the background.

Returns:

`Promise<void>`

Example

    await BackgroundTask.unregisterTaskAsync('my-background-task');

### Types

#### `BackgroundTaskOptions`

Type: `object`

Options for a background task.

### `BackgroundTaskResult`

Type: `enum`

Result of a background task.

### `BackgroundTaskStatus`

Type: `enum`

Status of a background task.

## Enums

#### `BackgroundTaskResult`

`BackgroundTask.BackgroundTaskResult.NoData` | `BackgroundTask.BackgroundTaskResult.NewData` | `BackgroundTask.BackgroundTaskResult.Failed`

#### `BackgroundTaskStatus`

`BackgroundTask.BackgroundTaskStatus.Registered` | `BackgroundTask.BackgroundTaskStatus.Unregistered` | `BackgroundTask.BackgroundTaskStatus.Unknown`

