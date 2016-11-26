import React from 'react';
import React3 from 'react-three-renderer';
import ReactDOM from 'react-dom';
import THREE from "three";
import Ground from './Ground';
import Anchor from  './Anchor';
import { connect } from 'react-redux';

class Editor extends React.Component {
  voxelDataIterator(voxelData){
    if(!Object.keys(voxelData).length){
      return null;
    }
    
    return Object.keys(voxelData).map((voxelName) => {
      return React.createElement('bufferGeometry', Object.assign({resourceId: voxelName}, voxelData[voxelName]));
    });
  }

  selectedMesh(voxelData, selectedModel){
    if(selectedModel && voxelData[selectedModel] && voxelData[selectedModel].position){
      return (
        <mesh>
          <meshLambertMaterial />
          <geometryResource resourceId={selectedModel} />
        </mesh>
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
        <resources>
          {this.voxelDataIterator(voxelData)}
        </resources>
        <scene>
          <perspectiveCamera name="camera" {...camera} />
          {Object.keys(lights).map((lightName) =>{
             return React.createElement(lightName, Object.assign({key: lightName}, lights[lightName]));
           })}
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
