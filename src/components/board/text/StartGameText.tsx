import React from 'react';
import styles from "./css/text.module.scss";

function StartGameText() {
  return (
    <div className={styles.container}>
      <h2>Tic Tac Toe Game</h2>
      <p>A tic tac toe example inspired by
        <a href={"https://codepen.io/freeCodeCamp/full/KzXQgy/"}> FreeCodeCamp. </a>
      </p>
      <button className={styles.button}>
        Start Game
      </button>
    </div>
  );
}

export default StartGameText;