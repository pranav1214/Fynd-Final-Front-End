export const successHandler = ( response ) => {
    console.log( response.data )
    return response.data;
    
}

export const errorHandler = ( error ) => {
    console.log( error.message );
    throw error;
};