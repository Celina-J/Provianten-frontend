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

    <div class="flx-c banner my-5">
      <div class="icon-c flx-space-btw">
        <BootstrapIcon icon="truck" size="4x"></BootstrapIcon>
        <div style="max-width: 200px">
          <b>Snabba leveranser</b>
          <div>Alltid fräsch mat hela vägen till din dörr</div>
        </div>
      </div>
      <div class="icon-c flx-space-btw">
        <BootstrapIcon icon="tag" size="4x"></BootstrapIcon>
        <div style="max-width: 200px">
          <b>Sänkta priser</b>
          <div>Vi har sänkt priset på massvis av favoritvaror</div>
        </div>
      </div>
      <div class="icon-c flx-space-btw">
        <BootstrapIcon icon="heart" size="4x"></BootstrapIcon>
        <div style="max-width: 200px">
          <b>Vi tänker på miljön</b>
          <div>Vi har därför stort sortiment av ekologiskt</div>
        </div>
      </div>
    </div>

    <img class="design-img my-3" src="images/design/hero.png" />

    <h2 class="my-3">Mer gott</h2>
    <div class="my-3 grid-c">
      <ProductCard :product="p" v-for="p in products" :key="p.id" />
    </div>
    <div class="flx-end">
      <button class="provianten-secondary-btn" @click="toTop()">Till toppen ^</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      currentUser: null
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
    },

    toTop() {
      window.scroll(0, 0);
    }
  },

  mounted(){
    this.getProducts();
  }
}
</script>

<style scoped>
.design-img {
  object-fit: cover;
  max-height: 500px;
  border-radius: 2em;
}

.banner {
  justify-content: space-evenly;
  width: 100%;
  background-color: var(--green-opacity);
  padding: 1em;
}

.icon-c {
  align-items: center;
  gap: 1em;
}

.icon-c>* {
  margin: 0;
}
</style>
