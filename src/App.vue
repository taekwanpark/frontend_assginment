<template>
  <div>
    <h1>Frontend - Assignment #1</h1>
    <div v-if="loading === true">Loading...</div>
    <div v-if="loading === false">
      <!-- unique user list -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      // userList: [],
    };
  },
  created() {
    this.$store.dispatch('getData');
  },
  computed: {
    ...mapState(['loading']),
  },

  components: {},
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
