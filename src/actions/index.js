import { DEV_CATEGORY_SELECTED, SELECT_VIDEO, SET_VIDEOS } from './type';

export const selectDevCategory = (category) => {
  return {
    type: DEV_CATEGORY_SELECTED,
    payload: category,
  };
};

export const selectVideo = (video) => {
  return {
    type: SELECT_VIDEO,
    payload: video,
  };
};

export const setVideos = (videos) => {
  return {
    type: SET_VIDEOS,
    payload: videos,
  };
};
