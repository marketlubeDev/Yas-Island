import { useEffect } from 'react';

export default function AmazonPayDemoButton() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static-na.payments-amazon.com/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.amazon) {
        window.amazon.Pay.renderButton('#AmazonPayButton', {
          merchantId: 'A1QXXEXAMPLE', // Fake or sandbox merchantId
          publicKeyId: 'SANDBOX-PUB-KEY', // Fake public key
          ledgerCurrency: 'USD',
          checkoutLanguage: 'en_US',
          productType: 'PayOnly',
          placement: 'Cart',
          sandbox: true,
          createCheckoutSessionConfig: {
            payloadJSON: JSON.stringify({
              webCheckoutDetails: {
                checkoutReviewReturnUrl: 'https://example.com/thank-you'
              }
            }),
            signature: 'DUMMY_SIGNATURE_FOR_DEMO_PURPOSES',
            publicKeyId: 'SANDBOX-PUB-KEY'
          }
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    // <div className="mt-10 text-center">
    //   <div id="AmazonPayButton"></div>
    //   <p className="text-sm text-gray-500 mt-4">
    //     This is a demo. Amazon modal will appear, but checkout will not complete.
    //   </p>
    // </div>
    <div>
      <div id="AmazonPayButton"></div>
    </div>
  );
}
