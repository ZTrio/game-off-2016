import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

export default class Ground extends React.Component {
  constructor(props, context){
    super(props, context);
    this.groundScale = new THREE.Vector3(1000, 1000, 1000);
    this.groundTexRepeat = new THREE.Vector2(512*3, 512*3);
    this.groundRotation = new THREE.Euler();
    this.groundRotation.x = - Math.PI / 2;
  }

  render(){
    return (
      <mesh name="ground"
            scale={this.groundScale}
            rotation={this.groundRotation}
            ref="mesh">
        <planeBufferGeometry width={100} height={100}/>
        <meshPhongMaterial color={0xFFFFFF}>
          <texture
              url="./assets/textures/grass.png"
              anisotropy={1}
              repeat={this.groundTexRepeat}
              wrapS={THREE.RepeatWrapping}
              wrapT={THREE.RepeatWrapping}
          />
        </meshPhongMaterial>
      </mesh>
    );
  }
}
