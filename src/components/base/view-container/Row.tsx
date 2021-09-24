import styled from '@emotion/styled';

import { FlexContainer } from './Container';

interface RowViewProps {
    fullWidth?: boolean;
    wrap?: 'true' | 'false';
}

export const StyledRow = styled(FlexContainer)<RowViewProps>(({ wrap }) => ({
    flexDirection: 'row',
    ...(wrap && { flexWrap: 'wrap' })
}));

export const RowContainer = styled(StyledRow)({});
