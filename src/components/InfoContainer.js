import React from "react";

export default function InfoContainer({ title, value, transform }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        margin: "40px 10px",
      }}
    >
      <h5 style={{ textTransform: "capitalize" }}>{title}</h5>
      <h5 style={{ textTransform: transform }}>{value}</h5>
    </div>
  );
}
