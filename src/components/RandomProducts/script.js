import ProductCard from '../ProductCard/ProductCard.vue';

export default {
    data() {
        return {
            randProducts: []
        }
    },

    components: {
        ProductCard
    },

    methods: {
        getRandProducts() {
            fetch('http://localhost:5000/api/randomProducts')
                .then((response) => response.json())
                .then((data) => {
                    this.randProducts = data;
                });
        }
    },

    mounted() {
        this.getRandProducts();
    }

}