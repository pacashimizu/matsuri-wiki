<template>
    <diV>
      <div v-if="currentUID !== null">
        <l-header @add-event="onAddEvent" />
      </div>
        <main>
          <main-visual :currentUser="currentUID" />
          <l-tab :events="events" />
          <text-section />
        </main>
    </div>
</template>


<script>
import firebase from 'firebase/app';
import LHeader from '~/components/layouts/LHeader.vue';
import LTab from '~/components/layouts/LTab.vue';
import MainVisual from '~/components/pages/MainVisual.vue';
import TextSection from '~/components/pages/TextSection.vue';
import { getEvents } from '~/plugins/firebaseService.js';

export default {
  name: 'IndexPage',
  components: {
    LHeader,
    LTab,
    MainVisual,
    TextSection,
  },
  
  data() {
    return {
      events: [],
      currentUID: null,
    };
  },
  
  created() {
    // ログイン状態の監視
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('状態：ログイン中');
        this.currentUID = user.uid;
      } else {
        console.log('状態：ログアウト');
        this.currentUID = null;
      }
    });
    this.onGetEvents();
  },

  methods: {
    onAddEvent(event) {
      this.events.push(event);
    },
    async onGetEvents() {
      this.events = await getEvents().catch((err) => {
        console.error(err.message);
      });
      
    },
  }
};
</script>

<style scoped>
.section {
  max-width: 1000px;
  margin: 0 auto 50px;
  padding: 0 10px;
}
</style>
