import React, { useState, useMemo } from "react";
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
  const currentPark = useSelector((state) => state.product.currentPark);

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] =
    useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { isLoading, isError } = useGetProductList();

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
          <ProductCard productList={filteredProducts} />
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
