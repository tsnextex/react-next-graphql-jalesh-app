import React from "react";
import View from "../View/View";
import { MiniCard } from "../Card/Card";

const ActivitiesView = () => (
  <View
    description="activities"
    title={
      <>
        Experiences for <b>everyone</b>
      </>
    }
  >
    <div className="mt-4 mb-12">
      <MiniCard title="Couples" src="/images/couple.jpg" />
      <MiniCard title="Families" src="/images/family.jpg" />
      <MiniCard title="Friends" src="/images/group.jpg" />
      <MiniCard title="Seniors" src="/images/seniors.jpg" />
    </div>
  </View>
);

export default ActivitiesView;
