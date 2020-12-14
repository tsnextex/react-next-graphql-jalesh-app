import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import cx from "classnames";
import Joi from "joi";
import { email, name, phone } from "../utils/validations";
import scrollTo from "../utils/scrollTo";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import View from "../components/View/View";
import InputField from "../components/Form/InputField";
import PhoneField from "../components/Form/PhoneField";
import TextField from "../components/Form/TextField";
import Button from "../components/Button/Button";
import SelectorButton from "../components/Button/SelectorButton";
import FooterView from "../components/Footer/Footer";

import logoStyles from "../components/Header/Header.module.css";

const bigInputClass =
  "border border-j-gray-light rounded-r-full rounded-l-full w-full text-2xl leading-none text-center mb-8 py-2 focus:outline-none active:outline-none text-j-magenta";

const FORM_KEYS = [
  "name",
  "phone",
  "email",
  "client_name",
  "client_phone",
  "client_email",
  "message",
];

const schema = Joi.object({
  phone,
  name,
  email,
  client_phone: phone,
  client_name: name,
  client_email: email,
});

export default function GiftCardPage() {
  const {
    register,
    errors,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
  } = useForm({ resolver: joiResolver(schema) });
  const [formData, setFormData] = React.useState({ value: 0 });
  const [step, setStep] = React.useState(1);

  const onPriceClick = (price) => {
    setFormData(Object.assign({}, formData, { value: parseInt(price) || 0 }));
    if ((price || formData.value) && step < 2) setStep(2);
    return true;
  };

  const onSubmit = (data) => {
    const payload = { ...data, ...formData };
    console.log("payload", payload);
  };

  React.useEffect(() => {
    const key = FORM_KEYS.filter((key) => errors[key])[0];
    if (key) {
      setTimeout(() => scrollTo(key === "message" ? "step-3" : "step-2"), 300);
    }
  }, [errors]);

  React.useEffect(() => {
    if (
      step === 2 &&
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.client_name &&
      formData.client_phone &&
      formData.client_email
    ) {
      setStep(3);
    }
  }, [formData]);

  return (
    <Layout title="Jalesh Cruises">
      <Header
        style={{
          backgroundColor: "#9AA32B",
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <div className="text-j-white py-14 flex-grow">
          <h1 className="font-bold">Jalesh Gift Card</h1>
          <h2>A perfect e-gift card for the most special occasions</h2>
          <div className="text-center">
            <i className="far fa-gift-card text-gigantic pb-12"></i>
          </div>
          <h4 className="leading-8">
            The recipient may apply the full value of the gift card towards
            booking a cruise or for spending on board the ship. The Jalesh Gift
            Card has lifetime validity.
          </h4>
        </div>
      </Header>
      <main className="bg-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <View
            description="Step 1"
            id="step-1"
            className={step < 1 ? "hidden" : ""}
          >
            <h2 className="font-medium">Choose gift card value</h2>
            <PriceButton {...{ formData, onPriceClick }} value={50000}>
              50,000
            </PriceButton>
            <PriceButton {...{ formData, onPriceClick }} value={100000}>
              1,00,000
            </PriceButton>
            <PriceButton {...{ formData, onPriceClick }} value={200000}>
              2,00,000
            </PriceButton>
            <input
              className={cx(
                bigInputClass,
                "placeholder-j-gray-lighter focus:outline-none"
              )}
              type="number"
              maxLength="9"
              min="0"
              max="999999999"
              ref={register()}
              name="manual_value"
              placeholder="&#x20B9; Custom value"
              onChange={(e) =>
                onPriceClick(parseInt(e.target.value)) && e.preventDefault()
              }
            />
          </View>
          <View
            description="Step 2"
            theme="blue"
            id="step-2"
            className={step < 2 ? "hidden" : ""}
          >
            <h2 className="font-medium pb-6">Contact details</h2>
            <h4 className="pt-6 pb-0">Recipient information</h4>
            <p className="text-xs leading-tiny pb-4 pt-2 text-j-red-live">
              Please provide accurate information. The recipient details will be
              required at the time of using the gift card.
            </p>

            <InputField
              icon="fal fa-user"
              placeholder="Recipient's full name"
              name="name"
              id="name"
              lessSpace
              ref={register({ required: true })}
              onChange={(e) =>
                setFormData(
                  Object.assign({}, formData, { name: e.target.value })
                )
              }
              error={errors && errors.name && "Please enter recipient's name"}
            />
            <PhoneField
              name="phone"
              id="phone"
              placeholder="Recipient's 10-digit mobile number"
              lessSpace
              ref={register({ required: true })}
              onChange={(e) =>
                setFormData(
                  Object.assign({}, formData, { phone: e.target.value })
                )
              }
              error={
                errors && errors.phone && "Please enter a valid phone number"
              }
            />
            <InputField
              placeholder="Recipient's email address"
              type="email"
              name="email"
              id="email"
              lessSpace
              icon="fal fa-envelope"
              ref={register({ required: true })}
              onChange={(e) =>
                setFormData(
                  Object.assign({}, formData, { email: e.target.value })
                )
              }
              error={
                errors && errors.email && "Please enter a valid email address"
              }
            />

            <h4 className="py-2">Your information</h4>

            <InputField
              icon="fal fa-user"
              placeholder="Your full name"
              name="client_name"
              id="client_name"
              lessSpace
              ref={register({ required: true })}
              onChange={(e) =>
                setFormData(
                  Object.assign({}, formData, { client_name: e.target.value })
                )
              }
              error={errors && errors.client_name && "Please enter your name"}
            />
            <PhoneField
              name="client_phone"
              id="client_phone"
              placeholder="Your 10-digit mobile number"
              lessSpace
              ref={register({ required: true })}
              onChange={(e) =>
                setFormData(
                  Object.assign({}, formData, { client_phone: e.target.value })
                )
              }
              error={
                errors &&
                errors.client_phone &&
                "Please enter a valid phone number"
              }
            />
            <InputField
              placeholder="Your email address"
              type="email"
              name="client_email"
              id="client_email"
              lessSpace
              icon="fal fa-envelope"
              ref={register({ required: true })}
              onChange={(e) =>
                setFormData(
                  Object.assign({}, formData, { client_email: e.target.value })
                )
              }
              error={
                errors &&
                errors.client_email &&
                "Please enter a valid email address"
              }
            />
          </View>
          <View
            description="Step 3"
            id="step-3"
            className={step < 3 ? "hidden" : ""}
          >
            <h2 className="font-medium pb-6">Personalize the card</h2>
            <TextField
              name="message"
              id="message"
              placeholder="Write your message here"
              textClassName="h-24"
              ref={register()}
              onChange={(e) =>
                setFormData(
                  Object.assign({}, formData, { message: e.target.value })
                )
              }
              error={errors && errors.message && "Please enter your message"}
            />
            <h4 className="py-2">Preview</h4>
            <Preview {...formData} />
            <Button
              className="w-full bg-j-green-light text-j-white mb-24"
              type="submit"
            >
              Proceed to pay
            </Button>
          </View>
        </form>
      </main>
      <footer>
        <FooterView />
      </footer>
    </Layout>
  );
}

const PLACEHOLDER = "xxxxxxxxxx";

const Preview = ({ client_name, name, phone, email, value }) => (
  <div
    className="mb-20 mt-4 rounded-big"
    style={{ boxShadow: "#00000029 0 15pt 30pt" }}
  >
    <div
      className="rounded-t-big bg-j-magenta overflow-visible mb-1 flex flex-col"
      style={{ height: 70 }}
    >
      <div className={cx(logoStyles.logo, "self-center mt-6")}>
        <img src="/images/logo.png" />
      </div>
    </div>
    <div className="rounded-b-big p-5 pt-20">
      <div className="text-center text-j-magenta">
        <h2 className="leading-9">
          You've got a <br />
          <b>Jalesh Gift Card</b>
        </h2>
      </div>
      <p className="pb-4">
        Dear <b>{name || PLACEHOLDER}</b>,
      </p>
      <p>
        You have received a Jalesh Cruises Gift Card from{" "}
        <b>{client_name || PLACEHOLDER}</b>!
      </p>
      <div className="text-center mb-4 mx-4">
        <p className="text-xs leading-tiny text-j-gray pt-4">Card value</p>
        <SelectorButton
          centered
          fullWidth
          bordered
          huge
          className="text-j-magenta mb-8"
        >
          &#x20B9; {(value || 0).toLocaleString("hi-IN")}
        </SelectorButton>
        <p className="text-xs leading-tiny text-j-gray">Card number</p>
        <SelectorButton
          centered
          fullWidth
          bordered
          huge
          inverted
          className="mb-8"
        >
          <span className="text-j-white text-lg">XXX-XXX-XXX-XXX</span>
        </SelectorButton>
      </div>
      <p className="text-xs leading-tiny pb-2">
        To use the gift card, please enter the gift card number at the time of
        booking a cruise with Jalesh Cruises.
      </p>
      <p className="text-tiny text-j-gray leading-relaxed pb-2">
        To verify that you are the intended recipient, you must use the
        following contact details at the time of booking:
      </p>
      <div className="rounded-big border border-j-gray-lighter px-7 py-5 bg-j-blue-lighter mb-16">
        <p className="text-xs leading-tiny text-j-gray">Registered mobile:</p>
        <h4 className="text-j-magenta pb-4">{phone || PLACEHOLDER}</h4>
        <p className="text-xs leading-tiny text-j-gray">Registered email:</p>
        <h4 className="text-j-magenta pb-4">{email || PLACEHOLDER}</h4>
      </div>
    </div>
  </div>
);

const PriceButton = ({ formData, value, onPriceClick, children }) => (
  <SelectorButton
    fullWidth
    centered
    bordered
    huge
    inverted={formData.value === value}
    className={cx("mb-8", { "text-j-magenta": formData.value !== value })}
    onClick={(e) => onPriceClick(value) && e.preventDefault()}
  >
    &#x20B9; {children}
  </SelectorButton>
);
