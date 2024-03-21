export function clockCaster(milisecs: number) {
  const minutes = Math.floor(milisecs / 3600);
  const secs = Math.floor((milisecs % 3600) / 60);
  const mili = Math.floor(secs % 60);
  return `${minutes < 10 ? String(minutes).padStart(2, "0") : minutes}:${
    secs < 10 ? String(secs).padStart(2, "0") : secs
  }${
    milisecs < 1200
      ? `:${mili < 10 ? String(mili).padStart(2, "0") : mili}`
      : ""
  }`;
}
