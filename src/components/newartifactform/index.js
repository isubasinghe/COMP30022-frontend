import React from 'react';
import PropTypes from 'prop-types';
import ArtifactForm from '../artifactform';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

function NewArtifactForm({ registerId, showModal, setShowModal }) {
  const createNewArtifact = artifact => {
    const data = {
      register_id: registerId,
      ...artifact
    };

    return authFetchRequest('https://api.airloom.xyz/api/v1/artifact/add', {
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
      title="Add A New Artifact"
      buttonName="Add"
      showModal={showModal}
      setShowModal={setShowModal}
      request={createNewArtifact}
    />
  );
}

NewArtifactForm.propTypes = {
  registerId: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default React.memo(NewArtifactForm);
