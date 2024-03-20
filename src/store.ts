import { configureStore } from "@reduxjs/toolkit";
import chessboardReducer from "./features/chessboardSlice";
import { Coord, SquareType, Validness } from "./types/models";
import settingsReducer from "./features/settingsSlice";
import { Duration, Increm, Modes, SettingId } from "./types/settingsTypes";

export const store = configureStore({
  reducer: {
    chess: chessboardReducer,
    settings: settingsReducer,
  },
});

export interface RootState {
  chess: {
    board: SquareType[];
    firstSquare: SquareType | null;
    lastSquare: SquareType | null;
    moveStatus: Validness;
    lastMoveIDs: { first: string | null; last: string | null };
    mouseActive: boolean;
    cursorPos: Coord | null;
  };
  settings: {
    mode: Modes;
    duration: Duration;
    increment: Increm;
    selectedSetting: SettingId;
    GRID_SIZE: number;
  };
}
