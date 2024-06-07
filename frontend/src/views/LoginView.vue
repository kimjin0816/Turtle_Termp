<template>
  <div class="home-container">
    <div class="center-box">
      <h1>로그인</h1>
      <!-- 로그인 폼 -->
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">아이디:</label>
          <input v-model="username" type="text" id="username" name="username" required />
        </div>

        <div class="form-group">
          <label for="password">비밀번호:</label>
          <input v-model="password" type="password" id="password" name="password" required />
        </div>

        <button type="submit">로그인</button>
      </form>

      <!-- 네이버 로그인 버튼 추가 -->
      <button @click="loginWithNaver" class="naver-login-button">네이버 로그인</button>

      <!-- 회원가입, 아이디/비밀번호 찾기 링크 -->
      <div class="links">
        <router-link to="/signup">
          <button class="router-link">회원가입</button>
        </router-link>
        <router-link to="/findCredentials">
          <button class="router-link">아이디/비밀번호 찾기</button>
        </router-link>
        <router-link to="/updateProfile">
          <button class="router-link">회원정보 수정</button>
        </router-link>
        <router-link to="/deleteProfile">
          <button class="router-link">회원 탈퇴</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
    };
  },
  methods: {
    async login() {
      const userData = {
        username: this.username,
        password: this.password,
      };
      console.log('Login data:', userData);  // 확인용 로그 추가

      try {
        const response = await this.$axios.post('http://localhost:3000/login', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        console.log("response userNick: " + response.data.userNick);
        console.log("response userId: ", response.data.userId);
        localStorage.setItem('userId', response.data.userId);
        console.log("userId: " + localStorage.getItem('userId'));
        alert('로그인 성공');
        this.$router.push("/")
        this.$router.go();
      } catch (error) {
        alert('로그인 실패');
        console.error('Login failed:', error.response.data.error);
      }
    },
    loginWithNaver() {
      window.location.href = "http://localhost:3000/auth/naver";
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.center-box {
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form {
  max-width: 300px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
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
}

button:hover {
  background-color: grey;
}

.naver-login-button {
  background-color: #1ec800; /* 네이버 색상 */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.router-link {
  flex: 1;
  margin-right: 10px;
  margin-left: 10px;
}

.router-link button {
  width: 100%;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.router-link button:hover {
  background-color: #007bff;
}
</style>