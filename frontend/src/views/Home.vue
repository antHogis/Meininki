<template>
  <div class="home">
    <div v-if="loading">
      <Loading />
    </div>
    <div v-if="events" id="events">
      <template v-for="event in events">
        <EventPreview v-bind:key="event._id" v-bind:event="event" />
      </template>
    </div>
  </div>
</template>

<script>
import EventPreview from '../components/EventPreview';
import Loading from '../components/Loading'

export default {
  name: 'home',
  components: {
    EventPreview,
    Loading
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
        .then(eventData => {
          this.events = eventData;
          this.loading = false;
          })
        .catch(e => this.error = e);
    }
  }
}
</script>
