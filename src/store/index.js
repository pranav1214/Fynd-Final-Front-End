import Vuex from "vuex";

import auth from "./modules/auth";

const store = new Vuex.Store( {
    modules: {
        auth: auth,
    },
    state: {
        isLoggedIn: !!localStorage.getItem( 'lbUser' )
    }
} );

export default store;