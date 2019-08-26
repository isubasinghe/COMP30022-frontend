import {
  GET_ARTIFACT,
  FETCH_ARTIFACT_SUCCESS,
  FETCH_ARTIFACT_FAILURE,
  UPDATE_ARTIFACT,
  UPDATE_ARTIFACT_SUCCESS,
  UPDATE_ARTIFACT_FAILURE,
  UPDATE_ARTIFACTS,
  updateArtifacts
} from './actions';
import { apiRequest } from '../api/actions';

export const getArtifactsFlow = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === GET_ARTIFACT) {
    dispatch(apiRequest('GET', '', null, FETCH_ARTIFACT_SUCCESS, FETCH_ARTIFACT_FAILURE));
  }
};

export const updateArtifactFlow = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UPDATE_ARTIFACT) {
    dispatch(apiRequest('POST', '', {}, UPDATE_ARTIFACT_SUCCESS, UPDATE_ARTIFACT_FAILURE));
  }
};

export const processArtifactCollection = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UPDATE_ARTIFACTS) {
    dispatch(updateArtifacts(action.payload.items));
  }
};

const artifactMiddleware = [];
export default artifactMiddleware;
