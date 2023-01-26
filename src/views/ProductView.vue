<script setup>
import AddToCartBtn from '../components/AddToCartBtn/AddToCartBtn.vue';
import RandomProducts from '../components/RandomProducts/RandomProducts.vue';


</script>

<template>
    <div class="container">
        <div class="product-page-container">

            <div class="my-3 product-content-top">
                <div>
                    <h1>{{ product.name }}</h1>
                    <h6>{{ product.short_description }}</h6>
                    <div>
                        <span>{{ product.unit_value }} {{ product.unit_type }}</span>
                    </div>
                </div>
                <img class="product-img" :src="'http://localhost:5000/images/large/' + product.image" />
            </div>

            <div class="buy-container flx-space-btw my-5">
                <h4>{{ product.price }} kr</h4>
                <button @click="addToLocalstore()" class="provianten-primary-btn"><b>Lägg i varukorg</b></button>
            </div>

            <div style="padding: 0" class="flx-c my-5">
                <div style="padding-right: 1em">
                    <div v-if="product.description" class="product-title">Produktbeskrivning</div>
                    <p v-html="product.description"></p>
                </div>
                <div v-if="product.table_of_content" class="vl"></div>
                <div style="padding-left: 1em">
                    <div v-if="product.table_of_content" class="product-title">Innehållsförteckning</div>
                    <p v-html="product.table_of_content"></p>
                </div>
            </div>
            <h2>Se även</h2>
            <RandomProducts />

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: {},
            id: this.$route.query.id
        };
    },

    components: {
    RandomProducts,
    AddToCartBtn
},

    watch: {
        id() {
            this.getProduct();
        }
    },

    methods: {
        getProduct() {

            if(!this.$route.query.id)
                this.$router.push('/404-page');

            fetch("http://localhost:5000/api/product?id=" + this.id)
                .then((response) => response.json())
                .then((data) => {
                    this.product = data[0];
                });
        },

        addToLocalstore(){
            let cart = JSON.parse(localStorage.getItem('cart'));

            let existingItem = cart.find(i => i.id === this.product.id);
            
            //Checks if the clicked product exists in localstorage
            //if so add a new product else increase quantity
            if(existingItem === undefined){
                let itemToAdd = {id: this.product.id, qty: 1};   
                cart.push(itemToAdd);
            }else{
                existingItem.qty++;
            }

            localStorage.setItem('cart', JSON.stringify(cart)); 

            //Custom event that triggers the cart to update on change
            document.dispatchEvent(new CustomEvent('cartUpdate'));
        }
    },

    mounted() {
        this.getProduct();
    },

    beforeUpdate() {
        this.id = this.$route.query.id;
    }
}
</script>


<style scoped>
.product-content-top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
}

.product-page-container {
    display: flex;
    flex-direction: column;
}

.product-title {
    font-size: 1.4em;
}

.buy-container {
    background-color: var(--green-opacity);
    align-items: center;
    padding: 1em;
}

.vl {
    border-left: 1px solid black;
}
</style>