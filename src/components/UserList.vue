<template>
  <div class="text-xl font-semibold mb-10 mt-20">User List</div>
  <div class="flex flex-col gap-y-5 w-1/2 items-center">
    <div
      class="border w-10 h-10 rounded-full text-center leading-10 hover:border-slate-600 cursor-pointer hover:text-slate-500"
      v-for="user in getUniqueUser"
      :key="user?.id"
      @click="
        $router.push({
          // path: `/user/${user?.userId}`,
          name: 'postList',
          params: { userId: user.userId },
        })
      "
    >
      {{ user?.userId }}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'user',
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
};
</script>
<style></style>
