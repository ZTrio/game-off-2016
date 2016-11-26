import React from 'react';
import React3 from 'react-three-renderer';
import ReactDOM from 'react-dom';
import THREE from "three";
import Ground from './Ground';
import Anchor from  './Anchor';
import { connect } from 'react-redux';

let scene;

class Editor extends React.Component {
  selectedMesh(voxelData, selectedModel){
    if(selectedModel &&
       voxelData[selectedModel] &&
       voxelData[selectedModel].geometry){
      return (
        <mesh geometry={voxelData[selectedModel].geometry}
              material={voxelData[selectedModel].material} />
      );
    }
    return null;
  }

  render(){
    const {
      viewport,
      camera,
      lights,
      voxelData,
      selectedModel
    } = this.props;
    
    return (
      <React3 {...viewport} mainCamera="camera">
        <scene ref="thescene">
          {Object.keys(lights).map((lightName) =>{
             return React.createElement(lightName, Object.assign({key: lightName}, lights[lightName]));
           })}
          <perspectiveCamera name="camera" {...camera} />          
          <axisHelper size={10}/>
          <Anchor />
          {this.selectedMesh(voxelData, selectedModel)}
          <Ground />
        </scene>          
      </React3>
    );
  }
};

Editor.propTypes = {
  camera: React.PropTypes.object.isRequired,
  viewport: React.PropTypes.object.isRequired,
  lights: React.PropTypes.object,
  selectedModel: React.PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
  return{
    viewport: state.viewport,
    camera: state.camera,
    lights: state.lights,
    selectedModel: state.selectedModel,
    voxelData: state.voxelData
  };
}

export default connect(mapStateToProps)(Editor);
