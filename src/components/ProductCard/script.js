import AddToCartBtn from '../AddToCartBtn/AddToCartBtn.vue';

export default {

    data(){
        return {
            
        }
    },

    components: {
        AddToCartBtn
    },


    methods: {
        viewProduct(e){
            if(e.target.__vueParentComponent.attrs.class === 'add-to-cart-btn')
                return;
                this.$router.push('/product?id=' + this.product.id);
        },

        editProduct(){
            this.$router.push('/admin?productId=' + this.product.id);
        }
    },


    props: {
        product: Object
    },


    mounted() {
        
    }

}