import React from "react";
import View from "../View/View";
import { withRouter } from "next/router";
import goTo from "../../utils/goTo";
import Button from "../Button/Button";

const CertificateView = withRouter(({ router }) => (
  <View
    description="gift card"
    title={
      <>
        A cruise is a truly <b>unique gift</b>
      </>
    }
    theme="green"
  >
    <h2>
      The <b className="font-medium">Jalesh Gift Card</b> is a perfect gift for
      any occasion
    </h2>
    <div className="text-center">
      <i className="far fa-gift-card text-gigantic pb-2"></i>
      <br />
      <span className="inline-block">
        <Button
          className="my-4 mb-10 bg-j-red"
          onClick={goTo(router, "/gift-cards")}
        >
          Buy now
        </Button>
      </span>
    </div>
    <p>
      The value of the gift card can be applied towards the price of any cruise
    </p>
  </View>
));

export default CertificateView;
