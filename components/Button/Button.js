import cx from "classnames";

const Button = ({
  onClick,
  children,
  noPadding,
  smallPadding,
  unbold,
  center,
  between,
  fontSize,
  className,
  disabled,
  ...rest
}) => (
  <button
    className={cx(
      "h-12 flex pt-1 items-center rounded-small",
      "transition duration-300 ease-in-out",
      {
        "px-8": !noPadding && !smallPadding,
        "px-4": !noPadding && smallPadding,
        "justify-center": center || !between,
        "justify-between": between,
        "font-bold uppercase": !unbold,
        "bg-j-white": !className.includes("bg-"),
        "bg-opacity-25": disabled,
      },
      fontSize || "text-sm",
      className
    )}
    disabled={disabled}
    onClick={() => onClick && onClick()}
    {...rest}
  >
    {children}
  </button>
);

export const ArrowLinkButton = ({
  right,
  up,
  down,
  onClick,
  children,
  className,
}) => (
  <button
    className={cx(
      "uppercase  leading-7 text-xs text-j-gray",
      {
        "arrow-right": right || (!up && !down),
        "arrow-up": up,
        "arrow-down": down,
      },
      className
    )}
    onClick={() => onClick && onClick()}
  >
    {children}
  </button>
);

export default Button;
