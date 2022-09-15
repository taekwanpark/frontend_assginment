<template>
  <div class="text-xl font-semibold mb-20 mt-20">Post Detail</div>
  <div class="absolute flex justify-between w-full max-w-2xl top-60">
    <div
      @click="getPrevPost"
      class="group flex items-center rounded-full px-5 py-1 text-center bg-white shadow-md hover:shadow-inner cursor-pointer"
    >
      <span
        class="text-slate-600 group-hover:text-slate-400 text-xs font-semibold"
      >
        Prev
      </span>
    </div>
    <div
      @click="getNextPost"
      class="group flex items-center rounded-full px-5 py-1 text-center bg-white shadow-md hover:shadow-inner cursor-pointer"
    >
      <span
        class="text-slate-600 group-hover:text-slate-400 text-xs font-semibold"
      >
        Next
      </span>
    </div>
  </div>

  <div class="w-full max-w-4xl px-20">
    <div class="border-b border-gray-200 pb-5 mb-5">
      <div class="flex gap-x-4">
        <h3
          class="text-lg font-medium leading-6 text-gray-900 cursor-pointer hover:text-gray-600"
          @click="
            $router.push({
              name: 'postList',
              params: { userId },
            })
          "
        >
          {{ currentUser.name }}
        </h3>
        <div
          class="h-6 w-6 rounded-full flex text-white items-center justify-center ring-1 ring-slate-300"
          :class="{
            'text-green-600': currentPost[0]?.completed,
            'text-yellow-500': !currentPost[0]?.completed,
          }"
        >
          <font-awesome-icon
            v-if="currentPost[0].completed === true"
            icon="fa-solid fa-check"
          />
          <font-awesome-icon
            v-if="currentPost[0].completed === false"
            icon="fa-solid fa-hourglass"
          />
        </div>
      </div>
      <p class="mt-4 max-w-4xl text-sm text-gray-500">
        {{ currentPost[0]?.title }}
      </p>
    </div>
  </div>
  <!-- comments -->
  <div class="text-gray-500 text-xs font-semibold max-w-xl w-full">
    Comments<span class="font-medium pl-1"
      >({{ currentPostComments.length }})</span
    >
  </div>
  <div
    v-if="currentPostComments.length === 0"
    class="sm:text-xs mt-8 text-gray-500"
  >
    There is no comment yet...🫢
  </div>
  <div v-if="currentPostComments.length > 0" class="max-w-xl w-full">
    <div class="mt-6 flow-root">
      <ul role="list" class="-my-5 divide-y divide-gray-200">
        <li
          v-for="comment in currentPostComments"
          :key="comment.id"
          class="py-4"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="h-8 w-8 rounded-full" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-gray-900">
                {{ comment.name }}
              </p>
              <p class="truncate text-sm text-gray-500">
                {{ comment.email }}
              </p>
            </div>
            <div>
              <div
                class="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
              >
                View
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mt-6">
      <div
        class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        View all
      </div>
    </div>
  </div>
  <!-- reply -->
  <div class="flex items-start space-x-4 mt-20 max-w-xl w-full">
    <div class="flex-shrink-0">
      <img
        class="inline-block h-10 w-10 rounded-full"
        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
    <div class="min-w-0 flex-1">
      <form action="#" class="relative">
        <div
          class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
        >
          <label for="comment" class="sr-only">Add your comment</label>
          <textarea
            rows="3"
            name="comment"
            id="comment"
            class="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm pl-4"
            placeholder="Add your comment..."
          />

          <!-- Spacer element to match the height of the toolbar -->
          <div class="py-2" aria-hidden="true">
            <!-- Matches height of button in toolbar (1px border + 36px content height) -->
            <div class="py-px">
              <div class="h-9" />
            </div>
          </div>
        </div>

        <div
          class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2"
        >
          <div class="flex items-center space-x-5">
            <div class="flex items-center">
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                class="hidden"
              />
              <label
                for="file-upload"
                type="button"
                class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500 cursor-pointer"
              >
                <PaperClipIcon class="h-5 w-5" aria-hidden="true" />
                <span class="sr-only">Attach a file</span>
              </label>
            </div>
            <div class="flex items-center">
              <Listbox as="div" v-model="selected">
                <ListboxLabel class="sr-only"> Your mood </ListboxLabel>
                <div class="relative">
                  <ListboxButton
                    class="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <span class="flex items-center justify-center">
                      <span v-if="selected.value === null">
                        <FaceSmileIcon
                          class="h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span class="sr-only"> Add your mood </span>
                      </span>
                      <span v-if="!(selected.value === null)">
                        <span
                          :class="[
                            selected.bgColor,
                            'flex h-8 w-8 items-center justify-center rounded-full',
                          ]"
                        >
                          <component
                            :is="selected.icon"
                            class="h-5 w-5 flex-shrink-0 text-white"
                            aria-hidden="true"
                          />
                        </span>
                        <span class="sr-only">{{ selected.name }}</span>
                      </span>
                    </span>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute z-10 mt-1 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm"
                    >
                      <ListboxOption
                        as="template"
                        v-for="mood in moods"
                        :key="mood.value"
                        :value="mood"
                        v-slot="{ active }"
                      >
                        <li
                          :class="[
                            active ? 'bg-gray-100' : 'bg-white',
                            'relative cursor-default select-none py-2 px-3',
                          ]"
                        >
                          <div class="flex items-center">
                            <div
                              :class="[
                                mood.bgColor,
                                'w-8 h-8 rounded-full flex items-center justify-center',
                              ]"
                            >
                              <component
                                :is="mood.icon"
                                :class="[
                                  mood.iconColor,
                                  'flex-shrink-0 h-5 w-5',
                                ]"
                                aria-hidden="true"
                              />
                            </div>
                            <span class="ml-3 block truncate font-medium">{{
                              mood.name
                            }}</span>
                          </div>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div class="flex-shrink-0">
            <button
              type="submit"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';

