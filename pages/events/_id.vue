<template>
    <diV>
      <div v-if="currentUID !== null">
        <l-header @add-event="onAddEvent" />
      </div>
      <main>
        <section class="section">
          <div class="key-visual">
            <img :src="image" alt="">
          </div>
          <p>{{ eventId }}</p>
          <div class="title">
            <h2>{{ title }}</h2>
          </div>
        
          <section class="col">
            <h3 class="heading-topic">
              <img src="@/assets/img/orizuru.png" alt="orizuru">
              <span class="topic-text">詳細情報</span>
            </h3>
            <table>
              <tbody>
                <tr>
                <th>開催地</th>
                  <td>{{ prefecture }}</td>
                </tr>
                <tr>
                <th>由来</th>
                  <td>{{ origin }}</td>
                </tr>
              </tbody>
            </table>
          </section>
        
          <section class="col">
            <h3 class="heading-topic">
              <img src="@/assets/img/orizuru.png" alt="orizuru">
              <span class="topic-text">ノコス。ツタエル。</span>
            </h3>
            <!-- <div class="wrapper">
              <div class="card">
                <img class="card-image" src="img/thumnail.JPG">
                <div class="card-content">
                  <h4 class="card-title">お祓い</h4>
                  <p class="card-text">テストテストテストテスト</p>
                </div>
              </div>
            </div> -->
          </section>
        </section>
      </main>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import LHeader from '~/components/layouts/LHeader.vue';

export default {
  data() {
    return {
      eventId: '',
      currentUID: null,
    };
  },
  
  async asyncData({ params }) {
    const eventRef = firebase.firestore().collection('events').doc(params.id);
    const eventDoc = await eventRef.get();
    
    if (eventDoc.exists) {
      console.log(eventDoc.data());
      const { eventImageLocation, eventTitle, eventPref, eventOrigin } = eventDoc.data();
      const image = await firebase.storage().ref(eventImageLocation).getDownloadURL();
      
      const event = {
        title: eventTitle,
        image,
        prefecture: eventPref,
        origin: eventOrigin,
      };
      return event;
      
    } else {
      console.log('データがありません');
    };
  },
  
  components: {
    LHeader,
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
  },
};
</script>

<style scoped>
.key-visual {
  width: 100%;
  padding: 0;
  margin: 5px 0 0;
}

.key-visual img {
  width: 100%;
  height: 300px;
  object-fit: contain;
}

@media screen and (min-width: 768px) {
  .key-visual img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
}

/* イベント情報 */
.title h2 {
  text-align: center;
  font-size: 32px;
}

.col {
  max-width: 800px;
  margin: 0 auto 50px;
}

.heading-topic {
  display: flex;
  position: relative;
  margin-bottom: 10px;
  font-size: 20px;
  align-items: center;
}

.topic-text {
  margin-left: 10px;
}

/* イベント詳細テーブル */
table {
  border-collapse: separate;
  border-spacing: 5px;
  width: 100%;
}

table th, table td {
  border-radius: 6px;
  padding: 10px;
}

table th {
  width: 25%;
  text-align: center;
  background-color: #555;
  color: #F8F5F0;
}

table td {
  text-align: start;
  background-color: #D9D9D9;
  color: #101315;
}

/* カード */
.card {
  width: 80%;
  margin: 10px auto;
  background-color: #D9D9D9;
  border-radius: 6px;
}

.card-image {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  height: auto;
}

.card-content {
  padding: 10px 20px;
  color: #101315;
}

.card-title {
  font-size: 20px;
  margin: 0 0 5px;
  text-align: center;
  color: #101315;
}

.card-text {
  font-size: 14px;
  margin: 0 0 5px;
}

@media screen and (min-width: 768px) {
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    margin-bottom: 10px;
    padding: 0;
  }

  .card {
    width: calc(100%/4 - 5px);
    margin: 5px 2.5px;
  }
}
</style>