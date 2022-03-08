import { getPaletteColor } from "@/theme/helper";
import styled from "@emotion/styled";
import { createContext, useContext, useState } from "react";

import { MColumnView } from "../view-container/Column";
import { MRowView } from "../view-container/Row";

export const BSFlatAccordion = styled(MColumnView)<AppBaseColorType>(
  ({ palette, degree, theme }) => ({
    border: "1px solid",
    borderColor: getPaletteColor({ palette, degree }),
    borderRadius: theme.shape.borderRadius.medium,
    padding: 8,
    wordBreak:"break-word"
  })
);

const TitleContainer = styled(MRowView)<AppBaseColorType & { open: boolean }>(
  ({ palette, degree, theme, open }) => ({
    minWidth: 300,
    position: "relative",
    width: "100%",
    cursor: "pointer",
    alignItems: "center",
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
  })
);
const ToggleContainer = styled.div<{ open: boolean }>(({ open }) => ({
  maxHeight: open ? 500 : 0,

  overflow: open ? "auto" : "hidden",
  transition: "all 0.3s",
}));

type Props = {
  WrapperComponent?: AppStyledComponent<any>;
  children: Array<JSX.Element>;
};

const AccordionProvider = createContext(
  {} as {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

export const FlatAccordion = ({
  children,

  WrapperComponent = BSFlatAccordion,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <AccordionProvider.Provider value={{ open, setOpen }}>
      <WrapperComponent>{children}</WrapperComponent>
    </AccordionProvider.Provider>
  );
};

const TitleComponent = ({ children }: AppCommonChild) => {
  const { open, setOpen } = useContext(AccordionProvider);
  return (
    <TitleContainer open={open} onClick={() => setOpen((p) => !p)}>
      {children}
    </TitleContainer>
  );
};
const BodyComponent = ({ children }: AppCommonChild) => {
  const { open } = useContext(AccordionProvider);
  return <ToggleContainer open={open}>{children}</ToggleContainer>;
};

FlatAccordion.Title = TitleComponent;
FlatAccordion.Body = BodyComponent;
