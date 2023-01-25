<script setup>
import { getAuth } from "firebase/auth";
</script>

<template>
    <div class="container">
        <h2>Produkt</h2>
        <form @submit.prevent="updateProduct()">
            <div class="my-3 row g-3">
                <div class="col-sm-3">
                    <label>Id</label>
                    <input v-model="productData.id" type="text" disabled name="id" class="form-control">
                </div>
                <div class="col-sm">
                    <label>Produkt namn</label>
                    <input v-model="productData.name" required type="text" name="name" class="form-control">
                </div>
                <div class="col-m">
                    <label>Kort beskrivning</label>
                    <input v-model="productData.short_description" type="text" name="short_description"
                        class="form-control">
                </div>
            </div>
            <div class="my-3 row g-2">
                <div class="col-sm">
                    <label>Beskrivning</label>
                    <textarea v-model="productData.description" name="description" class="form-control"
                        rows="3"></textarea>
                </div>
                <div class="col-sm">
                    <label>Innehållsförteckning</label>
                    <textarea v-model="productData.table_of_content" name="table_of_content" class="form-control"
                        rows="3"></textarea>
                </div>
            </div>
            <div class="my-3 row g-2">
                <div class="col-sm">
                    <label>Pris</label>
                    <input v-model="productData.price" required type="number" name="price" class="form-control">
                </div>
                <div class="col-sm">
                    <label>Enhet</label>
                    <input v-model="productData.unit_type" required type="text" name="unit_type" class="form-control">
                </div>
                <div class="col-sm">
                    <label>Volym</label>
                    <input v-model="productData.unit_value" required type="number" name="unit_value"
                        class="form-control">
                </div>

                <div class="input-group mb-1">
                    <div class="col-sm">
                        <label>Bild</label>
                        <input type="file" class="form-control">
                    </div>
                </div>

                <button type="submit" class="my-4 btn btn-success">Bekräfta</button>

            </div>
        </form>

        <h2 class="my-3">Användare</h2>
        <table class="my-3 table table-striped">
            <thead>
                <th>Användare</th>
                <th>Email</th>
                <th>Admin</th>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.firstname }} {{ user.lastname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ (user.is_admin) ? 'Ja' : 'Nej' }}</td>
                    <td class="table-btns">
                        <button @click="toggleAdmin(user)" class="btn btn-secondary">Ändra roll</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <h2 class="my-3">Kategorier</h2>
        <form @submit.prevent="updateCategory()">
            <div class="my-3 row g-2">
                <div class="col-sm-3">
                    <label>Id</label>
                    <input v-model="selectedCat.id" type="text" disabled name="id" class="form-control">
                </div>
                <div class="col-lg">
                    <label>Kategori namn</label>
                    <input v-model="selectedCat.name" type="text" name="category" class="form-control">
                </div>
                <div class="flx-end">
                    <button type="submit" class="my-4 btn btn-success">
                        {{(selectedCat.id) ? 'Uppdatera kategori' : 'Lägg till kategori'}}
                    </button>
                </div>
            </div>
        </form>

        <table class="my-3 table table-striped">
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{ category.name }}</td>
                    <td class="table-btns">
                        <button @click="changeCatName(category)" class="btn btn-secondary">Ändra</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productData: {
                id: null,
                name: null,
                short_description: null,
                description: null,
                table_of_content: null,
                price: null,
                unit_type: null,
                unit_value: null
            },
            productId: this.$route.query.productId,
            users: [],
            categories: [],
            currentUser: null,
            catName: '',
            selectedCat: {
                id: null,
                name: null
            }
        }
    },


    methods: {
        getUsers() {
            let headers = new Headers({
                'sessioncookie': document.cookie,
                'Content-Type': 'application/json'
            })
            fetch('http://localhost:5000/api/users', {
                headers: headers
            })
                .then((response) => response.status === 200 ? response.json() : this.$router.push('/404-page'))
                .then((data) => {
                    if (data)
                        this.users = data;
                }).catch(err => console.log(err));
        },

        getCategories() {
            let headers = new Headers({
                'sessioncookie': document.cookie,
                'Content-Type': 'application/json'
            })
            fetch('http://localhost:5000/api/categories', {
                headers: headers
            })
                .then((response) => response.status === 200 ? response.json() : false)
                .then((data) => {
                    if (data)
                        this.categories = data;
                }).catch(err => console.log(err));
        },

        toggleAdmin(user) {
            console.log(user);
            let headers = new Headers({
                'sessioncookie': document.cookie,
                'Content-Type': 'application/json'
            })
            fetch('http://localhost:5000/api/user', {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({
                    id: user.id,
                    is_admin: Number(!user.is_admin)
                })
            })
                .then((response) => response.status === 200 ? response.json() : false)
                .then(() => {
                    this.$router.push('/admin')
                    .then(() => this.$router.go('/admin'))
                }).catch(err => console.log(err));
        },

        changeCatName(category) {
            this.selectedCat = category;
        },

        updateCategory() {
            let headers = new Headers({
                'sessioncookie': document.cookie,
                'Content-Type': 'application/json'
            })
            fetch('http://localhost:5000/api/category', {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({
                    id: this.selectedCat.id,
                    catName: this.selectedCat.name
                })
            })
                .then((response) => response.status === 200 ? response.json() : false)
                .then((data) => {
                }).catch(err => console.log(err));
        },

        getEditProduct() {

            if (!this.$route.query.productId)
                return;

            fetch("http://localhost:5000/api/product?id=" + this.productId)
                .then((response) => response.json())
                .then((data) => {

                    let tempObj = {};

                    Object.keys(this.productData).forEach(key => {
                        tempObj[key] = data[0][key];
                    });

                    this.productData = tempObj;
                });
        },

        updateProduct() {
            let headers = new Headers({
                'sessioncookie': document.cookie,
                'Content-Type': 'application/json'
            })
            fetch('http://localhost:5000/api/product', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    id: this.productData.id,
                    name: this.productData.name,
                    short_description: this.productData.short_description,
                    description: this.productData.description,
                    table_of_content: this.productData.table_of_content,
                    price: this.productData.price,
                    unit_type: this.productData.unit_type,
                    unit_value: this.productData.unit_value
                })
            })
                .then((response) => response.status === 200 ? response.json() : false)
                .then(() => {
                    this.productData = {
                        id: null,
                        name: null,
                        short_description: null,
                        description: null,
                        table_of_content: null,
                        price: null,
                        unit_type: null,
                        unit_value: null
                    }

                    this.$router.push('/admin');

                }).catch(err => console.log(err));
        }
    },
    mounted() {

        getAuth().onAuthStateChanged((authState) => {
            if (!authState) return this.currentUser = null;

            this.currentUser = authState.auth.currentUser;
            console.log(this.currentUser);
        });

        this.getUsers();
        this.getCategories();
        this.getEditProduct()
    }
}
</script>

<style scoped>
.table-btns {
    display: flex;
    justify-content: end;
}

.table-btns>button {
    margin: 0 .5em;
}
</style>