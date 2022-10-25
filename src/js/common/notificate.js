export function notificate(title, message) {
  const options = {
    type:"basic",
    title: title,
    message: message,
    iconUrl:"image/icon.png",
  };
  chrome.notifications.create(options);
}
