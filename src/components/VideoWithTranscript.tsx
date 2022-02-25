import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { YouTubePlayer } from "youtube-player/dist/types";
import useInterval from "../hooks/useInterval";
import { Video } from "../typings/Video";
import EmbeddedVideo from "./EmbeddedVideo";
import TranscriptItemView from "./TranscriptItem";

type Props = {
  video: Video;
};

export default function VideoWithTranscript({ video }: Props) {
  const { transcript, youtubeSlug } = video;
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [playerState, setPlayerState] = useState<PlayerStates | null>(null);
  const [playbackTime, setPlaybackTime] = useState<number | null>(null);

  const updatePlaybackTime = useCallback(() => {
    if (player != null) {
      setPlaybackTime(player!.getCurrentTime());
    }
  }, [player]);

  useEffect(updatePlaybackTime, [player]);
  useEffect(updatePlaybackTime, [playerState]);

  useInterval(
    updatePlaybackTime,
    player == null || playerState !== PlayerStates.PLAYING ? null : 1000
  );

  useEffect(() => {
    console.log(`player.getCurrentTime() = ${playbackTime}`);
  }, [playbackTime]);

  return (
    <div className="w-full">
      <EmbeddedVideo
        youtubeSlug={youtubeSlug}
        setPlayer={setPlayer}
        setPlayerState={setPlayerState}
      />
      <div className="grid grid-cols-1 gap-2">
        {transcript.map((item) => (
          <TranscriptItemView item={item} />
        ))}
      </div>
    </div>
  );
}
