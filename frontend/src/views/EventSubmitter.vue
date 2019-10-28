<template>
  <div class="submit-container">
    <h1>Add new event</h1>

    <h2>(Required) Title</h2>
    <input
      type="text" 
      placeholder="Title" 
      v-model="title" 
      v-on:focusout="validate"
    >

    <h2>(Required) Description</h2>
    <textarea
      v-model="description" 
      v-on:focusout="validate"
      placeholder="An informative description"
      rows="200"
    ></textarea>

    <h2>Tags</h2>
    <input 
      type="text"
      placeholder="Tags" 
      v-model="tagInput" 
      v-on:keyup.enter="addTag"
    >
    <p> {{ tags }} </p>

    <h2>(Required) Starting time</h2>
    <input
      type="datetime-local"
      v-model="timeStart"
      v-on:focusout="validate"
    >

    <h2>(Required) Ending time</h2>
    <input
      type="datetime-local"
      v-model="timeEnd"
      v-on:focusout="validate"
    >

    <h2>Image link</h2>
    <input
      type="url"
      placeholder="Image url"
      v-model="imageUrl"
      v-on:focusout="validate"
    >

    <h2>(Required) Ticket price</h2>
    <input
      type="number"
      placeholder="Ticket price"
      v-model="price"
      v-on:focusout="validate"
    >

    <h2>Purchase link</h2>
    <input
      type="url"
      placeholder="Purchase link"
      v-model="purchaseLink"
      v-on:focusout="validate"
    >

    <template v-if="errors.length">
      <p class="error-message">Please correct following errors</p>
      <ul>
        <li v-for="(error,index) in errors" v-bind:key="index" >{{ error }}</li>
      </ul>
    </template>
    
    <template v-if="submitted">
      <h2>Event submitted!</h2>
    </template>
    
    <h2></h2>
    <input
      type="submit" 
      v-on:click="submit"
    >
  </div>
</template>

<script>
import { backendUrl } from '../urls';
import router from '../router';
import Form from '../mixins/Form';

export default {
    name: 'EventSubmitter',
    data() {
      return {
        errors: [],
        submitPressed: false,
        submitted: false,
        title: '',
        description: '',
        tags: [],
        tagInput: '',
        timeStart: '',
        timeEnd: '',
        imageUrl: '',
        price: '',
        purchaseLink: ''
      }
    },
    mixins: [
      Form
    ],
    created() {
      this.verifyLogin();
    },
    methods: {
      submit(event) {
        this.submitPressed = true;
        if (this.validate() !== 0) return;

        const fetchBody = {
          title: this.title,
          description: this.description,
          tags: this.tags,
          timeStart: this.timeStart,
          timeEnd: this.timeEnd,
          imageUrl: this.imageUrl,
          ticket: {
            price: this.price,
            purchaseLink: this.purchaseLink
          }
        };

        fetch(backendUrl + '/events', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fetchBody)
        })
        .then(() => {
          this.submitted = true;
          clear();
        })
        .catch(e => console.log(e));
      },
      validate() {
        this.submitted = false;
        if (this.submitPressed == false) return;

        this.errors = [];
        let errors = [];

        if (this.title == '') {
          errors.push('No title given');
        }

        if (this.description == '') {
          errors.push('No description given');
        }

        if (this.timeStart == '') {
          errors.push('No starting time given');
        }

        if (this.timeEnd == '') {
          errors.push('No ending time given');
        }

        if (this.timeStart != '' && this.timeEnd != '' 
          && new Date(this.timeStart) > new Date(this.timeEnd)) {
          errors.push('Ending time before starting time');
        }

        if (this.imageUrl != '' && !this.urlMatch(this.imageUrl)) {
          errors.push('Invalid url given for image link');
        }

        if (this.price == '') {
          errors.push('No ticket price given');
        }

        if (this.purchaseLink != '' && !this.urlMatch(this.purchaseLink)) {
          errors.push('Invalid url given for purchase link');
        }
        
        this.errors = errors;
        return errors.length;
      },
      addTag() {
        if (this.tagInput !== '' && !this.tags.includes(this.tagInput)) {
          this.tags.push(this.tagInput);
          this.tagInput = '';
        }
      },
      urlMatch(url) {
        let urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        return url.match(urlRegex);
      },
      clear() {
        this.errors = [],
        this.submitPressed = false,
        this.title = '',
        this.description = '',
        this.tags = [],
        this.tagInput = '',
        this.timeStart = '',
        this.timeEnd = '',
        this.imageUrl = '',
        this.price = '',
        this.purchaseLink = ''
      },
      async verifyLogin() {
        let res = await this.postRequest('/users/verify', null, true);
        if (!res.ok) {
          router.push({ name: 'logIn' });
        }
      }
    }
}
</script>

<style scoped>
h1, h2, p, li {
  color: white;
  font-family: 'Open Sans', sans-serif;
}

.error-message {
  font-weight: bold;
}

.submit-container {
  background-color: #413941;
  padding: 0% 5%;
  padding-bottom: 10%;
}

input {
  width: 100%;
  height: 2em;
  min-height: 2em;
  font-size: 1.5em;
}

textarea {
  min-height: 10em;
}

</style>
