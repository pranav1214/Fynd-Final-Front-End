<template>
    <div class="container">
        <form class="mt-4" name="aform" @submit.prevent="addproduct">
            <div class="container">
                <h3>
                    Add Product
                </h3>

                <!-- Product name input and validation -->
                <div class="formgroup my-2 mx-2 me-5">
                    <label for="name" class="my-2">
                        Product Name
                    </label>
                    <input 
                    type="text" 
                    class="form-control" 
                    name="name" 
                    id="name"
                    placeholder="Enter product name"
                    v-model="aform.name"
                    @blur="$v.aform.name.$touch()"
                    :class="{
                        'is-invalid': shouldAppendErrorClass($v.aform.name),
                        'is-valid': shouldAppendValidClass($v.aform.name)
                    }"
                    />
                    <div v-if="$v.aform.name.$error">
                        <div v-if="!$v.aform.name.required" class="text-danger">
                            <small>
                                This field is required
                            </small>
                        </div>
                    </div>
                </div>

                <!-- Product description input and validation -->
                <div class="form-group my-2 mx-2 me-5">
                    <label for="description" class="my-2">
                        Product Description
                    </label>
                    <textarea
                    class="form-control" 
                    name="description"
                    id="description"
                    rows="3"
                    placeholder="Enter product description"
                    v-model="aform.description"
                    @blur="$v.aform.description.$touch()"
                    :class="{
                        'is-invalid': shouldAppendErrorClass($v.aform.name),
                        'is-valid': shouldAppendValidClass($v.aform.name)
                    }">
                    </textarea>

                    <div v-if="$v.aform.description.$error">
                        <div v-if="!$v.aform.description.required" class="text-danger">
                            <small>
                                This field is required
                            </small>
                        </div>
                    </div>
                </div>

                <!--Category input and validation  -->
                <div class="form-group my-2 mx-2 me-5">
                    <label for="category" class="my-2">
                        Product Category
                    </label>
                    <input type="text"
                    name="category"
                    id="category"
                    class="form-control"
                    placeholder="Enter product category"
                    v-model="aform.category"
                    @blur="$v.aform.category.$touch()"
                    :class="{
                        'is-invalid': shouldAppendErrorClass($v.aform.category),
                        'is-valid': shouldAppendValidClass($v.aform.category)
                    }" />

                    <div v-if="$v.aform.category.$error">
                        <div v-if="!$v.aform.category.required" class="text-danger">
                            <small>
                                This field is  required
                            </small>
                        </div>
                    </div>
                </div>

                <!-- Image uploader -->
                <div class="form-group my-2 mx-2 me-5">
                    Image uploader
                </div>

                <div class="form-group my-3 mx-2">
                    <button class="btn btn-primary my-2 mb-4" :disabled="$v.aform.$invalid">
                        Add Product
                    </button>
                    <app-spinner v-if="processing" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
import { addProduct } from "@/services/auth";

export default {
    name: "AddProduct",
    title: "Add Product | Grocery Mart",
    data(){
        return{
            processing: false,
            aform:{
                name: "",
                description: "",
                category: ""
            },
        };
    },
    validations: {
        aform: {
            name: {
                required
            },
            description: {
                required
            },
            category: {
                required
            }
        },
    },
    methods: {
        shouldAppendErrorClass( field ){
            return field.$error;
        },
        shouldAppendValidClass( field ){
            return !field.$invalid && field.$model && field.$dirty;
        },
        addProduct(){
            this.$v.aform.$touch();

            if( !this.$v.aform.$invalid ){
                console.log( this.aform );
                addProduct( this.aform )
                    .then( () => {
                        this.$router.push( { name: "addproduct" } );
                        Vue.$toast.open( {
                            message: "Product was added",
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
    },
}
</script>