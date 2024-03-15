<template>
  <div class="signup-container">
    <h1>회원가입</h1>
    <form @submit.prevent="signup" class="signup-form">
      <div class="form-group">
        <label for="MEM_ID">아이디:</label>
        <input
          v-model="MEM_ID"
          type="text"
          id="MEM_ID"
          name="MEM_ID"
          required
        />
      </div>

      <div class="form-group">
        <label for="MEM_PASSWORD">비밀번호:</label>
        <input
          v-model="MEM_PASSWORD"
          type="password"
          id="MEM_PASSWORD"
          name="MEM_PASSWORD"
          required
        />
      </div>

      <div class="form-group">
        <label for="MEM_NAME">이름:</label>
        <input
          v-model="MEM_NAME"
          type="text"
          id="MEM_NAME"
          name="MEM_NAME"
          required
        />
      </div>

      <div class="form-group">
        <label for="MEM_EMAIL">이메일:</label>
        <input
          v-model="MEM_EMAIL"
          type="email"
          id="MEM_EMAIL"
          name="MEM_EMAIL"
          required
        />
      </div>

      <div class="form-group">
        <label for="MEM_TEL">전화번호:</label>
        <input
          v-model="MEM_TEL"
          type="tel"
          id="MEM_TEL"
          name="MEM_TEL"
          required
        />
      </div>

      <div class="form-group">
        <label for="MEM_NICKNAME">닉네임:</label>
        <input
          v-model="MEM_NICKNAME"
          type="text"
          id="MEM_NICKNAME"
          name="MEM_NICKNAME"
          required
        />
      </div>

      <div class="form-group">
        <label for="MEM_ADDRESS">주소:</label>
        <input
          v-model="MEM_ADDRESS"
          type="text"
          id="MEM_ADDRESS"
          name="MEM_ADDRESS"
          required
        />
      </div>

      <button type="submit">회원가입</button>
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
    async signup() {
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MEM_ID: this.MEM_ID,
            MEM_PASSWORD: this.MEM_PASSWORD,
            MEM_NAME: this.MEM_NAME,
            MEM_EMAIL: this.MEM_EMAIL,
            MEM_TEL: this.MEM_TEL,
            MEM_NICKNAME: this.MEM_NICKNAME,
            MEM_ADDRESS: this.MEM_ADDRESS,
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
  max-width: 650px; /* 수정된 부분: 박스 크기를 600px로 조정 */
  margin: 20px auto; /* 수정된 부분: 상단 여백을 주고 가운데 정렬 */
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