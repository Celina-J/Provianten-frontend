<script setup>
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard/ProductCard.vue';
</script>

<template>
    <div class="container">
        <h1>{{ category.name }}</h1>
        <h6>{{ productAmount }} produkter</h6>
        <div class="grid-c">
            <ProductCard :product="i" v-for="i in productsByCat" v-bind:key="i.id" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productsByCat: [],
            productAmount: 0,
            category: [],
            id: this.$route.query.id,
            page: this.$route.query.page
        }
    },

    watch: {
        id(newVal, oldVal) {
            this.getProductsByCat();
            this.getCategory();
        },
        page(newVal, oldVal) {
            this.getProductsByCat();
        }
    },

    methods: {
        getProductsByCat() {
            fetch(`http://localhost:5000/api/products-by-cat?id=${this.id}&page=${this.page}`)
                .then((response) => response.json())
                .then((data) => {
                    this.productsByCat = data[0];
                    this.productAmount = data[1][0].products;
                });
        },
        getCategory() {
            fetch(`http://localhost:5000/api/category?id=${this.id}`)
                .then((response) => response.json())
                .then((data) => {
                    this.category = data[0];
                });
        }
    },

    props: {
        product: Object
    },

    mounted() {
        this.getProductsByCat();
        this.getCategory();
    },

    beforeUpdate() {
        this.id = this.$route.query.id;
        this.page = this.$route.query.page;
    }
}
</script>

<style>

</style>