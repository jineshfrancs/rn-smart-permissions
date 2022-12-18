import { NativeModules, Platform } from 'react-native';
import PermissionManager from "../src/permissionManager"

const LINKING_ERROR =
  `The package 'rn-smart-permissions' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RnSmartPermissions = NativeModules.RnSmartPermissions
  ? NativeModules.RnSmartPermissions
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const PERMISSION = {
  BLUETOOTH : "bluetooth",
  LOCATION : "location"
}

export const PERMISSION_RESULT = {
  AUTHORIZED: "authorized",
  UNAVAILABLE: "unavailable",
  DENIED: "denied"
}

export function turnOnBluetooth(): Promise<number> {
  return RnSmartPermissions.turnOnBluetooth();
}

export function checkAndRequestPermissions(permission: string, permissionRationaleDialog: object, permissionBlockedDialog: object): Promise<string> {
  return PermissionManager.checkAndRequestPermission(permission, permissionRationaleDialog, permissionBlockedDialog);
}
