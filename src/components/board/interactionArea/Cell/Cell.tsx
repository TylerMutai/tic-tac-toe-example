import React, {useContext} from 'react';
import styles from "./css/cell.module.scss";
import {playMove} from "@/reducers/interactionArea/action";
import boardContext from "@/context/boardContext";

interface Props {
  /**
   * Where to position the cell along the x-axis on the board
   */
  left: number,

  /**
   * Where to position the cell along the y-axis on the board
   */
  top: number,

  /**
   * The width and height of this cell on the board
   */
  size: number;

  /**
   * The move that will be played when this cell is clicked.
   */
  moveToPlay: string;
}

function Cell({size, moveToPlay, left, top}: Props) {
  const {interactionAreaState, interactionAreaDispatch} = useContext(boardContext);
  const currentPlayer = interactionAreaState.currentPlayer ?? "player-1"
  const savedPlayer = interactionAreaState.cellsPlayed.get(moveToPlay)
  const player = savedPlayer ? savedPlayer === "player-1" ? "X" : "O" : "";
  return (
    <div
      style={{
        width: size,
        height: size,
        left: left,
        top: top,
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