export default {
    data() {
        return {
            cartItems: [],
            cartItemIdArr: [],
            products: []
        }
    },


    methods: {
        //Populates variable cartItemIdArr with products in localstorage
        //And then maps it into a new varible cartItems
        getCart() {
            this.cartItems = JSON.parse(localStorage.getItem('cart'));
            if (this.cartItems === null)
                return;
            this.cartItemIdArr = this.cartItems.map(row => row.id);
        },

        fetchData() {

            //Fetching data only if there is any products 
            if (this.cartItemIdArr < 1)
                return;

            fetch('http://localhost:5000/api/get-products-by-ids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idArr: this.cartItemIdArr })

            })
                .then((response) => response.json())
                .then((data) => {

                    //merging in qty from local storage into the products array
                    this.products = data.map(row => {
                        let cartItem = this.cartItems.find(cRow => cRow.id === row.id);
                        row.qty = cartItem.qty;
                        return row;
                    });
                });
        },

        //Click event - increases item in cart by 1
        increaseQty(product) {
            let cart = JSON.parse(localStorage.getItem('cart'));

            let itemInCart = cart.find(i => i.id === product.id);

            itemInCart.qty++;
            product.qty++;

            localStorage.setItem('cart', JSON.stringify(cart));
            document.dispatchEvent(new CustomEvent('cartUpdate'));
        },

        //Click event - decreases item in cart by 1
        decreaseQty(product) {
            let cart = JSON.parse(localStorage.getItem('cart'));

            let itemInCart = cart.find(i => i.id === product.id);

            itemInCart.qty--;
            product.qty--;

            if (product.qty <= 0) {
                cart = cart.filter((i) => i.id !== product.id);
                this.products = this.products.filter((i) => i.id !== product.id);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            document.dispatchEvent(new CustomEvent('cartUpdate'));
        }
    },

    mounted() {
        this.getCart();
        this.fetchData();

        //Custom event that triggers the cart to update on change
        document.addEventListener('cartUpdate', (e) => {
            this.getCart();
            this.fetchData();
        })
    }

}