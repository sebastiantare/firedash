/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useState } from "react";
import { Fire } from "../../icons/Fire";
import { Fire2 } from "../../icons/Fire2";
import { Fire3 } from "../../icons/Fire3";
import { Fire4 } from "../../icons/Fire4";
import "./style.css";
import { animated, useSpring, useTransition } from '@react-spring/web'

export const PropertyDefaultWrapper = ({ property1, className }) => {

  fireStyle = {  height: 75, width: 59}

  const { width, height } = useSpring({
    from: { width: fireStyle.width, height: fireStyle.height },
    to: async (next) => {
      await next({ width: fireStyle.width * 1, height: fireStyle.height * 0.8 });
      await next({ width: fireStyle.width * 1, height: fireStyle.height * 1 });
    },
    config: { duration: 700, tension: 100, friction: 100 },
    loop: 1
  });

  return (
    <animated.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
    >
      <Fire className={property1} />
    </animated.svg>
  );

}

PropertyDefaultWrapper.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-2", "variant-3", "default"]),
};
