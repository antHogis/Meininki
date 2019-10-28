<template>
  <div class="profile-container">
    <template v-if="loading">
      <Loading />
    </template>
    <template v-else-if="initialError">
      <h1>{{ initialError }}</h1>
    </template>
    <template v-else>
      <h1>{{ user.name }}</h1>

      <h2>Posted events:</h2>
      <template v-if="events.length > 0">
        <button v-on:click="toggleEvents">
          {{ showEvents ? 'Hide' : 'Show' }}
        </button>
        <transition-group name="fade" tag="div">
          <EventPreview v-for="(event, index) in shownEvents" :key="index" :event="event" />
        </transition-group>
      </template>
      <template v-else>
        <p>This user has not posted any events</p>
      </template>

      <template v-if="owner">
        <h1>My Profile</h1>
        <button v-on:click="signOut">
          Sign out
        </button>

        <h2>Update profile</h2>

        <h3>Name</h3>
        <label>New </label>
        <input 
          type="text" 
          v-model="newUserData.name"
          placeholde="Choose new username"
        >
        <label> Old </label>
        <input 
          type="text" 
          v-model="newUserData.oldName"
          placeholde="Verify old username"
        >
        <h4> {{ getErrorByField('name') }} </h4>

        <h3>Email address</h3>
        <label>New </label>
        <input 
          type="email" 
          v-model="newUserData.email"
          placeholder="Choose new email address"
        >
        <label> Old </label>
        <input 
          type="email" 
          v-model="newUserData.oldEmail"
          placeholder="Verify old email address"
        >
        <h4> {{ getErrorByField('email') }} </h4>

        <h3>Password</h3>
        <label>New </label>
        <input 
          type="password" 
          v-model="newUserData.password"
          placeholder="Choose new password"
        >
        <label> Old </label>
        <input 
          type="password" 
          v-model="newUserData.oldPassword"
          placeholder="Verify old password"
        >
        <h4> {{ getErrorByField('password') }} </h4>

        <br/><br/>
        <input type="submit" v-on:click="updateUser">
        <h2> {{ updated }} </h2>
      </template>
    </template> 
  </div>
</template>

<script>
import Loading from '../components/Loading';
import Form from '../mixins/Form';
import EventPreview from '../components/EventPreview';
import Cookies from 'js-cookie';

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
    Form,
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
      initialError: '',
      error: null,
      showEvents: true,
      shownEvents: [],
      newUserData: {
        name: '',
        oldName: '',
        email: '',
        oldEmail: '',
        password: '',
        oldPassword: ''
      },
      updated: '',
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
            this.initialError = 'User not found'
            break;
          default:
            this.initialError = 'Unexpected error';
            break;
        }

        this.loading = false;
        return;
      }
      
      res = await this.getRequest(`/events/?owner=${this.id}`);
      if (res.ok) {
        this.shownEvents = this.events = await res.json();
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
    toggleEvents() {
      this.showEvents = !this.showEvents;

      if (this.showEvents) {
        this.shownEvents = this.events;
      } else {
        this.shownEvents = [];
      }
    },
    signOut() {
      Cookies.remove('auth-token', { path: '/' });
      this.$emit('check-login');
      this.$router.push({ name: 'home' });
    },
    async updateUser() {
      this.updated = '';
      let user = {};

      for (let key of Object.keys(this.newUserData)) {
        console.log(key)
        if (this.newUserData[key] !== '') {
          user[key] = this.newUserData[key];
        }
      }

      let res = await this.putRequest('/users/update', user, true);
      if (res.ok) {
        this.updated = 'Profile updated!'
      } else {
        this.error = await res.json();
      }
    },
  }
}
</script>

<style scoped>
.profile-container {
  background-color: #413941;
  padding: 0% 5%;
  padding-bottom: 10%;
  display: block;
  overflow: auto;
}

h1, h2, h3, h4, p, li, label {
  color: white;
  font-family: 'Open Sans', sans-serif;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>