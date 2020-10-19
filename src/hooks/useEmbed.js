import { useEffect, useMemo, useState } from "react";
import { getScriptNode } from "../utils/getScriptNode";
import { isLink } from "../utils/isLink";

export default function useEmbed(item) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    // const splittedContent = item.content.split(/(:?\s)(https?:[^\s<]+)/);
    const splittedContent = item.content.split(/(https:\S+)/)
    const divForContent = document.createElement("div");

    splittedContent.forEach((part) => {
      if (isLink(part)) {
        const node = getScriptNode(part);
        const script = document.createElement("script");
        script.async = true;
        script.src = "//www.instagram.com/embed.js";

        if (node instanceof Promise) {
          node.then((e) => {
            divForContent.innerHTML = e;
            divForContent.append(script);
          });
        } else {
          divForContent.append(getScriptNode(part));
        }
      } else {
        divForContent.insertAdjacentHTML("beforeend", part);
      }
    });

    setResult(divForContent);

    return () => {
      divForContent.remove();
    };
  }, [item]);

  return result;
}
