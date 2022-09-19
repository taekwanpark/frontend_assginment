<template>
  <div class="text-xl font-semibold mb-20 mt-20">Post Detail</div>
  <div class="absolute flex justify-between w-full max-w-2xl top-60">
    <div
        class="group flex items-center rounded-full px-5 py-1 text-center bg-white shadow-md hover:shadow-inner cursor-pointer"
        @click="getPrevPost"
    >
      <span
          class="text-slate-600 group-hover:text-slate-400 text-xs font-semibold"
      >
        Prev
      </span>
    </div>
    <div
        class="group flex items-center rounded-full px-5 py-1 text-center bg-white shadow-md hover:shadow-inner cursor-pointer"
        @click="getNextPost"
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
            :class="{
            'text-green-600': currentPost[0]?.completed,
            'text-yellow-500': !currentPost[0]?.completed,
          }"
            class="h-6 w-6 rounded-full flex text-white items-center justify-center ring-1 ring-slate-300"
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
    Comments
    <span class="font-medium pl-1">({{ commentsData.comments.length }})</span>
  </div>
  <div
      v-if="commentsData.comments.length === 0"
      class="sm:text-xs mt-8 text-gray-500"
  >
    There is no comment yet...🫢
  </div>
  <div v-if="commentsData.comments.length > 0" class="max-w-xl w-full">
    <div class="mt-6 flow-root">
      <ul class="-my-5 divide-y divide-gray-200" role="list">
        <li
            v-for="comment in commentsData.comments"
            :key="comment.id"
            class="py-4"
        >

          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <span class="flex items-center justify-center">
                      <span v-if="comment.icon.value === null">
                        <FaceSmileIcon
                            aria-hidden="true"
                            class="h-9 w-9 flex-shrink-0 text-gray-400"
                        />
                      </span>
                      <span v-if="!(comment.icon.value === null)">
                        <span
                            :class="[
                            comment.icon.bgColor,
                            'flex h-8 w-8 items-center justify-center rounded-full',
                          ]"
                        >
                          <component
                              :is="comment.icon.icon"
                              aria-hidden="true"
                              class="h-5 w-5 flex-shrink-0 text-white"
                          />
                        </span>
                        <span class="sr-only">{{ comment.icon.name }}</span>
                      </span>
                    </span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-gray-900">
                {{ comment.body }}
              </p>
              <p class="truncate text-sm text-gray-500">
                {{ comment.email }}
              </p>
            </div>
            <div @click="editComment(comment.id)">
              <div
                  class="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                </svg>

              </div>
            </div>
            <div @click="deleteComment(comment.id)">
              <div
                  class="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <svg class="w- h-4" fill="none" stroke="currentColor" stroke-width="1.5"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                </svg>

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
          alt=""
          class="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
    </div>
    <div class="min-w-0 flex-1">
      <form class="relative" @submit.prevent="postComment">
        <div
            class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
        >
          <label class="sr-only" for="comment">Add your comment</label>
          <textarea
              id="comment"
              v-model="comment.body"
              class="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm pl-4"
              name="comment"
              placeholder="Add your comment..."
              rows="3"
          />

          <!-- Spacer element to match the height of the toolbar -->
          <div aria-hidden="true" class="py-2">
            <!-- Matches height of button in toolbar (1px border + 36px content height) -->
            <div class="py-px">
              <div class="h-9"/>
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
                  class="hidden"
                  name="file-upload"
                  type="file"
              />
              <label
                  class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500 cursor-pointer"
                  for="file-upload"
                  type="button"
              >
                <PaperClipIcon aria-hidden="true" class="h-5 w-5"/>
                <span class="sr-only">Attach a file</span>
              </label>
            </div>
            <div class="flex items-center">
              <Listbox v-model="selected" as="div">
                <ListboxLabel class="sr-only"> Your mood</ListboxLabel>
                <div class="relative">
                  <ListboxButton
                      class="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <span class="flex items-center justify-center">
                      <span v-if="selected.value === null">
                        <FaceSmileIcon
                            aria-hidden="true"
                            class="h-5 w-5 flex-shrink-0"
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
                              aria-hidden="true"
                              class="h-5 w-5 flex-shrink-0 text-white"
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
                          v-for="mood in moods"
                          :key="mood.value"
                          v-slot="{ active }"
                          :value="mood"
                          as="template"
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
          <div v-if="!edit"
               class="flex-shrink-0">
            <button
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
            >
              Post
            </button>
          </div>
          <div v-else
               class="flex-shrink-0">
            <button
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="postEditComment"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid';
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions,} from '@headlessui/vue';
import Post from "@/Models/Post";
import Comment from "@/Models/Comment";

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
    return {
      currentPost: [],
      currentIndex: '',
      prevPost: {},
      NextPost: {},
      comments: [],
      comment: {
        body: '',
        email: 'abcd@amuz.co.kr',
        icon: {}
      },

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
      edit: false,
      editId: ''
    };
  },
  props: ['userId', 'id'],
  beforeMount() {
    Post.insert({
      data: {
        id: this.id
      }
    })
  },
  methods: {
    editComment(id) {
      this.edit = !this.edit
      this.comment.body = Comment.query().whereId(id).first().body
      this.editId = id
    },
    postEditComment() {
      console.log(this.editId)
      Comment.update({
        id: this.editId,
        body: this.comment.body,
        icon: this.selected

      })
      this.edit = !this.edit
      this.comment.body = ''
    },
    deleteComment(id) {
      Comment.delete(id)
    },
    postComment() {

      Comment.insert({
        data: [{
          email: this.comment.email, body: this.comment.body, postId: this.id, icon: this.selected
        }]
      })
      this.comment.body = ''
    },

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

  created() {
    this.rendering();
    this.$store.commit('getCurrentUserData', this.userId);
    this.$store.commit('getSortedData');
    this.$store.commit('getCurrentUser', this.userId);
    this.$store.commit('getCurrentPostComments', this.id);

  },
  mounted() {
    this.selected = this.moods[5];
  },
  watch: {
    commentsData() {
      console.log(this.commentsData)
    }
  },
  computed: {
    ...mapState([
      'data',
      'sortedData',
      'currentUser',
      'currentUserData',
      'currentPostComments',
    ]),
    commentsData() {
      return Post.query().with('comments').find(this.id)
    }
  },
};
</script>
<style></style>
