<template>
    <h1>{{product.name}}</h1>
</template>

<script>
import { getProductById } from "@/services/auth";


export default {
    name: "EditProductDetail",
    title: "Edit Product | Grocery Mart",
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