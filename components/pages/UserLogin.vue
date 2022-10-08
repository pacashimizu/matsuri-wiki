<template>
  <div>
    <div @click="$emit('closeModal')" class="overlay">
      <div @click="stopEvent" class="modal">
        <span @click="$emit('closeModal')" class="close-btn"></span>
        <h4 class="modal-title">ログイン</h4>
        <hr />
        <form>
          <div class="form-group">
            <label for="usermail">メールアドレス</label>
            <input type="email" id="usermail" v-model="usermail" required>
          </div>
          <div class="form-group">
            <label for="userpass">パスワード</label>
            <input type="password" id="userpass" v-model="userpass" required>
          </div>
        </form>        
        <button @click="onClickLogIn" type="button" class="login-btn">ログインする</button>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  data() {
    return {
      usermail: '',
      userpass: '',
      hasError: false,
    };
  },
  methods: {
    stopEvent() {
      event.stopPropagation();
    },
    
    onClickLogIn() {
      firebase.auth().signInWithEmailAndPassword(this.usermail, this.userpass)
        .then(() => {
          // ログインに成功したとき
          console.log('ログインしました');
          this.hasError = false;
          this.$emit('closeModal');
        })
        .catch((error) => {
          // ログインに失敗したとき
          console.error('ログインエラー', error);
          this.hasError = true;
        });
    },
  },
};
</script>

<style scoped>
.overlay {
  z-index: 90;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  z-index: 99;
  width: 80%;
  padding: 10px 20px;
  border-radius: 6px;
  color: #101315;
  background-color: #fff;
}
@media screen and (min-width: 768px) {
  .modal {
    width: 30%;
  }
}

.modal-title {
  margin: 10px auto;
  text-align: center;
  color: #101315;
}

.close-btn {
  display: block;
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background-color: #5E5E5E;
  float: right;
  cursor: pointer;
}

.close-btn::before, .close-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 21px;
  background-color: #fff;
}

.close-btn::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close-btn::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.form-group label {
  display: block;
  margin: 10px 0 0;
  padding: 0;
  font-size: 12px;
}

.form-group input {
  width: 100%;
  margin: 0 0 10px;
  padding: 10px;
  border: 1px solid #101315;
  border-radius: 6px;
}

.form-group input:focus {
  outline: 2px solid #101315;
  border-radius: 6px;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  appearance: none;
}

.login-btn {
  display: block;
  width: 100%;
  margin: 20px 0 5px;
  padding: 10px;
  border: 1px solid #FFA622;
  border-radius: 6px;
  background-color: #FFA622;
}

</style>