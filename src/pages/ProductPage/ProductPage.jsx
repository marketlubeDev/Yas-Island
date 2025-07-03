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
  const currentSort = useSelector((state) => state.product.currentSort);

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] =
    useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { isLoading, isError } = useGetProductList();

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
