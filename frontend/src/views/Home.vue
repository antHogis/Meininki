<template>
  <div class="home">
    <div ref="events"></div>
  </div>
</template>

<script>
import Event from '../components/Event';
import Vue from 'vue';
export default {
  name: 'home',
  async mounted() {
    const response = await fetch('http://localhost:3000/events');
    const eventArray = await response.json();
    eventArray.forEach(eventData => {
      let EventComponent = Vue.extend(Event);
      let eventInstance = new EventComponent({propsData: {event: eventData}});
      eventInstance.$mount();
      this.$refs.events.appendChild(eventInstance.$el);
    })
  }
}
</script>

<style scoped>
h1 {
  word-wrap: break-word;
}


</style>
