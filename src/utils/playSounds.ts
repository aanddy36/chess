export function moveDone() {
  const moveSelf = new Audio("/src/assets/move-self.mp3");
  moveSelf.play();
}
export function capturePiece() {
  const capture = new Audio("/src/assets/capture.mp3");
  capture.play();
}
export function promotion() {
  const capture = new Audio("/src/assets/promote.mp3");
  capture.play();
}
export function check() {
  const capture = new Audio("/src/assets/move-check.mp3");
  capture.play();
}
export function castle() {
  const capture = new Audio("/src/assets/castle.mp3");
  capture.play();
}
export function start() {
  const capture = new Audio("/src/assets/game-start.mp3");
  capture.play();
}
export function end() {
  const capture = new Audio("/src/assets/game-end.mp3");
  capture.play();
}
export const arraySounds = [moveDone, capturePiece, promotion, check, castle, end, end];
