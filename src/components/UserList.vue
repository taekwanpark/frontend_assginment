<template>
  <div class="text-xl font-semibold mb-10 mt-20">User List</div>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div
      v-for="user in users"
      :key="user.id"
      @click="
        $router.push({
          name: 'postList',
          params: { userId: user.id },
        })
      "
      class="relative cursor-pointer flex items-start space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div class="flex-shrink-0 pr-2">
        <img class="h-12 w-12 rounded-full bg-slate-200" alt="" />
      </div>
      <div class="min-w-0 flex-1">
        <a href="#" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
          <p class="truncate text-xs text-gray-500">{{ user.username }}</p>
          <p class="truncate text-sm text-gray-900">{{ user.company.name }}</p>
          <p class="truncate text-xs text-gray-500">
            {{ user.email }} / {{ user.phone }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'user',
  computed: {
    ...mapState(['users', 'data', 'loading']),
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
