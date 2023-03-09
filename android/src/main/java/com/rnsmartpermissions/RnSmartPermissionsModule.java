package com.rnsmartpermissions;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.PermissionAwareActivity;

@ReactModule(name = RnSmartPermissionsModule.NAME)
public class RnSmartPermissionsModule extends ReactContextBaseJavaModule implements ActivityEventListener {

  private ReactContext context;
  private static final int BLUETOOTH_ENABLE_CODE = 99;
  public static final String NAME = "RnSmartPermissions";
  private Promise promise;

  public RnSmartPermissionsModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.context = reactContext;
    context.addActivityEventListener(this);
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
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      this.promise = promise;
      Intent intent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
      context.startActivityForResult(intent, BLUETOOTH_ENABLE_CODE, new Bundle());
    }else {
      if (!mBluetoothAdapter.isEnabled()) {
        mBluetoothAdapter.enable();
      }
      new Handler().postDelayed(() -> {
        promise.resolve(true);
      }, 500);
    }
  }


  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, @Nullable Intent intent) {
      if(requestCode==BLUETOOTH_ENABLE_CODE) {
        if(resultCode == Activity.RESULT_OK) {
          if(promise!=null)
            promise.resolve(true);
        }else {
          promise.resolve(false);
        }
      }
  }

  @Override
  public void onNewIntent(Intent intent) {

  }
}
