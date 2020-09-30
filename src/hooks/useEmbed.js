import { useEffect, useMemo, useState } from "react";
import { getScriptNode } from "../utils/getScriptNode";
import { isLink } from "../utils/isLink";

export default function useEmbed(item) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const splittedContent = item.content.split(/(:?\s)(https?:[^\s<]+)/);
    console.log(splittedContent)
    const divForContent = document.createElement("div");
    divForContent.style = {width: "500px", margin: "auto"}

    splittedContent.forEach((part) => {
      if (isLink(part)) {
        const node = getScriptNode(part);
        const script = document.createElement("script");
        script.async = true;
        script.src = "//platform.instagram.com/en_US/embeds.js"

        if(node instanceof Promise) {
          node.then(e => {
            divForContent.innerHTML = e
            divForContent.append(script)
          })
        }
        else {
          divForContent.append(getScriptNode(part));
        }
      } else {
        divForContent.insertAdjacentHTML('beforeend', part);
      }
    });

    setResult(divForContent);
  }, [item]);

  return useMemo(() => result, [result]);
}
