import playerTypes from "@/types/playerTypes";

export interface Board {
  /**
   * Holds the current player's turn. This will be randomized when the game starts.
   */
  currentPlayer?: playerTypes,
  /**
   *
   * @param player
   * The player whose turn it currently is
   */
  setCurrentPlayer?: (player: playerTypes) => void;

}