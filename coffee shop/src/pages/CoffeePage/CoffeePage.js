import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGoods, selectById } from '../../store/goodsSlice';
import useFetchOnIdle from '../../hooks/useFetchOnIdle';
import Loading from '../../components/ui/Loading/Loading';
import StatusMessage from '../../components/ui/StatusMessage/StatusMessage';
import PageHero from '../../components/layout/PageHero/PageHero';
import Divider from '../../components/ui/Divider/Divider';
import Page404 from '../NotFound/NotFound';
import goodsImgs from '../../components/goods/goodsImgs';
import '../OurCoffee/ourCoffee.sass';
import './coffeePage.sass';

const CoffeePage = () => {
    const { coffeeId } = useParams();
    const coffee = useSelector((state) => selectById(state, coffeeId));
    const coffeeLoadingStatus = useSelector((state) => state.goods.goodsLoadingStatus);

    useFetchOnIdle(coffeeLoadingStatus, fetchGoods);

    if (coffeeLoadingStatus === 'idle' || coffeeLoadingStatus === 'loading') {
        return <Loading />;
    }

    if (coffeeLoadingStatus === 'error') {
        return <StatusMessage padded>Loading error</StatusMessage>;
    }

    if (!coffee) {
        return <Page404 />;
    }

    const { src, name, country, description, price } = coffee;
    const img = goodsImgs(src);

    return (
        <>
            <Helmet>
                <meta name="description" content={name} />
                <title>{name}</title>
            </Helmet>
            <PageHero
                className="our_coffee__header"
                title="Our Coffee"
                titleClassName="our_coffee__header_title"
            />

            <div className="about_it">
                <div className="container">
                    <div className="about_it__wrapper">
                        <div className="about_it__img">
                            <img src={img} alt={name} />
                        </div>

                        <div className="about_it__wrapper-right">
                            <div className="about_it__title">About it</div>
                            <Divider />
                            <div className="about_it__description">
                                <div className="about_it__description-text">
                                    <span>{name}</span>
                                </div>
                                <div className="about_it__country"><span>Country:</span> {country}</div>
                                <div className="about_it__description-text">
                                    <span>Description:</span> {description}
                                </div>
                                <div className="about_it__price">Price: <span>{price}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoffeePage;
