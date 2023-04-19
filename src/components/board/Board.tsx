import React, {useReducer} from 'react';
import BoardContext from "@/context/boardContext";
import currentPlayerReducer, {currentPlayerInitialState} from "@/reducers/currentPlayer/reducers";
import playerTypes from "@/types/players";
import {setCurrentPlayer} from "@/reducers/currentPlayer/actions";
import PlayerTurn from "@/components/turns/PlayerTurn";

function Board() {
  const [state, dispatch] = useReducer(currentPlayerReducer, currentPlayerInitialState)

  const handleSetCurrentPlayer = (player: playerTypes) => {
    dispatch(setCurrentPlayer(player))
  }

  return (
    <BoardContext.Provider value={{
      currentPlayer: state.currentPlayer,
      setCurrentPlayer: handleSetCurrentPlayer
    }}>
      <PlayerTurn/>
      <button onClick={() => handleSetCurrentPlayer(state.currentPlayer === "player-1" ?
        "player-2" : "player-1")}>
        This be a button
      </button>
    </BoardContext.Provider>
  );
}

export default Board;