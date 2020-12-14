import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import PaymentForm from "./PaymentForm";
import InputField from "../../Form/InputField";
import CheckoutForm from "./CheckoutForm";

const schema = Joi.object({
  upi: Joi.string().min(5).required(),
});

const UPIPaymentForm = ({ booking, billingData, submitRef, setFailed }) => {
  const { register, errors, handleSubmit, setError, getValues } = useForm({
    resolver: joiResolver(schema),
  });
  const [submitted, setSubmitted] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const onSubmit = (data) => {
    setClicked(true);
    if (submitRef && submitRef.current) submitRef.current.click();
  };

  useEffect(() => {
    if (clicked && billingData) {
      setSubmitted(true);
      setClicked(false);
      setShowCheckout(true);
    }
  }, [billingData, clicked]);

  return (
    <>
      <PaymentForm
        buttonText="Verify & Pay"
        onSubmit={handleSubmit(onSubmit)}
        submitted={submitted}
      >
        <InputField
          placeholder="Enter your UPI ID Eg:abc123@upi"
          name="upi"
          ref={register({ required: true })}
          error={errors && errors.upi && "Please enter a correct UPI ID"}
        />
      </PaymentForm>
      {showCheckout ? (
        <CheckoutForm
          booking={booking}
          billingData={billingData}
          {...getValues()}
          cancel={(error) => {
            setShowCheckout(false);
            setSubmitted(false);
            if (error) setFailed(error);
          }}
        />
      ) : null}
    </>
  );
};

export default UPIPaymentForm;
