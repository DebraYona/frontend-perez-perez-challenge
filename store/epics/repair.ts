/* eslint-disable @typescript-eslint/no-unused-vars */
import { from, of } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import api from '../../api';
import type { RootState } from '..';
import {
  getRepairListOfCar,
  RepairActions,
  addRepairList,
  resetFields,
  createRepair,
} from '../slices/repair';
import { repairFormSelector } from '../selectors/repair';

export const getRepairEpic: Epic<RepairActions, ReturnType<typeof addRepairList>, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType(getRepairListOfCar.type),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const car = (action as ReturnType<typeof getRepairListOfCar>).payload;
      return from(api.repair.getForCar(car)).pipe(
        map(({ data }) => {
          console.log(data);
          return addRepairList(data);
        }),
      );
    }),
  );

export const createRepairEpic: Epic<
  RepairActions,
  ReturnType<typeof resetFields> | ReturnType<typeof getRepairListOfCar>,
  RootState
> = (action$, state$) =>
  action$.pipe(
    ofType(createRepair.type),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const car = (action as ReturnType<typeof createRepair>).payload;

      const newRepair = {
        ...repairFormSelector(state),
        car,
      };
      return from(api.repair.create(newRepair)).pipe(
        mergeMap(({ data }) => {
          console.log(data);
          return of(getRepairListOfCar(car), resetFields());
        }),
      );
    }),
  );
export const repairsEpics = [getRepairEpic, createRepairEpic];
