import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAll, fetchBestGoods } from '../../store/bestGoodsSlice';
import useFetchOnIdle from '../../hooks/useFetchOnIdle';
import Loading from '../ui/Loading/Loading';
import StatusMessage from '../ui/StatusMessage/StatusMessage';
import goodsImgs from './goodsImgs';

const BestGoods = () => {
    const bestGoods = useSelector(selectAll);
    const bestGoodsLoadingStatus = useSelector((state) => state.bestGoods.bestGoodsLoadingStatus);

    useFetchOnIdle(bestGoodsLoadingStatus, fetchBestGoods);

    if (bestGoodsLoadingStatus === 'idle' || bestGoodsLoadingStatus === 'loading') {
        return <Loading />;
    }

    if (bestGoodsLoadingStatus === 'error') {
        return <StatusMessage>Loading error</StatusMessage>;
    }

    if (bestGoods.length === 0) {
        return <StatusMessage>Information is not found</StatusMessage>;
    }

    return (
        <div className="best_goods">
            {bestGoods.map(({ id, src, name, price }) => {
                const img = goodsImgs(src);

                return (
                    <Link to={`/coffee/${id}`} key={id} className="best_goods-item">
                        <div className="best_goods-item_img">
                            <img src={img} alt={name} />
                        </div>
                        <div className="best_goods-item_title">{name}</div>
                        <div className="best_goods-item_price">{price}</div>
                    </Link>
                );
            })}
        </div>
    );
};

export default BestGoods;
