<script>
export default {
  methods: {
    getErrorByField(field) {
      if (this.error != null) {
        let error = this.error.errors.find(e => e.field === field);
        return error ? error.message : '';
      } else {
        return '';
      }
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

h1, h2, h3, p, li {
  color: white;
  font-family: 'Open Sans', sans-serif;
}
</style>