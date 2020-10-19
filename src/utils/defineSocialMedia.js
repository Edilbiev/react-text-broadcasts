export default function defineSocialMedia(url) {
  const path = document.createElement("a");
  path.href = url;

  switch (path.hostname) {
    case "t.me":
      return "telegram";

    case "www.facebook.com":
      return "facebook";

    case "www.instagram.com":
      return "instagram";

    case "youtu.be":
      return "youtube";

    default:
      return undefined;
  }
}
