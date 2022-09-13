<template>
  <h3>Frontend - Assignment #1</h3>
  <div v-if="loading === true">Loading...</div>
  <div v-if="loading === false">
    <!-- unique user list -->
    <User v-for="user in getUniqueUser" :key="user.id" :user="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import User from './components/User.vue';

export default {
  name: 'App',
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('getData');
  },
  computed: {
    ...mapState(['data', 'loading']),
    getUniqueUser() {
      const array = this.data.filter(
        (arr, index, callback) =>
          index === callback.findIndex(t => t.userId === arr.userId)
      );
      return array;
    },
  },
  components: { User },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
