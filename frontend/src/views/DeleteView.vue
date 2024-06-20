<template>
  <div class="signup-container">
    <h1>회원 탈퇴</h1>
    <form @submit.prevent="deleteProfile" class="signup-form">
      <div v-if="!resultMessage" class="form-content">
        <div class="form-group">
          <label for="userId">사용자 ID:</label>
          <input v-model="userId" type="text" id="userId" required>
        </div>

        <div class="form-group">
          <label for="userPassword">비밀번호:</label>
          <input v-model="userPassword" type="password" id="userPassword" required>
        </div>

        <button type="submit">회원 탈퇴</button>
      </div>
  </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',
      userPassword: '',
    };
  },
  methods: {
    async deleteProfile() {
      try {
        const response = await axios.delete('http://localhost:3000/deleteProfile', {
          data: { mem_id: this.userId, mem_password: this.userPassword },
        });

        if (response.status === 200) {
          console.log('회원 탈퇴 성공');
          alert('회원 탈퇴 성공');
          this.$router.push('/');
          location.reload();
          localStorage.removeItem("userId");
        } else {
          console.error('서버 응답 오류:', response.data.message);
          alert('아이디 및 비밀번호가 일치하지 않습니다.');

        }
      } catch (error) {
        console.error('클라이언트 오류:', error.message);
        alert('아이디 및 비밀번호가 일치하지 않습니다.');

      }
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