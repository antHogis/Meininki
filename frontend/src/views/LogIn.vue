<template>
  <div class="submit-container">
    <h1>Log in</h1>
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

    <input type="submit" v-on:click="logIn">
  </div>
</template>

<script>
import { backendUrl } from '../urls';
import Form from '../mixins/Form';
import cookies from 'js-cookie';
import router from '../router';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  mixins: [
    Form
  ],
  methods: {
    async logIn() {
      let user = {
        email: this.email,
        password: this.password
      };
      
      let res = await this.postRequest('/users/login', user);
      if (res.ok) {
        let token = await res.text();
        cookies.set('auth-token', token);
        this.$emit('check-login');
        router.push({ name: 'home' });
      } else {
        let error = await res.json();
        this.error = error;
      }
    }
  }
}
</script>
