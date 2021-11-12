import styled from '@emotion/styled';
import { getPaletteColor } from 'src/utils/theme/helper';
import { MText } from '../MText';

export const StyledRadioButtonGroup = styled.div(({ theme }) => ({
    '& > p': {
        margin: '8px 0 ',
        transform: theme.typography.transform.small,
        transformOrigin: 'bottom left'
    },
    '& > div': {}
}));

export const StyledRadioOption = styled(MText)({
    marginBottom: 4
});

export const StyledRadioButton = styled.label<AppBaseColorType & { selected?: boolean }>(
    ({ theme, palette, degree, selected }) => ({
        cursor: 'pointer',
        display: 'flex',
        flex: 1,
        // alignItems: "center",
        marginRight: 16,
        padding: '16px 0',

        '& > input': { opacity: 0, width: 0, height: 0 },
        '&: before': {
            boxShadow: `0 0 0 2px ${theme.palette.text.main}`,
            content: "''",
            width: '1rem',
            height: '1rem',
            aspectRatio: '1/1',
            marginTop: 6,
            marginRight: 12,
            borderRadius: '50%',
            boxSizing: 'border-box',
            border: `1px solid #FFF`
        },
        '&: after': {
            position: 'absolute',
            transition: '0.3s all ease-in-out',
            content: "''",
            width: 'calc(1rem - 2px)',
            height: 'calc(1rem - 2px)',
            margin:1,
            aspectRatio: '1/1',
            marginTop: 7,
            marginRight: 12,
            borderRadius: '50%',
            boxSizing: 'border-box',
            backgroundColor: getPaletteColor({ palette, degree }),
            transform: selected ? 'scale(1)' : 'scale(0)'
        }
    })
);
