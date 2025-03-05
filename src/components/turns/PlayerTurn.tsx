import React, {useContext, useEffect, useState} from 'react';
import styles from "./css/player_turn.module.scss";
import {toTitleCase} from "@/utils/general";
import boardContext from "@/context/boardContext";
import playerTypes from "@/types/playerTypes";

interface Props {
  player: playerTypes;
}

function PlayerTurn({player}: Props) {
  const {interactionAreaState} = useContext(boardContext);
  const [showStyles, setShowStyles] = useState(styles.show);
  const [currentPlayer, setCurrentPlayer] = useState(interactionAreaState.currentPlayer);

  useEffect(() => {
    if (interactionAreaState.currentPlayer) {
      setShowStyles("");
      setTimeout(() => {
        setShowStyles(styles.show);
        setCurrentPlayer(interactionAreaState.currentPlayer);
      }, 200);
    }
  }, [currentPlayer, interactionAreaState.currentPlayer]);

  return (
    <div className={`${styles.container} ${showStyles}`}>
      Current Player Is {toTitleCase(currentPlayer || "No Player")}
    </div>
  );
}

export default PlayerTurn;