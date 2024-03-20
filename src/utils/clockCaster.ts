export function clockCaster(minutes: number) {
  let milisecs = minutes * 3600;

  const secs = 0;
  return `${minutes < 10 ? String(minutes).padStart(2, "0") : minutes}:${
    secs < 10 ? String(secs).padStart(2, "0") : secs
  }`;
}
