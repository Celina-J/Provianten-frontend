<script setup>
import { getAuth } from "firebase/auth";
import ProductCard from "../components/ProductCard/ProductCard.vue";
import RandomProducts from "../components/RandomProducts/RandomProducts.vue";
</script>

<template>
    <div class="container">
        <div v-if="searchResult.length > 0">
            <h4 class="my-3">Sökträffar: {{ searchResult.length }}</h4>
            <div :class="searchResult.length < 4 ? 'flx-search-custom' : 'grid-c'">
                <ProductCard :product="p" v-for="p in searchResult" :key="p.id" />
            </div>
        </div>
        <img v-else src="/images/design/no-search.png" />

        <div class="my-5 random-info flx-space-btw">
            <h4>Visste du att vår mest sökta kategori är mejeriprodukter?</h4>
            <BootstrapIcon size="5x" icon="search-heart"></BootstrapIcon>
        </div>

        <img v-if="searchResult.length < 5" class="my-4 img" src="/images/design/hero.png" />
        <div v-if="searchResult.length > 12" class="flx-end">
            <button class="provianten-secondary-btn" @click="toTop()">Till toppen ^</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchResult: [],
            search: this.$route.query.search
        };
    },
    methods: {
        searchProducts() {

            if (!this.$route.query.search)
                this.$router.push('/404-page');

            fetch("http://localhost:5000/api/search-products?search=" + this.search)
                .then((response) => response.json())
                .then((data) => {
                    this.searchResult = data;
                });
        },

        toTop() {
            window.scroll(0, 0);
        }
    },
    mounted() {
        this.searchProducts();
    },
    components: { ProductCard }
}
</script>

<style scoped>
.flx-search-custom {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
}

.img {
    width: 100%;
    border-radius: 2em;
}

.random-info {
    padding: 0 1em;
    background-color: var(--green-opacity);
    align-items: center;
}
</style>