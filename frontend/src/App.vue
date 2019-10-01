<template>
    <div id="app">
        <NavBar v-bind:title="title"/>
        <router-view/>
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
        background-color: #333033;
    }

    .content {
        background-color: #494649;
        display:flex;
        flex-flow: column;
        height: 100%;
    }

    @media only screen and (min-width: 1200px) {
        .content {
            width: 70vw;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
