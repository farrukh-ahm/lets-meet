import React, { useState } from "react";


// Page for editing user information

export default function Edit({ passValue }) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          margin: "40px 10px",
        }}
      >
        <h5 style={{ textTransform: "capitalize" }}>First Name</h5>
        <input
          type="text"
          name="first_name"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          margin: "40px 10px",
        }}
      >
        <h5 style={{ textTransform: "capitalize" }}>Last Name</h5>
        <input
          type="text"
          name="first_name"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div onClick={passValue(first_name, last_name)}></div>
    </div>
  );
}
