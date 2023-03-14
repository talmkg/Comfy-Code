import GlobalTopNav from "../../components/GlobalTopNav/GlobalTopNav";
import { useEffect } from "react";
import React, { useCallback } from "react";

const Explore = () => {
  return (
    <div
      className="flex-fill"
      style={{
        width: "100vw",
        height: "100%",
        minHeight: "100vh",
        background: "transparent",
        backgroundColor: "#191724",
        // overflow: "hidden",
      }}
    >
      <div className="h-100">
        <GlobalTopNav identifier={"explore"} />
        <div
          className="position-relative pb-3 feed-div"
          style={{ overflow: "hidden" }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Explore;
