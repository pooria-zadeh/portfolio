import { MContainerView } from "@/components/base/view-container/Container";
import styled from "@emotion/styled";
import BaseLayout from "./base.layout";

type Props = AppLocalization & AppCommonChild & {};

const PageContainer = styled(MContainerView)({
  margin: "0 auto",
});

const SimpleLayout = ({ children, ...rest }: Props) => {
  return (
    <BaseLayout {...rest}>
      <PageContainer maxWidth="lg">{children}</PageContainer>
    </BaseLayout>
  );
};

export default SimpleLayout;
