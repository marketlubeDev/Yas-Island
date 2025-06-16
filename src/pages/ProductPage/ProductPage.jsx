import React, { useState } from "react";
import ProductHead from "./ProductHead/ProductHead";
import { useSelector } from "react-redux";
import ProductSoloThumbnail from "./ProductSoloThumnail/ProductSoloThumbnail";
import MobSelectorGroup from "./MobSelectorGroup/MobSelectorGroup";
import ProductCard from "./Components/ProductCard";
import SideBar from "../../layouts/SideBar/SideBar";
import ChatWithUsButton from "../../components/buttons/ChatWithUsButton";
import AccessibilityModal from "./Components/AccessibilityModal";
import CartModal from "./Components/CartModal";
import MainProductHead from "./ProductHead/mainProductHead";
import useGetProductList from "../../apiHooks/product/product";
// import PaymentCheckoutBody from "../../PaymentCheckout/Components/PaymentCheckoutBody";

export default function ProductPage() {
  const { isMobile, isTablet } = useSelector((state) => state.responsive);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] =
    useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const { productList, isLoading, isError } = useGetProductList();


  return (
    <div className="product">
      <SideBar />
      <div className="product-content">
        {/* <MainProductHead
          onAccessibilityOpen={() => setIsAccessibilityModalOpen(true)}
          onCartOpen={() => setIsCartModalOpen(true)}
        />
        <ProductHead label="Sort by" /> */}
        <ProductCard productList={productList} />
        {(isMobile || isTablet) && <ProductSoloThumbnail />}
        {(isMobile || isTablet) && <MobSelectorGroup />}
        <AccessibilityModal
          isOpen={isAccessibilityModalOpen}
          onClose={() => setIsAccessibilityModalOpen(false)}
        />
        <CartModal
          isOpen={isCartModalOpen}
          onClose={() => setIsCartModalOpen(false)}
        />
      </div>
    </div>
  );
}
