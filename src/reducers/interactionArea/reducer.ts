import InteractionAreaState from "@/reducers/interactionArea/state";
import playerTypes from "@/types/playerTypes";
import {InteractionAreaAction} from "@/reducers/interactionArea/action";
import {toTitleCase} from "@/utils/general";

export const interactionAreaInitialState: InteractionAreaState = {
  playedMoves: new Set<string>(),
  cellsPlayed: new Map<string, playerTypes>(),
  // TODO: @param boardSize Enable this to change to increase the board size.
  boardSize: 3
  // TODO: Randomize starting player (i.e. either computer or player 1)

  // TODO: Allow automated mode: where computer plays automatically.
}

const interactionAreaReducer = (state: InteractionAreaState, action: InteractionAreaAction): InteractionAreaState => {
  switch (action.type) {
    case "show_reset_button":
      return {...state, shouldShowResetButton: true}
    case "hide_reset_button":
      return {...state, shouldShowResetButton: false}
    case "reset_game":
      return interactionAreaInitialState;
    case "play_move":
      // check if the move being played is possible
      const player = action.payload?.player || "player-1"; // Can never be undefined
      const move = action.payload?.move || ""; // Can never be undefined
      const playedMoves = new Set(state.playedMoves);
      const cellsPlayed = new Map(state.cellsPlayed);
      const boardSize = state.boardSize;
      // TODO: Instead of using alerts, use state to render a better looking alert.

      // 1. Check if this move is available. If not, throw error.
      if (playedMoves.has(`${move[0]}${move[1]}`)) {
        alert("This move is not available");
        return {...state};
      }

      // 2. Check if this move is the last move. If so, check to see who won.
      if ((playedMoves.size + 1) === (state.boardSize * state.boardSize)) {
        // set values accordingly for this last move.
        playedMoves.add(move);
        cellsPlayed.set(move, player)

        // Game is over. Check if anyone won and reset state
        // Loop through board and check for matches.

        // 1. Check if any line of columns/rows match.
        for (let i = 0; i < boardSize; i++) {
          // check if row matches.
          let rowMatches = true;
          let columnMatches = true;
          let currentRowCheck = `${i}${boardSize - 1}`;
          let currentColumnCheck = `${boardSize - 1}${i}`;
          let f = boardSize - 2;

          // check rows.
          while (f >= 0) {
            const rowCheck = `${i}${f}`
            const columnCheck = `${f}${i}`
            if (rowCheck !== currentRowCheck) {
              // The row does not match. Break out of loop.
              rowMatches = false;
            }
            if (columnCheck !== currentColumnCheck) {
              // The row does not match. Break out of loop.
              columnMatches = false;
            }
            currentRowCheck = rowCheck;
            currentColumnCheck = columnCheck;
            f--;
          }

          let currentWinner: playerTypes | undefined;
          if (rowMatches) {
            currentWinner = cellsPlayed.get(currentRowCheck);
          } else if (columnMatches) {
            currentWinner = cellsPlayed.get(currentColumnCheck);
          }
          if (currentWinner) {
            alert(`Game over. ${toTitleCase(currentWinner)} has won! Click on the reset button to start over.`);
            return {...state, shouldShowResetButton: true, playedMoves, cellsPlayed}
          }
        }
      }

      // 3. Play the move since it's available and game is not over.
      playedMoves.add(move);
      cellsPlayed.set(move, player);
      const newCurrentPlayer = player === "player-1" ? "computer" : "player-1";
      return {...state, playedMoves, cellsPlayed, currentPlayer: newCurrentPlayer}
    default:
      return state;
  }
}

export default interactionAreaReducer;