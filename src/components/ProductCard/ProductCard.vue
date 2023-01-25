
<script src="./script.js" />


<style scoped src="./style.css"/>

<template>
    <div @click="viewProduct" class="flx-space-btw flx-c c-border product-card">
        <img :src="'http://localhost:5000/images/small/' + product.image" />
        <div>{{ product.name }}</div>
        <div>
            <div class="flx-space-btw">
                <span><b>{{ product.price }} kr</b></span>
                <span>{{ product.unit_value }} {{ product.unit_type }}</span>
            </div>
        </div>
        <AddToCartBtn :product="product"/>
        <BootstrapIcon @click="editProduct" icon="pencil" class="add-to-cart-btn" ></BootstrapIcon>
    </div>
</template>