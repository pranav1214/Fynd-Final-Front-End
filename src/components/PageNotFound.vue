<template>
  <div class="container">
        <h1>Page Not Found</h1>
        <hr />
        <p>
        Well done! You have managed to get lost.
        <router-link :to="{ name: 'products' }">Go to home</router-link>
        </p>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  title: "404 | Grocery Mart",
};
</script>

<style scoped></style>



