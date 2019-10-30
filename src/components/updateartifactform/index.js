import React from 'react';
import PropTypes from 'prop-types';
import ArtifactForm from '../artifactform';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

function UpdateArtifactForm({ registerId, artifactId, showModal, setShowModal, artifactData }) {
  const updateArtifact = artifact => {
    const data = {
      register_id: registerId,
      artifact_id: artifactId,
      ...artifact
    };

    return authFetchRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/artifact/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        setShowModal(false);
      })
      .catch(() => {});
  };

  return (
    <ArtifactForm
      title="Update Artifact"
      buttonName="Update"
      showModal={showModal}
      setShowModal={setShowModal}
      request={updateArtifact}
      artifactData={artifactData}
    />
  );
}

UpdateArtifactForm.propTypes = {
  registerId: PropTypes.string.isRequired,
  artifactId: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  artifactData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    family_members: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    lat: PropTypes.string.isRequired,
    lon: PropTypes.string.isRequired
  }).isRequired
};

export default UpdateArtifactForm;
