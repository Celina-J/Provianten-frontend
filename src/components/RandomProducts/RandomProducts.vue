<script src="./script.js" />
<style scoped src="./style.css"/>

<template>
    <div style="padding: 0" class="rand-prod-container flx-c my-3">
        <ProductCard v-for="p in randProducts" :key="p.id" :product="p"/>
    </div>
</template>