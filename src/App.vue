<script setup>
import Navbar from './components/Navbar/Navbar.vue';
import Footer from './components/Footer/Footer.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>
  
  <main>
    <RouterView />
  </main>

  <Footer></Footer>
</template>

