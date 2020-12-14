import cx from "classnames";

export const SelectorButton = ({
  children,
  className,
  centered,
  bordered,
  fullWidth,
  inverted,
  huge,
  actionable,
  ...rest
}) => (
  <button
    className={cx(
      "block rounded-r-full rounded-l-full leading-none",
      "transition duration-300 ease-in-out",
      "focus:outline-none active:outline-none",
      {
        "border border-j-gray-light": bordered,
        "w-full": fullWidth,
        "text-j-white bg-j-magenta": inverted,
        "bg-j-white": !inverted,
        "text-center": centered,
        "text-left": !centered,
        "text-2xl py-2": huge,
        "text-lg py-4 px-6": !huge,
        "cursor-pointer": !!rest.onClick,
      },
      className
    )}
    {...rest}
  >
    {children}
  </button>
);

export default SelectorButton;
