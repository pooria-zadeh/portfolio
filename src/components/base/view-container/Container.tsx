import styled from '@emotion/styled';
import { Property } from 'csstype';

export type ContainerProps = { maxWidth?: AppBreakpointKeys };

export const MContainerView = styled.div<ContainerProps>(({ theme, maxWidth = 'xl' }) => ({
    width: '100%',
    maxWidth: theme.breakpoints.breakpointsKeys[maxWidth],
    margin: '0 auto'
}));

export interface FlexViewProps extends ContainerProps {
    alignItems?: Property.AlignItems;
    alignSelf?: Property.AlignSelf;
    justifyContent?: Property.JustifyContent;
    w?: number;
    wrap?:boolean
}

export const MFlexContainerView = styled.div<FlexViewProps>(
    ({ theme, alignItems, justifyContent, alignSelf, w, maxWidth,wrap }) => ({
        display: 'flex',
        ...(alignItems && { alignItems }),
        ...(wrap && { flexWrap:'wrap' }),
        ...(justifyContent && { justifyContent }),
        ...(alignSelf && { alignSelf }),
        ...(w && { width: w }),
        ...(maxWidth && { maxWidth: theme.breakpoints.breakpointsKeys[maxWidth] })
    })
);
