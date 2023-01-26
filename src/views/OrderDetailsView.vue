<script setup>
import { getAuth } from "firebase/auth";
import RandomProducts from "../components/RandomProducts/RandomProducts.vue";
</script>

<template>
    <div class="container">
        <h1>Orderspecifikation</h1>

        <RouterLink to="/order-page">
            <BootstrapIcon size="2x" icon="arrow-left-short"></BootstrapIcon>
            Tillbaka till mina ordrar
        </RouterLink>

        <table class="my-4 table table-striped">
            <thead>
                <th><b>Produkt</b></th>
                <th><b>Pris</b></th>
                <th><b>Antal</b></th>
            </thead>
            <tbody>
                <tr v-for="item in orderDetails" :key="item.id">
                    <td>{{ item.product_name }}</td>
                    <td>{{ item.product_price }} kr</td>
                    <td>{{ item.quantity }} st</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentUser: null,
            orderDetails: []
        };
    },
    methods: {
        //Getting order details with products 
        getOrder() {
            let headers = new Headers({
                "sessioncookie": document.cookie,
                "Content-Type": "application/json"
            });
            fetch("http://localhost:5000/api/orders/orders-products?orderid=" + this.$route.query.orderid, {
                method: "POST",
                headers: headers
            })
                .then((response) => response.json())
                .then((data) => {
                    this.orderDetails = data;
                });
        }
    },
    mounted() {
        //Firebase auth to check if a user is logged in and
        //if so, it saves user into a variable
        getAuth().onAuthStateChanged((authState) => {
            if (!authState)
                return this.currentUser = null;
            this.currentUser = authState.auth.currentUser;
            this.getOrder();
        });
    },
    components: { RandomProducts }
}
</script>

<style scoped>
    
</style>
