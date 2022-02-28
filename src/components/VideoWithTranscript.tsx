import * as React from "react";
import { useEffect, useState } from "react";
import smoothscroll from "smoothscroll-polyfill";
import { YouTubePlayer } from "youtube-player/dist/types";
import { Video } from "../typings/Video";
import EmbeddedVideo from "./EmbeddedVideo";
import TranscriptItemView from "./TranscriptItemView";

smoothscroll.polyfill();

type Props = {
  video: Video;
};

export default function VideoWithTranscript({ video }: Props) {
  const { transcript, youtubeSlug } = video;
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [playbackTime, setPlaybackTime] = useState<number | null>(null);

  useEffect(() => {
    if (player != null && location.hash.length > 1) {
      const initialActiveItemId = location.hash.substring(1);
      const initialActiveItem = transcript.find(
        (item) => item.id === initialActiveItemId
      );

      if (initialActiveItem == null) {
        return;
      }

      player.seekTo(initialActiveItem.startOffset, true);
    }
  }, [player]);

  useEffect(() => {
    console.log(`player.getCurrentTime() = ${playbackTime}`);
    const activeItem = transcript.find(
      (item) =>
        playbackTime != null &&
        playbackTime > item.startOffset &&
        playbackTime <= item.endOffset
    );
    if (activeItem != null) {
      scrollTo(activeItem.id);
    }
  }, [playbackTime]);

  return (
    <div className="w-full max-h-full flex flex-col gap-2 lg:gap-4 xl:gap-6 wide:flex-row wide:my-auto">
      <div className="wide:flex-[2] wide:my-auto">
        <EmbeddedVideo
          youtubeSlug={youtubeSlug}
          setPlayer={setPlayer}
          setPlaybackTime={setPlaybackTime}
        />
      </div>
      <div className="scroll-smooth wide:flex-1 wide:h-full flex flex-col gap-2 max-w-prose mx-auto overflow-y-auto p-2 bg-slate-200 rounded-lg">
        {transcript.map((item) => (
          <TranscriptItemView
            item={item}
            isHighlighted={
              playbackTime != null &&
              playbackTime >= item.startOffset &&
              playbackTime <= item.endOffset
            }
          />
        ))}
      </div>
    </div>
  );
}

// From https://stackoverflow.com/a/3163635
function scrollTo(hash: string) {
  location.hash = "#" + hash;
}
