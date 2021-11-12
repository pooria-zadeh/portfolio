import { LanguageProvider } from "@/i18n/LanguageContext";

interface Props extends AppLocalization {
  children: React.ReactNode;
}

const BaseLayout = ({ children, localization }: Props) => {
  return (
    <LanguageProvider localization={localization}>{children}</LanguageProvider>
  );
};

export default BaseLayout;
