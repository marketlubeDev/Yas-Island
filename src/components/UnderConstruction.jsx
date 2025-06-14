import React from "react";

const UnderConstruction = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>
        🚧 Under Construction 🚧
      </h1>
      <p style={{ color: "#666", fontSize: "18px" }}>
        We're currently working on our mobile experience. Please visit us on a
        desktop device.
      </p>
    </div>
  );
};

export default UnderConstruction;
