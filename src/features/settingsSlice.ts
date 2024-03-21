import { createSlice } from "@reduxjs/toolkit";
import {
  Duration,
  Increm,
  Modes,
  SettingId,
  SingleMode,
  gameModes,
} from "../types/settingsTypes";
import { Team } from "../types/models";

interface Props {
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
  winner: Team | null;
  isSurrendering: boolean;
}

const initialState: Props = {
  mode: Modes.RAPID,
  timer: {
    [Team.BLACK]: Duration.TEN * 3600,
    [Team.WHITE]: Duration.TEN * 3600,
  },
  increment: Increm.NO,
  selectedSetting: SettingId.RA1,
  GRID_SIZE:
    window.innerWidth > 1050
      ? 75
      : window.innerWidth > 570
      ? 64
      : window.innerWidth * 0.10256 + 5.5,
  gameStarted: false,
  turn: Team.WHITE,
  winner: null,
  isSurrendering: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeSelectedSetting: (state, { payload }) => {
      let temp = {} as SingleMode;
      for (let i of gameModes) {
        for (let j of i.vars) {
          if (j.name === payload) {
            temp = j;
            break;
          }
        }
      }
      state.selectedSetting = payload;
      state.mode = temp.mode;
      state.increment = temp.Increm;
      state.timer = {
        [Team.BLACK]: temp.duration * 3600,
        [Team.WHITE]: temp.duration * 3600,
      };
    },
    adjustSize: (state, { payload }) => {
      state.GRID_SIZE = payload;
    },
    startGame: (state) => {
      state.gameStarted = true;
    },
    changeTurn: (state, { payload }: { payload: Team }) => {
      state.turn = payload;
    },
    confirmSurrender: (state, { payload }: { payload: boolean }) => {
      state.isSurrendering = payload;
    },
  },
});

export const {
  changeSelectedSetting,
  adjustSize,
  changeTurn,
  startGame,
  confirmSurrender,
} = settingsSlice.actions;
export default settingsSlice.reducer;
