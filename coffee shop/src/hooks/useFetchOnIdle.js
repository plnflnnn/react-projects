import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useFetchOnIdle = (status, thunk) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(thunk());
        }
    }, [status, thunk]);
};

export default useFetchOnIdle;
