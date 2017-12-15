import Reducer from './reducer';
import * as actionTypes from './actionTypes';

it('should return default state if no state and action is provided', () => {
  const initalState = Reducer(undefined, {});
  expect(initalState.count).toBe(0);
  expect(initalState.isIncrementing).toBeFalsy();
  expect(initalState.isDecrementing).toBeFalsy();
});

it('should decrement counter', () => {
  const initalState = {
    count: 1337,
    isIncrementing: false,
    isDecrementing: false,
  };
  const testState = Reducer(initalState, { type: actionTypes.DECREMENT });
  expect(testState.count).toBe(1336);
});

it('should increment counter with payload', () => {
  const initalState = {
    count: 1,
    isIncrementing: false,
    isDecrementing: false,
  };
  const action = { type: actionTypes.INCREMENTBY, payload: { number: 5 } };
  const testState = Reducer(initalState, action);
  expect(testState.count).toBe(6);
});
