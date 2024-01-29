/* @flow */

import Permissions from 'react-native-permissions';
import { Linking, NativeModules } from 'react-native';
import { Platform } from 'react-native';
import { PERMISSION, PERMISSION_RESULT } from '..';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
const RnSmartPermissions = NativeModules.RnSmartPermissions;

export default class PermissionManager {
  //Note: Dont call this method from any component except cameraUnAuthView

  static checkAndRequestPermission(
    permission,
    permissionRationaleDialog,
    permissionBlockedDialog
  ) {
    return new Promise((resolve, reject) => {
      if (permission === PERMISSION.BLUETOOTH) {
        if (Platform.OS === 'android') {
          if (Platform.Version >= 31) {
            this.checkMultiplePermissions(
              [
                Permissions.PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                Permissions.PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
              ],
              permissionBlockedDialog
            ).then((response) => {
              if (response === PERMISSION_RESULT.AUTHORIZED) {
                RnSmartPermissions.turnOnBluetooth().then((isGot) => {
                  if (isGot) {
                    resolve(PERMISSION_RESULT.AUTHORIZED);
                  } else {
                    resolve(PERMISSION_RESULT.DENIED);
                  }
                });
              } else {
                resolve(PERMISSION_RESULT.DENIED);
              }
            });
          } else {
            //Only location permission required
            let perm = Permissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
            this.handlePermissions(
              perm,
              permissionRationaleDialog,
              permissionBlockedDialog,
              resolve,
              reject,
              true
            );
          }
        } else {
          this.handlePermissions(
            Permissions.PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
            permissionRationaleDialog,
            permissionBlockedDialog,
            resolve,
            reject,
            true
          );
        }
      } else if (permission === PERMISSION.LOCATION) {
        let perm =
          Platform.OS === 'android'
            ? Permissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            : Permissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        this.handlePermissions(
          perm,
          permissionRationaleDialog,
          permissionBlockedDialog,
          resolve,
          reject
        );
      } else if (permission === PERMISSION.STORAGE) {
        this.handlePermissions(
          permission,
          permissionRationaleDialog,
          permissionBlockedDialog,
          resolve,
          reject
        );
      } else if (permission === PERMISSION.CAMERA) {
        this.handlePermissions(
          permission,
          permissionRationaleDialog,
          permissionBlockedDialog,
          resolve,
          reject
        );
      } else {
        reject('This permission not supported');
      }
    });
  }

  static enableLocation(resolve, isBluetooth) {
    if (Platform.OS === 'ios') {
      resolve(PERMISSION_RESULT.AUTHORIZED);
    } else {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then((data) => {
          if (isBluetooth) {
            RnSmartPermissions.turnOnBluetooth().then((isGot) => {
              if (isGot) {
                resolve(PERMISSION_RESULT.AUTHORIZED);
              }
            });
          } else {
            resolve(PERMISSION_RESULT.AUTHORIZED);
          }
        })
        .catch((err) => {
          resolve(PERMISSION_RESULT.DENIED);
        });
    }
  }

  static requestPermission(
    perm,
    resolve,
    permissionBlockedDialog,
    isBluetooth
  ) {
    Permissions.request(perm)
      .then((result) => {
        if (
          result === Permissions.RESULTS.GRANTED ||
          result === Permissions.RESULTS.LIMITED
        ) {
          if (perm === Permissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) {
            this.enableLocation(resolve, isBluetooth);
          } else if (
            perm === Permissions.PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
          ) {
            RnSmartPermissions.turnOnBluetooth().then((isGot) => {
              if (isGot) {
                resolve(PERMISSION_RESULT.AUTHORIZED);
              }
            });
          } else {
            resolve(PERMISSION_RESULT.AUTHORIZED);
          }
        } else if (result === Permissions.RESULTS.DENIED) {
          resolve(PERMISSION_RESULT.DENIED);
        } else if (result === Permissions.RESULTS.BLOCKED) {
          if (Platform.OS === 'android') {
            permissionBlockedDialog().then((isNeeded) => {
              if (isNeeded) {
                Linking.openSettings();
                resolve(PERMISSION_RESULT.DENIED);
              } else {
                resolve(false);
              }
            });
          }
        } else if (result === Permissions.RESULTS.UNAVAILABLE) {
          permissionBlockedDialog().then((isNeeded) => {
            if (isNeeded) {
              perm === Permissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                ? Linking.openURL('App-Prefs:Privacy&path=LOCATION')
                : Linking.openSettings();
              resolve(PERMISSION_RESULT.DENIED);
            }
          });
        } else {
        }
      })
      .catch((e) => {});
  }

