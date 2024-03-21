export function clockCaster(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes < 10 ? String(minutes).padStart(2, "0") : minutes}:${
    secs < 10 ? String(secs).padStart(2, "0") : secs
  }`;
}
