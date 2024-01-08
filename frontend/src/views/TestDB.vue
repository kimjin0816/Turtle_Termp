<template>
    <div id="app">
      <h1>Vue Frontend</h1>
      
      <!-- 회원가입 -->
      <div>
        <h2>회원가입</h2>
        <label for="signup-id">아이디:</label>
        <input type="text" id="signup-id" v-model="signupData.MEM_ID" />
        <br />
        <label for="signup-password">비밀번호:</label>
        <input type="password" id="signup-password" v-model="signupData.MEM_PASSWORD" />
        <br />
        <label for="signup-name">이름:</label>
        <input type="text" id="signup-name" v-model="signupData.MEM_NAME" />
        <br />
        <label for="signup-email">이메일:</label>
        <input type="text" id="signup-email" v-model="signupData.MEM_EMAIL" />
        <br />
        <label for="signup-tel">전화번호:</label>
        <input type="text" id="signup-tel" v-model="signupData.MEM_TEL" />
        <br />
        <label for="signup-nickname">닉네임:</label>
        <input type="text" id="signup-nickname" v-model="signupData.MEM_NICKNAME" />
        <br />
        <label for="signup-address">주소:</label>
        <input type="text" id="signup-address" v-model="signupData.MEM_ADDRESS" />
        <br />
        <button @click="signup">회원가입</button>
        <p>{{ signupResult }}</p>
      </div>
  
      <!-- 로그인 -->
      <div>
        <h2>로그인</h2>
        <label for="login-id">아이디:</label>
        <input type="text" id="login-id" v-model="loginData.MEM_ID" />
        <br />
        <label for="login-password">비밀번호:</label>
        <input type="password" id="login-password" v-model="loginData.MEM_PASSWORD" />
        <br />
        <button @click="login">로그인</button>
        <p>{{ loginResult }}</p>
      </div>
  
      <!-- 아이디/비밀번호 찾기 -->
      <div>
        <h2>아이디/비밀번호 찾기</h2>
        <label for="find-id">아이디:</label>
        <input type="text" id="find-id" v-model="findData.MEM_ID" />
        <br />
        <label for="find-tel">전화번호:</label>
        <input type="text" id="find-tel" v-model="findData.MEM_TEL" />
        <br />
        <button @click="findCredentials">아이디/비밀번호 찾기</button>
        <p>{{ findResult }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        signupData: {
          MEM_ID: '',
          MEM_PASSWORD: '',
          MEM_NAME: '',
          MEM_EMAIL: '',
          MEM_TEL: '',
          MEM_NICKNAME: '',
          MEM_ADDRESS: '',
        },
        loginData: {
          MEM_ID: '',
          MEM_PASSWORD: '',
        },
        findData: {
          MEM_ID: '',
          MEM_TEL: '',
        },
        signupResult: '',
        loginResult: '',
        findResult: '',
      };
    },
    methods: {
      async signup() {
        try {
          const response = await axios.post('http://localhost:3000/signup', this.signupData);
          this.signupResult = response.data.message;
        } catch (error) {
          console.error('회원가입 오류:', error);
          this.signupResult = '서버 오류';
        }
      },
  
      async login() {
        try {
          const response = await axios.post('http://localhost:3000/login', this.loginData);
          this.loginResult = response.data.message;
        } catch (error) {
          console.error('로그인 오류:', error);
          this.loginResult = '서버 오류';
        }
      },
  
      async findCredentials() {
        try {
          const response = await axios.post('http://localhost:3000/findCredentials', this.findData);
          this.findResult = response.data.message;
        } catch (error) {
          console.error('아이디/비밀번호 찾기 오류:', error);
          this.findResult = '서버 오류';
        }
      },
    },
  };
  </script>
  
  <style>
  #app {
    text-align: center;
    margin-top: 60px;
  }
  
  button {
    margin: 10px;
  }
  </style>