import useTranslation from "@/i18n/hooks/useTranslation";
import { BSHyperlink } from "../base/MButton/styled";
import { MText } from "../base/MText";
import { MLineText, RightSection, Section, SectionTitle } from "../styled";

export const SummarySection = ({
  description,
  href = "https://portfolio-prajabzadeh92-gmailcom.vercel.app/en",
}: {
  description: string;
  href?: string;
}) => {
  const { t } = useTranslation();
  return (
    <Section>
      <SectionTitle>{t("resume.summary.title")}</SectionTitle>
      <RightSection>
        <MLineText>{description}</MLineText>

        {/* <BSHyperlink href={href}>
          <MText fontWeight="bold">{t("resume.summary.linkTitle")}</MText>
        </BSHyperlink>
        <br />
        <BSHyperlink href="https://resume.io/r/9JXN6CbPn">
          <MText fontWeight="bold">{t("resume.summary.resumeLink")}</MText>
        </BSHyperlink> */}
        <br />
        <br />
      </RightSection>
    </Section>
  );
};
