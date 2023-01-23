<style scoped src="./style.css"/>
<script src="./script.js" />

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container container-fluid">
            <a class="navbar-brand" href="/"><img src="/images/logo/navLogo.svg"></a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a @click="toggleCategories()" href="#" class="nav-link">Kategorier</a>
                </li>
                <li v-if="currentUser" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {{ currentUser.email }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                        <RouterLink class="link dropdown-item" to="#">Ordrar</RouterLink>
                    </li>
                    <li>
                        <RouterLink class="link dropdown-item" to="/profile">Profil</RouterLink>
                    </li>
                    <li>
                        <a @click="signOut()" class="link dropdown-item" href="#">Logga ut</a>
                    </li>
                </ul>
            </li>
            <li v-if="!currentUser" class="nav-item">
                <RouterLink class="nav-link" to="/login">Logga in</RouterLink>
            </li>
                    <li class="nav-item">
                        <div class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Varukorg <span class="badge bg-success">{{ cart.length }}</span>
                        </div>
                    </li>
                </ul>
                
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Sök produkt" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Sök</button>
                </form>
            </div>
        </div>
    </nav>
    
    <CartModal />
    
    <div v-if="showCategories" id="categories-container" class="categories-container">
        <div class="item-container flx-c">
            <RouterLink class="link" :to="`category?id=${i.id}&page=1`" @click="toggleCategories()"
                v-for="i in categories" v-bind:key="i.id">
                {{ i.name }}
            </RouterLink>
        </div>
    </div>

</template>