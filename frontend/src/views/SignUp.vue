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
import Form from '../mixins/Form';
import router from '../router';

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
  mixins: [
    Form
  ],
  methods: {
    async createUser() {
      this.error = null;
      const user = { 
        name: this.name, 
        email: this.email, 
        password: this.password 
      };

      let res = await this.postRequest('/users/register', user)
      if (res.ok) {
        router.push({ name: 'logIn' });
      } else {
        let error = await res.json();
        this.error = error;
      }
    
    }
  }
}
</script>
