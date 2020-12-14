import React from "react";
import BookingFormView from "./BookingFormView";

export const ConfirmationView = () => {
  return (
    <BookingFormView
      title="Congratulations! We are done."
      buttonText="Return to the homepage"
      onClick={() => {}}
      id="guest-info-form"
    >
      <p>Detailed confirmation or next steps go here</p>
    </BookingFormView>
  );
};

export default ConfirmationView;
