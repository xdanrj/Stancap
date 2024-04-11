const isBigScreen = window.matchMedia('(min-width: 1824px)').matches;
const isTabletOrMobile = window.matchMedia('(max-width: 1224px)').matches;
const isDesktop = window.matchMedia('(min-width: 992px)').matches;
const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches;
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const isNotMobile = window.matchMedia('(min-width: 768px)').matches;

export const sizes = {
  isBigScreen,
  isTabletOrMobile,
  isDesktop,
  isTablet,
  isMobile,
  isNotMobile
};

console.log(sizes.isBigScreen)