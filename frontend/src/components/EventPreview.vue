<template>
    <div class="event" v-on:click="routeToEvent">
        <img v-if="event.imageUrl" v-bind:src="event.imageUrl" class="image" />
        <div v-else class="image"> </div>
        
        <div class="info">
            <h1> {{ event.title }} </h1>
            <p> {{ event.description }} </p>
            
        </div>
        
    </div>
</template>

<script>
import router from '../router';
export default {
    name: 'EventPreview',
    props: {
        event: Object
    },
    methods: {
        routeToEvent(){
            router.push({name:'eventById', params: { id: this.$props.event._id }})
        }
    }
}
</script>

<style scoped>
.event {
    background-color: #413941;
    margin: 0.5% 1% 0.25%;
    padding: 1% 1% 1%;
    display: flex;

    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: #5c515c;
}

.event:hover {
    border-color: #807080;
}

.image {
    background-color: #684c68;
    width: 200px;
    height: 150px;
    object-fit: cover;
}

.info {
    display: inline-block;
    margin-left: 1vw;
}

h1, p {
    color: white;
    font-family: 'Open Sans', sans-serif;
    margin: 0%;
}
</style>