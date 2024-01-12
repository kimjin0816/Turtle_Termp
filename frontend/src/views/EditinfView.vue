<template>
    <div class="signup-container">
      <h2>회원 정보 수정</h2>
      <form @submit.prevent="updateProfile" class="signup-form">
        <div class="form-group">
          <label for="MEM_ID">아이디:</label>
          <input v-model="MEM_ID" type="text" required />
        </div>
  
        <div class="form-group">
          <label for="MEM_PASSWORD">비밀번호:</label>
          <input v-model="MEM_PASSWORD" type="password" required />
        </div>
  
        <div class="form-group">
          <label for="MEM_NAME">이름:</label>
          <input v-model="MEM_NAME" type="text" required />
        </div>
  
        <div class="form-group">
          <label for="MEM_EMAIL">이메일:</label>
          <input v-model="MEM_EMAIL" type="email" required />
        </div>
  
        <div class="form-group">
          <label for="MEM_TEL">전화번호:</label>
          <input v-model="MEM_TEL" type="tel" required />
        </div>
  
        <div class="form-group">
          <label for="MEM_NICKNAME">닉네임:</label>
          <input v-model="MEM_NICKNAME" type="text" required />
        </div>
  
        <div class="form-group">
          <label for="MEM_ADDRESS">주소:</label>
          <input v-model="MEM_ADDRESS" type="text" required />
        </div>
  
        <button type="submit">수정하기</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        MEM_ID: "",
        MEM_PASSWORD: "",
        MEM_NAME: "",
        MEM_EMAIL: "",
        MEM_TEL: "",
        MEM_NICKNAME: "",
        MEM_ADDRESS: "",
      };
    },
    methods: {
      async updateProfile() {
        try {
          const response = await this.$axios.put(
            "http://localhost:3000/updateProfile",
            {
              MEM_ID: this.MEM_ID,
              MEM_PASSWORD: this.MEM_PASSWORD,
              MEM_NAME: this.MEM_NAME,
              MEM_EMAIL: this.MEM_EMAIL,
              MEM_TEL: this.MEM_TEL,
              MEM_NICKNAME: this.MEM_NICKNAME,
              MEM_ADDRESS: this.MEM_ADDRESS,
            }
          );
  
          alert(response.data.message);
  
          if (response.status === 200) {
            // 수정 성공 시 HomeView로 이동
            this.$router.push('/');
          } 
        } catch (error) {
          console.error("회원 정보 수정 오류:", error);
          alert("회원 정보 수정에 실패했습니다.");
          // 수정 실패 시 입력 필드 초기화
          this.MEM_ID = "";
            this.MEM_PASSWORD = "";
            this.MEM_NAME = "";
            this.MEM_EMAIL = "";
            this.MEM_TEL = "";
            this.MEM_NICKNAME = "";
            this.MEM_ADDRESS = "";
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
    text-align: left;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 15px;
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
  }
  
  button:hover {
    background-color: grey;
  }
  </style>
  