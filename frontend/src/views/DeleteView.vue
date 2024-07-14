<template>
  <div class="signup-container">
    <h2>회원 탈퇴</h2>
    <form @submit.prevent="deleteProfile" class="signup-form">
      <div class="form-content">
        <div class="form-group">
          <label for="userId">사용자 ID</label>
          <input v-model="userId" type="text" id="userId" required placeholder="아이디를 입력해주세요">
        </div>

        <div class="form-group">
          <label for="userPassword">비밀번호</label>
          <input v-model="userPassword" type="password" id="userPassword" required placeholder="비밀번호를 입력해주세요">
        </div>

        <div class="form-group"><button type="submit">탈퇴 하기</button></div>
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
          this.$router.go();
          localStorage.removeItem("userId");
        } 
      } catch (error) {
        alert('아이디 및 비밀번호가 일치하지 않습니다.');
      }
    }
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