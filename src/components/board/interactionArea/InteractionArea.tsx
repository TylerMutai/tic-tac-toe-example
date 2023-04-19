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
      cells.push(
        <Cell key={key} right={j * currentWidth}
              bottom={i * currentWidth} moveToPlay={key} size={currentWidth / boardSize}/>
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