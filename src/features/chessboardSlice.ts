import { createSlice } from "@reduxjs/toolkit";
import { Square } from "../classes/Square";
import {
  Coord,
  IsValidType,
  MoveType,
  PiecesType,
  SquareColor,
  Validness,
  newCols,
  newRows,
} from "../models";
import { uptDangerZones } from "../utils/uptDangerZones";
import { initalPieces } from "../initialPieces";
import { movePiece } from "../utils/movePiece";
import { arraySounds } from "../utils/playSounds";

interface Props {
  board: Square[];
  firstSquare: Square | null;
  lastSquare: Square | null;
  moveStatus: Validness;
  lastMoveIDs: { first: string | null; last: string | null };
  mouseActive: boolean;
  cursorPos: Coord | null;
}

const initialState: Props = {
  board: [],
  firstSquare: null,
  lastSquare: null,
  moveStatus: {
    isValid: IsValidType.NULL,
  },
  lastMoveIDs: { first: null, last: null },
  mouseActive: false,
  cursorPos: null,
};

const chessboardSlice = createSlice({
  name: "chessboard",
  initialState,
  reducers: {
    createBoard: (state) => {
      let gridY = 0;
      for (let i = newCols.length - 1; i >= 0; i--) {
        let gridX = 0;
        for (let j = 0; j < newRows.length; j++) {
          const color =
            (i % 2 === 0 ? j : j + 1) % 2 === 0
              ? SquareColor.GREEN
              : SquareColor.WHITE;

          const piece = initalPieces.find(
            (pie) => pie.pos.x === gridX && pie.pos.y === gridY
          );
          state.board.push(
            new Square(
              { x: newRows[j], y: i + 1 },
              color,
              { x: gridX, y: gridY },
              piece?.piece
            )
          );
          gridX += 1;
        }
        gridY += 1;
      }
      state.board = uptDangerZones([...state.board]);
    },
    validateMove: (state, { payload }: { payload: Validness }) => {
      const { firstSquare, lastSquare, board } = state;
      if (payload.isValid === IsValidType.YES) {
        console.log({...payload});
        
        let { uptBoard } = payload;
        if (!uptBoard) {
          const { changeProp, changeTeam, capturedInPassant, pieceToPromote } =
            payload;
          let temp = [...board];
          let newBoard = movePiece(
            firstSquare as Square,
            lastSquare as Square,
            temp,
            {
              prop: changeProp,
              changeTeam,
              capturedInPassant,
              pieceToPromote,
            }
          );
          uptBoard = uptDangerZones(newBoard);
        }
        state.board = uptBoard;
        state.lastMoveIDs = {
          first: (firstSquare as Square).squareId,
          last: (lastSquare as Square).squareId,
        };
        payload.moveType !== undefined && arraySounds[payload.moveType]();
      }
      if (
        payload.isValid === IsValidType.YES ||
        payload.isValid === IsValidType.NO
      ) {
        state.firstSquare = null;
        state.lastSquare = null;
      }
      state.moveStatus = payload;
    },
    assignFirstSq: (state, { payload }: { payload: Square | null }) => {
      state.firstSquare = payload;
    },
    assignLastSq: (state, { payload }: { payload: Square | null }) => {
      state.lastSquare = payload;
    },
    selectPromPiece: (state, { payload }: { payload: PiecesType }) => {
      if (payload === PiecesType.CANCEL) {
        state.moveStatus = { isValid: IsValidType.NO };
      } else {
        state.moveStatus = {
          isValid: IsValidType.YES,
          moveType: MoveType.PROMOTE,
          pieceToPromote: payload as PiecesType,
        };
      }
    },
    activeMouse: (state, { payload }: { payload: boolean }) => {
      state.mouseActive = payload;
    },
    changeCursorPos: (state, { payload }: { payload: Coord | null }) => {
      state.cursorPos = payload;
    },
  },
});

export const {
  assignFirstSq,
  assignLastSq,
  validateMove,
  createBoard,
  selectPromPiece,
  activeMouse,
  changeCursorPos,
} = chessboardSlice.actions;
export default chessboardSlice.reducer;
