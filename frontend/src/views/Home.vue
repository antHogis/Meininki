<template>
  <div class="home">
    <div v-if="loading">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
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
        .then(eventData => {
          this.events = eventData;
          this.loading = false;
          })
        .catch(e => this.error = e);
    }
  }
}
</script>

<style scoped>
h1 {
  word-wrap: break-word;
}

.lds-ring {
  width: 64px;
  height: 64px;
  margin: 3vw auto;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #684c68;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #684c68 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>
