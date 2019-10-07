<template>
    <div class="event">
        <div class="imagePlaceholder"> </div>
        <div class="info">
            <h1> {{ event.title }} </h1>
            <p> {{ event.description }} </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Event',
    props: {
        event: Object
    },
}
</script>

<style scoped>
.event {
    background-color: #413941;
    margin: 1% 1% 1%;
    padding: 1% 1% 1%;
    display: flex;

    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: #5c515c;
}

.imagePlaceholder {
    background-color: #684c68;
    width: 200px;
    height: 150px;
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