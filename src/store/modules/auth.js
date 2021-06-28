import { login } from "@/services/auth";

const KEY_TOKEN = "token";

const KEY_EMAIL = "email";

const KEY_ROLE = "role";

const auth = {
    state: {
        token: localStorage.getItem( KEY_TOKEN ) || "",
        email: localStorage.getItem( KEY_EMAIL ) || "",
        role: localStorage.getItem( KEY_ROLE ) || "",
    },
    getters: {
        isAuthenticated( state ) {
            return !!state.token;
        },
    },
    mutations: {
        setToken( state, token ) {
            state.token = token;
        },
        setEmail( state, email ) {
            state.email = email;
        },
        setRole( state, role ) {
            state.role = role;
        },
    },
    actions: {
        login( { commit }, credentials ) {
            return login( credentials ).then( ( data ) => {
                const { token, email, role } = data;

                localStorage.setItem( KEY_TOKEN, token );
                localStorage.setItem( KEY_EMAIL, email );
                localStorage.setItem( KEY_ROLE, role );

                commit( "setToken", token );
                commit( "setEmail", email );
                commit( "setRole", role );

                return { status: 'success', data: { token, email, role } };
            } );
        },
        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_EMAIL );
            localStorage.removeItem( KEY_ROLE );

            commit( "setToken", "" );
            commit( "setEmail", "" );
            commit( "setRole", "" );

            return Promise.resolve();
        },
    },
};

export default auth;