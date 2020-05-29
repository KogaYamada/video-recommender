import { DEV_CATEGORY_SELECTED } from './type';

export const selectDevCategory = (category) => {
  return {
    type: DEV_CATEGORY_SELECTED,
    payload: category,
  };
};
