import React, {useEffect, useReducer, useRef, useState} from 'react';
import BoardContext from "@/context/boardContext";
import playerTypes from "@/types/playerTypes";
import PlayerTurn from "@/components/turns/PlayerTurn";
import styles from "./css/board.module.scss";
import StartGameText from "@/components/board/text/StartGameText";
import interactionAreaReducer, {interactionAreaInitialState} from "@/reducers/interactionArea/reducer";
import ResetGameButton from "@/components/board/text/ResetGameButton";
import InteractionArea from "@/components/board/interactionArea/InteractionArea";

function Board() {
  const [state, dispatch] = useReducer(interactionAreaReducer, interactionAreaInitialState);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const ref = useRef<HTMLDivElement>(null);

  const players = useRef<playerTypes[]>([
    "player-1",
    "computer",
  ]);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      setWidth(element.clientWidth);
      setHeight(element.clientHeight);
    }
  }, []);

  return (
    <BoardContext.Provider value={{
      interactionAreaState: state,
      interactionAreaDispatch: dispatch,
      currentWidth: width,
      currentHeight: height,
    }}>
      <div className={styles.main_container}>
        <div className={styles.player_turn_container}>
          {players.current.map(p => <PlayerTurn key={p} player={p}/>)}
        </div>
        <div
          ref={ref}
          className={styles.container}>
          <div className={styles.inner}>
            <InteractionArea/>
            {state.hasGameStarted ? null : <StartGameText/>}
            {state.shouldShowResetButton ? <ResetGameButton/> : null}
          </div>
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default Board;