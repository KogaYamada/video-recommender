import {
  DEV_CATEGORY_SELECTED,
  DEV_CATEGORY_SET,
  SELECT_VIDEO,
  SIGN_IN,
  SIGN_OUT,
} from './type';

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

export const selectVideo = (video) => {
  return { type: SELECT_VIDEO, payload: video };
};

export const signIn = (user) => {
  return { type: SIGN_IN, payload: user };
};

export const signOut = () => {
  return { type: SIGN_OUT };
};

// export const createRecommend = (videoDetail) => async (dispatch) => {
//   await firebase
//     .firestore()
//     .collection(`testdata`)
//     .doc()
//     .set({
//       id: videoDetail.id.videoId,
//       title: videoDetail.snippet.title,
//       description: videoDetail.snippet.description,
//       thumbnail: videoDetail.snippet.thumbnails.high,
//     })
//     .then(async (ref) => {
//       await console.log('Added document with ID: ', ref);
//     });

//   return { type: CREATE_RECOMMEND, payload: videoDetail };
// dispatch({ type: CREATE_RECOMMEND, payload: videoDetail });
// };
