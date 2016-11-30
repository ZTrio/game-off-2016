import VoxLoader from '../VoxLoader/Vox.js';

const loadVoxFile = function(filename, callback){
  return (dispatch, getState) => {
    dispatch({
      type:"LOAD_VOX",
      name: filename
    });


    const vl = new VoxLoader({
      filename: `./assets/mmmm/vox/${filename}`,
      blockSize: 1
    });
    
    vl.LoadModel((vox) => {
      vox.getChunk().Rebuild();      
      dispatch({
        type: "LOAD_VOX_SUCCESS",
        name: filename,
        geometry: vox.chunk.geometry,
        material: vox.chunk.material,
      });
    });    
  };
};

export default loadVoxFile
