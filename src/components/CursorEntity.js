import React from 'react';
import THREE from "three";

import Entity from './Entity';

class CursorEntity extends React.Component {
  constructor(props, context){
    super(props,context);
    this.rotation = new THREE.Euler(-Math.PI/2, 0, Math.PI);
    this.originVector = new THREE.Vector3(0,0,0);

    this.state = {
      localOffset: this.originVector.clone(),
    }
  }

  calculateOffset(matrix){
    const mesh = this.refs.entity.refs.localMesh;
    //TODO need a better refrence to `scene` this is super fragile
    // need to updateMatrixWorld on scene to locally center the model here
    mesh.parent.parent.updateMatrixWorld(true);
    
    const boundingBox = mesh.geometry.boundingBox;
    const offset = new THREE.Vector3();
    offset.subVectors( boundingBox.max, boundingBox.min );
    offset.multiplyScalar( 0.5 );
    offset.add( boundingBox.min );
    offset.applyMatrix4( mesh.matrixWorld );

    offset.multiplyScalar(-1);
    offset.setY(0);
    /* mesh.position.x += -1 * offset.x;
     * mesh.position.z += -1 * offset.z;*/
    return offset;
  }

  componentWillUpdate(nextProps){
    if(this.props.geometry !== nextProps.geometry){
      //todo need to reset the meshes offset here to do redo center calculation
      //can't use setState because it won't change till next render pass
      // next render pass will never happen because componentDidUpdate gets called
      //TODO maybe move localOffset outside of state just slop it with mutability
      this.state.localOffset = this.originVector;
    }
  }
  
  componentDidUpdate(prevProps){
    if(this.props.geometry !== prevProps.geometry){
      debugger;
      this.setState({
        localOffset: this.calculateOffset()
      });
    }
  }

  componentDidMount(prevProps){
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

export default CursorEntity;
