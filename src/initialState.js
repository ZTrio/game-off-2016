import THREE from "three";

const width = window.innerWidth; // canvas width
const height =  window.innerHeight; // canvas height

const directionalLightColor = new THREE.Color( 0xffffff );
directionalLightColor.setHSL(0.1,1,0.95);
const directionalLightPosition = new THREE.Vector3(10, 10.75, 10);
directionalLightPosition.multiplyScalar(10);

const hemisphereLightSkyColor = new THREE.Color(0xffffff);
hemisphereLightSkyColor.setHSL(0.6, 1, 0.6);
const hemisphereLightGroundColor = new THREE.Color(0xffffff);
hemisphereLightGroundColor.setHSL(0.095, 1, 0.75);

const initialState = {
  selectedVoxFileName: 'chr_fatkid.vox',  

  voxelData: {},

  mouse: {
    position: new THREE.Vector2(),
    intersects: [],
  },

  groundIntersect: {},
  
  viewport: {
    height,
    width, 
    alpha: true,
    antialias: true,
    shadowMapEnabled: true,
    clearColor: 0x7ccaff,
    clearAlpha: 1
  },

  camera: {
    fov: 75,
    aspect: width / height,
    near: 0.1,
    far: 1000,
    position: new THREE.Vector3(0, 25, 50),
  },

  lights: {
    ambientLight: {
      color: 0x000033
    },

    directionalLight: {
      color: directionalLightColor,
      position: directionalLightPosition,
      castShadow: true,
      shadowMapWidth: 2048,
      shadowMapHeight: 2048,
      shadowCameraLeft: -150,
      shadowCameraRight: 150,
      shadowCameraTop: 150,
      shadowCameraBottom: -150,
      shadowCameraFar: 3500,
      shadowBias: -0.0001,
    },

    hemisphereLight: {
      skyColor: hemisphereLightSkyColor,
      groundColor: hemisphereLightGroundColor,
      position: new THREE.Vector3(0, 500, 0),
    }
  }
  
};

export default initialState;
