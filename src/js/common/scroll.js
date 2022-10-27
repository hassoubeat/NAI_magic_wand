export function bottomToScroll() {
  const element = document.documentElement;
  window.scroll(0, element.scrollHeight - element.clientHeight);
}