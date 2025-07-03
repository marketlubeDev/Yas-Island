import React, { useMemo } from "react";
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
  useGetProductList();

  // Filter and sort products based on selected park and sort option
  const filteredProducts = useMemo(() => {
    let filtered = productList;

    // Filter by park if selected
    if (currentPark) {
      filtered = productList?.filter((product) => {
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
        return defaultVariant?.gross || 0;
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
  }, [productList, currentPark, currentSort]);

  return (
    <div className="mobile-product-page">
      <MobileHeader className="mobile-header" />
      <MobileTop className="mobile-topnav" />
      <MobileBottomNav className="mobile-bottomnav" />
      <div className="scroll-section">
        <AttractionsListMbl productList={filteredProducts} />
      </div>
    </div>
  );
}

export default MobileProductPage;
