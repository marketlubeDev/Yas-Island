import React, { useEffect } from "react";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import Header from "../../../layouts/Header/Header";
import PaymentSuccessBody from "../../PaymentSuccess/Components/PaymentSuccessBody";
import PaymentResponseBody from "../../PaymentResponse/Components/PaymentResponseBody";
import CardPaymentBody from "../../CardPayment/Desktop/Components/CardPaymentBody";
import PaymentFailed from "../Components/PaymentFailed";
export default function OrderDetailsPage() {
  const { status } = useParams();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(status, "statussdsdsds");

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
