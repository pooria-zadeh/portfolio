import themeObj from "src/providers/theme/themeObject";
import StyledSvgIcon from "../SvgIcon";

export const TimeSquareBulkIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon viewBox="0 0 24 24" {...props}>
      <g data-name="Time Square" transform="translate(2 2)">
        <path
          data-name="Fill 3"
          d="M14.34,0H5.67C2.28,0,0,2.38,0,5.92v8.17C0,17.62,2.28,20,5.67,20h8.67C17.73,20,20,17.62,20,14.09V5.92C20,2.38,17.73,0,14.34,0"
          fill={themeObj.palette.secondary["700"]}
          opacity="0.4"
        />
        <path
          data-name="Fill 1"
          d="M4.675,8.889a.756.756,0,0,1-.384-.1L.365,6.442A.754.754,0,0,1,0,5.8V.75a.75.75,0,0,1,1.5,0V5.371L5.06,7.494a.75.75,0,0,1-.385,1.395"
          transform="translate(8.898 4.925)"
          fill={themeObj.palette.secondary["700"]}
        />
      </g>
    </StyledSvgIcon>
  );
};
export const TimeSquareIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon viewBox="0 0 24 24" {...props}>
      <g data-name="Time Square" transform="translate(2 2)">
        <path
          data-name="Time Square"
          d="M5.665,20a5.5,5.5,0,0,1-4.109-1.651A6.043,6.043,0,0,1,0,14.084V5.916A6.044,6.044,0,0,1,1.558,1.651,5.5,5.5,0,0,1,5.665,0h8.67a5.5,5.5,0,0,1,4.109,1.651A6.043,6.043,0,0,1,20,5.916v8.168a6.042,6.042,0,0,1-1.557,4.265A5.5,5.5,0,0,1,14.333,20ZM1.5,5.916v8.168A4.581,4.581,0,0,0,2.626,17.3a4.038,4.038,0,0,0,3.038,1.2h8.669c2.532,0,4.167-1.733,4.167-4.416V5.916A4.579,4.579,0,0,0,17.374,2.7a4.04,4.04,0,0,0-3.039-1.2H5.665C3.135,1.5,1.5,3.234,1.5,5.916Zm11.6,6.792-.092-.047-3.39-2.022a.748.748,0,0,1-.357-.533l-.009-.112V5.633a.75.75,0,0,1,1.493-.1l.007.1V9.568l3.025,1.805a.75.75,0,0,1,.307.938l-.047.091a.749.749,0,0,1-.937.306Z"
          transform="translate(0.001 0)"
          fill="inherit"
        />
      </g>
    </StyledSvgIcon>
  );
};
