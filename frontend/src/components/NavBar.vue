<template>
  <div class="TopMenu"> 
    <div class="Title">
      <h1> {{ title }} </h1>
    </div>
    <div id="nav">
      <router-link to="/" exact><i class="fas fa-home"></i> Home</router-link>
      <router-link to="/event/submit">Submit</router-link>
      <template v-if="user">
      </template>
      <template v-else>
        <router-link :to="{ name: 'logIn' }">Log In</router-link>
        <router-link :to="{ name: 'signUp' }">Sign Up</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import cookies from 'js-cookie';
import ApiRequests from '../mixins/ApiRequests';

export default {
  name: 'NavBar',
  props: ['title'],
  mixins: [
    ApiRequests,
  ],
  created() {
    this.checkLogin()
  },
  data() {
    return {
      user: null
    }
  },
  methods: {
    async checkLogin() {
      let res = await this.postRequest('/users/verify', null, true);

      if (res.ok) {
        this.user = await res.json();
      } else {
        console.log(await res.json());
      }
    }
  }
}
</script>

<style scoped>
.TopMenu {
  margin: 0px;
  padding: 0px;
  width: 100%;
  background-color: purple;
  display: inline-block;
  text-align: center;
}

.Title {
  display: inline-block;
  text-overflow: clip;
  overflow: hidden;
}

.Title > h1 {
  color: white;
  font-family: 'Bree Serif', serif;
  font-size: 4em;
    
}

#nav > a {
  color: white;
  padding: 0vw 1.25vw 0vw;
  font-family: 'Rokkitt', serif;
  text-decoration: none;
  line-height: 2em;
  font-size: 1.5em;
  text-align: right;
  transition-duration: 0.25s;
  display: inline-block; /* For transform to work */
}

@media (hover: hover) {
  #nav > a:hover {
    transform: scale(1.2);
  }
}


.router-link-active {
  font-weight: bold;
}

@media only screen and (max-width: 260px) {
  .Title > h1 {
    font-size: 1em;
  }
}

</style>