import AddToCartBtn from '../AddToCartBtn/AddToCartBtn.vue';
import { getAuth } from "firebase/auth";

export default {

    data() {
        return {
            
        }
    },

    components: {
        AddToCartBtn
    },


    methods: {

        //Click event, makes sure you dont get redirected if clicking the plus button
        viewProduct(e) {
            if (e.target.__vueParentComponent.attrs.class === 'add-to-cart-btn')
                return;
            this.$router.push('/product?id=' + this.product.id);
        },

        //Click event, for admins to change a product
        editProduct() {
            this.$router.push('/admin?productId=' + this.product.id);
        }
    },

    props: {
        product: Object,
        is_admin: Number
    },

    mounted() {

        //Firebase auth to check if a user is logged in and
        //if so saves user into a variable
        getAuth().onAuthStateChanged((authState) => {
            if (!authState) return this.currentUser = null;

            this.currentUser = authState.auth.currentUser;
        });

    }

}