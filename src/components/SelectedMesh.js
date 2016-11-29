import React from 'react';
import THREE from "three";
import { connect } from 'react-redux';

import Anchor from  './Anchor';

class SelectedMesh extends React.Component {
  constructor(props, context){
    super(props,context);
    this.rotation = new THREE.Euler(-Math.PI/2, 0, Math.PI);

    this.state = {
      localOffset: new THREE.Vector3(0,0,0)
    }
  }

  calculateOffset(){
    const mesh = this.refs.localMesh;
    //TODO need a better refrence to `scene` this is super fragile
    // need to updateMatrixWorld on scene to locally center the model here
    mesh.parent.parent.updateMatrixWorld();
    
    const geometry = mesh.geometry;

    geometry.computeBoundingBox(geometry);
    const boundingBox = geometry.boundingBox;
    const offset = new THREE.Vector3();
    offset.subVectors( boundingBox.max, boundingBox.min );
    offset.multiplyScalar( 0.5 );
    offset.add( boundingBox.min );
    offset.applyMatrix4( mesh.matrixWorld );

    offset.multiplyScalar(-1);
    offset.setY(0);
    /* mesh.position.x += -1 * offset.x;
     * mesh.position.z += -1 * offset.z;*/
    this.setState({
      localOffset: offset
    });
  }

  /* componentDidUpdate(prevProps, prevState){
   *   if(prevProps.geometry !== this.props.geometry){
   *     this.calculateOffset();
   *   }
   * }*/

  componentDidMount(prevProps, prevState){
    this.calculateOffset();
  }  

  render(){
    const {
      position,
      geometry,
      material
    } = this.props;
    
    return (
      <group position={position}>
        <Anchor/>
        <mesh ref="localMesh"
              geometry={geometry}
              material={material}
              castShadow={true}
              receiveShadow={true}
              rotation={this.rotation}
              position={this.state.localOffset}/>
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
