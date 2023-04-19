import playerTypes from "@/types/playerTypes";

interface InteractionAreaState {
  /**
   * Stores the moves already played. This will be used for lookup to see if there's any moves left.
   * Will be a concatenation of 'x' and 'y' axes, which is basically the row and column as represented in a 2D array.
   */
  playedMoves: Set<string>;

  /**
   * Stores the moves already played. This is used to track which move belongs to which player.
   * The key is a concatenation of the 2D array indices. i.e. 00, 01 etc.
   */
  cellsPlayed: Map<string, playerTypes>

  /**
   * Represents the number of cells to draw on screen. i.e a 3X3 matrix or a 4X4 matrix and so on. Default is 3.
   */
  boardSize: number,

  /**
   * Whether or not to render the restart game button (this happens after a game is completed)
   */
  shouldShowResetButton?: boolean;

  currentPlayer?: playerTypes


}

export default InteractionAreaState