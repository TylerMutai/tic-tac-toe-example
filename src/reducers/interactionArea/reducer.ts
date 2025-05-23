import InteractionAreaState from "@/reducers/interactionArea/state";
import playerTypes from "@/types/playerTypes";
import {InteractionAreaAction} from "@/reducers/interactionArea/action";
import {toTitleCase} from "@/utils/general";

export const interactionAreaInitialState: InteractionAreaState = {
  playedMoves: new Set<string>(),
  cellsPlayed: new Map<string, playerTypes>(),
  // TODO: @param boardSize Enable this to change to increase the board size.
  boardSize: 6,
  hasGameStarted: false,

  // TODO: Randomize starting player (i.e. either computer or player 1)
  // TODO: Allow automated mode: where computer plays automatically.
};

const interactionAreaReducer = (state: InteractionAreaState, action: InteractionAreaAction): InteractionAreaState => {
  switch (action.type) {
    case "start_game":
      // randomize between 'computer' and 'player-1'. 'player-1' will be '1' and 'computer will be '2'
      const start = Math.round((Math.random() * 2));
      return {...state, hasGameStarted: true, currentPlayer: start === 1 ? "player-1" : "player-2"};
    case "show_reset_button":
      return {...state, shouldShowResetButton: true};
    case "hide_reset_button":
      return {...state, shouldShowResetButton: false};
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
        return {...state, shouldShowResetButton: true, playedMoves, cellsPlayed};
      }

      // 4. If no winner was found, and there aren't any other moves, end game.
      if (cellsPlayed.size === (boardSize * boardSize)) {
        // No more moves to play
        alert(`Game over. No player has won. Click on the reset button to start over.`);
        return {...state, shouldShowResetButton: true, playedMoves, cellsPlayed};
      }

      // 3. Play the move.
      const newCurrentPlayer = player === "player-1" ? "player-2" : "player-1";
      return {...state, playedMoves, cellsPlayed, currentPlayer: newCurrentPlayer};
    default:
      return state;
  }
};

/**
 *
 * @returns true if a winner was found, false otherwise.
 */
let alertShowing = false;
export const checkWinner = (boardSize: number, cellsPlayed: Map<string, playerTypes>): boolean => {

  const checkWin = (v1: number, v2: number) => {
    if (v1 < 0 || v1 < 0) {
      return false;
    }
    return v1 === v2;
  };

  const _checkWinner = (board: number[][]) => {
    const columns = board[0].length || 0;
    const rows = board.length || 0;

    // Check columns:
    let win = true;
    let c = 0;
    let r = 1;
    while (c < columns) {
      for (r = 1; r < rows; r++) {
        if (!checkWin(board[r][c], board[r - 1][c])) {
          win = false;
          break;
        }
      }
      if (win) {
        return [r, c];
      }
      win = true;
      c = c + 1;
    }


    r = 0;
    win = true;
    while (r < rows) {
      for (c = 1; c < columns; c++) {
        if (!checkWin(board[r][c], board[r][c - 1])) {
          win = false;
          break;
        }
      }
      if (win) {
        return [r, c];
      }
      win = true;
      r = r + 1;
    }

    r = 0;
    c = 0;
    win = true;
    while (r < rows - 1 || c < columns - 1) {
      if (!checkWin(board[r][c], board[r + 1][c + 1])) {
        win = false;
        break;
      }
      r = r + 1;
      c = c + 1;
    }
    if (win) {
      return [r, c];
    }

    r = 0;
    c = columns - 1;
    win = true;
    while (r < rows - 1 && c >= 0) {
      if (!checkWin(board[r][c], board[r + 1][c - 1])) {
        win = false;
        break;
      }
      r = r + 1;
      c = c - 1;
    }
    if (win) {
      return [r, c];
    }

    return [null, null];

  };


  const board: Array<Array<number | null>> = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = `${i}${j}`;
      board[i] = board[i] ? board[i] : [];
      board[i].push(cellsPlayed.get(cell) ? cellsPlayed.get(cell) === "player-1" ? 1 : 2 : null);
    }
  }

  const winnner = _checkWinner(board);
  if (cellsPlayed.size > Math.ceil(boardSize / 2) + 1) {
    if (winnner[0] === null && winnner[1] === null) {
      alert(`Game over. No one has won! Click on the reset button to start over.`);
      return true;
    }
  }
  let r = winnner[0] || 0;
  let c = winnner[1] || 0;

  while (r >= boardSize) {
    r = r - 1;
  }
  while (c >= boardSize) {
    c = c - 1;
  }

  const rowCheck = cellsPlayed.get(`${r}${c}`) || "-";

  if (rowCheck !== "-") {

    setTimeout(() => {
      if (!alertShowing) {
        alertShowing = true;
        alert(`Game over. ${toTitleCase(rowCheck)} has won! Click on the reset button to start over.`);
      }
      setTimeout(() => {
        alertShowing = false;
      }, 2000);
    }, 100);

    return true;
  }
  /*  let currentWinner: playerTypes | undefined;
   if (doesRowMatch) {
     currentWinner = rowCheck;
   } else if (doesColumnMatch) {
     currentWinner = columnCheck;
   } else if (doesRightDiagonalMatch) {
     currentWinner = rightDiagonalCheck;
   } else if (doesLeftDiagonalMatch) {
     currentWinner = leftDiagonalCheck;
   }

   return false;*/
  return false;
};


export default interactionAreaReducer;