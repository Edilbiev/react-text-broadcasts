export default function getFacebookNode(url) {
  const encoded = encodeURIComponent(url);

  const iframe = document.createElement("iframe");
  iframe.src =
    "https://www.facebook.com/plugins/post.php?href=" +
    encoded +
    "&show_text=true&width=552&height=274&appId";

  iframe.width = "552";
  iframe.height = "274";
  iframe.scrolling = "no";
  iframe.frameBorder = "0";
  iframe.allow = "encrypted-media";
  iframe.setAttribute("allowTransparency", "true");
  iframe.style = "border:none;overflow:hidden;";

  return iframe;
}
