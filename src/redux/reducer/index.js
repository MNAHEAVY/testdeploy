const {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT,
    FILTERED_INSTRUMENTS,
    CREATE_PRODUCT,
    ORDER_PRODUCTS,
    GET_REVIEWS_BY_PRODUCT_ID,
    ADD_REVIEW,
    ACTIVE_LOADING
} = require('../actions/index');

function orderMayMen(array, prop) {
    array.sort((a, b) => {
        if (a[prop] < b[prop]) return 1;
        if (a[prop] > b[prop]) return -1;
        return 0;
    });
}
function orderMenMay(array, prop) {
    array.sort((a, b) => {
        if (a[prop] < b[prop]) return -1;
        if (a[prop] > b[prop]) return 1;
        return 0;
    });
}

const initialState = {
    instruments: [],
    allInstruments: [],
    favoriteInstruments: [],
    retrievedInstrument: null,
    productReviewList: [],
    isLoading: true
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allInstruments: action.payload,
                instruments: action.payload,
                isLoading: false
            }

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                retrievedInstrument: action.payload,
                isLoading: false
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
            return {
                ...state,
                allInstruments: [action.payload, ...state.allInstruments]
            }

        case FILTERED_INSTRUMENTS:
            return {
                ...state,
                instruments: action.payload,
                isLoading: false
            }

        case ORDER_PRODUCTS:
            let sortedProducts = JSON.parse(JSON.stringify(state.instruments))
            switch (action.payload) {
                case "Up to Down":
                    orderMayMen(sortedProducts, "name");
                    break;
                case "Down to Up":
                    orderMenMay(sortedProducts, "name");
                    break;
                case "Higher price":
                    orderMayMen(sortedProducts, "price")
                    break;
                case "Lower price":
                    orderMenMay(sortedProducts, "price");
                    break;
                default:
                    break;
            }
            return {
                ...state,
                instruments: sortedProducts,
                isLoading: false
            }

        case GET_REVIEWS_BY_PRODUCT_ID:
            return {
                ...state,
                productReviewList: action.payload
            }

        case ADD_REVIEW:
            return {
                ...state,
                productReviewList: [
                    action.payload,
                    ...state.productReviewList]
            }

        case ACTIVE_LOADING:
            return {
                ...state,
                isLoading: true
            }

        default:
            return state
    }

}
