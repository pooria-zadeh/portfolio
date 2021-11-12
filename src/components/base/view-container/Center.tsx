import styled from '@emotion/styled';
import { Property } from 'csstype';
import { MFlexContainerView } from './Container';

interface CenterView {
    alignSelf?: Property.AlignSelf;
}

export const MCenterView = styled(MFlexContainerView)<CenterView>(({ alignSelf }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));
