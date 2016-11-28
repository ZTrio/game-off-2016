export default function mouseMove(position, intersects){
  return {
    type: "MOUSE_MOVE",
    position,
    intersects,
  };
}
