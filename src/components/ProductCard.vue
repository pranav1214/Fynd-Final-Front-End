<template>
    <div class="card p-2 my-3">
        <div class="card-img-container">
            <img 
            class="card-img-top" 
            :src="product.imageUrl" :alt="product.name" />
        </div>

        <div class="card-body">
            <h4 class="card-title">
                {{ product.name }}
            </h4>
            <div class="card-text">
                <div class="caard-text">
                    Category: <strong>{{ product.category }}</strong>
                </div>
                <div>
                    <strong>₹ {{ product.price }} </strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true,
            validator( value ){
                return value.name && value.id
            }
        }
    }

}
</script>

<style scoped>
.card:hover {
    box-shadow: 0px 0px 3px 2px rgba( 218, 165, 32, 0.3 );
}
.card-img-container {
    min-height: 150px;
    text-align: center;
}
.card-img-top {
    width: 50%;
}
.card-body {
    min-height: 150px;
}
</style>