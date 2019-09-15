import React from 'react';
import './list.scss';

function ArtifactEdit() {
    return (<div>
        <top-box/>
        <pre id="logo">
        AIRLOOM
        </pre>
        <pre id="home" href='/'>
        HOME
        </pre>
        <pre id="list" href='/listview'>
        LIST
        </pre>
        <pre id="timeline" href='/timeline'>
        TIMELINE
        </pre>
        <pre id="mapview" href='/map'>
        MAP VIEW
        </pre>
        <pre id="setting" href='/setting'>
        SETTING
        </pre>
        <pre id="logout" href='/'>
        LOG OUT
        </pre>
        <pre id="name">
        NAME OF ARTIFACT
        </pre>
        <content-box/>
           </div>
       );
}

export default ArtifactEdit;
