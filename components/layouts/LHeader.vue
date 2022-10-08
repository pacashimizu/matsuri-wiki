<template>
  <header class="header">
     <!-- ハンバーガーメニュー -->
    <div class="hamburger-menu">
      <input id="menu-btn-check" type="checkbox">
      <label for="menu-btn-check" class="menu-btn"><span></span></label>
      <nav class="menu">
        <ul class="menu-list">
          <li><a @click="show=true">イベント登録</a></li>
          <li><a @click="onClickLogOut">ログアウト</a></li>
        </ul>
      </nav>
      <div class="content-cover"></div>
    </div>
    <!-- グローバルメニュー -->
    <div class="global-nav">
      <ul class="nav-list">
          <li><a @click="show=true" class="new-btn">イベント登録</a></li>
          <li><a @click="onClickLogOut" class="logout-btn">ログアウト</a></li>
      </ul>
    </div>
    <l-modal @closeModal="show=false" v-if="show" @add-event="onAddEvent" />
  </header>
</template>

<script>
import firebase from 'firebase/app';
import LModal from '@/components/layouts/LModal.vue';

export default {
  components: {
    LModal,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onAddEvent(event) {
      this.$emit('add-event', event);
    },
    onClickLogOut() {
      firebase.auth().signOut()
        .then(() => {
          // ログアウトに成功したとき
          console.log('ログアウトしました');
        })
        .catch((error) => {
          // ログアウトに失敗したとき
          console.error('ログアウエラー', error);
        });
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  padding: 0;
  background-color: #101315;
}

.menu-btn {
  position: fixed;
  background-color: #101315;
  top: 0;
  right: 10px;
  display: flex;
  height: 60px;
  width: 60px;
  z-index: 90;
  justify-content: center;
  align-items: center;
}

.menu-btn span,
.menu-btn span::before,
.menu-btn span::after {
  content: '';
  display: block;
  height: 3px;
  width: 25px;
  border-radius: 3px;
  background-color: #F8F5F0;
  position: absolute;
}

.menu-btn span::before {
  bottom: 8px;
}

.menu-btn span::after {
  top: 8px;
}

#menu-btn-check:checked ~ .menu-btn span {
  background-color: rgb(255 255 255 / 0%);
}

#menu-btn-check:checked ~ .menu-btn span::before {
  bottom: 0;
  transform: rotate(45deg);
}

#menu-btn-check:checked ~ .menu-btn span::after {
  top: 0;
  transform: rotate(-45deg);
}

#menu-btn-check {
  display: none;
}

.menu {
  width: 50%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 100%;
  z-index: 80;
  background-color: #101315;
  transition: all 0.5s;
}

.menu-list {
  padding: 70px 20px 0;
}

.menu-list li {
  border-bottom: solid 1px #F8F5F0;
  list-style: none;
}

.menu-list li a {
  display: block;
  width: 100%;
  font-size: 15px;
  box-sizing: border-box;
  text-decoration: none;
  padding: 10px 15px 10px 5px;
  position: relative;
  color: #F8F5F0;
  cursor: pointer;
}

.menu-list li a::before {
  content: '';
  width: 7px;
  height: 7px;
  border-top: solid 2px #F8F5F0;
  border-right: solid 2px #F8F5F0;
  transform: rotate(45deg);
  position: absolute;
  right: 11px;
  top: 16px;
}

#menu-btn-check:checked ~ .menu {
  left: 50%;
}

#menu-btn-check:checked ~ .content-cover {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0; 
  left: 0;
  z-index: 70;
  background-color: rgb(3 3 3 / 50%);
  display: block;
}

.global-nav {
  display: none;
}

@media screen and (min-width: 768px) {
  .hamburger-menu {
   display: none;
  }
  
  .global-nav {
    display: block;
  }
  
  .nav-list {
    display: flex;
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
    justify-content: end;
    height: 70px;
    align-items: center;
  }
  
  .nav-list li {
    list-style: none;
    margin: 0 2px;
  }
  
  .new-btn, .logout-btn {
    display: block;
    padding: 10px 5px;
    border-radius: 6px;
    font-size: 15px;
    text-decoration: none;
  }
  
  .new-btn {
    color: #101315;
    background-color: #FFA622;
    cursor: pointer;
  }
  
  .new-btn:hover {
    background-color: #FFB03A;
  }
  
  .logout-btn {
    color: #F8F5F0;
    background-color: #555;
    cursor: pointer;
  }
  
  .logout-btn:hover {
    background-color: #5E5E5E;
  }
}
</style>
