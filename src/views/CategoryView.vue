<script setup>
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard/ProductCard.vue';
import { getAuth } from "firebase/auth";
</script>

<template>
    <div class="container">
        <h1>{{ category.name }}</h1>
        <h6>{{ productAmount }} produkter</h6>
        <div class="grid-c">
            <ProductCard :is_admin="is_admin || 0" :product="i" v-for="i in productsByCat" v-bind:key="i.id" />
        </div>
        <div class="flx-center">
            <button class="my-5 provianten-primary-btn" @click="getMoreProducts()">Visa mer</button>
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
            productsByCat: [],
            productAmount: 0,
            category: [],
            id: this.$route.query.id,
            page: 1,
            is_admin: false
        };
    },

    //watches for changes to the id variable ^
    watch: {
        id(newVal, oldVal) {
            this.getProductsByCat();
            this.getCategory();
        }
    },

    methods: {

        getUser() {

            if (!this.currentUser)
                return;

            let headers = new Headers({
                'sessioncookie': document.cookie,
                'Content-Type': 'application/json'
            })

            fetch('http://localhost:5000/api/user/a', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    id: this.currentUser.uid
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    this.is_admin = data[0].is_admin;
                });
        },

        getProductsByCat() {
            if(!this.$route.query.id)
                this.$router.push('/404-page');
                
            this.page = 1;

            fetch(`http://localhost:5000/api/products-by-cat?id=${this.id}&page=1`)
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
        },

        //Pagination
        getMoreProducts() {
            this.page++;

            fetch(`http://localhost:5000/api/products-by-cat?id=${this.id}&page=${this.page}`)
                .then((response) => response.json())
                .then((data) => {
                    this.productsByCat.push(...data[0]);
                });
        },

        toTop() {
            window.scrollTo(0, 0);
        }
    },

    props: {
        product: Object
    },

    mounted() {

        //Firebase auth to check if a user is logged in and
        //if so saves user into a variable
        getAuth().onAuthStateChanged((authState) => {
            this.getProductsByCat();

            if (!authState) return this.currentUser = null;

            this.currentUser = authState.auth.currentUser;

            this.getUser();
        });

        this.getCategory();
    },

    beforeUpdate() {
        this.id = this.$route.query.id;
    }
}
</script>

<style>

</style>