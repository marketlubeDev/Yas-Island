import React, { useEffect } from "react";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import PaymentSuccessMobile from "../../PaymentSuccess/PaymentSuccessMobile";
import PaymentResponseMobile from "../../PaymentResponse/PaymentResponseMobile";
import PaymentFailed from "../Components/PaymentFailed";

export default function OrderDetailsMobile() {
  const { status } = useParams();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If no status is provided, redirect to home
  if (!status) {
    return <Navigate to="/" replace />;
  }

  // Determine which component to render based on status
  if (status === "success") {
    return <PaymentSuccessMobile />;
  } else if (status === "fail" || status === "failed" || status === "failure") {
    return <PaymentFailed />;
  } else {
    // Invalid status, redirect to home
    return <Navigate to="/" replace />;
  }
}
