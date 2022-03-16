import { useEffect } from "react";
import { TranscriptItem } from "../typings/Video";
import { useHash } from "react-use";

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== "undefined";

export function useSetPlaybackTimeFromLocationHash(
  transcript: TranscriptItem[],
  setPlaybackTime: (seconds: number, allowSeekAhead: boolean) => void
) {
  const [hash, _] = isBrowser ? useHash() : ["", null];

  useEffect(() => {
    if (hash.length > 1) {
      const activeItemId = hash.substring(1);
      const activeItem = transcript.find((item) => item.id === activeItemId);

      if (activeItem == null) {
        return;
      }

      setPlaybackTime(activeItem.startOffset, true);
    }
  }, [setPlaybackTime, hash]);
}
