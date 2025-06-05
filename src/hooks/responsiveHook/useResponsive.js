import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  setIsSmallPhone,
  setIsPhone,
  setIsTablets,
  setIsBigTablets,
  setIsDesktop,
  setIsBigDesktop,
  setIsExtraBigDesktop,
} from "../../global/responsiveSlice";

export const useResponsive = () => {
  const dispatch = useDispatch();

  // Use react-responsive hooks for detecting changes
  const isSmallPhone = useMediaQuery({ query: "(max-width: 575.98px)" });
  const isPhone = useMediaQuery({
    query: "(min-width: 576px) and (max-width: 767.98px)",
  });
  const isTablets = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991.98px)",
  });
  const isBigTablets = useMediaQuery({
    query: "(min-width: 992px) and (max-width: 1199.98px)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px) and (max-width: 1399.98px)",
  });
  const isBigDesktop = useMediaQuery({
    query: "(min-width: 1400px) and (max-width: 1699.98px)",
  });
  const isExtraBigDesktop = useMediaQuery({
    query: "(min-width: 1700px)",
  });

  // Update Redux state when media queries change
  useEffect(() => {
    dispatch(setIsSmallPhone(isSmallPhone));
    dispatch(setIsPhone(isPhone));
    dispatch(setIsTablets(isTablets));
    dispatch(setIsBigTablets(isBigTablets));
    dispatch(setIsDesktop(isDesktop));
    dispatch(setIsBigDesktop(isBigDesktop));
    dispatch(setIsExtraBigDesktop(isExtraBigDesktop));
  }, [
    dispatch,
    isSmallPhone,
    isPhone,
    isTablets,
    isBigTablets,
    isDesktop,
    isBigDesktop,
    isExtraBigDesktop,
  ]);

  // Return Redux state values and current breakpoint
  return {
    isSmallPhone,
    isPhone,
    isTablets,
    isBigTablets,
    isDesktop,
    isBigDesktop,
    isExtraBigDesktop,
  };
};
