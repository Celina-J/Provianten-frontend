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
            fetch("http://localhost:5000/api/search-products?search=" + this.search)
                .then((response) => response.json())
                .then((data) => {
                    this.searchResult = data;
                    console.log(data);
                });
        },
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

</style>