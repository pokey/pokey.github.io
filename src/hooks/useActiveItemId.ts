import { useEffect, useState } from "react";
import { TranscriptItem } from "../typings/Video";

export default function useActiveItemId(
  transcript: TranscriptItem[],
  playbackTime: number | null
) {
  const [activeItemId, setActiveItemId] = useState<string | undefined>();

  useEffect(() => {
    const activeItem =
      playbackTime == null
        ? null
        : transcript.find(
            (item) =>
              playbackTime >= item.graceStartOffset &&
              playbackTime < item.graceEndOffset
          );

    setActiveItemId(activeItem?.id);
  }, [playbackTime]);

  return activeItemId;
}
