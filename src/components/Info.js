import React from "react";
import InfoContainer from "./InfoContainer";


// Component to handle and display user info in neater way
function Info({ user, name }) {
  const { email, phone_number, event_count } = user;
  return (
    <div>
      <InfoContainer title="Name:" value={name} transform="capitalize" />
      <InfoContainer title="Email:" value={email} transform="lowercase" />
      <InfoContainer
        title="Meets Attended:"
        value={event_count}
        transform="capitalize"
      />
      <InfoContainer
        title="Phone Number:"
        value={phone_number}
        transform="capitalize"
      />
    </div>
  );
}

export default Info;
