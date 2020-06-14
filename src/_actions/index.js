import * as actionTypes from './type';

export const selectDevCategory = (category) => {
  return {
    type: actionTypes.DEV_CATEGORY_SELECTED,
    payload: category,
  };
};

export const selectVideo = (video) => {
  return {
    type: actionTypes.SELECT_VIDEO,
    payload: video,
  };
};

export const setVideos = (videos) => {
  return {
    type: actionTypes.SET_VIDEOS,
    payload: videos,
  };
};

export const isSearch = (state) => {
  return {
    type: actionTypes.IS_SEARCH,
    payload: state,
  };
};

export const currentPage = (page) => {
  return {
    type: actionTypes.CURRENT_PAGE,
    payload: page,
  };
};
