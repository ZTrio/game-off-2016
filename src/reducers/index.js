const reducerRoutes = {};
reducerRoutes['LOAD_VOX'] = function(state, action){
  state.voxelData[action.name] = {};
  return state;
};

reducerRoutes['LOAD_VOX_SUCCESS'] = function(state, action){
  state.voxelData[action.name] = {
    position: action.position,
    color: action.color
  };

  state.selectedModel = action.name;
  return state;
};


export default function(state, action){
  if(reducerRoutes[action.type]){
    return reducerRoutes[action.type](state, action);
  }
  return state;
}
