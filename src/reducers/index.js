import { combineReducers } from 'redux';
import selectedDevCategryReducer from './devCategoryReducer';
import selectedVideoReducer from './selectedVideoReducer';
import { SET_VIDEOS } from '../actions/type';

const videosReducer = (videos = [], action) => {
  switch (action.type) {
    case SET_VIDEOS:
      return action.payload;
    default:
      return videos;
  }
};

const isSearchReducer = (state = true, action) => {
  switch (action.type) {
    case 'IS_SEARCH':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  selectedDevCategory: selectedDevCategryReducer,
  selectedVideo: selectedVideoReducer,
  videos: videosReducer,
  isSearch: isSearchReducer,
});
