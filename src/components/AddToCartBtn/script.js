export default {
    data(){
        return {
            
        }
    },


    methods: {
        
        addToLocalstore(){
            let cart = JSON.parse(localStorage.getItem('cart'));

            let existingItem = cart.find(i => i.id === this.$props.product.id);
            
            //Checks if the clicked product exists in localstorage
            //if so add a new product else increase quantity
            if(existingItem === undefined){
                let itemToAdd = {id: this.$props.product.id, qty: 1};   
                cart.push(itemToAdd);
            }else{
                existingItem.qty++;
            }

            localStorage.setItem('cart', JSON.stringify(cart)); 

            //Global event that updates the cart when change occours
            document.dispatchEvent(new CustomEvent('cartUpdate'));
        }
    },


    props: {
        product: Object
    }

}