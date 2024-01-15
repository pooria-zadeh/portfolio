import styled from "@emotion/styled";
import { MRowView } from "./base/view-container/Row";
import { MText } from "./base/MText";

export const Section = styled(MRowView)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "30ch 1fr",
  justifyContent: "center",
  [theme.breakpoints.down.md]: {
    gridTemplateColumns: "20vw 1fr",
  },
  [theme.breakpoints.down.sm]: {
    gridTemplateColumns: "1fr",
  },
}));

export const MLineText = styled(MText)({
  whiteSpace: "break-spaces",
});

export const SectionTitle = styled(MText)(({ theme }) => ({
  textAlign: "right",
  fontWeight: 600,
  marginTop: -16,
  [theme.breakpoints.down.sm]: {
    textAlign: "left",
    marginTop: 0,
  },
}));

export const BORDER_W = 3;
export const RightSection = styled.div(({ theme }) => ({
  border: "0px solid",
  borderLeftWidth: BORDER_W,
  position: "relative",
  padding: 16,
  margin: "0 12px",
  transition: "border 0.3s",
  [theme.breakpoints.down.sm]: {
    padding: 0,
    margin: 0,
    paddingTop: 12,
    marginBottom: 12,
    borderLeftWidth: 0,
    borderTopWidth: BORDER_W,
  },
  "&:after": {
    content: "''",
    position: "absolute",
    left: -12,
    top: -12,
    background: "#FFF",
    width: 16,
    height: 16,
    borderRadius: "50%",
    border: "3px solid",
    opacity: 1,
    transition: "opacity 0.3s",
    [theme.breakpoints.down.sm]: {
      opacity: 0,
    },
  },
}));
export const SubSection = styled(MRowView)({
  margin: "8px 0",
});

export const SectionWithDuration = styled(MRowView)({});
