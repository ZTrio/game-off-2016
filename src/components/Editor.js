import React from 'react';
import React3 from 'react-three-renderer';
import THREE from "three";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Ground from './Ground';
import CursorEntity from './CursorEntity';
import PlacedEntity from './PlacedEntity';

import mouseMove from '../actions/mouseMove';
import mouseClick from '../actions/mouseClick';
import loadVoxFile from '../actions/loadVoxFile';

//TODO reverse engineer orbitcontrols in to reducer updates to camera position
const OrbitControls = require('three-orbit-controls')(THREE);


class Editor extends React.Component {
  constructor(props, context){
    super(props,context);
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();
    this.intersects = [];
    window.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
    window.addEventListener( 'click', this.onMouseClick.bind(this), false);
  }

  onMouseClick(){
    this.props.mouseClick();
  }

  onMouseMove(){
    this.mouseVector.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouseVector.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.raycaster.setFromCamera(this.mouseVector, this.refs.camera);
    this.intersects = this.raycaster.intersectObjects( [this.refs.ground.refs.mesh] );
    this.props.mouseMove(this.mouseVector, this.intersects);
  }

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
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
      selectedMaterial,
      entities
    } = this.props;

    return (
      <React3 {...viewport}
              mainCamera="camera">
        <scene ref="scene">
          {Object.keys(lights).map((lightName) =>{
             return React.createElement(lightName, Object.assign({key: lightName}, lights[lightName]));
           })}
          <perspectiveCamera name="camera" {...camera} ref="camera"/>          
          <axisHelper size={15}/>
          { selectedGeometry ? 
          <CursorEntity geometry={selectedGeometry}
                        material={selectedMaterial}
                        position={selectedPosition}/>
            :
            null }
          {entities.map((entity, index) => {
             return <PlacedEntity key={index + "_" + entity.model}
                                  geometry={voxelData[entity.model].geometry}
                                  material={voxelData[entity.model].material}
                                  position={entity.position}
                    />
          })}
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
    selectedMaterial = state.voxelData[state.selectedVoxFileName].faded;
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
    entities: state.map.entities
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    mouseMove,
    mouseClick
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
