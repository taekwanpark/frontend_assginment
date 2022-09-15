<template>
  <div class="border-b border-gray-200 sm:pb-0">
    <h3 class="text-xl font-semibold mb-10 mt-20 text-center">Post List</h3>
    <div class="mt-3 sm:mt-4">
      <div class="sm:hidden">
        <label for="current-tab" class="sr-only">Select a tab</label>
        <select
          @change="onChange($event)"
          id="current-tab"
          name="current-tab"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option
            v-for="tab in tabMenu"
            :key="tab"
            :selected="tab === currentTab"
          >
            {{ tab }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabMenu"
            @click="onChange($event)"
            :key="tab"
            :class="[
              tab === currentTab
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
            ]"
          >
            {{ tab }}
          </button>
        </nav>
      </div>
    </div>
  </div>

  <div class="mt-20">
    <ul>
      <li v-for="(post, i) in sortedData" :key="i" class="pb-8">
        <div class="">
          <div class="flex space-x-5 items-center">
            <div
              class="h-8 w-8 rounded-full flex text-white items-center justify-center ring-1 ring-slate-300"
              :class="{
                'text-green-600': post.completed,
                'text-yellow-500': !post.completed,
              }"
            >
              <font-awesome-icon
                v-if="post.completed === true"
                icon="fa-solid fa-check"
              />
              <font-awesome-icon
                v-if="post.completed === false"
                icon="fa-solid fa-hourglass"
              />
            </div>
            <div class="flex min-w-0 flex-1 justify-between space-x-4">
              <div>
                <p class="text-sm text-gray-900">
                  <span
                    class="text-base mr-2 cursor-pointer hover:text-gray-500"
                    @click="
                      $router.push({
                        // path: `/user/${detail?.userId}/post/${detail?.id}`,
                        name: 'postDetail',
                        params: {
                          userId: userId,
                          id: post.id,
                        },
                      })
                    "
                    >{{ post.title }}</span
                  >
                  <span class="text-gray-400 mr-2">by</span>
                  <span class="font-medium text-gray-500">
                    {{ currentUser.name }}</span
                  >
                </p>
              </div>
              <div class="text-right text-sm text-gray-500">
                <span>{{ post.id }}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'postList',
  props: ['userId'],
  data() {
    return {
      tabMenu: [],
      currentTab: '',
      currentUserData: [],
      sortedData: [],
      currentUser: {},
    };
  },
  methods: {
    onChange($event) {
      this.currentTab = $event.target.value || $event.target.innerText;
    },
  },
  created() {
    this.$store.commit('getCurrentUserData', this.userId);
    this.$store.commit('getSortedData');
    this.$store.commit('getCurrentUser', this.userId);
    this.currentUserData = this.$store.state.currentUserData;
    this.sortedData = this.$store.state.sortedData;
    this.currentUser = this.$store.state.currentUser;
    this.tabMenu = Object.keys(this.sortedData[0]);
    this.currentTab = this.tabMenu[0];
  },
};
</script>
<style></style>
