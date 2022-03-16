import React from "react";
import useActiveItemId from "../hooks/useActiveItemId";
import { useScrollToActiveItem } from "../hooks/useScrollToActiveItem";
import { useSetPlaybackTimeFromLocationHash } from "../hooks/useSetPlaybackTimeFromLocationHash";
import { Video } from "../typings/Video";
import EmbeddedVideo, { useEmbeddedVideoController } from "./EmbeddedVideo";
import TranscriptItemView from "./TranscriptItemView";

type Props = {
  video: Video;
};

export default function VideoWithTranscript({ video }: Props) {
  const { transcript, youtubeSlug } = video;
  const { playbackTime, setPlaybackTime, controller } =
    useEmbeddedVideoController();
  const activeItemId = useActiveItemId(transcript, playbackTime);
  useSetPlaybackTimeFromLocationHash(transcript, setPlaybackTime);
  useScrollToActiveItem(activeItemId);

  return (
    <div className="w-full max-h-full flex flex-col gap-2 wide:flex-row wide:my-auto">
      <div className="wide:flex-[2] ">
        <EmbeddedVideo youtubeSlug={youtubeSlug} controller={controller} />
      </div>
      <div className="wide:flex-1 wide:h-full flex flex-col gap-2 mx-auto overflow-y-auto ">
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
