export function moveDone() {
  const moveSelf = new Audio("/move-self.mp3");
  moveSelf.play();
}
export function capturePiece() {
  const capture = new Audio("/capture.mp3");
  capture.play();
}
export function promotion() {
  const capture = new Audio("/promote.mp3");
  capture.play();
}
export function check() {
  const capture = new Audio("/move-check.mp3");
  capture.play();
}
export function castle() {
  const capture = new Audio("/castle.mp3");
  capture.play();
}
export function start() {
  const capture = new Audio("/game-start.mp3");
  capture.play();
}
export function end() {
  const capture = new Audio("/game-end.mp3");
  capture.play();
}
export const arraySounds = [moveDone, capturePiece, promotion, check, castle, end, end];
