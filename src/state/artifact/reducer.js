import { UPDATE_ARTIFACTS } from './actions';

const artifactReducer = (books = [], action) => {
  switch (action.type) {
    case UPDATE_ARTIFACTS:
      return action.payload;
    default:
      return books;
  }
};

export default artifactReducer;
