import React, {useContext} from 'react';
import styles from "./css/player_turn.module.scss";
import {toTitleCase} from "@/utils/general";
import boardContext from "@/context/boardContext";

function PlayerTurn() {

  const {currentPlayer} = useContext(boardContext)
  return (
    <div className={styles.container}>
      Current Player Is {toTitleCase(currentPlayer || "No Player")}
    </div>
  );
}

export default PlayerTurn;