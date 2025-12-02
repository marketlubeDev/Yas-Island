import React, { useEffect } from "react";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../../layouts/Header/Header";
import PaymentSuccessBody from "../../PaymentSuccess/Components/PaymentSuccessBody";
import PaymentResponseBody from "../../PaymentResponse/Components/PaymentResponseBody";
import CardPaymentBody from "../../CardPayment/Desktop/Components/CardPaymentBody";
import PaymentFailed from "../Components/PaymentFailed";
import { clearCart } from "../../../global/cartSlice";
export default function OrderDetailsPage() {
  const { status } = useParams();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const dispatch = useDispatch();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Clear cart and its persisted local storage entry on successful status
  useEffect(() => {
    if (status === "success") {
      // Clear Redux cart state
      dispatch(clearCart());

      // Clear persisted cart from localStorage (redux-persist key)
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.removeItem("persist:yasIslandCart");
        }
      } catch (error) {
        console.debug("Error clearing persisted cart:", error);
      }
    }
  }, [status, dispatch]);

  // If no status is provided, redirect to home
  // if (!status) {
  //   return <Navigate to="/" replace />;
  // }

  // Determine which component to render based on status
  const renderContent = () => {
    if (status === "success") {
      return <PaymentSuccessBody />;
    } else if (
      status === "failed" ||
      status === "failure" ||
      status === "fail" ||
      status === "cancelled" ||
      status === "declined"
    ) {
      return <PaymentFailed />;
    } else {
      // Invalid status, redirect to home
      // return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="payment-checkout-page">
      <Header />
      {renderContent()}
    </div>
  );
}
