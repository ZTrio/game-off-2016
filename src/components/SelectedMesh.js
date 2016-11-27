import React from 'react';
import THREE from "three";
import { connect } from 'react-redux';

import Anchor from  './Anchor';

class SelectedMesh extends React.Component {
  constructor(props, context){
    super(props,context);
    this.rotation = new THREE.Euler(-Math.PI/2, 0, Math.PI);
    this.position = new THREE.Vector3(0,0,0);    
  }
  
  render(){
    const {
      selectedVoxFileName,
      voxelData
    } = this.props;

    if(!voxelData[selectedVoxFileName] || !voxelData[selectedVoxFileName].geometry){
      return null;
    }
    
    return (
      <group>
        <Anchor/>
        <mesh geometry={voxelData[selectedVoxFileName].geometry}
              material={voxelData[selectedVoxFileName].material}
              castShadow={true}
              receiveShadow={true}
              rotation={this.rotation}
              position={this.position}/>
      </group>
    );
  }
};

export default SelectedMesh;

// we can't connect nested components because R3R is a peice of shit and messes with `context`

/* function mapStateToProps(state, ownProps) {
 *   return{
 *     geometry: 'cool',
 *     material: 'bro',
 *   };
 * }
 * 
 * export default connect(mapStateToProps)(SelectedMesh);*/
