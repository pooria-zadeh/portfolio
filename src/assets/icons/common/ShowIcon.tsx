import React from "react";
import StyledSvgIcon from "../SvgIcon";

const ShowIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon {...props} id="Iconly_Bulk_Show" viewBox="0 0 24 24">
      <g id="Show" transform="translate(2 4)">
        <path
          data-name="Fill 1"
          d="M10,16H9.99C5.861,16,2.148,13.114.058,8.281a.723.723,0,0,1,0-.571C2.145,2.882,5.858,0,9.99,0H10a9.307,9.307,0,0,1,5.737,2.046,14.231,14.231,0,0,1,4.2,5.664.723.723,0,0,1,0,.571C17.851,13.114,14.135,16,10,16ZM10,4.121A3.874,3.874,0,1,0,13.892,8,3.9,3.9,0,0,0,10,4.121Z"
          fill="#200e32"
          opacity="0.4"
        />
        <path
          data-name="Fill 4"
          d="M4.868,2.424A2.434,2.434,0,0,1,0,2.424,2.521,2.521,0,0,1,.049,1.95H.1A2,2,0,0,0,2.1.029,2.043,2.043,0,0,1,2.439,0,2.43,2.43,0,0,1,4.868,2.424"
          transform="translate(7.563 5.573)"
          fill="#200e32"
        />
      </g>
    </StyledSvgIcon>
  );
};

export default ShowIcon;
