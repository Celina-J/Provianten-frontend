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
                        <div class="cart-item flx-space-btw" v-for="p in products" :key="p.id">
                            <img class="cart-img" :src="'http://localhost:5000/images/small/' + p.image"/>
                            <span>{{ p.name }}</span>
                            <span>{{ p.price }} kr</span>
                            <span>Quantity: {{ p.qty }}</span>
                            <button @click="increaseQty(p)">+</button>
                            <button @click="decreaseQty(p)">-</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="provianten-primary-btn">Checka ut</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>