import React from 'react';
import React3 from 'react-three-renderer';
import ReactDOM from 'react-dom';
import THREE from "three";
import VoxLoader from './VoxLoader/Vox.js';
import GameLoop from 'fixed-game-loop';
import KeyDrown from 'keydrown';
import modelNames from './modelNames.json';
import Editor from './components/Editor';

const OrbitControls = require('three-orbit-controls')(THREE);

class EditorContainer extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
      <div>
        <div id="uiContainer">
          <select>
            {modelNames.map((modelName) => { return <option value={modelName} key={modelName}>{modelName}</option>})}
          </select>
        </div>
        <Editor />
      </div>
    );
  }
}


ReactDOM.render(<EditorContainer />, document.getElementById('mount'));
