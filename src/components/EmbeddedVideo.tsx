import * as React from "react";
import { useCallback, useState } from "react";
import YouTube from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";
import useInterval from "../hooks/useInterval";

interface Props {
  youtubeSlug: string;
  controller: Controller;
}

interface Controller {
  onReady(event: { target: YouTubePlayer }): void;
}

export default function EmbeddedVideo({ youtubeSlug, controller }: Props) {
  return (
    <YouTube
      containerClassName="embed-container"
      videoId={youtubeSlug}
      onReady={controller.onReady}
    />
  );
}

export function useEmbeddedVideoController(
  playbackUpdateIntervalMs: number = 500
) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [playbackTime, setPlaybackTime] = useState<number | null>(null);

  const onReady = useCallback((event) => {
    setPlayer(event.target);
  }, []);

  const updatePlaybackTime = useCallback(() => {
    if (player != null) {
      setPlaybackTime(player.getCurrentTime());
    }
  }, [player]);

  const seekTo = useCallback(
    (seconds: number, allowSeekAhead: boolean) => {
      if (player != null) {
        player.seekTo(seconds, allowSeekAhead);
      }
    },
    [player]
  );

  useInterval(
    updatePlaybackTime,
    player == null ? null : playbackUpdateIntervalMs
  );

  return {
    playbackTime,
    setPlaybackTime: seekTo,
    controller: {
      onReady,
    },
  };
}
