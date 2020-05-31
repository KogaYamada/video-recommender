import { DEV_CATEGORY_SELECTED } from '../actions/type';

export default (selectedDevCategory = null, action) => {
  switch (action.type) {
    case DEV_CATEGORY_SELECTED:
      return action.payload;
    default:
      return selectedDevCategory;
  }
};
