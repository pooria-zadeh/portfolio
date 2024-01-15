import useTranslation from "@/i18n/hooks/useTranslation";
import { RightSection, Section, SectionTitle } from "../styled"
import { CSVUList } from "@/components/csv-list";

export const SkillSetSection = ()=>{
    const { t } = useTranslation();
    return(
        <Section>
        <SectionTitle>{t("resume.techSkill.title")}</SectionTitle>
        <RightSection>
          <CSVUList list={t("resume.techSkill.list")} />
        </RightSection>
      </Section>
    )
}