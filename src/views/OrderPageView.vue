<script setup>
import { getAuth } from "firebase/auth";
import RandomProducts from "../components/RandomProducts/RandomProducts.vue";
</script>

<template>
    <div class="container">
        <h1 class="my-3">Mina ordrar</h1>
        <table class="my-4 table">
            <thead>
                <th><b>Ordernummer</b></th>
                <th><b>Orderdatum</b></th>
                <th><b>Totalsumma</b></th>
                <th><b>Åtgärder</b></th>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ new Date(order.order_date).toLocaleString() }}</td>
                    <td>{{ order.total_price }} kr</td>
                    <td><button @click="viewOrder(order.id)" class="btn btn-secondary">Visa order</button></td>
                </tr>
            </tbody>
        </table>
        <div class="my-4 order-info flx-space-btw">
            <h5>Dina varor skickas alltid i väl kylda skåpbilar</h5>
            <BootstrapIcon size="5x" icon="truck"></BootstrapIcon>
        </div>
        <h2 class="my-3">Har du sett våra nyheter?</h2>
        <RandomProducts />
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentUser: null,
            orders: [],
            orderIds: {
                id: null
            }
        };
    },
    methods: {
        //Getting orders for the logged in user
        getOrders() {
            let headers = new Headers({
                "sessioncookie": document.cookie,
                "Content-Type": "application/json"
            });
            fetch("http://localhost:5000/api/orders?userid=" + this.currentUser.uid, {
                headers: headers,
            })
                .then((response) => response.json())
                .then((data) => {
                    this.orders = data;
                });
        },
        viewOrder(id) {
            this.$router.push("/order-details?orderid=" + id);
        },
    },
    mounted() {
        //Firebase auth to check if a user is logged in and
        //if so, it saves user into a variable
        getAuth().onAuthStateChanged((authState) => {
            if (!authState)
                return this.currentUser = null;
            this.currentUser = authState.auth.currentUser;
            this.getOrders();
        });
    },
    components: { RandomProducts }
}
</script>

<style scoped>

.order-info {
    padding: 0 1em;
    background-color: var(--green-opacity);
    align-items: center;
}

table{
    vertical-align: middle;
}

</style>
