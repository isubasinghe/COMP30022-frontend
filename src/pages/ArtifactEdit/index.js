import React from 'react';
import './artifactedit.scss';

function ArtifactEdit() {
    return (<div>
        <top-box/>
        <content-box/>
                 <save-button href='/list'>save</save-button >
                 <cancel-button href='/artifactview'>cancel</cancel-button >
                 <delete-button href='/list'>delete</delete-button >
                 <back-button href='/list'>back</back-button >
           </div>
       );
}

export default ArtifactEdit;
