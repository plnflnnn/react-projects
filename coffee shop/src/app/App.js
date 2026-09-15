import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout/PageLayout';
import MainPage from '../pages/MainPage/MainPage';
import OurCoffee from '../pages/OurCoffee/OurCoffee';
import CoffeePage from '../pages/CoffeePage/CoffeePage';
import ForYourPleasurePage from '../pages/ForYourPleasurePage/ForYourPleasurePage';
import Page404 from '../pages/NotFound/NotFound';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/our_coffee" element={<OurCoffee />} />
                    <Route path="/for_your_pleasure" element={<ForYourPleasurePage />} />
                    <Route path="/coffee/:coffeeId" element={<CoffeePage />} />
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
