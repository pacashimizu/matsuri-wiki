<template>
  <div class="tabs">
    <input id="all" type="radio" name="tab-item" checked>
    <label class="tab-item" for="all">全国</label>
    <div class="tab-content">
      <ul class="card-list">
        <li class="card" v-for="{ id, title, prefecture, image } in events" :key='id'>
          <nuxt-link :to="`/events/${id}`">
            <figure class="card-image">
              <img :src="image">
            </figure>
            <div class="card-text">
              <h3 class="card-title">{{ title }}</h3>
              <p>{{ prefecture }}</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <input id="north-jpn" type="radio" name="tab-item">
    <label class="tab-item" for="north-jpn">北海道・東北</label>
    <div class="tab-content">
      <div v-if="kitanihon.length === 0">
        <p>イベントがありません。</p>
      </div>
      <ul class="card-list">
        <li class="card" v-for="{ id, title, prefecture, image } in kitanihon" :key='id'>
          <nuxt-link :to="`/events/${id}`">
            <a href="">
              <figure class="card-image">
                <img :src="image">
              </figure>
              <div class="card-text">
                <h3 class="card-title">{{ title }}</h3>
                <p>{{ prefecture }}</p>
              </div>
            </a>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <input id="kanto" type="radio" name="tab-item">
    <label class="tab-item" for="kanto">関東</label>
    <div class="tab-content">
      <div v-if="kanto.length === 0">
        <p>イベントがありません。</p>
      </div>
      <ul class="card-list">
        <li class="card" v-for="{ id, title, prefecture, image } in kanto" :key='id'>
          <nuxt-link :to="`/events/${id}`">
            <a href="">
              <figure class="card-image">
                <img :src="image">
              </figure>
              <div class="card-text">
                <h3 class="card-title">{{ title }}</h3>
                <p>{{ prefecture }}</p>
              </div>
            </a>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <input id="chubu" type="radio" name="tab-item">
    <label class="tab-item" for="chubu">中部</label>
    <div class="tab-content">
      <div v-if="chubu.length === 0">
        <p>イベントがありません。</p>
      </div>
      <ul class="card-list">
        <li class="card" v-for="{ id, title, prefecture, image } in chubu" :key='id'>
          <nuxt-link :to="`/events/${id}`">
            <a href="">
              <figure class="card-image">
                <img :src="image">
              </figure>
              <div class="card-text">
                <h3 class="card-title">{{ title }}</h3>
                <p>{{ prefecture }}</p>
              </div>
            </a>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <input id="kansai" type="radio" name="tab-item">
    <label class="tab-item" for="kansai">関西</label>
    <div class="tab-content">
      <div v-if="kansai.length === 0">
        <p>イベントがありません。</p>
      </div>
      <ul class="card-list">
        <li class="card" v-for="{ id, title, prefecture, image } in kansai" :key='id'>
          <nuxt-link :to="`/events/${id}`">
            <a href="">
              <figure class="card-image">
                <img :src="image">
              </figure>
              <div class="card-text">
                <h3 class="card-title">{{ title }}</h3>
                <p>{{ prefecture }}</p>
              </div>
            </a>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <input id="west-jpn" type="radio" name="tab-item">
    <label class="tab-item" for="west-jpn">中国・四国</label>
    <div class="tab-content">
      <div v-if="chushikoku.length === 0">
        <p>イベントがありません。</p>
      </div>
      <ul class="card-list">
        <li class="card" v-for="{ id, title, prefecture, image } in chushikoku" :key='id'>
          <nuxt-link :to="`/events/${id}`">
            <a href="">
              <figure class="card-image">
                <img :src="image">
              </figure>
              <div class="card-text">
                <h3 class="card-title">{{ title }}</h3>
                <p>{{ prefecture }}</p>
              </div>
            </a>
          </nuxt-link>
        </li>
      </ul>    </div>
    <input id="south-jpn" type="radio" name="tab-item">
    <label class="tab-item" for="south-jpn">九州・沖縄</label>
    <div class="tab-content">
      <div v-if="kyushu.length === 0">
        <p>イベントがありません。</p>
      </div>
      <ul class="card-list">
        <li class="card" v-for="{ id, title, prefecture, image } in kyushu" :key='id'>
          <nuxt-link :to="`/events/${id}`">
            <a href="">
              <figure class="card-image">
                <img :src="image">
              </figure>
              <div class="card-text">
                <h3 class="card-title">{{ title }}</h3>
                <p>{{ prefecture }}</p>
              </div>
            </a>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['events'],
  computed: {
    kitanihon() {
      return this.events.filter(event => {
        return this.$KITANIHON.includes(event.prefecture);
      });
    },
    kanto() {
      return this.events.filter(event => {
        return this.$KANTO.includes(event.prefecture);
      });
    },
    chubu() {
      return this.events.filter(event => {
        return this.$CHUBU.includes(event.prefecture);
      });
    },
    kansai() {
      return this.events.filter(event => {
        return this.$KANSAI.includes(event.prefecture);
      });
    },
    chushikoku() {
      return this.events.filter(event => {
        return this.$CHUSHIKOKU.includes(event.prefecture);
      });
    },
    kyushu() {
      return this.events.filter(event => {
        return this.$KYUSHU.includes(event.prefecture);
      });
    },
  },
};
</script>

