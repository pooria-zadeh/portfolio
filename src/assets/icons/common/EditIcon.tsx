import React from "react";
import themeObj from "src/providers/theme/themeObject";
import StyledSvgIcon from "../SvgIcon";

export const EditIcon = (props: CommonIconProps) => {
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
export const EditBulkIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon
      {...props}
      viewBox="0 0 24 24"
      id="Iconly-Light-Bulk-Location"
    >
      <g id="Edit" transform="translate(3 3)">
        <path
          data-name="Fill 1"
          d="M6.7,0H1.007A1.017,1.017,0,0,0,0,1.023,1.016,1.016,0,0,0,1.007,2.047H6.7A1.016,1.016,0,0,0,7.709,1.023,1.017,1.017,0,0,0,6.7,0"
          transform="translate(10.291 15.953)"
          fill={themeObj.palette.info.blue}
          opacity="0.4"
        />
        <path
          data-name="Fill 3"
          d="M7.309.067l5.4,4.36a.31.31,0,0,1,.051.429l-6.4,8.335a2.1,2.1,0,0,1-1.63.817l-3.492.043a.4.4,0,0,1-.392-.312L.052,10.289a2.137,2.137,0,0,1,.4-1.8L6.883.118A.3.3,0,0,1,7.309.067"
          transform="translate(0 3.837)"
          fill={themeObj.palette.info.blue}
        />
        <path
          data-name="Fill 5"
          d="M6.977,5.665l-1.04,1.3a.3.3,0,0,1-.423.048c-1.265-1.023-4.5-3.65-5.4-4.377A.308.308,0,0,1,.069,2.2l1-1.246A2.572,2.572,0,0,1,4.85.7L6.321,1.871A3.066,3.066,0,0,1,7.464,3.623a2.406,2.406,0,0,1-.487,2.042"
          transform="translate(8.144 0)"
          fill={themeObj.palette.info.blue}
          opacity="0.4"
        />
      </g>
    </StyledSvgIcon>
  );
};
