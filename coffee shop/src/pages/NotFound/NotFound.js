import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageHero from '../../components/layout/PageHero/PageHero';
import '../ForYourPleasurePage/forYourPleasure.sass';

const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page not found" />
                <title>Page not found</title>
            </Helmet>
            <PageHero
                className="for_your_pleasure__header page-not-found"
                title="This page does not exist"
                titleClassName="for_your_pleasure__header_title"
            >
                <Link to="/" className="page-not-found__link">Back to main page</Link>
            </PageHero>
        </>
    );
};

export default Page404;
