<template>
    <div>
        <div class="alert alert-info" role="alert" v-if="status === 'LOADING'">
            <strong>We are getting your product</strong>
        </div>
        <div class="alert alert-danger" role="alert" v-else-if="status === 'ERROR'">
            <strong>{{ error.message }}</strong>
        </div>
        <template v-else>
            <div class="row">
                <div class="col-12">
                    <h1>{{ product.name }}</h1>
                    <hr />
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-4">
                    <img :src="product.imageUrl" alt="product.name" class="img-fluid" />
                </div>
                    <div class="col-12 col-lg-8 my-5">
                        <h2>Description:</h2>
                        <p>
                            {{ product.description }}
                        </p>

                        <h4>Price: ₹{{ product.price }}</h4>
                        <h6>Category: {{ product.category }}</h6>
                    </div>
            </div>
            
        </template> 
    </div>
</template>

<script>
import { getProductById } from "@/services/auth";

export default {
    name: 'ProductList',
    title: "Product | Grocery Mart",
    data() {
        return{
            status: 'LOADING',
            product: null,
            error: null
        }
    },
    created(){
        this.status = 'LOADING';

        const id = this.$route.params.id;

        getProductById( id )
            .then( product => {
                this.product = product;
                this.status = 'LOADED';
            } )
            .catch( error => {
                this.error = error;
                this.status = 'ERROR';
            } )
    }
}
</script>

<style scoped>

</style>