import React, {useReducer, useRef} from 'react';
import BoardContext from "@/context/boardContext";
import currentPlayerReducer, {currentPlayerInitialState} from "@/reducers/currentPlayer/reducers";
import playerTypes from "@/types/playerTypes";
import {setCurrentPlayer} from "@/reducers/currentPlayer/actions";
import PlayerTurn from "@/components/turns/PlayerTurn";
import styles from "./css/board.module.scss";
import BoardText from "@/components/board/text/BoardText";

function Board() {
  const [state, dispatch] = useReducer(currentPlayerReducer, currentPlayerInitialState)

  const handleSetCurrentPlayer = (player: playerTypes) => {
    dispatch(setCurrentPlayer(player))
  }

  const players = useRef<playerTypes[]>([
    "player-1",
    "computer"
  ]);

  return (
    <BoardContext.Provider value={{
      currentPlayer: state.currentPlayer,
      setCurrentPlayer: handleSetCurrentPlayer
    }}>
      <div className={styles.main_container}>
        <div className={styles.player_turn_container}>
          {players.current.map(p => <PlayerTurn key={p} player={p}/>)}
        </div>
        <div className={styles.container}>
          <div className={styles.inner}>
            <BoardText/>
          </div>
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default Board;