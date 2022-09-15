import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  plugins: [createPersistedState()],
  state() {
    return {
      data: [],
      users: [],
      comments: [],
      loading: true,
      currentUserData: [],
      sortedData: [],
      currentUser: {},
      currentPostComments: [],
    };
  },
  mutations: {
    setUser(state, payload) {
      state.users = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
    setComment(state, payload) {
      state.comments = payload;
    },
    isLoading(state, payload) {
      state.loading = payload;
    },
    getCurrentUserData(state, payload) {
      state.currentUserData = state.data.filter(
        arr => arr.userId.toString() === payload
      );
    },
    getSortedData(state) {
      state.sortedData = state.currentUserData.sort(function (a, b) {
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      });
    },
    getCurrentUser(state, payload) {
      state.currentUser = state.users.find(el => {
        return el.id.toString() === payload;
      });
    },
    getCurrentPostComments(state, payload) {
      state.currentPostComments = state.comments.filter(
        arr => arr.postId.toString() === payload
      );
    },
  },
  actions: {
    getData(context) {
      axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
        context.commit('setData', res.data);
        context.commit('isLoading', false);
      });
    },
    getUser(context) {
      axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        context.commit('setUser', res.data);
      });
    },
    getComment(context) {
      axios
        .get('https://jsonplaceholder.typicode.com/comments?postId=1')
        .then(res => {
          context.commit('setComment', res.data);
        });
    },
  },
});

export default store;
