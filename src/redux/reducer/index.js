const {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT,
    FILTERED_INSTRUMENTS,
    CREATE_PRODUCT
} = require('../actions/index');

const initialState = {
    instruments: [],
    allInstruments: [],
    favoriteInstruments: [],
    retrievedInstrument: null,
    filteredIntruments: [],
    
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allInstruments: action.payload,
                instruments: action.payload,
            }

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                retrievedInstrument: action.payload
            }

        case UPDATE_PRODUCT:
            const allInstrumentsUpdated = state.allInstruments.map(item =>
            item._id === action.payload._id ? action.payload : item);

            const instrumentsUpdated = state.instruments.map(item =>
                item._id === action.payload._id ? action.payload : item);

            return {
                ...state,
                allInstruments: allInstrumentsUpdated,
                instruments: instrumentsUpdated,
                retrievedInstrument: action.payload
            }

        case CREATE_PRODUCT:
                return{
                    ...state,
                    allInstruments: [action.payload,...state.allInstruments]
                }
        case FILTERED_INSTRUMENTS:
            console.log(action.payload);
                return{
                ...state, 
                instruments: action.payload
            }
        default:
            return state
    }
}
