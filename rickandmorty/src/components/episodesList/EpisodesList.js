import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import useRmService from '../../services/RickAndMortyService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './episodesList.scss';

const EpisodesList = () => {
    const [episodesList, setEpisodesList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [episodesEnded, setEpisodesEnded] = useState(false);
    const [offset, setOffset] = useState(0);

    const {loading, error, getAllEpisodes} = useRmService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllEpisodes(offset)
        .then(onEpisodesListLoaded)
    }

    const onEpisodesListLoaded = (newEpisodesList) => {
        let ended = false;
        if(newEpisodesList.length < 20) {
            ended = true;
        }

        setEpisodesList([...episodesList, ...newEpisodesList]);
        setnewItemLoading(false);
        setOffset(offset + 20);
        setEpisodesEnded(ended);
    }

    const renderEpisodes = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <li className="episodes__item" key={item.id}>
                <Link to={`/episodes/${item.id}`}>
                    <div className="episodes__item-name">{item.name}</div>
                    <div className="episodes__item-txt">Episode: {item.episode}</div>
                    <div className="episodes__item-txt">Air Date: {item.airDate}</div>
                </Link>
            </li>
            )
        })
        return (
            <ul className="episodes__grid">
                {items}
            </ul>
        )
    }

    const items = renderEpisodes(episodesList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;


    return (
        <div className="episodes__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': episodesEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default EpisodesList;