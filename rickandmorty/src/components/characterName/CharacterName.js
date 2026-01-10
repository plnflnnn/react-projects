import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useRmService from '../../services/RickAndMortyService';

const CharacterName = ({ charId }) => {
    const { getCharacter } = useRmService();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        getCharacter(charId).then(setCharacter);
        // eslint-disable-next-line
    }, []);

    if (!character) return null;

    return (
        <li>
            <Link to={`/characters/${character.id}`}>
                {character.name}
            </Link>
        </li>
    );
};

export default CharacterName;
