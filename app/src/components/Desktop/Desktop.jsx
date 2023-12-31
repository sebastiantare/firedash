import React, { useState } from "react";
import { GlowChile } from "../../icons/GlowChile";
import { About } from "../About";
import { LiveFiresButton } from "../LiveFiresButton";
import { LiveMapChart } from "../LiveMapChart";
import "./style.css";

export const Desktop = () => {
  const [mapView, setMapView] = useState(0);

  return (
    <div className="flex justify-center min-h-screen bg-[#001233]">
      <div className="max-w-[1440px] w-full">
        {!mapView && (
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col justify-between w-full p-4 md:flex-row">
              <span className="mb-2 text-3xl font-bold text-white md:mb-0">
                Chilean Fire Dashboard
              </span>
              <div className="flex flex-row mx-auto space-x-5 font-bold text-white md:mx-0 md:ml-auto">
                <About text="data source" className="cursor-pointer" />
                <About text="about" className="cursor-pointer" />
                <About text="contact" className="cursor-pointer" />
                <About text="project" className="cursor-pointer" />
              </div>
            </div>

            <div className="relative">
              <GlowChile className="md:h-[1200px] xl:h-[850px] h-[550px]" />
              <div className="left-[3%] top-[30%] md:left-[10%] absolute flex flex-col justify-center">
                <span className="mx-auto mb-5 text-4xl">🔥</span>
                <LiveFiresButton
                  className="bg-[#ff2559] mx-auto  min-w-full text-center text-white font-semibold py-2 text-xl leading-normal rounded-full px-[10px] cursor-pointer glow"
                  style={{
                    fontFamily: '"Outfit", Helvetica',
                    letterSpacing: "2.64px",
                  }}
                  clickEvent={() => setMapView(1)}
                />
              </div>
            </div>
          </div>
        )}
        {mapView && <LiveMapChart />}
      </div>
    </div>
  );
};
