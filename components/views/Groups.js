import React from "react";
import View from "../View/View";
import Card from "../Card/Card";

const GroupsView = () => (
  <View
    description="group booking"
    title={
      <>
        Need 16 or more <b>state rooms?</b>
      </>
    }
    theme="darkblue"
  >
    <Card
      title="Vows on the Waves"
      className="text-j-blue-vibrant"
      src="/images/wedding.jpg"
    >
      Host the ultimate destination wedding
    </Card>
    <Card
      title="Off-sites Onboard"
      className="text-j-blue-vibrant"
      src="/images/team.jpg"
    >
      Inspire your employees with a unique company off-site
    </Card>
    <Card
      title="Redefine the Pitch"
      className="text-j-blue-vibrant"
      src="/images/conference.jpg"
    >
      Take your sales conferences to the next level
    </Card>
  </View>
);

export default GroupsView;
