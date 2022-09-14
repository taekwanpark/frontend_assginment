<template>
  <div class="user-list">
    <h3>User List</h3>
    <div class="user-wrapper">
      <div
        class="user"
        v-for="user in getUniqueUser"
        :key="user?.id"
        @click="
          $router.push({
            // path: `/user/${user?.userId}`,
            name: 'user',
            params: { userId: user.userId },
          })
        "
      >
        {{ user?.userId }}
      </div>
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
<style>
.user-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user {
  width: 20px;
  height: 20px;
  display: inline;
  margin: 10px 10px;
  padding: 5px;
  border-radius: 20px;
  cursor: pointer;
  background-color: antiquewhite;
}
</style>
