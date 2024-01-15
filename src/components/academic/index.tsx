import { AcademicDataType } from "@/types/resume.type";
import { MUList } from "../base/MList/styled";
import { RightSection, Section, SectionTitle } from "../styled";
import { DataNDurationRow } from "../data-n-duration";
import { LINKS } from "pr.data";
import { MText } from "../base/MText";
import useTranslation from "@/i18n/hooks/useTranslation";

export const AcademicSection = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <SectionTitle>{t("resume.academic.title")}</SectionTitle>
      <RightSection>
        <MUList>
          {t("resume.academic.list").map(
            (
              { degree, duration, gpa, university }: AcademicDataType,
              idx: number
            ) => (
              <div key={`academic-${idx}`}>
                <DataNDurationRow
                  name={degree}
                  subtitle={university}
                  link={LINKS.unversity}
                  duration={duration}
                />

                <MText fontWeight="light" variant="body2">
                  {t("gpa")} {gpa}
                </MText>
              </div>
            )
          )}
        </MUList>
      </RightSection>
    </Section>
  );
};
