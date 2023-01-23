import { getAuth } from "firebase/auth";
import CartModal from '../CartModal/CartModal.vue';

export default {
    //Dynamiska variablar med states
    data() {
        return {
            categories: [],
            showCategories: false,
            url: window.location.pathname,
            currentUser: null,
            cart: []
        }
    },

    components: {
        CartModal
    },

    //Funktioner som kan användas i html
    methods: {
        getCategories() {
            fetch('http://localhost:5000/api/categories')
                .then((response) => response.json())
                .then((data) => {
                    this.categories = data;
                });
        },

        toggleCategories() {
            this.showCategories = !this.showCategories;
        },

        signOut() {
            console.log('logging out');
            document.cookie = 'session=';
            getAuth().signOut();
            this.$router.push('/');
        }
    },
    //Lifecycle när komponenten laddas in vid refreash
    mounted() {

        let cart = localStorage.getItem('cart');
        if (cart === null)
            localStorage.setItem('cart', JSON.stringify([]));


        this.cart = JSON.parse(localStorage.getItem('cart'));

        this.getCategories();

        //Ska inkluderas på alla KOMPONENTER som kräver inloggning
        getAuth().onAuthStateChanged((authState) => {
            if (!authState) return this.currentUser = null;

            this.currentUser = authState.auth.currentUser;
        });

        document.addEventListener('cartUpdate', (e) => {
            this.cart = JSON.parse(localStorage.getItem('cart'));
        })
    },

    beforeUpdate() {
        this.url = window.location.pathname;
    }
}