const temtemReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                temtems: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                temtems: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default temtemReducer;
