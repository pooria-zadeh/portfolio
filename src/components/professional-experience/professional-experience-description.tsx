import { FlatAccordion } from "@/components/base/dropdown/accordion.flat";
import { BSHyperlink } from "@/components/base/MButton/styled";
import { MText } from "@/components/base/MText";
import { MColumnView } from "@/components/base/view-container/Column";
import { MRowView } from "@/components/base/view-container/Row";
import useTranslation from "@/i18n/hooks/useTranslation";
import { ProfessionDataType } from "@/types/resume.type";
import styled from "@emotion/styled";
import { Fragment, useEffect, useRef } from "react";

const DescriptionText = styled(MText)(({ theme }) => ({
  fontWeight: 100,
  ...theme.typography.body2,
  margin: "8px 0",
}));

const Tooltip = styled("div")<{ text: string }>(({ text }) => ({
  "&: before": {
    transition: "all 0.15s",
    content: `"${text}"`,
    opacity: 0,
    transform: "translateY(-24px)",
    width: 240,
    backgroundColor: "black",
    color: "#fff",
    textAlign: "center",
    borderRadius: "6px",
    padding: "5px 0",
    position: "absolute",
    zIndex: 1,
    top: 48,
    left: 48,
  },
  "&: after": {
    transition: "all 0.15s",
    content: "' '",
    transform: "translateY(-24px)",
    position: "absolute",
    opacity: 0,
    top: 24,
    left: 48 + 120,
    marginLeft: -12,
    border: "solid 16px",
    borderColor: "transparent transparent #00000099 transparent",
  },
  "&:hover": {
    "&:before": {
      transform: "translateY(0)",
      opacity: 1,
    },
    "&:after": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

export const ProfessionalExperienceDescription = ({
  text,
  testUsers,
  link,
}: ProfessionDataType["description"] & {
  link: ProfessionDataType["link"];
}) => {
  const { t } = useTranslation();
  const ctrlPressed = useRef(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey) {
        ctrlPressed.current = true;
      }
    }
    function onKeyUp() {
      ctrlPressed.current = false;
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);
    };
  }, []);
  return (
    <FlatAccordion>
      <FlatAccordion.Title>
        <BSHyperlink
          css={{ flex: 1 }}
          target="_blank"
          href={link}
          onClick={(e) => {
            if (!ctrlPressed.current&&window.innerWidth>600) {
              e.preventDefault();
            }
          }}
        >
          <Tooltip text="hold ctrl or cmd + click">
            <MText span fontWeight="semibold">
              Url:{" "}
            </MText>
            <MText span>{link}</MText>
          </Tooltip>
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
