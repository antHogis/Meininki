<template>
    <div class="event">
        <h1> {{ event.title }} </h1>
        <p> {{ event.description }} </p>
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
    background-color: #6d6b6d;
    margin: 1% 1% 1%;
    padding: 0% 1% 0%;
}
</style>