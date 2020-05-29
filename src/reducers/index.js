import { DEV_CATEGORY_SELECTED } from '../actions/type';
import { combineReducers } from 'redux';

const devCategorysReducer = () => {
  return [
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
};

const selectedDevCategryReducer = (selectedDevCategory = null, action) => {
  switch (action.type) {
    case DEV_CATEGORY_SELECTED:
      return action.payload;
    default:
      return selectedDevCategory;
  }
};

export default combineReducers({
  devCategorys: devCategorysReducer,
  selectedDevCategory: selectedDevCategryReducer,
});
