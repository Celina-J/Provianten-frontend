<script setup>
import ProductCard from '../components/ProductCard/ProductCard.vue';
import RandProducts from '../components/RandomProducts/RandomProducts.vue';
</script>

<template>
  <video class="hero-video" autoPlay loop>
    <source src="/video/video.mp4" type="video/mp4" />
  </video>

  <div class="container">
    <h2 class="my-3">Nyheter</h2>
    <RandProducts />
    <img class="my-5" src="images/design/hero.png" />
    <h2 class="my-3">Mer gott</h2>
    <div class="my-3 grid-c">
      <ProductCard :product="p" v-for="p in products" :key="p.id" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    }
  },

  components: {
    RandProducts
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
