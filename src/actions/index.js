import { DEV_CATEGORY_SELECTED, DEV_CATEGORY_SET, SEARCH_VIDEOS } from './type';
import youtube from '../config/youtube';

export const selectDevCategory = (category) => {
  return {
    type: DEV_CATEGORY_SELECTED,
    payload: category,
  };
};

export const setDevCategory = (categorys) => {
  return {
    type: DEV_CATEGORY_SET,
    payload: categorys,
  };
};

export const searchVideos = (term) => async (dispatch) => {
  const KEY = 'AIzaSyAfub-68QTWGpc5-_LqzSWjb5q9vS_A2SQ';
  const response = await youtube.get('/search', {
    params: {
      q: term,
      part: 'snippet',
      maxResults: 5,
      key: KEY,
    },
  });
  dispatch({ type: SEARCH_VIDEOS, payload: response.data });
};
