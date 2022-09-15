<template>
  <div class="w-full">
    <div class="text-xl font-semibold mb-10 mt-20">Post Detail</div>
    <div class="flex justify-around">
      <div
        @click="getPrevPost"
        class="group w-20 h-20 flex items-center rounded-full p-6 text-center bg-white shadow-lg hover:bg-slate-100 cursor-pointer"
      >
        <span
          class="text-slate-900 group-hover:text-slate-600 text-sm font-semibold"
        >
          Prev
        </span>
      </div>
      <div class="grid grid-rows-1 gap-y-4 justify-start items-center w-1/3">
        <div class="flex items-baseline text-lg">
          <span class="text-slate-500 font-semibold mr-3 text-sm">No.</span>
          {{ currentPost[0]?.id }}
        </div>
        <div class="flex items-baseline text-lg">
          <span class="text-slate-500 font-semibold mr-3 text-sm">User</span>
          {{ currentPost[0]?.userId }}
        </div>
        <div class="flex items-baseline text-lg">
          <span class="text-slate-500 font-semibold mr-3 text-sm">Title</span>
          {{ currentPost[0]?.title }}
        </div>
        <div class="flex items-baseline text-lg">
          <span class="text-slate-500 font-semibold mr-3 text-sm"
            >Progress</span
          >
          {{ currentPost[0]?.completed ? 'Completed ✅' : 'Proceeding 🕰' }}
        </div>
      </div>

      <div
        @click="getNextPost"
        class="group w-20 h-20 flex items-center rounded-full p-6 text-center bg-white shadow-lg hover:bg-slate-100 cursor-pointer"
      >
        <span
          class="text-slate-900 group-hover:text-slate-600 text-sm font-semibold"
        >
          Next
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'postDetail',
  data() {
    return {
      currentPost: [],
      currentIndex: '',
      prevPost: {},
      NextPost: {},
    };
  },
  props: ['userId', 'id'],
  methods: {
    rendering() {
      this.currentPost = this.data.filter(
        arr =>
          arr.userId.toString() === this.userId && arr.id.toString() === this.id
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
        this.sortedData[this.currentIndex - 1 > 0 ? this.currentIndex - 1 : 0];
    },
    getNextPostObj() {
      this.getCurrentIndex();
      this.NextPost =
        this.sortedData[
          this.currentIndex + 1 < 19 ? this.currentIndex + 1 : 19
        ];
    },
  },
  mounted() {
    this.rendering();
    this.$store.commit('getCurrentUserData', this.userId);
    this.$store.commit('getSortedData');
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
