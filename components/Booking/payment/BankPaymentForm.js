import React, { useState, useEffect } from "react";
import cx from "classnames";
import PaymentForm from "./PaymentForm";
import CheckoutForm from "./CheckoutForm";

const banks = { hdfc: "HDFB", icici: "ICIB", axis: "AXIB", kotak: "162B" };

const BankPaymentForm = ({ booking, billingData, submitRef, setFailed }) => {
  const [bank, setBank] = useState(banks[0]);
  const [submitted, setSubmitted] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
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
      <PaymentForm onSubmit={onSubmit} submitted={submitted}>
        <div className="flex justify-around">
          {Object.keys(banks).map((name) => (
            <BankOption
              name={name}
              key={name}
              selected={bank === name}
              onClick={() => setBank(name)}
            />
          ))}
        </div>
        <a className="block mt-4 text-sm text-j-orange uppercase cursor-pointer">
          More banks
        </a>
      </PaymentForm>
      {showCheckout ? (
        <CheckoutForm
          booking={booking}
          billingData={billingData}
          {...{ bank, code: banks[bank] }}
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

export default BankPaymentForm;

const BankOption = ({ name, selected, onClick }) => (
  <div
    style={{ width: 65 }}
    className="text-center text-j-gray cursor-pointer select-none"
    onClick={onClick}
  >
    <div
      style={{
        width: 65,
        height: 65,
      }}
      className={cx(
        "rounded-full border-2 flex justify-center",
        selected ? "border-j-orange" : "border-transparent"
      )}
    >
      <img
        src={`/images/banks/${name}.png`}
        style={{
          width: 57,
          height: 57,
        }}
        className="rounded-full bg-j-white self-center"
      />
    </div>
    <h1 className="alt">{name}</h1>
  </div>
);
