import React, {useContext} from 'react';
import styles from "./css/cell.module.scss";
import {playMove} from "@/reducers/interactionArea/action";
import boardContext from "@/context/boardContext";

interface Props {
  /**
   * Where to position the cell along the x-axis on the board
   */
  right: number,

  /**
   * Where to position the cell along the y-axis on the board
   */
  bottom: number,

  /**
   * The width and height of this cell on the board
   */
  size: number;

  /**
   * The move that will be played when this cell is clicked.
   */
  moveToPlay: string;
}

function Cell({size, moveToPlay, right, bottom}: Props) {
  const {interactionAreaState, interactionAreaDispatch} = useContext(boardContext);
  const currentPlayer = interactionAreaState.currentPlayer ?? "player-1"
  const savedPlayer = interactionAreaState.cellsPlayed.get(moveToPlay)
  const player = savedPlayer ? savedPlayer === "computer" ? "X" : "O" : "";
  return (
    <div
      style={{
        width: size,
        height: size,
        right,
        bottom,
      }}
      onClick={e => {
        e.stopPropagation();
        interactionAreaDispatch(playMove(currentPlayer, moveToPlay))
      }}
      className={styles.container}>
      {player}
    </div>
  );
}

export default Cell;