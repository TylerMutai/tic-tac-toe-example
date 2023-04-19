import playerTypes from "@/types/playerTypes";

export interface CurrentPlayerAction {
  type: "set_current_player",
  payload: playerTypes
}

export const setCurrentPlayer = (currentPlayer: playerTypes): CurrentPlayerAction => {
  return {
    type: "set_current_player",
    payload: currentPlayer,
  }
}