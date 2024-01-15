import SimpleLayout from "@/layout/simple.layout";
import {
  commonGetStaticPaths as getStaticPaths,
  nsGetStaticProps,
} from "@/i18n/utils";
import { MContainerView } from "@/components/base/view-container/Container";
import useTranslation from "@/i18n/hooks/useTranslation";

import { ProfessionalExperience } from "@/components/professional-experience";
import { AcademicSection } from "@/components/academic";
import { ContactsTopSection } from "@/components/contacts";
import { SkillSetSection } from "@/components/skillset";
import { SummarySection } from "@/components/summary";

import { CertificatesSection } from "@/components/certificates";

const Page = () => {
  const { t } = useTranslation();
  return (
    <MContainerView maxWidth="md" css={{ padding: 4 }}>
      <ContactsTopSection />
      <SummarySection
        description={t("resume.summary.dataContent")}
        href="https://portfolio-prajabzadeh92-gmailcom.vercel.app/en/data"
      />

      <SkillSetSection />
      <CertificatesSection />
      <AcademicSection />

      <ProfessionalExperience />
    </MContainerView>
  );
};
function Index({ localization }: AppLocalization) {
  return (
    <SimpleLayout localization={localization}>
      <Page />
    </SimpleLayout>
  );
}

const getStaticProps = nsGetStaticProps();

export { getStaticPaths, getStaticProps };

export default Index;
