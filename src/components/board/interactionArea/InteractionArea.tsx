import React, {ReactElement, useContext} from 'react';
import Cell from "@/components/board/interactionArea/Cell/Cell";
import boardContext from "@/context/boardContext";

function InteractionArea() {
  const {interactionAreaState, currentWidth} = useContext(boardContext);
  const boardSize = interactionAreaState.boardSize;

  const cells: ReactElement[] = [];

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const key = `${i}${j}`;
      const cellWidth = currentWidth / boardSize;
      const right = Math.floor(j * cellWidth);
      const bottom =  Math.floor(i * cellWidth);
      cells.push(
        <Cell key={key} left={right}
              top={bottom} moveToPlay={key} size={cellWidth}/>
      )
    }
  }
  return (
    <>
      {cells}
    </>
  );
}

export default InteractionArea;