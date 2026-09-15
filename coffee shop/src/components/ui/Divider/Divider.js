import CoffeeBeansIcon from '../icons/CoffeeBeansIcon';
import './divider.sass';

const Divider = () => {
    return (
        <div className="divider_block black">
            <div className="divider"></div>
            <div className="coffee-beans black">
                <CoffeeBeansIcon />
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default Divider;
