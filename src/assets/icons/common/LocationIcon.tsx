import React from "react";
import themeObj from "src/providers/theme/themeObject";
import StyledSvgIcon from "../SvgIcon";

export const LocationIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon
      {...props}
      viewBox="0 0 24 24"
      id="Iconly-Light-outline-Location"
    >
      <g id="Location" transform="translate(3.5 2)">
        <path
          data-name="Location"
          d="M7.514,19.683l-.06-.048-.413-.278A20.758,20.758,0,0,1,2.507,15.1l-.316-.413A10.7,10.7,0,0,1,0,8.527l0-.285A8.512,8.512,0,0,1,8.5,0h.029l.256,0A8.516,8.516,0,0,1,17,8.553v.1c-.05,2.64-1.337,5.369-3.72,7.892a21.171,21.171,0,0,1-3.745,3.094l-.05.041a1.689,1.689,0,0,1-1.972,0ZM8.284,1.521A7,7,0,0,0,1.513,8.5l.019.357A9.187,9.187,0,0,0,3.4,13.772a19.17,19.17,0,0,0,4.9,4.6l.082.062a.181.181,0,0,0,.238,0l.085-.064A19.618,19.618,0,0,0,12.187,15.5c2.116-2.24,3.257-4.612,3.3-6.858l0-.332a7,7,0,0,0-6.96-6.791ZM5.261,8.649A3.238,3.238,0,1,1,8.5,11.9,3.247,3.247,0,0,1,5.261,8.649Zm1.513,0A1.725,1.725,0,1,0,8.5,6.918,1.73,1.73,0,0,0,6.774,8.649Z"
          fill="inherit"
        />
      </g>
    </StyledSvgIcon>
  );
};
export const LocationBulkIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon
      {...props}
      viewBox="0 0 24 24"
      id="Iconly-Light-Bulk-Location"
    >
      <g id="Location" transform="translate(5 2)">
        <path
          d="M7.042,17h0a.823.823,0,0,1-.39-.119,18.454,18.454,0,0,1-4.838-4.548A9.227,9.227,0,0,1,0,7.134,7.166,7.166,0,0,1,3.532.937a6.889,6.889,0,0,1,7.034.058,7.254,7.254,0,0,1,2.525,2.674A7.419,7.419,0,0,1,14,7.261a10.515,10.515,0,0,1-3.192,6.775,18.751,18.751,0,0,1-3.359,2.82A1.173,1.173,0,0,1,7.042,17ZM6.993,4.848a2.342,2.342,0,0,0-1.679.706,2.445,2.445,0,0,0-.519,2.641,2.369,2.369,0,0,0,2.2,1.5h.017a2.327,2.327,0,0,0,1.667-.7,2.455,2.455,0,0,0-.768-3.956A2.328,2.328,0,0,0,6.993,4.848Z"
          transform="translate(0)"
          fill={themeObj.palette.grey["300"]}
        />
        <ellipse
          id="Ellipse_743"
          cx="5"
          cy="1"
          rx="5"
          ry="1"
          transform="translate(2 18)"
          fill={themeObj.palette.grey["300"]}
          opacity="0.4"
        />
      </g>
    </StyledSvgIcon>
  );
};
