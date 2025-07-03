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
  useGetProductList();

  // Filter products based on selected park
  const filteredProducts = useMemo(() => {
    if (!currentPark) {
      return productList; // Show all products if no park is selected
    }

    return productList?.filter((product) => {
      // Check if the product belongs to the selected park
      return product?.parks?.some(
        (park) => park.parkname_localized === currentPark
      );
    });
  }, [productList, currentPark]);

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
