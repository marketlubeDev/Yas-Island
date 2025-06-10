import React, { useState } from "react";
import PaymentCheckoutHeader from "./Components/PaymentCheckoutHeader";
import PaymentCheckoutBody from "./Components/PaymentCheckoutBody";
export default function PaymentCheckout() {
  const [showVerification, setShowVerification] = useState(false);

  return (
    <div style={{ background: "#f4f3f3" }}>
      {/* <PaymentCheckoutHeader /> */}
      <PaymentCheckoutBody
        showVerification={showVerification}
        setShowVerification={setShowVerification}
      />
    </div>
  );
}
