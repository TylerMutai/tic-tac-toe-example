import {CurrentPlayerAction} from "@/reducers/currentPlayer/actions";
import {CurrentPlayerState} from "@/reducers/currentPlayer/state";

export const currentPlayerInitialState: CurrentPlayerState = {}
const currentPlayerReducer = (state: CurrentPlayerState, action: CurrentPlayerAction) => {
  switch (action.type) {
    case "set_current_player":
      return {...state, currentPlayer: action.payload}
    default:
      return state;

  }
}

export default currentPlayerReducer;