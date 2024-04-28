import { useEffect, useReducer } from 'react';
import { fetchTemtems } from '../api';
import temtemReducer from '../reducers/temtemReducer';

const useTemtem = () => {
    const initialState = {
        temtems: [],
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(temtemReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTemtems();
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR', payload: error.message });
            }
        };

        fetchData();
    }, []);

    return state;
};

export default useTemtem;
