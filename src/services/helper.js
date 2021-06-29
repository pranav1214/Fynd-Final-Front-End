export const successHandler = ( response ) => {
    return response.data;
    
}

export const errorHandler = ( error ) => {
    console.log( error.message );
    throw error;
};