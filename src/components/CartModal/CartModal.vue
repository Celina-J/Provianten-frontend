<style scoped src="./style.css"/>
<script src="./script.js" />

<template>
    <div class="modal-container">
        <div class="modal fade right" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Varukorg</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="cart-items-container">
                            <h5 class="my-5 flx-center" v-if="products.length < 1">Inga produkter i varukorgen</h5>
                            <div class="cart-item" v-for="p in products" :key="p.id">
                                <img class="cart-img" :src="'http://localhost:5000/images/small/' + p.image" />
                                <div>{{ p.name }}</div>
                                <div>{{ p.price }} kr</div>
                                <div class="flx-space-btw">
                                    <BootstrapIcon @click="decreaseQty(p)" icon="dash-circle-fill" class="cart-amount-btn"></BootstrapIcon>
                                    <span>Quantity: {{ p.qty }}</span>
                                    <BootstrapIcon @click="increaseQty(p)" icon="plus-circle-fill" class="cart-amount-btn"></BootstrapIcon>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button v-if="!products.length < 1" type="button" class="provianten-primary-btn">
                            <RouterLink class="checkout-link" to="/checkout" >Checka ut</RouterLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>