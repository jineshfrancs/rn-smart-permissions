# rn-smart-permissions

Permissions Library for React Native ( Android and iOS)

## Installation

```sh
npm install rn-smart-permissions
```

## Usage

```js
import { checkAndRequestPermissions,  PERMISSION, PERMISSION_RESULT} from 'rn-smart-permissions';

// ...

checkAndRequestPermissions(
            PERMISSION.LOCATION,
            () => {
              //Rationale dialog here
              return new Promise((resolve) => {
                Alert.alert(
                  '',
                  'App needs location permission to read your current location and display on map',
                  [
                    {
                      text: 'cancel',
                      onPress: () => {
                        resolve(false);
                      },
                    },
                    {
                      text: 'ok',
                      onPress: () => {
                        resolve(true);
                      },
                    },
                  ]
                );
              });
            },
            () => {
              //blocked permission dialog here
              return new Promise((resolve) => {
                Alert.alert(
                  '',
                  'Location services are blocked, please enable through settings',
                  [
                    {
                      text: 'cancel',
                      onPress: () => {
                        resolve(false);
                      },
                    },
                    {
                      text: 'open settings',
                      onPress: () => {
                        resolve(true);
                      },
                    },
                  ]
                );
              });
            }
          )
            .then((result) => {
              if (result === PERMISSION_RESULT.AUTHORIZED) {
                Alert.alert('', 'Got All access');
              }
            })
            .catch((e) => {
              console.log('permission', e);
            });
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
