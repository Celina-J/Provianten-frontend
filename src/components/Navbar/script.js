import { getAuth } from "firebase/auth";

export default {
    //Dynamiska variablar med states
    data() {
        return {
            categories: [],
            showCategories: false,
            url: window.location.pathname,
            currentUser: null
        }
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
            getAuth().signOut();
            this.$router.push('/');
        }
    },
    //Lifecycle när komponenten laddas in vid refreash
    mounted() {
        this.getCategories();

        //Ska inkluderas på alla KOMPONENTER som kräver inloggning
        getAuth().onAuthStateChanged((authState) => {
            if (!authState) return this.currentUser = null;

            this.currentUser = authState.auth.currentUser;
        });
    }
}