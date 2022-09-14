<template>
  <div>
    <div @click="$router.push('/')">Main</div>
    <h3>UserDetail</h3>
    <table>
      <tr>
        <th>No.</th>
        <th>Title</th>
        <th>Progress</th>
      </tr>
      <tr
        v-for="detail in sortedData"
        :key="detail.id"
        @click="
          $router.push({
            // path: `/user/${detail?.userId}/post/${detail?.id}`,
            name: 'post',
            params: {
              userId: userId,
              id: detail.id,
            },
          })
        "
      >
        <td>{{ detail.id }}</td>
        <td>{{ detail.title }}</td>
        <td>{{ detail.completed }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'postList',
  props: ['userId'],
  data() {
    return {
      currentUserData: [],
      sortedData: [],
    };
  },
  mounted() {
    this.$store.commit('getCurrentUserData', this.userId);
    this.$store.commit('getSortedData');
    this.currentUserData = this.$store.state.currentUserData;
    this.sortedData = this.$store.state.sortedData;
  },
};
</script>
<style></style>
