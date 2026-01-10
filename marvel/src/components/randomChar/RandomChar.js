import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useRmService from '../../services/RickAndMortyService';

import './randomChar.scss';
const RandomChar = () => {

    const [char, setChar] = useState(null);
    const {loading, error, getRandomCharacter, clearError} = useRmService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId);
        }
        // eslint-disable-next-line
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        getRandomCharacter().then(onCharLoaded);
    };

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {id, name, gender , description, thumbnail} = char;
    let imgStyle = { objectFit: 'cover' };
    if (thumbnail?.includes('image_not_available')) {
        imgStyle = { objectFit: 'contain' };
    }

    return (
        <Link to={`/characters/${id}`} className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <p className="randomchar__descr">Gender - {gender}</p>
            </div>
        </Link>
    )
}

export default RandomChar;