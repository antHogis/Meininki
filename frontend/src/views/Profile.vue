<template>
  <div class="profile-container">
    <template v-if="loading">
      <Loading />
    </template>
    <template v-else-if="error">
      <h1>{{ error }}</h1>
    </template>
    <template v-else>
      <h1>{{ user.name }}</h1>

      <h2>Posted events:</h2>
      <template v-if="events.length > 0">
        <EventPreview v-for="(event, index) in events" :key="index" :event="event" />
      </template>
      <template v-else>
        <p>This user has not posted any events</p>
      </template>

      <template v-if="owner">
        <h2>Update profile</h2>
        

      </template>
    </template> 
  </div>
</template>

<script>
import Loading from '../components/Loading';
import ApiRequests from '../mixins/ApiRequests';
import EventPreview from '../components/EventPreview';

export default {
  name: 'Profile',
  props: {
    id: String,
  },
  components: {
    Loading,
    EventPreview,
  },
  mixins: [
    ApiRequests,
  ],
  created() {
    this.fetchData();
  },
  data() {
    return {
      owner: null,
      user: null,
      loading: true,
      events: [],
      error: '',
    }
  },
  methods: {
    async fetchData() {
      let res = await this.getRequest(`/users/${this.id}`);
      if (res.ok) {
        this.user = await res.json();
      } else {
        switch (res.status) {
          case 404:
            this.error = 'User not found'
            break;
          default:
            this.error = 'Unexpected error';
            break;
        }

        this.loading = false;
        return;
      }
      
      res = await this.getRequest(`/events/?owner=${this.id}`);
      if (res.ok) {
        this.events = await res.json();
      }

      res = await this.postRequest('/users/verify', null, true);
      if (res.ok) {
        let user = await res.json();
        if (this.id === user._id) {
          this.owner = user;
        }
      }

      this.loading = false;
    },
  }
}
</script>

<style scoped>
.profile-container {
  background-color: #413941;
  padding: 0% 5%;
  padding-bottom: 10%;
}

h1, h2, h3, h4, p, li {
  color: white;
  font-family: 'Open Sans', sans-serif;
}
</style>