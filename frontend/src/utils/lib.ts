export function secondsToMinsAndSeconds(seconds: number) {
  let mins = 0
  while (true) {
    let tempSeconds = Math.floor(seconds / 60)
    if (tempSeconds <= 0) {
      break
    }
    seconds = tempSeconds
    mins += 1
  }
  return {
    mins,
    seconds,
  }
}

export function formatMinsAndSeconds(mins: number, seconds: number) {
  return `${mins}:${seconds >= 10 ? seconds : `0${seconds}`}`
}
