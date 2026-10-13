export function Ground() {
  return (
    <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
      <planeGeometry />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}
