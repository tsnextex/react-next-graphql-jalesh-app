import React from "react";
import { withRouter } from "next/router";
import View from "../View/View";
import Button from "../Button/Button";
import goTo from "../../utils/goTo";

const PromotionView = withRouter(({ router }) => (
  <View
    description="Cruise certificate"
    title="Unpredictable schedule?"
    theme="red"
  >
    <h3 className="uppercase leading-9 pb-5">book now, decide later</h3>
    <h4>
      Purchase a <b>cruise certificate</b> and choose your cruise date later
    </h4>
    <Button
      className="text-j-magenta mb-6"
      onClick={goTo(router, "/certificates")}
    >
      Book now
    </Button>
  </View>
));

export default PromotionView;
