import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navigator from '../../components/layout/Navigator/Navigator';
import Divider from '../../components/ui/Divider/Divider';
import CoffeeBeansIcon from '../../components/ui/icons/CoffeeBeansIcon';
import BestGoods from '../../components/goods/BestGoods';
import './mainPage.sass';

const MainPage = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Coffee house main page" />
                <title>Coffee house</title>
            </Helmet>
            <section className="main">
                <div className="container">
                    <Navigator />

                    <h1 className="main_title">Everything You Love About Coffee</h1>

                    <div className="divider_block">
                        <div className="divider"></div>
                        <div className="coffee-beans">
                            <CoffeeBeansIcon />
                        </div>
                        <div className="divider"></div>
                    </div>

                    <h2 className="main_subtitle">We makes every day full of energy and taste</h2>
                    <h2 className="main_subtitle">Want to try our beans?</h2>

                    <Link to="/our_coffee" className="main_more">More</Link>
                </div>
            </section>

            <div className="about_us">
                <div className="container">
                    <div className="title">About Us</div>
                    <Divider />

                    <div className="about_us__description">
                        Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible.
                        Afraid at highly months do things on at. Situation recommend objection do intention
                        so questions. As greatly removed calling pleased improve an. Last ask him cold feel
                        met spot shy want. Children me laughing we prospect answered followed. At it went
                        is song that held help face. <br /> <br />
                        Now residence dashwoods she excellent you. Shade being under his bed her, Much
                        read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant
                        horrible but confined day end marriage. Eagerness furniture set preserved far
                        recommend. Did even but nor are most gave hope. Secure active living depend son
                        repair day ladies now.
                    </div>
                </div>
            </div>

            <section className="our_best">
                <div className="container">
                    <div className="title">Our best</div>
                    <BestGoods />
                </div>
            </section>
        </>
    );
};

export default MainPage;
