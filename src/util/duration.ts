export function formatDuration(durationSeconds: number) {
  const roundedSeconds = Math.round(durationSeconds);
  const hours = Math.floor(roundedSeconds / 3600);
  const secondsRemainder = roundedSeconds % 3600;
  const minutes = Math.floor(secondsRemainder / 60);
  const seconds = secondsRemainder % 60;
  const secondsString = seconds.toString().padStart(2, "0");

  if (hours === 0) {
    return `${minutes}:${secondsString}`;
  } else {
    const minutesString = minutes.toString().padStart(2, "0");

    return `${hours}:${minutesString}:${secondsString}`;
  }
}