  static handlePermissions(
    perm,
    permissionRationaleDialog,
    permissionBlockedDialog,
    resolve,
    reject,
    isBluetooth = false
  ) {
    Permissions.check(perm)
      .then((result) => {
        if (result === PERMISSION_RESULT.DENIED) {
          permissionRationaleDialog().then((isNeeded) => {
            if (isNeeded) {
              this.requestPermission(
                perm,
                resolve,
                permissionBlockedDialog,
                isBluetooth
              );
            } else {
              reject('Permission denied');
            }
          });
        } else if (
          result === Permissions.RESULTS.GRANTED ||
          result === Permissions.RESULTS.LIMITED
        ) {
          if (perm === Permissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) {
            this.enableLocation(resolve, isBluetooth);
          } else if (
            perm === Permissions.PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
          ) {
            RnSmartPermissions.turnOnBluetooth().then((isGot) => {
              if (isGot) {
                resolve(PERMISSION_RESULT.AUTHORIZED);
              } else {
                reject('Bluetooth is turned off');
              }
            });
          } else {
            resolve(PERMISSION_RESULT.AUTHORIZED);
          }
        } else if (result === Permissions.RESULTS.BLOCKED) {
          permissionBlockedDialog().then((isNeeded) => {
            if (isNeeded) {
              Linking.openSettings();
              resolve(PERMISSION_RESULT.DENIED);
            }
          });
        } else if (result === Permissions.RESULTS.UNAVAILABLE) {
          if (Platform.OS === 'ios') {
            this.requestPermission(
              perm,
              resolve,
              permissionBlockedDialog,
              isBluetooth
            );
          } else {
            permissionBlockedDialog().then((isNeeded) => {
              if (isNeeded) {
                perm === Permissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                  ? Linking.openURL('App-Prefs:Privacy&path=LOCATION')
                  : Linking.openSettings();
                resolve(PERMISSION_RESULT.DENIED);
              }
            });
          }
        }
      })
      .catch((e) => {});
  }

  static checkMultiplePermissions(permissions, permissionBlockedDialog) {
    return new Promise(async (resolve) => {
      const response = await Permissions.checkMultiple(permissions);
      if (
        Object.keys(response).every(
          (result) =>
            response[result] === Permissions.RESULTS.GRANTED ||
            response[result] === Permissions.RESULTS.LIMITED ||
            response[result] === Permissions.RESULTS.AUTHORIZED
        )
      ) {
        resolve(PERMISSION_RESULT.AUTHORIZED);
      } else if (
        Object.keys(response).some(
          (result) =>
            response[result] === Permissions.RESULTS.DENIED ||
            response[result] === Permissions.RESULTS.UNDETERMINED
        )
      ) {
        Permissions.requestMultiple(permissions).then((response) => {
          if (
            Object.keys(response).every(
              (result) =>
                response[result] === Permissions.RESULTS.GRANTED ||
                response[result] === Permissions.RESULTS.LIMITED ||
                response[result] === Permissions.RESULTS.AUTHORIZED
            )
          ) {
            resolve(PERMISSION_RESULT.AUTHORIZED);
          } else if (
            Object.keys(response).some(
              (result) => response[result] === Permissions.RESULTS.BLOCKED
            )
          ) {
            permissionBlockedDialog().then((isNeeded) => {
              if (isNeeded) {
                Linking.openSettings();
                resolve(PERMISSION_RESULT.DENIED);
              }
            });
          } else {
            resolve(PERMISSION_RESULT.DENIED);
          }
        });
      } else if (
        Object.keys(response).some(
          (result) => response[result] === Permissions.RESULTS.BLOCKED
        )
      ) {
        permissionBlockedDialog().then((isNeeded) => {
          if (isNeeded) {
            Linking.openSettings();
            resolve(PERMISSION_RESULT.DENIED);
          }
        });
      } else {
        resolve(PERMISSION_RESULT.DENIED);
      }
    });
  }
}
