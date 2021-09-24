import themeObj from "src/providers/theme/themeObject";
import StyledSvgIcon from "../SvgIcon";

export const QuestionCircleIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon viewBox="0 0 24 24" {...props}>
      <g data-name="Group 5290" transform="translate(-1756 -251)">
        <text
          data-name="?"
          transform="translate(1768 268)"
          fill={themeObj.palette.info.blue}
          font-size="14"
          font-family="Montserrat-Medium, Montserrat"
          font-weight="500"
        >
          <tspan x="-4.011" y="0">
            ?
          </tspan>
        </text>
        <g data-name="Iconly/Light/Info Circle" transform="translate(1756 251)">
          <g data-name="Info Circle" transform="translate(2 2)">
            <path
              data-name="Stroke 1"
              d="M9.25,0A9.25,9.25,0,1,1,0,9.25,9.25,9.25,0,0,1,9.25,0Z"
              transform="translate(0.75 0.75)"
              fill="none"
              stroke={themeObj.palette.info.blue}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            />
          </g>
          <rect
            data-name="Rectangle 17681"
            width="24"
            height="24"
            fill="none"
          />
        </g>
      </g>
    </StyledSvgIcon>
  );
};
