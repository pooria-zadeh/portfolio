import styled from '@emotion/styled';
import { getPaletteColor, getTextColor, textWeight } from 'src/theme/helper';
import { MText } from '../MText';

export interface StyledInputValueProps {
    value?: boolean;
    error?: boolean;
    min_w?: number;
}

export const BSInput = styled.input<AppBaseColorType & AppTypographyVariant & AppTypographyWeight>(
    ({ theme, fontWeight: weight = 'medium', variant = 'body1', palette, degree,css }) => ({
        ...(css&&css),
        color: getTextColor({ degree, palette }),
        fontWeight: textWeight[weight],
        '&::placeholder': {
            color: theme.palette.grey['300'],
            fontWeight: 400
        },
        padding: 0,
        minWidth: 150,
        flex: 1,
        backgroundColor: 'inherit',
        border: 'none',
        outline: 'none',
        '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color'
        },
        ...theme.typography[variant]
    })
);

export const BSTextArea = styled.textarea<
    AppBaseColorType & AppTypographyVariant & AppTypographyWeight
>(({ theme, fontWeight: weight = 'medium', variant = 'body1', palette, degree ,css}) => ({
    ...(css&&css),
    color: getTextColor({ degree, palette }),
    fontWeight: textWeight[weight],
    '&::placeholder': {
        color: theme.palette.grey['300'],
        fontWeight: 400
    },
    padding: 0,
    minWidth: 150,
    flex: 1,
    backgroundColor: 'inherit',
    border: 'none',
    outline: 'none',
    '&:-webkit-autofill': {
        transitionDelay: '9999s',
        transitionProperty: 'background-color, color'
    },
    ...theme.typography[variant]
}));

export const BSInputContainer = styled.div<StyledInputValueProps>(({ theme }) => ({
    minWidth: 200,
    width: '100%',
    '& > p': {
        margin: '8px 0 ',
        transform: theme.typography.transform.small,
        transformOrigin: 'bottom left'
    }
}));

export const CommonInputRoot = styled(BSInputContainer)(({ theme }) => ({}));

export const CommonInputWrapper = styled.div<{ error?: boolean }>(({ theme, error }) => ({
    border: '1px solid',
    borderColor: theme.palette.text.main,
    borderRadius: theme.shape.borderRadius.common,
    display: 'flex',
    alignItems: 'center',
    '& > button': {
        padding: 0
    },

    '& > svg:nth-of-type(1)': {
        marginRight: 24
    },
    padding: 16,
    ...(error && {
        borderColor: theme.palette.info.red
    })
}));

export const ModalSearchInput = styled(BSInput)({
    cursor: 'pointer',
    minWidth: 100
});

export const BSTwoDigitInputContainer = styled.div<StyledInputValueProps>(({ theme, value }) => ({
    border: '1px solid',
    borderColor: theme.palette.text.main,
    borderRadius: theme.shape.borderRadius.common,
    cursor: 'text',
    padding: 16,
    // marginRight: 16,
    display: 'inline-block',
    'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0
    },
    'input[type=number]': {
        MozAppearance: 'textfield'
    }
}));

export const BSLabel = styled(MText)(({ theme }) => ({
    transform: theme.typography.transform.small,
    transformOrigin: 'bottom left'
}));
