import useTranslation from '@/i18n/hooks/useTranslation';
import styled from '@emotion/styled';
import { Field, useField } from 'formik';
import React, { memo, useRef } from 'react';
import { useMemo } from 'react';
import { MSelectInputFormik, StyledSelectContainer } from '../dropdown/select';

import { MText } from '../MText';
import { Spacer } from '../spacer';
import { MColumnView } from '../view-container/Column';
import { MRowView } from '../view-container/Row';
import { BSInput, BSLabel, BSTwoDigitInputContainer, CommonInputRoot } from './styled';
import { useSubmitOnBlur } from './submitOnBlur';
import { MInputProps } from './type.input';

const TwoDigitInput = styled(BSInput)({
    width: 'calc(2ch + 4px)',
    textAlign: 'center',
    margin: 'auto',
    minWidth: '2ch'
});

type TwoDigitInputProps = MInputProps & {
    InputComponent?: AppStyledComponent<any>;
    WrapperComponent?: AppStyledComponent<any>;
    submitOnBlur?: (_: any) => void;
};

export const CCTwoDigitInputField = ({
    InputComponent = TwoDigitInput,
    WrapperComponent = BSTwoDigitInputContainer,
    submitOnBlur,
    value,
    onInput,
    ...props
}: TwoDigitInputProps) => {
    const { onBlur, onChange } = useSubmitOnBlur(submitOnBlur);
    const handleChange: MInputProps['onChange'] = (e) => {
        onChange();
        if (e.target.value.length <= 2) {
            props.onChange && props?.onChange(e);
        }
    };
    const ref = useRef<HTMLInputElement | null>();

    return (
        <WrapperComponent onClick={() => ref.current?.focus()} value={Boolean(value)}>
            <InputComponent
                onBlur={onBlur}
                onChange={handleChange}
                type="number"
                onInput={(e: any) => {
                    onInput && onInput(e);
                    if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
                }}
                value={value}
                {...props}
                ref={(refs: HTMLInputElement) => (ref.current = refs)}
            />
        </WrapperComponent>
    );
};

export const FormikTwoDigitInputField = (props: Omit<TwoDigitInputProps, 'value'>) => {
    const [field, meta] = useField(props.name);
    return <CCTwoDigitInputField {...props} {...field} />;
};

const WrapperTimeInput = styled.div({
    margin: 16
});

const AMPMInput = styled.label(() => ({
    display: 'flex',
    '& > input': {
        width: 0,
        height: 0,
        opacity: 0
    }
}));

const AMPMButton = styled(MText)<{ active?: boolean }>(({ theme, active }) => ({
    cursor: 'pointer',
    margin: '4px 8px',
    borderBottom: `1px solid transparent`,
    color: active ? theme.palette.secondary['700'] : theme.palette.secondary['200'],
    padding: 0,
    '&:hover': {
        borderBottomColor: theme.palette.secondary['700']
    }
}));

export const CCTimeHMInput = ({
    label,
    WrapperComponent = WrapperTimeInput
}: {
    label?: string;
    WrapperComponent?: React.FC<any>;
}) => {
    const { t } = useTranslation();
    return (
        <WrapperComponent>
            <BSLabel>{label}</BSLabel>
            <MRowView alignItems="center">
                <CCTwoDigitInputField
                    name="hour"
                    onInput={(e) => {
                        if (+(e.target as any).value > 12) (e.target as any).value = 12;
                    }}
                />
                <CCTwoDigitInputField
                    name="minute"
                    onInput={(e) => {
                        if (+(e.target as any).value > 60) (e.target as any).value = 60;
                    }}
                />
                <div>
                    <AMPMButton active={true}>{t('pm')}</AMPMButton>
                    <AMPMButton active={false}>{t('am')}</AMPMButton>
                </div>
            </MRowView>
        </WrapperComponent>
    );
};

const SelectWrapperDiv = styled(CommonInputRoot)({
    minWidth: 100
});

const AMPMSelect = memo(({ name }: { name: string }) => {
    return (
        <Field
            name={name}
            InputRoot={SelectWrapperDiv}
            component={MSelectInputFormik}
            options={[
                { option: 'AM', value: 'am' },
                { option: 'PM', value: 'pm' }
            ]}
            placeholder={'am/pm'}
        />
    );
});

export const FormikTimeHMInput = ({
    label,
    WrapperComponent = WrapperTimeInput,
    name
}: {
    name: string;
    label?: string;
    WrapperComponent?: React.FC<any>;
}) => {
    const { t } = useTranslation();
    const { hourName, minName, ampmName } = useMemo(() => {
        return {
            hourName: `${name}Hour`,
            minName: `${name}Minute`,
            ampmName: `${name}ampm`
        };
    }, [name]);

    return (
        <WrapperComponent>
            {/* {label && <BSLabel>{label}</BSLabel>} */}
            <MRowView alignItems="center">
                <MText css={{ width: '8ch' }} variant="h6">
                    {label}
                </MText>
            
                <MText>{t('time')}</MText>
                <FormikTwoDigitInputField
                    name={hourName}
                    onInput={(e) => {
                        if (+(e.target as any).value > 12) (e.target as any).value = 12;
                    }}
                />
                <MText css={{ margin: 8 }} variant="h2" fontWeight="bold">
                    :
                </MText>
                <FormikTwoDigitInputField
                    name={minName}
                    onInput={(e) => {
                        if (+(e.target as any).value > 59) (e.target as any).value = 59;
                    }}
                />
                <Spacer space="8px" />
                <AMPMSelect name={`${name}ampm`} />
            </MRowView>
        </WrapperComponent>
    );
};
