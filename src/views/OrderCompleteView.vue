<script setup>
import AddToCartBtn from '../components/AddToCartBtn/AddToCartBtn.vue';
import RandomProducts from '../components/RandomProducts/RandomProducts.vue';


</script>

<template>
    <div class="container">
        <div class="checkout-success flx-center">
            <div>
                <img class="order-success-img" src="/images/design/order-success.png"/>
            </div>
            <h1 class="my-3">Vad händer nu?</h1>
            <p class="my-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae tempore, pariatur
                doloremque dolore
                magnam reprehenderit repellendus eum officiis veritatis, praesentium eveniet illum ducimus similique
                consectetur. Quas, quidem voluptatum delectus, illum nulla et consectetur mollitia perferendis veniam
                saepe modi laudantium doloremque reprehenderit. Eveniet voluptate vitae laboriosam amet, ut accusamus
                praesentium rerum!</p>
        </div>
    </div>
</template>

<script>

</script>


<style scoped>
.checkout-success {
    text-align: center;
    flex-wrap: wrap;
}

.icon-container {
    width: 100%;
}

.check-icon {
    color: var(--dark-green);
}

.order-success-img{
    width: 100%;
    object-fit: contain;
}
</style>