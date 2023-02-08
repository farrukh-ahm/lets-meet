import React from "react";

export default function InfoContainer({ title, value, transform }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        margin: "25px 0",
      }}
    >
      <p style={{ textTransform: "capitalize" }}>{title}</p>
      <p style={{ textTransform: transform }}>{value}</p>
    </div>
  );
}
