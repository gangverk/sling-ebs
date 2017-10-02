import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import HomeReducer from '../containers/home/reducer';
import UserReducer from '../components/Login/reducer';

export default combineReducers({
  routing: routerReducer,
  HomeReducer,
  UserReducer,
});
