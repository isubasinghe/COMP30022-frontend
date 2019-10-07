import React from 'react';
import PropTypes from 'prop-types';
import ArtifactForm from '../artifactform';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

function NewArtifactForm({ registerId, artifactId, showModal, setShowModal, artifactData }) {
  const updateArtifact = (name, familyMembers, description, date, lat, lon) => {
    const data = {
      register_id: registerId,
      artifact_id: artifactId,
      name,
      family_members: familyMembers,
      description,
      date,
      lat,
      lon
    };

    return authFetchRequest('https://api.airloom.xyz/api/v1/artifact/update', {
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

NewArtifactForm.propTypes = {
  registerId: PropTypes.string.isRequired,
  artifactId: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  artifactData: PropTypes.shape({
    name: PropTypes.string,
    family_members: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    lat: PropTypes.string,
    lon: PropTypes.string
  })
};

export default NewArtifactForm;
