export const convertFromMinutes = (mins) => {
  let h = Math.floor(mins / 60);
  let d = Math.floor(h / 24);
  h = h - d * 24;
  let m = Math.floor(mins % 60);
  if (mins % 1440 === 0) return { time: d, duration: 'days' };
  else if (mins % 60 === 0) return { time: h, duration: 'hours' };
  return { time: m, duration: 'mins' };
};
