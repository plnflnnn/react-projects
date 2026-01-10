import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useRmService from '../../services/RickAndMortyService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {loading, error, getEpisode, getCharacter, clearError} = useRmService();

        useEffect(() => {
            updateData()
            // eslint-disable-next-line
        }, [id])

        const updateData = () => {
            clearError();
            // eslint-disable-next-line
            switch (dataType) {
                case 'episode':
                    getEpisode(id).then(onDataLoaded);
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded);
                    break;
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !data) ? <Component data={data}/> : null;

        return (
            <>
                {errorMessage}
                {spinner}
                {content}
            </>
        )
}

export default SinglePage;