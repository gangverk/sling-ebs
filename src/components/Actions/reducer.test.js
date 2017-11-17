import Reducer from './reducer';
import * as actionTypes from './actionTypes';

it('should return default state if no state and action is provided', () => {
  const initalState = Reducer(undefined, {});
  expect(initalState.allShifts).toEqual([]);
  expect(initalState.loadingShifts).toBeFalsy();
  expect(initalState.errorLoadingShifts).toEqual('');
  expect(initalState.postingShift).toBeFalsy();
  expect(initalState.errorPostingShift).toEqual('');
});

it('should set loading state when fetch all shifts i called', () => {
  const initialState = {
    dataSession: null,
    dataAutentication: null,
    dataUsers: [],
    allShifts: [{ name: 'hreinn' }],
    loadingShifts: false,
    errorLoadingShifts: 'hallo',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.FETCH_ALL_SHIFTS,
  });
  expect(testState.loadingShifts).toBeTruthy();
  expect(testState.allShifts).toEqual([]);
  expect(testState.errorLoadingShifts).toEqual('');
});

it('should set fetch all shifts', () => {
  const initialState = {
    dataSession: null,
    dataAutentication: null,
    dataUsers: [],
    allShifts: [],
    loadingShifts: true,
    errorLoadingShifts: '',
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
    dataSession: null,
    dataAutentication: null,
    dataUsers: [],
    allShifts: [],
    loadingShifts: true,
    errorLoadingShifts: '',
  };
  const action = {
    type: actionTypes.FETCH_ALL_SHIFTS_FAILURE,
    payload: 'failed to fetch',
  };
  const testState = Reducer(initialState, action);
  expect(testState.allShifts).toEqual([]);
  expect(testState.loadingShifts).toEqual(false);
  expect(testState.errorLoadingShifts).toEqual(
    'Failed to fetch shifts for selected date'
  );
});

it('should set posting state', () => {
  const initialState = {
    postingShift: false,
    errorPostingShift: '',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.POST_SHIFT,
  });
  expect(testState.postingShift).toBeTruthy();
  expect(testState.errorPostingShift).toEqual('');
});

it('should post shift and set postingShift false', () => {
  const initialState = {
    postingShift: true,
  };
  const testState = Reducer(initialState, {
    type: actionTypes.POST_SHIFT_SUCCESS,
  });
  expect(testState.postingShift).toBeFalsy();
});

it('should set posting error', () => {
  const initialState = {
    postingShift: true,
    errorPostingShift: '',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.POST_SHIFT_FAILURE,
  });
  expect(testState.postingShift).toBeFalsy();
  expect(testState.errorPostingShift).toEqual(
    'Failed to post shift for selected time'
  );
});
