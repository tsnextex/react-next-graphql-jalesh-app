import React from "react";
import cx from "classnames";
import Button from "../../Button/Button";
import LoadingIcon from "../../Loading/LoadingIcon";

const PaymentForm = ({
  children,
  buttonText = "Make Payment",
  submitted,
  className,
  ...rest
}) => (
  <form className={cx("pt-2 pb-8", className)} {...rest}>
    {children}
    <Button
      className="bg-j-red-light text-j-white w-full mt-6"
      disabled={submitted}
    >
      {submitted ? <LoadingIcon /> : buttonText}
    </Button>
  </form>
);

export default PaymentForm;
