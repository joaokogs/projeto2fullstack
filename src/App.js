import React, { useReducer, useState } from 'react';
import SearchBar from './components/SearchBar';
import { fetchTemtemById } from './api';
import './styles.css';

const actionTypes = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',
    CLEAR_DATA: 'CLEAR_DATA',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FETCH_START:
            return { ...state, loading: true, error: null };
        case actionTypes.FETCH_SUCCESS:
            return { ...state, temtem: action.payload, loading: false };
        case actionTypes.FETCH_ERROR:
            return { ...state, error: action.payload, loading: false };
        case actionTypes.CLEAR_DATA:
            return { ...state, temtem: null };
        default:
            return state;
    }
};

const initialState = {
    temtem: null,
    loading: false,
    error: null,
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [query, setQuery] = useState('');

    const handleSubmit = async (query) => {
        dispatch({ type: actionTypes.FETCH_START });
        try {
            const data = await fetchTemtemById(query);
            dispatch({ type: actionTypes.FETCH_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_ERROR, payload: error.message });
        }
    };

    return (
        <div className="container">
            <h1>Busque por Temtems</h1>
            <SearchBar onSubmit={handleSubmit} query={query} setQuery={setQuery} />
            {state.loading && <p>Carregando...</p>}
            {state.error && <p>Erro: {state.error}</p>}
            {state.temtem && (
                <div className="temtem-card">
                    <h2>{state.temtem.name}</h2>
                    <p>Número: {state.temtem.number}</p>
                    <p>Hp: {state.temtem.stats.hp}</p>
                    <p>Sta: {state.temtem.stats.sta}</p>
                    <p>Spd: {state.temtem.stats.spd}</p>
                    <p>Atk: {state.temtem.stats.atk}</p>
                    <p>Def: {state.temtem.stats.def}</p>
                    <p>SpAtk: {state.temtem.stats.spatk}</p>
                    <p>SpDef: {state.temtem.stats.spdef}</p>
                    <p>Total: {state.temtem.stats.total}</p>
                    <img src={state.temtem.portraitWikiUrl} alt={state.temtem.name} />
                </div>
            )}
        </div>
    );
};

export default App;
