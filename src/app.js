import React from 'react';
import React3 from 'react-three-renderer';
import ReactDOM from 'react-dom';
import THREE from "three";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import VoxLoader from './VoxLoader/Vox.js';
import GameLoop from 'fixed-game-loop';
import KeyDrown from 'keydrown';
import modelNames from './modelNames.json';
import Editor from './components/Editor';


const OrbitControls = require('three-orbit-controls')(THREE);
const width = window.innerWidth; // canvas width
const height =  window.innerHeight; // canvas height

const directionalLightColor = new THREE.Color( 0xffffff );
directionalLightColor.setHSL(0.1,1,0.95);
const directionalLightPosition = new THREE.Vector3(10, 10.75, 10);
directionalLightPosition.multiplyScalar(10);

const hemisphereLightSkyColor = new THREE.Color(0xffffff);
hemisphereLightSkyColor.setHSL(0.6, 1, 0.6);
const hemisphereLightGroundColor = new THREE.Color(0xffffff);
hemisphereLightGroundColor.setHSL(0.095, 1, 0.75);

function reducerThing(state, action){
  return state;
}

const initialState = {
  viewport: {
    height,
    width, 
    alpha: true,
    antialias: true,
    shadowMapEnabled: true,
    clearColor: 0x7ccaff,
    clearAlpha: 1
  },

  camera: {
    fov: 75,
    aspect: width / height,
    near: 0.1,
    far: 1000,
    position: new THREE.Vector3(0, 25, 50),
  },

  lights: {
    ambientLight: {
      color: 0x000033
    },

    directionalLight: {
      color: directionalLightColor,
      position: directionalLightPosition,
      castShadow: true,
      shadowMapWidth: 2048,
      shadowMapHeight: 2048,
      shadowCameraLeft: -150,
      shadowCameraRight: 150,
      shadowCameraTop: 150,
      shadowCameraBottom: -150,
      shadowCameraFar: 3500,
      shadowBias: -0.0001,
    },

    hemisphereLight: {
      skyColor: hemisphereLightSkyColor,
      groundColor: hemisphereLightGroundColor,
      position: new THREE.Vector3(0, 500, 0),
    }
  }
  
};

let store = createStore(reducerThing, initialState);

class EditorContainer extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
      <Provider store={store} >
        <div>
        <div id="uiContainer">
          <select>
            {modelNames.map((modelName) => { return <option value={modelName} key={modelName}>{modelName}</option>}) }
          </select>
        </div>
        <Editor />
        </div>
      </Provider>
    );
  }
}


ReactDOM.render(<EditorContainer />, document.getElementById('mount'));
