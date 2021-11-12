import { BSHyperlink } from "@/components/base/MButton/styled";
import { MUList, MUListItem } from "@/components/base/MList/styled";
import { MText } from "@/components/base/MText";
import { Spacer } from "@/components/base/spacer";
import { MContainerView } from "@/components/base/view-container/Container";
import { MRowView } from "@/components/base/view-container/Row";
import useTranslation from "@/i18n/hooks/useTranslation";
import { AcademicDataType } from "@/types/resume.type";
import styled from "@emotion/styled";
import { OBJECT_DATA } from "pr.data";
import { Fragment } from "react";

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
  [theme.breakpoints.down.sm]: {
    textAlign: "left",
  },
}));

const BORDER_W = 3;
const RightSection = styled.div(({ theme }) => ({
  border: "0px solid",
  borderLeftWidth: BORDER_W,
  position: "relative",
  padding: 12,
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
const SectionWithDuration = styled(MRowView)({});

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
          <MUList>
            {t("resume.techSkill.list").map((d: string, idx: number) => (
              <Fragment key={idx}>
                <MText span>{d}</MText>
                <MText span>{", "}</MText>
              </Fragment>
            ))}
          </MUList>
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
                <SectionWithDuration key={idx} justifyContent="space-between">
                  <div css={{ flex: 1, margin: "12px 0" }}>
                    <MText span fontWeight="bold">
                      {degree}
                    </MText>
                    <MText span> ({university}) </MText>
                  </div>
                  <MText
                    fontWeight="light"
                    css={{ alignSelf: "flex-end" }}
                    span
                  >
                    {duration}
                  </MText>
                  <MText fontWeight="light" variant="caption">
                    {gpa}
                  </MText>
                </SectionWithDuration>
              )
            )}
          </MUList>
        </RightSection>
      </Section>
    </MContainerView>
  );
};
