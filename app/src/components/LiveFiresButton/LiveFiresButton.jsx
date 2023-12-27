import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";

export const LiveFiresButton = ({ property1, className, liveFiresClassName, clickEvent}) => {

  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`live-fires-button property-1-0-${state.property1} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onClick={() => {
        clickEvent()
        dispatch("click");
      }}
    >
      <div className={`live-fires ${liveFiresClassName}`}>LIVE FIRES</div>
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

LiveFiresButton.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "variant-3", "default"]),
};
