import { configureStore } from "@reduxjs/toolkit";
import chessboardReducer from "./features/chessboardSlice";
import { Square } from "./classes/Square";
import { Coord, Validness } from "./models";

export const store = configureStore({
  reducer: {
    chess: chessboardReducer,
  },
});

export interface RootState {
  chess: {
    board: Square[];
    firstSquare: Square | null;
    lastSquare: Square | null;
    moveStatus: Validness;
    lastMoveIDs: { first: string | null; last: string | null };
    mouseActive: boolean;
    cursorPos: Coord | null;
  };
}
