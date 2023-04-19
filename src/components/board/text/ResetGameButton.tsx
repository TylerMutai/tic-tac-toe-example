import React, {useContext} from 'react';
import styles from "./css/text.module.scss";
import boardContext from "@/context/boardContext";
import {setResetGame} from "@/reducers/interactionArea/action";

function StartGameText() {
  const {interactionAreaDispatch} = useContext(boardContext);
  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          interactionAreaDispatch(setResetGame())
        }}
        className={styles.button}>
        Reset Game
      </button>
    </div>
  );
}

export default StartGameText;