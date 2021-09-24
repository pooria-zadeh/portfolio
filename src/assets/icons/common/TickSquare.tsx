import { getPaletteColor } from "src/utils/theme/helper";
import StyledSvgIcon from "../SvgIcon";

export const TickSquareIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon id="Iconly-Bold-Tick Square" viewBox="0 0 24 24" {...props}>
      <g id="Tick_Square" data-name="Tick Square" transform="translate(2 2)">
        <path
          data-name="Tick Square"
          d="M14.34,20H5.67C2.279,20,0,17.625,0,14.091V5.92C0,2.379,2.279,0,5.67,0h8.67C17.725,0,20,2.379,20,5.92v8.171C20,17.625,17.725,20,14.34,20ZM6.44,9.125a.875.875,0,0,0-.62,1.5L8.2,12.99a.881.881,0,0,0,1.23,0L14.18,8.24A.877.877,0,0,0,12.94,7L8.81,11.13,7.06,9.38A.868.868,0,0,0,6.44,9.125Z"
          transform="translate(0 0)"
          fill="currentColor"
          stroke="none"
        />
      </g>
    </StyledSvgIcon>
  );
};
export const CheckboxTickSquareIcon = (
  props: CommonIconProps & { checked: boolean }
) => {
  return (
    <StyledSvgIcon id="Iconly-Bold-Tick Square" viewBox="0 0 24 24" {...props}>
      <g id="Tick_Square" data-name="Tick Square" transform="translate(2 2)">
        <path
          data-name="Tick Square"
          d={
            props.checked
              ? "M14.34,20H5.67C2.279,20,0,17.625,0,14.091V5.92C0,2.379,2.279,0,5.67,0h8.67C17.725,0,20,2.379,20,5.92v8.171C20,17.625,17.725,20,14.34,20ZM6.44,9.125a.875.875,0,0,0-.62,1.5L8.2,12.99a.881.881,0,0,0,1.23,0L14.18,8.24A.877.877,0,0,0,12.94,7L8.81,11.13,7.06,9.38A.868.868,0,0,0,6.44,9.125Z"
              : "M14.34,20H5.67C2.279,20,0,17.625,0,14.091V5.92C0,2.379,2.279,0,5.67,0h8.67C17.725,0,20,2.379,20,5.92v8.171C20,17.625,17.725,20,14.34,20Z"
          }
          transform="translate(0 0)"
          fill={props.checked ? "inherit" : "none"}
          stroke={
            props.checked
              ? "none"
              : getPaletteColor({
                  degree: props.degree2,
                  palette: props.palette2,
                })
          }
        />
      </g>
    </StyledSvgIcon>
  );
};
