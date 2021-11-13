import styled from "@emotion/styled";

import { MText } from "../MText";
import { FieldMetaProps } from "formik";

const BSInputError = styled(MText)<{ show: boolean; showOnError?: boolean }>(
  ({ theme, show, showOnError }) => ({
    color: show ? theme.palette.info.red : "transparent",
    margin: "8px 0",
    display: showOnError && !show ? "none" : "inline-block",
  })
);

export const InputErrorText = ({
  meta,
  showOnError,
}: {
  showOnError?: boolean;
  meta: FieldMetaProps<any>;
}) => {
  return (
    <BSInputError
      variant="caption"
      palette="info"
      degree="red"
      showOnError={showOnError}
      show={Boolean(meta.touched && meta.error)}
    >
      {meta.error ? meta.error : "noerror"}
    </BSInputError>
  );
};
