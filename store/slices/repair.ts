/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUnixTime } from 'date-fns';
import type { Repair } from '../../interfaces';
import type { RepairState } from '../../interfaces/store';

const initialState: RepairState = {
  car: '',
  cost: 0,
  date: getUnixTime(new Date()),
  type: '',
  repairList: [],
};

const repairSlice = createSlice({
  name: 'repair',
  initialState,
  reducers: {
    changeCar: (state, action: PayloadAction<string>) => {
      state.car = action.payload;
    },
    changeCost: (state, action: PayloadAction<number>) => {
      state.cost = action.payload;
    },
    changeDate: (state, action: PayloadAction<number>) => {
      state.date = action.payload;
    },
    changeType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    getRepairList: () => {},
    getRepairListOfCar: (state, action: PayloadAction<string>) => {},
    addRepairList: (state, action: PayloadAction<Repair[]>) => {
      state.repairList = action.payload;
    },
    createRepair: (state, action: PayloadAction<string>) => {},
    resetFields: (state) => {
      state.car = '';
      state.cost = 0;
      state.date = getUnixTime(Date.now());
      state.type = '';
    },
  },
});

export const {
  changeCar,
  changeCost,
  changeDate,
  changeType,
  getRepairListOfCar,
  getRepairList,
  createRepair,
  addRepairList,
  resetFields,
} = repairSlice.actions;

export default repairSlice.reducer;

type Keys = keyof typeof repairSlice.actions;

export type RepairActions = ReturnType<typeof repairSlice.actions[Keys]>;
