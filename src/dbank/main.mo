import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank{
  stable var currentValue : Float = 300;
  currentValue := 300;

  stable var startTime = Time.now();

  public func topUp(amount: Float) : async (){

    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdraw(withdrawAmt: Float) : async Result.Result<Float, Text>{
    if(withdrawAmt > currentValue) {
      return #err("Insufficient balance");
      };

    currentValue -= withdrawAmt;
    Debug.print(debug_show(currentValue));
    return #ok(currentValue);
  };

  public query func checkBalance(): async Float{
    return currentValue;
  };

  public func compound(){
    let  currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;

    currentValue := currentValue * (Float.pow(1.01, Float.fromInt(timeElapsedS)));
    startTime := currentTime;
  };
}