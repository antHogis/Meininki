<template>
  <div class="event-container">
  <h1 id="title"> {{ event.title }} </h1>
      <img v-if="event.imageUrl" v-bind:src="event.imageUrl" class="image" />
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
export default {
  name: "EventComplete",
  props: {
    event: Object
  },
  data() {
    let _descriptionLines = this.event.description.split('\n');
    return {
      descriptionLines: _descriptionLines,
      price: this.event.ticket.price.toFixed(2),
    }
  }
}
</script>

<style scoped>
h1, p {
  color: white;
  font-family: 'Open Sans', sans-serif;
  margin: 0%;
}

#title {
  color: white;
  text-align: center;
}

.image {
  min-width: 100%;
  max-height: 30vh;
  object-fit: cover;
}

.description-line {
  margin-bottom: 1em;
}
</style>