import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import useRmService from '../../services/RickAndMortyService';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useRmService();

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const sceleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spiner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;


    return (
        <div className="char__info">
            {sceleton}
            {errorMessage}
            {spiner}
            {content}
        </div>
    )

}

const View = ({ char }) => {
    const { id, name, description, gender, location,  thumbnail } = char;

    let imgStyle = { objectFit: 'cover' };
    if (thumbnail?.includes('image_not_available')) {
        imgStyle = { objectFit: 'contain' };
    }

    return (
        <>
            <Link to={`/characters/${id}`} className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                </div>
            </Link>

            <div className="char__descr">
                {description || 'No description available'}
            </div>
            <div className="char__descr">Gender - {gender}</div>
            <div className="char__descr">Location - {location}</div>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;