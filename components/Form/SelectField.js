import React from "react";
import Select from "./Select";
import Field from "./Field";

const InputField = React.forwardRef(
  (
    {
      children,
      className,
      inputClassName,
      icon,
      error,
      lessSpace,
      inverseError,
      ...rest
    },
    ref
  ) => (
    <Field
      icon={icon}
      error={error}
      inverseError={inverseError}
      className={className}
      lessSpace={lessSpace}
    >
      <Select withIcon={!!icon} ref={ref} className={inputClassName} {...rest}>
        {children}
      </Select>
    </Field>
  )
);

export default InputField;
