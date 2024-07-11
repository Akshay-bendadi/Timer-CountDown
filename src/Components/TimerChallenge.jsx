import { useState, useRef } from "react";
import ResultModel from "./ResultModel";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [TimeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const TimerisActive = TimeRemaining > 0 && TimeRemaining < targetTime * 1000;

  if (TimeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModel
        ref={dialog}
        targetTime={targetTime}
        remainingtime={TimeRemaining}
        Reset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={TimerisActive ? handleStop : handleStart}>
            {TimerisActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={TimerisActive ? "active" : undefined}>
          {TimerisActive ? "Time is Running" : "Timer is Inactive"}
        </p>
      </section>
    </>
  );
}
