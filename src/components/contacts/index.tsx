import { LINKS, OBJECT_DATA } from "pr.data";
import { BSHyperlink } from "../base/MButton/styled";
import { MText } from "../base/MText";
import {
  MContainerView,
  MFlexContainerView,
} from "../base/view-container/Container";
import { MRowView } from "../base/view-container/Row";
import {
  LinkedInIcon,
  StackoverflowIcon,
} from "src/assets/icons/common/socialMediaIcon";
import { Spacer } from "../base/spacer";
import useTranslation from "@/i18n/hooks/useTranslation";

export const ContactsTopSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <MFlexContainerView>
        {/** Could Put {image} here */}
        <MContainerView>
          <MText variant="h4" fontWeight="bold">
            {t("pr")}{" "}
            <MText span fontWeight="medium">
              ({t("title")})
            </MText>
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

          <MRowView>
            <BSHyperlink href={`${LINKS.linkedin}`}>
              <LinkedInIcon />
            </BSHyperlink>
            <BSHyperlink href={`${LINKS.stackoverflow}`}>
              <StackoverflowIcon />
            </BSHyperlink>
          </MRowView>
        </MContainerView>
      </MFlexContainerView>
      <Spacer vert={32} />
    </>
  );
};
