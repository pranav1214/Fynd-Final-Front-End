import axios from "axios";

import { successHandler, errorHandler } from "./helper";

const KEY_TOKEN = "token";


//LOGIN API CALL

const login = ( credentials ) => {
    return axios
    .post( `http://localhost:3000/auth/login`, credentials, {
        header: {
            "Content-Type": "application/json"
        },
    },
    {
        withCredentials: true
    }
     )
     .then( successHandler )
     .catch( errorHandler );
};

//Signup axios post request
const signup = ( credentials ) => {
    return axios
    .post( `http://localhost:3000/auth/register`, credentials,
    {
        headers: {
            "Content-Type": "application/json"
        },
    },
    { withCredentails: true }
    )
    .then( successHandler )
    .catch( errorHandler );
};

//Get all products
const getProducts = () => {
    return axios.get( `http://localhost:3000/product/`,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem( KEY_TOKEN ),
        },
    },
    {
        withCredentials: true
    } )
    .then( successHandler )
    .catch( errorHandler );
};

//Get a single product by id

const getProductById = ( id ) => {
    return axios.get( `http://localhost:3000/product/${id}` )
        .then( successHandler )
        .catch( errorHandler );
};

// Add Product Admin side
const addProduct = ( credentials ) => {
    return axios.post( `http://localhost:3000/product/`, credentials,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem( KEY_TOKEN )
        },
    } )
    .then( successHandler )
    .catch( errorHandler );
};

// Edit Product details Admin side
const editProduct = ( id, credentials ) => {
    return axios.patch( `http://localhost:3000/product/${id}`, credentials,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem( KEY_TOKEN )
        },
    } )
    .then( successHandler )
    .catch( errorHandler );
};


export {
    login,
    signup,
    getProducts,
    getProductById,
    addProduct,
    editProduct

}