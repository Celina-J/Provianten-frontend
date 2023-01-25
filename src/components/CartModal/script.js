export default {
    data() {
        return {
            cartItems: [],
            cartItemIdArr: [],
            products: []
        }
    },


    methods: {
        getCart() {
            this.cartItems = JSON.parse(localStorage.getItem('cart'));
            if (this.cartItems === null)
                return;
            this.cartItemIdArr = this.cartItems.map(row => row.id);
        },

        fetchData() {

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

                    this.products = data.map(row => {
                        let cartItem = this.cartItems.find(cRow => cRow.id === row.id);
                        row.qty = cartItem.qty;
                        return row;
                    });
                });
        },

        increaseQty(product) {
            let cart = JSON.parse(localStorage.getItem('cart'));

            let itemInCart = cart.find(i => i.id === product.id);

            itemInCart.qty++;
            product.qty++;

            localStorage.setItem('cart', JSON.stringify(cart));
            document.dispatchEvent(new CustomEvent('cartUpdate'));
        },

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


    props: {

    },


    mounted() {
        this.getCart();
        this.fetchData();

        document.addEventListener('cartUpdate', (e) => {
            this.getCart();
            this.fetchData();
        })
    }

}