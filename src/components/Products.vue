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

        <div class="row" v-else>
            <div class="col-12">
                <h1 class="clearfix">
                    List of Products
                </h1>
                <hr />
            </div>
            <div class="col-12 col-lg-4" v-for="product in products" :key="product._id">
                <router-link class="text-reset text-decoration-none" :to="'/products/' + product._id">
                    <ProductCard :product="product" />
                </router-link>
            </div>
        </div>
   
    </div>           
</template>

<script>
import AppAlert from "@/components/utils/AppAlert";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/auth";

export default {
    name: "Products",
    title: "Products | Grocery Mart",
    components: {
        AppAlert,
        ProductCard
    },
    data(){
        return{
            status: 'LOADING',
            products: [],
            error: null
        }
    },
    created() {
        this.status = 'LOADING';

        getProducts()
            .then( products => {
                this.products = products;
                this.status = 'LOADED'
            } )
            .catch( error => {
                this.error = error;
                this.status = 'ERROR'
            } )
    }
}
</script>


<style scoped>

</style>