import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  setIsBigDesktop,
  setIsBigTablets,
  setIsDesktop,
  setIsMobile,
  setIsTablet,
} from "../../global/responsiveSlice";

export const useResponsive = () => {
  const dispatch = useDispatch();

  // Use react-responsive hooks for detecting changes

  const isSmallPhone = useMediaQuery({ query: "(max-width: 575.98px)" });
  const isPhone = useMediaQuery({
    query: "(min-width: 576px) and (max-width: 767.98px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991.98px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 992px) and (max-width: 1399.98px)",
  });
  const isBigDesktop = useMediaQuery({ query: "(min-width: 1400px)" });

  // Update Redux state when media queries change
  useEffect(() => {
    dispatch(setIsMobile(isSmallPhone));
    dispatch(setIsTablet(isPhone));
    dispatch(setIsBigTablets(isTablet));
    dispatch(setIsDesktop(isDesktop));
    dispatch(setIsBigDesktop(isBigDesktop));
  }, [dispatch, isSmallPhone, isPhone, isTablet, isDesktop, isBigDesktop]);

  // Return Redux state values and current breakpoint
  return {
    isSmallPhone,
    isPhone,
    isTablet,
    isDesktop,
    isBigDesktop,
  };
};
