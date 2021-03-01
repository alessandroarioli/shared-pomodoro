import React, {useEffect, useRef, useState} from 'react';
import Timer, {isTimerZero} from "./components/Timer";
import Actions from "./components/Actions";
import {decreaseByOneSecond} from "./logic/decreaseByOneSecond";
import {DEFAULT_BREAK_DURATION, DEFAULT_SESSION_DURATION} from "./defaults";
import {LMWebSocket} from "./logic/websocket/websocket";

export type Time = {
  minutes: number,
  seconds: number
}

type AppProps = {
  websocket: LMWebSocket
}

function App(appProps: AppProps) {
  const [defaultSession, setDefaultSession] = useState<Time>(DEFAULT_SESSION_DURATION)
  const [defaultBreak, setDefaultBreak] = useState<Time>(DEFAULT_BREAK_DURATION)
  const [timer, setTimer] = useState<Time>(defaultSession)
  const [isSessionGoing, setIsSessionGoing] = useState<boolean>(false)
  const [playAlarm, setPlayAlarm] = useState<boolean>(false)

  const onStartClick = () => {
    setIsSessionGoing(!isSessionGoing)

    if (isSessionGoing) {
      setTimer(defaultSession)

      sendTimerStopped();
      setPlayAlarm(false)
    } else {
      sendTimerStarted();
    }
  }

  const onSessionTimeChange = (minutes: number) => {
    const newValue = {
      minutes: minutes,
      seconds: 0
    };
    setDefaultSession(newValue)
    setTimer(newValue)
    appProps.websocket.sendSessionChanged(newValue)
  }

  const onBreakTimeChange = (minutes: number) => {
    const increaseValue = {
      minutes: minutes,
      seconds: 0
    };
    setDefaultBreak(increaseValue)
    // TODO: set break timer
  }

  const listenForWebSocketEvents = () => {
    window.addEventListener("timer.started", () => setIsSessionGoing(true))

    window.addEventListener("timer.stopped", () => {
      setIsSessionGoing(false);
      setTimer(defaultSession);
    })
   }

  useEffect(() => {
    listenForWebSocketEvents();

    if (!isSessionGoing) return;

    const interval = setInterval(() => {
      setTimer(decreaseByOneSecond(timer))
    }, 1000);

    if (isTimerZero(timer)) {
      setPlayAlarm(true)
    } else {
      setPlayAlarm(false)
    }

    return () => clearInterval(interval);
  }, [timer, isSessionGoing]);


  const sendTimerStarted = () => {
    appProps.websocket.sendTimerStarted()
  }

  const sendTimerStopped = () => {
    appProps.websocket.sendTimerStopped()
  }

  const startResetLabel = () => isSessionGoing ? <>RESTART</> : <>START</>;

  const isStartOrReset = () => isSessionGoing ? "reset" : "start";

  return (
    <div className="App">
      <div className='container'>
        <div className='header'>
          <svg id='gradient'>
            <text fillOpacity='1' y='36px'>
              Pomodoro Clock
            </text>
          </svg>
        </div>
        <Timer timer={timer} playAlarm={playAlarm}/>
        <Actions session={defaultSession}
                 break={defaultBreak}
                 onSessionTimeChange={onSessionTimeChange}
                 onBreakTimeChange={onBreakTimeChange} />
      </div>
      <div className={isStartOrReset()} onClick={onStartClick}>{startResetLabel()}</div>
    </div>
  );
}

export default App;
