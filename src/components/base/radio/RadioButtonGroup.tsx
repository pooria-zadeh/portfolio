import { Field, FieldMetaProps } from "formik";

import {
  StyledRadioButton,
  StyledRadioButtonGroup,
  StyledRadioOption,
} from "./styled";
import { InputErrorText } from "../input/error";
import React, { useMemo } from "react";
import { MRowView } from "../view-container/Row";
import { MColumnView } from "../view-container/Column";
import { MText } from "../MText";

export interface RadioGroupProps {
  name: string;
  options: Array<AppOptions & { subtitle?: string }>;
  label?: string;
  direction?: "row" | "col";
  WrapperComponent?: AppStyledComponent<any>;
  StyledInput?: AppStyledComponent<any>;
}

export const RadioButtonGroup = ({
  label,
  options,
  direction,
  onChange,
  meta,
  WrapperComponent = StyledRadioButtonGroup,
  StyledInput = StyledRadioButton,
  value: selectedValue,
  ...props
}: RadioGroupProps & {
  meta?: FieldMetaProps<any>;
  value: string;
  onChange: (_: { target: { value: string } }) => void;
}) => {
  const Wrapper = useMemo(() => {
    return direction === "row" ? MRowView : MColumnView;
  }, [direction]);
  return (
    <WrapperComponent>
      {label && <MText fontWeight="semibold">{label}</MText>}
      <Wrapper>
        {options?.map(({ value, option, subtitle }) => (
          <StyledInput
            key={value}
            id={value}
            palette="secondary"
            degree="700"
            selected={selectedValue === value}
          >
            <input type="radio" onChange={onChange} {...props} value={value} />
            <div>
              <StyledRadioOption fontWeight="medium">
                {option}
              </StyledRadioOption>
              {subtitle && (
                <MText variant="body2" span>
                  {subtitle}
                </MText>
              )}
            </div>
          </StyledInput>
        ))}
      </Wrapper>
      {meta && <InputErrorText meta={meta} />}
    </WrapperComponent>
  );
};

const FormikRadioButtonGroup = (props: RadioGroupProps) => {
  return (
    <Field {...props}>
      {({ field, meta }: any) => (
        <RadioButtonGroup {...props} {...field} meta={meta} />
      )}
    </Field>
  );
};

export default FormikRadioButtonGroup;
