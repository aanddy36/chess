export function moveDone() {
  const moveSelf = new Audio("/src/assets/move-self.mp3");
  moveSelf.play();
}
export function capturePiece() {
  const capture = new Audio("/src/assets/capture.mp3");
  capture.play();
}
export const arraySounds = [moveDone, capturePiece];
