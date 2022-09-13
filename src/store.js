import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      data: [],
      loading: true,
    };
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    isLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async getData(context) {
      // const res = await axios.get(
      //   'https://jsonplaceholder.typicode.com/todos'
      // );
      // context.commit('setData', res.data);
      // context.commit('isLoading', false);
      axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
        context.commit('setData', res.data);
        context.commit('isLoading', false);
      });
    },
  },
});

export default store;
