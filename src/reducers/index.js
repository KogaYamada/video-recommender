import { combineReducers } from 'redux';
import { selectedDevCategryReducer, DevCategorys } from './devCategoryReducer';

export default combineReducers({
  devCategorys: DevCategorys,
  selectedDevCategory: selectedDevCategryReducer,
});
