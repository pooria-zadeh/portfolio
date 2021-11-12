import { Field, FieldMetaProps } from 'formik';

import { StyledRadioButton, StyledRadioButtonGroup, StyledRadioOption } from './styled';
import { MText } from '../MText';
import { InputErrorText } from '../input/error';
import { MRowView } from '../view-container/Row';
import React, { useMemo } from 'react';
import { MColumnView } from '../view-container/Column';
import { Grid, GridProps } from '@material-ui/core';

export interface RadioGroupProps {
    name: string;
    options: Array<AppOptions & { Subtitle?: string | React.FC<any> }>;
    label?: string;
    gridContainer?: GridProps;
    gridItem?: GridProps;
    WrapperComponent?: AppStyledComponent<any>;
    StyledInput?: AppStyledComponent<any>;
}

export const RadioButtonGroup = ({
    label,
    options,
    gridContainer,
    gridItem,
    onChange,
    meta,
    WrapperComponent = StyledRadioButtonGroup,
    StyledInput = StyledRadioButton,
    value: selectedValue,
    showOnError,
    ...props
}: RadioGroupProps & {
    meta?: FieldMetaProps<any>;
    showOnError?: boolean;
    value: string;
    onChange: (_: { target: { value: string } }) => void;
}) => {
    return (
        <WrapperComponent>
            {label && <MText fontWeight="semibold">{label}</MText>}
            <Grid container {...gridContainer}>
                {options?.map(({ value, option, Subtitle }) => (
                    <Grid item key={value} {...gridItem}>
                        <StyledInput id={value} selected={selectedValue === value}>
                            <input type="radio" onChange={onChange} {...props} value={value} />
                            <div>
                                <StyledRadioOption fontWeight="medium">{option}</StyledRadioOption>
                                {Subtitle && typeof Subtitle === 'string' && (
                                    <MText variant="body2" span>
                                        {Subtitle}
                                    </MText>
                                )}
                            </div>
                        </StyledInput>
                        {Subtitle && typeof Subtitle !== 'string' && <Subtitle />}
                    </Grid>
                ))}
            </Grid>
            {meta && <InputErrorText meta={meta} showOnError={showOnError} />}
        </WrapperComponent>
    );
};

const FormikRadioButtonGroup = (props: RadioGroupProps & { showOnError?: boolean }) => {
    return (
        <Field {...props}>
            {({ field, meta }: any) => <RadioButtonGroup meta={meta} {...props} {...field} />}
        </Field>
    );
};

export default FormikRadioButtonGroup;
