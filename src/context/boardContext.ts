import {createContext} from "react";
import BoardState from "@/types/boardState";
import {interactionAreaInitialState} from "@/reducers/interactionArea/reducer";

const BoardContext = createContext<BoardState>({
  interactionAreaState: interactionAreaInitialState,
  interactionAreaDispatch: () => {
  },
  currentWidth: 500,
  currentHeight: 500
})
export default BoardContext;