import { NavLink } from 'react-router-dom';
import { navItems } from '../../../constants/navItems';
import CoffeeCupIcon from '../../ui/icons/CoffeeCupIcon';
import './navigator.sass';

const Navigator = () => {
    const activeNavLink = ({ isActive }) => ({
        color: isActive ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.7)'
    });

    return (
        <nav className="nav">
            <div className="coffee-icon">
                <CoffeeCupIcon />
            </div>
            <ul className="nav_links">
                {navItems.map(({ to, label, end }) => (
                    <li key={to}>
                        <NavLink end={end} to={to} style={activeNavLink} className="nav_link">
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigator;
