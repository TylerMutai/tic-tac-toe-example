import InteractionAreaState from "@/reducers/interactionArea/state";
import playerTypes from "@/types/playerTypes";
import {InteractionAreaAction} from "@/reducers/interactionArea/action";
import {toTitleCase} from "@/utils/general";
import PlayerTypes from "@/types/playerTypes";

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
      return {...state, hasGameStarted: true, currentPlayer: start === 1 ? "player-1" : "player-2"}
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
      const newCurrentPlayer = player === "player-1" ? "player-2" : "player-1";
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

  // 1. Check rows
  let doesRowMatch = true;
  let rowCheck: PlayerTypes | undefined
  for (let i = 0; i < boardSize; i++) {
    rowCheck = cellsPlayed.get(`${i}${0}`) || "-";
    for (let j = 1; j < boardSize; j++) {
      if (rowCheck !== cellsPlayed.get(`${i}${j}`)) {
        doesRowMatch = false;
        break;
      }
    }
    if (doesRowMatch) {
      // exit, since we already found a winner.
      break;
    }
  }

  // 2. Check columns
  let doesColumnMatch = true;
  let columnCheck: playerTypes | undefined;
  for (let i = 0; i < boardSize; i++) {
    columnCheck = cellsPlayed.get(`${0}${i}`) || "-";
    for (let j = 1; j < boardSize; j++) {
      if (columnCheck !== cellsPlayed.get(`${j}${i}`)) {
        doesColumnMatch = false;
        break;
      }
    }
    if (doesColumnMatch) {
      // exit, since we already found a winner.
      break;
    }
  }


  // 3. Check left diagonal
  // Duplicate indices (i.e. 00, 11,22 ...) and you'll get your left diagonal.
  let doesLeftDiagonalMatch = true;
  const leftDiagonalCheck = cellsPlayed.get(`${0}${0}`) || "-";
  for (let i = 1; i < boardSize; i++) {
    let nextLeftDiagonalCheck = cellsPlayed.get(`${i}${i}`);
    if (leftDiagonalCheck !== nextLeftDiagonalCheck) {
      doesLeftDiagonalMatch = false;
      break;
    }
  }

  // 3. Check right diagonal.
  let doesRightDiagonalMatch = true;
  const rightDiagonalCheck = cellsPlayed.get(`${0}${boardSize - 1}`) || "-";
  for (let i = 1; i < boardSize; i++) {
    let nextRightDiagonalCheck = cellsPlayed.get(`${i}${boardSize - 1 - i}`);
    if (rightDiagonalCheck !== nextRightDiagonalCheck) {
      doesRightDiagonalMatch = false;
      break;
    }
  }

  let currentWinner: playerTypes | undefined;
  if (doesRowMatch) {
    currentWinner = rowCheck;
  } else if (doesColumnMatch) {
    currentWinner = columnCheck;
  } else if (doesRightDiagonalMatch) {
    currentWinner = rightDiagonalCheck;
  } else if (doesLeftDiagonalMatch) {
    currentWinner = leftDiagonalCheck;
  }
  if (currentWinner) {
    alert(`Game over. ${toTitleCase(currentWinner)} has won! Click on the reset button to start over.`);
    return true;
  }
  return false;
}

export default interactionAreaReducer;