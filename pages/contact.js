import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { withRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import scrollTo from "../utils/scrollTo";
import { email, name, phone } from "../utils/validations";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import FooterView from "../components/Footer/Footer";
import View from "../components/View/View";
import Button from "../components/Button/Button";
import InputField from "../components/Form/InputField";
import TextField from "../components/Form/TextField";
import PhoneField from "../components/Form/PhoneField";

const CONTACT = gql`
  mutation Contact($contact: ContactInput!) {
    storeContact(contact: $contact)
  }
`;

const contactSchema = Joi.object({
  phone,
  name,
  email,
});

const Contact = ({
  router: {
    query: { f: scrollToForm },
  },
}) => {
  const { register, errors, handleSubmit, setError } = useForm({
    resolver: joiResolver(contactSchema),
  });
  const [submitted, setSubmitted] = useState(false);
  const [addContact, { data }] = useMutation(CONTACT, {
    onError: (error) => console.log("Apollo contact error", error),
  });

  useEffect(() => {
    if (typeof document !== "undefined" && scrollToForm) {
      scrollTo("contact");
    }
  }, [scrollToForm]);

  const onSubmit = (contact) => {
    addContact({
      variables: { contact },
    });

    setSubmitted(true);
  };

  const formTitle = submitted ? "Thank you!" : "Write to us";
  const form = submitted ? (
    <div className="text-center text-ls text-j-black">
      <div
        className="flex flex-col justify-between pb-48"
        style={{ maxHeight: "100%", height: 500 }}
      >
        <div className="pt-16">We have received your message</div>
        <i
          className="fal fa-check-circle text-j-green py-14"
          style={{ fontSize: 180 }}
        />
        <p>We will get back to you shortly.</p>
      </div>
    </div>
  ) : (
    <form className="py-12" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        icon="fal fa-user"
        placeholder="Enter your name"
        name="name"
        withIcon
        ref={register({ required: true })}
        error={errors && errors.name && "Please enter your name"}
      />
      <PhoneField
        name="phone"
        placeholder="Your 10-digit mobile number"
        ref={register({ required: true })}
        error={errors && errors.phone && "Please enter a valid phone number"}
      />
      <InputField
        placeholder="Your email address"
        type="email"
        name="email"
        icon="fal fa-envelope"
        ref={register({ required: true })}
        error={errors && errors.email && "Please enter a valid email address"}
      />
      <TextField
        name="message"
        placeholder="Write your message here"
        textClassName="h-32"
        ref={register({ required: true })}
        error={errors && errors.message && "Please enter your message"}
      />
      <Button type="submit" className="bg-j-magenta text-j-white w-1/2">
        Send
      </Button>
    </form>
  );

  return (
    <Layout title="Jalesh Cruises">
      <Header style={{ backgroundColor: "white", height: 240 }} light>
        <div className="w-full pt-19">
          <h4 className="text-j-black text-biggest leading-0">Contact us</h4>
        </div>
      </Header>
      <main className="bg-auto text-j-black">
        <View>
          <div className="mb-2">
            <a
              className="flex mb-6"
              href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
            >
              <div
                className="px-8 text-4xl leading-0 text-j-magenta relative"
                style={{ width: 104, top: -5 }}
              >
                <i className="fal fa-phone-alt"></i>
              </div>
              <div>
                <h4 className="leading-0 pb-0">Call</h4>
                <p className="text-sm text-j-gray leading-tiny">
                  {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                </p>
              </div>
            </a>
            <a
              className="flex mb-6"
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
            >
              <div
                className="px-8 text-4xl leading-0 text-j-magenta relative"
                style={{ width: 104, top: -5 }}
              >
                <i className="fab fa-whatsapp"></i>
              </div>
              <div>
                <h4 className="leading-0 pb-0">WhatsApp</h4>
                <p className="text-sm text-j-gray leading-tiny">
                  {process.env.NEXT_PUBLIC_EMAIL_ADDRESS}
                </p>
              </div>
            </a>
            <a
              className="flex mb-6"
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`}
            >
              <div
                className="px-8 text-4xl leading-0 text-j-magenta relative"
                style={{ width: 104, top: -5 }}
              >
                <i className="fal fa-envelope"></i>
              </div>
              <div>
                <h4 className="leading-0 pb-0">Email</h4>
                <p className="text-sm text-j-gray leading-tiny">
                  {process.env.NEXT_PUBLIC_EMAIL_ADDRESS}
                </p>
              </div>
            </a>
            <a
              className="flex mb-6"
              href="#"
              onClick={() => scrollTo("contact")}
            >
              <div
                className="px-8 text-4xl leading-0 text-j-magenta relative"
                style={{ width: 104, top: -5 }}
              >
                <i className="fal fa-pen-nib"></i>
              </div>
              <div>
                <h4 className="leading-0 pb-0">Write to us</h4>
                <p className="text-sm text-j-gray leading-tiny">
                  Use the web form below
                </p>
              </div>
            </a>
          </div>
          <div className="flex pb-14">
            <div className="text-lg px-3">
              <i className="fal fa-map-marker-alt"></i>
            </div>
            <div className="flex-grow text-j-gray text-sm leading-tiny">
              18th Floor, A Wing, Marathon Futurex <br />
              N M Joshi Marg, Lower Parel, <br />
              Mumbai, Maharashtra, India 400013
            </div>
          </div>
        </View>
        <View title={formTitle} theme="blue" id="contact">
          {form}
        </View>
      </main>
      <footer>
        <FooterView showPromoBanner />
      </footer>
    </Layout>
  );
};

export default withRouter(Contact);
