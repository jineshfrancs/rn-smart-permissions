import CoreBluetooth
import Foundation

@objc(RnSmartPermissions)
class RnSmartPermissions: NSObject, CBCentralManagerDelegate {
  var centralManager: CBCentralManager!
    
  @objc
    func turnOnBluetooth(_ resolve: @escaping RCTPromiseResolveBlock, rejectBlock reject: RCTPromiseRejectBlock) -> Void {
        centralManager = CBCentralManager(delegate: self, queue: nil)
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            switch self.centralManager.state {
            case .poweredOn:
               resolve(true)
                break;
            default:
                resolve(false)
                break;
            }
        }
        
  }
  
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        switch central.state {
        case .unknown:
          break;
        case .resetting:
          break;
        case .unsupported:
          break;
        case .unauthorized:
          break;
        case .poweredOff:
          break;
        case .poweredOn:
            break;
        @unknown default: break
        }
    }
}
