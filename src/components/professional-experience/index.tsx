import Image from "next/image";
import styled from "@emotion/styled";

import { BSHyperlink } from "@/components/base/MButton/styled";
import { MUList } from "@/components/base/MList/styled";
import { MText } from "@/components/base/MText";
import { Spacer } from "@/components/base/spacer";
import {
  MContainerView,
  MFlexContainerView,
} from "@/components/base/view-container/Container";
import { MRowView } from "@/components/base/view-container/Row";
import useTranslation from "@/i18n/hooks/useTranslation";
import { AcademicDataType, ProfessionDataType } from "@/types/resume.type";
import { LINKS, OBJECT_DATA } from "pr.data";
import {
  LinkedInIcon,
  StackoverflowIcon,
} from "src/assets/icons/common/socialMediaIcon";
import { RightSection, Section, SectionTitle, SubSection } from "../styled";
import { CSVUList } from "@/components/csv-list";
import { ProfessionalExperienceDescription } from "./professional-experience-description";
import { DataNDurationRow } from "../data-n-duration";

export const ProfessionalExperience = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <SectionTitle>{t("resume.professional.title")}</SectionTitle>
      <RightSection>
        {t("resume.professional.list").map(
          (
            {
              name,
              category,
              link,
              description,
              technologies,
              role,
              duration,
            }: ProfessionDataType,
            idx: number
          ) => (
            <div key={`professional-${idx}`} css={{ margin: "32px 0" }}>
              <DataNDurationRow
                name={name}
                subtitle={category}
                duration={duration}
              />

              <SubSection>
                <MText span css={{ marginRight: 8 }}>
                  {t("technologies")}:
                </MText>

                <CSVUList list={technologies} />
              </SubSection>
              <SubSection>
                <MText span css={{ marginRight: 8 }}>
                  {t("role")}:
                </MText>
                <MText>{role}</MText>
              </SubSection>
              <ProfessionalExperienceDescription {...description} link={link} />
            </div>
          )
        )}
      </RightSection>
    </Section>
  );
};
