import React from "react";
import "./Banner.css";
import Arrow from "../../Assets/Arrow";
function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="banner">
          <img src="../../../Images/banner.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
