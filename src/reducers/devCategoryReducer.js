import { DEV_CATEGORY_SELECTED, DEV_CATEGORY_SET } from '../actions/type';
const INITIAL_CATEGORYS = [
  {
    title: 'JavaScript',
    color: 'yellow',
    isActive: true,
  },
  {
    title: 'Node.js',
    color: 'green',
    isActive: false,
  },
  {
    title: 'Deno',
    color: 'violet',
    isActive: false,
  },
  {
    title: 'React/React Native',
    color: 'blue',
    isActive: false,
  },
  {
    title: 'Vue.js',
    color: 'teal',
    isActive: false,
  },
  {
    title: 'Angular',
    color: 'red',
    isActive: false,
  },
];

export const selectedDevCategryReducer = (
  selectedDevCategory = null,
  action
) => {
  switch (action.type) {
    case DEV_CATEGORY_SELECTED:
      return action.payload;
    default:
      return selectedDevCategory;
  }
};

export const DevCategorys = (allCategory = INITIAL_CATEGORYS, action) => {
  switch (action.type) {
    case DEV_CATEGORY_SET:
      return action.payload;
    default:
      return allCategory;
  }
};
