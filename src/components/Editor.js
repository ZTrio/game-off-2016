import React from 'react';
import React3 from 'react-three-renderer';
import ReactDOM from 'react-dom';
import THREE from "three";
import Ground from './Ground';
import Anchor from  './Anchor';
import { connect } from 'react-redux';

class Editor extends React.Component {
  render(){
    const {
      viewport,
      camera,
      lights
    } = this.props;
    
    return (
      <React3 {...viewport} mainCamera="camera">
        <scene>
          <perspectiveCamera name="camera" {...camera} />
          {Object.keys(lights).map((lightName) =>{
             return React.createElement(lightName, Object.assign({}, {key: lightName}, lights[lightName]));
           })}
          <axisHelper size={10}/>
          <Anchor />
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

export function mapStateToProps(state, ownProps) {
  return{
    viewport: state.viewport,
    camera: state.camera,
    lights: state.lights,
  };
}

export default connect(mapStateToProps)(Editor);
