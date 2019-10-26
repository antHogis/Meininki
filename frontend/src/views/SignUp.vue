<template>
  <div class="submit-container">
    <template v-if="userCreated">
      <h1>User created!</h1>  
    </template>
    <template v-else>
      <h1>Sign up</h1>
      <h2>Username</h2>
      <input
        type="text"
        v-model="name"
        placeholder="Pick a username"
      >
      <h3>{{ getErrorByField('name') }}</h3>

      <h2>Email address</h2>
      <input
        type="email"
        v-model="email"
        placeholder="Give your email address"
      >
      <h3>{{ getErrorByField('email') }}</h3>

      <h2>Password</h2>
      <input
        type="password"
        v-model="password"
        placeholder="Insert a password."
      >
      <h3>{{ getErrorByField('password') }}</h3>

      <input type="submit" v-on:click="createUser">
    </template>
  </div>
</template>

<script>
import { backendUrl } from '../urls';

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      userCreated: false,
      error: null
    }
  },
  methods: {
    getErrorByField(field) {
      if (this.error != null) {
        let emailError = this.error.errors.find(e => e.field === field);
        return emailError ? emailError.message : '';
      } else {
        return '';
      }
    },
    createUser() {
      this.error = null;
      const user = { 
        name: this.name, 
        email: this.email, 
        password: this.password 
      };

      fetch(backendUrl + '/users/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(json => {
        if (json.errors === undefined) {
          this.userCreated = true;
        } else {
          this.error = json;
        }
      })
    
    }
  }
}
</script>

<style scoped>
.submit-container {
  background-color: #413941;
  padding: 0% 5%;
  padding-bottom: 10%;
}

h1, h2, h3 {
  color: white;
  font-family: 'Open Sans', sans-serif;
}
</style>