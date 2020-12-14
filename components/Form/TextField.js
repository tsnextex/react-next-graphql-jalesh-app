import React from "react";
import Field from "./Field";
import { TextArea } from "./Input";

const TextField = React.forwardRef(
  ({ className, textClassName, icon, error, children, ...rest }, ref) => (
    <Field icon={icon} error={error} className={className}>
      <TextArea className={textClassName} ref={ref} withIcon={!!icon} {...rest}>
        {children}
      </TextArea>
    </Field>
  )
);

export default TextField;
