import React from "react";
import Input from "./Input";
import Field from "./Field";

const InputField = React.forwardRef(
  (
    {
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
      <Input withIcon={!!icon} ref={ref} className={inputClassName} {...rest} />
    </Field>
  )
);

export default InputField;
