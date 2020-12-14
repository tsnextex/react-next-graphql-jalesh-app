import cx from "classnames";
import Button from "../Button/Button";

export const BookingFormView = ({
  children,
  title,
  buttonText = "Calculate Price",
  buttonClassName = "bg-j-red-light",
  disabled,
  id,
  ...rest
}) => (
  <div className="my-24" id={id}>
    <h2>{title}</h2>
    {children}
    <Button
      disabled={disabled}
      className={cx(
        "w-full mt-10 text-j-white",
        disabled ? "bg-j-gray-lighter" : buttonClassName
      )}
      {...rest}
    >
      {buttonText}
    </Button>
  </div>
);

export default BookingFormView;
