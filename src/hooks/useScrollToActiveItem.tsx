import { useEffect } from "react";
import smoothScrollTo from "gatsby-plugin-smoothscroll";

export function useScrollToActiveItem(activeItemId: string | undefined) {
  useEffect(() => {
    if (activeItemId != null) {
      scrollTo(activeItemId);
    }
  }, [activeItemId]);
}
function scrollTo(hash: string) {
  smoothScrollTo(`#${CSS.escape(hash)}`);
}
