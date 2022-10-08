<template>
  <div>
    <div @click="$emit('closeModal')" class="overlay">
      <div @click="stopEvent" class="modal">
        <span @click="$emit('closeModal')" class="close-btn"></span>
        <h4 class="modal-title">イベントの登録</h4>
        <hr />
        <form>
          <div class="form-group">
            <label for="title">イベント名</label>
            <input type="text" id="title" v-model="title" :state="isValidTitle" required>
          </div>
          <div class="form-group">
            <label for="file-uploader">イベント画像</label>
            <input type="file" id="file-uploader" @change="onImageUploaded" :state="isValidImageFile" accept="image/*" placheholder="画像ファイルを選択してください" required>
          </div>
          <div class="form-group">
            <label for="prefecture">都道府県</label>
            <select name="prefecture" id="prefecture" v-model="prefecture" required>
              <option disabled value="initial">選択してください</option>
              <option v-for="pref in preflist" :key="pref.id">{{ pref.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="origin">由来</label>
            <textarea name="origin" id="origin" v-model="origin"></textarea>
          </div>
        </form>        
        <button type="button" class="create-btn" @click="onSubmit">登録する</button>
      </div>
    </div>
  </div>
</template>

<script>
import { postEvent } from '@/plugins/firebaseService';

// 状態の定数
const IS_DEFAULT = 'IS_DEFAULT';
const IS_POSTING = 'IS_POSTING'; // データ送信中
const IS_FAILED = 'IS_FAILED'; // データを送信できなかった

const encodeImage = (file) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onloadend = (event) => resolve(event.target.result);
    reader.readAsDataURL(file);
  });
};

export default {
  data() {
    return {
      currentState: IS_DEFAULT,
      imageFile: null,
      imageFileEncoded: '',
      isValidImageFile: null,
      postEventError: null,
      title: '',
      prefecture: 'initial',
      origin: '',
    };
  },

  computed: {
    isValidTitle() {
      if (!this.validated || !this.title) return null;
      return this.title.trim().length > 0;
    },
    isValidInputs() {
      return this.isValidTitle && this.isValidImageFile;
    },
    isPosting() {
      return this.currentState === IS_POSTING;
    },
    isFailed() {
      return this.currentState === IS_FAILED;
    },
    preflist() {
      return this.$PREF;
    },
  },
  
  methods :{
    stopEvent() {
      event.stopPropagation();
    },
    // 状態を変更する
    toDefault() {
      this.currnetState = IS_DEFAULT;
    },
    toPosting() {
      this.currnetState = IS_POSTING;
    },
    toFailed() {
      this.currnetState = IS_FAILED;
    },
    
    onImageUploaded(e) {
      this.imageFile = e.target.files[0];
      encodeImage(this.imageFile)
        .then((res) => {
          this.imageFileEncoded = res;
          this.isValidImageFile = true;
        })
        .catch((err) => {
          this.isValidImageFile = false;
          console.error(err.message);
        });
    },
    
    async onSubmit() {
      // if (!this.isValidInputs) return;

      this.toPosting();
      
      // 書籍データをfirebaseに送信する
      let response = null;
      console.log('this.title', this.title);
      console.log('this.imageFile', this.imageFile);
      console.log('this.imageFileEncoded', this.imageFileEncoded);
      await postEvent(this.title, this.imageFile, this.imageFileEncoded, this.prefecture, this.origin)
        .then((data) => {
          response = data;
          console.log(response);
          
          this.toDefault();
          
          const { id, title, image } = response;
          this.$emit('add-event', { id, title, image});
          
          this.imageFile = null;
          this.imageFileEncoded = '';
          this.title = '';
          this.prefectrure = '';
          this.origin = '';
          
          this.$emit('closeModal');
        })
        .catch((err) => {
          this.toFailed();
          console.error(err.message);
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
  margin: 10px auto 0;
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

.form-group input, .form-group textarea, .form-group select {
  width: 100%;
  margin: 0 0 10px;
  padding: 10px;
  border: 1px solid #101315;
  border-radius: 6px;
}

.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
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

.create-btn {
  display: block;
  width: 100%;
  margin: 20px 0 5px;
  padding: 10px;
  border: 1px solid #FFA622;
  border-radius: 6px;
  background-color: #FFA622;
}

</style>