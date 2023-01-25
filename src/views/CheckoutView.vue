<script setup>
import { getAuth } from "firebase/auth";
import RandomProducts from "../components/RandomProducts/RandomProducts.vue";
</script>

<template>
    <div class="container">
        <div class="checkout-top-container">
            <h1 style="text-align: center" class="my-5">Varukorg</h1>

            <div class="cart-items-container">
                <div class="cart-item" v-for="p in products" :key="p.id">
                    <img class="cart-img" :src="'http://localhost:5000/images/small/' + p.image" />
                    <div>{{ p.name }}</div>
                    <div>{{ p.price * p.qty }} kr</div>
                    <div class="flx-space-btw">
                        <BootstrapIcon @click="decreaseQty(p)" icon="dash-circle-fill" class="cart-amount-btn">
                        </BootstrapIcon>
                        <span>Quantity: {{ p.qty }}</span>
                        <BootstrapIcon @click="increaseQty(p)" icon="plus-circle-fill" class="cart-amount-btn">
                        </BootstrapIcon>
                    </div>
                </div>
                <div class="my-5 cart-bottom-container flx-space-btw">
                    <h5>Totalt: {{ totalAmount }} kr</h5>
                    <button @click="removeCart()" class="provianten-primary-btn">Töm varukorg</button>
                </div>
            </div>


            <h2 class="my-5">Sista chansen</h2>
            <RandomProducts />

            <h2 class="my-5">Leveransuppgifter</h2>
            <form @submit.prevent="createOrder()">
                <div class="my-3 row g-2">
                    <div class="col-sm">
                        <label><b>Förnamn</b></label>
                        <input v-model="userData.firstname" type="text" name="firstname" class="form-control"
                            placeholder="Förnamn">
                    </div>
                    <div class="col-sm">
                        <label><b>Efternamn</b></label>
                        <input v-model="userData.lastname" type="text" name="lastname" class="form-control"
                            placeholder="Efternamn">
                    </div>
                </div>

                <div class="my-3 row g-1">
                    <div class="col-sm">
                        <label><b>Adress</b></label>
                        <input v-model="userData.street_address" type="text" name="street_address" class="form-control"
                            placeholder="Adress">
                    </div>
                </div>

                <div class="my-3 row g-2">
                    <div class="col-sm">
                        <label><b>Ort</b></label>
                        <input v-model="userData.city" type="text" name="city" class="form-control" placeholder="Ort">
                    </div>
                    <div class="col-sm">
                        <label><b>Postnummer</b></label>
                        <input v-model="userData.zip" type="text" name="zip" class="form-control"
                            placeholder="Postnummer">
                    </div>
                </div>

                <div class="my-3 row g-2">
                    <div class="col-sm">
                        <label><b>Telefon</b></label>
                        <input v-model="userData.phone" type="text" name="phone" class="form-control"
                            placeholder="Telefon">
                    </div>
                    <div class="col-sm">
                        <label><b>c/o</b></label>
                        <input v-model="userData.co" type="text" name="co" class="form-control" placeholder="c/o">
                    </div>
                </div>
                <div style="color: red" v-if="!currentUser">Du måste vara inloggad för att lägga en order</div>
                <div class="flx-end">
                    <button :disabled="!currentUser" type="submit"
                        class="btn my-3 profile-btn provianten-primary-btn">Lägg order</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cartItems: [],
            cartItemIdArr: [],
            products: [],
            currentUser: null,
            totalAmount: 0,
            userData: {
                firstname: null,
                lastname: null,
                street_address: null,
                phone: null,
                zip: null,
                city: null,
                co: null,
            }
        };
    },
    methods: {

        getCart() {
            this.cartItems = JSON.parse(localStorage.getItem("cart"));
            if (this.cartItems.length === null)
                return;

            this.cartItemIdArr = this.cartItems.map(row => row.id);
        },

        getUserInfo() {
            let headers = new Headers({
                "sessioncookie": document.cookie,
                "Content-Type": "application/json"
            });
            fetch("http://localhost:5000/api/user?id=" + this.currentUser?.uid, {
                headers: headers
            })
                .then((response) => response.json())
                .then((data) => {
                    let tempObj = {};
                    Object.keys(this.userData).forEach(key => {
                        tempObj[key] = data[0][key];
                    });
                    this.userData = tempObj;
                });
        },

        saveUserInfo() {
            let headers = new Headers({
                "sessioncookie": document.cookie,
                "Content-Type": "application/json"
            });
            fetch("http://localhost:5000/api/user", {
                headers: headers,
                method: "POST",
                body: JSON.stringify({
                    id: this.currentUser.uid,
                    userData: this.userData
                })
            })
                .then((response) => response.json());
        },

        fetchData() {
            if (this.cartItemIdArr < 1)
                return;
            fetch("http://localhost:5000/api/get-products-by-ids", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idArr: this.cartItemIdArr })
            })
                .then((response) => response.json())
                .then((data) => {
                    this.products = data.map(row => {
                        let cartItem = this.cartItems.find(cRow => cRow.id === row.id);
                        row.qty = cartItem.qty;
                        return row;
                    });

                    this.countTotalCart();
                });
        },

        increaseQty(product) {
            let cart = JSON.parse(localStorage.getItem("cart"));
            let itemInCart = cart.find(i => i.id === product.id);

            itemInCart.qty++;
            product.qty++;

            localStorage.setItem("cart", JSON.stringify(cart));
            document.dispatchEvent(new CustomEvent("cartUpdate"));
        },

        decreaseQty(product) {
            let cart = JSON.parse(localStorage.getItem("cart"));
            let itemInCart = cart.find(i => i.id === product.id);

            itemInCart.qty--;
            product.qty--;

            if (product.qty <= 0) {
                cart = cart.filter((i) => i.id !== product.id);
                this.products = this.products.filter((i) => i.id !== product.id);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            document.dispatchEvent(new CustomEvent("cartUpdate"));
        },

        submitForm(e) {
            this.saveUserInfo();
        },

        countTotalCart() {
            this.totalAmount = this.products.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue.price * currentValue.qty);
            }, 0);
        },

        removeCart() {
            localStorage.clear();
            this.$router.push('/')
                .then(() => {
                    this.$router.go();
                });
        },

        createOrder() {
            fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customer_id: this.currentUser.uid,
                    street_address: this.userData.street_address,
                    city: this.userData.city,
                    zip: this.userData.zip,
                    co: this.userData.co,
                    total_price: this.totalAmount,
                    products: this.products
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.clear();

                    this.$router.push('/order-complete')
                    .then(() => this.$router.go('/order-complete'));
                });
        }

    },

    mounted() {

        getAuth().onAuthStateChanged((authState) => {
            if (!authState)
                return this.currentUser = null;
            this.currentUser = authState.auth.currentUser;
            this.getUserInfo();
        });

        this.getCart();
        this.fetchData();

        document.addEventListener("cartUpdate", (e) => {
            this.getCart();
            this.fetchData();
        });
    },

    components: { RandomProducts }
}
</script>

<style scoped>
.cart-item {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    padding: .5em 0;
    border-bottom: solid #ddd 1px;
}

.cart-img {
    max-width: 100px;
}

.cart-bottom-container {
    background-color: var(--green-opacity);
    align-items: center;
    padding: 1em;
}

.cart-amount-btn {
    color: var(--orange);
    font-size: 2em;
}

.cart-amount-btn:hover {
    cursor: pointer;
}

.profile-btn:hover {
    color: white;
}
</style>