import React from 'react';

export default function Anchor() {
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
