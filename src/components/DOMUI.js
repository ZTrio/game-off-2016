import React from 'react';
import modelNames from '../modelNames.json';
import { connect } from 'react-redux';

import loadVoxFile from '../actions/loadVoxFile';

class DOMUI extends React.Component {
  selectChangeHandler(event){
    store.dispatch(loadVoxFile(event.target.value));
  }

  render() {
    const { selectedVoxFileName } = this.props;
    
    return (
      <div id="uiContainer">
        <select onChange={this.selectChangeHandler}>
          <option value="">Select an entity</option>
          {modelNames.map((modelName) => {
             return <option value={modelName}
                            selected={selectedVoxFileName === modelName ? true : null}
                            key={modelName}>{modelName}</option>})
          }
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
    selectedVoxFileName: state.selectedVoxFileName
  };
}

export default connect(mapStateToProps)(DOMUI);
