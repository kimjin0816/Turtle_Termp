<template>
  <div class="signup-container">
    <h1>아이디 및 비밀번호 찾기</h1>
    <form @submit.prevent="findCredentials" class="signup-form">
      <div v-if="!resultMessage" class="form-content">
        <div class="form-group">
          <label for="name">이름:</label>
          <input v-model="name" type="text" id="name" name="name" required>
        </div>

        <div class="form-group">
          <label for="email">이메일:</label>
          <input v-model="email" type="email" id="email" name="email" required>
        </div>

        <button type="submit">찾기</button>
      </div>

      <div v-if="resultMessage" class="result-message">
        {{ resultMessage }}
        <div class="button-group">
          <button @click="resetForm">다시 찾기</button>
          <router-link to="/">
            <button class="router-link">로그인</button>
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
      resultMessage: '',
    };
  },
  methods: {
    async findCredentials() {
      try {
        const response = await axios.post('http://localhost:3000/findCredentials', {
          mem_name: this.name,
          mem_email: this.email,
        });

        const result = response.data;

        if (response.status === 200) {
          this.resultMessage = `아이디 : ${result.mem_id}, 비밀번호 : ${result.mem_password}`;
        } else {
          this.resultMessage = result.message;
        }
      } catch (error) {
        console.error('아이디/비밀번호 찾기 오류:', error);
        this.resultMessage = '가입된 아이디와 비밀번호가 없습니다.';
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.resultMessage = '';
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 650px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 150px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
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
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: grey;
}

.result-message {
  margin-top: 20px;
  color: red;
  font-size: 15px;
  font-weight: bold;
}

.button-group {
  display: flex;
  justify-content: center;
}

.result-message button {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 21px;
}

.router-link button {
  width: 100%;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.router-link button:hover {
  background-color: grey;
}

.result-message button:hover {
  background-color: grey;
}
</style>