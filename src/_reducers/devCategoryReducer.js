import { DEV_CATEGORY_SELECTED } from '../_actions/type';

const INITIAL_CATEGORY = {
  color: 'grey',
};

export default (selectedDevCategory = INITIAL_CATEGORY, action) => {
  switch (action.type) {
    case DEV_CATEGORY_SELECTED:
      return action.payload;
    default:
      return selectedDevCategory;
  }
};
