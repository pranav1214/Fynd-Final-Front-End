<template>
    <div class="container">
        <div class="row">
            <h1>Login</h1>
            <hr />

            <!-- Login Form -->
            <form name="form" @submit.prevent="login">
                <!-- Email input & validation -->
                <div class="form-group my-2">
                    <label for="email"> 
                        Enter email: 
                    </label>

                    <input type="email"
                    class="form-control w-50"
                    name="email"
                    id="email"
                    placeholder="abc@example.com"
                    v-model="form.email"
                    @blur="$v.form.email.$touch()"
                    :class="{
                        'is-invalid': shouldAppendErrorClass( $v.form.email ),
                        'is-valid': shouldAppendValidClass( $v.form.email ),
                    }"
                    />

                    <div v-if="$v.form.email.$error">
                        <div v-if="!$v.form.email.required" class="text-danger">
                            <small>
                                Invalid email address
                            </small>
                        </div>
                    </div>   
                </div>

                <!-- Password input & validation -->
                <div class="form-group my-2">
                    <label for="password">
                        Enter Password: 
                    </label>
                    <input type="password"
                    autocomplete="off"
                    class="form-control w-50"
                    name="password"
                    id="password"
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
                    :class="{
                        'is-invalid': shouldAppendErrorClass( $v.form.password ),
                        'is-valid': shouldAppendValidClass( $v.form.password )
                    }"
                    />

                    <div v-if="$v.form.password.$error">
                        <div v-if="!$v.form.password.required" class="text-danger">
                            <small>
                                Password is required
                            </small>
                        </div>
                        <div v-if="!$v.form.password.minLength" class="text-danger">
                            <small>
                                Password must have atleast 8 characters
                            </small>
                        </div>
                    </div>
                </div>

                <div class="form-group my-2">
                    <button class="btn btn-primary me-5" :disabled="$v.form.$invalid">
                        Login
                    </button>
                    <app-spinner v-if="processing" />
                </div>
                <!-- <a href="#" class="me-0 text-body fw-bold">
                    Forgot Password
                </a> -->
            </form>

            <div class="mt-2">
                <router-link :to="{ name: 'signup' }" class="text-body initial-text">
                    Don't have an account? Click here
                </router-link>    
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { email, required, minLength } from "vuelidate/lib/validators";


export default {
    name: "AppLogin",
    title: "Login | Grocery Mart",
    data() {
        return {
            processing: false,
            form: {
                email: "",
                password: "",
            },
        };
    },
    validations: {
        form: {
            email: {
                email,
                required
            },
            password: {
                required,
                minLength: minLength( 8 )
            },
        },
    },
    methods: {
        shouldAppendErrorClass( field ) {
            return field.$error //field is dirty and invalid
        },
        shouldAppendValidClass( field ) {
            return !field.$invalid && field.$model && field.$dirty
        },
        login() {
            this.$v.form.$touch();//checking if inputs are touched
            const authUser = {};

            if( !this.$v.form.$invalid ) {
                this.$store
                    .dispatch( "login", this.form )
                    .then( ( res ) => {
                        if( res.status === "success" ){
                            authUser.data = res.data;
                            authUser.token = res.data.token;
                            
                            this.$store.state.isLoggedIn = true;
                            window.localStorage.setItem( 'lbitem', JSON.stringify( authUser ) );
                            if( authUser.data.role === 'admin' ){
                                this.$router.push( { name: "addproduct" } );
                                Vue.$toast.open( { 
                                    message: "Admin Login successful",
                                    duration: 5000,
                                    type: "success" 
                                    } );
                            }else{
                                this.$router.push( { name: "products" } );
                                Vue.$toast.open( { 
                                    message: "Login successful",
                                    duration: 5000,
                                    type: "success" 
                                    } );
                            }
                        }else {
                            this.$store.state.isLoggedIn = false;
                        }  
                    } )
                    .catch( ( error ) => {
                        Vue.$toast.open( {
                            message: error.response.data.message,
                            duration: 5000,
                            type: "error"
                        } );
                    } );
            }else {
                console.log( "invalid input values" );
            }
        },
    },
};
</script>