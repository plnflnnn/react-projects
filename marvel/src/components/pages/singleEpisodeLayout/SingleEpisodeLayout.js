import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CharacterName from '../../characterName/CharacterName.js';

import './singleEpisodeLayout.scss';

const SingleEpisodeLayout = ({data}) => {

    const {name, episode, airDate, characters = []} = data;

    return (
        <div className="single-episode">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} episode`}
                    />
                <title>{name}</title>
            </Helmet>
            <div className="single-episode__info">
                <h2 className="single-episode__name">{name}</h2>
                <p className="single-episode__descr"><b>Episode:</b> {episode}</p>
                <p className="single-episode__descr"><b>Air Date:</b> {airDate}</p>
                <p className="single-episode__descr"><b>Characters:</b></p>
                <ul className="single-episode__descr">
                    {Array.isArray(characters) &&
                        characters.map((charId) => (
                            <CharacterName key={charId} charId={charId} />
                        ))
                    }
                </ul>
            </div>
            <Link to="/episodes" className="single-episode__back">Back to all</Link>
        </div>
    )
}

export default SingleEpisodeLayout;