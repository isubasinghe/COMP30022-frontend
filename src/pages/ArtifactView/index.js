import React from 'react';
import './artifactview.scss';

function ArtifactView() {
    return (<div>
        <top-box/>
        <content-box/>
                 <edit-button href='/artifactedit'>edit</edit-button >
                 <upload-button href='/artifactedit'>upload</upload-button >
                 <back-button href='/list'>back</back-button >
           </div>
       );
}

export default ArtifactView;
