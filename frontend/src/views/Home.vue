<template>
  <div class="home">
    <div v-if="events" class="content">
      <div ref="events" v-bind:key="event._id" v-for="event in events">
        <EventPreview v-bind:event="event" />
      </div>
    </div>
    
  </div>
</template>

<script>
import EventPreview from '../components/EventPreview';

export default {
  name: 'home',
  components: {
    EventPreview
  },
  data() {
    return {
      loading: false,
      error: null,
      events: null,
    }
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      this.error = this.events = null;
      this.loading = true;
      fetch('http://localhost:3000/events')
        .then(res => res.json())
        .then(eventData => this.events = eventData)
        .catch(e => this.error = e);
    }
  }
}
</script>

<style scoped>
h1 {
  word-wrap: break-word;
}


</style>
