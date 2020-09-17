// <iframe width="560" height="315" src="https://www.youtube.com/embed/yrcrBKq5iUM" frameBorder="0"
//         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

export default function getYouTubeNode(url) {
  const path = document.createElement("a");
  path.href = url;

  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube.com/embed/" + path.pathname;
  iframe.allow = "accelerometer";
  iframe.frameBorder = "0";
  iframe.width = "560";
  iframe.height = "315";

  return iframe;
}
