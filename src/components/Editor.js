import React from 'react';
import React3 from 'react-three-renderer';
import ReactDOM from 'react-dom';
import THREE from "three";
import Ground from './Ground';
import Anchor from  './Anchor';

export default class Editor extends React.Component {
  constructor(props, context){
    super(props, context);
    this.cameraPosition = new THREE.Vector3(0, 25, 50);
  }

  render(){
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height    
    
    return (
      <React3
          clearColor={0x7ccaff}
          clearAlpha={1}
          alpha={true}
          shadowMapEnabled={true}
          antialias={true}
          width={width}
          height={height}
          mainCamera="camera">
        <scene>
          <perspectiveCamera
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}
              position={this.cameraPosition}
          />
          <ambientLight color={0x000033} />
          <directionalLight
              color={this.directionaLightColor}
              position={this.directionalLightPosition}
              castShadow={true}
              shadowMapWidth={2048}
              shadowMapHeight={2048}
              shadowCameraLeft={-150}
              shadowCameraRight={150}
              shadowCameraTop={150}
              shadowCameraBottom={-150}
              shadowCameraFar={3500}
              shadowBias={-0.0001}
          />
          <hemisphereLight
              skyColor={this.hemisphereLightSkyColor}
              groundColor={this.hemisphereLightGroundColor}
              position={this.hemisphereLightPosition}
          />
          <axisHelper size={10}/>
          <Anchor />
          <Ground />
        </scene>          
      </React3>
    );
  }
};