export default {
  name: 'postDetail',
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    XMarkIcon,
  },
  data() {
    // console.log('data');
    return {
      currentPost: [],
      currentIndex: '',
      prevPost: {},
      NextPost: {},
      moods: [
        {
          name: 'Excited',
          value: 'excited',
          icon: FireIcon,
          iconColor: 'text-white',
          bgColor: 'bg-red-500',
        },
        {
          name: 'Loved',
          value: 'loved',
          icon: HeartIcon,
          iconColor: 'text-white',
          bgColor: 'bg-pink-400',
        },
        {
          name: 'Happy',
          value: 'happy',
          icon: FaceSmileIcon,
          iconColor: 'text-white',
          bgColor: 'bg-green-400',
        },
        {
          name: 'Sad',
          value: 'sad',
          icon: FaceFrownIcon,
          iconColor: 'text-white',
          bgColor: 'bg-yellow-400',
        },
        {
          name: 'Thumbsy',
          value: 'thumbsy',
          icon: HandThumbUpIcon,
          iconColor: 'text-white',
          bgColor: 'bg-blue-500',
        },
        {
          name: 'I feel nothing',
          value: null,
          icon: XMarkIcon,
          iconColor: 'text-gray-400',
          bgColor: 'bg-transparent',
        },
      ],
      selected: {},
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
  // beforeMount() {
  //   console.log('before mount');
  //   console.log(this.currentUser);
  // },
  // mounted() {
  //   console.log('mounted');
  //   console.log(this.currentUser);
  // },
  // beforeCreate() {
  //   console.log('before created');
  //   console.log(this.currentUser);
  // },
  created() {
    this.rendering();
    this.$store.commit('getCurrentUserData', this.userId);
    this.$store.commit('getSortedData');
    this.$store.commit('getCurrentUser', this.userId);
    this.$store.commit('getCurrentPostComments', this.id);
    // console.log('created');
    // console.log(this.currentUser);
  },
  mounted() {
    this.selected = this.moods[5];
  },
  watch: {
    $route: {
      handler() {
        this.rendering();
        this.$store.commit('getCurrentPostComments', this.id);
      },
    },
  },
  computed: {
    ...mapState([
      'data',
      'sortedData',
      'currentUser',
      'currentUserData',
      'currentPostComments',
    ]),
    consoleTest() {
      console.log('computed');
      return '';
    },
  },
};
</script>
<style></style>
