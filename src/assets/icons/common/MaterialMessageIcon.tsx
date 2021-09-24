import themeObj from "src/providers/theme/themeObject";
import StyledSvgIcon from "../SvgIcon";

export const MaterialMessageIcon = (props: CommonIconProps) => {
  return (
    <StyledSvgIcon
      width="30"
      height="30"
      viewBox="0 0 30 30"
      id="Polygon-icon"
      {...props}
    >
      <path
        id="Icon_material-message"
        data-name="Icon material-message"
        d="M30,3H6A3,3,0,0,0,3.015,6L3,33l6-6H30a3.009,3.009,0,0,0,3-3V6A3.009,3.009,0,0,0,30,3ZM27,21H9V18H27Zm0-4.5H9v-3H27ZM27,12H9V9H27Z"
        transform="translate(-3 -3)"
        fill={themeObj.palette.info.blue}
      />
    </StyledSvgIcon>
  );
};
