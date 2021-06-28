<template>
    <div class="container">
        <div class="row">
            <h1>Sign Up</h1>
            <hr />

        <!-- Signup form -->

        <form name="sform" @submit.prevent="signup">

          <!-- Name input and validation -->

        <div class="formgroup">
          <label for="name">Enter Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            class="form-control w-50"
            v-model="sform.name"
            @blur="$v.sform.name.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.sform.name),
              'is-valid': shouldAppendValidClass($v.sform.name),
            }" />

          <div v-if="$v.sform.name.$error">
            <div v-if="!$v.sform.name.required" class="text-danger">
              <small>
                This field is required
              </small>
            </div>
          </div>
        </div>   

        <!-- Email Input and validation -->

        <div class="formgroup my-2">
            <label for="email">
                Enter Email
            </label>
            <input type="email" 
            class="form-control w-50"
            name="email"
            id="email"
            placeholder="abc@example.com"
            v-model="sform.email"
            @blur="$v.sform.email.$touch()"
            :class="{
                'is-invalid': shouldAppendErrorClass( $v.sform.email ),
                'is-valid': shouldAppendValidClass( $v.sform.email )
            }"
            />

            <div v-if="$v.sform.email.$error">
                <div v-if="!$v.sform.email.required" class="text-danger">
                    <small>
                        Email field is required
                    </small>
                </div>
                <div v-if="!$v.sform.email.email" class="text-danger">
                    <small>
                        Invalid email address
                    </small>
                </div>
            </div>
        </div>

         <!-- Password input and validation -->
        <div class="form-group my-2">
          <label for="password">Enter Password</label>
          <input
            type="password"
            autocomplete="off"
            class="form-control w-50"
            name="password"
            id="password"
            v-model="sform.password"
            @blur="$v.sform.password.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.sform.password),
              'is-valid': shouldAppendValidClass($v.sform.password),
            }" />

          <div v-if="$v.sform.password.$error">
            <div v-if="!$v.sform.password.required" class="text-danger">
              <small>The password is required</small>
            </div>
            <div v-if="!$v.sform.password.minLength" class="text-danger">
              <small>Password must have atleast 8 characters</small>
            </div>
            <div
              v-if="!$v.sform.password.containsUppercase"
              class="text-danger">
              <small>Password must have atleast 1 uppercase characters</small>
            </div>
            <div
              v-if="!$v.sform.password.containsLowercase"
              class="text-danger">
              <small>Password must have atleast 1 lowercase characters</small>
            </div>
            <div v-if="!$v.sform.password.containsNumber" class="text-danger">
              <small>Password must have atleast 1 number characters</small>
            </div>
            <div
              v-if="!$v.sform.password.containsSpecial"
              class="text-danger">
              <small>Password must have atleast 1 special characters</small>
            </div>
          </div>
        </div>

        <!-- Confirm Password and Validation -->
        <div class="form-group my-2">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            v-model="sform.confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            class="form-control w-50"
            @blur="$v.sform.confirmPassword.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.sform.confirmPassword),
              'is-valid': shouldAppendValidClass($v.sform.confirmPassword),
            }" />
          <div v-if="$v.sform.confirmPassword.$error">
            <div
              v-if="!$v.sform.confirmPassword.required"
              class="text-danger">
              <small>Confirm password is required</small>
            </div>
            <div
              v-if="!$v.sform.confirmPassword.sameAsPassword"
              class="text-danger">
              <small>Passwords must match</small>
            </div>
          </div>
        </div>

        <div class="form-group my-2">
          <button class="btn btn-primary" :disabled="$v.sform.$invalid">
            Sign Up
          </button>
          <app-spinner v-if="processing" />
        </div>

        </form>
        <div class="text-muted">
        <small
          ><strong>NOTE</strong>: Password must be minimum 8 characters and
          contain atleast 1 Upper case, 1 Lower case, 1 Number and 1 Special
          character</small>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";
import { signup } from "@/services/auth";

export default {
    name: "AppSignup",
    title: "Signup | Grocery Mart",
    data() {
        return {
            processing: false,
            sform: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "general"
            },
        };
    },
    validations: {
        sform: {
            name: {
                required
            },
            email: {
                email,
                required
            },
            password: {
                required,
                minLength: minLength( 8 ),
                containsUppercase: function(value) {
                    return /[A-Z]/.test(value);
                    },
                containsLowercase: function(value) {
                    return /[a-z]/.test(value);
                    },
                containsNumber: function(value) {
                    return /[0-9]/.test(value);
                    },
                containsSpecial: function(value) {
                    return /[#?!@$%^&*-]/.test(value);
                     },
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs( "password" )
            },
        },
    },
    methods: {
        shouldAppendErrorClass( field ) {
            return field.$error;
        },
        shouldAppendValidClass( field ) {
            return !field.$invalid && field.$model && field.$dirty;
        },
        signup() {
            this.$v.sform.$touch();

            if( !this.$v.sform.$invalid ) {
                signup( this.sform )
                    .then( () => {
                        this.$router.push( { name: "login" } );
                        Vue.$toast.open( {
                            message: "Signup was successful",
                            duration: 5000,
                            type: "success"
                        } );
                    } )
                    .catch( ( error ) => {
                        Vue.$toast.open( {
                            message: error.response.data.message,
                            duration: 5000,
                            type: "error"
                        } );
                    } );
            }else {
                console.log( "Invalid input values" )
            }
        },
    },
};
</script>

<style scoped>

</style>