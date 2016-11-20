import React from 'react';

export default class Anchor extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <mesh>
        <boxGeometry
            width={1}
            height={1}
            depth={1}
        />
        <meshBasicMaterial color={0xFF0000}/>
      </mesh>      
    );
  }
}
