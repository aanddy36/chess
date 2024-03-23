import { createSlice } from "@reduxjs/toolkit";
import {
  Duration,
  Increm,
  Modes,
  SettingId,
  SingleMode,
  WReason,
  gameModes,
} from "../types/settingsTypes";
import { Team } from "../types/models";
import { end, start } from "../utils/playSounds";

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
  winner: { team: Team | null; reason: WReason } | null;
  isSurrendering: boolean;
  isOpenWModal: boolean;
}

const initialState: Props = {
  mode: Modes.RAPID,
  timer: {
    [Team.BLACK]: Duration.TEN * 60,
    [Team.WHITE]: Duration.TEN * 60,
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
  isOpenWModal: false,
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
        [Team.BLACK]: temp.duration * 60,
        [Team.WHITE]: temp.duration * 60,
      };
    },
    adjustSize: (state, { payload }) => {
      state.GRID_SIZE = payload;
    },
    startGame: (state) => {
      start();
      state.gameStarted = true;
    },
    changeTurn: (state, { payload }: { payload: Team }) => {
      if (payload !== state.turn) {
        state.timer[state.turn] += state.increment;
        state.turn = payload;
      }
    },
    confirmSurrender: (state, { payload }: { payload: boolean }) => {
      state.isSurrendering = payload;
    },
    endGame: (
      state,
      { payload }: { payload: { team: Team | null; reason: WReason } }
    ) => {
      end();
      state.gameStarted = false;
      state.winner = payload;
      state.isOpenWModal = true;
    },
    updateTimer: (state, { payload }: { payload: Team }) => {
      state.timer[payload] -= 1;
    },
    closeWModal: (state) => {
      state.isOpenWModal = false;
    },
    restore: (state) => {
      state.isOpenWModal = false;
      let temp = {} as SingleMode;
      for (let i of gameModes) {
        for (let j of i.vars) {
          if (j.name === state.selectedSetting) {
            temp = j;
            break;
          }
        }
      }
      state.mode = temp.mode;
      state.increment = temp.Increm;
      state.timer = {
        [Team.BLACK]: temp.duration * 60,
        [Team.WHITE]: temp.duration * 60,
      };
      state.turn = Team.WHITE;
    },
  },
});

export const {
  changeSelectedSetting,
  adjustSize,
  changeTurn,
  startGame,
  confirmSurrender,
  endGame,
  updateTimer,
  closeWModal,
  restore,
} = settingsSlice.actions;
export default settingsSlice.reducer;
