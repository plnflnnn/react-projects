import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const PageLayout = () => {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
};

export default PageLayout;
