<script setup>

</script>

<template>
    <div class="container">
        <h2>Produkt</h2>
        <form>
            <div class="my-3 row g-3">
                <div class="col-sm-3">
                    <label>Id</label>
                    <input type="text" disabled name="id" class="form-control">
                </div>
                <div class="col-sm">
                    <label>Produkt namn</label>
                    <input type="text" name="name" class="form-control">
                </div>
                <div class="col-m">
                    <label>Kort beskrivning</label>
                    <input type="text" name="short_description" class="form-control">
                </div>
            </div>
            <div class="my-3 row g-2">
                <div class="col-sm">
                    <label>Beskrivning</label>
                    <textarea name="description" class="form-control" rows="3"></textarea>
                </div>
                <div class="col-sm">
                    <label>Innehållsförteckning</label>
                    <textarea name="table_of_content" class="form-control" rows="3"></textarea>
                </div>
            </div>
            <div class="my-3 row g-2">
                <div class="col-sm">
                    <label>Pris</label>
                    <input type="number" name="price" class="form-control">
                </div>
                <div class="col-sm">
                    <label>Enhet</label>
                    <input type="text" name="unit_type" class="form-control">
                </div>
                <div class="col-sm">
                    <label>Volym</label>
                    <input type="number" name="unit_value" class="form-control">
                </div>

                <div class="input-group mb-1">
                    <div class="col-sm">
                        <label>Bild</label>
                        <input type="file" class="form-control">
                    </div>
                </div>

                <button class="my-4 btn btn-success">Bekräfta</button>

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
                    <td>{{ user.is_admin }}</td>
                    <td class="table-btns">
                        <button class="btn btn-success">Ändra roll</button>
                        <button class="btn btn-danger">Inaktivera</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <h2 class="my-3">Kategorier</h2>
        <form>
            <div class="my-3 row g-2">
                <div class="col-sm-3">
                    <label>Id</label>
                    <input type="text" disabled name="id" class="form-control">
                </div>
                <div class="col-lg">
                    <label>Kategori namn</label>
                    <input type="text" name="category" class="form-control">
                </div>
            </div>
        </form>

        <table class="my-3 table table-striped">
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{ category.name }}</td>
                    <td class="table-btns">
                        <button class="btn btn-success">Ändra</button>
                        <button class="btn btn-danger">Inaktivera</button>
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
            users: [],
            categories: []
        }
    },

    components: {

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
                .then((response) => response.status === 200 ? response.json() : false)
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
                    console.log(data);
                    if (data)
                        this.categories = data;
                }).catch(err => console.log(err));
        }
    },
    mounted() {
        this.getUsers();
        this.getCategories();
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