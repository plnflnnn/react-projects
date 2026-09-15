import { Helmet } from 'react-helmet';
import PageHero from '../../components/layout/PageHero/PageHero';
import Divider from '../../components/ui/Divider/Divider';
import Goods from '../../components/goods/Goods';
import coffee from './img/coffee.png';
import './forYourPleasure.sass';

const ForYourPleasurePage = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with list of our coffee goods" />
                <title>For your pleasure</title>
            </Helmet>
            <PageHero
                className="for_your_pleasure__header"
                title="For your pleasure"
                titleClassName="for_your_pleasure__header_title"
            />

            <div className="about_our_goods">
                <div className="container">
                    <div className="about_our_goods__wrapper">
                        <div className="about_our_goods__img">
                            <img src={coffee} alt="Cup of coffee" />
                        </div>

                        <div className="about_our_goods__wrapper-right">
                            <div className="about_our_goods__title">
                                About our goods
                            </div>

                            <Divider />

                            <div className="about_our_goods__description">
                                <div className="about_our_goods__description-text">
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

            <Goods />
        </>
    );
};

export default ForYourPleasurePage;
