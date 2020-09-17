import getInstagramNode from "./socialMediaNodesGetters/getInstagramNode";
import getYoutubeNode from "./socialMediaNodesGetters/getYoutubeNode";
import getTelegramNode from "./socialMediaNodesGetters/getTelegramNode";
import getFacebookNode from "./socialMediaNodesGetters/getFacebookNode";
import defineSocialMedia from "./defineSocialMedia";

export const getScriptNode = (url) => {
  switch (defineSocialMedia(url)) {
    case "telegram":
      return getTelegramNode(url);

    case "facebook":
      return getFacebookNode(url);

    case "instagram":
      return getInstagramNode(url);

    case "youtube":
      return getYoutubeNode(url);

    default:
      return url;
  }
};
