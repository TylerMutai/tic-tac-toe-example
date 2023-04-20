import InteractionAreaState from "@/reducers/interactionArea/state";
import playerTypes from "@/types/playerTypes";
import {InteractionAreaAction} from "@/reducers/interactionArea/action";
import {toTitleCase} from "@/utils/general";

export const interactionAreaInitialState: InteractionAreaState = {
  playedMoves: new Set<string>(),
  cellsPlayed: new Map<string, playerTypes>(),
  // TODO: @param boardSize Enable this to change to increase the board size.
  boardSize: 3,
  hasGameStarted: false,

  // TODO: Randomize starting player (i.e. either computer or player 1)
  // TODO: Allow automated mode: where computer plays automatically.
}

const interactionAreaReducer = (state: InteractionAreaState, action: InteractionAreaAction): InteractionAreaState => {
  switch (action.type) {
    case "start_game":
      // randomize between 'computer' and 'player-1'. 'player-1' will be '1' and 'computer will be '2'
      const start = Math.round((Math.random() * 2));
      return {...state, hasGameStarted: true, currentPlayer: start === 1 ? "player-1" : "computer"}
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

      // 2. Inject the current move (Play the move)
      playedMoves.add(move);
      cellsPlayed.set(move, player);


      // 3. Check for winner
      if (checkWinner(boardSize, cellsPlayed)) {
        return {...state, shouldShowResetButton: true, playedMoves, cellsPlayed}
      }

      // 4. If no winner was found, and there aren't any other moves, end game.
      if (cellsPlayed.size === (boardSize * boardSize)) {
        // No more moves to play
        alert(`Game over. No player has won. Click on the reset button to start over.`);
        return {...state, shouldShowResetButton: true, playedMoves, cellsPlayed}
      }

      // 3. Play the move.
      const newCurrentPlayer = player === "player-1" ? "computer" : "player-1";
      return {...state, playedMoves, cellsPlayed, currentPlayer: newCurrentPlayer}
    default:
      return state;
  }
}

/**
 *
 * @returns true if a winner was found, false otherwise.
 */
const checkWinner = (boardSize: number, cellsPlayed: Map<string, playerTypes>): boolean => {
  for (let i = 0; i < boardSize; i++) {
    // check if row matches.
    let rowMatches = true;
    let columnMatches = true;
    let f = boardSize - 1;
    let currentRowCheck = cellsPlayed.get(`${i}${f}`);
    let currentColumnCheck = cellsPlayed.get(`${f}${i}`);
    f--;
    // check rows & columns.
    while (f >= 0) {
      const rowKey = `${i}${f}`;
      const columnKey = `${f}${i}`;
      const rowCheck = cellsPlayed.get(rowKey)
      const columnCheck = cellsPlayed.get(columnKey)

      // If either one of the cells have not been played, exit loop.
      // This is so as to prevent 'undefined' === 'undefined' check, which would return true;
      if (!currentRowCheck && !currentColumnCheck) {
        rowMatches = false;
        columnMatches = false;
        break;
      }

      if (rowCheck !== currentRowCheck) {
        // The row does not match. Break out of loop.
        rowMatches = false;
      }
      if (columnCheck !== currentColumnCheck) {
        // The row does not match. Break out of loop.
        columnMatches = false;
      }

      console.log("currentRowCheck", currentRowCheck);
      // console.log("currentColumnCheck", currentColumnCheck);
      console.log("rowCheck", rowCheck);
      console.log("rowCheckComparison", rowMatches);
      console.log("columnCheckComparison", columnCheck);
      // console.log("columnCheck", columnCheck);
      currentRowCheck = rowCheck;
      currentColumnCheck = columnCheck;
      f--;
    }
    // console.log("---------------------");
    // console.log("currentRowCheck", currentRowCheck);
    // console.log("currentColumnCheck", currentColumnCheck);
    console.log("rowMatches", rowMatches);
    console.log("columnMatches", columnMatches);

    let currentWinner: playerTypes | undefined;
    if (rowMatches) {
      currentWinner = currentRowCheck;
    } else if (columnMatches) {
      currentWinner = currentColumnCheck;
    }
    if (currentWinner) {
      alert(`Game over. ${toTitleCase(currentWinner)} has won! Click on the reset button to start over.`);
      return true;
    }
  }
  return false;
}

export default interactionAreaReducer;