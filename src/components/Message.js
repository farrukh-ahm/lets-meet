import React from "react";
import { Alert } from "react-bootstrap";

// Handling Alert Messages

function Message({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default Message;
