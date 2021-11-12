import Sidebar from '@/components/sidebar/sidebar';
import Navbar from '@/components/navbar/navbar';
import BaseLayout from './base.layout';
import styled from '@emotion/styled';

interface Props extends AppLocalization {
    children: React.ReactNode;
}

const Main = styled.div({
    position: 'fixed',
    left: 280,
    top: 80,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    padding: '20px 50px',
    '@media(max-width:680px)': {
        left: 0,
        transition: '.4s'
    }
});

const HomeLayout = ({ children, localization }: Props) => {
    return (
        <BaseLayout localization={localization}>
            <Navbar />
            <Sidebar />
            <Main>{children}</Main>
        </BaseLayout>
    );
};

export default HomeLayout;
