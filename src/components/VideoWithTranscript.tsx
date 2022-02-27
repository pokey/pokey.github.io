import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { YouTubePlayer } from "youtube-player/dist/types";
import useInterval from "../hooks/useInterval";
import { Video } from "../typings/Video";
import EmbeddedVideo from "./EmbeddedVideo";
import TranscriptItemView from "./TranscriptItemView";

type Props = {
  video: Video;
};

export default function VideoWithTranscript({ video }: Props) {
  const { transcript, youtubeSlug } = video;
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [playbackTime, setPlaybackTime] = useState<number | null>(null);

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
    <div className="max-h-screen w-full flex flex-col gap-2 md:flex-row lg:flex-col">
      <div className="md:flex-[2] lg:flex-1">
        <EmbeddedVideo
          youtubeSlug={youtubeSlug}
          setPlayer={setPlayer}
          setPlaybackTime={setPlaybackTime}
        />
      </div>
      <div className="md:flex-1 grid grid-cols-1 text-xl gap-5 max-w-prose overflow-y-scroll">
        {transcript.concat(...transcript).map((item) => (
          <TranscriptItemView
            item={item}
            isHighlighted={
              playbackTime != null &&
              playbackTime > item.startOffset &&
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
