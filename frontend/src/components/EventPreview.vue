<template>
  <div class="event" v-on:click="routeToEvent">
    <img v-if="event.imageUrl" v-bind:src="event.imageUrl" class="image" />
    <div v-else class="image"> </div>
    <div class="info">
      <h1> {{ event.title }} {{ simpleDate }}</h1>
      <p> {{ description }} </p>
      <p> {{ price }}$ 
        <span v-if="event.ticket.purchaseLink">
          <a v-bind:href="'//' + event.ticket.purchaseLink" target="_blank" class="purchaseLink" v-on:click.stop>BUY</a>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import router from '../router';
export default {
  name: 'EventPreview',
  props: {
    event: Object
  },
  data() {
    let dateObject = new Date(this.event.timeStart);
    let eventDescription = this.event.description;
    let _description = eventDescription.length > 200 ?
      eventDescription.slice(0, 199) + '...' :
      eventDescription;
    return {
      simpleDate: dateObject.getDay() + '.' + dateObject.getMonth(),
      price: this.event.ticket.price.toFixed(2),
      description: _description
    }
  },
  methods: {
    routeToEvent(){
      router.push({name:'eventById', params: { id: this.$props.event._id }})
    }
  }
}
</script>

<style scoped>
.event {
  background-color: #413941;
  margin: 0.5% 1% 0.25%;
  padding: 1% 1% 1%;
  display: flex;

  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #5c515c;
}

.event:hover {
  border-color: #807080;
}

.image {
  background-color: #684c68;
  object-fit: cover !important;
}

.info {
  display: inline-block;
  margin-left: 1vw;
}

h1, p {
  color: white;
  font-family: 'Open Sans', sans-serif;
  margin: 0%;
}

.purchaseLink {
  color: white;
}

.purchaseLink:hover {
  font-weight: bold;
}

@media only screen and (min-width: 500px) {
  .image {
      width: 200px;
      height: 150px;
  }
}

@media only screen and (max-width: 500px) {
  .event {
      overflow: auto;
      flex-direction: column;
  }

  .image {
      flex: 1;
      flex-basis: 200px;
      height: 300px;
      width: auto;
  }
} 
</style>