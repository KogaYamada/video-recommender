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

export default combineReducers({
  selectedDevCategory: selectedDevCategryReducer,
  selectedVideo: selectedVideoReducer,
  videos: videosReducer,
});
