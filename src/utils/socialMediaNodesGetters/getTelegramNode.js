export default function getTelegramNode(url) {
  const path = document.createElement("a");
  path.href = url;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://telegram.org/js/telegram-widget.js?11";
  script.setAttribute("data-telegram-post", path.pathname);

  return script;
}
