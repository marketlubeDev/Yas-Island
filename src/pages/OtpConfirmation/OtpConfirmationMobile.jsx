import React from "react";
import ConfirmEmailMbl from "./MobileComponents/ConfirmEmailMbl";
import MobileHeader from "../Home/MobileComponents/MobileHeader";

function OtpConfirmationMobile() {
  return (
    <>
      <MobileHeader />
      <ConfirmEmailMbl
      // onConfirm={handleConfirmOTP}
      />
    </>
  );
}

export default OtpConfirmationMobile;
