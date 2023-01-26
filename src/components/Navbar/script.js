import { getAuth } from "firebase/auth";
import CartModal from '../CartModal/CartModal.vue';

export default {
    
    data() {
        return {
            categories: [],
            showCategories: false,
            url: window.location.pathname,
            currentUser: null,
            cart: [],
            searchValue: ''
        }
    },

    components: {
        CartModal
    },

    methods: {

        getCategories() {
            fetch('http://localhost:5000/api/categories')
                .then((response) => response.json())
                .then((data) => {
                    this.categories = data;
                });
        },

        //Toggles the menubar in navbar for categories
        toggleCategories() {
            this.showCategories = !this.showCategories;
        },

        signOut() {
            document.cookie = 'session=';
            getAuth().signOut();
            this.$router.push('/');
        },

        //Click event, sends user to page with the searchvalue in the url
        submitSearch(){
            if(this.searchValue.length < 3)
                return;
            
            this.$router.push('/search-page?search=' + this.searchValue)
            .then(() => {
                this.$router.go();
            });
        },

    },

    mounted() {

        let cart = localStorage.getItem('cart');
        if (cart === null)
            localStorage.setItem('cart', JSON.stringify([]));

        this.cart = JSON.parse(localStorage.getItem('cart'));

        this.getCategories();

        //Firebase auth to check if a user is logged in and
        //if so saves user into a variable
        getAuth().onAuthStateChanged((authState) => {
            if (!authState) return this.currentUser = null;

            this.currentUser = authState.auth.currentUser;
        });

        //Custom event that triggers the cart to update on change
        document.addEventListener('cartUpdate', (e) => {
            this.cart = JSON.parse(localStorage.getItem('cart'));
        })
    },
    
    beforeUpdate() {
        this.url = window.location.pathname;
    }
}