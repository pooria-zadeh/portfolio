import { FlatAccordion } from "@/components/base/dropdown/accordion.flat";
import { BSHyperlink } from "@/components/base/MButton/styled";
import { MText } from "@/components/base/MText";
import { Spacer } from "@/components/base/spacer";
import { MColumnView } from "@/components/base/view-container/Column";
import { MRowView } from "@/components/base/view-container/Row";
import useTranslation from "@/i18n/hooks/useTranslation";
import { ProfessionDataType } from "@/types/resume.type";
import styled from "@emotion/styled";
import { Fragment } from "react";

const DescriptionText = styled(MText)(({ theme }) => ({
  fontWeight: 100,
  ...theme.typography.body2,
  margin: "8px 0",
}));

export const DescriptionBox = ({
  text,
  testUsers,
  link,
}: ProfessionDataType["description"] & {
  link: ProfessionDataType["link"];
}) => {
  const { t } = useTranslation();
  return (
    <FlatAccordion>
      <FlatAccordion.Title>
        <BSHyperlink css={{ flex: 1 }} target="_blank" href={link}>
          <MText span fontWeight="semibold">
            Url:{" "}
          </MText>
          <MText span>{link}</MText>
        </BSHyperlink>
      </FlatAccordion.Title>
      <FlatAccordion.Body>
        {text && (
          <>
            <DescriptionText>{text}</DescriptionText>
            {testUsers && (
              <DescriptionText>{t("tryItWithTestUser")}</DescriptionText>
            )}
          </>
        )}
        {testUsers?.map(({ password, username }) => (
          <Fragment key={username}>
            <MText variant="body3" fontWeight="semibold">
              {t("testUser")}:
            </MText>
            <MColumnView key={username} css={{ margin: 8 }}>
              <MRowView>
                <MText css={{ marginRight: 8 }}>{t("username")}:</MText>
                <MText fontWeight="medium" css={{ fontStyle: "italic" }}>
                  {username}
                </MText>
              </MRowView>
              <MRowView>
                <MText css={{ marginRight: 8 }}>{t("password")}:</MText>
                <MText fontWeight="medium" css={{ fontStyle: "italic" }}>
                  {password}
                </MText>
              </MRowView>
            </MColumnView>
          </Fragment>
        ))}
      </FlatAccordion.Body>
    </FlatAccordion>
  );
};
