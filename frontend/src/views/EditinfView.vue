<template>
  <div class="signup-container">
    <h2>회원 정보 수정</h2>
    <form @submit.prevent="updateProfile" class="signup-form">
      <div class="form-group">
        <label for="mem_id">아이디:</label>
        <input v-model="mem_id" type="text" required />
      </div>

      <div class="form-group">
        <label for="mem_password">비밀번호:</label>
        <input v-model="mem_password" type="password" required />
      </div>

      <div class="form-group">
        <label for="mem_name">이름:</label>
        <input v-model="mem_name" type="text" required />
      </div>

      <div class="form-group">
        <label for="mem_email">이메일:</label>
        <input v-model="mem_email" type="email" required />
      </div>

      <div class="form-group">
        <label for="mem_tel">전화번호:</label>
        <input v-model="mem_tel" type="tel" required />
      </div>

      <div class="form-group">
        <label for="mem_nickname">닉네임:</label>
        <input v-model="mem_nickname" type="text" required />
      </div>

      <div class="form-group">
        <label for="mem_address">주소:</label>
        <input v-model="mem_address" type="text" required />
      </div>

      <button type="submit">수정하기</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mem_id: "",
      mem_password: "",
      mem_name: "",
      mem_email: "",
      mem_tel: "",
      mem_nickname: "",
      mem_address: "",
    };
  },
  methods: {
    async updateProfile() {
      try {
        const response = await this.$axios.put(
          "http://localhost:3000/updateProfile",
          {
            mem_id: this.mem_id,
            mem_password: this.mem_password,
            mem_name: this.mem_name,
            mem_email: this.mem_email,
            mem_tel: this.mem_tel,
            mem_nickname: this.mem_nickname,
            mem_address: this.mem_address,
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
        this.mem_id = "";
          this.mem_password = "";
          this.mem_name = "";
          this.mem_email = "";
          this.mem_tel = "";
          this.mem_nickname = "";
          this.mem_address = "";
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