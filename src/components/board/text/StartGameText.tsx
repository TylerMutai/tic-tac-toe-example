import React, {useContext} from 'react';
import styles from "./css/text.module.scss";
import boardContext from "@/context/boardContext";
import {setStartGame} from "@/reducers/interactionArea/action";

function StartGameText() {
  const {interactionAreaDispatch} = useContext(boardContext);
  return (
    <div className={styles.container}>
      <h2>Tic Tac Toe Game</h2>
      <p>A tic tac toe example inspired by
        <a href={"https://codepen.io/freeCodeCamp/full/KzXQgy/"}> FreeCodeCamp. </a>
      </p>
      <button
        onClick={() => {
          interactionAreaDispatch(setStartGame())
        }}
        className={styles.button}>
        Start Game
      </button>
    </div>
  );
}

export default StartGameText;