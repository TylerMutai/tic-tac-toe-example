import InteractionAreaState from "@/reducers/interactionArea/state";
import React from "react";
import {InteractionAreaAction} from "@/reducers/interactionArea/action";

interface BoardState {
  interactionAreaState: InteractionAreaState,
  interactionAreaDispatch: React.Dispatch<InteractionAreaAction>,
  currentWidth: number,
  currentHeight: number
}

export default BoardState;