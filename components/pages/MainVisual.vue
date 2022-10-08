<template>
  <div class="main-visual">
    <img src="@/assets/img/top-image.jpg" alt="main-visual">
    <h2>ノコス。<br>
      ツタエル。</h2>
      <div v-if="currentUser === null">
        <ul class="btn-menu">
          <li><a @click="showLogin=true" class="login-btn">ログイン</a></li>
          <li><a @click="showSignup=true" class="signup-btn">サインアップ</a></li>
        </ul>
      </div>
    <user-login @closeModal="showLogin=false" v-if="showLogin" />
    <sign-up @closeModal="showSignup=false" v-if="showSignup" />
  </div>
</template>

<script>
import UserLogin from '@/components/pages/UserLogin.vue';
import SignUp from '@/components/pages/SignUp.vue';

export default {
  props: ['currentUser'],
  components: {
    UserLogin,
    SignUp,
  },
  data() {
    return {
      showLogin: false,
      showSignup: false,
    };
  },
};
</script>

<style scoped>
.main-visual {
  position: relative;
  margin: 0 auto 50px;
}

.main-visual img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.main-visual h2 {
  position: absolute;
  font-size: 32px;
  top: 10%;
  left: 8%;
  margin: 0;
  padding: 0;
}

.main-visual .btn-menu {
  position: absolute;
  top: 50%;
  left: 8%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.main-visual .btn-menu a {
  display: flex;
  margin: 5px auto;
  padding: 10px;
  width: 120px;
  justify-content: center;
  text-decoration: none;
  border-radius: 6px;
  transition: 0.3s;
}

.main-visual .login-btn {
  color: #000;
  background-color: #F8F5F0;
  cursor: pointer;
}

.main-visual .login-btn:hover {
  background-color: #D7D4CF;
}

.main-visual .signup-btn {
  color: #FFF;
  background-color: #555;
  cursor: pointer;
}

.main-visual .signup-btn:hover {
  background-color: #5E5E5E;
}

@media screen and (min-width: 768px) {
  .main-visual img {
    max-width: 1920px;
    height: 700px;
  }
  
  .main-visual h2 {
    position: absolute;
    font-size: 48px;
    top: 25%;
    left: 10%;
  }

  .main-visual .btn-menu {
    position: absolute;
    top: 60%;
    left: 10%;
  }

  .main-visual .btn-menu a {
    display: inline-block;
    width: 120px;
    text-align: center;
  }
}
</style>

