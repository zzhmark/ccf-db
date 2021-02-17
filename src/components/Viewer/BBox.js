import React from 'react'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

export default function BBox(props) {
  const box = React.useRef()
  useHelper(box, THREE.BoxHelper, props.color)
  return (
    <group>
      <mesh ref={box}>{props.children}</mesh>
    </group>
  )
}

BBox.defaultProps = {
  color: 'cyan',
}
