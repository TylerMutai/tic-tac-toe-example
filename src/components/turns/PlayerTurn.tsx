import React, {useContext} from 'react';
import styles from "./css/player_turn.module.scss";
import {toTitleCase} from "@/utils/general";
import boardContext from "@/context/boardContext";
import playerTypes from "@/types/playerTypes";

interface Props {
  player: playerTypes
}

function PlayerTurn({player}: Props) {
  const {interactionAreaState} = useContext(boardContext);
  const currentPlayer = interactionAreaState.currentPlayer;
  const isCurrentPlayer = currentPlayer === player;
  return (
    <div className={`${styles.container} ${isCurrentPlayer ? styles.show : ""}`}>
      Current Player Is {toTitleCase(currentPlayer || "No Player")}
    </div>
  );
}

export default PlayerTurn;