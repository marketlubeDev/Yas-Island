import React, { useEffect, useState } from "react";
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

export default function ProductPage() {
  const { isMobile, isTablet } = useSelector((state) => state.responsive);
  const productList = useSelector((state) => state.product.allProducts);

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] =
    useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { isLoading, isError } = useGetProductList();

  if (isError) {
    return <div>Error loading products...</div>;
  }

  return (
    <div className="product">
      <SideBar />
      <div className="product-content">
        <MainProductHead
          onAccessibilityOpen={() => setIsAccessibilityModalOpen(true)}
          onCartOpen={() => setIsCartModalOpen(true)}
        />
        {/* <ProductHead label="Sort by" /> */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ProductCard productList={productList} />
        )}
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
