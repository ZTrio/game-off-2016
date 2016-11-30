import React from 'react';
import THREE from "three";

import Entity from './Entity';

class PlacedEntity extends React.Component {
  constructor(props, context){
    super(props,context);
    this.originVector = new THREE.Vector3(0,0,0);    
    this.state = {
      localOffset: this.originVector.clone(),
    }
  }

  calculateOffset(){
    const mesh = this.refs.entity.refs.localMesh;
    //TODO need a better refrence to `scene` this is super fragile
    // need to updateMatrixWorld on scene to locally center the model here
    mesh.updateMatrixWorld(true);
    
    const boundingBox = mesh.geometry.boundingBox;
    const offset = new THREE.Vector3();
    offset.subVectors( boundingBox.max, boundingBox.min );
    offset.multiplyScalar( 0.5 );
    offset.add( boundingBox.min );
    offset.applyMatrix4( mesh.matrixWorld );

    offset.multiplyScalar(-1);
    offset.setY(0);
    return offset;
  }

  componentDidMount(){
    this.setState({
      localOffset: this.calculateOffset()
    });
  }
  
  render(){
    return (
      <Entity ref="entity"
              geometry={this.props.geometry}
              material={this.props.material}
              position={this.props.position}
              localOffset={this.state.localOffset}/>
    );
  }
};

export default PlacedEntity;
