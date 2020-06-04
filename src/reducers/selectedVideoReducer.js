import { SELECT_VIDEO } from '../actions/type';

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_VIDEO:
      // action.payloadがundefinedの場合にnullを返す
      if (!action.payload) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};
