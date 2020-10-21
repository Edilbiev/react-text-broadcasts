export default function getYouTubeNode(url) {
  const path = document.createElement("a");
  path.href = url;

  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube.com/embed/" + path.pathname.split(/%/)[0];
  iframe.allow = "accelerometer";
  iframe.frameBorder = "0";
  iframe.width = "550";
  iframe.height = "315";

  return iframe;
}
