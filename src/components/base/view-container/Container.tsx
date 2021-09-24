import styled from '@emotion/styled';
import { Property } from 'csstype';

export type ContainerProps = { maxWidth?: AppBreakpointKeys };

export const Container = styled.div<ContainerProps>(({ theme, maxWidth = 'xl' }) => ({
    width: '100%',
    maxWidth: theme.breakpoints.breakpointsKeys[maxWidth],
    margin: '0 auto'
}));

export interface FlexViewProps extends ContainerProps {
    alignItems?: Property.AlignItems;
    alignSelf?: Property.AlignSelf;
    justifyContent?: Property.JustifyContent;
    w?: number;
}

export const FlexContainer = styled.div<FlexViewProps>(
    ({ theme, alignItems, justifyContent, alignSelf, w, maxWidth }) => ({
        display: 'flex',
        ...(alignItems && { alignItems }),
        ...(justifyContent && { justifyContent }),
        ...(alignSelf && { alignSelf }),
        ...(w && { width: w }),
        ...(maxWidth && { maxWidth: theme.breakpoints.breakpointsKeys[maxWidth] })
    })
);
