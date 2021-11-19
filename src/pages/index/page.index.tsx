import { BSHyperlink } from "@/components/base/MButton/styled";
import { MUList, MUListItem } from "@/components/base/MList/styled";
import { MText } from "@/components/base/MText";
import { Spacer } from "@/components/base/spacer";
import { MContainerView } from "@/components/base/view-container/Container";
import { MRowView } from "@/components/base/view-container/Row";
import useTranslation from "@/i18n/hooks/useTranslation";
import { AcademicDataType, ProfessionDataType } from "@/types/resume.type";
import styled from "@emotion/styled";
import { LINKS, OBJECT_DATA } from "pr.data";

import { DescriptionBox } from "./cc.description";
import { CsvUList } from "./cc.list";

const Section = styled(MRowView)(({ theme }) => ({
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

const SectionTitle = styled(MText)(({ theme }) => ({
  textAlign: "right",
  fontWeight: 600,
  marginTop: -16,
  [theme.breakpoints.down.sm]: {
    textAlign: "left",
    marginTop: 0,
  },
}));

const BORDER_W = 3;
const RightSection = styled.div(({ theme }) => ({
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
const SubSection = styled(MRowView)({
  margin: "8px 0",
});

const SectionWithDuration = styled(MRowView)({});

const DataNDurationRow = ({
  name,
  subtitle,
  link,
  duration,
}: {
  name: string;
  subtitle: string;
  duration: string;
  link?: string;
}) => {
  return (
    <SectionWithDuration justifyContent="space-between">
      <div css={{ flex: 1, margin: "12px 0" }}>
        <MText span variant="h4" fontWeight="bold">
          {name}
        </MText>
        {link ? (
          <BSHyperlink href={link}>
            <MText span> ({subtitle}) </MText>
          </BSHyperlink>
        ) : (
          <MText span> ({subtitle}) </MText>
        )}
      </div>
      <MText fontWeight="light" css={{ alignSelf: "flex-end" }} span>
        {duration}
      </MText>
    </SectionWithDuration>
  );
};
export const IndexPageComponent = () => {
  const { t } = useTranslation();

  return (
    <MContainerView maxWidth="md" css={{ padding: 4 }}>
      <MText variant="h4" fontWeight="bold">
        {t("pr")}
      </MText>
      <MText>
        <BSHyperlink href={`tel:${OBJECT_DATA.tel}`}>
          <MText span variant="body2" fontWeight="bold">
            {OBJECT_DATA.tel}
          </MText>
        </BSHyperlink>
        <MText span>{" | "}</MText>
        <BSHyperlink href={`mailto:${OBJECT_DATA.mail}`}>
          <MText span variant="body2">
            {OBJECT_DATA.mail}
          </MText>
        </BSHyperlink>
      </MText>
      <Spacer vert={32} />
      <Section>
        <SectionTitle>{t("resume.summary.title")}</SectionTitle>
        <RightSection>
          <MUList>
            {t("resume.summary.list").map((d: string, idx: number) => (
              <MUListItem key={idx}>
                <MText>{d}</MText>
              </MUListItem>
            ))}
          </MUList>
        </RightSection>
      </Section>
      <Section>
        <SectionTitle>{t("resume.techSkill.title")}</SectionTitle>
        <RightSection>
          <CsvUList list={t("resume.techSkill.list")} />
        </RightSection>
      </Section>
      <Section>
        <SectionTitle>{t("resume.academic.title")}</SectionTitle>
        <RightSection>
          <MUList>
            {t("resume.academic.list").map(
              (
                { degree, duration, gpa, university }: AcademicDataType,
                idx: number
              ) => (
                <div key={idx}>
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
              <div key={idx} css={{ margin: "24px 0" }}>
                <DataNDurationRow
                  name={name}
                  subtitle={category}
                  duration={duration}
                />

                <SubSection>
                  <MText span css={{marginRight:8 }}>{t("technologies")}:</MText>

                  <CsvUList list={technologies} />
                </SubSection>
                <SubSection>
                  <MText span css={{marginRight:8 }}>{t("role")}:</MText>
                  <MText>{role}</MText>
                </SubSection>
                <DescriptionBox {...description} link={link} />
              </div>
            )
          )}
        </RightSection>
      </Section>
    </MContainerView>
  );
};
