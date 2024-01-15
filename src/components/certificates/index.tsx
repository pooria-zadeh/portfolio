import Image from "next/image";
import { MFlexContainerView } from "../base/view-container/Container";
import { RightSection, Section, SectionTitle } from "../styled";
import { Spacer } from "../base/spacer";
import useTranslation from "@/i18n/hooks/useTranslation";
import { useMemo } from "react";

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
        <MFlexContainerView alignItems="center" justifyContent="center" wrap>
          <div style={{ ...size, overflow: "hidden", position: "relative" }}>
            <Image fill alt="IBM" src={"/certificates/ibm.png"} />
          </div>
          <Spacer hori={3} vert={4} />
          <Image alt="IBM" src={"/certificates/sharif.png"} {...size} />
        </MFlexContainerView>
      </RightSection>
    </Section>
  );
};
