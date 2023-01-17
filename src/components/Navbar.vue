<template lang="">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="/"><img src="/images/logo/navLogo.svg"></a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="#">Categories</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Mina sidor
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <RouterLink class="dropdown-item" to="#">Ordrar</RouterLink>
                        </li>
                        <li>
                            <RouterLink class="dropdown-item" to="#">Logga ut</RouterLink>
                        </li>
                    </ul>
                </li>
            </ul>

            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>

<div class="categories-container">
    <div v-for="i in categories">
        <div>{{i.name}}</div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            categories: []
        }
    },
    methods: {
        getCategories() {
            fetch('http://localhost:5000/api/categories')
                .then((response) => response.json())
                .then((data) => {
                    console.log('categories', data);
                    this.categories = data;
                });
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>

<style>
    .categories-container{
        border: 1px solid black;
    }
</style>
