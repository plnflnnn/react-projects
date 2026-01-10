import { Helmet } from 'react-helmet';

import './singleCharacterLayout.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SingleCharacterLayout = ({data}) => {

    const {name, description, gender, location, episodes, thumbnail} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} page`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Gender - {gender}</p>
                <p className="single-comic__descr">Location - {location}</p>
                <p className="single-comic__descr">
                    Episodes:<br></br>
                    {Array.isArray(episodes) && episodes.map((episode, i) => (
                        <span key={episode}>
                            <Link to={`/episodes/${episode}`} key={episode} >{episode}</Link>
                            {i < episodes.length - 1 && ', '}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    )
}

export default SingleCharacterLayout;