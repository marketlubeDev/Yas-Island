import React, { useMemo, useEffect, useRef } from "react";
import MobileBottomNav from "../../Home/MobileComponents/MobilebottomNav";
import MobileHeader from "../../Home/MobileComponents/MobileHeader";
import MobileTop from "../../Home/MobileComponents/MobileTop";
import AttractionsListMbl from "./Components/AttractionsListMbl";
import { useSelector } from "react-redux";
import useGetProductList from "../../../apiHooks/product/product";

function MobileProductPage() {
  const productList = useSelector((state) => state.product.allProducts);
  const currentPark = useSelector((state) => state.product.currentPark);
  const currentSort = useSelector((state) => state.product.currentSort);
  const searchQuery = useSelector((state) => state.product.searchQuery);

  const { isLoading, isError } = useGetProductList();

  // Filter and sort products based on search, selected park and sort option
  const filteredProducts = useMemo(() => {
    let filtered = productList;

    // Filter by search query if provided
    if (searchQuery) {
      filtered = filtered?.filter((product) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          product?.product_title?.toLowerCase().includes(searchLower) ||
          product?.productshortdesc?.toLowerCase().includes(searchLower) ||
          product?.parks?.some((park) =>
            park.parkname_localized?.toLowerCase().includes(searchLower)
          )
        );
      });
    }

    // Filter by park if selected
    if (currentPark) {
      filtered = filtered?.filter((product) => {
        // Check if the product belongs to the selected park
        return product?.parks?.some(
          (park) => park.parkname_localized === currentPark
        );
      });
    }

    // Sort products if sort option is selected
    if (currentSort && filtered) {
      const getProductPrice = (product) => {
        const defaultVariant = product?.product_variants?.find(
          (variant) => variant.isdefault
        );
        // If no default variant found, use the first variant
        const variantToUse = defaultVariant || product?.product_variants?.[0];
        return variantToUse?.gross || 0;
      };

      filtered = [...filtered].sort((a, b) => {
        const priceA = getProductPrice(a);
        const priceB = getProductPrice(b);

        if (
          currentSort === "Price (High to Low)" ||
          currentSort === "السعر (من الأعلى إلى الأقل)"
        ) {
          return priceB - priceA; // High to Low
        } else if (
          currentSort === "Price (Low to High)" ||
          currentSort === "السعر (من الأقل إلى الأعلى)"
        ) {
          return priceA - priceB; // Low to High
        }
        return 0;
      });
    }

    return filtered || [];
  }, [productList, currentPark, currentSort, searchQuery]);

  const containerRef = useRef(null);

  // Scroll to top on component mount (page refresh)
  useEffect(() => {
    // Disable scroll restoration to prevent browser from restoring scroll position
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Also scroll the scroll-section to top if it exists
    const scrollSection = document.querySelector(".scroll-section");
    if (scrollSection) {
      scrollSection.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    const computeAndSetOffsets = () => {
      const headerEl = document.querySelector(".mobile-header");
      const topEl = document.querySelector(".mobile-topnav");
      const headerH = headerEl ? headerEl.offsetHeight : 0;
      const topH = topEl ? topEl.offsetHeight : 0;
      const total = headerH + topH - 24;
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--mobile-content-top-offset",
          `${total}px`
        );
        containerRef.current.style.setProperty(
          "--mobile-header-height",
          `${headerH}px`
        );
        containerRef.current.style.setProperty(
          "--mobile-topnav-height",
          `${topH}px`
        );
      }
    };

    computeAndSetOffsets();
    window.addEventListener("resize", computeAndSetOffsets);
    window.addEventListener("orientationchange", computeAndSetOffsets);
    return () => {
      window.removeEventListener("resize", computeAndSetOffsets);
      window.removeEventListener("orientationchange", computeAndSetOffsets);
    };
  }, []);

  return (
    <div ref={containerRef} className="mobile-product-page">
      <MobileHeader className="mobile-header" />
      <MobileTop className="mobile-topnav" />
      <div className="scroll-section">
        <AttractionsListMbl
          productList={filteredProducts}
          isLoading={isLoading}
        />
      </div>
      <MobileBottomNav className="mobile-bottomnav" />
    </div>
  );
}

export default MobileProductPage;
