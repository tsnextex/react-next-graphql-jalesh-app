import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import UserContext from "../../../store/UserContext";
import { email, phone, name } from "../../../utils/validations";
import scrollTo from "../../../utils/scrollTo";
import RadioField from "../../Form/RadioField";
import InputField from "../../Form/InputField";
import PhoneField from "../../Form/PhoneField";
import SummaryView from "../SummaryView";
import BankPaymentForm from "./BankPaymentForm";
import CardPaymentForm from "./CardPaymentForm";
import UPIPaymentForm from "./UPIPaymentForm";

const schema = Joi.object({
  name,
  phone,
  email,
});

export const PaymentView = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [billingData, setBillingData] = useState(null);
  const [isFailed, setFailed] = useState(
    new URLSearchParams(window.location.search).get("fail")
  );
  const { register, errors, handleSubmit, setError } = useForm({
    resolver: joiResolver(schema),
  });
  const submitRef = useRef(null);

  const booking = user.booking || {};
  console.log("Booking", booking);

  const submitHandler = handleSubmit((data) => {
    setBillingData(data);
  });

  const setFailedError = (error) => {
    setFailed(error);
    if (error) scrollTo("payment");
  };

  return (
    <>
      <h1 id="payment">{isFailed ? "Request failed!" : "Payment"}</h1>
      {isFailed ? (
        <div className="bg-j-yellow text-j-black rounded-big p-3 my-4">
          <h1 className="text-base font-medium pb-0">
            <i className="far fa-exclamation-triangle text-2xl pr-1" />
            Payment failed. Please try again!
          </h1>
          <p className="text-xs leading-relaxed">
            Somehow, we couldn't receive your payment. Any amount deducted from
            your account will be refunded in 7 working days.
          </p>
        </div>
      ) : null}
      <SummaryView booking={booking} />

      <h1 className="alt">Billing details</h1>

      <form onSubmit={submitHandler}>
        <InputField
          placeholder="Full name"
          name="name"
          lessSpace
          defaultValue={booking.name}
          ref={register({ required: true })}
          error={errors && errors.name && "Please enter your full name"}
        />
        <PhoneField
          name="phone"
          placeholder="Phone number"
          ref={register({ required: true })}
          lessSpace
          defaultValue={booking.phone}
          noIcon
          error={
            errors && errors.phone && "Please enter a correct phone number"
          }
        />
        <InputField
          placeholder="Email address"
          type="email"
          name="email"
          lessSpace
          ref={register({ required: true })}
          error={errors && errors.email && "Please enter a valid email address"}
        />
        <button type="submit" style={{ display: "none" }} ref={submitRef} />
      </form>

      <h1 className="alt">Payment options</h1>

      <span className="text-j-gray">
        <RadioField
          name="paymentOption"
          defaultValue="card"
          options={[
            {
              value: "card",
              label: "Credit Card / Debit Card",
              view: (
                <CardPaymentForm
                  booking={booking}
                  billingData={billingData}
                  submitRef={submitRef}
                  setFailed={setFailedError}
                />
              ),
            },
            {
              value: "bank",
              label: "Net Banking",
              view: (
                <BankPaymentForm
                  booking={booking}
                  billingData={billingData}
                  submitRef={submitRef}
                  setFailed={setFailedError}
                />
              ),
            },
            {
              value: "upi",
              label: "UPI",
              view: (
                <UPIPaymentForm
                  booking={booking}
                  billingData={billingData}
                  submitRef={submitRef}
                  setFailed={setFailedError}
                />
              ),
            },
          ]}
        />
      </span>
    </>
  );
};

export default PaymentView;
