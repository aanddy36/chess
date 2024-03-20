import { createSlice } from "@reduxjs/toolkit";
import {
  Duration,
  Increm,
  Modes,
  SettingId,
  SingleMode,
  gameModes,
} from "../types/settingsTypes";

interface Props {
  mode: Modes;
  duration: Duration;
  increment: Increm;
  selectedSetting: SettingId;
  GRID_SIZE: number;
}

const initialState: Props = {
  mode: Modes.RAPID,
  duration: Duration.TEN,
  increment: Increm.NO,
  selectedSetting: SettingId.RA1,
  GRID_SIZE:
    window.innerWidth > 1050
      ? 75
      : window.innerWidth > 570
      ? 64
      : window.innerWidth * 0.10256 + 5.5,
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
      state.duration = temp.duration;
    },
    adjustSize: (state, { payload }) => {
      state.GRID_SIZE = payload;
    },
  },
});

export const { changeSelectedSetting, adjustSize } = settingsSlice.actions;
export default settingsSlice.reducer;
