<template>
    <div id="app">
        <NavBar v-bind:title="title" ref="navBar"/>
        <router-view class="content" v-on:check-login="onCheckLogin"/>
    </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
    components: {
        NavBar,
    },
    data() {
        return {
        title: 'meininki',
        }
    },
    methods: {
        onCheckLogin() {
            this.$refs.navBar.checkLogin();
        }
    }
}
</script>


<style>
    body {
        margin: 0;
        margin-top: 0%;
        background-color: #272527;
    }

    body, html, #app, .content {
        display:flex;
        flex-flow: column;
        height: 100%;
    }

    @media only screen and (min-width: 1200px) {
        .content {
            width: 70vw;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
