import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import cardIcon from "../../../../assets/icons/card.png";
import paypalIcon from "../../../../assets/icons/paypal.png";
import visaIcon from "../../../../assets/icons/payment.png";

// Add keyframe animation
const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function CardPaymentDetail({ onPaymentComplete, orderData }) {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayFortForm, setShowPayFortForm] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);

  const handlePaymentSuccess = () => {
    console.log('Payment successful, starting redirect countdown...');
    setPaymentStatus('success');
    
    // Start countdown
    let timeLeft = 5;
    const countdownInterval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        window.location.href = '/payment-success';
      }
    }, 1000);

    // Force redirect after 6 seconds (backup)
    setTimeout(() => {
      clearInterval(countdownInterval);
      window.location.href = '/payment-success';
    }, 6000);
  };

  useEffect(() => {
    if (orderData?.tokenizationResponse) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = orderData.tokenizationResponse.actionUrl;
      form.target = 'payfort-iframe';
      form.style.display = 'none';

      Object.entries(orderData.tokenizationResponse.formParameters || {}).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      
      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 1000);

      // Listen for messages from the iframe
      const handleMessage = (event) => {
        console.log('Received message from iframe:', event.data);
        if (event.data && typeof event.data === 'string') {
          if (event.data.includes('Payment Successful') || event.data.includes('payment_successful')) {
            handlePaymentSuccess();
          }
        }
      };

      // Poll iframe content to detect success page
      const pollIframeContent = () => {
        const iframe = document.querySelector('iframe[name="payfort-iframe"]');
        if (iframe) {
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const iframeContent = iframeDoc.body ? iframeDoc.body.innerText : '';
            
            if (iframeContent.includes('Payment Successful') || iframeContent.includes('Redirecting')) {
              handlePaymentSuccess();
            }
          } catch (e) {
            console.log('Cannot access iframe content due to cross-origin restrictions');
          }
        }
      };

      const pollInterval = setInterval(pollIframeContent, 1000);

      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
        clearInterval(pollInterval);
      };
    }
  }, [orderData]);

  return (
    <div className="payment-container">
      <style>{spinnerStyle}</style>
      <h2 className="payment-title">Please enter payment details</h2>

      <div className="payfort-container">
        <div className="iframe-container" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '2rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {isIframeLoading && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div className="loading-spinner" style={{
                width: '40px',
                height: '40px',
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }} />
              <p style={{ color: '#666', margin: 0 }}>Loading secure payment form...</p>
            </div>
          )}
          <iframe
            name="payfort-iframe"
            title="PayFort Payment"
            width="100%"
            height="600"
            frameBorder="0"
            style={{
              border: 'none',
              borderRadius: '8px',
              boxShadow: 'none',
              background: 'transparent',
              opacity: isIframeLoading ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
            onLoad={() => setIsIframeLoading(false)}
          />
        </div>

        {paymentStatus === 'success' && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            textAlign: 'center',
            zIndex: 1000
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="25" fill="#28a745"/>
                <path d="M20 25L23 28L30 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 style={{ margin: '0 0 1rem', color: '#28a745' }}>Payment Successful!</h3>
            <p style={{ margin: '0 0 1rem', color: '#666' }}>
              Redirecting to order details in {countdown} seconds...
            </p>
            <div className="loading-spinner" style={{
              width: '30px',
              height: '30px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #28a745',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }} />
          </div>
        )}
      </div>
    </div>
  );
}
