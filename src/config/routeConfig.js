// Route configuration with title and favicon metadata
export const routeConfig = {
  "/": {
    titleKey: "pageTitle.home",
    favicon: "/fav.png",
  },
  "/email-verification": {
    titleKey: "pageTitle.emailVerification",
    favicon: "/fav.png",
  },
  "/otp-confirmation": {
    titleKey: "pageTitle.otpConfirmation",
    favicon: "/fav.png",
  },
  "/payment-details": {
    titleKey: "pageTitle.paymentDetails",
    favicon: "/fav.png",
  },
  "/card-payment": {
    titleKey: "pageTitle.cardPayment",
    favicon: "/fav.png",
  },
  "/payment-success": {
    titleKey: "pageTitle.paymentSuccess",
    favicon: "/fav.png",
  },
  "/payment-response": {
    titleKey: "pageTitle.paymentResponse",
    favicon: "/fav.png",
  },
  "/upcoming": {
    titleKey: "pageTitle.upcoming",
    favicon: "/fav.png",
  },
  "/packages": {
    titleKey: "pageTitle.packages",
    favicon: "/fav.png",
  },
};

// Helper function to get route config
export const getRouteConfig = (pathname) => {
  return routeConfig[pathname] || routeConfig["/"];
};