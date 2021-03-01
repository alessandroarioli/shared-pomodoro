import {Time} from "../App";
import {useEffect} from "react";

type TimerProps = {
  timer: Time,
  playAlarm: boolean
}

const Timer = (props: TimerProps) => {
  const normalize = (time: number) => {
    return time.toString().padStart(2, "0")
  }

  const playAlarmIfTrue = () => {
    if (! props.playAlarm) return;

    let alarm = new Audio('/alarm-sounds/cow.mp3');
    alarm.play()
  }

  useEffect(() => {
    playAlarmIfTrue();
  }, [props.playAlarm])

  return (
        <>
            <div className='timer'>
                <div className='spinner-container'>
                    <div className='spinner-mask'></div>
                    <svg className='spinner' height='240px' viewBox='0 0 66 66' width='240px'
                         xmlns='http://www.w3.org/2000/svg'>
                        <circle className='path' cx='33' cy='33' fill='none' id='spineroo' r='30' stroke-cap='round'
                                strokeWidth='.5'></circle>
                    </svg>
                </div>
                <div className='outer-circle'></div>
                <div className='inner-circle'></div>
                <div className='timer-display'>
                    <svg id='gradient'>
                        <defs>
                            <linearGradient id='linearGradient' x1='0%' x2='100%' y1='0%' y2='100%'>
                                <stop offset='0%' stopColor='#B8D087'></stop>
                                <stop offset='100%' stopColor='#00996D'></stop>
                            </linearGradient>
                        </defs>
                        <text fillOpacity='1' id='timer-display-time' y='36px'>
                          {normalize(props.timer.minutes)}:{normalize(props.timer.seconds)}
                        </text>
                    </svg>
                </div>
            </div>
            <div id='status'></div>
        </>
    )

};

export const isTimerZero = (timer: Time) => timer.minutes === 0 && timer.seconds === 0;

export default Timer;
