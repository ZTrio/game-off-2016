import React from 'react';
import modelNames from '../modelNames.json';
import { connect } from 'react-redux';

import loadVoxFile from '../actions/loadVoxFile';

class DOMUI extends React.Component {
  selectChangeHandler(event){
    store.dispatch(loadVoxFile(event.target.value));
  }

  render() {
    return (
      <div id="uiContainer">
        <select onChange={this.selectChangeHandler}>
          {modelNames.map((modelName) => { return <option value={modelName} key={modelName}>{modelName}</option>}) }
        </select>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return{
    viewport: state.viewport,
    camera: state.camera,
    lights: state.lights,
  };
}

export default connect(mapStateToProps)(DOMUI);
