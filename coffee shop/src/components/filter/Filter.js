import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { countryFilterChanged, searchQueryChanged, fetchFilters, selectAll } from '../../store/filtersSlice';
import useFetchOnIdle from '../../hooks/useFetchOnIdle';
import Loading from '../ui/Loading/Loading';
import StatusMessage from '../ui/StatusMessage/StatusMessage';
import Goods from '../goods/Goods';
import './filters.sass';

const Filter = () => {
    const { filtersLoadingStatus, countryFilter, searchQuery } = useSelector((state) => state.filters);
    const filters = useSelector(selectAll);
    const dispatch = useDispatch();

    useFetchOnIdle(filtersLoadingStatus, fetchFilters);

    if (filtersLoadingStatus === 'idle' || filtersLoadingStatus === 'loading') {
        return <Loading />;
    }

    if (filtersLoadingStatus === 'error') {
        return <StatusMessage>Loading error</StatusMessage>;
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <StatusMessage>Filters are not found</StatusMessage>;
        }

        return arr.map(({ id, name }) => {
            const btnClass = classNames('filter_button', {
                active: name === countryFilter
            });

            return (
                <button
                    type="button"
                    className={btnClass}
                    id={id}
                    key={id || name}
                    onClick={() => dispatch(countryFilterChanged(name))}
                >
                    {name}
                </button>
            );
        });
    };

    return (
        <div className="filter">
            <div className="container">
                <div className="search_and_filter">
                    <div className="search_section">
                        <label className="looking_for" htmlFor="coffee-search">Looking for</label>
                        <input
                            id="coffee-search"
                            type="text"
                            className="search"
                            value={searchQuery}
                            onChange={(event) => dispatch(searchQueryChanged(event.target.value))}
                            placeholder="start typing here..."
                        />
                    </div>

                    <div className="filter_section">
                        <div className="or_filter">Or filter</div>
                        <div className="filter_buttons">
                            {renderFilters(filters)}
                        </div>
                    </div>
                </div>

                <Goods filtered />
            </div>
        </div>
    );
};

export default Filter;
