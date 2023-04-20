import playerTypes from "@/types/playerTypes";

export interface InteractionAreaAction {
  type: "start_game" | "play_move" | "show_reset_button" | "hide_reset_button" | "reset_game",
  payload?: { player: playerTypes, move: string }
}


export const playMove = (player: playerTypes, move: string): InteractionAreaAction => {
  return {
    type: "play_move",
    payload: {
      player,
      move
    }
  }
}

export const setShowResetButton = (show: boolean): InteractionAreaAction => {
  return {
    type: show ? "show_reset_button" : "hide_reset_button",
  }
}

export const setResetGame = (): InteractionAreaAction => {
  return {
    type: "reset_game"
  }
}

export const setStartGame = (): InteractionAreaAction => {
  return {
    type: "start_game"
  }
}