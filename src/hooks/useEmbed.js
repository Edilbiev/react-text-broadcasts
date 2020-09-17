import { useEffect, useMemo, useState } from "react";
import { getScriptNode } from "../utils/getScriptNode";
import { isLink } from "../utils/isLink";

export default function useEmbed(item) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const splittedContent = item.content.split(/(https:\S+)/);
    const divForContent = document.createElement("div");

    splittedContent.forEach((part) => {
      if (isLink(part)) {
        divForContent.append(getScriptNode(part));
      } else {
        divForContent.append(part);
      }
    });

    setResult(divForContent);
  }, [item]);

  return useMemo(() => result, [result]);
}
