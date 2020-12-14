import React from "react";
import View from "../View/View";
import Card from "../Card/Card";

const ShipView = () => (
  <View
    description="the ship"
    title={
      <>
        The journey is the <b>destination</b>
      </>
    }
  >
    <Card
      title="A Floating City"
      className="text-j-orange"
      src="/images/karnika.jpeg"
    >
      The <b>Karnika</b> is as large as a small city!
    </Card>
    <Card
      title="A Palace on the Waves"
      className="text-j-orange"
      src="/images/inside.jpeg"
    >
      Come aboard the <b>largest hotel</b> in South Asia
    </Card>
    <Card
      title="A Delight for Every Palate"
      className="text-j-orange"
      src="/images/food.jpg"
    >
      <b>Global cuisines</b> that will excite your taste buds
    </Card>
  </View>
);

export default ShipView;
