import SimpleLayout from "@/layout/simple.layout";
import {
  commonGetStaticPaths as getStaticPaths,
  nsGetStaticProps,
} from "@/i18n/utils";
import { IndexPageComponent } from "src/pages/index/page.index";

function Index({ localization }: AppLocalization) {
  return (
    <SimpleLayout localization={localization}>
      <IndexPageComponent />
    </SimpleLayout>
  );
}

const getStaticProps = nsGetStaticProps();

export { getStaticPaths, getStaticProps };

export default Index;
