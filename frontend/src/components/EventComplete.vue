<template>
  <div class="event-container">
    <h1 id="title"> {{ event.title }} </h1>
    <h2>Starts at {{ timeStart }}</h2>
    <h2>Ends at {{ timeEnd }}</h2>
    <router-link :to="{ name:'profile', params:{ id: createdBy._id} }">
      Created by {{ createdBy.name }}
    </router-link>
    <img v-if="event.imageUrl" v-bind:src="event.imageUrl" class="image" />
    <p>
      <span v-for="(tag, index) in event.tags" :key="index">
        {{ tag }} | 
      </span>
    </p>
    <p> {{ price }}$ 
      <span v-if="event.ticket.purchaseLink">
        <a v-bind:href="'//' + event.ticket.purchaseLink" target="_blank" class="purchase-link">BUY</a>
      </span>
    </p>
    <template v-for="(descriptionLine, index) in descriptionLines">
      <p v-bind:key="index" class="description-line"> {{ descriptionLine }} </p>
    </template>
  </div>
</template>

<script>
import ApiRequests from '../mixins/ApiRequests.vue';
export default {
  name: "EventComplete",
  props: {
    event: Object,
  },
  mixins: [
    ApiRequests
  ],
  created() {
    console.log(this.event.tags);
    this.getOwner();
  },
  data() {
    return {
      timeStart: new Date(this.event.timeStart),
      timeEnd: new Date(this.event.timeEnd),
      price: this.event.ticket.price.toFixed(2),
      createdBy: {
        name: ''
      },
    }
  },
  computed: {
    descriptionLines() {
      return this.event.description.split('\n');
    }
  },
  methods: {
    async getOwner() {
      let res = await this.getRequest(`/users/${this.event.owner}`);

      if (res.ok) {
        this.createdBy = await res.json();
      }
    }
  }
}
</script>

<style scoped>
h1, h2, h3, h4, li, p {
  color: white;
  font-family: 'Open Sans', sans-serif;
  margin: 0%;
}

#title {
  color: white;
  text-align: center;
}

.image {
  width: 100%;
  max-height: 40vh;
  min-height: 15vh;
  object-fit: cover;
}

.description-line {
  margin-bottom: 1em;
}

a { 
  color: #FFFF00;
  font-family: 'Open Sans', sans-serif;
}

.router-link-active {
  color: #7FFF7F;
}
</style>