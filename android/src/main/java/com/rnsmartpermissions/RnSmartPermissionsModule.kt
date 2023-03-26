package com.rnsmartpermissions

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Build
import android.os.Bundle
import android.os.Handler
import com.facebook.react.bridge.ActivityEventListener

@ReactModule(name = RnSmartPermissionsModule.name)
class RnSmartPermissionsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {
    private val context: ReactContext
    private var promise: Promise? = null

    init {
        context = reactContext
        context.addActivityEventListener(this)
    }

    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @SuppressLint("MissingPermission")
    @ReactMethod
    fun turnOnBluetooth(promise: Promise) {
        val mBluetoothAdapter: BluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (!mBluetoothAdapter.isEnabled()) {
                this.promise = promise
                val intent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
                context.startActivityForResult(intent, BLUETOOTH_ENABLE_CODE, Bundle())
            } else {
                promise.resolve(true)
            }
        } else {
            if (!mBluetoothAdapter.isEnabled()) {
                mBluetoothAdapter.enable()
            }
            Handler().postDelayed({ promise.resolve(true) }, 500)
        }
    }

    fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, intent: Intent?) {
        if (requestCode == BLUETOOTH_ENABLE_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                if (promise != null) promise.resolve(true)
            } else {
                promise.resolve(false)
            }
        }
    }

    fun onNewIntent(intent: Intent?) {}

    companion object {
        private const val BLUETOOTH_ENABLE_CODE = 99
        val name = "RnSmartPermissions"
            get() = Companion.field
    }
}