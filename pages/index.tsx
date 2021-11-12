import React from "react";

import Head from "next/head";
import { useOnUserEnter } from "src/auth/useRedirectOnToken";

const Index: React.FC = () => {
  useOnUserEnter();
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default Index;
