<template>
  <div>
    <div @click="$router.push('/')">Main</div>
    <div @click="$router.push(`/user/${userId}`)">back to user page</div>
    <div>Post Detail</div>
    <div>No. {{ currentPost[0]?.id }}</div>
    <div>User: {{ currentPost[0]?.userId }}</div>
    <div>Title: {{ currentPost[0]?.title }}</div>
    <div>
      Progress:
      {{ currentPost[0]?.completed ? 'Completed ✅' : 'Proceeding 🕰' }}
    </div>
    <div>
      <span @click="getPrevPost">Prev</span> | ... |
      <span @click="getNextPost">Next</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'postDetail',
  data() {
    return {
      currentId: '',
      currentPost: [],
      currentIndex: '',
      prevPost: {},
      NextPost: {},
    };
  },
  props: {
    userId: String,
    id: String,
  },
  methods: {
    rendering() {
      this.currentId = this.id;
      this.currentPost = this.data.filter(
        arr =>
          arr.userId.toString() === this.userId &&
          arr.id.toString() === this.currentId
      );
    },
    getPrevPost() {
      this.getPrevPostObj();
      this.$router.push(`/user/${this.userId}/post/${this.prevPost.id}`);
    },
    getNextPost() {
      this.getNextPostObj();
      this.$router.push(`/user/${this.userId}/post/${this.NextPost.id}`);
    },

    getCurrentIndex() {
      this.currentIndex = this.sortedData.findIndex(
        i => i.id === this.currentPost[0]?.id
      );
    },
    getPrevPostObj() {
      this.getCurrentIndex();
      this.prevPost =
        this.sortedData[this.currentIndex > 1 ? this.currentIndex - 1 : 1];
    },
    getNextPostObj() {
      this.getCurrentIndex();
      this.NextPost =
        this.sortedData[this.currentIndex > 19 ? this.currentIndex + 1 : 19];
    },
  },
  mounted() {
    this.rendering();
    this.$store.commit('getCurrentUserData', this.userId);
    this.$store.commit('getSortedData');
    console.log(this.$store.state);
  },
  watch: {
    $route: {
      handler() {
        this.rendering();
      },
    },
  },
  computed: {
    ...mapState(['data', 'sortedData']),
  },
};
</script>
<style></style>
