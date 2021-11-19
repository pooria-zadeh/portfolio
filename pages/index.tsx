import React, { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { getInitialLocale } from "@/i18n/getInitialLocale";

const Index: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/${getInitialLocale()}`, undefined, { shallow: true });
  }, []);
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    </>
  );
};

export default Index;
