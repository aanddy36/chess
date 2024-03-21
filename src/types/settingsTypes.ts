export enum Modes {
  BLITZ,
  BULLET,
  RAPID,
}
export enum Duration {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FIVE = 5,
  TEN = 10,
  FIFTEEN = 15,
  THIRTY = 30,
}

export enum Increm {
  ONE = 1,
  TWO = 2,
  TEN = 10,
  NO = "",
}

export enum SettingId {
  BU1 = "1 min",
  BU2 = "1 | 1",
  BU3 = "2 | 1",
  BL1 = "3 min",
  BL2 = "3 | 2",
  BL3 = "5 min",
  RA1 = "10 min",
  RA2 = "15 | 10",
  RA3 = "30 min",
}

export interface SingleMode {
  name: SettingId;
  mode: Modes;
  duration: Duration;
  Increm: Increm;
}

export interface GameModes {
  name: string;
  vars: SingleMode[];
}

export const gameModes: GameModes[] = [
  {
    name: "Bullet",
    vars: [
      {
        name: SettingId.BU1,
        mode: Modes.BULLET,
        duration: Duration.ONE,
        Increm: Increm.NO,
      },
      {
        name: SettingId.BU2,
        mode: Modes.BULLET,
        duration: Duration.ONE,
        Increm: Increm.ONE,
      },
      {
        name: SettingId.BU3,
        mode: Modes.BULLET,
        duration: Duration.TWO,
        Increm: Increm.ONE,
      },
    ],
  },
  {
    name: "Blitz",
    vars: [
      {
        name: SettingId.BL1,
        mode: Modes.BLITZ,
        duration: Duration.THREE,
        Increm: Increm.NO,
      },
      {
        name: SettingId.BL2,
        mode: Modes.BLITZ,
        duration: Duration.THREE,
        Increm: Increm.TWO,
      },
      {
        name: SettingId.BL3,
        mode: Modes.BLITZ,
        duration: Duration.FIVE,
        Increm: Increm.NO,
      },
    ],
  },
  {
    name: "Rapid",
    vars: [
      {
        name: SettingId.RA1,
        mode: Modes.RAPID,
        duration: Duration.TEN,
        Increm: Increm.NO,
      },
      {
        name: SettingId.RA2,
        mode: Modes.RAPID,
        duration: Duration.FIFTEEN,
        Increm: Increm.TEN,
      },
      {
        name: SettingId.RA3,
        mode: Modes.RAPID,
        duration: Duration.THIRTY,
        Increm: Increm.NO,
      },
    ],
  },
];

export enum WReason {
  TIME = "time",
  ABANDONMENT = "abandonment",
  CHECK_MATE = "check mate",
}
