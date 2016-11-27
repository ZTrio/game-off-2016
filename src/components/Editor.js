import React from 'react';
import React3 from 'react-three-renderer';
import Ground from './Ground';
import Anchor from  './Anchor';
import SelectedMesh from './SelectedMesh';
import { connect } from 'react-redux';

class Editor extends React.Component {  
  render(){
    const {
      viewport,
      camera,
      lights,
      selectedVoxFileName,
      voxelData,
    } = this.props;
    
    return (
      <React3 {...viewport} mainCamera="camera">
        <scene>
          {Object.keys(lights).map((lightName) =>{
             return React.createElement(lightName, Object.assign({key: lightName}, lights[lightName]));
           })}
          <perspectiveCamera name="camera" {...camera} />          
          <axisHelper size={10}/>
          <SelectedMesh selectedVoxFileName={selectedVoxFileName} voxelData={voxelData}/>
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
};

function mapStateToProps(state, ownProps) {
  return{
    viewport: state.viewport,
    camera: state.camera,
    lights: state.lights,
    selectedVoxFileName: state.selectedVoxFileName,
    voxelData: state.voxelData
  };
}

export default connect(mapStateToProps)(Editor);
