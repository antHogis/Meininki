<template>
  <h1> {{ id }} </h1>
</template>

<script>
export default {
  name: 'Event',
  props: {
    id: String
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