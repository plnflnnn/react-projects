import { NavLink } from 'react-router-dom';
import { navItems } from '../../../constants/navItems';
import Divider from '../../ui/Divider/Divider';
import CoffeeCupIcon from '../../ui/icons/CoffeeCupIcon';
import './footer.sass';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_nav">
                <div className="coffee-icon black">
                    <CoffeeCupIcon />
                </div>
                <ul className="footer_nav_links">
                    {navItems.map(({ to, label, end }) => (
                        <li key={to}>
                            <NavLink end={end} to={to} className="footer_nav_link">
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <Divider />
        </footer>
    );
};

export default Footer;
