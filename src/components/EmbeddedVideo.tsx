import * as React from "react";
import { useCallback } from "react";
import YouTube from "react-youtube";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { YouTubePlayer } from "youtube-player/dist/types";

type Props = {
  setPlayer: (player: YouTubePlayer) => void;
  setPlayerState: (state: PlayerStates) => void;
  youtubeSlug: string;
};

export default function EmbeddedVideo({
  youtubeSlug,
  setPlayer,
  setPlayerState,
}: Props) {
  const onReady = useCallback((event) => {
    setPlayer(event.target);
  }, []);

  const onStateChange = useCallback((event) => {
    setPlayerState(event.target.getPlayerState());
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