<style>
.tabs {
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto 50px;
  background-color: #101315;
  text-align: center;
  justify-content: center;
}

input[name="tab-item"] {
  display: none;
}

.tab-item {
  position: relative;
  width: 80%;
  padding: 10px 20px;
  background-color: #101315;
  color: #F8F5F0;
  border-bottom: 1px solid #F8F5F0;
  margin-bottom: 0;
  transition: background 0.1s, color 0.1s;
}

.tab-item:first-of-type {
  border-top: 1px solid #F8F5F0;
}

.tab-item:hover {
  background-color: #5E5E5E;
}

.tab-item::before {
  content: '';
  width: 7px;
  height: 7px;
  border: solid 2px #F8F5F0;
  border-color: transparent transparent #F8F5F0 #F8F5F0;
  transform: rotate(-45deg);
  position: absolute;
  right: 30px;
  top: 10px;
}

.tabs input:checked + .tab-item {
  background-color: #F8F5F0;
  border-bottom: 1px solid #5E5E5E;
  color: #101315;
}

.tab-content {
  display: none;
  width: 80%;
  padding: 10px 0;
  background-color: #F8F5F0;
  color: #101315;
}

.tabs input:checked + .tab-item + .tab-content {
  display: block;
}

@media screen and (min-width: 768px) {
  .tab-item {
    width: calc(100%/7);
    padding: 10px 20px;
    background-color: #555;
    border-left: 1px solid #101315;
    border-radius: 6px 6px 0 0;
  }

  .tab-item:first-of-type {
    border-top: none;
    border-left: none;
  }

  .tab-item::before {
    display: none;
  }

  .tabs input:checked + .tab-item {
    border-bottom: none;
  }

  .tab-content {
    width: 100%;
    order: 99;
  }
} 

/* カード */
.card-list {
  padding: 0 10px;
  list-style: none;
}

.card a {
  display: flex;
  text-decoration: none;
}

.card-image {
  margin: 0;
}

.card-image img {
  width: 160px;
  height: 120px;
  object-fit: cover;
}

.card-text {
  margin: 0 10px;
  text-align: start;
  color: #101315;
}

@media screen and (min-width: 768px) {
  .card-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
  }

  .card {
    display: block;
    margin: 5px 2.5px;
    width: calc(100%/4 - 5px);
  }
  
  .card a {
    display: block;
  }

  .card-image img {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }

  .card-text, .card-title, .card-text p {
    width: 100%;
    margin: 0 auto 5px;
    text-align: center;
  }
}
</style>