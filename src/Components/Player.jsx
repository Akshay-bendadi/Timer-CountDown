import { useState, useRef } from "react";

export default function Player() {

  const PlayerName = useRef();
  const [EnterePlayerName, SetEnteredPlayerName] = useState("");
  
  
  function handleClick() {
    SetEnteredPlayerName(PlayerName.current.value);
  }
  
  
  return (
    <section id="player">
      <h2>Welcome {EnterePlayerName ? EnterePlayerName : "unknown entity"}</h2>
      <p>
        <input ref={PlayerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
