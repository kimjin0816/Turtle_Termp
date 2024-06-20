<template>
  <div class="signup-container">
    <h1>회원가입</h1>
    <form @submit.prevent="signup" class="signup-form">
      <div class="form-group">
        <label for="mem_id">아이디:</label>
        <input v-model="mem_id" type="text" id="mem_id" name="mem_id" required />
      </div>

      <div class="form-group">
        <label for="mem_password">비밀번호:</label>
        <input v-model="mem_password" type="password" id="mem_password" name="mem_password" required />
      </div>

      <div class="form-group">
        <label for="mem_name">이름:</label>
        <input v-model="mem_name" type="text" id="mem_name" name="mem_name" required />
      </div>

      <div class="form-group">
        <label for="mem_email">이메일:</label>
        <input v-model="mem_email" type="email" id="mem_email" name="mem_email" required />
      </div>

      <div class="form-group">
        <label for="mem_tel">전화번호:</label>
        <input v-model="mem_tel" type="tel" id="mem_tel" name="mem_tel" required />
      </div>

      <div class="form-group">
        <label for="mem_nickname">닉네임:</label>
        <input v-model="mem_nickname" type="text" id="mem_nickname" name="mem_nickname" required />
      </div>

      <div class="form-group">
        <label for="mem_address">주소:</label>
        <input v-model="mem_address" type="text" id="mem_address" name="mem_address" required />
      </div>

      <button type="submit">회원가입</button>
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
    async signup() {
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mem_id: this.mem_id,
            mem_password: this.mem_password,
            mem_name: this.mem_name,
            mem_email: this.mem_email,
            mem_tel: this.mem_tel,
            mem_nickname: this.mem_nickname,
            mem_address: this.mem_address,
          }),
        });

        const result = await response.json();
        alert(result.message);

        if (response.status === 201) {
          // 회원가입 성공 시 홈 화면으로 이동
          this.$router.push("/");
        }
      } catch (error) {
        console.error("회원가입 오류:", error);
        alert("서버 오류");
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 650px;
  /* 수정된 부분: 박스 크기를 600px로 조정 */
  margin: 20px auto;
  /* 수정된 부분: 상단 여백을 주고 가운데 정렬 */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1 {
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