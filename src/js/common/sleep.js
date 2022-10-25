export function sleep(waitMillsec, callbackFunc) {
  const checkInterval = 100;
  let spanedSec = 0;

  const id = setInterval(function () {
    spanedSec = spanedSec + checkInterval;
    if (spanedSec >= waitMillsec) {
      clearInterval(id);
      if (callbackFunc) callbackFunc();
    }
  }, checkInterval);

}