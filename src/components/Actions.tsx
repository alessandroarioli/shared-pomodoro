import {Time} from "../App";

type ActionsPropType = {
  session: Time,
  break: Time,
  onSessionTimeChange: (minutes: number) => void,
  onBreakTimeChange: (minutes: number) => void
}


const Actions = (props: ActionsPropType) => {
  function increaseSessionMinutes() {
    props.onSessionTimeChange(props.session.minutes + 1);
  }

  function decreaseSessionMinutes() {
    props.onSessionTimeChange(props.session.minutes - 1);
  }

  function increaseBreakMinutes() {
    props.onBreakTimeChange(props.break.minutes + 1);
  }

  function decreaseBreakMinutes() {
    props.onBreakTimeChange(props.break.minutes - 1);
  }

  return (
        <div className='actions'>
            <div className='set-timer'>
                session length
                <div className='set-display'>
                    <span id='set-timer-display'>{props.session.minutes}</span>
                    min
                </div>
                <div className='minus-add'>
                    <div className='setting-button' onClick={() => decreaseSessionMinutes()}>-</div>
                    <div className='setting-button' onClick={() => increaseSessionMinutes()}>+</div>
                </div>
            </div>
            <div className='set-break'>
                break length
                <div className='set-display'>
                    <span id='set-break-display'>{props.break.minutes}</span>
                    min
                </div>
                <div className='minus-add'>
                    <div className='setting-button' onClick={() => decreaseBreakMinutes()}>-</div>
                    <div className='setting-button' onClick={() => increaseBreakMinutes()}>+</div>
                </div>
            </div>
        </div>
    )
}

export default Actions;