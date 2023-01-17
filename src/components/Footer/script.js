export default {
    data(){
        return {
            myVar: 'Default value' //Example
        }
    },


    methods: {
        myFunc(param){ return param + 1} //Example
    },


    props: {
        myProp: Object //Example
    },


    mounted() {
        //Put any code here that should run when the component has been added.
        console.log('Component has mounted!'); //Example
    }

}