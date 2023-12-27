/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";

export const About = ({ property1, className, text = "about" }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`about ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      
      onClick={() => {
        switch (className) {
          case 'data-source':
            window.open('https://firms.modaps.eosdis.nasa.gov/', '_blank')
            break;
          default:
            window.open('https://github.com/sebastiantare', '_blank')
        }
        dispatch("click");
      }}
    >
      <div className={`text-wrapper ${state.property1}`}>{text}</div>
    </div>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          property1: "variant-2",
        };
    }
  }

  if (state.property1 === "variant-2") {
    switch (action) {
      case "mouse_leave":
        return {
          property1: "default",
        };

      case "click":
        return {
          property1: "variant-3",
        };
    }
  }

  return state;
}

About.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "variant-3", "default"]),
  text: PropTypes.string,
};
