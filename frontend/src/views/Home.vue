<template>
  <div class="home">
    <Event v-bind:event="event" />
  </div>
</template>

<script>
import Event from '../components/Event';
export default {
  name: 'home',
  components: {
    Event,
  },
  data() {
    return {
      event: {title: "Foo", description: "Bar"},

    }
  }
}
</script>

<style scoped>
h1 {
  word-wrap: break-word;
}


</style>
