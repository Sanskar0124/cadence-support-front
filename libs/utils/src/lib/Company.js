export const cardCountHandler = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth >= 1024 && windowWidth < 1280) return 6;
  else if (windowWidth >= 1280 && windowWidth < 1600) return 9;
  else if (windowWidth >= 1600 && windowWidth < 1920) return 12;
  else if (windowWidth >= 1600 && windowWidth < 1920) return 15;
  return 4;
};
