import { FieldMetaProps } from 'formik';
import React, { forwardRef, memo } from 'react';
import { MText } from '../MText';
import { InputErrorText } from './error';
import { BSInput, BSTextArea, CommonInputRoot, CommonInputWrapper } from './styled';
import { MInputProps } from './type.input';

export const MInput = memo(
    forwardRef(
        (
            {
                label,
                StartAdornment,
                EndAdornment,
                value,
                meta,
                error,
                multiline = false,
                InputRoot = CommonInputRoot,
                InputWrapper = CommonInputWrapper,
                InputComponent = multiline ? BSTextArea : BSInput,
                rootProps,
                wrapperStyle,
                inputStyle,
                showOnError=false,
                ...rest
            }: MInputProps & { error?: string; meta?: FieldMetaProps<any> },
            ref
        ) => {
            return (
                <InputRoot {...rootProps} value={Boolean(value)}>
                    {label && <MText variant="h6">{label}</MText>}
                    <InputWrapper
                        css={wrapperStyle}
                        error={meta?.touched && Boolean(error || meta?.error)}>
                        {StartAdornment && <StartAdornment />}
                        <InputComponent
                            ref={ref as any}
                            css={inputStyle}
                            {...rest}
                            value={value}
                            key={rest.name}
                            id={rest.name}
                        />

                        {EndAdornment && <EndAdornment />}
                    </InputWrapper>
                    {meta && <InputErrorText meta={meta} showOnError={showOnError}/>}
                </InputRoot>
            );
        }
    )
);
