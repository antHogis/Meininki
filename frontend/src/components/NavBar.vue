<template>
    <div class="TopMenu"> 
        <div class="Title">
            <h1> {{ title }} </h1>
        </div>
        <div id="nav">
            <router-link to="/" exact>Home</router-link>
            <router-link to="/about" exact>About</router-link>
            <!-- <router-link to="/">Foo</router-link>
            <router-link to="/">Bar</router-link>
            <router-link to="/">Biz</router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    props: ['title'],
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
.TopMenu {
    margin: 0px;
    padding: 0px;
    width: 100%;
    background-color: purple;
    display: inline-block;
    text-align: center;
}

.Title {
    display: inline-block;
    text-overflow: clip;
    overflow: hidden;
}

.Title > h1 {
    color: white;
    font-family: 'Bree Serif', serif;
    font-size: 4em;
    
}

#nav > a {
    color: white;
    padding-right: 2.5vw;
    font-family: 'Rokkitt', serif;
    text-decoration: none;
    line-height: 2em;
    font-size: 1.5em;
    text-align: right;
    transition-duration: 0.25s;
    display: inline-block; /* For transform to work */
}

#nav > a:hover {
    transform: scale(1.2);
    
}

.router-link-active {
    font-weight: bold;
}

</style>