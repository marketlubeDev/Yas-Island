import React from "react";
import MobileBottomNav from "./Components/MobilebottomNav";
import MobileHeader from "./Components/MobileHeader";
import MobileTop from "./Components/MobileTop";
import AttractionsList from "./Components/AttractionsList";
import { useSelector } from "react-redux";
import useGetProductList from "../../../apiHooks/product/product";


function MobileProductPage() {
  const productList = useSelector((state) => state.product.allProducts);
  const { isLoading, isError } = useGetProductList();



  return (
    <div className="mobile-product-page">
      <MobileHeader className="mobile-header" />
      <MobileTop className="mobile-topnav" />
      <MobileBottomNav className="mobile-bottomnav" />
      <div className="scroll-section">
        <AttractionsList productList={productList} />
      </div>
      
    </div>
  );
}

export default MobileProductPage;
