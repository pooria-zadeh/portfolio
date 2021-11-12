import { getPaletteColor } from "@/theme/helper";
import styled from "@emotion/styled";
import { useState } from "react";

import { MText } from "../MText";
import { MColumnView } from "../view-container/Column";
import { MRowView } from "../view-container/Row";

export const StyledFlatAccordion = styled(MColumnView)<
  AppBaseColorType & { open?: boolean }
>(({ palette, degree, open, theme }) => ({
  "& > div:nth-of-type(1)": {
    minWidth: 300,
    position: "relative",
    width: "100%",
    cursor: "pointer",
    backgroundColor: getPaletteColor({ palette, degree }),
    padding: "24px 36px",
    alignItems: "center",

    borderRadius: theme.shape.borderRadius.medium,
    "& > p": {
      flex: 1,
    },
    "&:after": {
      content: open ? "'-'" : "'+'",
      width: 24,
      height: 24,
      fontSize: theme.typography.h5.fontSize,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: getPaletteColor({ palette, degree }),
      backgroundColor: "#FFF",
      borderRadius: theme.shape.borderRadius.tiny,
    },
  },
  "& > div:nth-of-type(2)": {
    maxHeight: open ? 1200 : 0,
    overflow: 'hidden',
    transition:'all 0.3s'
  },
}));

type Props = {
  text: string;
  WrapperComponent?:  AppStyledComponent<any>;
};

export const FlatAccordion = ({
  children,
  text,
  WrapperComponent = StyledFlatAccordion,
}: AppCommonChild & Props) => {
  const [open, setOpen] = useState(false);
  return (
    <WrapperComponent open={open}>
      <MRowView onClick={() => setOpen((p) => !p)}>
        <MText color="#FFF">{text}</MText>
      </MRowView>
      <div>{children}</div>
    </WrapperComponent>
  );
};
