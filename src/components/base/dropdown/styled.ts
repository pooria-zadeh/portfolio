import styled from "@emotion/styled";
import { BSInput, BSInputContainer } from "../input/styled";

export const StyledSelectInput = styled(BSInputContainer)(({ theme }) => ({
  position: "relative",
  border: "1px solid",
  "& > div:nth-of-type(1)": {
    border: "1px solid",
    // ...getCommonInput(theme, false),
    padding: 16,
    cursor: "pointer",
  },
}));

export const MenuContainer = styled.div<{ show: boolean }>(
  ({ theme, show }) => ({
    // display: show ? "flex" : "none",
    opacity: show?1:0,
    transform: !show ? "scale(0)" : "scale(1)",
    minWidth: 150,
    flexDirection: "column",
    maxHeight: 500,
    zIndex: theme.zIndex.menu,
    position: "absolute",

    width: "100%",

    // marginTop: 8,
    backgroundColor: "#FFF",
    boxShadow: theme.shadows.common,
    transition: "transform 0.5s ease-in-out",
    padding: "16px 0px",

    "& > p": {
      width: "100%",
      cursor: "pointer",
      padding: "16px 32px",
      "&:hover": {
        backgroundColor: theme.palette.grey["200"],
      },
    },
  })
);

export const StyledAccordionSelectInput = styled(BSInputContainer)<{
  open?: boolean;
}>(({ theme, open }) => ({
  position: "relative",
  zIndex: theme.zIndex.menu + 1,
  "& > div:nth-of-type(1)": {
    // ...getCommonInput(theme, false),
    // position: "relative",
    // zIndex: 10,
    padding: "16px 24px",
    backgroundColor: open ? theme.palette.grey["300"] : "#FFF",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: open
        ? theme.palette.grey["300"]
        : theme.palette.grey["200"],
    },
    "& > p": {
      color: open ? "#FFF" : theme.palette.grey["300"],
    },
    "& > div": {
      content: '""',
      width: "1.5rem",
      height: "1.5rem",
      borderRadius: "1rem",
      border: "2px solid ",
      borderColor: open ? "#FFF" : theme.palette.grey["300"],
      padding: 2,
      marginRight: 24,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:before": {
        content: '""',
        position: "absolute",
        backgroundColor: "#FFF",
        width: "60%",
        height: "60%",
        borderRadius: "100%",
      },
    },
  },
}));

export const StyledSelectInternalInput = styled(BSInput)({
  display: "none",
});
