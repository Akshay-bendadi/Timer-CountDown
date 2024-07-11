import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModel = forwardRef(function ResulModel(
  { targetTime, remainingtime, Reset },
  ref
) {
  const useLost = remainingtime <= 0;
  const formattedRemainingTime = (remainingtime / 1000).toFixed(2);
  const score = Math.round((1 - remainingtime / (targetTime * 1000)) * 100);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {useLost && <h2>You Lost</h2>}
      {!useLost && <h2>You Score is {score}</h2>}
      <p>
        The target Time Was <strong>{targetTime}</strong> Seconds.
      </p>
      <p>
        You Stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={Reset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModel;
