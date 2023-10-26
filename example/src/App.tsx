import * as React from 'react';

// import { StyleSheet, View, Button, Alert } from 'react-native';
// import { checkAndRequestPermissions, PERMISSION } from 'rn-smart-permissions';

export default function App() {
  // const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {}, []);

  return (
    // <View style={styles.container}>
    {
      /* <Button
        title="Location Permission"
        onPress={() => {
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
            .then((isAllowed) => {
              if (isAllowed) {
                Alert.alert('', 'Got All access');
              }
            })
            .catch((e) => {
              console.log('permission', e);
            });
        }}
      />

     <Button
        title="Bluetooth Permission"
        style={styles.button}
        onPress={() => {
          checkAndRequestPermissions(
            PERMISSION.BLUETOOTH,
            () => {
              //Rationale dialog here
              return new Promise((resolve) => {
                Alert.alert(
                  '',
                  'App needs location permission to scan and connect bluetooth devices',
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
              return new Promise((resolve) => {
                Alert.alert(
                  '',
                  'Blutooth request is blocked',
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
            .then((isAllowed) => {
              if (isAllowed) {
                Alert.alert('', 'Got All access');
              }
            })
            .catch((e) => {
              console.log('permission', e);
            });
        }}
      />

     <Button
        title="Camera Permission"
        style={styles.button}
        onPress={() => {
          checkAndRequestPermissions(
            PERMISSION.CAMERA,
            () => {
              //Rationale dialog here
              return new Promise((resolve) => {
                Alert.alert(
                  '',
                  'App needs camera permission to capture your profile picture',
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
              return new Promise((resolve) => {
                Alert.alert(
                  '',
                  'Usage of camera is blocked, Need camera permission to update your profile',
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
            .then((isAllowed) => {
              if (isAllowed) {
                Alert.alert('', 'Got All access');
              }
            })
            .catch((e) => {
              console.log('permission', e);
            });
        }}
      />
       <Button
        title="Storage Permission"
        style={styles.button}
        onPress={() => {
          checkAndRequestPermissions(
            PERMISSION.STORAGE,
            () => {
              //Rationale dialog here
              return new Promise((resolve) => {
                Alert.alert(
                  '',
                  'App needs storage permission to store the image',
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
              return new Promise((resolve) => {
                Alert.alert(
                  '',
                  'Usage of storage is blocked, Need storage/photos permission to store picture in gallery',
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
            .then((isAllowed) => {
              if (isAllowed) {
                Alert.alert('', 'Got All access');
              }
            })
            .catch((e) => {
              console.log('permission', e);
            });
        }}
      /> */
    }
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   box: {
//     width: 60,
//     height: 60,
//     marginVertical: 20,
//   },
//   button: {
//     marginTop: 20,
//     marginVertical: 10,
//   },
// });
