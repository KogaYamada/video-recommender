import { combineReducers } from 'redux';
import selectedDevCategryReducer from './devCategoryReducer';
import selectedVideoReducer from './selectedVideoReducer';
import * as actionTypes from '../_actions/type';

const videosReducer = (videos = [], action) => {
  switch (action.type) {
    case actionTypes.SET_VIDEOS:
      return action.payload;
    default:
      return videos;
  }
};

const isSearchReducer = (state = true, action) => {
  switch (action.type) {
    case actionTypes.IS_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

const currentPageReducer = (page = 'home', action) => {
  switch (action.type) {
    case actionTypes.CURRENT_PAGE:
      return action.payload;
    default:
      return page;
  }
};

export default combineReducers({
  selectedDevCategory: selectedDevCategryReducer,
  selectedVideo: selectedVideoReducer,
  videos: videosReducer,
  isSearch: isSearchReducer,
  currentPag: currentPageReducer,
});
