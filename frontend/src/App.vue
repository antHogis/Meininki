<template>
    <div id="app">
        <NavBar v-bind:title="title"/>
        <router-view class="content"/>
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
    }
}
</script>


<style>
    body {
        margin: 0;
        margin-top: 0%;
        background-color: #272527;
    }

    .content {
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
