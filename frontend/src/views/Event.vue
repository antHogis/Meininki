<template>
  <div class="event-container">
    <div v-if="loading">
      <Loading />
    </div>
    <div v-if="event">
      <h1> {{ event.title }} </h1>
    </div>
    <div v-if="error">
      <h1>Something went wrong :(</h1>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading";

export default {
  name: 'Event',
  props: {
    id: String
  },
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      error: null,
      event: null,
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.event = null;
      this.loading = true;
      fetch('http://localhost:3000/events/' + this.id)
        .then(res => res.json())
        .then(eventData => {
          this.event = eventData;
          this.loading = false;
          })
        .catch(e => this.error = e);
    }
  }
}
</script>

<style scoped>

</style>