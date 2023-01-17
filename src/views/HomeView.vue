<script setup>
import ProductCard from '../components/ProductCard/ProductCard.vue';
</script>

<template>
  <div class="hero-video-container">

  </div>
  <div class="grid-c">
    <ProductCard :product="p" v-for="p in products" :key="p.id" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    }
  },
  methods: {
    getProducts() {
      fetch('http://localhost:5000/api/products')
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        });
    }
  },
  mounted() {
    this.getProducts();
  }
}
</script>

<style scoped>

</style>
