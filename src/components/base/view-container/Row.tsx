import styled from '@emotion/styled';

import { MFlexContainerView } from './Container';

interface RowViewProps {
    fullWidth?: boolean;
    wrap?: 'true' | 'false';
}

export const MRowView = styled(MFlexContainerView)<RowViewProps>(({ wrap }) => ({
    flexDirection: 'row',
    ...(wrap && { flexWrap: 'wrap' })
}));
