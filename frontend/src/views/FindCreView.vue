<template>
  <div class="signup-container">
    <h2>아이디 및 비밀번호 찾기</h2>
    <form @submit.prevent="findCredentials" class="signup-form">
      <div v-if="!find_open" class="form-content">
        <div class="form-group">
          <label for="name">이름</label>
          <input v-model="name" type="text" id="name" name="name" required placeholder=" 이름을 입력해주세요." />
        </div>

        <div class="form-group">
          <label for="email">이메일</label>
          <input v-model="email" type="email" id="email" name="email" required placeholder=" 이메일을 입력해주세요.">
        </div>

        <div class="form-group"><button type="submit">찾기</button></div>
      </div>

      <div v-if="find_open" class="result-message">
        <div class="message">
          <div v-if="result">
            <p><span>아이디</span><br>
              {{ this.find_id }}
            </p>
            <p><span>비밀번호</span><br>
              {{ this.find_password }}
            </p>
          </div>
          <div v-if="!result">
            <p>{{ this.resultMessage }}</p>
          </div>
        </div>
        <div class="button-group">
          <button @click="resetForm" style="background: #F0F0F0; color:black">다시 찾기</button>
          <router-link to="/login">
            <button @click="this.$router.push('/')" style="background: #262626; color:white">로그인</button>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',

      find_id: '',
      find_password: '',
      find_open: false,
      resultMessage: '',
      result: false

    };
  },
  methods: {
    async findCredentials() {
      try {
        this.find_open = true;
        const response = await axios.post('http://localhost:3000/findCredentials', {
          mem_name: this.name,
          mem_email: this.email,
        });

        const result = response.data;

        if (response.status === 200) {
          this.find_id = result.mem_id;
          this.find_password = result.mem_password;
          this.result = true;
        }
      } catch (error) {
        this.resultMessage = '가입된 아이디와 비밀번호가 없습니다.';
        this.result = false;
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.resultMessage = '';
      this.result = false;
      this.find_open = false;
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 650px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
}

h2 {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 130%;
  margin-bottom: 20px;
}

span {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  margin-bottom: 20px;
  color: black;
}

label {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  text-align: left;
}

input {
  background: #F0F0F0;
  width: 10cm;
  padding: 10px;
  margin-bottom: 10px;
  border: none;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}

.form-group button {
  background: #262626;
  color: white;
  width: 10cm;
  padding: 10px;
  margin-top: 20px;
  border-radius: 3px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}

.signup-form {
  max-width: 300px;
  margin: 0 auto;
}

.form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 10px;
}

.message p {
  margin-top: 20px;
  color: red;
  font-size: 15px;
  font-weight: bold;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button-group button {
  flex: 1;
  width: 100%;
  border-radius: 3px;
  padding: 12px 20px;
  margin-top: 10px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  justify-content: center;
}

.form-group button:hover {
  background-color: grey;
}

.button-group button:hover {
  background-color: grey;
}
</style>