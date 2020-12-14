import React from "react";
import View from "../View/View";
import Button from "../Button/Button";

const PlannerView = () => (
  <View
    description="planner"
    title={
      <>
        <b>Plan a cruise</b> with friends
      </>
    }
    theme="magenta"
  >
    <h2 className="text-j-orange">
      Easily coordinate with friends to plan your cruise holiday
    </h2>
    <h4>
      <b>Step 1:</b> Choose a cruise
    </h4>
    <h4>
      <b>Step 2:</b> Decide who is paying
    </h4>
    <h4>
      <b>Step 3:</b> Share the link with friends
    </h4>
    <h4>
      <b>Step 4:</b> Everyone RSVPs
    </h4>
    <Button className="text-j-magenta my-4">Start now</Button>
  </View>
);

export default PlannerView;
