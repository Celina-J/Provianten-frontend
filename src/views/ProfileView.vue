<script setup>
import { getAuth } from "firebase/auth";

</script>

<template>
    <div class="container">
        <h1>Profil info</h1>
        <form @submit.prevent="submitForm">
            <div class="my-3 row g-2">
                <div class="col-sm">
                    <input v-model="userData.firstname" type="text" name="firstname" class="form-control" placeholder="Förnamn">
                </div>
                <div class="col-sm">
                    <input v-model="userData.lastname" type="text" name="lastname" class="form-control" placeholder="Efternamn">
                </div>
            </div>

            <div class="my-3 row g-1">
                <div class="col-sm">
                    <input v-model="userData.street_address" type="text" name="street_address" class="form-control" placeholder="Adress">
                </div>
            </div>

            <div class="my-3 row g-2">
                <div class="col-sm">
                    <input v-model="userData.city" type="text" name="city" class="form-control" placeholder="Ort">
                </div>
                <div class="col-sm">
                    <input v-model="userData.zip" type="text" name="zip" class="form-control" placeholder="Postnummer">
                </div>
            </div>

            <div class="my-3 row g-2">
                <div class="col-sm">
                    <input v-model="userData.phone" type="text" name="phone" class="form-control" placeholder="Telefon">
                </div>
                <div class="col-sm">
                    <input v-model="userData.co" type="text" name="co" class="form-control" placeholder="c/o">
                </div>
            </div>

            <button type="submit" class="my-3 profile-btn provianten-primary-btn">Uppdatera</button>
        </form>

        <div class="my-3 gdpr-text">
            <h2>GDPR</h2>
            <h4>Vi tar väl hand om dina uppgifter</h4>
            <hr />
            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Nunc auctor diam non nisl mollis, vel vehicula augue pellentesque. Nullam ullamcorper aliquam purus
                consequat pharetra.
                Quisque a mi arcu. Pellentesque consequat, felis elementum maximus fringilla, augue velit tincidunt mi,
                vestibulum elementum erat felis eget nisi.
                Donec tristique scelerisque ipsum, eget dictum dui ullamcorper ut. Cras dictum magna id augue accumsan,
                eu
                sollicitudin nibh pretium.
                Vestibulum ut vehicula felis. Integer orci arcu, euismod sit amet aliquet vitae, convallis quis orci.
                Etiam tempus felis facilisis, tristique diam et, ornare massa.</p>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            products: [],
            currentUser: null,
            userData: {
                firstname: null,
                lastname: null,
                street_address: null,
                phone: null,
                zip: null,
                city: null,
                co: null,
            }
        }
    },

    methods: {

        saveUserInfo() {
            let headers = new Headers({
                'sessioncookie': document.cookie,
                'Content-Type': 'application/json'
            })

            fetch('http://localhost:5000/api/user', {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({
                    id: this.currentUser.uid,
                    userData: this.userData
                })

            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        },

        getUserInfo() {
            let headers = new Headers({
                'sessioncookie': document.cookie,
                'Content-Type': 'application/json'
            })

            fetch('http://localhost:5000/api/user?id=' + this.currentUser?.uid, {
                headers: headers
            })
                .then((response) => response.json())
                .then((data) => {
                    let tempObj = {};

                   Object.keys(this.userData).forEach(key=>{
                        tempObj[key] = data[0][key];
                   });

                   this.userData = tempObj;

                });
        },

        submitForm(e) {
            this.saveUserInfo();
        }

    },
    mounted() {
        getAuth().onAuthStateChanged((authState) => {
            if (!authState) return this.currentUser = null;

            this.currentUser = authState.auth.currentUser;
            this.getUserInfo();
        });



    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

.profile-btn {
    align-self: center;
    border-radius: .5em;
    width: 100%;
}

.gdpr-text {
    text-align: center;
}
</style>
