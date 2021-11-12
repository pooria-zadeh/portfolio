import React, { memo, useMemo, useState } from "react";
import { useCallback } from "react";
import { ArrowDownIcon } from "src/assets/icons/common/ArrowDownIcon";
import { BSInput, CommonInputRoot, CommonInputWrapper } from "../input/styled";

import { MText } from "../MText";
import { MenuContainer } from "./styled";
import { Dropdown, useDropdownMenu, useDropdownToggle } from "react-overlays";

import styled from "@emotion/styled";
import { AnyPtrRecord } from "dns";
import { FieldProps } from "formik";
import { InputErrorText } from "../input/error";
import useTranslation from "@/i18n/hooks/useTranslation";
// import { StyledSpinner } from '../loader/spinner';
import { MInputProps } from "../input/type.input";
import { MInput } from "../input";

type SelectProps = MInputProps & {
  SelectWrapperDiv?: React.FC<any>;
  options?: ArrayOptionLoading;
  nooptText?: string;
  onChange?: (_: AppOptions) => void;
  onBlur?: (_: AnyPtrRecord) => void;
  value?: string | number | undefined;
  option?: string | number | undefined;
  placeholder?: string;
  TypographyComponent?: React.FC<any>;
  loading?: boolean;
  inputProps?: MInputProps;
};

type MenuProps = Pick<SelectProps, "onChange" | "options" | "nooptText">;
type ToggleProps = Omit<MInputProps, "value"> &
  Omit<
    SelectProps,
    | "onChange"
    | "options"
    | "SelectWrapperDiv"
    | "onBlur"
    | "loading"
    | "nooptText"
  >;

export const StyledSelectContainer = styled.div(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
}));

const OptionTypography = styled(MText)({
  flex: 1,
  fontWeight: 500,
});

const Loader = styled.div({
  alignSelf: "center",
});

const Menu = memo(({ options, onChange, nooptText }: MenuProps) => {
  const { t } = useTranslation();
  const [menuProps, { show, toggle }] = useDropdownMenu({
    flip: true,
    offset: [0, 0],
  });

  return (
    <MenuContainer
      {...menuProps}
    //   style={{ ...props.style, opacity: 1, pointerEvents: "all" }}
      role="menu"
      show={show}
    >
      {options === "loading" ? (
        <Loader />
      ) : options?.length === 0 ? (
        <MText>{nooptText ?? t("noopt")}</MText>
      ) : (
        options?.map(({ option, value }) => (
          <MText
            key={value}
            onClick={(e) => {
              e.target.dispatchEvent(new Event("input", { bubbles: true }));
              if (typeof onChange === "function") {
                onChange({ option, value });
              }
              toggle && toggle(e as any);
            }}
          >
            {option}
          </MText>
        ))
      )}
    </MenuContainer>
  );
});

const InputWrapper = ({ children }) => {
  const [props, { toggle }] = useDropdownToggle();

  return (
    <div
      {...props}
      onClick={() => {
        toggle(false);
      }}
    >
      {children}
    </div>
  );
};
const Input = styled(BSInput)({ display: "none" });

const Toggle = ({
  label,
  StartAdornment,
  EndAdornment,
  value,
  option,
  InputRoot = CommonInputRoot,
  InputWrapper = CommonInputWrapper,
  InputComponent = BSInput,
  rootProps,
  wrapperStyle,
  inputStyle,
  TypographyComponent = OptionTypography,
  children,
  ...rest
}: ToggleProps) => {
  const [props, { toggle }] = useDropdownToggle();

  return (
    <InputRoot value={false}>
      {label && <MText fontWeight="semibold">{label}</MText>}
      <InputWrapper
        {...props}
        onClick={() => {
          toggle(false);
        }}
      >
        {StartAdornment && <StartAdornment />}
        <input {...rest} style={{ display: "none" }} value={value} disabled />
        {!value && rest.placeholder && (
          <MText palette="grey" degree="300">
            {rest.placeholder}
          </MText>
        )}
        <TypographyComponent>{option}</TypographyComponent>
        <span>
          <ArrowDownIcon palette="grey" degree="300" />
        </span>
        {EndAdornment && <EndAdornment />}
      </InputWrapper>
    </InputRoot>
  );
};

export const Select = memo(
  ({
    SelectWrapperDiv = StyledSelectContainer,
    onChange,
    options,
    nooptText,
    inputProps,

    ...props
  }: SelectProps) => {
    const [show, setShow] = useState(false);
    const onToggle = useCallback(() => {
      setShow((prevProps) => !prevProps);
    }, []);

    return (
      <Dropdown
        {...props}
        show={show}
        onToggle={onToggle}
        itemSelector="button:not(:disabled)"
      >
        <SelectWrapperDiv>
          <Toggle {...props} {...(inputProps as any)} />
          <Menu
            onChange={onChange}
            options={options}
            nooptText={nooptText}
            {...props}
          />
        </SelectWrapperDiv>
      </Dropdown>
    );
  }
);

export const MSelectInput = memo(
  ({ options, value, ...props }: SelectProps) => {
    const selected: AppOptions = useMemo(() => {
      return typeof options === "object"
        ? options.find((option) => option.value === value) || {
            option: "",
            value: "",
          }
        : { option: "", value: "" };
    }, [value, options]);

    return <Select {...props} options={options} {...selected} />;
  }
);

export const MSelectInputFormik = memo(
  ({
    form,
    field,
    options,
    TypographyComponent,
    SelectWrapperDiv,
    ...rest
  }: FieldProps<string> & SelectProps) => {
    const onChange = useCallback(
      (option) => {
        form.setFieldValue(field.name, option.value);
      },
      [form, field]
    );

    const selected: AppOptions = useMemo(() => {
      return typeof options === "object"
        ? options.find((option) => option.value === field.value) || {
            option: "",
            value: "",
          }
        : { option: "", value: "" };
    }, [field, options]);

    const meta = useMemo(() => {
      return form.getFieldMeta(field.name);
    }, [form, field]);

    return (
      <>
        <Select
          {...rest}
          options={options}
          name={field.name}
          value={selected?.value}
          option={selected?.option}
          onChange={onChange}
          TypographyComponent={TypographyComponent}
          SelectWrapperDiv={SelectWrapperDiv}
          onBlur={field.onBlur}
        />

        <InputErrorText meta={meta} />
      </>
    );
  }
);
