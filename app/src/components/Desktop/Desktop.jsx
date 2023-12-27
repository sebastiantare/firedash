/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, { useState } from "react";
import { GlowChile } from "../../icons/GlowChile";
import { About } from "../About";
import { LiveFiresButton } from "../LiveFiresButton";
import { PropertyDefaultWrapper } from "../PropertyDefaultWrapper";
import { LiveMapChart } from "../LiveMapChart";
import "./style.css";

export const Desktop = () => {
  const [mapView, setMapView] = useState(0);

  return (
    mapView ?
      <div className="map-wrapper">
        {mapView && <LiveMapChart></LiveMapChart>}
      </div>
      :
      <div className="desktop">

        <div className="title-wrapper">
          <div className="title">
            <div className="text-wrapper-2">Chilean Fire Dashboard</div>
          </div>
        </div>

        <div className="glow-chile-wrapper">
          <GlowChile className="glow-chile" />
        </div>

        <div className="frame-wrapper">
          <div className="div">
            <div className="menus">
              <About className="data-source" property1="default" text="data source" />
              <About property1="default" text="about" />
              <About className="contact" property1="default" text="contact" />
              <About className="project" property1="default" text="project" />
            </div>
          </div>
        </div>


        <div position={'absolute'} className="frame-fire">
          <PropertyDefaultWrapper className="fire-instance" property1="default" />
        </div>

        <div>
          <div className="frame-2">
            <LiveFiresButton
              className="live-fires-button-instance"
              liveFiresClassName="design-component-instance-node"
              property1="default"
              clickEvent={() => setMapView(1)}
            />
          </div>
        </div>

      </div>
  );
};
