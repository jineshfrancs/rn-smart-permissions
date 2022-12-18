#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RnSmartPermissions, NSObject)

RCT_EXTERN_METHOD(turnOnBluetooth: (RCTPromiseResolveBlock)resolve rejectBlock:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
