import { useEffect } from "react";
import { TranscriptItem } from "../typings/Video";
import { useHash } from "react-use";
import { isBrowser } from "../components/VideoWithTranscript";

export function useSetPlaybackTimeFromLocationHash(
  transcript: TranscriptItem[],
  setPlaybackTime: (seconds: number, allowSeekAhead: boolean) => void
) {
  const [hash, _] = isBrowser ? useHash() : ["", null];

  useEffect(() => {
    if (hash.length > 1) {
      const initialActiveItemId = hash.substring(1);
      const initialActiveItem = transcript.find(
        (item) => item.id === initialActiveItemId
      );

      if (initialActiveItem == null) {
        return;
      }

      setPlaybackTime(initialActiveItem.startOffset, true);
    }
  }, [setPlaybackTime, hash]);
}
