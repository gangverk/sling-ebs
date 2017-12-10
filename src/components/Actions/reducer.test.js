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

it('Should set fetching Auth', () => {
  const initialState = {
    fetchingAuthentication: false,
    errorFetchingAuthentication: 'hello',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.FETCH_AUTENTICATION,
  });
  expect(testState.fetchingAuthentication).toBeTruthy();
  expect(testState.errorFetchingAuthentication).toEqual('');
});

// Skil ekki hvað token say what
// it('Should fetch authentication', () => {
//   const initialState = {
//     fetchingAuthentication: true,
//   };
//   const testState = Reducer(initialState, {
//     type: actionTypes.FETCH_AUTENTICATION_SUCCESS,
//   });
//   expect(testState.fetchingAuthentication).toBeFalsy();
// });

it('Should set errorFetchingAuthentication', () => {
  const initialState = {
    fetchingAuthentication: true,
    errorFetchingAuthentication: '',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.FETCH_AUTENTICATION_FAILURE,
  });
  expect(testState.fetchingAuthentication).toBeFalsy();
  expect(testState.errorFetchingAuthentication).toEqual(
    'Error fetching authentication'
  );
});

it('Should set fetchingusers', () => {
  const initialState = {
    fetchingUsers: false,
    errorFetchingUsers: 'fetchign users',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.FETCH_USERS,
  });
  expect(testState.fetchingUsers).toBeTruthy();
  expect(testState.errorFetchingUsers).toEqual('');
});

it('Should fetch users', () => {
  const initialState = {
    fetchingUsers: true,
  };
  const testState = Reducer(initialState, {
    type: actionTypes.FETCH_USERS_SUCCESS,
  });
  expect(testState.fetchingUsers).toBeFalsy();
});

it('Should set errorFething users', () => {
  const initialState = {
    fetchingUsers: true,
    errorFetchingUsers: '',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.FETCH_USERS_FAILURE,
  });
  expect(testState.fetchingUsers).toBeFalsy();
  expect(testState.errorFetchingUsers).toEqual('Error fetching users');
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

it('should set canceling state', () => {
  const initialState = {
    cancelingShift: false,
    errorCancelingShift: '',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.CANCEL_SHIFT,
  });
  expect(testState.cancelingShift).toBeTruthy();
  expect(testState.errorCancelingShift).toEqual('');
});

it('should cancel shift and set cancelingShift to false', () => {
  const initialState = {
    cancelingShift: true,
  };
  const testState = Reducer(initialState, {
    type: actionTypes.CANCEL_SHIFT_SUCCESS,
  });
  expect(testState.cancelingShift).toBeFalsy();
});

it('should set cancel error', () => {
  const initialState = {
    cancelingShift: true,
    errorCancelingShift: '',
  };
  const testState = Reducer(initialState, {
    type: actionTypes.CANCEL_SHIFT_FAILURE,
  });
  expect(testState.cancelingShift).toBeFalsy();
  expect(testState.errorCancelingShift).toEqual(
    'Failed to cancel the selected shift'
  );
});
