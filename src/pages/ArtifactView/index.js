import React from 'react';
import './artifactview.scss';

function ArtifactView() {
    return (<div>

        <top-box/>
        <pre id="logo">
        AIRLOOM
        </pre>
        <pre id="logout" href='/'>
        LOG OUT
        </pre>
        <pre id="name">
        NAME OF ARTIFACT
        </pre>
        <content-box/>
        <pre id="location">
        Location
        </pre>
        <location-box/>
        <pre id="date">
        Date
        </pre>
        <date-box/>
        <pre id="family_members">
        Family Members
        </pre>
        <family-box/>
        <pre id="descriptions">
        Descriptions
        </pre>
        <descriptions-box/>
                 <edit-button href='/artifactedit'>edit</edit-button >
                 <upload-button href='/artifactedit'>upload</upload-button >
                 <back-button href='/list'>back</back-button >
           </div>
       );
}

export default ArtifactView;
