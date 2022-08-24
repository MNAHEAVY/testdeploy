import axios from 'axios'

//const URL_PRODUCTS = "http://localhost:4000/products";  // temporal para las pruebas

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_INSTRUMENT_BY_NAME = "GET_INSTRUMENTS_BY_NAME";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FILTERED_INSTRUMENTS = "FILTERED_INSTRUMENTS";


export const getAllProducts = () => {
    return async function (dispatch) {
        const products = await axios("/products")  // temporal para las pruebas

        return dispatch({
            type: GET_ALL_PRODUCTS,
            payload: products.data
        });
    };
};

export const getAllCategories = () => {
    return function (dispatch) {
        return dispatch({ type: GET_ALL_CATEGORIES, payload: null })
    }
}

export const updateProduct = (instrumentItem) => {
    return async function (dispatch) {
        const response = await axios.put(`/${instrumentItem._id}`,
            instrumentItem);
        return dispatch({
            type: UPDATE_PRODUCT,
            payload: response.data
        });
    };
};

export const updateProduct = (instrumentItem) => {
    return async function (dispatch) {
        const response = await axios.put(`${URL_PRODUCTS}/${instrumentItem._id}`,
            instrumentItem);
        return dispatch({
            type: UPDATE_PRODUCT,
            payload: response.data
        });
    };
};


export function createProduct(payload) {
    return async function (dispatch) {
        await axios.post('/products', payload)
    }
}

export function filteredIntruments(payload) {
    return async function (dispatch) {
        const filter = await axios.get(`/filter?${payload}`)
        dispatch({
            type: FILTERED_INSTRUMENTS,
            payload: filter.data
        })
    }
}

export function orderPerName(payload){
    return {
        type: "ORDEN_NAME",
        payload
    }
}
let queries={
    name:"",
    categorie:"",
    status:"",
    brand:""
}
export function filteredIntruments(payload) {
    return async function (dispatch) {
        let condition=[];
        queries={...queries,...payload}
        for(const key in queries){
            if(queries[key]) condition.push(`${key}=${queries[key]}`)
        }
        const filter = await axios.get(`/filter?${condition.join('&')}`)
        dispatch({
            type: FILTERED_INSTRUMENTS,
            payload: filter.data
        })
    }
}

