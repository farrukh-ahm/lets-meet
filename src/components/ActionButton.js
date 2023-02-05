import React from "react";
import { Button } from "react-bootstrap";

function ActionButton({ color, title, action }) {
  return (
    <Button type="button" className="btn btn-block my-1" variant={color}>
      {title}
    </Button>
  );
}

export default ActionButton;
