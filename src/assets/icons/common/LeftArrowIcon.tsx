import React from "react";
import StyledSvgIcon from "../SvgIcon";

export const LeftArrowIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M16.2541 4.24106C16.5522 4.53326 16.5793 4.99051 16.3354 5.31272L16.2541 5.40503L9.52658 12L16.2541 18.595C16.5522 18.8872 16.5793 19.3444 16.3354 19.6666L16.2541 19.7589C15.956 20.0511 15.4896 20.0777 15.161 19.8386L15.0668 19.7589L7.7459 12.582C7.44784 12.2898 7.42074 11.8325 7.66461 11.5103L7.7459 11.418L15.0668 4.24106C15.3947 3.91965 15.9262 3.91965 16.2541 4.24106Z"
        fill="currentColor"
      />
    </StyledSvgIcon>
  );
};

export const LeftArrowBackIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon
      {...props}
      viewBox="0 0 24 24"
      id="Iconly_Light_Arrow_-_Right"
    >
      <g data-name="Arrow - Left" transform="translate(20 5.5) rotate(90)">
        <path
          id="Stroke_1"
          data-name="Stroke 1"
          d="M.5,15V0"
          transform="translate(6.274 0.75)"
          fill="none"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
        <path
          id="Stroke_3"
          data-name="Stroke 3"
          d="M12.049,0,6.025,6.05,0,0"
          transform="translate(0.75 9.7)"
          fill="none"
          stroke="inherit"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
      </g>
    </StyledSvgIcon>
  );
};
