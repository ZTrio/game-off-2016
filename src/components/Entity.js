import React from 'react';
import THREE from "three";

export default class Entity extends React.Component {
  constructor(props, context){
    super(props,context);
    this.rotation = new THREE.Euler(-Math.PI/2, 0, Math.PI);
  }
  
  render(){
    return (
      <group position={this.props.position} ref="group">
        <axisHelper size={10}/>        
        <mesh ref="localMesh"
              geometry={this.props.geometry}
              material={this.props.material}
              castShadow={true}
              receiveShadow={true}
              rotation={this.rotation}
              position={this.props.localOffset}
        />
      </group>
    );
  }
}
