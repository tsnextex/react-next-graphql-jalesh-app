import React from "react";
import cx from "classnames";

const Input = React.forwardRef(
  ({ className, withIcon, tiny, grow, noClear, ...rest }, ref) => {
    const [isFilled, setFilled] = React.useState(false);
    const [clear, setClear] = React.useState(false);
    const inputRef = React.useRef();

    React.useEffect(() => {
      if (!clear) return;

      const inputs =
        inputRef.current && inputRef.current.getElementsByTagName("input");
      if (inputs && inputs[0]) {
        inputs[0].value = "";
        inputs[0].focus();
        setFilled(false);
      }

      setClear(false);
    }, [clear]);

    return (
      <div
        className={cx(
          "flex",
          { "w-full": !tiny, "flex-grow": grow },
          className
        )}
        ref={inputRef}
      >
        <input
          className={cx(
            "flex-grow max-w-full placeholder-j-gray-lighter text-j-magenta text-sm  self-center pt-1 leading-none border-0 focus:outline-none",
            { "ml-2": withIcon }
          )}
          onChange={(e) => setFilled(e.target.value.length > 0)}
          ref={ref}
          {...rest}
        />
        {!noClear && isFilled && (
          <i
            className="fal fa-times-circle text-j-gray cursor-pointer text-lg ml-2 self-center"
            onClick={() => setClear(true)}
          />
        )}
      </div>
    );
  }
);

export const TextArea = React.forwardRef(
  ({ className, children, withIcon, ...rest }, ref) => (
    <textarea
      className={cx(
        "flex-grow placeholder-j-gray-lighter text-j-magenta text-sm leading-4 border-0 focus:outline-none mt-1",
        {
          "ml-2": withIcon,
        },
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </textarea>
  )
);

export default Input;
