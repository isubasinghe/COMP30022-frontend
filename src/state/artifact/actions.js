export const GET_ARTIFACT = '[artifact] GET';
export const FETCH_ARTIFACT_SUCESS = '[artifact] Fetch_SUCCESS';
export const FETCH_ARTIFACT_FAILURE = '[artifact] FETCH_FAILURE';
export const UPDATE_ARTIFACTS = '[artifact] UPDATE_ARTIFACTS';
export const UPDATE_ARTIFACT = '[artifact] UPDATE_ARTIFACT';

export const getArtifacts = () => ({
  type: GET_ARTIFACT
});

export const updateArtifacts = data => ({
  type: UPDATE_ARTIFACTS,
  payload: data
});

export const updateArtifact = data => ({
  type: UPDATE_ARTIFACT,
  payload: data
});
