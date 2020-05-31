import { combineReducers } from 'redux';
import selectedDevCategryReducer from './devCategoryReducer';
import authReducer from './authReducer';

export default combineReducers({
  selectedDevCategory: selectedDevCategryReducer,
  auth: authReducer,
});
