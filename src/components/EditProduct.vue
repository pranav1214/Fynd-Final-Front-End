<template>
   <div class="container">

       <AppAlert theme="info" v-if="status === 'LOADING'">
            <template v-slot:title>
                <strong>Hello!</strong>
            </template>
            
            <strong>We are fetching products!</strong>
        </AppAlert>

        <AppAlert theme="danger" v-else-if="status === 'ERROR'">
            <strong>{{error.message}}</strong>
        </AppAlert>
        <div class="container" v-else>
            <h3 class="mt-4">
                Edit Product
            </h3>

           <div class="row">
               <div class="col-lg-6"
               v-for="product in products"
               :key="product._id">
               <div class="card mt-4">
                   <div class="card-body">
                       <h6 class="card-title">
                           {{ product.name }}
                       </h6>
                       <router-link :to="{ name: 'editproductdetail', params: { id: product._id } }">
                            <button class="btn btn-danger">
                                Edit
                            </button>
                       </router-link>
                   </div>
               </div>
               </div>
            </div>  
        </div>
   </div>
</template>


<script>
import { getProducts } from "@/services/auth";
import AppAlert from "@/components/utils/AppAlert";

export default {
    name: "EditProduct",
    title: "Edit Product | Grocery Mart",
    components: {
        AppAlert
    },
    data(){
        return{
            products: [],
            status: "LOADING",
            error: null
        };
    },
    created(){
        this.status = "LOADING";
        getProducts()
        .then( ( products ) => {
            this.products = products;
            this.status = "LOADED"
        } )
        .catch( ( error ) => {
            console.log( error );
            this.error = error;
            this.status = "ERROR";
        } )
    }
}
</script>


<style scoped>

</style>