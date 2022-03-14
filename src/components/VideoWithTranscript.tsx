import React from "react";
import { useEffect, useState } from "react";
import { Video } from "../typings/Video";
import TranscriptItemView from "./TranscriptItemView";
import EmbeddedVideo, { useEmbeddedVideoController } from "./EmbeddedVideo";
import smoothScrollTo from "gatsby-plugin-smoothscroll";
import { useHash } from "react-use";

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== "undefined";

type Props = {
  video: Video;
};

export default function VideoWithTranscript({ video }: Props) {
  const { transcript, youtubeSlug } = video;
  const [activeItemId, setActiveItemId] = useState<string | undefined>();
  const { playbackTime, setPlaybackTime, controller } =
    useEmbeddedVideoController();
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

  useEffect(() => {
    const activeItem =
      playbackTime == null
        ? null
        : transcript.find(
            (item) =>
              playbackTime >= item.startOffset && playbackTime < item.endOffset
          );

    setActiveItemId(activeItem?.id);
  }, [playbackTime]);

  useEffect(() => {
    if (activeItemId != null) {
      scrollTo(activeItemId);
    }
  }, [activeItemId]);

  return (
    <div className="w-full max-h-full flex flex-col gap-2 wide:flex-row wide:my-auto">
      <div className="wide:flex-[2] wide:my-auto">
        <EmbeddedVideo youtubeSlug={youtubeSlug} controller={controller} />
      </div>
      <div className="wide:flex-1 wide:h-full flex flex-col gap-2 mx-auto overflow-y-auto dark:scrollbar-thin dark:scrollbar-thumb-rounded dark:scrollbar-thumb-stone-600 dark:scrollbar-track-black">
        {transcript.map((item) => (
          <TranscriptItemView
            item={item}
            isHighlighted={item.id === activeItemId}
          />
        ))}
      </div>
    </div>
  );
}

function scrollTo(hash: string) {
  smoothScrollTo(`#${CSS.escape(hash)}`);
}
