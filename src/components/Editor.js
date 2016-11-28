import React from 'react';
import React3 from 'react-three-renderer';
import THREE from "three";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Ground from './Ground';
import SelectedMesh from './SelectedMesh';

import mouseMove from '../actions/mouseMove';
import loadVoxFile from '../actions/loadVoxFile';

class Editor extends React.Component {
  constructor(props, context){
    super(props,context);
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();
    this.intersects = [];
    window.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
  }

  onMouseMove(){
    this.mouseVector.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouseVector.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.raycaster.setFromCamera(this.mouseVector, this.refs.camera);
    this.intersects = this.raycaster.intersectObjects( [this.refs.ground.refs.mesh] );
    this.props.mouseMove(this.mouseVector, this.intersects);
  }

  render(){
    const {
      viewport,
      camera,
      lights,
      selectedVoxFileName,
      voxelData,
      selectedPosition,
      selectedGeometry,
      selectedMaterial
    } = this.props;

    return (
      <React3 {...viewport}
              mainCamera="camera">
        <scene ref="scene">
          {Object.keys(lights).map((lightName) =>{
             return React.createElement(lightName, Object.assign({key: lightName}, lights[lightName]));
           })}
          <perspectiveCamera name="camera" {...camera} ref="camera"/>          
          <axisHelper size={10}/>
          { selectedGeometry ? 
          <SelectedMesh geometry={selectedGeometry}
                        material={selectedMaterial}
                        position={selectedPosition}/>
            :
            null }
          <Ground ref='ground' />
        </scene>          
      </React3>
    );
  }
};


Editor.propTypes = {
  camera: React.PropTypes.object.isRequired,
  viewport: React.PropTypes.object.isRequired,
  lights: React.PropTypes.object,
  mouse: React.PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  let selectedPosition = new THREE.Vector3(0,0,0);
  if(state.mouse.intersects.length){
    selectedPosition = state.mouse.intersects[0].point;
  }

  let selectedGeometry = null;
  let selectedMaterial = null;
  if(state.voxelData[state.selectedVoxFileName]){
    selectedGeometry = state.voxelData[state.selectedVoxFileName].geometry;
    selectedMaterial = state.voxelData[state.selectedVoxFileName].material;    
  }
  
  return{
    viewport: state.viewport,
    camera: state.camera,
    lights: state.lights,
    selectedVoxFileName: state.selectedVoxFileName,
    voxelData: state.voxelData,
    selectedPosition,
    selectedGeometry,
    selectedMaterial,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    mouseMove
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
