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
    let doesRowMatch = true;
    let doesColumnMatch = true;
    let doesLeftDiagonalMatch = true;
    let doesRightDiagonalMatch = true;
    let f = boardSize - 1;
    let currentRowCheck = cellsPlayed.get(`${i}${f}`);
    let currentColumnCheck = cellsPlayed.get(`${f}${i}`);
    let rightDiagonalIndex = boardSize;
    f--;
    // check rows & columns.
    while (f >= 0) {
      const rowKey = `${i}${f}`;
      const columnKey = `${f}${i}`;
      const rowCheck = cellsPlayed.get(rowKey)
      const columnCheck = cellsPlayed.get(columnKey)

      // If either one of the cells have not been played, exit loop.
      // This is to prevent 'undefined' === 'undefined' check, which would return true;
      if (!currentRowCheck && !currentColumnCheck) {
        doesRowMatch = false;
        doesColumnMatch = false;
        break;
      }

      if (rowCheck !== currentRowCheck) {
        // The row does not match.
        doesRowMatch = false;
      }
      if (columnCheck !== currentColumnCheck) {
        // The column does not match.
        doesColumnMatch = false;
      }

      currentRowCheck = rowCheck;
      currentColumnCheck = columnCheck;
      f--;
    }

    // check diagonals.
    // 2. Check left diagonal
    // Left diagonal is pretty straight forward. duplicate indices (i.e. 00, 11,22 ...) and you'll get your
    // left diagonal.
    if (i + 1 < boardSize) {
      let currentLeftDiagonalCheck = cellsPlayed.get(`${i}${i}`);
      let nextLeftDiagonalCheck = cellsPlayed.get(`${i + 1}${i + 1}`);
      if (currentLeftDiagonalCheck !== nextLeftDiagonalCheck) {
        doesLeftDiagonalMatch = false;
      }
    }

    // 3. Check right diagonal.
    if (rightDiagonalIndex - 1 >= 0) {
      let currentRightDiagonalCheck = cellsPlayed.get(`${i}${rightDiagonalIndex}`);
      let nextRightDiagonalCheck = cellsPlayed.get(`${i+1}${rightDiagonalIndex - 1}`);
      if (currentRightDiagonalCheck !== nextRightDiagonalCheck) {
        doesRightDiagonalMatch = false;
      }
    }
    rightDiagonalIndex--;

    let currentWinner: playerTypes | undefined;
    if (doesRowMatch) {
      currentWinner = currentRowCheck;
    } else if (doesColumnMatch) {
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