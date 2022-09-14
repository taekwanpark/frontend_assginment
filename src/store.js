import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      data: [],
      loading: true,
      currentUserData: [],
      sortedData: [],
    };
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
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
  },
  actions: {
    getData(context) {
      axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
        context.commit('setData', res.data);
        context.commit('isLoading', false);
      });
    },
  },
});

export default store;
