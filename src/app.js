import React from 'react';
import React3 from 'react-three-renderer';
import ReactDOM from 'react-dom';
import THREE from "three";
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import GameLoop from 'fixed-game-loop';
import KeyDrown from 'keydrown';
import rootReducer from './reducers/index';


import Editor from './components/Editor';
import DOMUI from './components/DOMUI';

import initialState from './initialState';

function configureStore(initialState){
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxThunk)
  );

  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

const store = configureStore(initialState);
window.store = store;


class AppRoot extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <div>
          <DOMUI />
          <Editor ref="editor"/>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<AppRoot />, document.getElementById('mount'));
