import { Field, FieldMetaProps } from "formik";

import { StyledCheckbox } from "./styled";
import { MText } from "../MText";
import { InputErrorText } from "../input/error";
import { MRowView } from "../view-container/Row";

import { memo, useMemo } from "react";
import { MColumnView } from "../view-container/Column";
import { CheckboxTickSquareIcon } from "src/assets/icons/common/TickSquare";
import { MButton } from "../MButton";
import styled from "@emotion/styled";

export interface CheckboxProps extends FormikCheckboxProps {
  value: string;
  checked: boolean;
  onChange: (_: { target: { checked: boolean } }) => void;
  meta?: FieldMetaProps<any>;
  palette2: any;
  degree2: any;
}

interface FormikCheckboxProps {
  name: string;
  optionName: string;
  label?: string;
  direction?: "row" | "col";
  // value: boolean;
}

export const MCheckbox = memo(
  ({
    label,
    optionName,
    direction,
    onChange,
    value,
    meta,
    palette,
    degree,
    palette2 = "text",
    degree2 = "main",
    showOnError = false,

    ...props
  }: CheckboxProps & AppBaseColorType & { showOnError?: boolean }) => {
    const Wrapper = useMemo(() => {
      return direction === "row" ? MRowView : MColumnView;
    }, [direction]);

    return (
      <>
        {label && <MText fontWeight="semibold">{label}</MText>}
        <Wrapper>
          <StyledCheckbox
            selected={true}
            onClick={(ev) => {
              ev.target.dispatchEvent(new Event("input", { bubbles: true }));
            }}
            {...props}
          >
            <CheckboxTickSquareIcon
              checked={Boolean(value)}
              palette={palette}
              degree={degree}
            //   palette2={palette2}
            //   degree2={degree2}
            />

            <input
              {...props}
              type="checkbox"
              onChange={onChange}
              value={value}
              checked={Boolean(value)}
            />
            <MText>{optionName}</MText>
          </StyledCheckbox>
        </Wrapper>
        {meta && <InputErrorText meta={meta} showOnError={showOnError} />}
      </>
    );
  },
  (prev, next) => prev.checked === next.checked && prev.value === next.value
);

export const MCheckboxFormik = (
  props: FormikCheckboxProps & { showOnError?: boolean }
) => {
  return (
    <Field {...props}>
      {({ field, meta }: any) => (
        <MCheckbox meta={meta} {...props} {...field} />
      )}
    </Field>
  );
};

const WeekdayButton = styled(MText)<{ checked?: boolean }>(
  ({ theme, checked }) => ({
    width: "3ch",
    height: "3ch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: checked ? theme.palette.primary.main : "#FFF",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    color: checked ? theme.palette.primary.light : theme.palette.primary.main,
  })
);

export const WeekdayCheckbox = memo(
  ({
    optionName,
    direction,
    onChange,
    value,
    meta,
    palette = "primary",
    degree = "main",
    palette2 = "text",
    degree2 = "main",
    showOnError = false,
    ...props
  }: CheckboxProps & AppBaseColorType & { showOnError?: boolean }) => {
    const checked = Boolean(value);

    return (
      <StyledCheckbox
        selected={true}
        onClick={(ev) => {
          ev.target.dispatchEvent(new Event("input", { bubbles: true }));
        }}
        {...props}
      >
        <WeekdayButton variant="h2" checked={checked}>
          {optionName}
        </WeekdayButton>
        <input
          {...props}
          type="checkbox"
          onChange={onChange}
          value={value}
          checked={checked}
        />
      </StyledCheckbox>
    );
  },
  (prev, next) => prev.checked === next.checked && prev.value === next.value
);

export const WeekdayCheckboxFormik = memo(
  (props: FormikCheckboxProps & { showOnError?: boolean }) => {
    return (
      <Field {...props}>
        {({ field, meta }: any) => (
          <WeekdayCheckbox meta={meta} {...props} {...field} />
        )}
      </Field>
    );
  }
);
