import React from "react";
import Selector from "../../../../components/Common/Selectors/Selector";

export default function MobSelectorGroup() {
  return (
    <div className="mob-selector-group flex flex-col justify-center items-center gap-3 !mt-3">
      <h2 className="flex justify-center items-center text-xl font-semibold">
        Select Attractions
      </h2>
      <div className="flex flex-row gap-2">
        <Selector style={{ height: "fit-content" }} />
        <Selector style={{ height: "fit-content" }} />
      </div>
    </div>
  );
}
