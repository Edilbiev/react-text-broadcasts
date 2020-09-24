export default function getFacebookNode(url) {
  const encoded = encodeURIComponent(url);
  // "https://www.facebook.com/zuck/posts/10112147940511631"

  //https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fzuck%2Fposts%2F10112147940511631&show_text=true&width=552&appId=1260168264328153&height=294

  // <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fzuck%2Fposts%2F10112147940511631&show_
  // text=true&width=552&appId=1260168264328153&height=294"
  // width="552" height="294" style="border:none;overflow:hidden" scrolling="no"
  // frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>

  const iframe = document.createElement("iframe");
  iframe.src =
    "https://www.facebook.com/plugins/post.php?href=" + encoded + "show_text=true&width=552&appId=1260168264328153&height=292";

  iframe.width = "552";
  iframe.height = "274";
  iframe.scrolling = "no";
  iframe.frameBorder = "0";
  iframe.allow = "encrypted-media";
  iframe.setAttribute("allowTransparency", "true");
  iframe.style = "border:none;overflow:hidden;";

  return iframe;
}
