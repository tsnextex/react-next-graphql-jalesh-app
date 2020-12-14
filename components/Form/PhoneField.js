import React from "react";
import Input from "./Input";
import Field from "./Field";
import Select from "./Select";

const countryCodes = [
  "+1",
  "+20",
  "+211",
  "+212",
  "+213",
  "+216",
  "+218",
  "+220",
  "+221",
  "+222",
  "+223",
  "+224",
  "+225",
  "+226",
  "+227",
  "+228",
  "+229",
  "+230",
  "+231",
  "+232",
  "+233",
  "+234",
  "+235",
  "+236",
  "+237",
  "+238",
  "+239",
  "+240",
  "+241",
  "+242",
  "+243",
  "+244",
  "+245",
  "+246",
  "+247",
  "+248",
  "+249",
  "+250",
  "+251",
  "+252",
  "+253",
  "+254",
  "+255",
  "+256",
  "+257",
  "+258",
  "+260",
  "+261",
  "+262",
  "+263",
  "+264",
  "+265",
  "+266",
  "+267",
  "+268",
  "+269",
  "+27",
  "+290",
  "+291",
  "+297",
  "+298",
  "+299",
  "+30",
  "+31",
  "+32",
  "+33",
  "+34",
  "+350",
  "+351",
  "+352",
  "+353",
  "+354",
  "+355",
  "+356",
  "+357",
  "+358",
  "+359",
  "+36",
  "+370",
  "+371",
  "+372",
  "+373",
  "+374",
  "+375",
  "+376",
  "+377",
  "+378",
  "+379",
  "+380",
  "+381",
  "+382",
  "+385",
  "+386",
  "+387",
  "+389",
  "+39",
  "+40",
  "+41",
  "+420",
  "+421",
  "+423",
  "+43",
  "+44",
  "+45",
  "+46",
  "+47",
  "+48",
  "+49",
  "+500",
  "+501",
  "+502",
  "+503",
  "+504",
  "+505",
  "+506",
  "+507",
  "+508",
  "+509",
  "+51",
  "+52",
  "+53",
  "+54",
  "+55",
  "+56",
  "+57",
  "+58",
  "+590",
  "+591",
  "+592",
  "+593",
  "+594",
  "+595",
  "+596",
  "+597",
  "+598",
  "+60",
  "+61",
  "+62",
  "+63",
  "+64",
  "+65",
  "+66",
  "+670",
  "+672",
  "+673",
  "+674",
  "+675",
  "+676",
  "+677",
  "+678",
  "+679",
  "+680",
  "+681",
  "+682",
  "+683",
  "+685",
  "+686",
  "+687",
  "+688",
  "+689",
  "+690",
  "+691",
  "+692",
  "+7",
  "+800",
  "+808",
  "+81",
  "+82",
  "+84",
  "+850",
  "+852",
  "+853",
  "+855",
  "+856",
  "+86",
  "+870",
  "+878",
  "+880",
  "+881",
  "+883",
  "+886",
  "+888",
  "+90",
  "+91",
  "+92",
  "+93",
  "+94",
  "+95",
  "+960",
  "+961",
  "+962",
  "+963",
  "+964",
  "+965",
  "+966",
  "+967",
  "+968",
  "+970",
  "+971",
  "+972",
  "+973",
  "+974",
  "+975",
  "+976",
  "+977",
  "+979",
  "+98",
  "+992",
  "+993",
  "+994",
  "+995",
  "+996",
  "+998",
];

const defaultPrefix = "+93";

const PhoneField = React.forwardRef(
  (
    {
      className,
      error,
      name,
      onChange,
      lessSpace,
      inverseError,
      defaultValue,
      noIcon,
      ...rest
    },
    ref
  ) => {
    const [prefix, number] = (defaultValue || "").split(" ");
    const [value, setValue] = React.useState(defaultValue);
    const countryPrefix = (number && prefix) || defaultPrefix;
    const codeInput = React.useRef(null);
    const phoneInput = React.useRef(null);
    const updateValue = () => {
      const val = `${
        codeInput.current.value.length ? `${codeInput.current.value} ` : ""
      }${phoneInput.current.value}`;
      setValue(val);
      onChange && onChange({ target: { value: val } });
    };

    return (
      <Field
        icon={!noIcon && "fal fa-mobile flex-grow-0"}
        error={error}
        inverseError={inverseError}
        className={className}
        lessSpace={lessSpace}
      >
        <Select
          withIcon={!noIcon}
          ref={codeInput}
          tiny
          className="w-16"
          onChange={updateValue}
          defaultValue={countryPrefix}
          maxLength="4"
        >
          {countryCodes.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </Select>
        <div className="border-l border-j-gray -my-2" />
        <Input
          ref={phoneInput}
          {...rest}
          type="number"
          onChange={updateValue}
          grow
          withIcon
          defaultValue={number || prefix}
          maxLength="10"
        />
        <input ref={ref} name={name} value={value} type="hidden" />
      </Field>
    );
  }
);

export default PhoneField;
