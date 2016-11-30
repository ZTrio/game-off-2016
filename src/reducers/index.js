const reducerRoutes = {};
reducerRoutes['MOUSE_MOVE'] = function(state, action){
  state.mouse.position = action.position;
  state.mouse.intersects = action.intersects;
  return Object.assign({}, state);
};

reducerRoutes['MOUSE_CLICK'] = function(state, action){
  if(!state.selectedVoxFileName){ return state; }
  if(!state.mouse.intersects.length){ return state; }
  
  state.map.entities.push({
    model: state.selectedVoxFileName,
    position: state.mouse.intersects[0].point
  });
  return Object.assign({}, state);
};

reducerRoutes['LOAD_VOX'] = function(state, action){
  state.voxelData[action.name] = {};
  return Object.assign({}, state);
};

reducerRoutes['LOAD_VOX_SUCCESS'] = function(state, action){
  const faded = action.material.clone();
  faded.transparent = true;
  faded.opacity = 0.5;

  action.geometry.computeBoundingBox();
  
  state.voxelData[action.name] = {
    geometry: action.geometry,
    material: action.material,
    faded,
  };

  state.selectedVoxFileName = action.name;
  return Object.assign({}, state);
};


export default function(state, action){
  if(reducerRoutes[action.type]){
    return reducerRoutes[action.type](state, action);
  }
  return state;
}
