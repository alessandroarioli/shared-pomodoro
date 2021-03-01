import {Time} from "../App";

function isSecondsLessThanZero(time: Time) {
  return (time.seconds - 1) < 0;
}

export const decreaseByOneSecond = (time: Time) : Time => {
  if (time.minutes === 0 && time.seconds === 0) {
    return {
      minutes: 0,
      seconds: 0
    }
  }

  return {
    minutes: (isSecondsLessThanZero(time) ? time.minutes - 1 : time.minutes),
    seconds: (isSecondsLessThanZero(time) ? 59 : time.seconds - 1)
  }
}