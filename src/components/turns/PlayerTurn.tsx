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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setShowStyles("");
    setIsAnimating(true);
    setTimeout(() => {
      setShowStyles(styles.show);
      setIsAnimating(false);
    }, 500);
  }, [currentPlayer]);

  useEffect(() => {
    if (interactionAreaState.currentPlayer) {
      setCurrentPlayer(interactionAreaState.currentPlayer);
    }
  }, [interactionAreaState.currentPlayer]);

  return (
    <div className={`${styles.container} ${showStyles}`}>
      Current Player Is {isAnimating ? "Next player turn" : toTitleCase(currentPlayer || "No Player")}
    </div>
  );
}

export default PlayerTurn;