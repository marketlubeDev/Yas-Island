import React from "react";

function ErrorFallback({ onRetry }) {
  return (
    <div
      role="alert"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--color-base-bg)",
        color: "var(--color-email-form-label)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2147483647,
        padding: 16,
      }}
    >
      <div
        style={{
          width: "min(560px, 92vw)",
          textAlign: "center",
          border: "1px solid var(--ip-bodr-btm)",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          background: "var(--color-base-bg)",
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 8 }}>Something went wrong</h2>
        <p style={{ opacity: 0.8, marginTop: 0, marginBottom: 20 }}>
          Were having trouble loading this page. Please try again.
        </p>
        <button
          type="button"
          onClick={onRetry}
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            border: "1px solid var(--color-email-form-confirm-btn)",
            background: "var(--color-email-form-confirm-btn)",
            color: "var(--color-email-form-confirm-btn-clr)",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Reload
        </button>
      </div>
    </div>
  );
}

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    try {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught: ", error, errorInfo);
    } catch {}
  }

  handleRetry() {
    try {
      this.setState({ hasError: false });
      window.location.reload();
    } catch {
      // no-op
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
