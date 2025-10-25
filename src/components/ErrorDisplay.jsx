import React from "react";

const ErrorDisplay = ({ message }) => {
  return (
    <div className="card" style={{ display: "flex" }}>
      <p className="errorDisplay">{message}</p>
    </div>
  );
};

export default ErrorDisplay;
