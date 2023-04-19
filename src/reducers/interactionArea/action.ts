import playerTypes from "@/types/playerTypes";

export interface InteractionAreaAction {
  type: "play_move" | "show_reset_button" | "hide_reset_button" | "reset_game",
  payload: { player: playerTypes, move: string }
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