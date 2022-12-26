import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import './assets/tailwind.css';

// Create a new store instance.
const store = createStore({
  state() {
    return {
      collections: [],
      subMenuView: false,
      activeCollectionType: {
        id: 'spectacles-women',
        name: 'Spectacles Women',
      },
    };
  },
  mutations: {
    updateCollectionType(state, payload) {
      state.activeCollectionType = {
        id: `${payload.name}-${payload.item}`,
        name: `${payload.name} ${payload.item}`,
      };
    },
  },
});
createApp(App).use(store).mount('#app');
