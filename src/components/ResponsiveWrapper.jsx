import { useResponsive } from "../hooks/responsiveHook/useResponsive";

// eslint-disable-next-line no-unused-vars
const ResponsiveWrapper = ({ MobileComponent, DesktopComponent }) => {
  const { isSmallPhone, isPhone, isTablets } = useResponsive();
  const isMobile = isSmallPhone || isPhone || isTablets;
  return isMobile ? <MobileComponent /> : <DesktopComponent />;
};

export default ResponsiveWrapper;
