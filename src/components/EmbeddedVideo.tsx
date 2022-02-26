import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { YouTubePlayer } from "youtube-player/dist/types";
import useInterval from "../hooks/useInterval";

type Props = {
  setPlayer: (player: YouTubePlayer | null) => void;
  setPlayerState?: (state: PlayerStates) => void;
  setPlaybackTime: (time: number) => void;
  youtubeSlug: string;
  playbackUpdateIntervalMs?: number;
};

export default function EmbeddedVideo({
  youtubeSlug,
  setPlayer,
  setPlayerState,
  setPlaybackTime,
  playbackUpdateIntervalMs = 1000,
}: Props) {
  const [player, setPlayerLocal] = useState<YouTubePlayer | null>(null);

  const onReady = useCallback((event) => {
    setPlayerLocal(event.target);
    setPlayer(event.target);
  }, []);

  const updatePlaybackTime = useCallback(() => {
    if (player != null) {
      setPlaybackTime(player!.getCurrentTime());
    }
  }, [player]);
  useInterval(
    updatePlaybackTime,
    player == null ? null : playbackUpdateIntervalMs
  );

  const onStateChange = useCallback((event) => {
    if (setPlayerState != null) {
      setPlayerState(event.target.getPlayerState());
    }
  }, []);

  return (
    <YouTube
      containerClassName="embed-container"
      videoId={youtubeSlug}
      onReady={onReady}
      onStateChange={onStateChange}
    />
  );
}
