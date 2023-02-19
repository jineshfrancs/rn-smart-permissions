# rn-smart-permissions

Permissions Library for React Native ( Android and iOS). The NPM package is https://www.npmjs.com/package/rn-smart-permissions

## Installation

```sh
npm install rn-smart-permissions
```

## Advantages

<img src="https://user-images.githubusercontent.com/23492622/208310967-2a3861f5-be4e-4bc9-8b69-80fa83a6c6b2.png" height="300"/>

<img src="https://user-images.githubusercontent.com/23492622/208310984-5cf9d00e-bf0c-4c96-95f9-df315a9acda7.png" height="300"/>

<img src="https://user-images.githubusercontent.com/23492622/208310992-f1a99f95-ddb3-4af2-a1dc-173134f75f11.png" height="300"/>

<img src="https://user-images.githubusercontent.com/23492622/208423654-46d6bce8-6307-447b-9da7-5cea0282b54d.png" height="300"/>

<img src="https://user-images.githubusercontent.com/23492622/208423403-3c1889b2-fb0b-457c-a411-b610f569c354.png" height="300"/>




## Usage

```js
import { checkAndRequestPermissions,  PERMISSION, PERMISSION_RESULT} from 'rn-smart-permissions';

// ...

   checkAndRequestPermissions(
            PERMISSION.LOCATION,
            () => {
              //Rationale dialog here
              return new Promise((resolve) => {
                //show rationale dialog here and resolve the promise with true to continue
              });
            },
            () => {
              //blocked permission dialog here
              return new Promise((resolve) => {
                //show blocked permission dialog here and resolve the promise with true to open settings
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

## Thanks

  1. https://www.npmjs.com/package/react-native-permissions
  2. https://www.npmjs.com/package/react-native-android-location-enabler

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
