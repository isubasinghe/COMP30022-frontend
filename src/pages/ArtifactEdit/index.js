import React from 'react';
import './artifactedit.scss';

function ArtifactEdit() {
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
                 <save-button href='/list'>save</save-button >
                 <cancel-button href='/artifactview'>cancel</cancel-button >
                 <delete-button href='/list'>delete</delete-button >
                 <back-button href='/list'>back</back-button >
           </div>
       );
}

export default ArtifactEdit;
