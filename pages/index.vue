<template>
    <diV>
      <div v-if="currentUID !== null">
        <l-header @add-event="onAddEvent" />
      </div>
        <main>
          <main-visual :currentUser="currentUID" />
          <section class="col">
            <h3 class="heading-topic">
              <img src="@/assets/img/orizuru.png" alt="orizuru">
              <span class="topic-text">イベント情報</span>
            </h3>
            <l-tab :events="events" />
          </section>
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
.col {
  max-width: 1000px;
  margin: 0 auto 50px;
  vertical-align: middle;
}

.heading-topic {
  display: flex;
  position: relative;
  margin-bottom: 10px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
}

.topic-text {
  margin-left: 10px;
}
</style>
