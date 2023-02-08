import Vue from "vue";

Vue.mixin({
    methods: {
        getCurrentUser() {
            return this.$store.state.auth.user;
        },
    },
});