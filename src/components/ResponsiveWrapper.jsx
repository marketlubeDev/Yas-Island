import { useResponsive } from "../hooks/responsiveHook/useResponsive";

// eslint-disable-next-line no-unused-vars
const ResponsiveWrapper = ({ MobileComponent, DesktopComponent }) => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobileComponent /> : <DesktopComponent />;
};

export default ResponsiveWrapper;
