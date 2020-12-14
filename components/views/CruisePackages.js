import React from "react";
import View from "../View/View";

const CruisePackagesView = () => (
  <View
    description="cruise packages"
    title={
      <>
        Your cruise holiday begins at <b>your doorstep</b>
      </>
    }
  >
    <hr className="border-t-2 border-j-gray-lighter w-3/4 mb-5 " />
    <h2 className="text-j-gray">
      You pack your bags, we will take care of your holiday planning
    </h2>
    <div className="flex justify-between text-j-magenta text-5xl mt-4 mb-12">
      <i className="fal fa-ship"></i>
      <i className="fal fa-plane fa-rotate-270"></i>
      <i className="fal fa-hotel"></i>
      <i className="fal fa-taxi"></i>
    </div>

    <h4>
      Save more by booking your <span className="text-j-orange">flights</span>,{" "}
      <span className="text-j-orange">hotels</span>, and{" "}
      <span className="text-j-orange">cabs</span> while booking your cruise.
    </h4>
  </View>
);

export default CruisePackagesView;
