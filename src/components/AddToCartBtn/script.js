export default {
    data(){
        return {
            
        }
    },


    methods: {
        addToLocalstore(){
            let cart = JSON.parse(localStorage.getItem('cart'));

            let existingItem = cart.find(i => i.id === this.$props.product.id);
            
            if(existingItem === undefined){
                let itemToAdd = {id: this.$props.product.id, qty: 1};   
                cart.push(itemToAdd);
            }else{
                existingItem.qty++;
            }

            localStorage.setItem('cart', JSON.stringify(cart)); 
            document.dispatchEvent(new CustomEvent('cartUpdate'));
        }
    },


    props: {
        product: Object
    },


    mounted() {

    }

}