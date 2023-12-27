import React from "react";
import { Desktop } from "../../components/Desktop";
import "./style.css";
//import ReactGA from 'react-ga';

export const Frame = () => {

  //ReactGA.initialize('G-68RKQD2KDT');
  //ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <div className="frame">
      <Desktop />
    </div>
  );
};
