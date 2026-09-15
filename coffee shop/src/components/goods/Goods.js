import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchGoods, filteredGoodsSelector, selectAll } from '../../store/goodsSlice';
import useFetchOnIdle from '../../hooks/useFetchOnIdle';
import Loading from '../ui/Loading/Loading';
import StatusMessage from '../ui/StatusMessage/StatusMessage';
import goodsImgs from './goodsImgs';
import './goods.sass';

const Goods = ({ filtered = false }) => {
    const items = useSelector(filtered ? filteredGoodsSelector : selectAll);
    const goodsLoadingStatus = useSelector((state) => state.goods.goodsLoadingStatus);

    useFetchOnIdle(goodsLoadingStatus, fetchGoods);

    if (goodsLoadingStatus === 'idle' || goodsLoadingStatus === 'loading') {
        return <Loading />;
    }

    if (goodsLoadingStatus === 'error') {
        return <StatusMessage>Loading error</StatusMessage>;
    }

    const renderGoodsList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition timeout={0} classNames="coffeeGoods">
                    <StatusMessage>Goods are not found</StatusMessage>
                </CSSTransition>
            );
        }

        return arr.map(({ id, src, name, country, price }) => {
            const img = goodsImgs(src);

            return (
                <CSSTransition key={id} timeout={300} classNames="coffeeGoods">
                    <Link to={`/coffee/${id}`} className="goods-item">
                        <div className="goods-item_img">
                            <img src={img} alt={name} />
                        </div>
                        <div className="goods-item_title">{name}</div>
                        <div className="goods-item_country">{country}</div>
                        <div className="goods-item_price">{price}</div>
                    </Link>
                </CSSTransition>
            );
        });
    };

    return (
        <TransitionGroup component="div" className="goods">
            {renderGoodsList(items)}
        </TransitionGroup>
    );
};

export default Goods;
