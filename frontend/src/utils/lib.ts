export function secondsToMinsAndSeconds(input: number) {
  const mins = Math.floor(input / 60);
  const seconds = input % 60;
  return { mins, seconds };
}

export function formatMinsAndSeconds(mins: number, seconds: number) {
  return `${mins}:${seconds >= 10 ? seconds : `0${seconds}`}`;
}
