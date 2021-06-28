<template>
    <nav class="navbar navbar-expand-lg  navbar-light bg-light">
        <div class="container">
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" :to="links[0]">
                        Login
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="links[1]">
                        Signup
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="links[2]">
                        Products
                    </router-link>
                </li>
                <!-- <li class="nav-item">
                    <span class="nav-link">Hello <span class="text-primary">{{ email }}</span>
                    </span>
                </li> -->
                <li class="nav-item">
                    <span class="nav-link cursor-pointer" @click="logout()">Logout</span>
                 </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "AppNavbar",
    data() {
        return {
            links: [
                { name: "login" },
                { name: "signup" },
                { name: "products" }
            ]
        };
    },
    computed: {
        email() {
            return this.$store.state.auth.email;
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },
    },
    methods: {
        logout() {
            this.$store
                .dispatch( "logout" )
                .then( () => this.$router.push( { name: "login" } ) );
        }
    },
    created() {
        console.log( this.$store );
    },
};
</script>


<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>