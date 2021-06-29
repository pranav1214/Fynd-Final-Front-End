<template>
    <div class="container">
        <form class="mt-4" name="eform" @submit.prevent="editProduct">
            <AppAlert theme="info" v-if="status === 'LOADING'">
                <template v-slot:title>
                    <strong>Hello!</strong>
                </template>
            
                <strong>We are fetching product details!</strong>
            </AppAlert>

            <AppAlert theme="danger" v-else-if="status === 'ERROR'">
                <strong>{{error.message}}</strong>
            </AppAlert>


            <div class="container" v-else>
                <h3>
                    Edit {{ product.name }}
                </h3>

                <!-- Product name validation and display -->
                <div class="form-group my-2 mx-2 me-5">
                    <label for="name" class="my-2">
                        Product Name
                    </label>
                    <input type="text"
                    class="form-control"
                    name="name"
                    id="name"
                    v-model="eform.name"
                    @blur="$v.eform.name.$touch()"
                    :class="{
                        'is-invalid': shouldAppendErrorClass($v.eform.name),
                        'is-valid': shouldAppendValidClass($v.eform.name)
                    }"
                    />
                </div>

                <!-- Product description validation and display -->
                <div class="form-group my-2 mx-2 me-5">
                    <label for="description" class="my-2">
                        Product Description
                    </label>
                    <textarea
                    class="form-control"
                    name="description"
                    id="description"
                    rows="3"
                    v-model="eform.description"
                    @blur="$v.eform.description.$touch()"
                    :class="{
                        'is-invalid': shouldAppendErrorClass($v.eform.description),
                        'is-valid': shouldAppendValidClass($v.eform.description)
                    }"
                    >
                    </textarea>
                </div>

                <!-- Product Category validation and display -->
                <div class="form-group my-2 mx-2 me-5">
                    <label for="category" class="my-2">
                        Product Category
                    </label>
                    <input type="text"
                    class="form-control"
                    name="category"
                    id="category"
                    v-model="eform.category"
                    @blur="$v.eform.category.$touch()"
                    :class="{
                        'is-invalid': shouldAppendErrorClass($v.eform.category),
                        'is-valid': shouldAppendValidClass($v.eform.category)
                    }"
                    />
                </div>

                <!-- Product price validation and display -->
                <div class="form-group my-2 mx-2 me-5">
                    <label for="price" class="my-2">
                        Product Price
                    </label>
                    <input type="text"
                    class="form-control"
                    name="price"
                    id="price"
                    v-model="eform.price"
                    @blur="$v.eform.price.$touch()"
                    :class="{
                        'is-invalid': shouldAppendErrorClass($v.eform.price),
                        'is-valid': shouldAppendValidClass($v.eform.price)
                    }"
                    />
                </div>
                <div class="form-group my-3 mx-2">
                    <button class="btn btn-primary my-2 mb-4" :disabled="$v.eform.$invalid">
                        Submit
                    </button>
                    <app-spinner v-if="processing" />
                </div>

            </div>
        </form>
    </div>
    
</template>

<script>
import { getProductById, editProduct } from "@/services/auth";
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
import AppAlert from "@/components/utils/AppAlert";

export default {
    name: "EditProductDetail",
    title: "Edit Product | Grocery Mart",
    components: {
        AppAlert
    },
    data() {
        return{
            eform: {
                name : "",
                description: "",
                category: "",
                price: ""

            },
            status: 'LOADING',
            product: null,
            error: null,
            processing: false,
        }
    },
    validations: {
        eform: {
            name: {
                required
            },
            description: {
                required
            },
            category: {
                required
            },
            price: {
                required
            }
        },
    },
    created(){
        this.status = 'LOADING';

        const id = this.$route.params.id;

        getProductById( id )
            .then( product => {
                this.product = product;
                this.eform.name = this.product.name;
                this.eform.description = this.product.description;
                this.eform.category = this.product.category;
                this.eform.price = this.product.price;
                this.status = 'LOADED';
            } )
            .catch( error => {
                this.error = error;
                this.status = 'ERROR';
            } )
    
    },
    methods: {
        shouldAppendErrorClass( field ){
            return field.$error;
        },
        shouldAppendValidClass( field ){
            return !field.$invalid && field.$model && field.$dirty;
        },
        editProduct(){
            this.$v.eform.$touch();

            if( !this.eform.$invalid ){
                this.eform._id = this.$route.params.id;
                console.log( this.eform );
                editProduct( this.eform )
                    .then( () => {
                        this.$router.push( { name: "editproduct" } );
                        Vue.$toast.open( {
                            message: "Product was edited",
                            duration: 5000,
                            type: "success"
                        } );
                    } )
                    .catch( (error) => {
                        Vue.$toast.open( {
                            message: error.response.data.message,
                            duration: 5000,
                            type: "error"
                        } );
                    } );
            }else{
                console.log( "invalid input values" )
            }
        }
    }  
}
</script>

<style scoped>

</style>