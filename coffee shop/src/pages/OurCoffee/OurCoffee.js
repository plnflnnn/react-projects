import { Helmet } from 'react-helmet';
import PageHero from '../../components/layout/PageHero/PageHero';
import Divider from '../../components/ui/Divider/Divider';
import Filter from '../../components/filter/Filter';
import beans from './img/our_beans.png';
import './ourCoffee.sass';

const OurCoffee = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with list of our coffee goods" />
                <title>Our coffee</title>
            </Helmet>
            <PageHero
                className="our_coffee__header"
                title="Our Coffee"
                titleClassName="our_coffee__header_title"
            />

            <div className="about_our_beans">
                <div className="container">
                    <div className="about_our_beans__wrapper">
                        <div className="about_our_beans__img">
                            <img src={beans} alt="Coffee beans" />
                        </div>

                        <div className="about_our_beans__wrapper-right">
                            <div className="about_our_beans__title">
                                About our beans
                            </div>

                            <Divider />

                            <div className="about_our_beans__description">
                                <div className="about_our_beans__description-text">
                                    Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. <br /> <br />
                                    Afraid at highly months do things on at. Situation recommend objection do intention
                                    so questions.
                                    As greatly removed calling pleased improve an. Last ask him cold feel
                                    met spot shy want. Children me laughing we prospect answered followed. At it went
                                    is song that held help face.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="big_divider"></div>
                </div>
            </div>

            <Filter />
        </>
    );
};

export default OurCoffee;
