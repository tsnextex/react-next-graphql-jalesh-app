import React, { useState, useContext, useEffect } from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import UserContext from "../../store/UserContext";
import { SEND_OTP, VERIFY_OTP } from "../../store/ApolloClient";
import { phone } from "../../utils/validations";
import OTPInput from "../OTPInput/OTPInput";
import IconLink from "../IconLink/IconLink";
import PhoneField from "../Form/PhoneField";
import BookingFormView from "./BookingFormView";

const OTPFields = 4;

export const OTPForm = () => {
  const [otp, setOTP] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const booking = user.booking || {};

  const [sendOTP, { data }] = useMutation(SEND_OTP, {
    onError: (error) => console.log("Apollo sendOTP error", error),
  });

  const [verifyOTP, { data: verifyData }] = useMutation(VERIFY_OTP, {
    onError: (error) => {
      console.log("Apollo verifyOTP error", error);
      setError("Wrong OTP, please check!");
      setVerifying(false);
    },
  });

  const handleResend = () => {
    if (sending) return;
    sendOTP({
      variables: { phone: booking.phone.replace(" ", "") },
    });
    setSending(true);
    setError(null);
  };

  const handleVerify = () => {
    if (verifying) return;
    verifyOTP({
      variables: { phone: booking.phone.replace(" ", ""), code: otp },
    });
    setVerifying(true);
  };

  useEffect(() => {
    if (verifyData)
      setUser(
        Object.assign({}, user, {
          booking: Object.assign({}, booking, {
            visitorID: verifyData.verifyOTP,
          }),
        })
      );
  }, [verifyData]);

  return (
    <BookingFormView
      title="Please enter the OTP sent to your mobile number"
      buttonClassName="bg-j-magenta"
      buttonText="View price"
      onClick={handleVerify}
      disabled={otp.length !== OTPFields || verifying}
      id="otp-form"
    >
      <OTPInput
        onChange={(otp) => setOTP(otp)}
        error={error}
        fields={OTPFields}
      />
      <div className="text-sm my-8">
        <PhoneChanger {...{ user, setUser }} />
        <IconLink icon="fal fa-sms" onClick={handleResend}>
          {sending
            ? "Re-sending OTP, please check SMS..."
            : "Did not get OTP? Resend the OTP"}
        </IconLink>
      </div>
    </BookingFormView>
  );
};

export default OTPForm;

const phoneSchema = Joi.object({
  phone,
});

const PhoneChanger = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const { register, errors, handleSubmit, setError } = useForm({
    resolver: joiResolver(phoneSchema),
  });

  const onSubmit = (data) => {
    // TODO: probably need to update the booking now or on submission of OTP
    setUser(
      Object.assign({}, user, {
        booking: Object.assign({}, booking, data),
      })
    );
    setOpen(false);
  };

  return (
    <div className="h-14">
      {open ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <PhoneField
            name="phone"
            placeholder="Your 10-digit mobile number"
            ref={register({ required: true })}
            lessSpace
            error={
              errors && errors.phone && "Please enter a correct phone number"
            }
          />
        </form>
      ) : (
        <IconLink icon="fal fa-mobile" onClick={() => setOpen(true)}>
          Not {user.booking.phone} ? Change number
        </IconLink>
      )}
    </div>
  );
};
