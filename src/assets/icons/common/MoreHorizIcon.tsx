import themeObj from "src/providers/theme/themeObject";
import StyledSvgIcon from "../SvgIcon";

export const MoreHorizIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon viewBox="0 0 27 27" {...props}>
      <g
        data-name="Icon feather-more-horizontal"
        transform="translate(21 -4.5) rotate(90)"
      >
        <path
          data-name="Path 94023"
          d="M19.5,18A1.5,1.5,0,1,1,18,16.5,1.5,1.5,0,0,1,19.5,18Z"
          fill="none"
          stroke={themeObj.palette.grey["300"]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          data-name="Path 94024"
          d="M30,18a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,30,18Z"
          fill="none"
          stroke={themeObj.palette.grey["300"]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          data-name="Path 94025"
          d="M9,18a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,9,18Z"
          fill="none"
          stroke={themeObj.palette.grey["300"]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </g>
    </StyledSvgIcon>
  );
};
