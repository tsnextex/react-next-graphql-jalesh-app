import React, { useState, useContext, useEffect } from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { name, phone } from "../../utils/validations";
import UserContext from "../../store/UserContext";
import { SEND_OTP } from "../../store/ApolloClient";
import InputField from "../Form/InputField";
import PhoneField from "../Form/PhoneField";
import BookingFormView from "./BookingFormView";

const firstSchema = Joi.object({
  phone,
  name,
});

export const ProfileForm = () => {
  const [user, setUser] = useContext(UserContext);
  const [sending, setSending] = useState(false);
  const booking = user.booking || {};

  const { register, errors, handleSubmit, setError } = useForm({
    resolver: joiResolver(firstSchema),
  });
  const [sendOTP, { data }] = useMutation(SEND_OTP, {
    onError: (error) => console.log("Apollo sendOTP error", error),
  });

  useEffect(() => {
    if (data && data.sendOTP) {
      setUser(
        Object.assign({}, user, {
          booking: Object.assign({ OTPSent: true }, booking, data),
        })
      );
    }
  }, [data]);

  const onSubmit = (data) => {
    sendOTP({
      variables: { phone: data.phone.replace(" ", "") },
    });
    setSending(true);

    setUser(
      Object.assign({}, user, {
        booking: Object.assign({}, booking, data),
      })
    );
  };

  return (
    <BookingFormView
      title="Please enter your contact details to continue"
      buttonClassName="bg-j-magenta"
      onClick={handleSubmit(onSubmit)}
      disabled={sending}
      id="profile-form"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          icon="fal fa-user"
          placeholder="Enter your name"
          name="name"
          withIcon
          lessSpace
          defaultValue={user.name}
          ref={register({ required: true })}
          error={errors && errors.name && "Please enter your name"}
        />
        <PhoneField
          name="phone"
          placeholder="Your 10-digit mobile number"
          ref={register({ required: true })}
          lessSpace
          error={
            errors && errors.phone && "Please enter a correct phone number"
          }
        />
        <p className="small">
          We will never share your information with any 3rd party
        </p>
      </form>
    </BookingFormView>
  );
};

export default ProfileForm;
