import { configureStore } from "@reduxjs/toolkit";
import chessboardReducer from "./features/chessboardSlice";
import { Coord, SquareType, Team, Validness } from "./types/models";
import settingsReducer from "./features/settingsSlice";
import { Increm, Modes, SettingId, WReason } from "./types/settingsTypes";

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
    timer: {
      [Team.BLACK]: number;
      [Team.WHITE]: number;
    };
    increment: Increm;
    selectedSetting: SettingId;
    GRID_SIZE: number;
    gameStarted: boolean;
    turn: Team;
    winner: { team: Team; reason: WReason } | null;
    isSurrendering: boolean;
    isOpenWModal: boolean;
  };
}
