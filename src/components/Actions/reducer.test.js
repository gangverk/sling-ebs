import Reducer from './reducer';
import * as actionTypes from './actionTypes';

it('should return default state if no state and action is provided', () => {
  const initalState = Reducer(undefined, {});
  expect(initalState.allShifts).toEqual([]);
  expect(initalState.loadingShifts).toBeFalsy();
  expect(initalState.errorShifts).toEqual('');
});

it('should set loading state', () => {
  const initialState = {
    dataCar: null,
    dataSession: null,
    dataAutentication: null,
    dataUsers: [],
    allShifts: [{ name: 'hreinn' }],
    loadingShifts: false,
    errorShifts: 'hallo',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.FETCH_ALL_SHIFTS,
  });
  expect(testState.loadingShifts).toBeTruthy();
  expect(testState.allShifts).toEqual([]);
  expect(testState.errorShifts).toEqual('');
});
it('should set fetch all shifts', () => {
  const initialState = {
    dataCar: null,
    dataSession: null,
    dataAutentication: null,
    dataUsers: [],
    allShifts: [],
    loadingShifts: true,
    errorShifts: '',
  };
  const action = {
    type: actionTypes.FETCH_ALL_SHIFTS_SUCCESS,
    payload: [{ name: 'shift1' }, { name: 'shift2' }],
  };
  const testState = Reducer(initialState, action);
  expect(testState.allShifts).toBe(action.payload);
  expect(testState.loadingShifts).toBeFalsy();
});

it('should set error state', () => {
  const initialState = {
    dataCar: null,
    dataSession: null,
    dataAutentication: null,
    dataUsers: [],
    allShifts: [],
    loadingShifts: true,
    errorShifts: '',
  };
  const action = {
    type: actionTypes.FETCH_ALL_SHIFTS_FAILURE,
    payload: 'failed to fetch',
  };
  const testState = Reducer(initialState, action);
  expect(testState.allShifts).toEqual([]);
  expect(testState.loadingShifts).toEqual(false);
  expect(testState.errorShifts).toEqual(
    'Failed to fetch shifts for selected date'
  );
});
