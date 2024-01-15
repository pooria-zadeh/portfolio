import { BSHyperlink } from "@/components/base/MButton/styled";
import { MText } from "@/components/base/MText";
import { MContainerView } from "@/components/base/view-container/Container";
import useTranslation from "@/i18n/hooks/useTranslation";

import {
  MLineText,
  RightSection,
  Section,
  SectionTitle,
} from "@/components/styled";
import { ProfessionalExperience } from "@/components/professional-experience";
import { AcademicSection } from "@/components/academic";
import { ContactsTopSection } from "@/components/contacts";
import { SkillSetSection } from "@/components/skillset";

export const IndexPageComponent = () => {
  const { t } = useTranslation();

  return (
    <MContainerView maxWidth="md" css={{ padding: 4 }}>
      <ContactsTopSection />
      <Section>
        <SectionTitle>{t("resume.summary.title")}</SectionTitle>
        <RightSection>
          <MLineText>{t("resume.summary.content")}</MLineText>

          <BSHyperlink href="https://portfolio-prajabzadeh92-gmailcom.vercel.app/en">
            <MText fontWeight="bold">{t("resume.summary.linkTitle")}</MText>
          </BSHyperlink>
          <br />
          <BSHyperlink href="https://resume.io/r/9JXN6CbPn">
            <MText fontWeight="bold">{t("resume.summary.resumeLink")}</MText>
          </BSHyperlink>
          <br />
          <br />
        </RightSection>
      </Section>
      <SkillSetSection />
      <AcademicSection />

      <ProfessionalExperience />
    </MContainerView>
  );
};
