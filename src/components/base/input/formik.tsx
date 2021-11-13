import { FieldProps, useField } from "formik";
import React, { forwardRef, memo, useMemo, useState } from "react";

import ShowIcon from "src/assets/icons/common/ShowIcon";
import { MInput } from ".";
import { MButton } from "../MButton";
import { BSInput } from "./styled";
import { MInputProps } from "./type.input";

export const MInputFormik = memo(
  forwardRef((props: MInputProps, ref) => {
    const [field, meta] = useField(props.name);

    return <MInput {...props} {...field} meta={meta} ref={ref as any} />;
  })
);

export const MInputPasswordFormik = memo(
  forwardRef(
    (
      {
        withToggle,
        ...props
      }: Omit<MInputProps, "EndAdornment"> & { withToggle?: boolean },
      ref
    ) => {
      const [show, setShow] = useState(false);

      const EndAdornment = useMemo(() => {
        if (withToggle) {
          if (withToggle) {
            return () => (
              <MButton
                type="button"
                onClick={() => setShow((prevState) => !prevState)}
              >
                <ShowIcon />
              </MButton>
            );
          }
        }
      }, [withToggle]);

      return (
        <MInputFormik
          {...props}
          ref={ref as any}
          type={show ? "text" : "password"}
          EndAdornment={EndAdornment}
        />
      );
    }
  )
);
