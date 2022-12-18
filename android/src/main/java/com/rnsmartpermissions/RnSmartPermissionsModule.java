package com.rnsmartpermissions;

import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.os.Handler;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.PermissionAwareActivity;

@ReactModule(name = RnSmartPermissionsModule.NAME)
public class RnSmartPermissionsModule extends ReactContextBaseJavaModule {
  public static final String NAME = "RnSmartPermissions";

  public RnSmartPermissionsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @SuppressLint("MissingPermission")
  @ReactMethod
  public void turnOnBluetooth(Promise promise) {
    BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    if (!mBluetoothAdapter.isEnabled()) {
      mBluetoothAdapter.enable();
    }
    new Handler().postDelayed(() -> {
      promise.resolve(true);
    },500);
  }


}
