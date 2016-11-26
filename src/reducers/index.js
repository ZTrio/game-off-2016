const reducerRoutes = {};
reducerRoutes['LOAD_VOX'] = function(state, action){
  state.voxelData[action.name] = {};
  return Object.assign({}, state);
};

reducerRoutes['LOAD_VOX_SUCCESS'] = function(state, action){
  state.voxelData[action.name] = {
    position: action.position,
    color: action.color,
    mesh: action.mesh
  };

  state.selectedModel = action.name;
  return Object.assign({}, state);
};


export default function(state, action){
  if(reducerRoutes[action.type]){
    return reducerRoutes[action.type](state, action);
  }
  return state;
}
