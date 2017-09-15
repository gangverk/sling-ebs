import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import HomeReducer from '../containers/home/reducer';

export default combineReducers({
  routing: routerReducer,
  HomeReducer,
});
