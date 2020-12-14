import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { cvv, date } from "../../../utils/validations";
import InputField from "../../Form/InputField";
import PaymentForm from "./PaymentForm";
import CheckoutForm from "./CheckoutForm";

const schema = Joi.object({
  cardNumber: Joi.string().creditCard().required(),
  date,
  cvv,
});

const CardPaymentForm = ({ booking, billingData, submitRef, setFailed }) => {
  const { register, errors, handleSubmit, setError, getValues } = useForm({
    resolver: joiResolver(schema),
  });
  const [type, setType] = useState("text");
  const [submitted, setSubmitted] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const onSubmit = () => {
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
      <PaymentForm onSubmit={handleSubmit(onSubmit)} submitted={submitted}>
        <InputField
          placeholder="Card number"
          name="cardNumber"
          lessSpace
          ref={register({ required: true })}
          error={
            errors && errors.cardNumber && "Please enter a valid card number"
          }
        />
        <div className="flex">
          <div className="flex-grow mr-6">
            <InputField
              type={type}
              onFocus={() => setType("month")}
              onBlur={() => setType("text")}
              placeholder="Expiry"
              name="date"
              lessSpace
              ref={register({ required: true })}
              error={
                errors && errors.date && "Please enter a valid expiry date"
              }
            />
          </div>
          <InputField
            className="w-24"
            placeholder="CVV"
            name="cvv"
            maxLength="3"
            lessSpace
            noClear
            ref={register({ required: true })}
            error={errors && errors.cvv && "Please check the CVV"}
          />
        </div>
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

export default CardPaymentForm;
