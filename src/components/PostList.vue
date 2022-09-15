<template>
  <div>
    <div class="text-xl font-semibold mb-10 mt-20">UserDetail</div>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-slate-800 uppercase bg-gray-300">
          <tr class="">
            <th scope="col" class="py-3 px-6">No.</th>
            <th scope="col" class="py-3 px-6">Title</th>
            <th scope="col" class="py-3 px-6">Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b odd:bg-white even:bg-slate-50"
            v-for="detail in sortedData"
            :key="detail.id"
            @click="
              $router.push({
                // path: `/user/${detail?.userId}/post/${detail?.id}`,
                name: 'postDetail',
                params: {
                  userId: userId,
                  id: detail.id,
                },
              })
            "
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-slate-800 whitespace-nowrap"
            >
              {{ detail.id }}
            </th>
            <td
              class="py-4 px-6 text-sm font-semibold cursor-pointer text-slate-800 hover:text-slate-500"
            >
              {{ detail.title }}
            </td>
            <td class="py-4 px-6">
              {{ detail.completed ? 'Completed ✅' : 'Proceeding 🕰' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
