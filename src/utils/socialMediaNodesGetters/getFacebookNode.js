export default function getFacebookNode(url) {
  const encoded = encodeURIComponent(url.split(/(\S+\d)/)[1]);

  const iframe = document.createElement("iframe");
  iframe.src =
    "https://www.facebook.com/plugins/post.php?href=" +
    encoded +
    "&show_text=true&width=552&appId=1260168264328153&height=292";

  iframe.width = "550";
  iframe.height = "300";
  iframe.scrolling = "no";
  iframe.frameBorder = "0";
  iframe.allow = "encrypted-media";
  iframe.setAttribute("allowTransparency", "true");

  return iframe;
}
