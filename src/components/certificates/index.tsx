import Image from "next/image";
import { RightSection, Section, SectionTitle } from "../styled";
import { Spacer } from "../base/spacer";
import useTranslation from "@/i18n/hooks/useTranslation";
import { useMemo } from "react";
import styled from "@emotion/styled";
import { MRowView } from "../base/view-container/Row";

const ImageContainer = styled.div({
  minHeight: 400,
  aspectRatio: 600 / 460,
  overflow: "hidden",
  position: "relative",
  "@media (max-width: 600px)": {
    width: "100%",
    minHeight: "unset",
  },
});

export const CertificatesSection = () => {
  const { t } = useTranslation();
  const size = useMemo(() => {
    if (typeof window === "undefined") return { width: 600, height: 460 };
    return { width: window.innerWidth, height: window.innerWidth * 0.75 };
  }, []);
  return (
    <Section>
      <SectionTitle>{t("resume.certificates.title")}</SectionTitle>
      <RightSection>
        <MRowView alignItems="center" justifyContent="center" wrap="true">
          <ImageContainer>
            <Image alt="IBM" src={"/certificates/ibm.png"} fill />
          </ImageContainer>
          <Spacer hori={3} vert={4} />
          <ImageContainer>
            <Image alt="IBM" src={"/certificates/sharif.png"} fill />
          </ImageContainer>
        </MRowView>
      </RightSection>
    </Section>
  );
};
