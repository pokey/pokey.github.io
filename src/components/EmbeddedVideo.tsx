import * as React from "react";
import { useCallback, useState } from "react";
import { useKey } from "react-use";
import YouTube from "react-youtube";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { YouTubePlayer } from "youtube-player/dist/types";
import useInterval from "../hooks/useInterval";
import { embedContainer } from "./EmbeddedVideo.module.css";

interface Props {
  youtubeSlug: string;
  controller?: Controller;
}

interface Controller {
  onReady(event: { target: YouTubePlayer }): void;
}

export default function EmbeddedVideo({ youtubeSlug, controller }: Props) {
  return (
    <YouTube
      containerClassName={embedContainer}
      videoId={youtubeSlug}
      onReady={controller?.onReady}
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

  const togglePlayback = useCallback(() => {
    console.log(player?.getPlayerState());
    if (player == null) {
      return;
    }

    if (player.getPlayerState() === PlayerStates.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, [player]);

  useKey(" ", () => {
    togglePlayback();
  });

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
    } as Controller,
  };
}
