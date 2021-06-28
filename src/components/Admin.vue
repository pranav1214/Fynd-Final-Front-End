<template>
    <div class="container">
        <h1>Admin Dashboard</h1>
        <hr />
    

    <div class="container">
      <ul class="nav nav-tabs">
        <router-link
          :to="'/admin'"
          class="nav-link"
          active-class="active"
          exact
          >Add Product</router-link>

          <router-link
          :to="'/admin/edit'"
          class="nav-link"
          active-class="active"
          exact
          >Edit Product
          </router-link>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    name: "Admin",
    title: "Admin | Grocery Mart",
}
</script>

<style scoped>

</style>